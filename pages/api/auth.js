import { setCookie, deleteCookie } from 'cookies-next';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { pin } = req.body;
    if (pin === process.env.COUPLE_PIN) {
      setCookie('only-us-session', 'authenticated', {
        req, res,
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
      return res.status(200).json({ ok: true });
    }
    return res.status(401).json({ error: 'Wrong PIN' });
  }
  if (req.method === 'DELETE') {
    deleteCookie('only-us-session', { req, res });
    return res.status(200).json({ ok: true });
  }
  res.status(405).end();
}
