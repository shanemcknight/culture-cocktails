import { getProjects } from '@/lib/projects';
import Image from 'next/image';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

export default function HomePage() {
  const projects = getProjects();

  const services = [
    { icon: '🧪', title: 'Custom Formulation', desc: 'Proprietary flavor systems and formulas built from scratch — optimized for taste, stability, and production scale.' },
    { icon: '📋', title: 'Regulatory & Compliance', desc: 'TTB formulas, FDA labeling, state compliance — we handle the paperwork so you can focus on building your brand.' },
    { icon: '🏭', title: 'Production Scaling', desc: 'From 5-gallon test batches to full co-packing runs. We bridge the gap between R&D and manufacturing.' },
    { icon: '📦', title: 'Packaging & Supply Chain', desc: 'Can, bottle, pouch — we spec the package and connect you with vetted suppliers at the right price point.' },
  ];

  const stats = [
    { num: '25+', label: 'Years of Experience' },
    { num: '100+', label: 'Products Developed' },
    { num: '50+', label: 'Brands Served' },
    { num: '12', label: 'Beverage Categories' },
  ];

  const tickerItems = [
    'Custom Formulation', 'RTD Cocktails', 'Clean Label Formulation', 'Process Authority',
    'Spirits & Liqueurs', 'Functional Beverages', 'Sodas & Seltzers', 'CBD / THC Beverages',
    'Draft & Fountain Systems', 'Production Scaling',
  ];

  const processSteps = [
    { num: '01', title: 'Discovery', desc: 'We learn your vision, target market, price point, and production goals.' },
    { num: '02', title: 'Formulation', desc: 'R&D creates your formula — iterating on taste, stability, and cost targets.' },
    { num: '03', title: 'Validation', desc: 'Shelf-life testing, regulatory review, and production trial runs.' },
    { num: '04', title: 'Launch', desc: 'Manufacturing specs, co-packer coordination, and ongoing support.' },
  ];

  return (
    <>
      {/* HERO */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-20" style={{ paddingTop: 'calc(90px + 80px)' }}>
        <h1 className="fade-up text-2xl md:text-[2.3rem] font-normal tracking-tight leading-tight max-w-[700px] mb-6">
          Beverage product development, proven at scale.
        </h1>
        <p className="fade-up text-base md:text-lg text-gray-text max-w-[600px] leading-relaxed mb-5">
          We don&apos;t just develop beverages — we deliver the formula, the package design,
          the manufacturing specs, and a clear path to market.
        </p>
        <p className="fade-up text-[0.92rem] text-gray-text max-w-[580px] leading-relaxed pl-5 mb-8"
           style={{ borderLeft: '3px solid #025D9F' }}>
          From raw ingredient sourcing to packaging supply chain, every detail is mapped
          before you spend a dollar on production.{' '}
          <strong className="text-black">25+ years. Over 100 products. Zero guesswork.</strong>
        </p>
        <div className="fade-up flex gap-4 flex-wrap">
          <a href="#contact" className="btn-primary">Start Your Project</a>
          <a href="#work" className="btn-outline">See Our Work</a>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span className="ticker-item" key={i}>{item}</span>
          ))}
        </div>
      </div>

      {/* TRUSTED BY */}
      <section className="text-center py-12 px-6 md:px-10 border-b border-black/5">
        <p className="text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-gray-light mb-6">
          Trusted By
        </p>
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

      {/* SERVICES */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-20" id="services">
        <p className="fade-up text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-blue mb-4">What We Do</p>
        <h2 className="fade-up text-3xl md:text-4xl font-medium tracking-tight mb-4">End-to-end beverage development</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {services.map((s, i) => (
            <div key={i} className="fade-up p-8 bg-white rounded-xl border border-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="text-2xl mb-4">{s.icon}</div>
              <h3 className="text-base font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-gray-text leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="bg-black py-16 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={i} className="fade-up">
              <span className="block text-3xl md:text-[2.8rem] font-bold text-white tracking-tight">{s.num}</span>
              <span className="block text-xs text-white/50 mt-1">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO / WORK */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-20" id="work">
        <p className="fade-up text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-blue mb-4">Our Work</p>
        <h2 className="fade-up text-3xl md:text-4xl font-medium tracking-tight mb-4">Recent Projects</h2>
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
            {projects.map((project) => (
              <div key={project.id} className="fade-up bg-white rounded-xl overflow-hidden border border-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                {project.image && project.image !== '/images/placeholder-project.jpg' && (
                  <div className="relative h-56">
                    <Image src={project.image} alt={project.title} fill className="object-cover" />
                  </div>
                )}
                <div className="p-5">
                  <span className="inline-block bg-blue-light text-blue px-3 py-1 rounded-full text-xs font-semibold mb-2">{project.category}</span>
                  <h3 className="text-base font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-text leading-relaxed">{project.description}</p>
                  {project.client && (
                    <p className="text-xs font-semibold text-blue mt-3">Client: {project.client}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {['RTD Cocktails', 'Spirits & Liqueurs', 'Functional Beverages', 'Sodas & Seltzers',
              'CBD / THC Beverages', 'Clean Label', 'Draft Systems', 'Custom Formulation'].map((cat, i) => (
              <div key={i} className="fade-up bg-white border border-black/5 rounded-lg py-7 px-6 text-center text-[0.95rem] font-medium transition-all duration-300 hover:border-blue hover:text-blue hover:-translate-y-0.5 hover:shadow-md">
                {cat}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ABOUT */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-20" id="about">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="fade-up relative h-80 md:h-[480px] rounded-xl overflow-hidden">
            <Image src="/images/about-photo.jpg" alt="Culture Cocktails team" fill className="object-cover object-top" />
          </div>
          <div className="fade-up">
            <p className="text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-blue mb-4">About Us</p>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">Beverage development is all we do.</h2>
            <p className="text-[0.92rem] text-gray-text leading-relaxed mb-4">
              Culture Cocktails is a beverage development consultancy with over 25 years
              of experience bringing drinks from concept to shelf. We work with startups,
              established brands, and everything in between.
            </p>
            <p className="text-[0.92rem] text-gray-text leading-relaxed mb-6">
              Our team has formulated and guided to market over 100 beverage products
              across every major category — from craft sodas to complex spirit-based
              cocktails to cutting-edge functional drinks.
            </p>
            <Link href="/about" className="btn-primary">Learn More</Link>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-20" id="process">
        <p className="fade-up text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-blue mb-4">Our Process</p>
        <h2 className="fade-up text-3xl md:text-4xl font-medium tracking-tight mb-4">Four steps from concept to shelf</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {processSteps.map((step, i) => (
            <div key={i} className="fade-up p-8 bg-white rounded-xl border border-black/5">
              <span className="block text-3xl font-bold text-blue opacity-40 mb-3">{step.num}</span>
              <h3 className="text-base font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-text leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="bg-white py-20 px-6 md:px-10" id="contact">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-12 md:gap-16 items-start">
          <div className="pt-5">
            <p className="fade-up text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-blue mb-4">Get Started</p>
            <h2 className="fade-up text-3xl md:text-4xl font-medium tracking-tight mb-4">Ready to develop your next beverage?</h2>
            <p className="fade-up text-gray-text leading-relaxed mb-6">
              Tell us about your project and we&apos;ll get back to you within 24 hours.
              Whether you&apos;re starting from scratch or scaling an existing recipe, we can help.
            </p>
            <div className="fade-up flex flex-col gap-1">
              <strong className="text-xs uppercase tracking-widest text-gray-text">Email</strong>
              <a href="mailto:shane@culturecocktails.co" className="text-blue font-medium hover:underline">shane@culturecocktails.co</a>
            </div>
          </div>
          <div className="fade-up bg-warm rounded-2xl p-8 md:p-10 border border-black/5">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
