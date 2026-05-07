import { supabaseAdmin } from '../../../lib/supabase';

export default async function handler(req, res) {
  const db = supabaseAdmin();

  if (req.method === 'GET') {
    const { data, error } = await db
      .from('only_us_memories')
      .select('*')
      .order('date', { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { title, date, location, cover, caption, tags, mood, favourite, description, images } = req.body;
    const { data, error } = await db
      .from('only_us_memories')
      .insert({ title, date, location, cover, caption, tags, mood, favourite: favourite ?? false, description, images })
      .select()
      .single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data);
  }

  res.status(405).end();
}
