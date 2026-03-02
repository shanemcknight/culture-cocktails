import Link from 'next/link';

export const metadata = {
  title: 'Our Process | Culture Cocktails',
  description: 'From discovery to launch — our proven four-step process takes your beverage from concept to shelf with zero guesswork.',
};

export default function ProcessPage() {
  const steps = [
    {
      num: '01',
      title: 'Discovery',
      desc: 'We learn your vision, target market, price point, and production goals.',
      details: 'Every project starts with a deep-dive conversation. We want to understand your brand, your audience, and what success looks like. We conduct competitive analysis, review your budget parameters, and define clear milestones for the project. By the end of Discovery, we have a detailed project brief that guides everything that follows.',
      timeline: '1–2 weeks',
    },
    {
      num: '02',
      title: 'Formulation',
      desc: 'R&D creates your formula — iterating on taste, stability, and cost targets.',
      details: 'Our formulation team develops your recipe from scratch, working through multiple iterations to nail the flavor profile. We optimize for taste, shelf stability, ingredient cost, and production feasibility simultaneously. You taste and approve at every stage — nothing moves forward without your sign-off.',
      timeline: '4–8 weeks',
    },
    {
      num: '03',
      title: 'Validation',
      desc: 'Shelf-life testing, regulatory review, and production trial runs.',
      details: 'Once the formula is locked, we put it through rigorous validation. Accelerated shelf-life testing ensures your product holds up over time. We handle all regulatory filings — TTB formulas, FDA labeling, state compliance. Pilot production runs confirm the formula scales cleanly to manufacturing volumes.',
      timeline: '4–6 weeks',
    },
    {
      num: '04',
      title: 'Launch',
      desc: 'Manufacturing specs, co-packer coordination, and ongoing support.',
      details: 'We deliver a complete production package: final formula documentation, manufacturing specifications, packaging specs, and quality control protocols. We introduce you to vetted co-packers, oversee the first production run, and provide ongoing technical support as you scale.',
      timeline: '2–4 weeks',
    },
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

      <section className="process" style={{ paddingTop: '140px' }}>
        <p className="section-label fade-up">Our Process</p>
        <h2 className="section-title fade-up">Four steps from concept to shelf</h2>
        <p className="fade-up" style={{ maxWidth: '680px', color: 'var(--gray-text)', lineHeight: 1.7, marginBottom: '3rem' }}>
          Our proven process eliminates guesswork and keeps your project on track. Every step has clear deliverables and timelines so you always know exactly where things stand.
        </p>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {steps.map((step, i) => (
            <div key={i} className="fade-up" style={{
              display: 'flex',
              gap: '2rem',
              marginBottom: '3rem',
              paddingBottom: '3rem',
              borderBottom: i < steps.length - 1 ? '1px solid #e5e7eb' : 'none',
              alignItems: 'flex-start',
            }}>
              <div style={{
                minWidth: '64px',
                height: '64px',
                background: 'var(--blue)',
                color: '#fff',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                fontWeight: 700,
              }}>
                {step.num}
              </div>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '.5rem', color: 'var(--black)' }}>
                  {step.title}
                </h3>
                <p style={{ fontWeight: 500, marginBottom: '.75rem', color: 'var(--black)' }}>
                  {step.desc}
                </p>
                <p style={{ color: 'var(--gray-text)', lineHeight: 1.7, fontSize: '.92rem', marginBottom: '.75rem' }}>
                  {step.details}
                </p>
                <span style={{
                  display: 'inline-block',
                  background: 'var(--blue-light)',
                  color: 'var(--blue)',
                  padding: '.3rem .75rem',
                  borderRadius: '20px',
                  fontSize: '.8rem',
                  fontWeight: 600,
                }}>
                  Timeline: {step.timeline}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="stats">
        <div className="stats-grid">
          <div className="stat fade-up"><span className="stat-number">11–20</span><span className="stat-label">Weeks Typical Timeline</span></div>
          <div className="stat fade-up"><span className="stat-number">100+</span><span className="stat-label">Products Launched</span></div>
          <div className="stat fade-up"><span className="stat-number">4</span><span className="stat-label">Clear Milestones</span></div>
          <div className="stat fade-up"><span className="stat-number">0</span><span className="stat-label">Guesswork</span></div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-inner">
          <p className="section-label fade-up">Get Started</p>
          <h2 className="section-title fade-up">Ready to start the process?</h2>
          <p className="fade-up" style={{ maxWidth: '600px', margin: '0 auto 2rem', color: 'var(--gray-text)' }}>
            Tell us about your project and we&apos;ll schedule a free Discovery call.
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
