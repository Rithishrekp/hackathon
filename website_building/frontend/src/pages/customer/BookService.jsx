import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, ArrowRight, Search } from 'lucide-react';
import { getAllServices, createBooking } from '../../api';

const BookService = () => {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [bookingDate, setBookingDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user')) || {};

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await getAllServices();
                setServices(data);

                // Check for category filter in URL
                const params = new URLSearchParams(window.location.search);
                const categoryFilter = params.get('cat');
                if (categoryFilter) {
                    setSearchQuery(categoryFilter);
                }
            } catch (error) {
                console.error('Failed to fetch services:', error);
                setError('Failed to load services');
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    const handleBooking = async (e) => {
        e.preventDefault();

        if (!user.id) {
            setError('Please login to book a service');
            setTimeout(() => navigate('/login'), 2000);
            return;
        }

        if (!selectedService) {
            setError('Please select a service');
            return;
        }

        if (!bookingDate) {
            setError('Please select a date');
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            await createBooking({
                userId: user.id,
                serviceId: selectedService.id,
                date: bookingDate
            }, token);

            alert('Booking created successfully!');
            navigate('/customer/bookings');
        } catch (err) {
            setError(err.message || 'Failed to create booking');
        } finally {
            setSubmitting(false);
        }
    };

    const filteredServices = services.filter(service =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Get minimum date (today)
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="book-service-page">
            <div className="page-header">
                <h1>Book a Service</h1>
                <p>Select a service and choose your preferred date</p>
            </div>

            {error && (
                <div className="error-message" style={{
                    color: 'red',
                    padding: '1rem',
                    background: '#fee',
                    borderRadius: '8px',
                    marginBottom: '1rem'
                }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleBooking} className="booking-form">
                {/* Service Selection */}
                <div className="form-section card">
                    <h2>1. Select Service</h2>

                    {/* Search */}
                    <div className="search-wrapper">
                        <Search size={20} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search services..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="form-input search-input"
                        />
                    </div>

                    {loading ? (
                        <p>Loading services...</p>
                    ) : (
                        <div className="services-grid">
                            {filteredServices.map(service => (
                                <div
                                    key={service.id}
                                    className={`service-option ${selectedService?.id === service.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedService(service)}
                                >
                                    <img src={service.image_url} alt={service.title} className="service-image" />
                                    <div className="service-info">
                                        <h3>{service.title}</h3>
                                        <p className="service-category">{service.category}</p>
                                        <p className="service-description">{service.description}</p>
                                        <div className="service-price">₹{service.price}</div>
                                    </div>
                                    {selectedService?.id === service.id && (
                                        <div className="selected-badge">✓ Selected</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {filteredServices.length === 0 && !loading && (
                        <div className="empty-state">
                            <p>No services found</p>
                        </div>
                    )}
                </div>

                {/* Date Selection */}
                {selectedService && (
                    <div className="form-section card">
                        <h2>2. Select Date</h2>
                        <div className="date-picker-wrapper">
                            <Calendar size={20} className="input-icon" />
                            <input
                                type="date"
                                value={bookingDate}
                                onChange={(e) => setBookingDate(e.target.value)}
                                min={today}
                                className="form-input date-input"
                                required
                            />
                        </div>
                    </div>
                )}

                {/* Booking Summary */}
                {selectedService && bookingDate && (
                    <div className="form-section card booking-summary">
                        <h2>Booking Summary</h2>
                        <div className="summary-row">
                            <span>Service:</span>
                            <strong>{selectedService.title}</strong>
                        </div>
                        <div className="summary-row">
                            <span>Category:</span>
                            <strong>{selectedService.category}</strong>
                        </div>
                        <div className="summary-row">
                            <span>Date:</span>
                            <strong>{new Date(bookingDate).toLocaleDateString()}</strong>
                        </div>
                        <div className="summary-row total">
                            <span>Total Amount:</span>
                            <strong>₹{selectedService.price}</strong>
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                {selectedService && bookingDate && (
                    <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        style={{ width: '100%' }}
                        disabled={submitting}
                    >
                        {submitting ? 'Creating Booking...' : 'Confirm Booking'}
                        {!submitting && <ArrowRight size={20} />}
                    </button>
                )}
            </form>

            <style>{`
                .book-service-page { max-width: 1000px; margin: 0 auto; }
                .page-header { margin-bottom: var(--space-8); }
                .page-header h1 { font-size: var(--text-3xl); margin-bottom: var(--space-2); }
                .page-header p { color: var(--gray-500); }
                
                .booking-form { display: flex; flex-direction: column; gap: var(--space-6); }
                .form-section { padding: var(--space-6); }
                .form-section h2 { font-size: var(--text-xl); margin-bottom: var(--space-4); }
                
                .search-wrapper { position: relative; margin-bottom: var(--space-4); }
                .search-icon { position: absolute; left: var(--space-4); top: 50%; transform: translateY(-50%); color: var(--gray-400); }
                .search-input { padding-left: var(--space-12); }
                
                .services-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-4); }
                .service-option { 
                    display: flex; 
                    gap: var(--space-4); 
                    padding: var(--space-4); 
                    border: 2px solid var(--gray-200); 
                    border-radius: var(--radius-lg); 
                    cursor: pointer; 
                    transition: all var(--transition-fast);
                    position: relative;
                }
                .service-option:hover { border-color: var(--primary-300); background: var(--primary-50); }
                .service-option.selected { border-color: var(--primary-600); background: var(--primary-50); }
                
                .service-image { width: 120px; height: 120px; object-fit: cover; border-radius: var(--radius-lg); }
                .service-info { flex: 1; }
                .service-info h3 { font-size: var(--text-lg); margin-bottom: var(--space-1); }
                .service-category { 
                    font-size: var(--text-sm); 
                    color: var(--primary-600); 
                    background: var(--primary-100); 
                    padding: var(--space-1) var(--space-2); 
                    border-radius: var(--radius-sm); 
                    display: inline-block;
                    margin-bottom: var(--space-2);
                }
                .service-description { font-size: var(--text-sm); color: var(--gray-600); margin-bottom: var(--space-2); }
                .service-price { font-size: var(--text-2xl); font-weight: var(--font-bold); color: var(--primary-600); }
                
                .selected-badge { 
                    position: absolute; 
                    top: var(--space-4); 
                    right: var(--space-4); 
                    background: var(--success); 
                    color: white; 
                    padding: var(--space-2) var(--space-4); 
                    border-radius: var(--radius-full); 
                    font-size: var(--text-sm);
                    font-weight: var(--font-semibold);
                }
                
                .date-picker-wrapper { position: relative; max-width: 400px; }
                .input-icon { position: absolute; left: var(--space-4); top: 50%; transform: translateY(-50%); color: var(--gray-400); }
                .date-input { padding-left: var(--space-12); }
                
                .booking-summary { background: var(--primary-50); }
                .summary-row { display: flex; justify-content: space-between; padding: var(--space-3) 0; border-bottom: 1px solid var(--gray-200); }
                .summary-row.total { border-bottom: none; font-size: var(--text-lg); padding-top: var(--space-4); }
                
                .empty-state { text-align: center; padding: var(--space-8); color: var(--gray-500); }
                
                @media (max-width: 768px) {
                    .service-option { flex-direction: column; }
                    .service-image { width: 100%; height: 200px; }
                }
            `}</style>
        </div>
    );
};

export default BookService;
