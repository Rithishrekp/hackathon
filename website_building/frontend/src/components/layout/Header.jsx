import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
    Menu,
    X,
    ChevronDown,
    Search,
    Zap
} from 'lucide-react';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const serviceCategories = [
        { name: 'All Services', path: '/services' },
        { name: 'Home Cleaning', path: '/services/category/cleaning' },
        { name: 'Plumbing', path: '/services/category/plumbing' },
        { name: 'Electrical', path: '/services/category/electrical' },
        { name: 'AC & Appliances', path: '/services/category/appliances' },
        { name: 'Beauty & Spa', path: '/services/category/beauty' },
        { name: 'Painting', path: '/services/category/painting' },
    ];

    return (
        <header className="header">
            <div className="container">
                <div className="header-inner">
                    {/* Logo */}
                    <Link to="/" className="logo">
                        <div className="logo-icon">
                            <Zap size={24} />
                        </div>
                        <span>ServisGo</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className={`nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                        <Link
                            to="/"
                            className={`nav-link ${isActive('/') ? 'active' : ''}`}
                        >
                            Home
                        </Link>

                        <div
                            className="nav-dropdown"
                            onMouseEnter={() => setServicesDropdownOpen(true)}
                            onMouseLeave={() => setServicesDropdownOpen(false)}
                        >
                            <button className={`nav-link flex items-center gap-1 ${location.pathname.startsWith('/services') ? 'active' : ''}`}>
                                Services
                                <ChevronDown size={16} />
                            </button>
                            <div className={`nav-dropdown-menu ${servicesDropdownOpen ? 'open' : ''}`}>
                                {serviceCategories.map((category) => (
                                    <Link
                                        key={category.path}
                                        to={category.path}
                                        className="nav-dropdown-item"
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <Link
                            to="/how-it-works"
                            className={`nav-link ${isActive('/how-it-works') ? 'active' : ''}`}
                        >
                            How It Works
                        </Link>

                        <Link
                            to="/blog"
                            className={`nav-link ${isActive('/blog') ? 'active' : ''}`}
                        >
                            Blog
                        </Link>

                        <Link
                            to="/become-provider"
                            className={`nav-link ${isActive('/become-provider') ? 'active' : ''}`}
                        >
                            Become a Provider
                        </Link>

                        <Link
                            to="/contact"
                            className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
                        >
                            Contact
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="nav-actions">
                        <button className="btn btn-icon btn-ghost" aria-label="Search">
                            <Search size={20} />
                        </button>
                        <Link to="/login" className="btn btn-ghost">
                            Login
                        </Link>
                        <Link to="/signup" className="btn btn-primary">
                            Sign Up
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            className="mobile-menu-btn btn btn-ghost"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
