import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { checkBackendHealth } from '../../api';
import {
  Search,
  Star,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Wrench,
  Zap,
  Paintbrush,
  Wind,
  Scissors,
  ChevronRight,
  Play,
  Quote
} from 'lucide-react';

// Mock data for services
const popularServices = [
  {
    id: 1,
    title: 'Home Cleaning',
    description: 'Professional deep cleaning for your home',
    price: 49,
    rating: 4.9,
    reviews: 2340,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
    badge: 'Popular'
  },
  {
    id: 2,
    title: 'Plumbing Service',
    description: 'Expert plumbers for all your needs',
    price: 69,
    rating: 4.8,
    reviews: 1890,
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop',
    badge: null
  },
  {
    id: 3,
    title: 'Electrical Repair',
    description: 'Certified electricians at your service',
    price: 79,
    rating: 4.9,
    reviews: 1650,
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop',
    badge: 'Top Rated'
  },
  {
    id: 4,
    title: 'AC Service & Repair',
    description: 'Keep your home cool and comfortable',
    price: 89,
    rating: 4.7,
    reviews: 980,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop',
    badge: null
  }
];

const categories = [
  { icon: Sparkles, name: 'Cleaning', count: 45, color: '#10B981' },
  { icon: Wrench, name: 'Plumbing', count: 32, color: '#3B82F6' },
  { icon: Zap, name: 'Electrical', count: 28, color: '#F59E0B' },
  { icon: Wind, name: 'AC & Appliances', count: 24, color: '#06B6D4' },
  { icon: Paintbrush, name: 'Painting', count: 18, color: '#8B5CF6' },
  { icon: Scissors, name: 'Beauty & Spa', count: 56, color: '#EC4899' },
];

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Homeowner',
    content: 'Amazing service! The cleaning team was professional and thorough. My house has never looked better. Will definitely book again!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Business Owner',
    content: 'Fast, reliable, and professional. The electrician arrived on time and fixed the issue within an hour. Highly recommended!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Apartment Resident',
    content: 'The plumber was incredibly knowledgeable and fixed a complex issue that others couldn\'t. Fair pricing and excellent work.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
  }
];

const stats = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '1000+', label: 'Verified Providers' },
  { value: '100+', label: 'Service Types' },
  { value: '4.9', label: 'Average Rating' },
];

const Home = () => {
  const [backendStatus, setBackendStatus] = useState({ success: false, message: 'Checking...' });

  useEffect(() => {
    checkBackendHealth().then(setBackendStatus);
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          {/* Backend Status Indicator */}
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 100,
            padding: '8px 16px',
            borderRadius: '20px',
            backgroundColor: backendStatus.success ? '#10B981' : '#EF4444',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '14px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            Backend: {backendStatus.success ? 'Connected' : 'Disconnected'}
            <span style={{ fontSize: '12px', opacity: 0.9, marginLeft: '8px', fontWeight: 'normal' }}>
              ({backendStatus.message})
            </span>
          </div>

          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                <Sparkles size={16} />
                #1 Service Booking Platform
              </div>
              <h1 className="hero-title">
                Book Local Services <br />
                <span className="gradient-text">With Confidence</span>
              </h1>
              <p className="hero-subtitle">
                Find trusted professionals for all your home service needs.
                From cleaning to repairs, we've got you covered.
              </p>

              {/* Search Bar */}
              <div className="hero-search">
                <div className="hero-search-input">
                  <Search size={20} />
                  <input
                    type="text"
                    placeholder="What service do you need?"
                  />
                </div>
                <button className="btn btn-primary btn-lg">
                  Find Services
                </button>
              </div>

              {/* Trust Badges */}
              <div className="hero-trust">
                <div className="trust-badge">
                  <Shield size={18} />
                  <span>Verified Pros</span>
                </div>
                <div className="trust-badge">
                  <CheckCircle size={18} />
                  <span>Satisfaction Guaranteed</span>
                </div>
                <div className="trust-badge">
                  <Clock size={18} />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>

            {/* Hero Stats */}
            <div className="hero-stats-card">
              <div className="hero-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&h=400&fit=crop"
                  alt="Professional service"
                  className="hero-image"
                />
                <div className="hero-stats-overlay">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="hero-stat">
                      <span className="hero-stat-value">{stat.value}</span>
                      <span className="hero-stat-label">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section categories-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2>Browse by Category</h2>
              <p>Explore services tailored to your needs</p>
            </div>
            <Link to="/services" className="btn btn-secondary">
              View All Categories
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="categories-grid">
            {categories.map((category, idx) => (
              <Link
                key={idx}
                to={`/services/category/${category.name.toLowerCase().replace(/ & /g, '-')}`}
                className="category-card"
              >
                <div
                  className="category-icon"
                  style={{ backgroundColor: `${category.color}15`, color: category.color }}
                >
                  <category.icon size={28} />
                </div>
                <h3 className="category-name">{category.name}</h3>
                <p className="category-count">{category.count} Services</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="section services-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2>Popular Services</h2>
              <p>Most booked services by our customers</p>
            </div>
            <Link to="/services" className="btn btn-secondary">
              View All Services
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="services-grid">
            {popularServices.map((service) => (
              <Link key={service.id} to={`/services/${service.id}`} className="card service-card">
                <div className="service-card-image-wrapper">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="service-card-image"
                  />
                  {service.badge && (
                    <span className="service-card-badge">{service.badge}</span>
                  )}
                </div>
                <div className="service-card-content">
                  <div className="service-card-rating">
                    <Star size={16} fill="currentColor" />
                    <span>{service.rating}</span>
                    <span className="rating-count">({service.reviews})</span>
                  </div>
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-description">{service.description}</p>
                  <div className="service-card-footer">
                    <div className="service-card-price">
                      <span className="price-label">Starting at</span>
                      <span className="price-value">${service.price}</span>
                    </div>
                    <button className="btn btn-primary btn-sm">
                      Book Now
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section how-it-works-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>How It Works</h2>
            <p>Book a service in just 3 simple steps</p>
          </div>

          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon">
                <Search size={32} />
              </div>
              <h3>Find a Service</h3>
              <p>Browse through our wide range of services and select the one you need.</p>
            </div>
            <div className="step-connector"></div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon">
                <Clock size={32} />
              </div>
              <h3>Schedule a Time</h3>
              <p>Pick a convenient date and time that works best for you.</p>
            </div>
            <div className="step-connector"></div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon">
                <CheckCircle size={32} />
              </div>
              <h3>Get It Done</h3>
              <p>Our verified professional arrives and completes the job.</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/how-it-works" className="btn btn-outline">
              Learn More
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>What Our Customers Say</h2>
            <p>Join thousands of satisfied customers</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="card testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#FBBF24" color="#FBBF24" />
                  ))}
                </div>
                <Quote size={32} className="testimonial-quote-icon" />
                <p className="testimonial-content">{testimonial.content}</p>
                <div className="testimonial-author">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="testimonial-avatar"
                  />
                  <div>
                    <h4 className="testimonial-name">{testimonial.name}</h4>
                    <p className="testimonial-role">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-content">
              <h2>Ready to Get Started?</h2>
              <p>Join thousands of happy customers and book your first service today.</p>
              <div className="cta-buttons">
                <Link to="/services" className="btn btn-primary btn-lg">
                  Browse Services
                </Link>
                <Link to="/become-provider" className="btn btn-secondary btn-lg">
                  Become a Provider
                </Link>
              </div>
            </div>
            <div className="cta-decoration">
              <div className="cta-circle cta-circle-1"></div>
              <div className="cta-circle cta-circle-2"></div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .home-page {
          overflow-x: hidden;
        }

        /* Hero */
        .hero {
          background: var(--gradient-hero);
          padding: var(--space-16) 0 var(--space-24);
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          border-radius: 50%;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-12);
          align-items: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
          padding: var(--space-2) var(--space-4);
          border-radius: var(--radius-full);
          color: white;
          font-size: var(--text-sm);
          font-weight: var(--font-medium);
          margin-bottom: var(--space-6);
        }

        .hero-title {
          color: white;
          font-size: 3.5rem;
          line-height: 1.1;
          margin-bottom: var(--space-6);
        }

        .gradient-text {
          background: linear-gradient(90deg, #fff 0%, #E0E7FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          color: rgba(255,255,255,0.9);
          font-size: var(--text-xl);
          margin-bottom: var(--space-8);
          max-width: 500px;
        }

        .hero-search {
          display: flex;
          background: white;
          border-radius: var(--radius-xl);
          padding: var(--space-2);
          box-shadow: var(--shadow-2xl);
          max-width: 560px;
        }

        .hero-search-input {
          flex: 1;
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: 0 var(--space-4);
          color: var(--gray-400);
        }

        .hero-search-input input {
          flex: 1;
          border: none;
          font-size: var(--text-lg);
          color: var(--gray-900);
        }

        .hero-search-input input:focus {
          outline: none;
        }

        .hero-trust {
          display: flex;
          gap: var(--space-6);
          margin-top: var(--space-8);
        }

        .trust-badge {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          color: rgba(255,255,255,0.9);
          font-size: var(--text-sm);
        }

        .hero-stats-card {
          position: relative;
        }

        .hero-image-wrapper {
          position: relative;
          border-radius: var(--radius-2xl);
          overflow: hidden;
          box-shadow: var(--shadow-2xl);
        }

        .hero-image {
          width: 100%;
          height: 450px;
          object-fit: cover;
        }

        .hero-stats-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(10px);
          padding: var(--space-4);
        }

        .hero-stat {
          text-align: center;
          border-right: 1px solid var(--gray-200);
        }

        .hero-stat:last-child {
          border-right: none;
        }

        .hero-stat-value {
          display: block;
          font-size: var(--text-xl);
          font-weight: var(--font-bold);
          color: var(--primary-600);
        }

        .hero-stat-label {
          font-size: var(--text-xs);
          color: var(--gray-500);
        }

        /* Section Headers */
        .section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: var(--space-10);
        }

        .section-header.text-center {
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .section-header h2 {
          margin-bottom: var(--space-2);
        }

        .section-header p {
          color: var(--gray-500);
          font-size: var(--text-lg);
        }

        /* Categories */
        .categories-section {
          background: var(--gray-50);
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: var(--space-6);
        }

        .category-card {
          background: white;
          border-radius: var(--radius-xl);
          padding: var(--space-6);
          text-align: center;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--gray-100);
          transition: all var(--transition-base);
        }

        .category-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .category-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto var(--space-4);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-xl);
        }

        .category-name {
          font-size: var(--text-base);
          font-weight: var(--font-semibold);
          color: var(--gray-900);
          margin-bottom: var(--space-1);
        }

        .category-count {
          font-size: var(--text-sm);
          color: var(--gray-500);
        }

        /* Services */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-6);
        }

        .service-card {
          padding: 0;
          overflow: hidden;
        }

        .service-card-image-wrapper {
          position: relative;
          height: 180px;
          overflow: hidden;
        }

        .service-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-slow);
        }

        .service-card:hover .service-card-image {
          transform: scale(1.05);
        }

        .service-card-content {
          padding: var(--space-5);
        }

        .service-card-rating {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          color: var(--accent-yellow);
          font-weight: var(--font-semibold);
          font-size: var(--text-sm);
          margin-bottom: var(--space-2);
        }

        .rating-count {
          color: var(--gray-400);
          font-weight: var(--font-normal);
        }

        .service-card-title {
          font-size: var(--text-lg);
          margin-bottom: var(--space-2);
        }

        .service-card-description {
          font-size: var(--text-sm);
          margin-bottom: var(--space-4);
          line-height: 1.5;
        }

        .service-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: var(--space-4);
          border-top: 1px solid var(--gray-100);
        }

        .price-label {
          font-size: var(--text-xs);
          color: var(--gray-500);
          display: block;
        }

        .price-value {
          font-size: var(--text-xl);
          font-weight: var(--font-bold);
          color: var(--primary-600);
        }

        /* How It Works */
        .how-it-works-section {
          background: white;
        }

        .steps-container {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: var(--space-4);
        }

        .step-card {
          flex: 1;
          max-width: 280px;
          text-align: center;
          position: relative;
        }

        .step-number {
          position: absolute;
          top: -10px;
          right: calc(50% - 60px);
          width: 28px;
          height: 28px;
          background: var(--primary-600);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--text-sm);
          font-weight: var(--font-bold);
        }

        .step-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto var(--space-5);
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--primary-50);
          border-radius: var(--radius-2xl);
          color: var(--primary-600);
        }

        .step-card h3 {
          font-size: var(--text-xl);
          margin-bottom: var(--space-3);
        }

        .step-card p {
          font-size: var(--text-sm);
          line-height: 1.6;
        }

        .step-connector {
          width: 80px;
          height: 2px;
          background: linear-gradient(90deg, var(--primary-200), var(--secondary-200));
          margin-top: 40px;
        }

        /* Testimonials */
        .testimonials-section {
          background: var(--gray-50);
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-6);
        }

        .testimonial-card {
          position: relative;
        }

        .testimonial-rating {
          display: flex;
          gap: var(--space-1);
          margin-bottom: var(--space-4);
        }

        .testimonial-quote-icon {
          position: absolute;
          top: var(--space-4);
          right: var(--space-4);
          color: var(--primary-100);
        }

        .testimonial-content {
          font-size: var(--text-base);
          line-height: 1.7;
          color: var(--gray-700);
          margin-bottom: var(--space-6);
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }

        .testimonial-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
        }

        .testimonial-name {
          font-size: var(--text-base);
          font-weight: var(--font-semibold);
        }

        .testimonial-role {
          font-size: var(--text-sm);
          color: var(--gray-500);
        }

        /* CTA Section */
        .cta-section {
          background: white;
        }

        .cta-card {
          background: var(--gradient-hero);
          border-radius: var(--radius-2xl);
          padding: var(--space-16);
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta-content {
          position: relative;
          z-index: 1;
        }

        .cta-card h2 {
          color: white;
          font-size: var(--text-4xl);
          margin-bottom: var(--space-4);
        }

        .cta-card p {
          color: rgba(255,255,255,0.9);
          font-size: var(--text-xl);
          margin-bottom: var(--space-8);
        }

        .cta-buttons {
          display: flex;
          gap: var(--space-4);
          justify-content: center;
        }

        .cta-buttons .btn-primary {
          background: white;
          color: var(--primary-600);
          box-shadow: var(--shadow-lg);
        }

        .cta-buttons .btn-secondary {
          background: transparent;
          color: white;
          border-color: rgba(255,255,255,0.5);
        }

        .cta-decoration .cta-circle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
        }

        .cta-circle-1 {
          width: 300px;
          height: 300px;
          top: -100px;
          right: -50px;
        }

        .cta-circle-2 {
          width: 200px;
          height: 200px;
          bottom: -50px;
          left: 10%;
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .categories-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .hero-subtitle {
            margin: 0 auto var(--space-8);
          }

          .hero-search {
            margin: 0 auto;
          }

          .hero-trust {
            justify-content: center;
          }

          .hero-stats-card {
            display: none;
          }

          .testimonials-grid {
            grid-template-columns: 1fr;
          }

          .steps-container {
            flex-direction: column;
            align-items: center;
          }

          .step-connector {
            width: 2px;
            height: 40px;
            margin: 0;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .hero-search {
            flex-direction: column;
            gap: var(--space-3);
          }

          .hero-search-input {
            padding: var(--space-3);
          }

          .categories-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .services-grid {
            grid-template-columns: 1fr;
          }

          .section-header {
            flex-direction: column;
            gap: var(--space-4);
            text-align: center;
          }

          .cta-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
