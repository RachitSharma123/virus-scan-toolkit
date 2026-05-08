import { motion } from 'framer-motion';

export default function TimelineItem({ event, isLast }) {
  const dateStr = event.date
    ? new Date(event.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';

  return (
    <div className="relative pb-6">
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <p className="mono text-xs text-mute mb-0.5">{dateStr}</p>
        <h4 className="serif text-base text-ink">{event.title}</h4>
        {event.description && (
          <p className="text-sm text-ink-soft mt-0.5">{event.description}</p>
        )}
      </motion.div>
    </div>
  );
}
