import { Heart } from 'lucide-react';

/**
 * Displays an empty state illustration and message when a section has no content.
 *
 * @param {Object} props
 * @param {string} props.message - Message to display
 */
export default function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Heart className="w-12 h-12 text-rose mb-4" />
      <p className="text-gray-600">{message}</p>
    </div>
  );
}