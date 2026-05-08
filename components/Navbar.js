import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Today' },
  { href: '/memories', label: 'Memories' },
  { href: '/map', label: 'Places' },
  { href: '/timeline', label: 'Timeline' },
  { href: '/bucket-list', label: 'Bucket List' },
  { href: '/favourites', label: 'Favourites' },
  { href: '/about', label: 'Us' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const logout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-cream border-b border-line">
      <div className="container flex items-center justify-between h-14">
        <Link href="/" className="serif-i text-2xl text-ink tracking-tight leading-none">
          only us.
        </Link>
        <div className="hidden md:flex items-center gap-5">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className={`text-sm transition-colors ${
                router.pathname === l.href
                  ? 'text-accent font-medium'
                  : 'text-ink-soft hover:text-ink'
              }`}>
              {l.label}
            </Link>
          ))}
          <button onClick={logout} className="text-mute hover:text-accent transition-colors ml-1">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
        <button className="md:hidden p-2 text-ink-soft" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-cream border-t border-line px-4 py-4 space-y-3">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className={`block text-sm ${
                router.pathname === l.href ? 'text-accent font-medium' : 'text-ink-soft'
              }`}>
              {l.label}
            </Link>
          ))}
          <button onClick={logout} className="text-sm text-mute flex items-center gap-1 pt-1">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      )}
    </nav>
  );
}
