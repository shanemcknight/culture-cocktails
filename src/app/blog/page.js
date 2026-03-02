import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';

export const metadata = {
  title: 'Blog',
  description: 'Insights on beverage development, formulation, market trends, and industry best practices from Culture Cocktails.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="max-w-[900px] mx-auto px-6 md:px-10 pb-20" style={{ paddingTop: '140px' }}>
      <p className="fade-up text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-blue mb-4">Blog</p>
      <h1 className="fade-up text-3xl md:text-4xl font-medium tracking-tight mb-4">
        Beverage Industry Insights
      </h1>
      <p className="fade-up text-gray-text leading-relaxed mb-12 max-w-[600px]">
        Expert perspectives on formulation, market trends, and building successful beverage brands.
      </p>

      {posts.length > 0 ? (
        <div className="flex flex-col gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="fade-up block bg-white rounded-xl border border-black/5 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block bg-blue-light text-blue px-3 py-1 rounded-full text-xs font-semibold">
                  {post.category}
                </span>
                <span className="text-xs text-gray-light">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </span>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-black">{post.title}</h2>
              <p className="text-sm text-gray-text leading-relaxed">{post.excerpt}</p>
              <span className="inline-block mt-4 text-blue text-sm font-semibold">
                Read more →
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-text">
          <p className="text-lg mb-2">Coming soon</p>
          <p className="text-sm">We&apos;re working on our first articles. Check back soon!</p>
        </div>
      )}
    </section>
  );
}
