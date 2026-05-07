import { motion } from 'framer-motion';

/**
 * A single item in the relationship timeline. Rendered as part of a vertical
 * timeline with a dot and connecting line.
 *
 * @param {Object} props
 * @param {Object} props.event - Timeline event data
 * @param {boolean} props.isLast - Whether this is the last item (to hide the line)
 */
export default function TimelineItem({ event, isLast }) {
  return (
    <div className="relative pl-10 pb-8">
      {/* Line */}
      {!isLast && (
        <span className="absolute left-4 top-2 h-full w-px bg-rose/40" aria-hidden="true" />
      )}
      {/* Dot */}
      <span className="absolute left-3 top-2 w-3 h-3 rounded-full bg-primary border-2 border-white" />
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
        <h4 className="text-lg font-semibold text-dark">{event.title}</h4>
        <p className="text-gray-700 text-sm mt-1">{event.description}</p>
      </motion.div>
    </div>
  );
}