import Link from 'next/link';
import { useState, useEffect } from 'react';
import MemoryCard from './MemoryCard';

/**
 * "On This Day" widget. Filters memories whose month+day matches today's
 * and renders a soft pink banner with the matching cards.
 *
 * @param {Object} props
 * @param {Array} props.memories - Array of memory objects with a `date` field
 */
export default function OnThisDay({ memories }) {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const now = new Date();
    const todayMonth = now.getMonth(); // 0-based
    const todayDay = now.getDate();

    const found = memories.filter((mem) => {
      if (!mem.date) return false;
      const d = new Date(mem.date);
      return d.getMonth() === todayMonth && d.getDate() === todayDay;
    });

    setMatches(found);
  }, [memories]);

  if (matches.length === 0) return null;

  return (
    <section className="container py-8">
      <div className="bg-pink-50 border border-pink-200 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl" aria-hidden="true">&#10084;&#65039;</span>
          <h2 className="text-2xl font-script text-rose-500">On This Day</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {matches.map((mem) => (
            <Link key={mem.id} href={`/memories/${mem.id}`} className="block">
              <MemoryCard memory={mem} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
