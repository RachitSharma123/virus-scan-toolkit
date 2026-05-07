import { Heart } from 'lucide-react';

/**
 * Romantic footer that closes each page with a soft message and copyright notice.
 */
export default function Footer() {
  return (
    <footer className="bg-cream py-8 mt-16">
      <div className="container flex flex-col items-center text-center gap-2">
        <Heart className="w-6 h-6 text-rose" />
        <p className="text-sm text-gray-600">Made with love for our story</p>
        <p className="text-xs text-gray-400">© {new Date().getFullYear()} Only Us. All rights reserved.</p>
      </div>
    </footer>
  );
}