import { getProjects } from '@/lib/projects';
import { getAllPosts } from '@/lib/blog';
import Image from 'next/image';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import CountUp from '@/components/CountUp';
import ImageCarousel from '@/components/ImageCarousel';
import HeroCarousel from '@/components/HeroCarousel';

// Always fetch fresh project data so admin changes (reorder, new projects) go live immediately
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const projects = await getProjects();
  const recentPosts = getAllPosts().slice(0, 3);

  const services = [
    {
      icon: (
        <svg className="w-8 h-8 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      ),
      title: 'Custom Formulation',
      desc: 'Proprietary flavor systems and formulas built from scratch — optimized for taste, stability, and production scale.',
    },
    {
      icon: (
        <svg className="w-8 h-8 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
        </svg>
      ),
      title: 'Regulatory & Compliance',
      desc: 'TTB formulas, FDA labeling, state compliance — we handle the paperwork so you can focus on building your brand.',
    },
    {
      icon: (
        <svg className="w-8 h-8 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
        </svg>
      ),
      title: 'Production Scaling',
      desc: 'From 5-gallon test batches to full co-packing runs. We bridge the gap between R&D and manufacturing.',
    },
    {
      icon: (
        <svg className="w-8 h-8 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
        </svg>
      ),
      title: 'Packaging & Supply Chain',
      desc: 'Can, bottle, pouch — we spec the package and connect you with vetted suppliers at the right price point.',
    },
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

  const testimonials = [
    {
      quote: 'Culture Cocktails took our concept from a napkin sketch to a shelf-ready product in under four months. Their formulation expertise and industry connections saved us at least six figures in trial and error.',
      name: 'Marcus Rivera',
      title: 'Founder & CEO',
      company: 'Azul Spirits Co.',
    },
    {
      quote: 'We came to Shane with a complex functional beverage formula that two other labs couldn\'t stabilize. His team nailed it on the second iteration. The quality and speed were unmatched.',
      name: 'Jennifer Tanaka',
      title: 'VP of Product Development',
      company: 'Botanica Beverages',
    },
    {
      quote: 'From regulatory guidance to co-packer introductions, they handled every detail we didn\'t even know we needed. Our RTD cocktail line launched on time and under budget.',
      name: 'David Chen',
      title: 'Co-Founder',
      company: 'Heyday Drinks',
    },
  ];

  const certifications = [
    {
      icon: (
        <svg className="w-10 h-10 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      title: 'FDA-Registered Facility Partner',
      desc: 'Direct partnership with an FDA-registered production facility for full regulatory compliance.',
    },
    {
      icon: (
        <svg className="w-10 h-10 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
        </svg>
      ),
      title: 'SQF Certified Facility Partner',
      desc: 'Our production partner holds SQF certification — the gold standard in food safety management.',
    },
    {
      icon: (
        <svg className="w-10 h-10 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
      title: 'USBG Member',
      desc: 'Proud member of the United States Bartenders\' Guild — deeply connected to the craft cocktail community.',
    },
  ];

  return (
    <>
      {/* HERO — with gradient accent */}
      <section className="relative overflow-hidden" style={{ paddingTop: '110px' }}>
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-warm via-warm to-blue-light/30" style={{ top: '110px' }} />
        {/* Decorative dots pattern */}
        <div className="absolute top-[120px] right-0 w-96 h-96 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #025D9F 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 pt-20 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="fade-up inline-flex items-center gap-2 bg-blue/5 border border-blue/10 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 bg-blue rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-blue tracking-wide">25+ Years of Beverage Innovation</span>
              </div>

              <h1 className="fade-up text-3xl md:text-[2.8rem] font-semibold tracking-tight leading-[1.15] mb-6">
                Beverage product development,{' '}
                <span className="text-blue">proven at scale.</span>
              </h1>

              <p className="fade-up text-base md:text-lg text-gray-text max-w-[540px] leading-relaxed mb-5">
                We don&apos;t just develop beverages — we deliver the formula, the package design,
                the manufacturing specs, and a clear path to market.
              </p>

              <p className="fade-up text-[0.92rem] text-gray-text max-w-[520px] leading-relaxed pl-5 mb-8"
                style={{ borderLeft: '3px solid #025D9F' }}>
                From raw ingredient sourcing to packaging supply chain, every detail is mapped
                before you spend a dollar on production.{' '}
                <strong className="text-black">Over 100 products. Zero guesswork.</strong>
              </p>

              <div className="fade-up flex gap-4 flex-wrap">
                <a href="#contact" className="btn-primary">Start Your Project</a>
                <a href="#work" className="btn-outline">See Our Work</a>
              </div>
            </div>

            {/* Hero image carousel — auto-rotates */}
            <div className="fade-up hidden lg:block">
              <div className="relative h-[460px] rounded-2xl overflow-hidden shadow-2xl">
                <HeroCarousel
                  images={[
                    { src: '/images/hero-lab.jpg', alt: 'Beverage formulation in the lab' },
                  ]}
                  interval={5000}
                />
              </div>
            </div>
          </div>
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
      <section className="text-center py-14 px-6 md:px-10 border-b border-black/5">
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
            <div key={logo.alt} className="relative h-20 w-28 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
              <Image src={logo.src} alt={logo.alt} fill className="object-contain" />
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES — with SVG icons */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-20" id="services">
        <p className="fade-up text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-blue mb-4">What We Do</p>
        <h2 className="fade-up text-3xl md:text-4xl font-semibold tracking-tight mb-4">End-to-end beverage development</h2>
        <p className="fade-up text-gray-text max-w-[600px] leading-relaxed mb-10">
          Everything you need to go from idea to shelf — formulation, compliance, production, and packaging under one roof.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className="fade-up stagger p-8 bg-white rounded-xl border border-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-blue/20 group"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="mb-5 p-3 bg-blue-light rounded-lg inline-block transition-colors duration-300 group-hover:bg-blue/10">
                {s.icon}
              </div>
              <h3 className="text-base font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-gray-text leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS — with counter animation */}
      <section className="bg-gradient-to-r from-[#011E36] to-[#02375A] py-16 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={i} className="fade-up">
              <span className="block text-3xl md:text-[2.8rem] font-bold text-white tracking-tight">
                <CountUp end={s.num} />
              </span>
              <span className="block text-xs text-white/50 mt-2 tracking-wide">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CERTIFICATIONS & TRUST */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-20">
        <div className="text-center mb-12">
          <p className="fade-up text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-blue mb-4">Credentials</p>
          <h2 className="fade-up text-3xl md:text-4xl font-semibold tracking-tight mb-4">Built on trust and compliance</h2>
          <p className="fade-up text-gray-text max-w-[550px] mx-auto leading-relaxed">
            We partner with certified facilities and maintain the highest standards of food safety and regulatory compliance.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <div
              key={i}
              className="fade-up stagger p-8 bg-white rounded-xl border border-black/5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-blue/20"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-light rounded-full mb-5">
                {cert.icon}
              </div>
              <h3 className="text-base font-semibold mb-2">{cert.title}</h3>
              <p className="text-sm text-gray-text leading-relaxed">{cert.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO / WORK */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-20" id="work">
        <p className="fade-up text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-blue mb-4">Our Work</p>
        <h2 className="fade-up text-3xl md:text-4xl font-semibold tracking-tight mb-4">Recent Projects</h2>
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
            {projects.map((project) => (
              <div key={project.id} className="fade-up bg-white rounded-xl overflow-hidden border border-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                {/* Multi-image carousel or single image fallback */}
                {project.images && project.images.length > 0 ? (
                  <ImageCarousel images={project.images} alt={project.title} />
                ) : project.image && project.image !== '/images/placeholder-project.jpg' ? (
                  <div className="relative h-56">
                    <Image src={project.image} alt={project.title} fill className="object-cover" />
                  </div>
                ) : null}
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

      {/* TESTIMONIALS — dark section for contrast */}
      <section className="bg-gradient-to-br from-[#011E36] to-[#02375A] py-20 px-6 md:px-10 relative overflow-hidden">
        {/* Decorative accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue via-blue-light to-blue" />

        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <p className="fade-up text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-blue-light/70 mb-4">Client Testimonials</p>
            <h2 className="fade-up text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">What our clients say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="fade-up stagger bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 transition-all duration-300 hover:bg-white/10"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Quote mark */}
                <svg className="w-8 h-8 text-blue/40 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
                </svg>
                <p className="text-sm text-white/80 leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/50">{t.title}, {t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-20" id="about">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="fade-up relative h-80 md:h-[480px] rounded-2xl overflow-hidden shadow-xl">
            <Image src="/images/about-photo.jpg" alt="Culture Cocktails team" fill className="object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
          <div className="fade-up">
            <p className="text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-blue mb-4">About Us</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">Beverage development is all we do.</h2>
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
            <div className="flex gap-8 mb-8">
              <div>
                <span className="block text-2xl font-bold text-blue">25+</span>
                <span className="text-xs text-gray-text">Years</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-blue">100+</span>
                <span className="text-xs text-gray-text">Products</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-blue">50+</span>
                <span className="text-xs text-gray-text">Brands</span>
              </div>
            </div>
            <Link href="/about" className="btn-primary">Learn More</Link>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-white py-20 px-6 md:px-10" id="process">
        <div className="max-w-[1200px] mx-auto">
          <p className="fade-up text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-blue mb-4">Our Process</p>
          <h2 className="fade-up text-3xl md:text-4xl font-semibold tracking-tight mb-4">Four steps from concept to shelf</h2>
          <p className="fade-up text-gray-text max-w-[550px] leading-relaxed mb-10">
            A proven, repeatable framework that minimizes risk and maximizes speed to market.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <div
                key={i}
                className="fade-up stagger p-8 bg-warm rounded-xl border border-black/5 relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="block text-4xl font-bold text-blue/15 mb-3 transition-colors duration-300 group-hover:text-blue/30">{step.num}</span>
                <h3 className="text-base font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-text leading-relaxed">{step.desc}</p>
                {/* Connector line */}
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-blue/20" />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/process" className="btn-outline">Learn More About Our Process</Link>
          </div>
        </div>
      </section>

      {/* BLOG / INSIGHTS CALLOUT */}
      {recentPosts.length > 0 && (
        <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <p className="fade-up text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-blue mb-4">Insights & Trends</p>
              <h2 className="fade-up text-3xl md:text-4xl font-semibold tracking-tight">Industry knowledge, shared.</h2>
            </div>
            <Link href="/blog" className="fade-up btn-outline mt-4 md:mt-0">
              View All Articles
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPosts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="fade-up stagger bg-white rounded-xl border border-black/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-blue/20 group"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-block bg-blue-light text-blue px-3 py-1 rounded-full text-xs font-semibold">{post.category}</span>
                  <span className="text-xs text-gray-light">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <h3 className="text-base font-semibold mb-2 group-hover:text-blue transition-colors">{post.title}</h3>
                <p className="text-sm text-gray-text leading-relaxed line-clamp-3">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue mt-4 group-hover:gap-2 transition-all">
                  Read More
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CONTACT */}
      <section className="bg-white py-20 px-6 md:px-10" id="contact">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-12 md:gap-16 items-start">
          <div className="pt-5">
            <p className="fade-up text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-blue mb-4">Get Started</p>
            <h2 className="fade-up text-3xl md:text-4xl font-semibold tracking-tight mb-4">Ready to develop your next beverage?</h2>
            <p className="fade-up text-gray-text leading-relaxed mb-6">
              Tell us about your project and we&apos;ll get back to you within 24 hours.
              Whether you&apos;re starting from scratch or scaling an existing recipe, we can help.
            </p>
            <div className="fade-up space-y-4">
              <div className="flex flex-col gap-1">
                <strong className="text-xs uppercase tracking-widest text-gray-text">Email</strong>
                <a href="mailto:shane@culturecocktails.co" className="text-blue font-medium hover:underline">shane@culturecocktails.co</a>
              </div>
              {/* Trust reinforcement near form */}
              <div className="flex items-center gap-3 pt-4">
                <svg className="w-5 h-5 text-blue/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <span className="text-xs text-gray-text">FDA & SQF compliant facility partners</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-blue/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs text-gray-text">Response within 24 hours</span>
              </div>
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
