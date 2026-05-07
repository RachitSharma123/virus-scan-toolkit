import { supabaseAdmin } from '../../../../lib/supabase';

export default async function handler(req, res) {
  const db = supabaseAdmin();
  const memory_id = parseInt(req.query.id, 10);

  if (req.method === 'GET') {
    const { data, error } = await db
      .from('only_us_comments')
      .select('*')
      .eq('memory_id', memory_id)
      .order('created_at', { ascending: true });
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { text } = req.body;
    const { data, error } = await db
      .from('only_us_comments')
      .insert({ memory_id, text })
      .select()
      .single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data);
  }

  res.status(405).end();
}
