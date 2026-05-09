import Hero from '../components/Hero';
import MemoryCard from '../components/MemoryCard';
import TimelineItem from '../components/TimelineItem';
import BucketListCard from '../components/BucketListCard';
import OnThisDay from '../components/OnThisDay';
import StatsRow from '../components/StatsRow';
import Link from 'next/link';
import { motion } from 'framer-motion';

export async function getServerSideProps() {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const headers = { apikey: key, Authorization: `Bearer ${key}` };

  const [memsRes, diaryRes, bucketRes, timelineRes] = await Promise.all([
    fetch(`${base}/rest/v1/only_us_memories?select=*&order=date.desc`, { headers }),
    fetch(`${base}/rest/v1/only_us_diary?select=id`, { headers }),
    fetch(`${base}/rest/v1/only_us_bucket?select=*&order=created_at.asc&limit=2`, { headers }),
    fetch(`${base}/rest/v1/only_us_timeline?select=*&order=date.asc&limit=3`, { headers }),
  ]);

  const [mems, diary, bucket, timeline] = await Promise.all([
    memsRes.json(), diaryRes.json(), bucketRes.json(), timelineRes.json(),
  ]);

  return {
    props: {
      memories: Array.isArray(mems) ? mems : [],
      diaryCount: Array.isArray(diary) ? diary.length : 0,
      bucketPreview: Array.isArray(bucket) ? bucket : [],
      timelinePreview: Array.isArray(timeline) ? timeline : [],
    },
  };
}

// Rotating prompts for the "question of the day" card
const PROMPTS = [
  "What made you smile today?",
  "What's a small moment you want to remember?",
  "What are you looking forward to together?",
  "What's something you love about them?",
  "Describe today in three words.",
];

export default function Home({ memories, diaryCount, bucketPreview, timelinePreview }) {
  const latest = memories.slice(0, 6);
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const todayPrompt = PROMPTS[dayOfYear % PROMPTS.length];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Hero — date + CTA */}
      <Hero />

      {/* Stats strip */}
      <StatsRow memories={memories} />

      {/* On This Day */}
      <OnThisDay memories={memories} />

      {/* Daily prompt card */}
      <section className="px-5 py-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card shadow-card rounded-3xl p-6 relative overflow-hidden"
        >
          <div className="tape -top-1 right-10" style={{ transform: 'rotate(2deg)' }} />
          <p className="mono text-sm text-mute uppercase tracking-widest mb-3">Question of the day</p>
          <p className="serif-i text-2xl text-ink leading-snug mb-5">"{todayPrompt}"</p>
          <Link href="/diary"
            className="inline-block px-5 py-3 rounded-full bg-cream-deep text-ink-soft text-base font-medium hover:bg-accent hover:text-white transition-colors">
            Answer in diary →
          </Link>
        </motion.div>
      </section>

      {/* Recent memories feed */}
      <section className="px-5 py-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="serif text-2xl text-ink">Recent memories</h2>
          <Link href="/memories" className="mono text-sm text-mute hover:text-accent transition-colors">see all →</Link>
        </div>
        {latest.length > 0 ? (
          <div className="grid gap-5">
            {latest.map((mem, i) => (
              <motion.div
                key={mem.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link href={`/memories/${mem.id}`} className="block">
                  <MemoryCard memory={mem} />
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-3xl p-10 text-center shadow-soft">
            <p className="serif-i text-xl text-mute mb-4">No memories yet…</p>
            <Link href="/memories/new"
              className="inline-block px-6 py-3 rounded-full bg-accent text-white text-base">
              Add your first memory
            </Link>
          </div>
        )}
        {latest.length > 0 && (
          <div className="text-center mt-6">
            <Link href="/memories/new"
              className="inline-block px-8 py-3 rounded-full bg-accent text-white text-base font-medium hover:bg-accent/90 transition-colors">
              + Add memory
            </Link>
          </div>
        )}
      </section>

      {/* Timeline preview */}
      {timelinePreview.length > 0 && (
        <section className="px-5 py-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="serif text-2xl text-ink">Milestones</h2>
            <Link href="/timeline" className="mono text-sm text-mute hover:text-accent transition-colors">see all →</Link>
          </div>
          <div className="bg-card rounded-3xl shadow-soft p-5">
            <div className="border-l-2 border-line pl-5 space-y-5">
              {timelinePreview.map((event, idx) => (
                <TimelineItem key={event.id} event={event} isLast={idx === timelinePreview.length - 1} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bucket list preview */}
      {bucketPreview.length > 0 && (
        <section className="px-5 py-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="serif text-2xl text-ink">Things we'll do</h2>
            <Link href="/bucket-list" className="mono text-sm text-mute hover:text-accent transition-colors">see all →</Link>
          </div>
          <div className="grid gap-4">
            {bucketPreview.map((item) => (
              <BucketListCard key={item.id} item={item} onToggle={() => {}} />
            ))}
          </div>
        </section>
      )}

      {/* Stats summary */}
      <section className="px-5 py-5 pb-12">
        <div className="bg-card rounded-3xl shadow-soft p-6">
          <h2 className="serif text-2xl text-ink mb-5">Our story so far</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { v: memories.length, l: 'memories' },
              { v: diaryCount, l: 'diary notes' },
              { v: memories.filter((m) => m.favourite).length, l: 'favourites' },
            ].map(({ v, l }) => (
              <div key={l} className="text-center">
                <p className="text-3xl font-semibold text-accent">{v}</p>
                <p className="mono text-sm text-mute mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
