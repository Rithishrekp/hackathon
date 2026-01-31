import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { User, Briefcase, FileText, CreditCard, CheckCircle, Zap, ArrowRight, ArrowLeft } from 'lucide-react';
import { completeOnboarding } from '../../api';

const Onboarding = () => {
    const [step, setStep] = useState(1);
    const totalSteps = 4;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        phone: '',
        address: ''
    });

    const handleComplete = async () => {
        setLoading(true);
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = localStorage.getItem('token');

            const response = await completeOnboarding(user.id, formData.phone, formData.address, token);

            // Update user in localStorage
            const updatedUser = { ...user, is_onboarded: true, phone: formData.phone, address: formData.address };
            localStorage.setItem('user', JSON.stringify(updatedUser));

            navigate('/provider');
        } catch (err) {
            console.error("Failed to complete onboarding", err);
            alert(err.message || 'Failed to complete onboarding');
        } finally {
            setLoading(false);
        }
    };

    const steps = [
        { num: 1, title: 'Personal Info', icon: User },
        { num: 2, title: 'Services', icon: Briefcase },
        { num: 3, title: 'Verification', icon: FileText },
        { num: 4, title: 'Payment Setup', icon: CreditCard },
    ];

    return (
        <div className="onboarding-page">
            <div className="onboarding-header">
                <Link to="/" className="logo"><div className="logo-icon"><Zap size={24} /></div><span>ServisGo</span></Link>
                <p>Provider Registration</p>
            </div>

            <div className="onboarding-container">
                <div className="steps-sidebar">
                    {steps.map(s => (
                        <div key={s.num} className={`step-item ${step === s.num ? 'active' : ''} ${step > s.num ? 'completed' : ''}`}>
                            <div className="step-icon">{step > s.num ? <CheckCircle size={20} /> : <s.icon size={20} />}</div>
                            <span>{s.title}</span>
                        </div>
                    ))}
                </div>

                <div className="onboarding-content card">
                    {step === 1 && (
                        <>
                            <h2>Personal Information</h2>
                            <p>Tell us about yourself</p>
                            <form>
                                <div className="form-row">
                                    <div className="form-group"><label className="form-label">First Name</label><input type="text" className="form-input" placeholder="John" /></div>
                                    <div className="form-group"><label className="form-label">Last Name</label><input type="text" className="form-input" placeholder="Doe" /></div>
                                </div>
                                <div className="form-group"><label className="form-label">Email</label><input type="email" className="form-input" placeholder="john@example.com" /></div>
                                <div className="form-group"><label className="form-label">Phone Number</label><input type="tel" className="form-input" placeholder="+1 234-567-8901" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} /></div>
                                <div className="form-group"><label className="form-label">Address</label><input type="text" className="form-input" placeholder="Street address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} /></div>
                            </form>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <h2>Services You Offer</h2>
                            <p>Select the services you provide</p>
                            <div className="services-select">
                                {['Home Cleaning', 'Plumbing', 'Electrical', 'AC & Appliances', 'Painting', 'Beauty & Spa'].map(s => (
                                    <label key={s} className="service-option"><input type="checkbox" /><span>{s}</span></label>
                                ))}
                            </div>
                            <div className="form-group"><label className="form-label">Years of Experience</label><input type="number" className="form-input" placeholder="e.g., 5" /></div>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <h2>Verification Documents</h2>
                            <p>Upload required documents for verification</p>
                            <div className="upload-section">
                                <div className="upload-box"><FileText size={32} /><p>Government ID</p><button className="btn btn-secondary btn-sm">Upload</button></div>
                                <div className="upload-box"><FileText size={32} /><p>Proof of Address</p><button className="btn btn-secondary btn-sm">Upload</button></div>
                                <div className="upload-box"><FileText size={32} /><p>Professional Certification (Optional)</p><button className="btn btn-secondary btn-sm">Upload</button></div>
                            </div>
                        </>
                    )}

                    {step === 4 && (
                        <>
                            <h2>Payment Setup</h2>
                            <p>How you'd like to receive payments</p>
                            <div className="form-group"><label className="form-label">Bank Name</label><input type="text" className="form-input" placeholder="Bank name" /></div>
                            <div className="form-group"><label className="form-label">Account Number</label><input type="text" className="form-input" placeholder="Account number" /></div>
                            <div className="form-group"><label className="form-label">Routing Number</label><input type="text" className="form-input" placeholder="Routing number" /></div>
                        </>
                    )}

                    <div className="nav-buttons">
                        {step > 1 && <button className="btn btn-secondary" onClick={() => setStep(step - 1)}><ArrowLeft size={18} /> Back</button>}
                        {step < totalSteps ? (
                            <button className="btn btn-primary" onClick={() => setStep(step + 1)}>Continue <ArrowRight size={18} /></button>
                        ) : (
                            <button className="btn btn-primary" onClick={handleComplete} disabled={loading}>
                                {loading ? 'Completing...' : 'Complete Registration'} <CheckCircle size={18} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
        .onboarding-page { min-height: 100vh; background: var(--gray-50); padding: var(--space-8); }
        .onboarding-header { text-align: center; margin-bottom: var(--space-8); }
        .onboarding-header .logo { display: inline-flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-2); }
        .onboarding-header p { color: var(--gray-500); }
        .onboarding-container { display: grid; grid-template-columns: 250px 1fr; gap: var(--space-8); max-width: 1000px; margin: 0 auto; }
        .steps-sidebar { display: flex; flex-direction: column; gap: var(--space-4); }
        .step-item { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-4); background: white; border-radius: var(--radius-lg); color: var(--gray-400); font-weight: var(--font-medium); }
        .step-item.active { background: var(--primary-600); color: white; }
        .step-item.completed { color: var(--success); }
        .step-icon { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: var(--gray-100); border-radius: var(--radius-lg); }
        .step-item.active .step-icon { background: rgba(255,255,255,0.2); }
        .onboarding-content { padding: var(--space-8); }
        .onboarding-content h2 { margin-bottom: var(--space-2); }
        .onboarding-content > p { color: var(--gray-500); margin-bottom: var(--space-6); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); }
        .services-select { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-3); margin-bottom: var(--space-6); }
        .service-option { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3); border: 2px solid var(--gray-200); border-radius: var(--radius-lg); cursor: pointer; }
        .service-option:has(input:checked) { border-color: var(--primary-600); background: var(--primary-50); }
        .service-option input { accent-color: var(--primary-600); }
        .upload-section { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4); margin-bottom: var(--space-6); }
        .upload-box { text-align: center; padding: var(--space-6); border: 2px dashed var(--gray-300); border-radius: var(--radius-lg); color: var(--gray-400); }
        .upload-box p { margin: var(--space-3) 0; font-size: var(--text-sm); }
        .nav-buttons { display: flex; justify-content: space-between; margin-top: var(--space-8); padding-top: var(--space-6); border-top: 1px solid var(--gray-100); }
        @media (max-width: 768px) { .onboarding-container { grid-template-columns: 1fr; } .steps-sidebar { flex-direction: row; overflow-x: auto; } .upload-section, .services-select { grid-template-columns: 1fr; } }
      `}</style>
        </div>
    );
};

export default Onboarding;
