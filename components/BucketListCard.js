import { CheckCircle, Circle } from 'lucide-react';

/**
 * Card representing a single bucket list item. Shows status and allows toggling between planned and done.
 *
 * @param {Object} props
 * @param {Object} props.item - Bucket list item data
 * @param {Function} props.onToggle - Callback when status toggled
 */
export default function BucketListCard({ item, onToggle }) {
  const isDone = item.status === 'done';
  return (
    <div className="bg-white rounded-lg shadow-soft p-4 flex items-start gap-3 hover:shadow-md transition-shadow">
      <button
        onClick={() => onToggle(item.id)}
        aria-label={isDone ? 'Mark as planned' : 'Mark as done'}
        className="mt-1"
      >
        {isDone ? (
          <CheckCircle className="w-6 h-6 text-primary" />
        ) : (
          <Circle className="w-6 h-6 text-gray-400" />
        )}
      </button>
      <div className="flex-1">
        <h3
          className={`font-semibold text-dark ${isDone ? 'line-through text-gray-500' : ''}`}
        >
          {item.title}
        </h3>
        <p className="text-sm text-gray-500 capitalize">{item.category}</p>
        <p className="text-sm text-gray-700 mt-1">{item.note}</p>
      </div>
    </div>
  );
}