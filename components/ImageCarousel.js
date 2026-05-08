import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

/**
 * Image/video carousel for the memory detail page. Cycles through images and videos
 * with left/right buttons. Auto-plays every 3 seconds, pauses on hover.
 * Shows dot indicators at the bottom. Supports .mp4 and .mov video URLs.
 *
 * @param {Object} props
 * @param {string[]} props.images - Array of image or video URLs
 */
export default function ImageCarousel({ images }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto-play: advance every 3 seconds unless paused or only one item
  useEffect(() => {
    if (images.length <= 1 || paused) return;
    intervalRef.current = setInterval(next, 3000);
    return () => clearInterval(intervalRef.current);
  }, [images.length, paused, next]);

  const isVideo = (url) => {
    if (!url) return false;
    const lower = url.toLowerCase();
    return lower.endsWith('.mp4') || lower.endsWith('.mov');
  };

  return (
    <div
      className="relative w-full h-80 md:h-96 overflow-hidden rounded-lg"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence initial={false} custom={index}>
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          {isVideo(images[index]) ? (
            <video
              src={images[index]}
              autoPlay
              muted
              loop
              controls
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={images[index]}
              alt={`Memory image ${index + 1}`}
              fill
              className="object-cover"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/70 hover:bg-white text-dark rounded-full p-1"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/70 hover:bg-white text-dark rounded-full p-1"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  i === index
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
