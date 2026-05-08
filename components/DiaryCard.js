import MoodChip from './MoodChip';

export default function DiaryCard({ entry }) {
  const dateStr = entry.date
    ? new Date(entry.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';

  return (
    <div className="bg-card rounded-2xl shadow-soft p-4 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <h3 className="serif text-base text-ink leading-snug">{entry.title}</h3>
        <MoodChip mood={entry.mood} />
      </div>
      <p className="mono text-xs text-mute">{dateStr}</p>
      <p className="text-sm text-ink-soft line-clamp-3">{entry.note}</p>
    </div>
  );
}
