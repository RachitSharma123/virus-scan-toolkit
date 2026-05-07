import { useState, useMemo } from 'react';
import MemoryCard from '../../components/MemoryCard';
import SearchFilterBar from '../../components/SearchFilterBar';
import Link from 'next/link';
import EmptyState from '../../components/EmptyState';

export async function getServerSideProps() {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const { data } = await fetch(`${base}/rest/v1/only_us_memories?select=*&order=date.desc`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  }).then((r) => r.json().then((d) => ({ data: d })));
  return { props: { initialMemories: Array.isArray(data) ? data : [] } };
}

export default function MemoriesPage({ initialMemories }) {
  const [mems, setMems] = useState(initialMemories);
  const [searchTerm, setSearchTerm] = useState('');
  const [moodFilter, setMoodFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [sort, setSort] = useState('newest');

  const moodOptions = useMemo(() => [...new Set(mems.map((m) => m.mood))], [mems]);
  const locationOptions = useMemo(() => [...new Set(mems.map((m) => m.location))], [mems]);

  const toggleFavourite = async (id) => {
    const mem = mems.find((m) => m.id === id);
    await fetch(`/api/memories/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ favourite: !mem.favourite }),
    });
    setMems((prev) => prev.map((m) => m.id === id ? { ...m, favourite: !m.favourite } : m));
  };

  const filtered = useMemo(() => {
    let list = [...mems];
    if (searchTerm) {
      const t = searchTerm.toLowerCase();
      list = list.filter((m) =>
        m.title.toLowerCase().includes(t) ||
        m.caption?.toLowerCase().includes(t) ||
        m.tags?.some((tag) => tag.toLowerCase().includes(t))
      );
    }
    if (moodFilter) list = list.filter((m) => m.mood === moodFilter);
    if (locationFilter) list = list.filter((m) => m.location === locationFilter);
    list.sort((a, b) => {
      const d = new Date(b.date) - new Date(a.date);
      return sort === 'newest' ? d : -d;
    });
    return list;
  }, [mems, searchTerm, moodFilter, locationFilter, sort]);

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-script text-dark">Our Memories</h1>
        <Link href="/memories/new" className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-rose transition-colors">
          + Add Memory
        </Link>
      </div>
      <SearchFilterBar
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        mood={moodFilter} setMood={setMoodFilter}
        location={locationFilter} setLocation={setLocationFilter}
        sort={sort} setSort={setSort}
        moodOptions={moodOptions} locationOptions={locationOptions}
      />
      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {filtered.map((mem) => (
            <Link key={mem.id} href={`/memories/${mem.id}`} className="block">
              <MemoryCard memory={mem} onToggleFavourite={toggleFavourite} />
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState message="No memories match your search." />
      )}
    </div>
  );
}
