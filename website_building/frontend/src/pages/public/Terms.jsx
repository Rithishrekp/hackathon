const Terms = () => (
    <div className="legal-page">
        <section className="page-hero"><div className="container"><h1>Terms & Conditions</h1><p>Last updated: January 2026</p></div></section>
        <section className="section"><div className="container"><div className="legal-content">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using ServisGo, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.</p>
            <h2>2. Service Description</h2>
            <p>ServisGo is a platform that connects customers with local service providers. We facilitate bookings but do not directly provide services.</p>
            <h2>3. User Accounts</h2>
            <p>Users must provide accurate information when creating accounts. You are responsible for maintaining the confidentiality of your login credentials.</p>
            <h2>4. Booking and Payments</h2>
            <p>All bookings are subject to availability. Payments are processed securely through our platform. Prices are displayed before booking confirmation.</p>
            <h2>5. Cancellation Policy</h2>
            <p>Cancellations made 24+ hours before the scheduled service receive a full refund. Late cancellations may incur fees.</p>
            <h2>6. Provider Obligations</h2>
            <p>Service providers are independent contractors. They are responsible for the quality of their work and compliance with applicable laws.</p>
            <h2>7. Limitation of Liability</h2>
            <p>ServisGo is not liable for any damages arising from services provided by third-party providers. Our platform facilitates connections only.</p>
            <h2>8. Changes to Terms</h2>
            <p>We may update these terms at any time. Continued use of the platform constitutes acceptance of updated terms.</p>
        </div></div></section>
        <style>{`.page-hero{background:var(--gradient-hero);padding:var(--space-12) 0;color:white;text-align:center}.page-hero h1{color:white;margin-bottom:var(--space-2)}.page-hero p{color:rgba(255,255,255,0.9)}.legal-content{max-width:800px;margin:0 auto}.legal-content h2{font-size:var(--text-xl);margin:var(--space-8) 0 var(--space-3)}.legal-content p{line-height:1.8;margin-bottom:var(--space-4)}`}</style>
    </div>
);
export default Terms;
