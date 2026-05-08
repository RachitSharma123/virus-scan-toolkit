import Image from 'next/image';
import { Heart } from 'lucide-react';

export default function MemoryCard({ memory, onToggleFavourite }) {
  const dateStr = memory.date
    ? new Date(memory.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';

  return (
    <div className="bg-card rounded-[18px] overflow-hidden shadow-card hover:shadow-soft transition-shadow">
      {memory.cover && (
        <div className="relative h-44 w-full">
          <Image
            src={memory.cover}
            alt={memory.title || 'Memory'}
            fill
            className="object-cover"
          />
          {onToggleFavourite && (
            <button
              onClick={(e) => { e.preventDefault(); onToggleFavourite(memory.id); }}
              aria-label="Toggle favourite"
              className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full bg-cream/80 backdrop-blur-sm"
            >
              <Heart
                className={`w-4 h-4 ${memory.favourite ? 'text-accent' : 'text-mute'}`}
                fill={memory.favourite ? '#b04a4a' : 'none'}
              />
            </button>
          )}
        </div>
      )}
      <div className="p-4 space-y-1.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="serif text-base text-ink leading-snug truncate">{memory.title}</h3>
          {!memory.cover && onToggleFavourite && (
            <button onClick={(e) => { e.preventDefault(); onToggleFavourite(memory.id); }} className="flex-shrink-0">
              <Heart
                className={`w-4 h-4 ${memory.favourite ? 'text-accent' : 'text-mute'}`}
                fill={memory.favourite ? '#b04a4a' : 'none'}
              />
            </button>
          )}
        </div>
        <p className="mono text-xs text-mute">{dateStr}{memory.location ? ` · ${memory.location}` : ''}</p>
        {memory.caption && (
          <p className="text-sm text-ink-soft line-clamp-2 mt-1">{memory.caption}</p>
        )}
        {memory.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {memory.tags.map((tag) => (
              <span key={tag} className="mood-chip text-xs">#{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
