import { supabaseAdmin } from '../../../lib/supabase';

export default async function handler(req, res) {
  const db = supabaseAdmin();
  const id = parseInt(req.query.id, 10);

  if (req.method === 'GET') {
    const { data, error } = await db.from('only_us_memories').select('*').eq('id', id).single();
    if (error) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json(data);
  }

  if (req.method === 'PATCH') {
    const { data, error } = await db
      .from('only_us_memories')
      .update(req.body)
      .eq('id', id)
      .select()
      .single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === 'DELETE') {
    const { error } = await db.from('only_us_memories').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(204).end();
  }

  res.status(405).end();
}
