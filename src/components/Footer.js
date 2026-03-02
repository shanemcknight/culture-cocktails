import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 md:gap-16 mb-10">
        <div>
          <div className="relative h-9 w-36 mb-4">
            <Image
              src="/images/culture-cocktails-logo.png"
              alt="Culture Cocktails"
              fill
              className="object-contain object-left brightness-0 invert opacity-80"
            />
          </div>
          <p className="text-sm text-white/50 leading-relaxed">
            Beverage development consultancy.<br />
            Concept to shelf, proven at scale.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white/80 mb-4">Quick Links</h4>
          <ul className="flex flex-col gap-2.5">
            {[
              { href: '/services', label: 'Services' },
              { href: '/about', label: 'About' },
              { href: '/process', label: 'Process' },
              { href: '/blog', label: 'Blog' },
              { href: '/#contact', label: 'Contact' },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white/80 mb-4">Get in Touch</h4>
          <a
            href="mailto:shane@culturecocktails.co"
            className="text-sm text-white/50 hover:text-white transition-colors"
          >
            shane@culturecocktails.co
          </a>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto pt-6 border-t border-white/10 text-center">
        <p className="text-xs text-white/30">
          &copy; {new Date().getFullYear()} Culture Cocktails. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
