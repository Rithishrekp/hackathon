import { Link } from 'react-router-dom';
import { DollarSign, Briefcase, Star, Clock, ArrowRight, TrendingUp, CheckCircle, Calendar, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getBookings, toggleAvailability } from '../../api';
import AddServiceModal from '../../components/services/AddServiceModal';

const ProviderDashboard = () => {
    const [recentJobs, setRecentJobs] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [isAvailable, setIsAvailable] = useState(user.is_available || false);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchJobs = async () => {
            if (user.id) {
                try {
                    const token = localStorage.getItem('token');
                    const bookings = await getBookings(user.id, 'provider', token || user.token);

                    // Transform booking data for display
                    const formattedJobs = bookings.map(b => ({
                        id: b.id,
                        service: b.service_name,
                        customer: b.customer_name || 'Customer',
                        date: new Date(b.booking_date).toLocaleDateString(),
                        time: '10:00 AM', // Placeholder time if not in DB
                        status: b.status,
                        amount: b.price || 0,
                        rating: b.rating
                    }));
                    setRecentJobs(formattedJobs);
                } catch (err) {
                    console.error("Failed to fetch jobs", err);
                }
            }
        };
        fetchJobs();
    }, [user.id]);

    const handleToggleAvailability = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await toggleAvailability(user.id, token);
            setIsAvailable(response.is_available);

            // Update user in localStorage
            const updatedUser = { ...user, is_available: response.is_available };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
        } catch (err) {
            console.error("Failed to toggle availability", err);
            alert(err.message || 'Failed to update availability');
        } finally {
            setLoading(false);
        }
    };

    // Derived stats
    const completedJobs = recentJobs.filter(j => j.status === 'completed');
    const totalEarnings = completedJobs.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);

    // Calculate average rating
    const ratedJobs = recentJobs.filter(j => j.rating);
    const avgRating = ratedJobs.length > 0
        ? (ratedJobs.reduce((acc, curr) => acc + curr.rating, 0) / ratedJobs.length).toFixed(1)
        : '5.0';

    const stats = [
        { label: 'Total Earnings', value: `₹${totalEarnings}`, icon: DollarSign, color: 'var(--success)', link: '/provider/earnings' },
        { label: 'Active Jobs', value: recentJobs.filter(j => j.status === 'upcoming' || j.status === 'pending' || j.status === 'confirmed').length.toString(), icon: Briefcase, color: 'var(--primary-600)', link: '/provider/active-jobs' },
        { label: 'Completed', value: completedJobs.length.toString(), icon: CheckCircle, color: 'var(--accent-cyan)', link: '/provider/completed-jobs' },
        { label: 'Rating', value: avgRating, icon: Star, color: 'var(--accent-yellow)', link: '/provider/reviews' },
    ];

    return (
        <div className="dashboard-page">
            <div className="welcome-section">
                <div>
                    <h1>Welcome back, {user.name || 'Partner'}!</h1>
                    <p>Here's your business overview</p>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="btn btn-primary"
                        style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}
                    >
                        <Plus size={18} /> Add Service
                    </button>

                    <button
                        onClick={handleToggleAvailability}
                        disabled={loading}
                        className={`btn ${isAvailable ? 'btn-success' : 'btn-secondary'}`}
                        style={{
                            minWidth: '200px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)',
                            justifyContent: 'center'
                        }}
                    >
                        <div style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: isAvailable ? '#ffffff' : '#6b7280',
                        }} />
                        {loading ? 'Updating...' : isAvailable ? 'You are Online' : 'Go Online'}
                    </button>
                </div>
            </div>

            <div className="stats-grid">
                {stats.map((stat, idx) => (
                    <Link key={idx} to={stat.link} className="card stat-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="stat-icon" style={{ background: `${stat.color}15`, color: stat.color }}><stat.icon size={24} /></div>
                        <div className="stat-info"><div className="stat-value">{stat.value}</div><div className="stat-label">{stat.label}</div></div>
                    </Link>
                ))}
            </div>

            <div className="dashboard-grid">
                <div className="card">
                    <div className="card-header"><h3 className="card-title">Recent Jobs</h3><Link to="/provider/active-jobs" className="btn btn-ghost btn-sm">View All</Link></div>
                    <div className="jobs-list">
                        {recentJobs.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--gray-500)' }}>
                                <p>No recent jobs yet.</p>
                                <p style={{ fontSize: 'var(--text-sm)' }}>Add services and go online to get booked!</p>
                            </div>
                        ) : (
                            recentJobs.map(job => (
                                <Link key={job.id} to={`/provider/jobs/${job.id}`} className="job-item">
                                    <div className="job-info">
                                        <h4>{job.service}</h4>
                                        <p>{job.customer}</p>
                                        <div className="job-meta">
                                            <span><Calendar size={14} /> {job.date}</span>
                                            {job.rating && (
                                                <span className="rating-pill">
                                                    <Star size={12} fill="#FBBF24" color="#FBBF24" /> {job.rating}.0
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="job-end">
                                        <span className={`badge ${job.status === 'completed' ? 'badge-success' : job.status === 'confirmed' ? 'badge-info' : 'badge-warning'}`}>{job.status}</span>
                                        <span className="amount">₹{job.amount}</span>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>

                <div className="card">
                    <h3 className="card-title" style={{ marginBottom: 'var(--space-4)' }}>Business Summary</h3>
                    <div className="earnings-chart">
                        <div className="chart-placeholder">
                            <TrendingUp size={48} />
                            <p>₹{totalEarnings} earned (total)</p>
                            <span className="badge badge-gray">{completedJobs.length} completed jobs</span>
                            <div style={{ marginTop: 'var(--space-4)', color: 'var(--gray-500)', fontSize: '14px' }}>
                                Average Rating: <strong style={{ color: 'var(--accent-yellow)' }}>{avgRating}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AddServiceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onServiceAdded={() => {
                    alert('Service added successfully!');
                }}
                user={user}
            />

            <style>{`
        .dashboard-page { max-width: 1200px; margin: 0 auto; }
        .welcome-section { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-8); }
        .welcome-section h1 { font-size: var(--text-2xl); margin-bottom: var(--space-1); }
        .welcome-section p { color: var(--gray-500); }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-6); margin-bottom: var(--space-8); }
        .stat-card { display: flex; align-items: center; gap: var(--space-4); transition: transform 0.2s; }
        .stat-card:hover { transform: translateY(-4px); }
        .stat-icon { width: 56px; height: 56px; border-radius: var(--radius-xl); display: flex; align-items: center; justify-content: center; }
        .stat-value { font-size: var(--text-2xl); font-weight: var(--font-bold); }
        .stat-label { font-size: var(--text-sm); color: var(--gray-500); }
        .dashboard-grid { display: grid; grid-template-columns: 2fr 1fr; gap: var(--space-6); }
        .jobs-list { display: flex; flex-direction: column; gap: var(--space-3); }
        .job-item { display: flex; justify-content: space-between; align-items: center; padding: var(--space-4); background: var(--gray-50); border-radius: var(--radius-lg); text-decoration: none; color: inherit; }
        .job-item:hover { background: var(--gray-100); }
        .job-info h4 { font-size: var(--text-base); margin-bottom: var(--space-1); }
        .job-info p { font-size: var(--text-sm); color: var(--gray-500); margin-bottom: var(--space-1); }
        .job-meta { font-size: var(--text-sm); color: var(--gray-400); display: flex; align-items: center; gap: var(--space-4); }
        .job-meta span { display: flex; align-items: center; gap: var(--space-1); }
        .rating-pill { background: #fffbeb; color: #d97706; padding: 2px 8px; border-radius: 999px; font-weight: 600; font-size: 12px; }
        .job-end { text-align: right; }
        .job-end .amount { display: block; font-size: var(--text-lg); font-weight: var(--font-bold); color: var(--primary-600); margin-top: var(--space-2); }
        .badge-info { background: #e0f2fe; color: #0284c7; }
        .badge-success { background: #dcfce7; color: #16a34a; }
        .badge-warning { background: #fffbeb; color: #d97706; }
        .earnings-chart { padding: var(--space-8); }
        .chart-placeholder { text-align: center; color: var(--gray-400); }
        .chart-placeholder p { font-size: var(--text-xl); font-weight: var(--font-bold); color: var(--gray-900); margin: var(--space-4) 0 var(--space-2); }
        @media (max-width: 1024px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } .dashboard-grid { grid-template-columns: 1fr; } }
        @media (max-width: 768px) { .stats-grid { grid-template-columns: 1fr; } .welcome-section { flex-direction: column; gap: var(--space-4); text-align: center; } }
      `}</style>
        </div>
    );
};

export default ProviderDashboard;
