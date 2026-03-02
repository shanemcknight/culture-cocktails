import Link from 'next/link';

export const metadata = {
  title: 'Our Process',
  description: 'From discovery to launch — our proven four-step process takes your beverage from concept to shelf with zero guesswork.',
};

export default function ProcessPage() {
  const steps = [
    {
      num: '01', title: 'Discovery', timeline: '1–2 weeks',
      desc: 'We learn your vision, target market, price point, and production goals.',
      details: 'Every project starts with a deep-dive conversation. We want to understand your brand, your audience, and what success looks like. We conduct competitive analysis, review your budget parameters, and define clear milestones for the project. By the end of Discovery, we have a detailed project brief that guides everything that follows.',
    },
    {
      num: '02', title: 'Formulation', timeline: '4–8 weeks',
      desc: 'R&D creates your formula — iterating on taste, stability, and cost targets.',
      details: 'Our formulation team develops your recipe from scratch, working through multiple iterations to nail the flavor profile. We optimize for taste, shelf stability, ingredient cost, and production feasibility simultaneously. You taste and approve at every stage — nothing moves forward without your sign-off.',
    },
    {
      num: '03', title: 'Validation', timeline: '4–6 weeks',
      desc: 'Shelf-life testing, regulatory review, and production trial runs.',
      details: 'Once the formula is locked, we put it through rigorous validation. Accelerated shelf-life testing ensures your product holds up over time. We handle all regulatory filings — TTB formulas, FDA labeling, state compliance. Pilot production runs confirm the formula scales cleanly to manufacturing volumes.',
    },
    {
      num: '04', title: 'Launch', timeline: '2–4 weeks',
      desc: 'Manufacturing specs, co-packer coordination, and ongoing support.',
      details: 'We deliver a complete production package: final formula documentation, manufacturing specifications, packaging specs, and quality control protocols. We introduce you to vetted co-packers, oversee the first production run, and provide ongoing technical support as you scale.',
    },
  ];

  return (
    <>
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-20" style={{ paddingTop: '140px' }}>
        <p className="fade-up text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-blue mb-4">Our Process</p>
        <h2 className="fade-up text-3xl md:text-4xl font-medium tracking-tight mb-4">Four steps from concept to shelf</h2>
        <p className="fade-up max-w-[680px] text-gray-text leading-relaxed mb-12">
          Our proven process eliminates guesswork and keeps your project on track. Every step has clear deliverables and timelines so you always know exactly where things stand.
        </p>

        <div className="max-w-[800px] mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="fade-up flex gap-8 mb-12 pb-12 items-start"
                 style={{ borderBottom: i < steps.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
              <div className="min-w-[64px] h-16 bg-blue text-white rounded-2xl flex items-center justify-center text-xl font-bold shrink-0">
                {step.num}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="font-medium mb-3">{step.desc}</p>
                <p className="text-[0.92rem] text-gray-text leading-relaxed mb-3">{step.details}</p>
                <span className="inline-block bg-blue-light text-blue px-3 py-1 rounded-full text-xs font-semibold">
                  Timeline: {step.timeline}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="bg-black py-16 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: '11–20', label: 'Weeks Typical Timeline' },
            { num: '100+', label: 'Products Launched' },
            { num: '4', label: 'Clear Milestones' },
            { num: '0', label: 'Guesswork' },
          ].map((s, i) => (
            <div key={i} className="fade-up">
              <span className="block text-3xl md:text-[2.8rem] font-bold text-white tracking-tight">{s.num}</span>
              <span className="block text-xs text-white/50 mt-1">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 px-6 md:px-10 text-center">
        <p className="fade-up text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-blue mb-4">Get Started</p>
        <h2 className="fade-up text-3xl md:text-4xl font-medium tracking-tight mb-4">Ready to start the process?</h2>
        <p className="fade-up max-w-[600px] mx-auto text-gray-text mb-8">
          Tell us about your project and we&apos;ll schedule a free Discovery call.
        </p>
        <div className="fade-up">
          <Link href="/#contact" className="btn-primary">Start Your Project</Link>
        </div>
      </section>
    </>
  );
}
