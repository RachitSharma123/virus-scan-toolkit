import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * Hero component for the home page. Presents an emotional introduction with CTAs.
 */
export default function Hero() {
  return (
    <section className="bg-rose/30 py-24 md:py-32 relative overflow-hidden">
      <div className="container text-center max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-script text-dark mb-6"
        >
          Our Little World
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-700 mb-8"
        >
          A warm space for us to store our memories, write our notes, and cherish our journey together.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            href="/memories"
            className="px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-rose transition-colors"
          >
            View Memories
          </Link>
          <Link
            href="/diary"
            className="px-6 py-3 rounded-full border-2 border-primary text-primary font-medium hover:bg-primary hover:text-white transition-colors"
          >
            Write a Note
          </Link>
        </motion.div>
      </div>
    </section>
  );
}