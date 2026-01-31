import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, User } from 'lucide-react';

const ActiveJobs = () => {
    const jobs = [
        { id: 1, service: 'Home Cleaning', customer: 'Jane Doe', address: '123 Main St, NY', date: 'Jan 30', time: '10:00 AM', status: 'In Progress', amount: 79 },
        { id: 2, service: 'Deep Cleaning', customer: 'John Smith', address: '456 Oak Ave, NY', date: 'Jan 31', time: '2:00 PM', status: 'Scheduled', amount: 99 },
        { id: 3, service: 'Office Cleaning', customer: 'ABC Corp', address: '789 Business Blvd', date: 'Feb 1', time: '9:00 AM', status: 'Scheduled', amount: 149 },
    ];

    return (
        <div className="active-jobs-page">
            <div className="page-header"><h1>Active Jobs</h1><p>Your current and scheduled jobs</p></div>
            <div className="jobs-list">
                {jobs.map(job => (
                    <Link key={job.id} to={`/provider/jobs/${job.id}`} className="card job-card">
                        <div className="job-left">
                            <span className={`badge ${job.status === 'In Progress' ? 'badge-success' : 'badge-info'}`}>{job.status}</span>
                            <h3>{job.service}</h3>
                            <p><User size={14} /> {job.customer}</p>
                            <div className="job-meta">
                                <span><Calendar size={14} /> {job.date}</span>
                                <span><Clock size={14} /> {job.time}</span>
                                <span><MapPin size={14} /> {job.address}</span>
                            </div>
                        </div>
                        <div className="job-right"><span className="amount">${job.amount}</span></div>
                    </Link>
                ))}
            </div>
            <style>{`
        .active-jobs-page { max-width: 900px; margin: 0 auto; }
        .page-header { margin-bottom: var(--space-6); }
        .page-header h1 { font-size: var(--text-2xl); margin-bottom: var(--space-1); }
        .page-header p { color: var(--gray-500); }
        .jobs-list { display: flex; flex-direction: column; gap: var(--space-4); }
        .job-card { display: flex; justify-content: space-between; align-items: center; }
        .job-card:hover { border-color: var(--primary-300); }
        .job-left h3 { margin: var(--space-2) 0 var(--space-1); }
        .job-left > p { font-size: var(--text-sm); color: var(--gray-600); margin-bottom: var(--space-2); display: flex; align-items: center; gap: var(--space-1); }
        .job-meta { display: flex; flex-wrap: wrap; gap: var(--space-4); font-size: var(--text-sm); color: var(--gray-500); }
        .job-meta span { display: flex; align-items: center; gap: var(--space-1); }
        .amount { font-size: var(--text-2xl); font-weight: var(--font-bold); color: var(--primary-600); }
        @media (max-width: 768px) { .job-card { flex-direction: column; align-items: flex-start; gap: var(--space-4); } }
      `}</style>
        </div>
    );
};

export default ActiveJobs;
