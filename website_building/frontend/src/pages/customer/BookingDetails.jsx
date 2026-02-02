import { Link, useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, User, Phone, CheckCircle, XCircle, Star, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getBookingById, updateBookingStatus, rateBooking } from '../../api';

const BookingDetails = () => {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

    // Rating state
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [ratingValue, setRatingValue] = useState(5);
    const [reviewText, setReviewText] = useState('');
    const [submittingRating, setSubmittingRating] = useState(false);

    const fetchBookingDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You need to be logged in.');
                return;
            }
            const data = await getBookingById(bookingId, token);
            setBooking(data);
        } catch (err) {
            console.error("Failed to fetch booking", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (bookingId) {
            fetchBookingDetails();
        }
    }, [bookingId]);

    const handleConfirmCompletion = async () => {
        if (!confirm('Are you sure you want to mark this service as completed?')) return;

        setActionLoading(true);
        try {
            const token = localStorage.getItem('token');
            await updateBookingStatus(bookingId, 'completed', token);
            fetchBookingDetails();
            alert('Service marked as completed! You can now rate the service.');
        } catch (err) {
            console.error('Failed to complete booking', err);
            alert('Failed to complete booking: ' + err.message);
        } finally {
            setActionLoading(false);
        }
    };

    const handleSubmitRating = async () => {
        setSubmittingRating(true);
        try {
            const token = localStorage.getItem('token');
            await rateBooking(bookingId, ratingValue, reviewText, token);
            setShowRatingModal(false);
            fetchBookingDetails();
            alert('Thank you for your rating!');
        } catch (err) {
            alert('Failed to submit rating: ' + err.message);
        } finally {
            setSubmittingRating(false);
        }
    };

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading booking details...</div>;
    if (!booking) return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <p>Booking not found or loading failed.</p>
            <Link to="/customer/bookings" className="btn btn-primary">Back to Bookings</Link>
        </div>
    );

    const bookingDate = booking.booking_date ? new Date(booking.booking_date).toLocaleDateString() : 'Date pending';

    const getBadgeClass = (status) => {
        switch (status) {
            case 'completed': return 'badge-success';
            case 'confirmed': return 'badge-info';
            case 'cancelled': return 'badge-error';
            case 'in_progress_done': return 'badge-warning';
            default: return 'badge-warning';
        }
    };

    return (
        <div className="booking-details-page">
            <Link to="/customer/bookings" className="back-link"><ArrowLeft size={18} /> Back to Bookings</Link>

            <div className="details-header">
                <div>
                    <h1>Booking #{booking.id}</h1>
                    <span className={`badge ${getBadgeClass(booking.status)}`}>
                        {booking.status === 'in_progress_done' ? 'Awaiting Your Confirmation' : booking.status}
                    </span>
                </div>
                <div className="header-actions">
                    {booking.status === 'in_progress_done' && (
                        <button
                            onClick={handleConfirmCompletion}
                            disabled={actionLoading}
                            className="btn btn-primary"
                            style={{ background: 'var(--success)', borderColor: 'var(--success)' }}
                        >
                            <CheckCircle size={18} /> Confirm Completion
                        </button>
                    )}

                    {booking.status === 'completed' && !booking.rating && (
                        <button
                            onClick={() => setShowRatingModal(true)}
                            className="btn btn-primary"
                            style={{ background: 'var(--accent-yellow)', borderColor: 'var(--accent-yellow)', color: 'black' }}
                        >
                            <Star size={18} fill="currentColor" /> Rate Service
                        </button>
                    )}

                    {booking.rating && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-yellow)' }}>
                            <div style={{ display: 'flex' }}>
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} fill={i < booking.rating ? "currentColor" : "none"} color="currentColor" />
                                ))}
                            </div>
                            <span style={{ fontWeight: 'bold' }}>{booking.rating}.0</span>
                        </div>
                    )}
                </div>
            </div>

            {showRatingModal && (
                <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
                    <div className="modal-content" style={{ background: 'white', padding: 'var(--space-8)', borderRadius: 'var(--radius-2xl)', maxWidth: '400px', width: '100%' }}>
                        <h3 style={{ textAlign: 'center', marginBottom: 'var(--space-2)' }}>Rate Service</h3>
                        <p style={{ textAlign: 'center', color: '#666', fontSize: '14px' }}>How was your experience with {booking.provider_name}?</p>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-2)', margin: 'var(--space-6) 0' }}>
                            {[1, 2, 3, 4, 5].map(star => (
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
                                        size={32}
                                        fill={star <= ratingValue ? '#FBBF24' : 'none'}
                                        color="#FBBF24"
                                    />
                                </button>
                            ))}
                        </div>
                        <textarea
                            placeholder="Share your thoughts..."
                            className="form-control"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            rows="4"
                            style={{ width: '100%', marginBottom: 'var(--space-4)' }}
                        ></textarea>
                        <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setShowRatingModal(false)}>Cancel</button>
                            <button
                                className="btn btn-primary"
                                style={{ flex: 1 }}
                                onClick={handleSubmitRating}
                                disabled={submittingRating}
                            >
                                {submittingRating ? 'Saving...' : 'Submit'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="details-grid">
                <div className="main-content">
                    <div className="card">
                        <h3>Service Details</h3>
                        <div className="detail-row"><span>Service</span><strong>{booking.service_name}</strong></div>
                        <div className="detail-row"><Calendar size={16} /><span>{bookingDate}</span></div>
                        <div className="detail-row"><Clock size={16} /><span>10:00 AM (Est.)</span></div>
                        <div className="detail-row"><MapPin size={16} /><span>{booking.address || 'Your Address'}</span></div>
                    </div>

                    <div className="card">
                        <h3>Service Provider</h3>
                        <div className="provider-info">
                            <img src={booking.provider_avatar || 'https://ui-avatars.com/api/?name=' + (booking.provider_name || 'P') + '&background=random'} alt="Provider" />
                            <div>
                                <h4>{booking.provider_name || 'Service Provider'}</h4>
                                <div className="provider-meta">
                                    <span><Phone size={14} /> {booking.provider_phone || 'N/A'}</span>
                                    <span><User size={14} /> Verified Pro</span>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-secondary" style={{ width: '100%', marginTop: 'var(--space-4)' }}>Contact Provider</button>
                    </div>

                    <div className="card">
                        <h3>Payment Summary</h3>
                        <div className="price-row"><span>Service Price</span><span>₹{booking.price}</span></div>
                        <div className="price-row total"><span>Total Paid</span><span>₹{booking.price}</span></div>
                    </div>
                </div>

                <div className="sidebar-content">
                    <div className="card">
                        <h3>Booking Timeline</h3>
                        <div className="timeline">
                            <div className={`timeline-item ${['confirmed', 'in_progress_done', 'completed'].includes(booking.status) ? 'completed' : 'current'}`}>
                                <div className="timeline-dot">1</div>
                                <div className="timeline-content"><strong>Booking Placed</strong></div>
                            </div>
                            <div className={`timeline-item ${['confirmed', 'in_progress_done', 'completed'].includes(booking.status) ? 'completed' : ''}`}>
                                <div className="timeline-dot">2</div>
                                <div className="timeline-content"><strong>Provider Accepted</strong></div>
                            </div>
                            <div className={`timeline-item ${['in_progress_done', 'completed'].includes(booking.status) ? 'completed' : ''}`}>
                                <div className="timeline-dot">3</div>
                                <div className="timeline-content"><strong>Work Done</strong></div>
                            </div>
                            <div className={`timeline-item ${booking.status === 'completed' ? 'completed' : ''}`}>
                                <div className="timeline-dot">4</div>
                                <div className="timeline-content"><strong>Customer Confirmed</strong></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .booking-details-page { max-width: 1100px; margin: 0 auto; padding: var(--space-4); }
        .back-link { display: inline-flex; align-items: center; gap: var(--space-2); color: var(--gray-600); margin-bottom: var(--space-6); text-decoration: none; }
        .back-link:hover { color: var(--primary-600); }
        .details-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-6); flex-wrap: wrap; gap: var(--space-4); }
        .details-header h1 { font-size: var(--text-2xl); display: inline; margin-right: var(--space-3); }
        .header-actions { display: flex; gap: var(--space-3); }
        .details-grid { display: grid; grid-template-columns: 1fr 350px; gap: var(--space-6); }
        .main-content { display: flex; flex-direction: column; gap: var(--space-6); }
        .main-content h3 { margin-bottom: var(--space-4); font-size: var(--text-lg); }
        .detail-row { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3) 0; border-bottom: 1px solid var(--gray-100); color: var(--gray-600); font-size: var(--text-sm); }
        .detail-row:last-child { border-bottom: none; }
        .detail-row strong { margin-left: auto; color: var(--gray-900); }
        .provider-info { display: flex; gap: var(--space-4); }
        .provider-info img { width: 64px; height: 64px; border-radius: var(--radius-lg); object-fit: cover; }
        .provider-info h4 { margin-top: 0; margin-bottom: var(--space-1); }
        .provider-meta { display: flex; gap: var(--space-4); font-size: var(--text-sm); color: var(--gray-500); }
        .provider-meta span { display: flex; align-items: center; gap: var(--space-1); }
        .price-row { display: flex; justify-content: space-between; padding: var(--space-3) 0; border-bottom: 1px solid var(--gray-100); }
        .price-row.total { border: none; font-size: var(--text-lg); font-weight: var(--font-bold); color: var(--primary-600); }
        .sidebar-content h3 { margin-bottom: var(--space-4); font-size: var(--text-lg); }
        .badge { padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; text-transform: uppercase; }
        .badge-info { background: #e0f2fe; color: #0284c7; }
        .badge-success { background: #dcfce7; color: #16a34a; }
        .badge-warning { background: #fffbeb; color: #d97706; }
        .badge-error { background: #fee2e2; color: #dc2626; }
        
        .timeline { position: relative; padding-left: 20px; border-left: 2px solid var(--gray-200); }
        .timeline-item { position: relative; margin-bottom: 20px; padding-left: 20px; }
        .timeline-dot { position: absolute; left: -31px; top: 0; width: 24px; height: 24px; background: var(--gray-200); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; color: var(--gray-600); z-index: 10; }
        .timeline-item.completed .timeline-dot { background: var(--success); color: white; }
        .timeline-item.current .timeline-dot { background: var(--primary-600); color: white; box-shadow: 0 0 0 4px var(--primary-100); }
        
        @media (max-width: 1024px) { .details-grid { grid-template-columns: 1fr; } .details-header { flex-direction: column; gap: var(--space-4); align-items: flex-start; } }
      `}</style>
        </div>
    );
};

export default BookingDetails;
