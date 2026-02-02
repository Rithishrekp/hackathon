import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, ArrowRight, CreditCard, Bell, Star, CheckCircle, X } from 'lucide-react';
import { getBookings, updateBookingStatus, rateBooking, getCategorizedServices } from '../../api';

const CustomerDashboard = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('upcoming');

    // Rating State
    const [ratingBooking, setRatingBooking] = useState(null);
    const [ratingValue, setRatingValue] = useState(5);
    const [reviewText, setReviewText] = useState('');
    const [submittingRating, setSubmittingRating] = useState(false);
    const [categorizedServices, setCategorizedServices] = useState({});
    const [servicesLoading, setServicesLoading] = useState(true);

    const fetchBookings = async () => {
        if (!user.id) {
            setLoading(false);
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const data = await getBookings(user.id, 'customer', token);

            const formattedBookings = data.map(b => ({
                id: b.id,
                service: b.service_name,
                provider: b.provider_name || 'Service Provider',
                date: new Date(b.booking_date).toLocaleDateString(),
                time: '10:00 AM',
                status: b.status,
                image: b.image_url || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=100&h=100&fit=crop',
                rating: b.rating,
                review: b.review,
                price: b.price
            }));

            setBookings(formattedBookings);
        } catch (err) {
            console.error("Failed to fetch bookings", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategorizedServices = async () => {
        try {
            const data = await getCategorizedServices();
            setCategorizedServices(data);
        } catch (err) {
            console.error("Failed to fetch services", err);
        } finally {
            setServicesLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
        fetchCategorizedServices();
    }, [user.id]);

    const handleUpdateStatus = async (e, bookingId, newStatus) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            const token = localStorage.getItem('token');
            await updateBookingStatus(bookingId, newStatus, token);
            if (newStatus === 'completed') {
                const booking = bookings.find(b => b.id === bookingId);
                setRatingBooking(booking);
            }
            fetchBookings();
        } catch (err) {
            alert("Failed to update status: " + err.message);
        }
    };

    const handleRateNow = (e, booking) => {
        e.preventDefault();
        e.stopPropagation();
        setRatingBooking(booking);
        setRatingValue(5);
        setReviewText('');
    };

    const handleSubmitRating = async () => {
        if (!ratingBooking) return;
        setSubmittingRating(true);
        try {
            const token = localStorage.getItem('token');
            await rateBooking(ratingBooking.id, ratingValue, reviewText, token);
            setRatingBooking(null);
            fetchBookings();
            alert("Thank you for your rating!");
        } catch (err) {
            alert("Failed to submit rating: " + err.message);
        } finally {
            setSubmittingRating(false);
        }
    };

    const upcomingList = bookings.filter(b => ['pending', 'confirmed', 'in_progress', 'in_progress_done'].includes(b.status));
    const completedList = bookings.filter(b => b.status === 'completed');

    const filteredBookings = activeFilter === 'all'
        ? bookings
        : activeFilter === 'upcoming'
            ? upcomingList
            : completedList;

    const stats = [
        { id: 'all', label: 'Total Bookings', value: bookings.length.toString(), color: 'var(--primary-600)' },
        { id: 'upcoming', label: 'Upcoming', value: upcomingList.length.toString(), color: 'var(--accent-orange)' },
        { id: 'completed', label: 'Completed', value: completedList.length.toString(), color: 'var(--success)' },
    ];

    if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading your dashboard...</div>;

    return (
        <div className="dashboard-page">
            <div className="welcome-section">
                <div>
                    <h1>Welcome back, {user.name || 'Customer'}!</h1>
                    <p>Here's your service overview</p>
                </div>
                <Link to="/customer/book-service" className="btn btn-primary">
                    Book Service <ArrowRight size={18} />
                </Link>
            </div>

            <div className="stats-row">
                {stats.map((stat) => (
                    <div
                        key={stat.id}
                        className={`card stat-card ${activeFilter === stat.id ? 'active' : ''}`}
                        onClick={() => setActiveFilter(stat.id)}
                    >
                        <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="dashboard-grid">
                <div className="main-content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                {activeFilter === 'all' ? 'All Bookings' : activeFilter === 'upcoming' ? 'Upcoming Bookings' : 'Completed Bookings'}
                            </h3>
                        </div>
                        <div className="bookings-list">
                            {filteredBookings.length === 0 ? (
                                <div className="empty-state">
                                    <p>No {activeFilter} bookings found</p>
                                    <Link to="/customer/book-service" className="btn btn-primary btn-sm">Book a Service</Link>
                                </div>
                            ) : (
                                filteredBookings.map(booking => (
                                    <div
                                        key={booking.id}
                                        className="booking-item"
                                    >
                                        <div
                                            className="booking-main-link"
                                            onClick={() => navigate(`/customer/bookings/${booking.id}`)}
                                        >
                                            <img src={booking.image} alt={booking.service} className="booking-image" />
                                            <div className="booking-info">
                                                <h4>{booking.service}</h4>
                                                <p>{booking.provider}</p>
                                                <div className="booking-meta">
                                                    <span><Calendar size={14} /> {booking.date}</span>
                                                    <span>₹{booking.price}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="booking-actions">
                                            <span className={`badge ${booking.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>
                                                {booking.status === 'in_progress_done' ? 'Pending Confirm' : booking.status}
                                            </span>

                                            {booking.status === 'in_progress_done' && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleUpdateStatus(e, booking.id, 'completed');
                                                    }}
                                                    className="btn btn-primary btn-sm"
                                                    style={{ marginTop: '8px' }}
                                                >
                                                    Confirm Done
                                                </button>
                                            )}

                                            {booking.status === 'completed' && !booking.rating && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRateNow(e, booking);
                                                    }}
                                                    className="btn btn-primary btn-sm rate-btn"
                                                    style={{ marginTop: '8px' }}
                                                >
                                                    <Star size={14} fill="currentColor" /> Rate Now
                                                </button>
                                            )}

                                            {booking.rating && (
                                                <div className="rating-display" style={{ marginTop: '4px' }}>
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={12} fill={i < booking.rating ? '#FBBF24' : 'none'} color="#FBBF24" />
                                                    ))}
                                                    <span className="rating-text">{booking.rating}.0</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="services-section" style={{ marginTop: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 className="section-title">Explore Services</h3>
                            <Link to="/services" className="btn btn-ghost btn-sm">View All <ArrowRight size={14} /></Link>
                        </div>

                        {servicesLoading ? (
                            <div style={{ padding: '2rem', textAlign: 'center' }}>Loading services...</div>
                        ) : Object.keys(categorizedServices).length === 0 ? (
                            <div className="card" style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                                No services currently available in your area.
                            </div>
                        ) : (
                            <div className="categories-stack" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                {Object.entries(categorizedServices).map(([category, items]) => (
                                    <div key={category} className="category-group">
                                        <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            {category} <span className="badge badge-gray" style={{ fontSize: '0.7rem' }}>{items.length}</span>
                                        </h4>
                                        <div className="services-scroll" style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                                            {items.map(service => (
                                                <div
                                                    key={service.id}
                                                    className="card service-mini-card"
                                                    onClick={() => navigate(`/services/${service.id}`)}
                                                    style={{ minWidth: '220px', cursor: 'pointer', flexShrink: 0 }}
                                                >
                                                    <img
                                                        src={service.image_url || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&h=120&fit=crop'}
                                                        alt={service.title}
                                                        style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.75rem' }}
                                                    />
                                                    <h5 style={{ margin: '0 0 4px 0', fontSize: '0.9rem' }}>{service.title}</h5>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <span style={{ fontSize: '0.8rem', color: 'var(--primary-600)', fontWeight: 'bold' }}>₹{service.price}</span>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.75rem', color: 'var(--accent-yellow)' }}>
                                                            <Star size={12} fill="currentColor" />
                                                            <span>4.8</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="sidebar-content">
                    <div className="card">
                        <h3 className="card-title" style={{ marginBottom: '1rem' }}>Quick Actions</h3>
                        <div className="quick-actions">
                            <Link to="/customer/book-service" className="quick-action"><Calendar size={20} /><span>Book</span></Link>
                            <Link to="/customer/bookings" className="quick-action"><Clock size={20} /><span>History</span></Link>
                            <Link to="/customer/profile" className="quick-action"><Bell size={20} /><span>Profile</span></Link>
                            <Link to="/customer/payments" className="quick-action"><CreditCard size={20} /><span>Pay</span></Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rating Modal */}
            {ratingBooking && (
                <div className="modal-overlay" style={{ zIndex: 9999 }}>
                    <div className="modal-content review-modal">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3>Rate {ratingBooking.service}</h3>
                            <button onClick={() => setRatingBooking(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
                        </div>
                        <p style={{ textAlign: 'center', color: '#666' }}>How would you rate your experience with {ratingBooking.provider}?</p>

                        <div className="star-rating" style={{ display: 'flex', justifyContent: 'center', gap: '8px', margin: '2rem 0' }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRatingValue(star)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        padding: '4px',
                                        cursor: 'pointer',
                                        transition: 'transform 0.1s'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    <Star
                                        size={40}
                                        fill={star <= ratingValue ? '#FBBF24' : 'none'}
                                        color="#FBBF24"
                                    />
                                </button>
                            ))}
                        </div>

                        <textarea
                            placeholder="Write a brief review (optional)..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            className="form-control"
                            rows="4"
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--gray-200)' }}
                        ></textarea>

                        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setRatingBooking(null)}>Cancel</button>
                            <button
                                className="btn btn-primary"
                                style={{ flex: 1, background: 'var(--accent-yellow)', borderColor: 'var(--accent-yellow)', color: 'black' }}
                                onClick={handleSubmitRating}
                                disabled={submittingRating}
                            >
                                {submittingRating ? 'Saving...' : 'Submit Rating'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .dashboard-page { max-width: 1200px; margin: 0 auto; padding: 2rem; }
                .welcome-section { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
                .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 2rem; }
                .stat-card { text-align: center; padding: 1.5rem; cursor: pointer; transition: all 0.2s; border: 2px solid transparent; }
                .stat-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
                .stat-card.active { border-color: var(--primary-600); background: var(--primary-50); }
                .stat-value { font-size: 2.5rem; font-weight: bold; }
                .dashboard-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; }
                .bookings-list { display: flex; flex-direction: column; gap: 1rem; }
                .booking-item { display: flex; align-items: center; gap: 1rem; padding: 1rem; background: #fff; border: 1px solid var(--gray-100); border-radius: 12px; transition: all 0.2s; position: relative; }
                .booking-item:hover { border-color: var(--primary-300); background: var(--gray-50); }
                .booking-main-link { flex: 1; display: flex; align-items: center; gap: 1rem; cursor: pointer; }
                .booking-image { width: 64px; height: 64px; border-radius: 8px; object-fit: cover; }
                .booking-info { flex: 1; }
                .booking-info h4 { margin: 0; font-size: 1rem; }
                .booking-info p { margin: 4px 0; font-size: 0.875rem; color: #666; }
                .booking-meta { display: flex; gap: 1rem; font-size: 0.75rem; color: #999; }
                .booking-actions { display: flex; flex-direction: column; align-items: flex-end; }
                .rate-btn { background: var(--accent-yellow); border-color: var(--accent-yellow); color: black; font-weight: bold; }
                .rate-btn:hover { background: #f59e0b; opacity: 0.9; }
                .rating-display { display: flex; align-items: center; gap: 4px; }
                .rating-text { font-weight: bold; color: var(--accent-yellow); font-size: 0.875rem; }
                
                .services-scroll::-webkit-scrollbar { height: 6px; }
                .services-scroll::-webkit-scrollbar-track { background: var(--gray-100); border-radius: 10px; }
                .services-scroll::-webkit-scrollbar-thumb { background: var(--gray-300); border-radius: 10px; }
                .services-scroll::-webkit-scrollbar-thumb:hover { background: var(--gray-400); }
                
                .service-mini-card { padding: 1rem; border: 1px solid var(--gray-100); transition: all 0.2s; }
                .service-mini-card:hover { transform: translateY(-4px); border-color: var(--primary-300); box-shadow: var(--shadow-md); }
                
                .quick-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
                .quick-action { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; padding: 1rem; background: var(--gray-50); border-radius: 12px; font-size: 0.875rem; text-decoration: none; color: inherit; }
                .quick-action:hover { background: var(--primary-50); color: var(--primary-600); }
                
                .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; padding: 1rem; backdrop-filter: blur(4px); }
                .modal-content { background: white; padding: 2rem; border-radius: 20px; max-width: 500px; width: 100%; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); }
                
                .badge { padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; }
                .badge-warning { background: #fff7ed; color: #c2410c; }
                .badge-success { background: #f0fdf4; color: #15803d; }
                
                @media (max-width: 1024px) { .dashboard-grid { grid-template-columns: 1fr; } }
                @media (max-width: 768px) { .stats-row { grid-template-columns: 1fr; } .welcome-section { flex-direction: column; text-align: center; gap: 1rem; } }
            `}</style>
        </div>
    );
};

export default CustomerDashboard;
