import Link from 'next/link';

export const metadata = {
  title: 'Services | Culture Cocktails',
  description: 'Custom beverage formulation, regulatory compliance, production scaling, and packaging solutions. Full-service beverage development consultancy.',
};

export default function ServicesPage() {
  const services = [
    {
      icon: '🧪',
      title: 'Custom Formulation',
      desc: 'Proprietary flavor systems and formulas built from scratch — optimized for taste, stability, and production scale. We develop recipes that work in the lab and on the production line.',
      details: [
        'Flavor profiling and benchmarking',
        'Ingredient sourcing and cost optimization',
        'Shelf-life stability testing',
        'Nutritional analysis and panel documentation',
      ],
    },
    {
      icon: '📋',
      title: 'Regulatory & Compliance',
      desc: 'TTB formulas, FDA labeling, state compliance — we handle the paperwork so you can focus on building your brand.',
      details: [
        'TTB formula approval (COLA)',
        'FDA nutrition facts and labeling',
        'State-by-state distribution compliance',
        'Organic and non-GMO certification guidance',
      ],
    },
    {
      icon: '🏭',
      title: 'Production Scaling',
      desc: 'From 5-gallon test batches to full co-packing runs. We bridge the gap between R&D and manufacturing.',
      details: [
        'Pilot batch production',
        'Co-packer selection and vetting',
        'Production process documentation',
        'Quality control protocols',
      ],
    },
    {
      icon: '📦',
      title: 'Packaging & Supply Chain',
      desc: 'Can, bottle, pouch — we spec the package and connect you with vetted suppliers at the right price point.',
      details: [
        'Package design specifications',
        'Supplier sourcing and negotiation',
        'Packaging line compatibility testing',
        'Minimum order quantity optimization',
      ],
    },
    {
      icon: '🎯',
      title: 'Market Strategy',
      desc: 'We help position your beverage for success with competitive analysis and go-to-market planning.',
      details: [
        'Competitive landscape analysis',
        'Price point optimization',
        'Target demographic profiling',
        'Distribution channel strategy',
      ],
    },
    {
      icon: '🔬',
      title: 'Process Authority',
      desc: 'Scheduled process filing and thermal processing validation for shelf-stable beverages.',
      details: [
        'Thermal process validation',
        'Scheduled process filing with FDA',
        'pH and water activity testing',
        'Preservation system design',
      ],
    },
  ];

  const categories = [
    'RTD Cocktails',
    'Spirits & Liqueurs',
    'Functional Beverages',
    'Sodas & Seltzers',
    'CBD / THC Beverages',
    'Clean Label Beverages',
    'Draft & Fountain Systems',
    'Energy & Sports Drinks',
  ];

  return (
    <>
      <nav>
        <div className="nav-inner">
          <Link className="nav-logo" href="/"><img src="/images/culture-cocktails-logo.png" alt="Culture Cocktails" /></Link>
          <ul className="nav-links">
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/#work">Work</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/process">Process</Link></li>
            <li><a href="/#contact" className="nav-cta">Start a Project</a></li>
          </ul>
        </div>
      </nav>

      <section className="services" style={{ paddingTop: '140px' }}>
        <p className="section-label fade-up">What We Do</p>
        <h2 className="section-title fade-up">Full-service beverage development</h2>
        <p className="fade-up" style={{ maxWidth: '680px', color: 'var(--gray-text)', lineHeight: 1.7, marginBottom: '3rem' }}>
          From initial concept through production launch, we provide everything you need to bring a beverage to market. Our team has developed over 100 products across every major category.
        </p>

        <div className="services-grid">
          {services.map((s, i) => (
            <div className="service-card fade-up" key={i}>
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.2rem', fontSize: '.88rem', color: 'var(--gray-text)', lineHeight: 1.8 }}>
                {s.details.map((d, j) => (
                  <li key={j}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="stats">
        <div className="stats-grid">
          <div className="stat fade-up"><span className="stat-number">25+</span><span className="stat-label">Years of Experience</span></div>
          <div className="stat fade-up"><span className="stat-number">100+</span><span className="stat-label">Products Developed</span></div>
          <div className="stat fade-up"><span className="stat-number">50+</span><span className="stat-label">Brands Served</span></div>
          <div className="stat fade-up"><span className="stat-number">12</span><span className="stat-label">Beverage Categories</span></div>
        </div>
      </section>

      <section className="categories" style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 40px' }}>
        <p className="section-label fade-up">Categories We Serve</p>
        <h2 className="section-title fade-up">Every type of beverage</h2>
        <div className="categories-grid">
          {categories.map((cat, i) => (
            <div className="category-card fade-up" key={i}><span>{cat}</span></div>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-inner">
          <p className="section-label fade-up">Get Started</p>
          <h2 className="section-title fade-up">Ready to develop your next beverage?</h2>
          <p className="fade-up" style={{ maxWidth: '600px', margin: '0 auto 2rem', color: 'var(--gray-text)' }}>
            Tell us about your project and we&apos;ll get back to you within 24 hours.
          </p>
          <div className="fade-up" style={{ textAlign: 'center' }}>
            <a href="/#contact" className="btn-primary">Start Your Project</a>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <div className="footer-brand">
            <img src="/images/culture-cocktails-logo.png" alt="Culture Cocktails" className="footer-logo" />
            <p>Beverage development consultancy.<br />Concept to shelf, proven at scale.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/process">Process</Link></li>
              <li><a href="/#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Get in Touch</h4>
            <p>shane@culturecocktails.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Culture Cocktails. All rights reserved.</p>
        </div>
      </footer>

      <script dangerouslySetInnerHTML={{ __html: `document.addEventListener('DOMContentLoaded',function(){var o=new IntersectionObserver(function(e){e.forEach(function(en){if(en.isIntersecting)en.target.classList.add('visible')})},{threshold:0.1});document.querySelectorAll('.fade-up').forEach(function(el){o.observe(el)})});` }} />
    </>
  );
}
