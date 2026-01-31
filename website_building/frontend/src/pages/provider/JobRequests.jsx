import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, DollarSign, Check, X } from 'lucide-react';

const JobRequests = () => {
    const requests = [
        { id: 1, service: 'Home Cleaning', customer: 'Jane Doe', address: '123 Main St, NY', date: 'Jan 30', time: '10:00 AM', amount: 79 },
        { id: 2, service: 'Deep Cleaning', customer: 'John Smith', address: '456 Oak Ave, NY', date: 'Jan 31', time: '2:00 PM', amount: 99 },
        { id: 3, service: 'Office Cleaning', customer: 'ABC Corp', address: '789 Business Blvd, NY', date: 'Feb 1', time: '9:00 AM', amount: 149 },
    ];

    return (
        <div className="job-requests-page">
            <div className="page-header"><h1>Job Requests</h1><p>Review and accept new job requests</p></div>

            <div className="requests-list">
                {requests.map(req => (
                    <div key={req.id} className="card request-card">
                        <div className="request-main">
                            <div className="request-info">
                                <h3>{req.service}</h3>
                                <p className="customer">{req.customer}</p>
                                <div className="request-meta">
                                    <span><Calendar size={14} /> {req.date}</span>
                                    <span><Clock size={14} /> {req.time}</span>
                                    <span><MapPin size={14} /> {req.address}</span>
                                </div>
                            </div>
                            <div className="request-amount"><DollarSign size={16} />{req.amount}</div>
                        </div>
                        <div className="request-actions">
                            <Link to={`/provider/jobs/${req.id}`} className="btn btn-ghost btn-sm">View Details</Link>
                            <button className="btn btn-outline btn-sm" style={{ color: 'var(--error)', borderColor: 'var(--error)' }}><X size={16} /> Decline</button>
                            <button className="btn btn-primary btn-sm"><Check size={16} /> Accept</button>
                        </div>
                    </div>
                ))}
                {requests.length === 0 && <div className="empty-state"><p>No pending requests</p></div>}
            </div>

            <style>{`
        .job-requests-page { max-width: 900px; margin: 0 auto; }
        .page-header { margin-bottom: var(--space-6); }
        .page-header h1 { font-size: var(--text-2xl); margin-bottom: var(--space-1); }
        .page-header p { color: var(--gray-500); }
        .requests-list { display: flex; flex-direction: column; gap: var(--space-4); }
        .request-card { border-left: 4px solid var(--accent-orange); }
        .request-main { display: flex; justify-content: space-between; margin-bottom: var(--space-4); }
        .request-info h3 { font-size: var(--text-lg); margin-bottom: var(--space-1); }
        .request-info .customer { color: var(--gray-600); margin-bottom: var(--space-2); }
        .request-meta { display: flex; flex-wrap: wrap; gap: var(--space-4); font-size: var(--text-sm); color: var(--gray-500); }
        .request-meta span { display: flex; align-items: center; gap: var(--space-1); }
        .request-amount { display: flex; align-items: center; font-size: var(--text-2xl); font-weight: var(--font-bold); color: var(--primary-600); }
        .request-actions { display: flex; gap: var(--space-3); justify-content: flex-end; padding-top: var(--space-4); border-top: 1px solid var(--gray-100); }
        .empty-state { text-align: center; padding: var(--space-12); color: var(--gray-500); }
        @media (max-width: 768px) { .request-main { flex-direction: column; gap: var(--space-3); } .request-actions { flex-wrap: wrap; } }
      `}</style>
        </div>
    );
};

export default JobRequests;
