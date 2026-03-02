import Link from 'next/link';

export const metadata = {
  title: 'About | Culture Cocktails',
  description: 'Learn about Culture Cocktails — a beverage development consultancy with 25+ years of experience bringing drinks from concept to shelf.',
};

export default function AboutPage() {
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

      <section className="about" style={{ paddingTop: '140px' }}>
        <div className="about-grid">
          <div className="about-image fade-up">
            <img
              src="/images/about-photo.jpg"
              alt="Culture Cocktails team"
              style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', objectPosition: 'center top', borderRadius: '12px' }}
            />
          </div>
          <div className="about-text fade-up">
            <p className="section-label">About Us</p>
            <h2 className="section-title">Beverage development is all we do.</h2>
            <p style={{ color: 'var(--gray-text)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Culture Cocktails is a beverage development consultancy with over 25 years of experience bringing drinks from concept to shelf. We work with startups, established brands, and everything in between.
            </p>
            <p style={{ color: 'var(--gray-text)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Our team has formulated and guided to market over 100 beverage products across every major category — from craft sodas to complex spirit-based cocktails to cutting-edge functional drinks.
            </p>
            <p style={{ color: 'var(--gray-text)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              We don&apos;t just hand you a recipe. We deliver production-ready formulas, complete regulatory documentation, packaging specs, and co-packer introductions. Every detail is mapped before you spend a dollar on production.
            </p>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px 80px' }}>
        <h2 className="section-title fade-up" style={{ marginBottom: '2rem' }}>What sets us apart</h2>
        <div className="services-grid">
          {[
            {
              icon: '🎯',
              title: 'End-to-End Service',
              desc: 'We handle everything from formulation through production launch. No handoffs, no gaps, no surprises.',
            },
            {
              icon: '🏆',
              title: 'Proven Track Record',
              desc: '25+ years and 100+ products. We\'ve seen every challenge and solved it. Your project benefits from all that experience.',
            },
            {
              icon: '🤝',
              title: 'Brand-First Approach',
              desc: 'We build beverages that match your brand vision, price point, and target market — not the other way around.',
            },
            {
              icon: '⚡',
              title: 'Speed to Market',
              desc: 'Our established relationships with suppliers and co-packers mean faster timelines and fewer delays.',
            },
          ].map((item, i) => (
            <div className="service-card fade-up" key={i}>
              <div className="service-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="trusted-by">
        <p className="trusted-label">Trusted By</p>
        <div className="trusted-logos">
          <img src="/images/patco-brands.png" alt="Patco Brands" />
          <img src="/images/alameda-soda-company.png" alt="Alameda Soda Company" />
          <img src="/images/mpl.png" alt="MPL" />
          <img src="/images/top-hat-provisions.png" alt="Top Hat Provisions" />
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-inner">
          <p className="section-label fade-up">Get Started</p>
          <h2 className="section-title fade-up">Let&apos;s build your next beverage</h2>
          <div className="fade-up" style={{ textAlign: 'center', marginTop: '1.5rem' }}>
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
            <a href="mailto:shane@culturecocktails.co" style={{color: "rgba(255,255,255,0.5)", textDecoration: "none"}}>shane@culturecocktails.co</a>
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
