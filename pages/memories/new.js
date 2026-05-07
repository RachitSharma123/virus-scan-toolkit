import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';

export default function NewMemoryPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [caption, setCaption] = useState('');
  const [mood, setMood] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef();

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);
    for (const file of files) {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const { url } = await res.json();
      if (url) setImages((prev) => [...prev, url]);
    }
    setUploading(false);
  };

  const removeImage = (url) => setImages((prev) => prev.filter((u) => u !== url));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !date || !mood) return;
    setSaving(true);
    const tagList = tags.split(',').map((t) => t.trim()).filter(Boolean);
    const res = await fetch('/api/memories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title, date, location, caption, mood, description,
        tags: tagList,
        cover: images[0] || '',
        images,
        favourite: false,
      }),
    });
    if (res.ok) {
      const mem = await res.json();
      router.push(`/memories/${mem.id}`);
    }
    setSaving(false);
  };

  return (
    <div className="container py-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-script text-dark mb-8 text-center">Add a Memory</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-soft p-8 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required
              className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="Our first date" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required
              className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input value={location} onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="Yarra River, Melbourne" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mood *</label>
            <select value={mood} onChange={(e) => setMood(e.target.value)} required
              className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40">
              <option value="">Select mood</option>
              <option value="romantic">Romantic</option>
              <option value="happy">Happy</option>
              <option value="peaceful">Peaceful</option>
              <option value="adventurous">Adventurous</option>
              <option value="thoughtful">Thoughtful</option>
              <option value="funny">Funny</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
          <input value={caption} onChange={(e) => setCaption(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="Short caption" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4}
            className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="Tell the story of this memory..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
          <input value={tags} onChange={(e) => setTags(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="date, beach, sunset" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Photos</label>
          <div className="flex flex-wrap gap-3 mb-3">
            {images.map((url) => (
              <div key={url} className="relative w-24 h-24 rounded-xl overflow-hidden">
                <Image src={url} alt="uploaded" fill className="object-cover" />
                <button type="button" onClick={() => removeImage(url)}
                  className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => fileRef.current.click()}
              className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-colors">
              <Upload className="w-5 h-5 mb-1" />
              <span className="text-xs">{uploading ? 'Uploading...' : 'Add photo'}</span>
            </button>
          </div>
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
        </div>

        <button type="submit" disabled={saving}
          className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-rose transition-colors disabled:opacity-60">
          {saving ? 'Saving...' : 'Save Memory'}
        </button>
      </form>
    </div>
  );
}
