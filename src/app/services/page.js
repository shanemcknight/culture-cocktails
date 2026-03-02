import Link from 'next/link';

export const metadata = {
  title: 'Services',
  description: 'Custom beverage formulation, regulatory compliance, production scaling, and packaging solutions. Full-service beverage development consultancy.',
};

export default function ServicesPage() {
  const services = [
    {
      icon: '🧪', title: 'Custom Formulation',
      desc: 'Proprietary flavor systems and formulas built from scratch — optimized for taste, stability, and production scale. We develop recipes that work in the lab and on the production line.',
      details: ['Flavor profiling and benchmarking', 'Ingredient sourcing and cost optimization', 'Shelf-life stability testing', 'Nutritional analysis and panel documentation'],
    },
    {
      icon: '📋', title: 'Regulatory & Compliance',
      desc: 'TTB formulas, FDA labeling, state compliance — we handle the paperwork so you can focus on building your brand.',
      details: ['TTB formula approval (COLA)', 'FDA nutrition facts and labeling', 'State-by-state distribution compliance', 'Organic and non-GMO certification guidance'],
    },
    {
      icon: '🏭', title: 'Production Scaling',
      desc: 'From 5-gallon test batches to full co-packing runs. We bridge the gap between R&D and manufacturing.',
      details: ['Pilot batch production', 'Co-packer selection and vetting', 'Production process documentation', 'Quality control protocols'],
    },
    {
      icon: '📦', title: 'Packaging & Supply Chain',
      desc: 'Can, bottle, pouch — we spec the package and connect you with vetted suppliers at the right price point.',
      details: ['Package design specifications', 'Supplier sourcing and negotiation', 'Packaging line compatibility testing', 'Minimum order quantity optimization'],
    },
    {
      icon: '🎯', title: 'Market Strategy',
      desc: 'We help position your beverage for success with competitive analysis and go-to-market planning.',
      details: ['Competitive landscape analysis', 'Price point optimization', 'Target demographic profiling', 'Distribution channel strategy'],
    },
    {
      icon: '🔬', title: 'Process Authority',
      desc: 'Scheduled process filing and thermal processing validation for shelf-stable beverages.',
      details: ['Thermal process validation', 'Scheduled process filing with FDA', 'pH and water activity testing', 'Preservation system design'],
    },
  ];

  const categories = [
    'RTD Cocktails', 'Spirits & Liqueurs', 'Functional Beverages', 'Sodas & Seltzers',
    'CBD / THC Beverages', 'Clean Label Beverages', 'Draft & Fountain Systems', 'Energy & Sports Drinks',
  ];

  return (
    <>
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-20" style={{ paddingTop: '140px' }}>
        <p className="fade-up text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-blue mb-4">What We Do</p>
        <h2 className="fade-up text-3xl md:text-4xl font-medium tracking-tight mb-4">Full-service beverage development</h2>
        <p className="fade-up max-w-[680px] text-gray-text leading-relaxed mb-12">
          From initial concept through production launch, we provide everything you need to bring a beverage to market. Our team has developed over 100 products across every major category.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="fade-up p-8 bg-white rounded-xl border border-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="text-2xl mb-4">{s.icon}</div>
              <h3 className="text-base font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-gray-text leading-relaxed">{s.desc}</p>
              <ul className="mt-4 pl-5 text-sm text-gray-text leading-loose list-disc">
                {s.details.map((d, j) => <li key={j}>{d}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="bg-black py-16 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: '25+', label: 'Years of Experience' },
            { num: '100+', label: 'Products Developed' },
            { num: '50+', label: 'Brands Served' },
            { num: '12', label: 'Beverage Categories' },
          ].map((s, i) => (
            <div key={i} className="fade-up">
              <span className="block text-3xl md:text-[2.8rem] font-bold text-white tracking-tight">{s.num}</span>
              <span className="block text-xs text-white/50 mt-1">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-20">
        <p className="fade-up text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-blue mb-4">Categories We Serve</p>
        <h2 className="fade-up text-3xl md:text-4xl font-medium tracking-tight mb-8">Every type of beverage</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <div key={i} className="fade-up bg-white border border-black/5 rounded-lg py-7 px-6 text-center text-[0.95rem] font-medium transition-all duration-300 hover:border-blue hover:text-blue hover:-translate-y-0.5 hover:shadow-md">
              {cat}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 px-6 md:px-10 text-center">
        <p className="fade-up text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-blue mb-4">Get Started</p>
        <h2 className="fade-up text-3xl md:text-4xl font-medium tracking-tight mb-6">Ready to develop your next beverage?</h2>
        <p className="fade-up max-w-[600px] mx-auto text-gray-text mb-8">
          Tell us about your project and we&apos;ll get back to you within 24 hours.
        </p>
        <div className="fade-up">
          <Link href="/#contact" className="btn-primary">Start Your Project</Link>
        </div>
      </section>
    </>
  );
}
