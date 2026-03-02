import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'About',
  description: 'Learn about Culture Cocktails — a beverage development consultancy with 25+ years of experience bringing drinks from concept to shelf.',
};

export default function AboutPage() {
  const differentiators = [
    { icon: '🎯', title: 'End-to-End Service', desc: 'We handle everything from formulation through production launch. No handoffs, no gaps, no surprises.' },
    { icon: '🏆', title: 'Proven Track Record', desc: "25+ years and 100+ products. We've seen every challenge and solved it. Your project benefits from all that experience." },
    { icon: '🤝', title: 'Brand-First Approach', desc: 'We build beverages that match your brand vision, price point, and target market — not the other way around.' },
    { icon: '⚡', title: 'Speed to Market', desc: 'Our established relationships with suppliers and co-packers mean faster timelines and fewer delays.' },
  ];

  return (
    <>
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-20" style={{ paddingTop: '140px' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="fade-up relative h-80 md:h-[500px] rounded-xl overflow-hidden">
            <Image src="/images/about-photo.jpg" alt="Culture Cocktails team" fill className="object-cover object-top" />
          </div>
          <div className="fade-up">
            <p className="text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-blue mb-4">About Us</p>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">Beverage development is all we do.</h2>
            <p className="text-[0.92rem] text-gray-text leading-relaxed mb-4">
              Culture Cocktails is a beverage development consultancy with over 25 years of experience bringing drinks from concept to shelf. We work with startups, established brands, and everything in between.
            </p>
            <p className="text-[0.92rem] text-gray-text leading-relaxed mb-4">
              Our team has formulated and guided to market over 100 beverage products across every major category — from craft sodas to complex spirit-based cocktails to cutting-edge functional drinks.
            </p>
            <p className="text-[0.92rem] text-gray-text leading-relaxed">
              We don&apos;t just hand you a recipe. We deliver production-ready formulas, complete regulatory documentation, packaging specs, and co-packer introductions. Every detail is mapped before you spend a dollar on production.
            </p>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-20">
        <h2 className="fade-up text-3xl md:text-4xl font-medium tracking-tight mb-8">What sets us apart</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {differentiators.map((item, i) => (
            <div key={i} className="fade-up p-8 bg-white rounded-xl border border-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="text-2xl mb-4">{item.icon}</div>
              <h3 className="text-base font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-text leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="text-center py-12 px-6 md:px-10 border-y border-black/5">
        <p className="text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-gray-light mb-6">Trusted By</p>
        <div className="flex justify-center items-center gap-8 md:gap-12 flex-wrap max-w-[800px] mx-auto">
          {[
            { src: '/images/patco-brands.png', alt: 'Patco Brands' },
            { src: '/images/alameda-soda-company.png', alt: 'Alameda Soda Company' },
            { src: '/images/mpl.png', alt: 'MPL' },
            { src: '/images/top-hat-provisions.png', alt: 'Top Hat Provisions' },
          ].map((logo) => (
            <div key={logo.alt} className="relative h-20 w-28">
              <Image src={logo.src} alt={logo.alt} fill className="object-contain" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 px-6 md:px-10 text-center">
        <p className="fade-up text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-blue mb-4">Get Started</p>
        <h2 className="fade-up text-3xl md:text-4xl font-medium tracking-tight mb-6">Let&apos;s build your next beverage</h2>
        <div className="fade-up mt-6">
          <Link href="/#contact" className="btn-primary">Start Your Project</Link>
        </div>
      </section>
    </>
  );
}
