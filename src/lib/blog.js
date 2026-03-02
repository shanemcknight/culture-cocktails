import fs from 'fs';
import path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');

export function getAllPosts() {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.json'));

  const posts = files
    .map((file) => {
      try {
        const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
        const post = JSON.parse(raw);
        return {
          ...post,
          slug: file.replace('.json', ''),
        };
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return posts;
}

export function getPost(slug) {
  const filePath = path.join(BLOG_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;

  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return { ...JSON.parse(raw), slug };
  } catch {
    return null;
  }
}
