import { useState, useEffect } from 'react';

const RELATIONSHIP_START = new Date('2025-03-15');

export default function StatsRow({ memories }) {
  const [daysTogether, setDaysTogether] = useState(0);
  const [nextAnniversary, setNextAnniversary] = useState(0);

  useEffect(() => {
    const today = new Date();
    const diffMs = today - RELATIONSHIP_START;
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    setDaysTogether(days);

    // Days until next anniversary
    const thisYear = today.getFullYear();
    let ann = new Date(thisYear, RELATIONSHIP_START.getMonth(), RELATIONSHIP_START.getDate());
    if (ann <= today) ann = new Date(thisYear + 1, RELATIONSHIP_START.getMonth(), RELATIONSHIP_START.getDate());
    setNextAnniversary(Math.ceil((ann - today) / (1000 * 60 * 60 * 24)));
  }, []);

  const totalMemories = memories.length;
  const favourites = memories.filter((m) => m.favourite).length;

  return (
    <section className="px-5 py-4">
      <div className="flex gap-3 overflow-x-auto no-scrollbar">
        <StatPill value={daysTogether} label="days together" accent />
        <StatPill value={`${nextAnniversary}d`} label="to anniversary" />
        <StatPill value={totalMemories} label="memories" />
        <StatPill value={favourites} label="favourites" />
      </div>
    </section>
  );
}

function StatPill({ value, label, accent }) {
  return (
    <div className={`flex-shrink-0 rounded-2xl px-5 py-3 text-center min-w-[100px] shadow-soft ${
      accent ? 'bg-accent text-white' : 'bg-card text-ink'
    }`}>
      <p className={`text-2xl font-semibold ${accent ? 'text-white' : 'text-ink'}`}>{value}</p>
      <p className={`text-xs mt-0.5 ${accent ? 'text-white/70' : 'text-mute'}`}>{label}</p>
    </div>
  );
}
