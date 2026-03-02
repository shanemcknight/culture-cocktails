import { getProjects } from '@/lib/projects';
import Link from 'next/link';

export default function HomePage() {
  const projects = getProjects();

  return (
    <>
      {/* NAV */}
      <nav>
        <div className="nav-inner">
          <a className="nav-logo" href="/">
            <img src="/images/culture-cocktails-logo.png" alt="Culture Cocktails" />
          </a>
          <ul className="nav-links">
            <li><Link href="/services">Services</Link></li>
            <li><a href="#work">Work</a></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/process">Process</Link></li>
            <li><a href="#contact" className="nav-cta">Start a Project</a></li>
          </ul>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <h1 className="fade-up">Beverage product development, proven at scale.</h1>
        <p className="hero-sub fade-up">
          We don&apos;t just develop beverages — we deliver the formula, the package design,
          the manufacturing specs, and a clear path to market.
        </p>
        <p className="hero-proof fade-up">
          From raw ingredient sourcing to packaging supply chain, every detail is mapped
          before you spend a dollar on production.{' '}
          <strong>25+ years. Over 100 products. Zero guesswork.</strong>
        </p>
        <div className="hero-ctas fade-up">
          <a href="#contact" className="btn-primary">Start Your Project</a>
          <a href="#work" className="btn-outline">See Our Work</a>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker">
          {['Custom Formulation','RTD Cocktails','Clean Label Formulation','Process Authority',
            'Spirits & Liqueurs','Functional Beverages','Sodas & Seltzers','CBD / THC Beverages',
            'Draft & Fountain Systems','Production Scaling',
            'Custom Formulation','RTD Cocktails','Clean Label Formulation','Process Authority',
            'Spirits & Liqueurs','Functional Beverages','Sodas & Seltzers','CBD / THC Beverages',
            'Draft & Fountain Systems','Production Scaling'
          ].map((item, i) => (
            <span className="ticker-item" key={i}>{item}</span>
          ))}
        </div>
      </div>

      {/* TRUSTED BY */}
      <section className="trusted-by">
        <p className="trusted-label">Trusted By</p>
        <div className="trusted-logos">
          <img src="/images/patco-brands.png" alt="Patco Brands" />
          <img src="/images/alameda-soda-company.png" alt="Alameda Soda Company" />
          <img src="/images/mpl.png" alt="MPL" />
          <img src="/images/top-hat-provisions.png" alt="Top Hat Provisions" />
        </div>
      </section>

      {/* SERVICES */}
      <section className="services" id="services">
        <p className="section-label fade-up">What We Do</p>
        <h2 className="section-title fade-up">End-to-end beverage development</h2>
        <div className="services-grid">
          {[
            { icon: '🧪', title: 'Custom Formulation', desc: 'Proprietary flavor systems and formulas built from scratch — optimized for taste, stability, and production scale.' },
            { icon: '📋', title: 'Regulatory & Compliance', desc: 'TTB formulas, FDA labeling, state compliance — we handle the paperwork so you can focus on building your brand.' },
            { icon: '🏭', title: 'Production Scaling', desc: 'From 5-gallon test batches to full co-packing runs. We bridge the gap between R&D and manufacturing.' },
            { icon: '📦', title: 'Packaging & Supply Chain', desc: 'Can, bottle, pouch — we spec the package and connect you with vetted suppliers at the right price point.' },
          ].map((s, i) => (
            <div className="service-card fade-up" key={i}>
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="stats-grid">
          {[
            { num: '25+', label: 'Years of Experience' },
            { num: '100+', label: 'Products Developed' },
            { num: '50+', label: 'Brands Served' },
            { num: '12', label: 'Beverage Categories' },
          ].map((s, i) => (
            <div className="stat fade-up" key={i}>
              <span className="stat-number">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO / WORK */}
      <section className="categories" id="work">
        <p className="section-label fade-up">Our Work</p>
        <h2 className="section-title fade-up">Recent Projects</h2>
        {projects.length > 0 ? (
          <div className="projects-grid">
            {projects.map((project) => (
              <div className="project-card fade-up" key={project.id}>
                {project.image && project.image !== '/images/placeholder-project.jpg' && (
                  <img src={project.image} alt={project.title} />
                )}
                <div className="card-body">
                  <span className="tag">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  {project.client && (
                    <p style={{ fontSize: '.8rem', marginTop: '.5rem', fontWeight: 600, color: 'var(--blue)' }}>
                      Client: {project.client}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="categories-grid">
            {['RTD Cocktails','Spirits & Liqueurs','Functional Beverages','Sodas & Seltzers',
              'CBD / THC Beverages','Clean Label','Draft Systems','Custom Formulation'
            ].map((cat, i) => (
              <div className="category-card fade-up" key={i}>
                <span>{cat}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="about-grid">
          <div className="about-image fade-up">
            <img src="/images/about-photo.jpg" alt="Culture Cocktails team" style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', objectPosition: 'center top', borderRadius: '12px' }} />
          </div>
          <div className="about-text fade-up">
            <p className="section-label">About Us</p>
            <h2 className="section-title">Beverage development is all we do.</h2>
            <p>
              Culture Cocktails is a beverage development consultancy with over 25 years
              of experience bringing drinks from concept to shelf. We work with startups,
              established brands, and everything in between.
            </p>
            <p>
              Our team has formulated and guided to market over 100 beverage products
              across every major category — from craft sodas to complex spirit-based
              cocktails to cutting-edge functional drinks.
            </p>
            <Link href="/about" className="btn-primary">Learn More</Link>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="process" id="process">
        <p className="section-label fade-up">Our Process</p>
        <h2 className="section-title fade-up">Four steps from concept to shelf</h2>
        <div className="process-steps">
          {[
            { num: '01', title: 'Discovery', desc: 'We learn your vision, target market, price point, and production goals.' },
            { num: '02', title: 'Formulation', desc: 'R&D creates your formula — iterating on taste, stability, and cost targets.' },
            { num: '03', title: 'Validation', desc: 'Shelf-life testing, regulatory review, and production trial runs.' },
            { num: '04', title: 'Launch', desc: 'Manufacturing specs, co-packer coordination, and ongoing support.' },
          ].map((step, i) => (
            <div className="process-step fade-up" key={i}>
              <span className="step-number">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <div className="contact-inner">
          <p className="section-label fade-up">Get Started</p>
          <h2 className="section-title fade-up">Ready to develop your next beverage?</h2>
          <p className="fade-up" style={{ maxWidth: '600px', margin: '0 auto 2rem', color: 'var(--gray-text)' }}>
            Tell us about your project and we&apos;ll get back to you within 24 hours.
          </p>
          <form className="contact-form fade-up" action={`mailto:shane@culturecocktails.co`} method="POST" encType="text/plain">
            <div className="form-row">
              <input type="text" name="name" placeholder="Your Name" required />
              <input type="email" name="email" placeholder="Your Email" required />
            </div>
            <input type="text" name="company" placeholder="Company Name" />
            <textarea name="message" placeholder="Tell us about your project..." rows="5" required></textarea>
            <button type="submit" className="btn-primary">Send Message</button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
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
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Get in Touch</h4>
            <a href="mailto:shane@culturecocktails.co" style={{color: "rgba(255,255,255,0.5)", textDecoration: "none"}}>shane@culturecocktails.co</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Culture Cocktails. All rights reserved.</p>
        </div>
      </footer>

      {/* Scroll animations */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                  if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                  }
                });
              }, { threshold: 0.1 });
              document.querySelectorAll('.fade-up').forEach(function(el) {
                observer.observe(el);
              });
            });
          `,
        }}
      />
    </>
  );
}
