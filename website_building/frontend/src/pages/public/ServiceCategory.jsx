import { Link, useParams } from 'react-router-dom';
import { Star, Clock, ChevronRight, Filter, Search } from 'lucide-react';
import { useState } from 'react';

const ServiceCategory = () => {
    const { categoryId } = useParams();
    const [searchQuery, setSearchQuery] = useState('');

    // Format category name
    const categoryName = categoryId?.replace(/-/g, ' & ').replace(/\b\w/g, l => l.toUpperCase()) || 'Category';

    // Mock services for this category
    const services = [
        { id: 1, title: 'Deep Home Cleaning', price: 79, rating: 4.9, reviews: 2340, duration: '3-4 hours', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop', badge: 'Popular' },
        { id: 2, title: 'Bathroom Cleaning', price: 39, rating: 4.8, reviews: 1200, duration: '1-2 hours', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop', badge: null },
        { id: 3, title: 'Kitchen Cleaning', price: 49, rating: 4.9, reviews: 1560, duration: '2-3 hours', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop', badge: 'Top Rated' },
        { id: 4, title: 'Carpet Cleaning', price: 69, rating: 4.7, reviews: 890, duration: '2-4 hours', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', badge: null },
        { id: 5, title: 'Window Cleaning', price: 45, rating: 4.8, reviews: 760, duration: '1-2 hours', image: 'https://images.unsplash.com/photo-1527515545081-5db817172677?w=400&h=300&fit=crop', badge: null },
        { id: 6, title: 'Office Cleaning', price: 99, rating: 4.9, reviews: 540, duration: '4-6 hours', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop', badge: 'Popular' },
    ];

    const filteredServices = services.filter(s =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="category-page">
            {/* Hero Section */}
            <section className="category-hero">
                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/">Home</Link>
                        <ChevronRight size={16} />
                        <Link to="/services">Services</Link>
                        <ChevronRight size={16} />
                        <span>{categoryName}</span>
                    </div>
                    <h1>{categoryName} Services</h1>
                    <p>Professional {categoryName.toLowerCase()} services for your home and business</p>

                    <div className="category-stats">
                        <div className="stat">
                            <strong>{services.length}+</strong>
                            <span>Services</span>
                        </div>
                        <div className="stat">
                            <strong>500+</strong>
                            <span>Providers</span>
                        </div>
                        <div className="stat">
                            <strong>4.8</strong>
                            <span>Avg. Rating</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="section">
                <div className="container">
                    {/* Toolbar */}
                    <div className="category-toolbar">
                        <div className="search-input-wrapper">
                            <Search size={20} className="search-icon" />
                            <input
                                type="text"
                                placeholder={`Search ${categoryName.toLowerCase()} services...`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="form-input search-input"
                            />
                        </div>
                        <div className="toolbar-info">
                            <span>Showing <strong>{filteredServices.length}</strong> services</span>
                        </div>
                    </div>

                    {/* Services Grid */}
                    <div className="services-grid">
                        {filteredServices.map(service => (
                            <Link key={service.id} to={`/services/${service.id}`} className="card service-card">
                                <div className="service-card-image-wrapper">
                                    <img src={service.image} alt={service.title} className="service-card-image" />
                                    {service.badge && <span className="service-card-badge">{service.badge}</span>}
                                </div>
                                <div className="service-card-content">
                                    <div className="service-card-rating">
                                        <Star size={16} fill="#FBBF24" color="#FBBF24" />
                                        <span>{service.rating}</span>
                                        <span className="rating-count">({service.reviews})</span>
                                    </div>
                                    <h3 className="service-card-title">{service.title}</h3>
                                    <div className="service-card-meta">
                                        <Clock size={14} />
                                        <span>{service.duration}</span>
                                    </div>
                                    <div className="service-card-footer">
                                        <div className="service-card-price">
                                            <span className="price-label">From</span>
                                            <span className="price-value">${service.price}</span>
                                        </div>
                                        <button className="btn btn-primary btn-sm">Book Now</button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {filteredServices.length === 0 && (
                        <div className="empty-state text-center">
                            <h3>No services found</h3>
                            <p>Try adjusting your search</p>
                        </div>
                    )}
                </div>
            </section>

            <style>{`
        .category-hero {
          background: var(--gradient-hero);
          padding: var(--space-16) 0;
          color: white;
        }

        .category-hero .breadcrumb {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-sm);
          margin-bottom: var(--space-6);
          opacity: 0.9;
        }

        .category-hero .breadcrumb a {
          color: white;
        }

        .category-hero h1 {
          color: white;
          font-size: var(--text-4xl);
          margin-bottom: var(--space-3);
        }

        .category-hero p {
          color: rgba(255,255,255,0.9);
          font-size: var(--text-xl);
          margin-bottom: var(--space-8);
        }

        .category-stats {
          display: flex;
          gap: var(--space-10);
        }

        .category-stats .stat {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }

        .category-stats strong {
          font-size: var(--text-2xl);
        }

        .category-stats span {
          font-size: var(--text-sm);
          opacity: 0.8;
        }

        .category-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-8);
          gap: var(--space-4);
        }

        .category-toolbar .search-input-wrapper {
          max-width: 400px;
        }

        .toolbar-info {
          color: var(--gray-600);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-6);
        }

        .service-card {
          padding: 0;
          overflow: hidden;
        }

        .service-card-image-wrapper {
          height: 200px;
          position: relative;
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
          font-weight: normal;
        }

        .service-card-title {
          font-size: var(--text-lg);
          margin-bottom: var(--space-3);
        }

        .service-card-meta {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          color: var(--gray-500);
          font-size: var(--text-sm);
          margin-bottom: var(--space-4);
        }

        .service-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: var(--space-4);
          border-top: 1px solid var(--gray-100);
        }

        .price-label {
          display: block;
          font-size: var(--text-xs);
          color: var(--gray-500);
        }

        .price-value {
          font-size: var(--text-xl);
          font-weight: var(--font-bold);
          color: var(--primary-600);
        }

        .empty-state {
          padding: var(--space-16);
        }

        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .category-toolbar {
            flex-direction: column;
          }

          .services-grid {
            grid-template-columns: 1fr;
          }

          .category-stats {
            flex-wrap: wrap;
            gap: var(--space-6);
          }
        }
      `}</style>
        </div>
    );
};

export default ServiceCategory;
