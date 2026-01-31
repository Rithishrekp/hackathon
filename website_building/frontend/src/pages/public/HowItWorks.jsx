import { Link } from 'react-router-dom';
import { Search, Clock, CheckCircle, Shield, User, Star, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
    const steps = [
        {
            number: 1,
            title: 'Search & Browse',
            description: 'Explore our wide range of services. Use filters to find exactly what you need.',
            icon: Search,
            details: ['Browse by category', 'Read reviews', 'Compare prices']
        },
        {
            number: 2,
            title: 'Select & Schedule',
            description: 'Choose your preferred service and pick a convenient date and time.',
            icon: Clock,
            details: ['Pick your date', 'Select time slot', 'Add special instructions']
        },
        {
            number: 3,
            title: 'Confirm & Pay',
            description: 'Review your booking details and complete secure payment.',
            icon: CheckCircle,
            details: ['Review summary', 'Secure checkout', 'Get confirmation']
        },
        {
            number: 4,
            title: 'Service Delivered',
            description: 'Our verified professional arrives and completes the job to perfection.',
            icon: User,
            details: ['Pro arrives on time', 'Quality service', 'Rate your experience']
        }
    ];

    const benefits = [
        { icon: Shield, title: 'Verified Professionals', description: 'All service providers are background-checked and verified.' },
        { icon: Star, title: 'Quality Guaranteed', description: 'Not satisfied? We\'ll make it right or refund your money.' },
        { icon: Clock, title: 'Flexible Scheduling', description: 'Book services at times that work best for your schedule.' },
        { icon: CheckCircle, title: 'Transparent Pricing', description: 'No hidden fees. See exact prices before you book.' },
    ];

    return (
        <div className="how-it-works-page">
            {/* Hero */}
            <section className="page-hero">
                <div className="container">
                    <h1>How It Works</h1>
                    <p>Book professional services in just a few simple steps</p>
                </div>
            </section>

            {/* Steps Section */}
            <section className="section steps-section">
                <div className="container">
                    <div className="steps-timeline">
                        {steps.map((step, idx) => (
                            <div key={step.number} className="step-item">
                                <div className="step-connector">
                                    <div className="step-number">{step.number}</div>
                                    {idx < steps.length - 1 && <div className="connector-line"></div>}
                                </div>
                                <div className="step-content card">
                                    <div className="step-icon">
                                        <step.icon size={32} />
                                    </div>
                                    <h3>{step.title}</h3>
                                    <p>{step.description}</p>
                                    <ul className="step-details">
                                        {step.details.map((detail, i) => (
                                            <li key={i}><CheckCircle size={16} /> {detail}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="section benefits-section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Why Choose Us</h2>
                        <p>Experience the ServisGo difference</p>
                    </div>

                    <div className="benefits-grid">
                        {benefits.map((benefit, idx) => (
                            <div key={idx} className="card benefit-card">
                                <div className="benefit-icon">
                                    <benefit.icon size={28} />
                                </div>
                                <h3>{benefit.title}</h3>
                                <p>{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section cta-section">
                <div className="container">
                    <div className="cta-box">
                        <h2>Ready to Get Started?</h2>
                        <p>Join thousands of happy customers today</p>
                        <Link to="/services" className="btn btn-primary btn-lg">
                            Browse Services <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            <style>{`
        .page-hero {
          background: var(--gradient-hero);
          padding: var(--space-16) 0;
          text-align: center;
          color: white;
        }

        .page-hero h1 {
          color: white;
          margin-bottom: var(--space-3);
        }

        .page-hero p {
          color: rgba(255,255,255,0.9);
          font-size: var(--text-xl);
        }

        .steps-section {
          background: var(--gray-50);
        }

        .steps-timeline {
          max-width: 800px;
          margin: 0 auto;
        }

        .step-item {
          display: flex;
          gap: var(--space-6);
          margin-bottom: var(--space-8);
        }

        .step-item:last-child {
          margin-bottom: 0;
        }

        .step-connector {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .step-number {
          width: 48px;
          height: 48px;
          background: var(--gradient-primary);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--text-xl);
          font-weight: var(--font-bold);
          flex-shrink: 0;
        }

        .connector-line {
          width: 2px;
          flex: 1;
          background: linear-gradient(to bottom, var(--primary-400), var(--secondary-400));
          margin: var(--space-2) 0;
          min-height: 100px;
        }

        .step-content {
          flex: 1;
        }

        .step-icon {
          width: 64px;
          height: 64px;
          background: var(--primary-50);
          border-radius: var(--radius-xl);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-600);
          margin-bottom: var(--space-4);
        }

        .step-content h3 {
          font-size: var(--text-xl);
          margin-bottom: var(--space-2);
        }

        .step-content > p {
          margin-bottom: var(--space-4);
        }

        .step-details {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .step-details li {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-sm);
          color: var(--gray-600);
        }

        .step-details svg {
          color: var(--success);
        }

        .benefits-section {
          background: white;
        }

        .section-header {
          margin-bottom: var(--space-12);
        }

        .section-header h2 {
          margin-bottom: var(--space-2);
        }

        .section-header p {
          font-size: var(--text-lg);
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-6);
        }

        .benefit-card {
          text-align: center;
        }

        .benefit-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto var(--space-4);
          background: var(--primary-50);
          border-radius: var(--radius-xl);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-600);
        }

        .benefit-card h3 {
          font-size: var(--text-lg);
          margin-bottom: var(--space-2);
        }

        .cta-section {
          background: var(--gray-50);
        }

        .cta-box {
          background: var(--gradient-hero);
          border-radius: var(--radius-2xl);
          padding: var(--space-12);
          text-align: center;
          color: white;
        }

        .cta-box h2 {
          color: white;
          margin-bottom: var(--space-2);
        }

        .cta-box p {
          color: rgba(255,255,255,0.9);
          font-size: var(--text-lg);
          margin-bottom: var(--space-6);
        }

        .cta-box .btn-primary {
          background: white;
          color: var(--primary-600);
        }

        @media (max-width: 1024px) {
          .benefits-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .step-item {
            flex-direction: column;
          }

          .step-connector {
            flex-direction: row;
          }

          .connector-line {
            width: 100%;
            height: 2px;
            min-height: auto;
          }

          .benefits-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
};

export default HowItWorks;
