import Link from 'next/link';
import { useState, useEffect } from 'react';
import MemoryCard from './MemoryCard';

export default function OnThisDay({ memories }) {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const now = new Date();
    const todayMonth = now.getMonth();
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
    <section className="px-5 py-4">
      <div className="bg-accent-soft rounded-2xl p-5 relative overflow-hidden">
        <div className="tape -top-1 left-8" />
        <p className="mono text-xs text-accent uppercase tracking-widest mb-1">On This Day</p>
        <h2 className="serif-i text-2xl text-ink mb-4">A year ago today…</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
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
