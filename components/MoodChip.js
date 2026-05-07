/**
 * Displays a colourful chip corresponding to a mood string.
 *
 * @param {Object} props
 * @param {string} props.mood - Mood of the memory or diary entry
 */
export default function MoodChip({ mood }) {
  const colourMap = {
    romantic: 'bg-rose/30 text-rose',
    peaceful: 'bg-lavender/30 text-purple-600',
    happy: 'bg-primary/20 text-primary',
    thoughtful: 'bg-beige/50 text-amber-700',
  };
  const classes = colourMap[mood] || 'bg-secondary/30 text-gray-700';
  return (
    <span className={`text-xs px-2 py-1 rounded-full ${classes}`}>{mood}</span>
  );
}