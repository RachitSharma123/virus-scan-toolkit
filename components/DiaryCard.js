import MoodChip from './MoodChip';

/**
 * Displays a diary entry with mood indicator and note preview.
 *
 * @param {Object} props
 * @param {Object} props.entry - Diary entry data
 */
export default function DiaryCard({ entry }) {
  return (
    <div className="bg-white rounded-lg shadow-soft p-4 flex flex-col gap-2 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-dark">{entry.title}</h3>
        <MoodChip mood={entry.mood} />
      </div>
      <p className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</p>
      <p className="text-gray-700 text-sm line-clamp-3">{entry.note}</p>
    </div>
  );
}