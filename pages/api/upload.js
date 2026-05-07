import { supabaseAdmin } from '../../lib/supabase';
import formidable from 'formidable';
import fs from 'fs';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const form = formidable({ maxFileSize: 10 * 1024 * 1024 });
  form.parse(req, async (err, _fields, files) => {
    if (err) return res.status(400).json({ error: 'Upload failed' });
    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file) return res.status(400).json({ error: 'No file' });

    const ext = file.originalFilename?.split('.').pop() || 'jpg';
    const path = `memories/${Date.now()}.${ext}`;
    const buffer = fs.readFileSync(file.filepath);

    const db = supabaseAdmin();
    const { error } = await db.storage
      .from('only-us-images')
      .upload(path, buffer, { contentType: file.mimetype, upsert: false });

    if (error) return res.status(500).json({ error: error.message });

    const { data } = db.storage.from('only-us-images').getPublicUrl(path);
    return res.status(200).json({ url: data.publicUrl });
  });
}
