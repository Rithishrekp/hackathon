import { useNavigate } from 'react-router-dom';
import { Calendar, Star, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getBookings, rateBooking } from '../../api';

const MyBookings = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('all');
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});

    // Rating state
    const [ratingBooking, setRatingBooking] = useState(null);
    const [ratingValue, setRatingValue] = useState(5);
    const [reviewText, setReviewText] = useState('');
    const [submittingRating, setSubmittingRating] = useState(false);

    const fetchBookings = async () => {
        if (!user.id) return;
        try {
            const token = localStorage.getItem('token');
            const data = await getBookings(user.id, 'customer', token);
            setBookings(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [user.id]);

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

    const handleRateNow = (e, booking) => {
        e.preventDefault();
        e.stopPropagation();
        setRatingBooking(booking);
        setRatingValue(5);
        setReviewText('');
    };

    const tabs = ['all', 'upcoming', 'pending', 'completed', 'cancelled'];
    const filteredBookings = activeTab === 'all' ? bookings : bookings.filter(b => b.status === activeTab);

    const statusColors = {
        upcoming: 'badge-info',
        pending: 'badge-warning',
        completed: 'badge-success',
        cancelled: 'badge-error',
        in_progress_done: 'badge-warning'
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading your bookings...</div>;

    return (
        <div className="my-bookings-page">
            <div className="page-header"><h1>My Bookings</h1><p>View and manage your service bookings</p></div>

            <div className="toolbar">
                <div className="tabs">
                    {tabs.map(tab => (
                        <button key={tab} className={`tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bookings-list">
                {filteredBookings.length === 0 ? (
                    <div className="empty-state"><p>No {activeTab !== 'all' ? activeTab : ''} bookings found</p></div>
                ) : (
                    filteredBookings.map(booking => (
                        <div
                            key={booking.id}
                            className="booking-card-wrapper"
                            style={{ position: 'relative' }}
                        >
                            <div
                                className="card booking-card"
                                onClick={() => navigate(`/customer/bookings/${booking.id}`)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img
                                    src={booking.image_url || 'https://images.unsplash.com/photo-1581578731548-c64695cc6954?w=100&h=100&fit=crop'}
                                    alt={booking.service_name}
                                />
                                <div className="booking-info">
                                    <h3>{booking.service_name}</h3>
                                    <p>{booking.provider_name || 'Service Provider'}</p>
                                    <div className="booking-meta">
                                        <span><Calendar size={14} /> {formatDate(booking.booking_date)}</span>
                                        {booking.rating && (
                                            <span className="rating-tag">
                                                <Star size={12} fill="#FBBF24" color="#FBBF24" /> {booking.rating}.0
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="booking-end">
                                    <span className={`badge ${statusColors[booking.status] || 'badge-gray'}`}>
                                        {booking.status === 'in_progress_done' ? 'Working...' : booking.status}
                                    </span>
                                    <div className="price" style={{ marginTop: '8px', fontWeight: 'bold', color: 'var(--primary-600)' }}>₹{booking.price || 0}</div>
                                </div>
                            </div>

                            {booking.status === 'completed' && !booking.rating && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRateNow(e, booking);
                                    }}
                                    className="btn btn-primary btn-sm"
                                    style={{
                                        position: 'absolute',
                                        right: '24px',
                                        bottom: '24px',
                                        background: 'var(--accent-yellow)',
                                        borderColor: 'var(--accent-yellow)',
                                        color: 'black',
                                        zIndex: 10,
                                        fontWeight: 'bold'
                                    }}
                                >
                                    <Star size={14} fill="currentColor" /> Rate Now
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Rating Modal */}
            {ratingBooking && (
                <div className="modal-overlay" style={{ zIndex: 9999 }}>
                    <div className="modal-content">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3>Rate Service</h3>
                            <button onClick={() => setRatingBooking(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
                        </div>
                        <p style={{ textAlign: 'center', color: '#666' }}>How was your experience with <strong>{ratingBooking.provider_name}</strong>?</p>

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
                            placeholder="Share your feedback..."
                            className="form-control"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            rows="4"
                            style={{ width: '100%', marginBottom: '20px', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                        ></textarea>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setRatingBooking(null)}>Cancel</button>
                            <button
                                className="btn btn-primary"
                                style={{ flex: 1, background: 'var(--accent-yellow)', borderColor: 'var(--accent-yellow)', color: 'black', fontWeight: 'bold' }}
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
        .my-bookings-page { max-width: 900px; margin: 0 auto; padding-bottom: 4rem; }
        .page-header { margin-bottom: 2rem; }
        .toolbar { margin-bottom: 2rem; }
        .bookings-list { display: flex; flex-direction: column; gap: 1rem; }
        .booking-card-wrapper { transition: all 0.2s; border-radius: 12px; }
        .booking-card-wrapper:hover { transform: translateY(-2px); }
        .booking-card { display: flex; align-items: center; gap: 1rem; padding: 1rem; position: relative; }
        .booking-card img { width: 80px; height: 80px; border-radius: 12px; object-fit: cover; }
        .booking-info { flex: 1; }
        .booking-info h3 { margin: 0 0 4px 0; font-size: 1.125rem; }
        .booking-info p { margin: 0; font-size: 0.875rem; color: #666; }
        .booking-meta { display: flex; gap: 1rem; font-size: 0.75rem; color: #999; margin-top: 8px; align-items: center; }
        .rating-tag { background: #fffbeb; color: #d97706; padding: 2px 8px; border-radius: 20px; font-weight: bold; }
        .booking-end { text-align: right; min-width: 120px; }
        
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; padding: 1rem; backdrop-filter: blur(4px); }
        .modal-content { background: white; padding: 2.5rem; border-radius: 20px; max-width: 450px; width: 100%; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); }
        
        .badge { padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; }
        .badge-info { background: #e0f2fe; color: #0284c7; }
        .badge-success { background: #f0fdf4; color: #15803d; }
        .badge-warning { background: #fff7ed; color: #c2410c; }
        @media (max-width: 768px) { .booking-card { flex-wrap: wrap; } .tabs { overflow-x: auto; } .booking-end { text-align: left; margin-top: 1rem; width: 100%; } }
      `}</style>
        </div>
    );
};

export default MyBookings;
