import { useState } from 'react';
import BucketListCard from '../components/BucketListCard';

export async function getServerSideProps() {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const data = await fetch(`${base}/rest/v1/only_us_bucket?select=*&order=created_at.asc`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  }).then((r) => r.json());
  return { props: { initialItems: Array.isArray(data) ? data : [] } };
}

export default function BucketListPage({ initialItems }) {
  const [items, setItems] = useState(initialItems);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  const addItem = async (e) => {
    e.preventDefault();
    if (!title || !category) return;
    setSaving(true);
    const res = await fetch('/api/bucket', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, category, note }),
    });
    const item = await res.json();
    setItems((prev) => [...prev, item]);
    setTitle(''); setCategory(''); setNote('');
    setSaving(false);
  };

  const toggleStatus = async (id) => {
    const item = items.find((i) => i.id === id);
    const newStatus = item.status === 'done' ? 'planned' : 'done';
    const res = await fetch('/api/bucket', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus }),
    });
    const updated = await res.json();
    setItems((prev) => prev.map((i) => i.id === id ? updated : i));
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-script text-dark mb-6 text-center">Our Bucket List</h1>
      <form onSubmit={addItem} className="bg-white rounded-2xl shadow-soft p-6 mb-8 space-y-4">
        <h2 className="text-xl font-semibold text-dark mb-2">Add a New Item</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="Experience title" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40">
              <option value="">Select category</option>
              <option value="Adventure">Adventure</option>
              <option value="Travel">Travel</option>
              <option value="Home">Home</option>
              <option value="Food">Food</option>
              <option value="Spiritual">Spiritual</option>
              <option value="Cute">Cute</option>
              <option value="Chill">Chill</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="Optional details" />
          </div>
        </div>
        <button type="submit" disabled={saving}
          className="bg-primary text-white px-6 py-2 rounded-xl font-medium hover:bg-rose transition-colors disabled:opacity-60">
          {saving ? 'Saving...' : 'Add Item'}
        </button>
      </form>
      {items.length > 0 ? (
        <div className="space-y-4">
          {items.map((item) => (
            <BucketListCard key={item.id} item={item} onToggle={toggleStatus} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">Your bucket list is empty. Dream big!</p>
      )}
    </div>
  );
}
