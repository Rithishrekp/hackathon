import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, MapPin, User, Phone, CheckCircle, XCircle, Star, ArrowLeft } from 'lucide-react';

const BookingDetails = () => {
    const { bookingId } = useParams();

    const booking = {
        id: bookingId || 'BK12345',
        service: 'Home Cleaning',
        status: 'upcoming',
        provider: { name: 'CleanPro Services', phone: '+1 234-567-8901', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop', rating: 4.9 },
        date: 'January 30, 2026',
        time: '10:00 AM',
        address: '123 Main Street, Apt 4B, New York, NY 10001',
        price: 79,
        serviceFee: 5,
        total: 84,
    };

    const timeline = [
        { status: 'Booking Placed', time: 'Jan 28, 10:30 AM', completed: true },
        { status: 'Confirmed', time: 'Jan 28, 10:35 AM', completed: true },
        { status: 'Provider Assigned', time: 'Jan 28, 11:00 AM', completed: true },
        { status: 'Service Scheduled', time: 'Jan 30, 10:00 AM', completed: false, current: true },
        { status: 'Service Completed', time: 'Pending', completed: false },
    ];

    return (
        <div className="booking-details-page">
            <Link to="/customer/bookings" className="back-link"><ArrowLeft size={18} /> Back to Bookings</Link>

            <div className="details-header">
                <div>
                    <h1>Booking #{booking.id}</h1>
                    <span className="badge badge-info">{booking.status}</span>
                </div>
                <div className="header-actions">
                    <button className="btn btn-secondary">Reschedule</button>
                    <button className="btn btn-outline" style={{ color: 'var(--error)', borderColor: 'var(--error)' }}>Cancel</button>
                </div>
            </div>

            <div className="details-grid">
                <div className="main-content">
                    <div className="card">
                        <h3>Service Details</h3>
                        <div className="detail-row"><span>Service</span><strong>{booking.service}</strong></div>
                        <div className="detail-row"><Calendar size={16} /><span>{booking.date}</span></div>
                        <div className="detail-row"><Clock size={16} /><span>{booking.time}</span></div>
                        <div className="detail-row"><MapPin size={16} /><span>{booking.address}</span></div>
                    </div>

                    <div className="card">
                        <h3>Service Provider</h3>
                        <div className="provider-info">
                            <img src={booking.provider.avatar} alt={booking.provider.name} />
                            <div>
                                <h4>{booking.provider.name}</h4>
                                <div className="provider-meta">
                                    <span><Star size={14} fill="#FBBF24" color="#FBBF24" /> {booking.provider.rating}</span>
                                    <span><Phone size={14} /> {booking.provider.phone}</span>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-secondary" style={{ width: '100%', marginTop: 'var(--space-4)' }}>Contact Provider</button>
                    </div>

                    <div className="card">
                        <h3>Payment Summary</h3>
                        <div className="price-row"><span>Service Price</span><span>${booking.price}</span></div>
                        <div className="price-row"><span>Service Fee</span><span>${booking.serviceFee}</span></div>
                        <div className="price-row total"><span>Total Paid</span><span>${booking.total}</span></div>
                    </div>
                </div>

                <div className="sidebar-content">
                    <div className="card">
                        <h3>Booking Timeline</h3>
                        <div className="timeline">
                            {timeline.map((item, idx) => (
                                <div key={idx} className={`timeline-item ${item.completed ? 'completed' : ''} ${item.current ? 'current' : ''}`}>
                                    <div className="timeline-dot">{item.completed ? <CheckCircle size={16} /> : idx + 1}</div>
                                    <div className="timeline-content">
                                        <strong>{item.status}</strong>
                                        <span>{item.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .booking-details-page { max-width: 1100px; margin: 0 auto; }
        .back-link { display: inline-flex; align-items: center; gap: var(--space-2); color: var(--gray-600); margin-bottom: var(--space-6); }
        .back-link:hover { color: var(--primary-600); }
        .details-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-6); }
        .details-header h1 { font-size: var(--text-2xl); display: inline; margin-right: var(--space-3); }
        .header-actions { display: flex; gap: var(--space-3); }
        .details-grid { display: grid; grid-template-columns: 1fr 350px; gap: var(--space-6); }
        .main-content { display: flex; flex-direction: column; gap: var(--space-6); }
        .main-content h3 { margin-bottom: var(--space-4); }
        .detail-row { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3) 0; border-bottom: 1px solid var(--gray-100); color: var(--gray-600); font-size: var(--text-sm); }
        .detail-row:last-child { border-bottom: none; }
        .detail-row strong { margin-left: auto; color: var(--gray-900); }
        .provider-info { display: flex; gap: var(--space-4); }
        .provider-info img { width: 64px; height: 64px; border-radius: var(--radius-lg); object-fit: cover; }
        .provider-info h4 { margin-bottom: var(--space-1); }
        .provider-meta { display: flex; gap: var(--space-4); font-size: var(--text-sm); color: var(--gray-500); }
        .provider-meta span { display: flex; align-items: center; gap: var(--space-1); }
        .price-row { display: flex; justify-content: space-between; padding: var(--space-3) 0; border-bottom: 1px solid var(--gray-100); }
        .price-row.total { border: none; font-size: var(--text-lg); font-weight: var(--font-bold); color: var(--primary-600); }
        .sidebar-content h3 { margin-bottom: var(--space-4); }
        @media (max-width: 1024px) { .details-grid { grid-template-columns: 1fr; } .details-header { flex-direction: column; gap: var(--space-4); align-items: flex-start; } }
      `}</style>
        </div>
    );
};

export default BookingDetails;
