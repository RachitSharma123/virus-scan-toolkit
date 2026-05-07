import Link from 'next/link';
import { useRouter } from 'next/router';
import { Heart, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/memories', label: 'Memories' },
  { href: '/timeline', label: 'Timeline' },
  { href: '/diary', label: 'Diary' },
  { href: '/bucket-list', label: 'Bucket List' },
  { href: '/favourites', label: 'Favourites' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const logout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow-soft sticky top-0 z-50">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-script text-xl text-dark">
          <Heart className="w-5 h-5 text-primary fill-primary" />
          Only Us
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className={`text-sm font-medium transition-colors ${router.pathname === l.href ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
              {l.label}
            </Link>
          ))}
          <button onClick={logout} className="text-gray-400 hover:text-red-400 transition-colors ml-2">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block text-sm font-medium text-gray-700 hover:text-primary">
              {l.label}
            </Link>
          ))}
          <button onClick={logout} className="text-sm text-red-400 hover:text-red-600 flex items-center gap-1">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      )}
    </nav>
  );
}
