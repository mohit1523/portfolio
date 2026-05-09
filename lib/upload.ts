import { mkdir, writeFile } from 'fs/promises';
import path from 'path';

function sanitizeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase();
}

export async function uploadAsset(file: File, folder: string) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}-${sanitizeFileName(file.name)}`;

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads', folder);
  await mkdir(uploadsDir, { recursive: true });

  const diskPath = path.join(uploadsDir, fileName);
  await writeFile(diskPath, buffer);

  return `/uploads/${folder}/${fileName}`;
}
