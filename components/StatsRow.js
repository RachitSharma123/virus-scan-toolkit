import { useState, useEffect } from 'react';

const RELATIONSHIP_START = new Date('2025-03-15');

/**
 * Horizontal row of 4 stat cards computed from the memories array.
 * Stats: Days Together, Total Memories, Adventures, Favourites.
 *
 * @param {Object} props
 * @param {Array} props.memories - Array of memory objects
 */
export default function StatsRow({ memories }) {
  const [daysTogther, setDaysTogether] = useState(0);

  useEffect(() => {
    const today = new Date();
    const diffMs = today - RELATIONSHIP_START;
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    setDaysTogether(days);
  }, []);

  const totalMemories = memories.length;
  const adventures = memories.filter(
    (m) => Array.isArray(m.tags) && m.tags.includes('adventure')
  ).length;
  const favourites = memories.filter((m) => m.favourite).length;

  const stats = [
    { value: daysTogther, label: 'Days Together' },
    { value: totalMemories, label: 'Total Memories' },
    { value: adventures, label: 'Adventures' },
    { value: favourites, label: 'Favourites' },
  ];

  return (
    <section className="container py-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map(({ value, label }) => (
          <div
            key={label}
            className="bg-white rounded-2xl shadow-soft p-6 text-center"
          >
            <p className="text-3xl font-bold text-rose-400">{value}</p>
            <p className="text-gray-500 text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
