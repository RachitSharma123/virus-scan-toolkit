import { CheckCircle, Circle } from 'lucide-react';

export default function BucketListCard({ item, onToggle }) {
  const isDone = item.status === 'done';
  return (
    <div className="bg-card rounded-2xl shadow-soft p-4 flex items-start gap-3">
      <button
        onClick={() => onToggle(item.id)}
        aria-label={isDone ? 'Mark as planned' : 'Mark as done'}
        className="mt-0.5 flex-shrink-0"
      >
        {isDone ? (
          <CheckCircle className="w-5 h-5 text-sage" />
        ) : (
          <Circle className="w-5 h-5 text-mute" />
        )}
      </button>
      <div className="flex-1 min-w-0">
        <h3 className={`serif text-base text-ink ${isDone ? 'line-through text-mute' : ''}`}>
          {item.title}
        </h3>
        {item.category && (
          <p className="mono text-xs text-mute mt-0.5 capitalize">{item.category}</p>
        )}
        {item.note && (
          <p className="text-sm text-ink-soft mt-1">{item.note}</p>
        )}
      </div>
    </div>
  );
}
