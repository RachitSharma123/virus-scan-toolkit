import Hero from '../components/Hero';
import MemoryCard from '../components/MemoryCard';
import TimelineItem from '../components/TimelineItem';
import BucketListCard from '../components/BucketListCard';
import Link from 'next/link';

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

export default function Home({ memories, diaryCount, bucketPreview, timelinePreview }) {
  const latest = memories.slice(0, 3);
  const favouriteCount = memories.filter((m) => m.favourite).length;

  return (
    <>
      <Hero />
      <section className="container py-12">
        <h2 className="text-2xl font-script text-dark mb-6 text-center">Latest Memories</h2>
        {latest.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {latest.map((mem) => (
              <Link key={mem.id} href={`/memories/${mem.id}`} className="block">
                <MemoryCard memory={mem} />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No memories yet. <Link href="/memories/new" className="text-primary">Add one!</Link></p>
        )}
        <div className="text-center mt-6">
          <Link href="/memories/new" className="inline-block bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-rose transition-colors">
            + Add Memory
          </Link>
        </div>
      </section>

      <section className="bg-secondary/50 py-12">
        <div className="container text-center">
          <h2 className="text-2xl font-script text-dark mb-6">Our Stats</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-soft p-6">
              <p className="text-3xl font-semibold text-primary">{memories.length}</p>
              <p className="text-gray-600">Memories</p>
            </div>
            <div className="bg-white rounded-lg shadow-soft p-6">
              <p className="text-3xl font-semibold text-primary">{diaryCount}</p>
              <p className="text-gray-600">Diary Notes</p>
            </div>
            <div className="bg-white rounded-lg shadow-soft p-6">
              <p className="text-3xl font-semibold text-primary">{favouriteCount}</p>
              <p className="text-gray-600">Favourites</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-script text-dark">Timeline Preview</h2>
          <Link href="/timeline" className="text-primary hover:underline">View full timeline →</Link>
        </div>
        <div className="border-l border-rose/30 pl-4 relative">
          {timelinePreview.map((event, idx) => (
            <TimelineItem key={event.id} event={event} isLast={idx === timelinePreview.length - 1} />
          ))}
        </div>
      </section>

      <section className="bg-secondary/50 py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-script text-dark">Bucket List Preview</h2>
            <Link href="/bucket-list" className="text-primary hover:underline">See all plans →</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {bucketPreview.map((item) => (
              <BucketListCard key={item.id} item={item} onToggle={() => {}} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
