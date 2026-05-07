import { useState } from 'react';
import MemoryCard from '../components/MemoryCard';
import Link from 'next/link';
import EmptyState from '../components/EmptyState';

export async function getServerSideProps() {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const data = await fetch(`${base}/rest/v1/only_us_memories?favourite=eq.true&select=*&order=date.desc`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  }).then((r) => r.json());
  return { props: { initialFavourites: Array.isArray(data) ? data : [] } };
}

export default function FavouritesPage({ initialFavourites }) {
  const [favourites, setFavourites] = useState(initialFavourites);

  const toggleFavourite = async (id) => {
    await fetch(`/api/memories/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ favourite: false }),
    });
    setFavourites((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-script text-dark mb-6 text-center">Favourite Memories</h1>
      {favourites.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {favourites.map((mem) => (
            <Link key={mem.id} href={`/memories/${mem.id}`} className="block">
              <MemoryCard memory={mem} onToggleFavourite={toggleFavourite} />
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState message="No favourites yet. Heart a memory to see it here." />
      )}
    </div>
  );
}
