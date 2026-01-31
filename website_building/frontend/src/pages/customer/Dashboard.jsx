import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, ArrowRight, CreditCard, Bell, Star, CheckCircle } from 'lucide-react';
import { getBookings } from '../../api';

const CustomerDashboard = () => {
    const [upcomingBookings, setUpcomingBookings] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            if (user.id) {
                try {
                    const token = localStorage.getItem('token');
                    const bookings = await getBookings(user.id, 'customer', token || user.token);

                    // Transform booking data for display
                    const formattedBookings = bookings.map(b => ({
                        id: b.id,
                        service: b.service_name,
                        provider: 'Service Provider', // Can be enhanced with provider name
                        date: new Date(b.booking_date).toLocaleDateString(),
                        time: '10:00 AM', // Placeholder
                        status: b.status,
                        image: b.image_url || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=100&h=100&fit=crop'
                    }));

                    // Filter upcoming bookings (pending or confirmed)
                    const upcoming = formattedBookings.filter(b =>
                        b.status === 'pending' || b.status === 'confirmed'
                    );

                    setUpcomingBookings(upcoming);
                } catch (err) {
                    console.error("Failed to fetch bookings", err);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        fetchBookings();
    }, [user.id]);

    // Calculate stats from real data
    const stats = [
        { label: 'Total Bookings', value: upcomingBookings.length.toString(), color: 'var(--primary-600)' },
        { label: 'Upcoming', value: upcomingBookings.filter(b => b.status === 'pending' || b.status === 'confirmed').length.toString(), color: 'var(--accent-orange)' },
        { label: 'Completed', value: upcomingBookings.filter(b => b.status === 'completed').length.toString(), color: 'var(--success)' },
    ];

    const quickActions = [
        { icon: Calendar, label: 'Book Service', link: '/customer/book-service' },
        { icon: Clock, label: 'My Bookings', link: '/customer/bookings' },
        { icon: MapPin, label: 'Addresses', link: '/customer/addresses' },
        { icon: CreditCard, label: 'Payments', link: '/customer/payments' },
    ];

    return (
        <div className="dashboard-page">
            <div className="welcome-section">
                <div>
                    <h1>Welcome back, {user.name || 'Customer'}!</h1>
                    <p>Here's an overview of your account</p>
                </div>
                <Link to="/customer/book-service" className="btn btn-primary">
                    Book a Service <ArrowRight size={18} />
                </Link>
            </div>

            <div className="stats-row">
                {stats.map((stat, idx) => (
                    <div key={idx} className="card stat-card">
                        <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="dashboard-grid">
                <div className="main-content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Upcoming Bookings</h3>
                            <Link to="/customer/bookings" className="btn btn-ghost btn-sm">View All</Link>
                        </div>
                        <div className="bookings-list">
                            {upcomingBookings.map(booking => (
                                <Link key={booking.id} to={`/customer/bookings/${booking.id}`} className="booking-item">
                                    <img src={booking.image} alt={booking.service} className="booking-image" />
                                    <div className="booking-info">
                                        <h4>{booking.service}</h4>
                                        <p>{booking.provider}</p>
                                        <div className="booking-meta">
                                            <span><Calendar size={14} /> {booking.date}</span>
                                            <span><Clock size={14} /> {booking.time}</span>
                                        </div>
                                    </div>
                                    <span className={`badge ${booking.status === 'Confirmed' ? 'badge-success' : 'badge-warning'}`}>
                                        {booking.status}
                                    </span>
                                </Link>
                            ))}
                            {upcomingBookings.length === 0 && (
                                <div className="empty-state">
                                    <p>No upcoming bookings</p>
                                    <Link to="/customer/book-service" className="btn btn-primary btn-sm">Book Now</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="sidebar-content">
                    <div className="card">
                        <h3 className="card-title" style={{ marginBottom: 'var(--space-4)' }}>Quick Actions</h3>
                        <div className="quick-actions">
                            {quickActions.map((action, idx) => (
                                <Link key={idx} to={action.link} className="quick-action">
                                    <action.icon size={20} />
                                    <span>{action.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="card">
                        <h3 className="card-title" style={{ marginBottom: 'var(--space-4)' }}>Recent Activity</h3>
                        <div className="activity-list">
                            <div className="activity-item">
                                <CheckCircle size={16} className="text-success" />
                                <span>Booking #1234 completed</span>
                            </div>
                            <div className="activity-item">
                                <Star size={16} className="text-warning" />
                                <span>You rated CleanPro 5 stars</span>
                            </div>
                            <div className="activity-item">
                                <Bell size={16} className="text-primary" />
                                <span>Payment received</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .dashboard-page { max-width: 1200px; margin: 0 auto; }
        .welcome-section { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-8); }
        .welcome-section h1 { font-size: var(--text-2xl); margin-bottom: var(--space-1); }
        .welcome-section p { color: var(--gray-500); }
        .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6); margin-bottom: var(--space-8); }
        .stat-card { text-align: center; padding: var(--space-6); }
        .stat-value { font-size: var(--text-4xl); font-weight: var(--font-bold); margin-bottom: var(--space-1); }
        .stat-label { color: var(--gray-500); }
        .dashboard-grid { display: grid; grid-template-columns: 2fr 1fr; gap: var(--space-6); }
        .bookings-list { display: flex; flex-direction: column; gap: var(--space-4); }
        .booking-item { display: flex; align-items: center; gap: var(--space-4); padding: var(--space-4); background: var(--gray-50); border-radius: var(--radius-lg); }
        .booking-item:hover { background: var(--gray-100); }
        .booking-image { width: 64px; height: 64px; border-radius: var(--radius-lg); object-fit: cover; }
        .booking-info { flex: 1; }
        .booking-info h4 { font-size: var(--text-base); margin-bottom: var(--space-1); }
        .booking-info p { font-size: var(--text-sm); color: var(--gray-500); margin-bottom: var(--space-2); }
        .booking-meta { display: flex; gap: var(--space-4); font-size: var(--text-sm); color: var(--gray-500); }
        .booking-meta span { display: flex; align-items: center; gap: var(--space-1); }
        .sidebar-content { display: flex; flex-direction: column; gap: var(--space-6); }
        .quick-actions { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); }
        .quick-action { display: flex; flex-direction: column; align-items: center; gap: var(--space-2); padding: var(--space-4); background: var(--gray-50); border-radius: var(--radius-lg); font-size: var(--text-sm); font-weight: var(--font-medium); color: var(--gray-700); }
        .quick-action:hover { background: var(--primary-50); color: var(--primary-600); }
        .activity-list { display: flex; flex-direction: column; gap: var(--space-3); }
        .activity-item { display: flex; align-items: center; gap: var(--space-3); font-size: var(--text-sm); color: var(--gray-600); }
        .text-success { color: var(--success); }
        .text-warning { color: var(--accent-yellow); }
        .text-primary { color: var(--primary-600); }
        .empty-state { text-align: center; padding: var(--space-8); }
        @media (max-width: 1024px) { .dashboard-grid { grid-template-columns: 1fr; } }
        @media (max-width: 768px) { .stats-row { grid-template-columns: 1fr; } .welcome-section { flex-direction: column; gap: var(--space-4); text-align: center; } }
      `}</style>
        </div>
    );
};

export default CustomerDashboard;
