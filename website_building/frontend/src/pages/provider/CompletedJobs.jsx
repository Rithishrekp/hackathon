import { Link } from 'react-router-dom';
import { Calendar, Star, DollarSign, Filter } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getBookings } from '../../api';

const CompletedJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});

    useEffect(() => {
        const fetchJobs = async () => {
            if (user.id) {
                try {
                    const token = localStorage.getItem('token');
                    const bookings = await getBookings(user.id, 'provider', token || user.token);

                    const completed = bookings
                        .filter(b => b.status === 'completed')
                        .map(b => ({
                            id: b.id,
                            service: b.service_name,
                            customer: b.customer_name || 'Customer',
                            date: new Date(b.booking_date).toLocaleDateString(),
                            amount: b.price || 0,
                            rating: b.rating
                        }));
                    setJobs(completed);
                } catch (err) {
                    console.error("Failed to fetch jobs", err);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        fetchJobs();
    }, [user.id]);

    const totalEarnings = jobs.reduce((sum, j) => sum + Number(j.amount), 0);

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading history...</div>;

    return (
        <div className="completed-jobs-page">
            <div className="page-header">
                <div><h1>Completed Jobs</h1><p>Your job history</p></div>
                <div className="header-stats"><strong>Total Earnings: ₹{totalEarnings}</strong></div>
            </div>

            <div className="jobs-list">
                {jobs.length === 0 ? (
                    <div className="empty-state" style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--gray-500)' }}>
                        <p>No completed jobs yet.</p>
                    </div>
                ) : (
                    jobs.map(job => (
                        <Link key={job.id} to={`/provider/jobs/${job.id}`} className="card job-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="job-info">
                                <h4>{job.service}</h4>
                                <p>{job.customer}</p>
                                <span className="job-date"><Calendar size={14} /> {job.date}</span>
                            </div>
                            <div className="job-stats">
                                {job.rating ? (
                                    <div className="rating">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} fill={i < job.rating ? '#FBBF24' : 'none'} color="#FBBF24" />
                                        ))}
                                        <span>{job.rating}.0</span>
                                    </div>
                                ) : (
                                    <span className="badge badge-gray">Not rated yet</span>
                                )}
                                <span className="amount">₹{job.amount}</span>
                            </div>
                        </Link>
                    ))
                )}
            </div>
            <style>{`
        .completed-jobs-page { max-width: 900px; margin: 0 auto; }
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-6); }
        .page-header h1 { font-size: var(--text-2xl); margin-bottom: var(--space-1); }
        .page-header p { color: var(--gray-500); }
        .header-stats { display: flex; align-items: center; gap: var(--space-2); font-size: var(--text-lg); color: var(--gray-600); }
        .header-stats strong { color: var(--primary-600); }
        .jobs-list { display: flex; flex-direction: column; gap: var(--space-3); }
        .job-card { display: flex; justify-content: space-between; align-items: center; padding: var(--space-4); }
        .job-card:hover { border-color: var(--primary-300); }
        .job-info h4 { margin-bottom: var(--space-1); }
        .job-info p { font-size: var(--text-sm); color: var(--gray-600); margin-bottom: var(--space-1); }
        .job-date { font-size: var(--text-sm); color: var(--gray-400); display: flex; align-items: center; gap: var(--space-1); }
        .job-stats { text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: var(--space-2); }
        .rating { display: flex; align-items: center; gap: var(--space-1); font-weight: var(--font-semibold); color: var(--accent-yellow); font-size: 14px; }
        .amount { font-size: var(--text-xl); font-weight: var(--font-bold); color: var(--primary-600); }
        .badge-gray { background: #f3f4f6; color: #6b7280; font-size: 12px; padding: 2px 8px; border-radius: 99px; }
        @media (max-width: 768px) { .page-header { flex-direction: column; gap: var(--space-4); align-items: flex-start; } }
      `}</style>
        </div>
    );
};

export default CompletedJobs;
