import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, MapPin, User, Phone, Mail, DollarSign, ArrowLeft, Check, X, MessageCircle } from 'lucide-react';

const JobDetails = () => {
    const { jobId } = useParams();
    const job = {
        id: jobId || 'JOB123',
        service: 'Home Cleaning',
        status: 'pending',
        customer: { name: 'Jane Doe', phone: '+1 234-567-8901', email: 'jane@example.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
        date: 'January 30, 2026',
        time: '10:00 AM - 2:00 PM',
        address: '123 Main Street, Apt 4B, New York, NY 10001',
        amount: 79,
        notes: 'Please focus on kitchen and bathrooms. I have two cats.',
    };

    return (
        <div className="job-details-page">
            <Link to="/provider/job-requests" className="back-link"><ArrowLeft size={18} /> Back to Requests</Link>
            <div className="details-header">
                <div><h1>Job #{job.id}</h1><span className={`badge ${job.status === 'pending' ? 'badge-warning' : 'badge-info'}`}>{job.status}</span></div>
                {job.status === 'pending' && (
                    <div className="header-actions">
                        <button className="btn btn-outline" style={{ color: 'var(--error)', borderColor: 'var(--error)' }}><X size={18} /> Decline</button>
                        <button className="btn btn-primary"><Check size={18} /> Accept Job</button>
                    </div>
                )}
            </div>

            <div className="details-grid">
                <div className="main-content">
                    <div className="card">
                        <h3>Job Details</h3>
                        <div className="detail-row"><span>Service</span><strong>{job.service}</strong></div>
                        <div className="detail-row"><Calendar size={16} /><span>{job.date}</span></div>
                        <div className="detail-row"><Clock size={16} /><span>{job.time}</span></div>
                        <div className="detail-row"><MapPin size={16} /><span>{job.address}</span></div>
                        <div className="detail-row"><DollarSign size={16} /><strong className="amount">${job.amount}</strong></div>
                    </div>
                    {job.notes && (
                        <div className="card">
                            <h3>Customer Notes</h3>
                            <p>{job.notes}</p>
                        </div>
                    )}
                </div>
                <div className="sidebar-content">
                    <div className="card">
                        <h3>Customer</h3>
                        <div className="customer-info">
                            <img src={job.customer.avatar} alt={job.customer.name} />
                            <div><h4>{job.customer.name}</h4></div>
                        </div>
                        <div className="contact-info">
                            <div className="contact-item"><Phone size={16} /> {job.customer.phone}</div>
                            <div className="contact-item"><Mail size={16} /> {job.customer.email}</div>
                        </div>
                        <button className="btn btn-secondary" style={{ width: '100%', marginTop: 'var(--space-4)' }}><MessageCircle size={18} /> Message Customer</button>
                    </div>
                </div>
            </div>

            <style>{`
        .job-details-page { max-width: 1000px; margin: 0 auto; }
        .back-link { display: inline-flex; align-items: center; gap: var(--space-2); color: var(--gray-600); margin-bottom: var(--space-6); }
        .details-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-6); }
        .details-header h1 { display: inline; margin-right: var(--space-3); font-size: var(--text-2xl); }
        .header-actions { display: flex; gap: var(--space-3); }
        .details-grid { display: grid; grid-template-columns: 1fr 350px; gap: var(--space-6); }
        .main-content { display: flex; flex-direction: column; gap: var(--space-6); }
        .main-content h3 { margin-bottom: var(--space-4); }
        .detail-row { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3) 0; border-bottom: 1px solid var(--gray-100); color: var(--gray-600); }
        .detail-row:last-child { border-bottom: none; }
        .detail-row strong { margin-left: auto; color: var(--gray-900); }
        .detail-row .amount { color: var(--primary-600); font-size: var(--text-xl); }
        .sidebar-content h3 { margin-bottom: var(--space-4); }
        .customer-info { display: flex; gap: var(--space-4); margin-bottom: var(--space-4); }
        .customer-info img { width: 56px; height: 56px; border-radius: var(--radius-lg); object-fit: cover; }
        .customer-info h4 { margin-top: var(--space-2); }
        .contact-info { display: flex; flex-direction: column; gap: var(--space-2); }
        .contact-item { display: flex; align-items: center; gap: var(--space-2); font-size: var(--text-sm); color: var(--gray-600); }
        @media (max-width: 1024px) { .details-grid { grid-template-columns: 1fr; } }
      `}</style>
        </div>
    );
};

export default JobDetails;
