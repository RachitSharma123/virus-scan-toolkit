import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  const today = new Date();
  const dayOfWeek = today.toLocaleDateString('en-AU', { weekday: 'long' });
  const dateStr = today.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <section className="paper-grain px-5 pt-10 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="mono text-sm text-mute uppercase tracking-widest mb-2">{dayOfWeek}</p>
        <h1 className="serif-i text-5xl text-ink leading-tight mb-3">{dateStr}</h1>
        <p className="text-ink-soft text-base mt-3 max-w-sm leading-relaxed">
          A warm little space for the two of us — memories, notes, and everything in between.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex gap-3 mt-7"
      >
        <Link href="/memories"
          className="px-6 py-3 rounded-full bg-accent text-white text-base font-medium hover:bg-accent/90 transition-colors">
          Add a memory
        </Link>
        <Link href="/diary"
          className="px-6 py-3 rounded-full border border-line text-ink-soft text-base font-medium hover:border-accent hover:text-accent transition-colors">
          Write a note
        </Link>
      </motion.div>
    </section>
  );
}
