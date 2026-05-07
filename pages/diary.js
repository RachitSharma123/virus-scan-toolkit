import { useState } from 'react';
import DiaryCard from '../components/DiaryCard';
import { Trash2 } from 'lucide-react';

export async function getServerSideProps() {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const data = await fetch(`${base}/rest/v1/only_us_diary?select=*&order=date.desc`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  }).then((r) => r.json());
  return { props: { initialEntries: Array.isArray(data) ? data : [] } };
}

export default function DiaryPage({ initialEntries }) {
  const [entries, setEntries] = useState(initialEntries);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title || !date || !mood || !note) return;
    setSaving(true);
    const res = await fetch('/api/diary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, date, mood, note }),
    });
    const entry = await res.json();
    setEntries((prev) => [entry, ...prev]);
    setTitle(''); setDate(''); setMood(''); setNote('');
    setSaving(false);
  };

  const deleteEntry = async (id) => {
    await fetch(`/api/diary?id=${id}`, { method: 'DELETE' });
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-script text-dark mb-6 text-center">Our Diary</h1>
      <form onSubmit={handleAdd} className="bg-white rounded-2xl shadow-soft p-6 mb-8 space-y-4">
        <h2 className="text-xl font-semibold text-dark mb-2">Add a New Note</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="Entry title" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mood</label>
            <select value={mood} onChange={(e) => setMood(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40">
              <option value="">Select mood</option>
              <option value="romantic">romantic</option>
              <option value="peaceful">peaceful</option>
              <option value="happy">happy</option>
              <option value="thoughtful">thoughtful</option>
              <option value="adventurous">adventurous</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={4}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="Write your thoughts..." />
          </div>
        </div>
        <button type="submit" disabled={saving}
          className="mt-2 bg-primary text-white px-6 py-2 rounded-xl font-medium hover:bg-rose transition-colors disabled:opacity-60">
          {saving ? 'Saving...' : 'Add Note'}
        </button>
      </form>
      {entries.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {entries.map((entry) => (
            <div key={entry.id} className="relative group">
              <DiaryCard entry={entry} />
              <button onClick={() => deleteEntry(entry.id)}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-opacity">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No diary entries yet. Start writing!</p>
      )}
    </div>
  );
}
