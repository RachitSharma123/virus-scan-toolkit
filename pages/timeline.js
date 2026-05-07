import { useState } from 'react';
import TimelineItem from '../components/TimelineItem';
import { Trash2 } from 'lucide-react';

export async function getServerSideProps() {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const data = await fetch(`${base}/rest/v1/only_us_timeline?select=*&order=date.asc`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  }).then((r) => r.json());
  return { props: { initialEvents: Array.isArray(data) ? data : [] } };
}

export default function TimelinePage({ initialEvents }) {
  const [events, setEvents] = useState(initialEvents);
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!date || !title) return;
    setSaving(true);
    const res = await fetch('/api/timeline', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, title, description }),
    });
    const event = await res.json();
    setEvents((prev) => [...prev, event].sort((a, b) => new Date(a.date) - new Date(b.date)));
    setDate(''); setTitle(''); setDescription('');
    setSaving(false);
  };

  const deleteEvent = async (id) => {
    await fetch(`/api/timeline?id=${id}`, { method: 'DELETE' });
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-script text-dark mb-8 text-center">Our Timeline</h1>
      <form onSubmit={handleAdd} className="bg-white rounded-2xl shadow-soft p-6 mb-10 space-y-4">
        <h2 className="text-xl font-semibold text-dark">Add a Milestone</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required
              className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required
              className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="First date" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="What happened?" />
          </div>
        </div>
        <button type="submit" disabled={saving}
          className="bg-primary text-white px-6 py-2 rounded-xl font-medium hover:bg-rose transition-colors disabled:opacity-60">
          {saving ? 'Saving...' : 'Add Milestone'}
        </button>
      </form>
      <div className="border-l border-rose/30 pl-4 relative">
        {events.map((event, idx) => (
          <div key={event.id} className="relative group">
            <TimelineItem event={event} isLast={idx === events.length - 1} />
            <button onClick={() => deleteEvent(event.id)}
              className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-opacity">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
