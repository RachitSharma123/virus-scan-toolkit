import { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';

const MELB_CENTER = [-37.8136, 144.9631];
const DEFAULT_ZOOM = 13;
const REVEAL_RADIUS_M = 800;

function parseLocation(loc) {
  if (!loc || typeof loc !== 'string') return null;
  const parts = loc.split(',');
  if (parts.length !== 2) return null;
  const lat = parseFloat(parts[0].trim());
  const lng = parseFloat(parts[1].trim());
  if (isNaN(lat) || isNaN(lng)) return null;
  return [lat, lng];
}

function FogCanvas({ map, placedMemories }) {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  const redrawFog = useCallback(() => {
    if (!map || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const size = map.getSize();

    canvas.width = size.x;
    canvas.height = size.y;

    // Fill entire canvas with dark fog
    ctx.fillStyle = 'rgba(20, 20, 35, 0.82)';
    ctx.fillRect(0, 0, size.x, size.y);

    // Punch holes for each placed memory using destination-out
    ctx.globalCompositeOperation = 'destination-out';

    placedMemories.forEach((mem) => {
      const coords = parseLocation(mem.location);
      if (!coords) return;
      const point = map.latLngToContainerPoint(coords);
      const radiusPx = map.distance(
        coords,
        map.containerPointToLatLng([point.x + 1, point.y])
      );
      // Convert REVEAL_RADIUS_M to pixels
      const pixelRadius = REVEAL_RADIUS_M / radiusPx;

      const grad = ctx.createRadialGradient(
        point.x, point.y, 0,
        point.x, point.y, pixelRadius
      );
      grad.addColorStop(0, 'rgba(0,0,0,1)');
      grad.addColorStop(0.6, 'rgba(0,0,0,0.9)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(point.x, point.y, pixelRadius, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalCompositeOperation = 'source-over';
  }, [map, placedMemories]);

  useEffect(() => {
    if (!map) return;

    const scheduleRedraw = () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(redrawFog);
    };

    map.on('move zoom moveend zoomend resize', scheduleRedraw);
    scheduleRedraw();

    return () => {
      map.off('move zoom moveend zoomend resize', scheduleRedraw);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [map, redrawFog]);

  // Position the canvas over the map container
  const mapContainer = map ? map.getContainer() : null;

  if (!map) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 400,
      }}
    />
  );
}

function MapComponent({ memories, onMemoryPlaced }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [placingMemory, setPlacingMemory] = useState(null);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [localMemories, setLocalMemories] = useState(memories);
  const [fogKey, setFogKey] = useState(0);

  const placed = localMemories.filter((m) => parseLocation(m.location));
  const unplaced = localMemories.filter((m) => !parseLocation(m.location));

  // Keep local state in sync with props
  useEffect(() => {
    setLocalMemories(memories);
  }, [memories]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    import('leaflet').then((L) => {
      if (mapInstanceRef.current) return; // already initialised

      // Fix default icon paths
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(mapRef.current, {
        center: MELB_CENTER,
        zoom: DEFAULT_ZOOM,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
      setLeafletLoaded(true);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Manage click handler for placement mode
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !leafletLoaded) return;

    const handleClick = async (e) => {
      if (!placingMemory) return;
      const { lat, lng } = e.latlng;
      const location = `${lat.toFixed(6)},${lng.toFixed(6)}`;

      try {
        const res = await fetch(`/api/memories/${placingMemory.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ location }),
        });
        if (res.ok) {
          const updated = await res.json();
          setLocalMemories((prev) =>
            prev.map((m) => (m.id === updated.id ? updated : m))
          );
          onMemoryPlaced && onMemoryPlaced(updated);
          setFogKey((k) => k + 1);
        }
      } catch (err) {
        console.error('Failed to place memory', err);
      }
      setPlacingMemory(null);
    };

    map.on('click', handleClick);
    return () => map.off('click', handleClick);
  }, [placingMemory, leafletLoaded, onMemoryPlaced]);

  // Cursor style when in placement mode
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const container = map.getContainer();
    container.style.cursor = placingMemory ? 'crosshair' : '';
  }, [placingMemory, leafletLoaded]);

  // Render markers for placed memories
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !leafletLoaded) return;

    import('leaflet').then((L) => {
      // Clear old markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      const heartIcon = L.divIcon({
        html: '<div style="font-size:24px;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.5))">❤️</div>',
        className: '',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -16],
      });

      localMemories.forEach((mem) => {
        const coords = parseLocation(mem.location);
        if (!coords) return;

        const cover = mem.cover || (Array.isArray(mem.images) && mem.images[0]) || null;
        const dateStr = mem.date ? new Date(mem.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

        const popupContent = `
          <div style="min-width:200px;font-family:system-ui,sans-serif;">
            ${cover ? `<img src="${cover}" alt="${mem.title}" style="width:100%;height:130px;object-fit:cover;border-radius:8px;margin-bottom:8px;" />` : ''}
            <div style="font-weight:700;font-size:15px;color:#1a1a2e;margin-bottom:2px;">${mem.title || 'Memory'}</div>
            ${dateStr ? `<div style="font-size:12px;color:#888;margin-bottom:8px;">${dateStr}</div>` : ''}
            <a href="/memories/${mem.id}" style="display:inline-block;background:#e11d48;color:white;padding:5px 14px;border-radius:20px;font-size:12px;text-decoration:none;font-weight:600;">View Memory</a>
          </div>
        `;

        const marker = L.marker(coords, { icon: heartIcon })
          .addTo(map)
          .bindPopup(popupContent, { maxWidth: 240, className: 'memory-popup' });

        markersRef.current.push(marker);
      });

      setFogKey((k) => k + 1);
    });
  }, [localMemories, leafletLoaded]);

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
      {/* Map container */}
      <div style={{ position: 'relative', flex: 1 }}>
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

        {/* Fog canvas overlay */}
        {leafletLoaded && mapInstanceRef.current && (
          <FogCanvas
            key={fogKey}
            map={mapInstanceRef.current}
            placedMemories={placed}
          />
        )}

        {/* Placement mode banner */}
        {placingMemory && (
          <div style={{
            position: 'absolute',
            top: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#e11d48',
            color: 'white',
            padding: '10px 20px',
            borderRadius: 24,
            fontWeight: 600,
            fontSize: 14,
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            whiteSpace: 'nowrap',
          }}>
            Click map to place: {placingMemory.title}
            <button
              onClick={() => setPlacingMemory(null)}
              style={{ marginLeft: 12, background: 'rgba(255,255,255,0.3)', border: 'none', color: 'white', borderRadius: 12, padding: '2px 8px', cursor: 'pointer', fontWeight: 700 }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Sidebar */}
      {unplaced.length > 0 && (
        <div style={{
          width: 280,
          background: '#fff',
          borderLeft: '1px solid #f0f0f0',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-4px 0 12px rgba(0,0,0,0.06)',
          zIndex: 500,
        }}>
          <div style={{ padding: '16px 16px 8px', borderBottom: '1px solid #f5f5f5' }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#1a1a2e' }}>Unplaced Memories</div>
            <div style={{ fontSize: 12, color: '#999', marginTop: 2 }}>Click a memory, then click the map to place it</div>
          </div>
          <div style={{ overflowY: 'auto', flex: 1, padding: '8px 0' }}>
            {unplaced.map((mem) => {
              const cover = mem.cover || (Array.isArray(mem.images) && mem.images[0]) || null;
              const isPlacing = placingMemory?.id === mem.id;
              return (
                <div
                  key={mem.id}
                  onClick={() => setPlacingMemory(isPlacing ? null : mem)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 14px',
                    cursor: 'pointer',
                    background: isPlacing ? '#fff1f3' : 'transparent',
                    borderLeft: isPlacing ? '3px solid #e11d48' : '3px solid transparent',
                    transition: 'background 0.15s',
                  }}
                >
                  {cover ? (
                    <img
                      src={cover}
                      alt={mem.title}
                      style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }}
                    />
                  ) : (
                    <div style={{ width: 44, height: 44, borderRadius: 8, background: '#fce7f3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                      ❤️
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, color: '#1a1a2e', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{mem.title}</div>
                    {mem.date && (
                      <div style={{ fontSize: 11, color: '#aaa', marginTop: 2 }}>
                        {new Date(mem.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: 18, color: isPlacing ? '#e11d48' : '#ccc' }}>📍</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  try {
    const res = await fetch(`${base}/rest/v1/only_us_memories?select=*&order=date.desc`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });
    const data = await res.json();
    return { props: { initialMemories: Array.isArray(data) ? data : [] } };
  } catch (e) {
    return { props: { initialMemories: [] } };
  }
}

export default function MapPage({ initialMemories }) {
  const [MapComponent_, setMapComponent] = useState(null);

  useEffect(() => {
    // Dynamic import of the map component (no SSR)
    setMapComponent(() => MapComponent);
    // Inject Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }
    // Inject popup styles
    if (!document.getElementById('map-popup-css')) {
      const style = document.createElement('style');
      style.id = 'map-popup-css';
      style.textContent = `
        .memory-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.18);
          border: none;
          padding: 0;
          overflow: hidden;
        }
        .memory-popup .leaflet-popup-content {
          margin: 12px;
        }
        .memory-popup .leaflet-popup-tip-container {
          display: none;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Our Map — Only Us</title>
      </Head>
      <Navbar />
      <div style={{ position: 'relative' }}>
        {MapComponent_ ? (
          <MapComponent_ memories={initialMemories} />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 64px)', background: '#0f0f1a', color: '#fff', fontSize: 18 }}>
            Loading map...
          </div>
        )}
      </div>
    </>
  );
}
