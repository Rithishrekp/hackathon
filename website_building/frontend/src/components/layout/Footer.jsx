import { Link } from 'react-router-dom';
import {
    Zap,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Mail,
    Phone,
    MapPin
} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand Column */}
                    <div className="footer-brand">
                        <Link to="/" className="logo">
                            <div className="logo-icon">
                                <Zap size={24} />
                            </div>
                            <span style={{ color: 'white' }}>ServisGo</span>
                        </Link>
                        <p>
                            Your trusted platform for booking local services.
                            Quality professionals at your fingertips, anytime.
                        </p>
                        <div className="footer-social">
                            <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
                            <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
                            <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
                            <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="footer-title">Quick Links</h4>
                        <nav className="footer-links">
                            <Link to="/" className="footer-link">Home</Link>
                            <Link to="/services" className="footer-link">All Services</Link>
                            <Link to="/how-it-works" className="footer-link">How It Works</Link>
                            <Link to="/about" className="footer-link">About Us</Link>
                            <Link to="/blog" className="footer-link">Blog</Link>
                            <Link to="/contact" className="footer-link">Contact</Link>
                        </nav>
                    </div>

                    {/* For Providers */}
                    <div>
                        <h4 className="footer-title">For Providers</h4>
                        <nav className="footer-links">
                            <Link to="/become-provider" className="footer-link">Become a Provider</Link>
                            <Link to="/provider" className="footer-link">Provider Dashboard</Link>
                            <Link to="/faq" className="footer-link">Provider FAQ</Link>
                            <Link to="/provider/support" className="footer-link">Support Center</Link>
                        </nav>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="footer-title">Contact Us</h4>
                        <nav className="footer-links">
                            <a href="mailto:support@servisgo.com" className="footer-link flex items-center gap-2">
                                <Mail size={16} />
                                support@servisgo.com
                            </a>
                            <a href="tel:+1234567890" className="footer-link flex items-center gap-2">
                                <Phone size={16} />
                                +1 (234) 567-890
                            </a>
                            <span className="footer-link flex items-center gap-2">
                                <MapPin size={16} />
                                123 Service Street, NY
                            </span>
                        </nav>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <p>&copy; 2026 ServisGo. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <Link to="/terms" className="footer-link">Terms & Conditions</Link>
                        <Link to="/privacy" className="footer-link">Privacy Policy</Link>
                        <Link to="/cancellation-policy" className="footer-link">Refund Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
