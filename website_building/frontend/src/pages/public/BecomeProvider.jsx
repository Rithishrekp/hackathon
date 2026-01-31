import { Link } from 'react-router-dom';
import { CheckCircle, DollarSign, Calendar, Star, Shield, ArrowRight, Users, Zap } from 'lucide-react';

const BecomeProvider = () => {
    const benefits = [
        { icon: DollarSign, title: 'Set Your Own Rates', description: 'You decide how much to charge for your services.' },
        { icon: Calendar, title: 'Flexible Schedule', description: 'Work when you want. Accept jobs that fit your availability.' },
        { icon: Users, title: 'Access to Customers', description: 'Connect with thousands of customers looking for services.' },
        { icon: Shield, title: 'Secure Payments', description: 'Get paid weekly, directly to your bank account.' },
    ];

    const steps = [
        { number: 1, title: 'Sign Up', description: 'Create your provider account in minutes' },
        { number: 2, title: 'Get Verified', description: 'Complete our verification process' },
        { number: 3, title: 'Set Up Profile', description: 'Add your services, rates, and availability' },
        { number: 4, title: 'Start Earning', description: 'Accept jobs and grow your business' },
    ];

    const testimonials = [
        { name: 'Mike R.', role: 'Plumber', content: 'ServisGo helped me grow my business by 40% in just 3 months!', rating: 5 },
        { name: 'Lisa T.', role: 'House Cleaner', content: 'The flexible scheduling lets me work around my family life.', rating: 5 },
    ];

    return (
        <div className="become-provider-page">
            <section className="provider-hero">
                <div className="container">
                    <div className="hero-content">
                        <h1>Grow Your Business with ServisGo</h1>
                        <p>Join thousands of professionals earning more by connecting with customers who need your services.</p>
                        <div className="hero-cta">
                            <Link to="/provider/onboarding" className="btn btn-primary btn-lg">Get Started <ArrowRight size={20} /></Link>
                            <span className="hero-note">Free to join • No monthly fees</span>
                        </div>
                        <div className="hero-stats">
                            <div><strong>1000+</strong><span>Active Providers</span></div>
                            <div><strong>$5M+</strong><span>Earned by Providers</span></div>
                            <div><strong>4.9</strong><span>Avg Provider Rating</span></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section benefits-section">
                <div className="container">
                    <h2 className="text-center">Why Join ServisGo?</h2>
                    <p className="text-center text-gray mb-8">Everything you need to succeed</p>
                    <div className="benefits-grid">
                        {benefits.map((b, i) => (
                            <div key={i} className="card benefit-card">
                                <div className="benefit-icon"><b.icon size={28} /></div>
                                <h3>{b.title}</h3>
                                <p>{b.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section steps-section">
                <div className="container">
                    <h2 className="text-center">How to Get Started</h2>
                    <p className="text-center text-gray mb-8">Four simple steps to start earning</p>
                    <div className="steps-grid">
                        {steps.map((s, i) => (
                            <div key={i} className="step-card">
                                <div className="step-number">{s.number}</div>
                                <h3>{s.title}</h3>
                                <p>{s.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section testimonials-section">
                <div className="container">
                    <h2 className="text-center">What Providers Say</h2>
                    <div className="testimonials-grid">
                        {testimonials.map((t, i) => (
                            <div key={i} className="card testimonial-card">
                                <div className="stars">{[...Array(t.rating)].map((_, j) => <Star key={j} size={18} fill="#FBBF24" color="#FBBF24" />)}</div>
                                <p>"{t.content}"</p>
                                <div className="author"><strong>{t.name}</strong><span>{t.role}</span></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section cta-section">
                <div className="container">
                    <div className="cta-box">
                        <h2>Ready to Start Earning?</h2>
                        <p>Join our network of trusted professionals today</p>
                        <Link to="/provider/onboarding" className="btn btn-primary btn-lg">Apply Now</Link>
                    </div>
                </div>
            </section>

            <style>{`
        .provider-hero { background: var(--gradient-hero); padding: var(--space-20) 0; color: white; }
        .hero-content { max-width: 700px; }
        .provider-hero h1 { color: white; font-size: var(--text-5xl); margin-bottom: var(--space-6); }
        .provider-hero p { color: rgba(255,255,255,0.9); font-size: var(--text-xl); margin-bottom: var(--space-8); }
        .hero-cta { display: flex; align-items: center; gap: var(--space-4); margin-bottom: var(--space-10); flex-wrap: wrap; }
        .hero-note { color: rgba(255,255,255,0.8); font-size: var(--text-sm); }
        .hero-stats { display: flex; gap: var(--space-10); }
        .hero-stats div { display: flex; flex-direction: column; }
        .hero-stats strong { font-size: var(--text-3xl); }
        .hero-stats span { font-size: var(--text-sm); opacity: 0.8; }
        .benefits-section { background: var(--gray-50); }
        .benefits-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-6); }
        .benefit-card { text-align: center; }
        .benefit-icon { width: 64px; height: 64px; margin: 0 auto var(--space-4); background: var(--primary-50); border-radius: var(--radius-xl); display: flex; align-items: center; justify-content: center; color: var(--primary-600); }
        .benefit-card h3 { margin-bottom: var(--space-2); }
        .steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-6); }
        .step-card { text-align: center; padding: var(--space-6); }
        .step-number { width: 48px; height: 48px; margin: 0 auto var(--space-4); background: var(--gradient-primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: var(--text-xl); font-weight: var(--font-bold); }
        .step-card h3 { margin-bottom: var(--space-2); }
        .testimonials-section { background: var(--gray-50); }
        .testimonials-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-6); max-width: 800px; margin: 0 auto; }
        .testimonial-card { text-align: center; }
        .stars { display: flex; justify-content: center; gap: var(--space-1); margin-bottom: var(--space-4); }
        .testimonial-card p { font-size: var(--text-lg); margin-bottom: var(--space-4); font-style: italic; }
        .author strong { display: block; }
        .author span { font-size: var(--text-sm); color: var(--gray-500); }
        .cta-box { background: var(--gradient-hero); border-radius: var(--radius-2xl); padding: var(--space-12); text-align: center; color: white; }
        .cta-box h2 { color: white; margin-bottom: var(--space-2); }
        .cta-box p { color: rgba(255,255,255,0.9); margin-bottom: var(--space-6); }
        .cta-box .btn-primary { background: white; color: var(--primary-600); }
        @media (max-width: 1024px) { .benefits-grid, .steps-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) { .benefits-grid, .steps-grid, .testimonials-grid { grid-template-columns: 1fr; } .hero-stats { flex-wrap: wrap; } }
      `}</style>
        </div>
    );
};

export default BecomeProvider;
