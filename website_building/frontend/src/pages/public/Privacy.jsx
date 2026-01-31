const Privacy = () => (
    <div className="legal-page">
        <section className="page-hero"><div className="container"><h1>Privacy Policy</h1><p>Last updated: January 2026</p></div></section>
        <section className="section"><div className="container"><div className="legal-content">
            <h2>1. Information We Collect</h2>
            <p>We collect information you provide directly, including name, email, phone number, and address when you create an account or book services.</p>
            <h2>2. How We Use Your Information</h2>
            <p>Your information is used to facilitate bookings, process payments, send notifications, and improve our services. We do not sell your data.</p>
            <h2>3. Information Sharing</h2>
            <p>We share necessary information with service providers to complete your bookings. Payment information is processed by secure third-party processors.</p>
            <h2>4. Data Security</h2>
            <p>We implement industry-standard security measures to protect your data. However, no method of transmission is 100% secure.</p>
            <h2>5. Cookies and Tracking</h2>
            <p>We use cookies to improve user experience, analyze site traffic, and personalize content. You can manage cookie preferences in your browser.</p>
            <h2>6. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. Contact us to exercise these rights.</p>
            <h2>7. Contact Us</h2>
            <p>For privacy inquiries, contact us at privacy@servisgo.com.</p>
        </div></div></section>
        <style>{`.page-hero{background:var(--gradient-hero);padding:var(--space-12) 0;color:white;text-align:center}.page-hero h1{color:white;margin-bottom:var(--space-2)}.page-hero p{color:rgba(255,255,255,0.9)}.legal-content{max-width:800px;margin:0 auto}.legal-content h2{font-size:var(--text-xl);margin:var(--space-8) 0 var(--space-3)}.legal-content p{line-height:1.8;margin-bottom:var(--space-4)}`}</style>
    </div>
);
export default Privacy;
