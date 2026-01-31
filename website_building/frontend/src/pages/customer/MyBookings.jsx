import { Link } from 'react-router-dom';
import { Calendar, Clock, Filter, Search } from 'lucide-react';
import { useState } from 'react';

const MyBookings = () => {
    const [activeTab, setActiveTab] = useState('all');

    const bookings = [
        { id: 1, service: 'Home Cleaning', provider: 'CleanPro', date: 'Jan 30, 2026', time: '10:00 AM', status: 'upcoming', price: 79, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=100&h=100&fit=crop' },
        { id: 2, service: 'AC Service', provider: 'CoolAir', date: 'Feb 2, 2026', time: '2:00 PM', status: 'pending', price: 89, image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=100&h=100&fit=crop' },
        { id: 3, service: 'Plumbing', provider: 'FixIt Pro', date: 'Jan 20, 2026', time: '9:00 AM', status: 'completed', price: 69, image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=100&h=100&fit=crop' },
        { id: 4, service: 'Electrical', provider: 'PowerFix', date: 'Jan 15, 2026', time: '11:00 AM', status: 'completed', price: 79, image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=100&h=100&fit=crop' },
    ];

    const tabs = ['all', 'upcoming', 'pending', 'completed', 'cancelled'];
    const filteredBookings = activeTab === 'all' ? bookings : bookings.filter(b => b.status === activeTab);

    const statusColors = { upcoming: 'badge-info', pending: 'badge-warning', completed: 'badge-success', cancelled: 'badge-error' };

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
                {filteredBookings.map(booking => (
                    <Link key={booking.id} to={`/customer/bookings/${booking.id}`} className="card booking-card">
                        <img src={booking.image} alt={booking.service} />
                        <div className="booking-info">
                            <h3>{booking.service}</h3>
                            <p>{booking.provider}</p>
                            <div className="booking-meta">
                                <span><Calendar size={14} /> {booking.date}</span>
                                <span><Clock size={14} /> {booking.time}</span>
                            </div>
                        </div>
                        <div className="booking-end">
                            <span className={`badge ${statusColors[booking.status]}`}>{booking.status}</span>
                            <span className="price">${booking.price}</span>
                        </div>
                    </Link>
                ))}
                {filteredBookings.length === 0 && <div className="empty-state"><p>No bookings found</p></div>}
            </div>

            <style>{`
        .my-bookings-page { max-width: 900px; margin: 0 auto; }
        .page-header { margin-bottom: var(--space-6); }
        .page-header h1 { font-size: var(--text-2xl); margin-bottom: var(--space-1); }
        .page-header p { color: var(--gray-500); }
        .toolbar { margin-bottom: var(--space-6); }
        .bookings-list { display: flex; flex-direction: column; gap: var(--space-4); }
        .booking-card { display: flex; align-items: center; gap: var(--space-4); padding: var(--space-4); }
        .booking-card:hover { border-color: var(--primary-300); }
        .booking-card img { width: 80px; height: 80px; border-radius: var(--radius-lg); object-fit: cover; }
        .booking-info { flex: 1; }
        .booking-info h3 { font-size: var(--text-lg); margin-bottom: var(--space-1); }
        .booking-info p { font-size: var(--text-sm); color: var(--gray-500); margin-bottom: var(--space-2); }
        .booking-meta { display: flex; gap: var(--space-4); font-size: var(--text-sm); color: var(--gray-500); }
        .booking-meta span { display: flex; align-items: center; gap: var(--space-1); }
        .booking-end { text-align: right; }
        .booking-end .price { display: block; font-size: var(--text-lg); font-weight: var(--font-bold); color: var(--primary-600); margin-top: var(--space-2); }
        .empty-state { text-align: center; padding: var(--space-12); color: var(--gray-500); }
        @media (max-width: 768px) { .booking-card { flex-wrap: wrap; } .tabs { overflow-x: auto; } }
      `}</style>
        </div>
    );
};

export default MyBookings;
