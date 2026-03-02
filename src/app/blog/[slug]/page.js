import { getPost, getAllPosts } from '@/lib/blog';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  return (
    <article className="max-w-[720px] mx-auto px-6 md:px-10 pb-20" style={{ paddingTop: '140px' }}>
      <Link
        href="/blog"
        className="fade-up inline-block text-sm text-blue font-medium mb-8 hover:underline"
      >
        ← Back to Blog
      </Link>

      <div className="fade-up flex items-center gap-3 mb-4">
        <span className="inline-block bg-blue-light text-blue px-3 py-1 rounded-full text-xs font-semibold">
          {post.category}
        </span>
        <span className="text-xs text-gray-light">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
          })}
        </span>
      </div>

      <h1 className="fade-up text-2xl md:text-[2.2rem] font-semibold tracking-tight leading-tight mb-8">
        {post.title}
      </h1>

      <div
        className="fade-up prose"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* CTA */}
      <div className="fade-up mt-16 p-8 bg-white rounded-xl border border-black/5 text-center">
        <h3 className="text-lg font-semibold mb-2">Need help with your beverage project?</h3>
        <p className="text-sm text-gray-text mb-4">
          We&apos;ve developed over 100 products across every major category.
        </p>
        <Link href="/#contact" className="btn-primary">Start Your Project</Link>
      </div>
    </article>
  );
}
