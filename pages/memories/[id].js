import { useRouter } from 'next/router';
import { useState } from 'react';
import ImageCarousel from '../../components/ImageCarousel';
import MoodChip from '../../components/MoodChip';
import CommentBox from '../../components/CommentBox';
import MemoryCard from '../../components/MemoryCard';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';

export async function getServerSideProps({ params }) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const headers = { apikey: key, Authorization: `Bearer ${key}` };

  const [memRes, commentsRes] = await Promise.all([
    fetch(`${base}/rest/v1/only_us_memories?id=eq.${params.id}&select=*`, { headers }),
    fetch(`${base}/rest/v1/only_us_comments?memory_id=eq.${params.id}&select=*&order=created_at.asc`, { headers }),
  ]);

  const [mems, comments] = await Promise.all([memRes.json(), commentsRes.json()]);
  const memory = Array.isArray(mems) ? mems[0] : null;
  if (!memory) return { notFound: true };

  const relRes = await fetch(
    `${base}/rest/v1/only_us_memories?mood=eq.${memory.mood}&id=neq.${params.id}&select=*&limit=3`,
    { headers }
  );
  const related = await relRes.json();

  return { props: { memory, comments: Array.isArray(comments) ? comments : [], related: Array.isArray(related) ? related : [] } };
}

export default function MemoryDetail({ memory: initialMemory, comments: initialComments, related }) {
  const router = useRouter();
  const [memory, setMemory] = useState(initialMemory);
  const [comments, setComments] = useState(initialComments);

  const toggleFavourite = async () => {
    const res = await fetch(`/api/memories/${memory.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ favourite: !memory.favourite }),
    });
    const updated = await res.json();
    setMemory(updated);
  };

  const addComment = async (text) => {
    const res = await fetch(`/api/memories/${memory.id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const c = await res.json();
    setComments((prev) => [...prev, c]);
  };

  const deleteMemory = async () => {
    if (!confirm('Delete this memory?')) return;
    await fetch(`/api/memories/${memory.id}`, { method: 'DELETE' });
    router.push('/memories');
  };

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => router.back()} className="text-primary hover:underline">← Back</button>
        <button onClick={deleteMemory} className="text-red-400 hover:text-red-600 flex items-center gap-1 text-sm">
          <Trash2 className="w-4 h-4" /> Delete
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <ImageCarousel images={memory.images?.length ? memory.images : [memory.cover]} />
        </div>
        <div>
          <h1 className="text-3xl font-script text-dark mb-2">{memory.title}</h1>
          <p className="text-sm text-gray-500 mb-1">{new Date(memory.date).toLocaleDateString('en-AU', { dateStyle: 'long' })}</p>
          <p className="text-sm text-gray-500 italic mb-4">{memory.location}</p>
          <div className="mb-4 flex flex-wrap gap-2">
            <MoodChip mood={memory.mood} />
            {memory.tags?.map((tag) => (
              <span key={tag} className="bg-lavender/50 text-gray-700 text-xs px-2 py-1 rounded-full">#{tag}</span>
            ))}
          </div>
          <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">{memory.description}</p>
          <button onClick={toggleFavourite}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${memory.favourite ? 'bg-rose text-white hover:bg-rose/80' : 'bg-primary/20 text-primary hover:bg-primary/30'}`}>
            {memory.favourite ? '♥ Unfavourite' : '♡ Favourite'}
          </button>
        </div>
      </div>
      <CommentBox comments={comments.map((c) => c.text)} addComment={addComment} />
      {related.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-script text-dark mb-4">Related Memories</h3>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {related.map((mem) => (
              <Link key={mem.id} href={`/memories/${mem.id}`} className="block">
                <MemoryCard memory={mem} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
