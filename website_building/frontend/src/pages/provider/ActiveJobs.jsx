import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, User, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getBookings } from '../../api';

const ActiveJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});

    useEffect(() => {
        const fetchJobs = async () => {
            if (user.id) {
                try {
                    const token = localStorage.getItem('token');
                    const bookings = await getBookings(user.id, 'provider', token || user.token);
                    // Filter for active statuses (upcoming, confirmed, in_progress, in_progress_done)
                    // Excluding 'completed', 'cancelled', 'pending' (pending is technically active but usually in requests)
                    // Let's include 'pending' as 'Upcoming' or handle logic.
                    // Usually 'Active' means confirmed/in-progress. But for simplicity let's show all non-completed/cancelled.
                    const active = bookings
                        .filter(b => ['confirmed', 'in_progress', 'in_progress_done'].includes(b.status))
                        .map(b => ({
                            id: b.id,
                            service: b.service_name,
                            customer: b.customer_name || 'Customer',
                            address: 'Address hidden', // or fetch if available
                            date: (() => {
                                try {
                                    return b.booking_date ? new Date(b.booking_date).toLocaleDateString() : 'Date pending';
                                } catch (e) { return 'Invalid Date'; }
                            })(),
                            time: '10:00 AM', // placeholder
                            status: b.status,
                            amount: b.price
                        }));
                    setJobs(active);
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

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading active jobs...</div>;

    return (
        <div className="active-jobs-page">
            <div className="page-header"><h1>Active Jobs</h1><p>Your current and scheduled jobs</p></div>
            <div className="jobs-list">
                {jobs.length === 0 ? (
                    <div className="empty-state" style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                        <p>No active jobs at the moment.</p>
                        <Link to="/provider/job-requests" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>Check Requests</Link>
                    </div>
                ) : (
                    jobs.map(job => (
                        <Link key={job.id} to={`/provider/jobs/${job.id}`} className="card job-card">
                            <div className="job-left">
                                <span className={`badge ${job.status === 'confirmed' ? 'badge-success' : 'badge-info'}`}>{job.status}</span>
                                <h3>{job.service}</h3>
                                <p><User size={14} /> {job.customer}</p>
                                <div className="job-meta">
                                    <span><Calendar size={14} /> {job.date}</span>
                                    <span><Clock size={14} /> {job.time}</span>
                                </div>
                            </div>
                            <div className="job-right"><span className="amount">${job.amount}</span></div>
                        </Link>
                    ))
                )}
            </div>
            <style>{`
        .active-jobs-page { max-width: 900px; margin: 0 auto; }
        .page-header { margin-bottom: var(--space-6); }
        .page-header h1 { font-size: var(--text-2xl); margin-bottom: var(--space-1); }
        .page-header p { color: var(--gray-500); }
        .jobs-list { display: flex; flex-direction: column; gap: var(--space-4); }
        .job-card { display: flex; justify-content: space-between; align-items: center; text-decoration: none; color: inherit; }
        .job-card:hover { border-color: var(--primary-300); }
        .job-left h3 { margin: var(--space-2) 0 var(--space-1); font-size: var(--text-lg); }
        .job-left > p { font-size: var(--text-sm); color: var(--gray-600); margin-bottom: var(--space-2); display: flex; align-items: center; gap: var(--space-1); }
        .job-meta { display: flex; flex-wrap: wrap; gap: var(--space-4); font-size: var(--text-sm); color: var(--gray-500); }
        .job-meta span { display: flex; align-items: center; gap: var(--space-1); }
        .amount { font-size: var(--text-2xl); font-weight: var(--font-bold); color: var(--primary-600); }
        
        .badge { padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; text-transform: uppercase; }
        .badge-info { background: #e0f2fe; color: #0284c7; }
        .badge-success { background: #dcfce7; color: #16a34a; }

        @media (max-width: 768px) { .job-card { flex-direction: column; align-items: flex-start; gap: var(--space-4); } }
      `}</style>
        </div>
    );
};

export default ActiveJobs;
