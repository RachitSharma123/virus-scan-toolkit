import Image from 'next/image';
import { Heart } from 'lucide-react';
import MoodChip from './MoodChip';

/**
 * A card representing a single memory in the gallery. Displays the cover image, summary
 * details and allows favouriting via a heart icon.
 *
 * @param {Object} props
 * @param {Object} props.memory - Memory data object
 * @param {Function} props.onToggleFavourite - Callback to toggle favourite status
 */
export default function MemoryCard({ memory, onToggleFavourite }) {
  return (
    <div className="relative bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={memory.cover}
          alt={memory.title}
          fill
          className="object-cover"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleFavourite(memory.id);
          }}
          aria-label="Toggle favourite"
          className="absolute top-2 right-2 z-10 p-1 rounded-full bg-white/70 hover:bg-white"
        >
          <Heart
            className={`w-5 h-5 ${memory.favourite ? 'text-rose' : 'text-gray-400'}`}
            fill={memory.favourite ? '#FADADD' : 'none'}
          />
        </button>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-dark truncate" title={memory.title}>{memory.title}</h3>
        <p className="text-sm text-gray-500">{new Date(memory.date).toLocaleDateString()}</p>
        <p className="text-sm text-gray-500 italic">{memory.location}</p>
        <p className="text-sm text-gray-600 line-clamp-2">{memory.caption}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          <MoodChip mood={memory.mood} />
          {memory.tags.map((tag) => (
            <span
              key={tag}
              className="bg-lavender/50 text-gray-700 text-xs px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}