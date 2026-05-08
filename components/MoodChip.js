export default function MoodChip({ mood }) {
  const colourMap = {
    romantic: 'bg-accent-soft text-accent',
    peaceful: 'bg-sage/20 text-sage',
    happy: 'bg-accent2/20 text-accent2',
    thoughtful: 'bg-card-soft text-ink-soft',
  };
  const classes = colourMap[mood] || 'bg-card-soft text-mute';
  return (
    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${classes}`}>{mood}</span>
  );
}
