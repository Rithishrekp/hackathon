const Cancellation = () => (
    <div className="legal-page">
        <section className="page-hero"><div className="container"><h1>Cancellation & Refund Policy</h1><p>Last updated: January 2026</p></div></section>
        <section className="section"><div className="container"><div className="legal-content">
            <h2>Cancellation by Customer</h2>
            <p><strong>24+ hours before:</strong> Full refund, no cancellation fee.</p>
            <p><strong>12-24 hours before:</strong> 50% refund of service cost.</p>
            <p><strong>Less than 12 hours:</strong> No refund applicable.</p>
            <h2>Cancellation by Provider</h2>
            <p>If a provider cancels, you will receive a full refund. We will also help you find an alternative provider.</p>
            <h2>No-Show Policy</h2>
            <p>If you are not available at the scheduled time, the booking may be marked as a no-show with no refund.</p>
            <h2>Refund Processing</h2>
            <p>Refunds are processed within 5-7 business days and credited to your original payment method.</p>
            <h2>Service Quality Issues</h2>
            <p>Not satisfied? Contact us within 48 hours of service completion. We'll investigate and may offer a partial or full refund.</p>
            <h2>Contact Us</h2>
            <p>For cancellation requests or refund inquiries, contact support@servisgo.com or call +1 (234) 567-890.</p>
        </div></div></section>
        <style>{`.page-hero{background:var(--gradient-hero);padding:var(--space-12) 0;color:white;text-align:center}.page-hero h1{color:white;margin-bottom:var(--space-2)}.page-hero p{color:rgba(255,255,255,0.9)}.legal-content{max-width:800px;margin:0 auto}.legal-content h2{font-size:var(--text-xl);margin:var(--space-8) 0 var(--space-3)}.legal-content p{line-height:1.8;margin-bottom:var(--space-4)}`}</style>
    </div>
);
export default Cancellation;
