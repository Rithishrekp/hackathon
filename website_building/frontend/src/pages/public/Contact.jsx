import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
    const contactInfo = [
        { icon: Mail, label: 'Email', value: 'support@servisgo.com', href: 'mailto:support@servisgo.com' },
        { icon: Phone, label: 'Phone', value: '+1 (234) 567-890', href: 'tel:+1234567890' },
        { icon: MapPin, label: 'Address', value: '123 Service Street, New York, NY 10001' },
        { icon: Clock, label: 'Hours', value: 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM' },
    ];

    return (
        <div className="contact-page">
            <section className="page-hero">
                <div className="container">
                    <h1>Contact Us</h1>
                    <p>We'd love to hear from you. Get in touch with us.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="contact-grid">
                        <div className="contact-form-wrapper card">
                            <h2>Send us a Message</h2>
                            <form className="contact-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">First Name</label>
                                        <input type="text" className="form-input" placeholder="John" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Last Name</label>
                                        <input type="text" className="form-input" placeholder="Doe" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-input" placeholder="john@example.com" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Subject</label>
                                    <select className="form-input form-select">
                                        <option>General Inquiry</option>
                                        <option>Booking Support</option>
                                        <option>Provider Support</option>
                                        <option>Billing</option>
                                        <option>Feedback</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Message</label>
                                    <textarea className="form-input form-textarea" placeholder="How can we help?" rows="5"></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary btn-lg">
                                    <Send size={18} /> Send Message
                                </button>
                            </form>
                        </div>

                        <div className="contact-info">
                            <h2>Get in Touch</h2>
                            <p>Have questions? We're here to help. Reach out through any channel.</p>
                            <div className="info-cards">
                                {contactInfo.map((info, idx) => (
                                    <div key={idx} className="info-card">
                                        <div className="info-icon"><info.icon size={24} /></div>
                                        <div>
                                            <h4>{info.label}</h4>
                                            {info.href ? <a href={info.href}>{info.value}</a> : <p>{info.value}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="map-placeholder">
                                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=300&fit=crop" alt="Map" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style>{`
        .page-hero { background: var(--gradient-hero); padding: var(--space-16) 0; text-align: center; color: white; }
        .page-hero h1 { color: white; margin-bottom: var(--space-3); }
        .page-hero p { color: rgba(255,255,255,0.9); font-size: var(--text-xl); }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-10); }
        .contact-form-wrapper { padding: var(--space-8); }
        .contact-form-wrapper h2 { margin-bottom: var(--space-6); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); }
        .contact-info h2 { margin-bottom: var(--space-3); }
        .contact-info > p { margin-bottom: var(--space-6); }
        .info-cards { display: flex; flex-direction: column; gap: var(--space-4); margin-bottom: var(--space-6); }
        .info-card { display: flex; gap: var(--space-4); padding: var(--space-4); background: white; border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); }
        .info-icon { width: 48px; height: 48px; background: var(--primary-50); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; color: var(--primary-600); flex-shrink: 0; }
        .info-card h4 { font-size: var(--text-sm); color: var(--gray-500); margin-bottom: var(--space-1); }
        .info-card p, .info-card a { font-weight: var(--font-medium); color: var(--gray-900); }
        .map-placeholder { border-radius: var(--radius-xl); overflow: hidden; }
        .map-placeholder img { width: 100%; height: 200px; object-fit: cover; }
        @media (max-width: 1024px) { .contact-grid { grid-template-columns: 1fr; } }
        @media (max-width: 768px) { .form-row { grid-template-columns: 1fr; } }
      `}</style>
        </div>
    );
};

export default Contact;
