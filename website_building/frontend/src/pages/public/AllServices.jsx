import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Search,
  Star,
  Filter,
  Grid,
  List,
  ChevronDown,
  MapPin,
  Clock
} from 'lucide-react';
import { getAllServices } from '../../api';

const categories = ['All', 'Cleaning', 'Plumbing', 'Electrical', 'AC & Appliances', 'Painting', 'Beauty & Spa', 'Home Services'];
const sortOptions = ['Most Popular', 'Price: Low to High', 'Price: High to Low', 'Highest Rated', 'Newest'];

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('Most Popular');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getAllServices();
        setServices(data);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const matchesPrice = service.price >= priceRange[0] && service.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="all-services-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>All Services</span>
          </div>
          <h1>All Services</h1>
          <p>Browse our wide range of professional services</p>
        </div>
      </section>

      {/* Filters & Content */}
      <section className="section">
        <div className="container">
          <div className="services-layout">
            {/* Sidebar Filters */}
            <aside className={`filters-sidebar ${showFilters ? 'open' : ''}`}>
              <div className="filter-section">
                <h3>Categories</h3>
                <div className="filter-options">
                  {categories.map(category => (
                    <label key={category} className="filter-option">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                      />
                      <span>{category}</span>
                      <span className="filter-count">
                        {category === 'All' ? services.length : services.filter(s => s.category === category).length}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-section">
                <h3>Price Range</h3>
                <div className="price-inputs">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                    className="form-input"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="filter-section">
                <h3>Rating</h3>
                <div className="filter-options">
                  {[4, 3, 2].map(rating => (
                    <label key={rating} className="filter-option">
                      <input type="checkbox" />
                      <span className="flex items-center gap-1">
                        <Star size={14} fill="#FBBF24" color="#FBBF24" />
                        {rating}+ Stars
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="services-main">
              {/* Toolbar */}
              <div className="services-toolbar">
                <div className="search-filter-row">
                  <div className="search-input-wrapper">
                    <Search size={20} className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search services..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="form-input search-input"
                    />
                  </div>
                  <button
                    className="btn btn-secondary mobile-filter-btn"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter size={18} />
                    Filters
                  </button>
                </div>

                <div className="toolbar-right">
                  <div className="results-count">
                    <strong>{filteredServices.length}</strong> services found
                  </div>

                  <div className="sort-dropdown">
                    <label>Sort by:</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="form-select"
                    >
                      {sortOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div className="view-toggle">
                    <button
                      className={`btn btn-icon ${viewMode === 'grid' ? 'active' : ''}`}
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid size={18} />
                    </button>
                    <button
                      className={`btn btn-icon ${viewMode === 'list' ? 'active' : ''}`}
                      onClick={() => setViewMode('list')}
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Services Grid/List */}
              <div className={`services-grid ${viewMode}`}>
                {filteredServices.map(service => (
                  <Link
                    key={service.id}
                    to={`/services/${service.id}`}
                    className={`card service-card ${viewMode === 'list' ? 'list-view' : ''}`}
                  >
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
                      <span className="service-card-category">{service.category}</span>
                      <div className="service-card-rating">
                        <Star size={16} fill="#FBBF24" color="#FBBF24" />
                        <span>{service.rating}</span>
                        <span className="rating-count">({service.reviews} reviews)</span>
                      </div>
                      <h3 className="service-card-title">{service.title}</h3>
                      <div className="service-card-meta">
                        <span className="meta-item">
                          <Clock size={14} />
                          {service.duration}
                        </span>
                      </div>
                      <div className="service-card-footer">
                        <div className="service-card-price">
                          <span className="price-label">Starting at</span>
                          <span className="price-value">${service.price}</span>
                        </div>
                        <button className="btn btn-primary btn-sm">Book Now</button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Empty State */}
              {filteredServices.length === 0 && (
                <div className="empty-state">
                  <h3>No services found</h3>
                  <p>Try adjusting your search or filter criteria</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setPriceRange([0, 500]);
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              {filteredServices.length > 0 && (
                <div className="pagination-wrapper">
                  <div className="pagination">
                    <button className="pagination-btn" disabled>&lt;</button>
                    <button className="pagination-btn active">1</button>
                    <button className="pagination-btn">2</button>
                    <button className="pagination-btn">3</button>
                    <button className="pagination-btn">...</button>
                    <button className="pagination-btn">10</button>
                    <button className="pagination-btn">&gt;</button>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      <style>{`
        .page-header {
          background: var(--gradient-hero);
          padding: var(--space-12) 0;
          color: white;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-sm);
          margin-bottom: var(--space-4);
          opacity: 0.9;
        }

        .breadcrumb a {
          color: white;
        }

        .page-header h1 {
          color: white;
          margin-bottom: var(--space-2);
        }

        .page-header p {
          color: rgba(255,255,255,0.9);
          font-size: var(--text-lg);
        }

        .services-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: var(--space-8);
        }

        .filters-sidebar {
          background: white;
          border-radius: var(--radius-xl);
          padding: var(--space-6);
          box-shadow: var(--shadow-card);
          height: fit-content;
          position: sticky;
          top: 100px;
        }

        .filter-section {
          margin-bottom: var(--space-6);
          padding-bottom: var(--space-6);
          border-bottom: 1px solid var(--gray-100);
        }

        .filter-section:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .filter-section h3 {
          font-size: var(--text-base);
          margin-bottom: var(--space-4);
        }

        .filter-options {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .filter-option {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          cursor: pointer;
          padding: var(--space-2);
          border-radius: var(--radius-md);
          transition: background var(--transition-fast);
        }

        .filter-option:hover {
          background: var(--gray-50);
        }

        .filter-option input {
          accent-color: var(--primary-600);
        }

        .filter-count {
          margin-left: auto;
          font-size: var(--text-sm);
          color: var(--gray-400);
        }

        .price-inputs {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }

        .price-inputs input {
          width: 80px;
          text-align: center;
        }

        .services-main {
          min-width: 0;
        }

        .services-toolbar {
          background: white;
          border-radius: var(--radius-xl);
          padding: var(--space-4) var(--space-6);
          margin-bottom: var(--space-6);
          box-shadow: var(--shadow-sm);
        }

        .search-filter-row {
          display: flex;
          gap: var(--space-4);
          margin-bottom: var(--space-4);
        }

        .search-input-wrapper {
          flex: 1;
        }

        .mobile-filter-btn {
          display: none;
        }

        .toolbar-right {
          display: flex;
          align-items: center;
          gap: var(--space-6);
        }

        .results-count {
          color: var(--gray-600);
          font-size: var(--text-sm);
        }

        .sort-dropdown {
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }

        .sort-dropdown label {
          font-size: var(--text-sm);
          color: var(--gray-500);
        }

        .sort-dropdown select {
          padding: var(--space-2) var(--space-8) var(--space-2) var(--space-3);
          font-size: var(--text-sm);
        }

        .view-toggle {
          display: flex;
          background: var(--gray-100);
          border-radius: var(--radius-lg);
          padding: var(--space-1);
        }

        .view-toggle .btn {
          background: transparent;
          color: var(--gray-500);
        }

        .view-toggle .btn.active {
          background: white;
          color: var(--primary-600);
          box-shadow: var(--shadow-sm);
        }

        .services-grid.grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-6);
        }

        .services-grid.list {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .service-card.list-view {
          display: grid;
          grid-template-columns: 200px 1fr;
        }

        .service-card.list-view .service-card-image-wrapper {
          height: 100%;
          min-height: 180px;
        }

        .service-card-category {
          font-size: var(--text-xs);
          color: var(--primary-600);
          background: var(--primary-50);
          padding: var(--space-1) var(--space-2);
          border-radius: var(--radius-sm);
          display: inline-block;
          margin-bottom: var(--space-2);
        }

        .service-card-meta {
          display: flex;
          gap: var(--space-4);
          margin-bottom: var(--space-4);
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          font-size: var(--text-sm);
          color: var(--gray-500);
        }

        .empty-state {
          text-align: center;
          padding: var(--space-16);
        }

        .empty-state h3 {
          margin-bottom: var(--space-2);
        }

        .empty-state p {
          margin-bottom: var(--space-6);
        }

        .pagination-wrapper {
          display: flex;
          justify-content: center;
          margin-top: var(--space-10);
        }

        @media (max-width: 1200px) {
          .services-grid.grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 1024px) {
          .services-layout {
            grid-template-columns: 1fr;
          }

          .filters-sidebar {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: var(--z-modal);
            border-radius: 0;
            overflow-y: auto;
          }

          .filters-sidebar.open {
            display: block;
          }

          .mobile-filter-btn {
            display: flex;
          }
        }

        @media (max-width: 768px) {
          .services-grid.grid {
            grid-template-columns: 1fr;
          }

          .service-card.list-view {
            grid-template-columns: 1fr;
          }

          .toolbar-right {
            flex-wrap: wrap;
          }

          .search-filter-row {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default AllServices;
