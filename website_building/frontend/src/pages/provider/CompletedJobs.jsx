import { Link } from 'react-router-dom';
import { Calendar, Star, DollarSign, Filter } from 'lucide-react';
import { useState } from 'react';

const CompletedJobs = () => {
    const jobs = [
        { id: 1, service: 'Home Cleaning', customer: 'Sarah M.', date: 'Jan 25, 2026', amount: 79, rating: 5 },
        { id: 2, service: 'Deep Cleaning', customer: 'Mike R.', date: 'Jan 22, 2026', amount: 99, rating: 5 },
        { id: 3, service: 'Office Cleaning', customer: 'Tech Co', date: 'Jan 20, 2026', amount: 149, rating: 4 },
        { id: 4, service: 'Home Cleaning', customer: 'Emily T.', date: 'Jan 18, 2026', amount: 79, rating: 5 },
        { id: 5, service: 'Move-out Cleaning', customer: 'John D.', date: 'Jan 15, 2026', amount: 129, rating: null },
    ];

    const totalEarnings = jobs.reduce((sum, j) => sum + j.amount, 0);

    return (
        <div className="completed-jobs-page">
            <div className="page-header">
                <div><h1>Completed Jobs</h1><p>Your job history</p></div>
                <div className="header-stats"><DollarSign size={20} /> Total: <strong>${totalEarnings}</strong></div>
            </div>

            <div className="jobs-list">
                {jobs.map(job => (
                    <Link key={job.id} to={`/provider/jobs/${job.id}`} className="card job-card">
                        <div className="job-info">
                            <h4>{job.service}</h4>
                            <p>{job.customer}</p>
                            <span className="job-date"><Calendar size={14} /> {job.date}</span>
                        </div>
                        <div className="job-stats">
                            {job.rating ? (
                                <div className="rating"><Star size={16} fill="#FBBF24" color="#FBBF24" /> {job.rating}.0</div>
                            ) : (
                                <span className="badge badge-gray">Not rated</span>
                            )}
                            <span className="amount">${job.amount}</span>
                        </div>
                    </Link>
                ))}
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
        .job-stats { text-align: right; }
        .rating { display: flex; align-items: center; gap: var(--space-1); font-weight: var(--font-semibold); margin-bottom: var(--space-1); }
        .amount { font-size: var(--text-xl); font-weight: var(--font-bold); color: var(--primary-600); }
        @media (max-width: 768px) { .page-header { flex-direction: column; gap: var(--space-4); align-items: flex-start; } }
      `}</style>
        </div>
    );
};

export default CompletedJobs;
