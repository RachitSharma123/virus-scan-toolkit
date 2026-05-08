export default function Footer() {
  return (
    <footer className="border-t border-line py-8 mt-16 text-center">
      <p className="hand text-xl text-mute">made with love ♥</p>
      <p className="mono text-xs text-mute/60 mt-1">© {new Date().getFullYear()} only us</p>
    </footer>
  );
}
