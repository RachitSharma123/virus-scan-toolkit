import { Heart } from 'lucide-react';

/**
 * Small badge to denote a favourite item. Displays a heart icon.
 */
export default function FavouriteBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-rose text-xs font-medium bg-rose/20 px-2 py-1 rounded-full">
      <Heart className="w-4 h-4" /> Favourite
    </span>
  );
}