import { Link, useParams } from 'react-router-dom';
import {
    Star,
    Clock,
    Shield,
    CheckCircle,
    MapPin,
    Calendar,
    User,
    ChevronRight,
    Heart,
    Share2,
    MessageCircle
} from 'lucide-react';

const ServiceDetails = () => {
    const { serviceId } = useParams();

    // Mock service data
    const service = {
        id: serviceId,
        title: 'Professional Deep Home Cleaning',
        category: 'Cleaning',
        description: 'Our professional deep cleaning service covers every corner of your home. Our trained cleaners use eco-friendly products and advanced equipment to ensure your space is spotless and hygienic.',
        price: 79,
        duration: '3-4 hours',
        rating: 4.9,
        reviews: 2340,
        images: [
            'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=500&fit=crop',
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=500&fit=crop',
            'https://images.unsplash.com/photo-1527515545081-5db817172677?w=800&h=500&fit=crop',
        ],
        features: [
            'Full house deep cleaning',
            'Kitchen & bathroom sanitization',
            'Floor mopping & vacuuming',
            'Dusting all surfaces',
            'Window cleaning (interior)',
            'Trash removal',
        ],
        includes: [
            'All cleaning supplies included',
            'Eco-friendly products',
            'Trained & verified cleaners',
            'Satisfaction guarantee',
        ],
        provider: {
            name: 'CleanPro Services',
            avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop',
            rating: 4.9,
            jobs: 1250,
            verified: true,
        }
    };

    const relatedServices = [
        { id: 2, title: 'Bathroom Deep Clean', price: 39, rating: 4.8, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=200&fit=crop' },
        { id: 3, title: 'Kitchen Cleaning', price: 49, rating: 4.9, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop' },
        { id: 4, title: 'Carpet Cleaning', price: 69, rating: 4.7, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop' },
    ];

    const reviews = [
        { id: 1, name: 'Sarah M.', rating: 5, date: '2 days ago', content: 'Absolutely amazing service! The team was professional and thorough.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop' },
        { id: 2, name: 'John D.', rating: 5, date: '1 week ago', content: 'Best cleaning service I\'ve ever used. Highly recommend!', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop' },
        { id: 3, name: 'Emily R.', rating: 4, date: '2 weeks ago', content: 'Great job overall. Minor areas missed but they fixed it promptly.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop' },
    ];

    return (
        <div className="service-details-page">
            {/* Breadcrumb */}
            <section className="breadcrumb-section">
                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/">Home</Link>
                        <ChevronRight size={16} />
                        <Link to="/services">Services</Link>
                        <ChevronRight size={16} />
                        <Link to={`/services/category/${service.category.toLowerCase()}`}>{service.category}</Link>
                        <ChevronRight size={16} />
                        <span>{service.title}</span>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="service-details-layout">
                        {/* Main Content */}
                        <div className="service-main">
                            {/* Image Gallery */}
                            <div className="image-gallery">
                                <div className="main-image">
                                    <img src={service.images[0]} alt={service.title} />
                                </div>
                                <div className="thumbnail-grid">
                                    {service.images.slice(1).map((img, idx) => (
                                        <img key={idx} src={img} alt={`${service.title} ${idx + 2}`} />
                                    ))}
                                </div>
                            </div>

                            {/* Service Info */}
                            <div className="service-info">
                                <div className="service-header">
                                    <span className="service-category">{service.category}</span>
                                    <div className="service-actions">
                                        <button className="btn btn-ghost btn-icon"><Heart size={20} /></button>
                                        <button className="btn btn-ghost btn-icon"><Share2 size={20} /></button>
                                    </div>
                                </div>
                                <h1>{service.title}</h1>
                                <div className="service-meta">
                                    <div className="rating-display">
                                        <Star size={18} fill="#FBBF24" color="#FBBF24" />
                                        <span className="rating-value">{service.rating}</span>
                                        <span className="rating-count">({service.reviews} reviews)</span>
                                    </div>
                                    <span className="meta-divider">•</span>
                                    <span className="meta-item"><Clock size={16} /> {service.duration}</span>
                                </div>
                                <p className="service-description">{service.description}</p>

                                {/* Features */}
                                <div className="service-features">
                                    <h3>What's Included</h3>
                                    <ul className="features-list">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx}><CheckCircle size={18} /> {feature}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Additional Benefits */}
                                <div className="service-benefits">
                                    {service.includes.map((item, idx) => (
                                        <div key={idx} className="benefit-item">
                                            <Shield size={20} />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Reviews Section */}
                            <div className="reviews-section">
                                <div className="section-header">
                                    <h3>Customer Reviews</h3>
                                    <Link to="#" className="btn btn-secondary btn-sm">
                                        View All
                                    </Link>
                                </div>

                                <div className="reviews-list">
                                    {reviews.map(review => (
                                        <div key={review.id} className="review-card">
                                            <div className="review-header">
                                                <img src={review.avatar} alt={review.name} className="review-avatar" />
                                                <div>
                                                    <h4>{review.name}</h4>
                                                    <div className="review-meta">
                                                        <div className="review-stars">
                                                            {[...Array(review.rating)].map((_, i) => (
                                                                <Star key={i} size={14} fill="#FBBF24" color="#FBBF24" />
                                                            ))}
                                                        </div>
                                                        <span>{review.date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p>{review.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="service-sidebar">
                            {/* Booking Card */}
                            <div className="card booking-card">
                                <div className="price-display">
                                    <span className="price-label">Starting from</span>
                                    <span className="price-value">${service.price}</span>
                                </div>

                                <Link to="/customer/book-service" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                                    Book Now
                                </Link>

                                <div className="booking-features">
                                    <div className="booking-feature">
                                        <CheckCircle size={18} />
                                        <span>Free cancellation</span>
                                    </div>
                                    <div className="booking-feature">
                                        <Shield size={18} />
                                        <span>Satisfaction guaranteed</span>
                                    </div>
                                    <div className="booking-feature">
                                        <Clock size={18} />
                                        <span>Same-day availability</span>
                                    </div>
                                </div>
                            </div>

                            {/* Provider Card */}
                            <div className="card provider-card">
                                <h4>Service Provider</h4>
                                <div className="provider-info">
                                    <img src={service.provider.avatar} alt={service.provider.name} className="provider-avatar" />
                                    <div>
                                        <h5>
                                            {service.provider.name}
                                            {service.provider.verified && (
                                                <span className="verified-badge"><CheckCircle size={14} /></span>
                                            )}
                                        </h5>
                                        <div className="provider-stats">
                                            <Star size={14} fill="#FBBF24" color="#FBBF24" />
                                            <span>{service.provider.rating}</span>
                                            <span className="text-gray">• {service.provider.jobs} jobs</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-secondary" style={{ width: '100%' }}>
                                    <MessageCircle size={18} />
                                    Contact Provider
                                </button>
                            </div>

                            {/* Related Services */}
                            <div className="related-services">
                                <h4>Related Services</h4>
                                {relatedServices.map(rs => (
                                    <Link key={rs.id} to={`/services/${rs.id}`} className="related-service-card">
                                        <img src={rs.image} alt={rs.title} />
                                        <div>
                                            <h5>{rs.title}</h5>
                                            <div className="related-meta">
                                                <span className="price">${rs.price}</span>
                                                <span className="rating"><Star size={12} fill="#FBBF24" color="#FBBF24" /> {rs.rating}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            <style>{`
        .breadcrumb-section {
          background: var(--gray-50);
          padding: var(--space-4) 0;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-sm);
          color: var(--gray-500);
        }

        .breadcrumb a {
          color: var(--gray-600);
        }

        .breadcrumb a:hover {
          color: var(--primary-600);
        }

        .service-details-layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: var(--space-8);
        }

        .image-gallery {
          margin-bottom: var(--space-8);
        }

        .main-image {
          border-radius: var(--radius-xl);
          overflow: hidden;
          margin-bottom: var(--space-4);
        }

        .main-image img {
          width: 100%;
          height: 400px;
          object-fit: cover;
        }

        .thumbnail-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-4);
        }

        .thumbnail-grid img {
          width: 100%;
          height: 100px;
          object-fit: cover;
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: opacity var(--transition-fast);
        }

        .thumbnail-grid img:hover {
          opacity: 0.8;
        }

        .service-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-4);
        }

        .service-category {
          background: var(--primary-50);
          color: var(--primary-600);
          padding: var(--space-1) var(--space-3);
          border-radius: var(--radius-full);
          font-size: var(--text-sm);
          font-weight: var(--font-medium);
        }

        .service-actions {
          display: flex;
          gap: var(--space-2);
        }

        .service-info h1 {
          font-size: var(--text-3xl);
          margin-bottom: var(--space-4);
        }

        .service-meta {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          margin-bottom: var(--space-6);
        }

        .rating-display {
          display: flex;
          align-items: center;
          gap: var(--space-1);
        }

        .rating-value {
          font-weight: var(--font-semibold);
        }

        .rating-count {
          color: var(--gray-500);
        }

        .meta-divider {
          color: var(--gray-300);
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          color: var(--gray-600);
        }

        .service-description {
          font-size: var(--text-lg);
          line-height: 1.7;
          margin-bottom: var(--space-8);
        }

        .service-features {
          margin-bottom: var(--space-8);
        }

        .service-features h3 {
          font-size: var(--text-xl);
          margin-bottom: var(--space-4);
        }

        .features-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-3);
        }

        .features-list li {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          color: var(--gray-700);
        }

        .features-list li svg {
          color: var(--success);
          flex-shrink: 0;
        }

        .service-benefits {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-4);
          padding: var(--space-6);
          background: var(--gray-50);
          border-radius: var(--radius-xl);
          margin-bottom: var(--space-8);
        }

        .benefit-item {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          color: var(--gray-700);
        }

        .benefit-item svg {
          color: var(--primary-600);
        }

        .reviews-section {
          border-top: 1px solid var(--gray-200);
          padding-top: var(--space-8);
        }

        .reviews-section .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-6);
        }

        .reviews-section h3 {
          font-size: var(--text-xl);
        }

        .reviews-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .review-card {
          padding: var(--space-5);
          background: var(--gray-50);
          border-radius: var(--radius-lg);
        }

        .review-header {
          display: flex;
          gap: var(--space-3);
          margin-bottom: var(--space-3);
        }

        .review-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        .review-header h4 {
          font-size: var(--text-base);
          margin-bottom: var(--space-1);
        }

        .review-meta {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          font-size: var(--text-sm);
          color: var(--gray-500);
        }

        .review-stars {
          display: flex;
          gap: 2px;
        }

        .review-card p {
          color: var(--gray-600);
          line-height: 1.6;
        }

        /* Sidebar */
        .service-sidebar {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }

        .booking-card {
          position: sticky;
          top: 100px;
        }

        .price-display {
          text-align: center;
          margin-bottom: var(--space-5);
        }

        .price-label {
          display: block;
          font-size: var(--text-sm);
          color: var(--gray-500);
          margin-bottom: var(--space-1);
        }

        .price-display .price-value {
          font-size: var(--text-4xl);
          font-weight: var(--font-bold);
          color: var(--primary-600);
        }

        .booking-features {
          margin-top: var(--space-5);
          padding-top: var(--space-5);
          border-top: 1px solid var(--gray-100);
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .booking-feature {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          font-size: var(--text-sm);
          color: var(--gray-600);
        }

        .booking-feature svg {
          color: var(--success);
        }

        .provider-card h4 {
          font-size: var(--text-base);
          margin-bottom: var(--space-4);
        }

        .provider-info {
          display: flex;
          gap: var(--space-4);
          margin-bottom: var(--space-5);
        }

        .provider-avatar {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-lg);
          object-fit: cover;
        }

        .provider-info h5 {
          font-size: var(--text-base);
          display: flex;
          align-items: center;
          gap: var(--space-1);
        }

        .verified-badge {
          color: var(--success);
        }

        .provider-stats {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-sm);
          margin-top: var(--space-1);
        }

        .related-services h4 {
          font-size: var(--text-base);
          margin-bottom: var(--space-4);
        }

        .related-service-card {
          display: flex;
          gap: var(--space-3);
          padding: var(--space-3);
          border-radius: var(--radius-lg);
          transition: background var(--transition-fast);
          margin-bottom: var(--space-3);
        }

        .related-service-card:hover {
          background: var(--gray-50);
        }

        .related-service-card img {
          width: 80px;
          height: 60px;
          object-fit: cover;
          border-radius: var(--radius-md);
        }

        .related-service-card h5 {
          font-size: var(--text-sm);
          margin-bottom: var(--space-1);
        }

        .related-meta {
          display: flex;
          gap: var(--space-3);
          font-size: var(--text-sm);
        }

        .related-meta .price {
          font-weight: var(--font-semibold);
          color: var(--primary-600);
        }

        .related-meta .rating {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          color: var(--gray-500);
        }

        @media (max-width: 1024px) {
          .service-details-layout {
            grid-template-columns: 1fr;
          }

          .service-sidebar {
            order: -1;
          }

          .booking-card {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .thumbnail-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .features-list,
          .service-benefits {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
};

export default ServiceDetails;
