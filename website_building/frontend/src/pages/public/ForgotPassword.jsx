import { Link } from 'react-router-dom';
import { Zap, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const ForgotPassword = () => {
    const [submitted, setSubmitted] = useState(false);

    if (submitted) {
        return (
            <div className="auth-page">
                <div className="auth-center">
                    <div className="success-card card">
                        <div className="success-icon"><CheckCircle size={48} /></div>
                        <h2>Check Your Email</h2>
                        <p>We've sent a password reset link to your email address. Please check your inbox.</p>
                        <Link to="/login" className="btn btn-primary" style={{ width: '100%' }}>Back to Login</Link>
                    </div>
                </div>
                <style>{`
          .auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--gray-50); padding: var(--space-4); }
          .auth-center { width: 100%; max-width: 420px; }
          .success-card { text-align: center; }
          .success-icon { width: 80px; height: 80px; margin: 0 auto var(--space-6); background: var(--success-light); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--success); }
          .success-card h2 { margin-bottom: var(--space-3); }
          .success-card p { margin-bottom: var(--space-6); }
        `}</style>
            </div>
        );
    }

    return (
        <div className="auth-page">
            <div className="auth-center">
                <div className="card">
                    <Link to="/" className="logo">
                        <div className="logo-icon"><Zap size={24} /></div>
                        <span>ServisGo</span>
                    </Link>
                    <div className="auth-header">
                        <h1>Forgot Password?</h1>
                        <p>No worries, we'll send you reset instructions</p>
                    </div>
                    <form className="auth-form" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <div className="input-with-icon">
                                <Mail size={20} className="input-icon" />
                                <input type="email" className="form-input" placeholder="Enter your email" required />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>Reset Password</button>
                    </form>
                    <Link to="/login" className="back-link"><ArrowLeft size={18} /> Back to login</Link>
                </div>
            </div>
            <style>{`
        .auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--gray-50); padding: var(--space-4); }
        .auth-center { width: 100%; max-width: 420px; }
        .auth-center .card { padding: var(--space-8); }
        .auth-center .logo { display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-8); justify-content: center; }
        .auth-header { text-align: center; margin-bottom: var(--space-8); }
        .auth-header h1 { font-size: var(--text-2xl); margin-bottom: var(--space-2); }
        .auth-form { margin-bottom: var(--space-6); }
        .input-with-icon { position: relative; }
        .input-icon { position: absolute; left: var(--space-4); top: 50%; transform: translateY(-50%); color: var(--gray-400); }
        .input-with-icon .form-input { padding-left: var(--space-12); }
        .back-link { display: flex; align-items: center; justify-content: center; gap: var(--space-2); color: var(--gray-600); }
        .back-link:hover { color: var(--primary-600); }
      `}</style>
        </div>
    );
};

export default ForgotPassword;
