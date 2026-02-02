import { Link, useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Phone, Mail, DollarSign, ArrowLeft, Check, X, MessageCircle, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getBookingById, updateBookingStatus } from '../../api';

const JobDetails = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('You need to be logged in to view job details.');
                    return;
                }
                // If jobId is not a number, it might be a testing ID or error
                if (isNaN(jobId)) {
                    // Fallback or error, but let's try fetching anyway or handle gracefully
                    // setError('Invalid Job ID'); 
                    // return;
                }
                const data = await getBookingById(jobId, token);
                setJob(data);
            } catch (err) {
                console.error("Failed to fetch job", err);
                setError(err.message || 'Failed to load job details');
            } finally {
                setLoading(false);
            }
        };

        if (jobId) {
            fetchJobDetails();
        }
    }, [jobId]);

    const handleAction = async (status) => {
        if (!confirm(`Are you sure you want to ${status} this job?`)) return;

        setActionLoading(true);
        try {
            const token = localStorage.getItem('token');
            const updatedJob = await updateBookingStatus(jobId, status, token);
            setJob(prev => ({ ...prev, status: updatedJob.status }));
            alert(`Job ${status} successfully!`);
        } catch (err) {
            console.error(`Failed to ${status} job`, err);
            alert(`Failed to ${status} job: ${err.message}`);
        } finally {
            setActionLoading(false);
        }
    };

    const handleMessage = () => {
        if (job?.customer_email) {
            window.location.href = `mailto:${job.customer_email}?subject=Regarding Service Request: ${job.service_name}`;
        } else {
            alert('Customer email not available.');
        }
    };

    if (loading) return <div className="job-details-page" style={{ padding: '2rem', textAlign: 'center' }}>Loading job details...</div>;
    if (error) return <div className="job-details-page" style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>Error: {error}</div>;
    if (!job) return <div className="job-details-page" style={{ padding: '2rem', textAlign: 'center' }}>Job not found</div>;

    // Format Date and Time safely
    const formatDate = (dateString) => {
        if (!dateString) return 'Date not set';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return 'Invalid Date';
            return date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        } catch (e) {
            return 'Date Error';
        }
    };

    const jobDate = formatDate(job.booking_date);
    const jobTime = job.booking_time || '10:00 AM - 2:00 PM';

    return (
        <div className="job-details-page">
            <Link to="/provider/dashboard" className="back-link"><ArrowLeft size={18} /> Back to Dashboard</Link>

            <div className="details-header">
                <div>
                    <h1>Job #{job.id}</h1>
                    <span className={`badge ${job.status === 'pending' ? 'badge-warning' : job.status === 'confirmed' ? 'badge-success' : 'badge-secondary'}`}>
                        {job.status}
                    </span>
                </div>
                {job.status === 'pending' && (
                    <div className="header-actions">
                        <button
                            onClick={() => handleAction('cancelled')}
                            disabled={actionLoading}
                            className="btn btn-outline"
                            style={{ color: 'var(--error)', borderColor: 'var(--error)' }}
                        >
                            <X size={18} /> Decline
                        </button>
                        <button
                            onClick={() => handleAction('confirmed')}
                            disabled={actionLoading}
                            className="btn btn-primary"
                        >
                            <Check size={18} /> Accept Job
                        </button>
                    </div>
                )}
                {job.status === 'confirmed' && (
                    <div className="header-actions">
                        <button
                            onClick={() => handleAction('in_progress_done')}
                            disabled={actionLoading}
                            className="btn btn-primary"
                            style={{ background: 'var(--accent-orange)', borderColor: 'var(--accent-orange)' }}
                        >
                            <CheckCircle size={18} /> Mark as Done
                        </button>
                    </div>
                )}
            </div>

            <div className="details-grid">
                <div className="main-content">
                    <div className="card">
                        <h3>Job Details</h3>
                        <div className="detail-row"><span>Service</span><strong>{job.service_name}</strong></div>
                        <div className="detail-row"><Calendar size={16} /><span>{jobDate}</span></div>
                        <div className="detail-row"><Clock size={16} /><span>{jobTime}</span></div>
                        <div className="detail-row"><MapPin size={16} /><span>{job.address || 'Address provided upon acceptance'}</span></div>
                        <div className="detail-row"><DollarSign size={16} /><strong className="amount">${job.price}</strong></div>
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
                            <img
                                src={job.customer_avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(job.customer_name || 'Customer') + '&background=random'}
                                alt={job.customer_name}
                            />
                            <div>
                                <h4>{job.customer_name || 'Customer Name'}</h4>
                                <p style={{ fontSize: '12px', color: '#666' }}>Member since 2024</p>
                            </div>
                        </div>
                        <div className="contact-info">
                            <div className="contact-item"><Phone size={16} /> {job.customer_phone || 'Phone hidden'}</div>
                            <div className="contact-item"><Mail size={16} /> {job.customer_email || 'Email hidden'}</div>
                        </div>
                        <button
                            onClick={handleMessage}
                            className="btn btn-secondary"
                            style={{ width: '100%', marginTop: 'var(--space-4)' }}
                        >
                            <MessageCircle size={18} /> Message Customer
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
        .job-details-page { max-width: 1000px; margin: 0 auto; padding: var(--space-6); }
        .back-link { display: inline-flex; align-items: center; gap: var(--space-2); color: var(--gray-600); margin-bottom: var(--space-6); text-decoration: none; }
        .back-link:hover { color: var(--primary-600); }
        .details-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-6); flex-wrap: wrap; gap: var(--space-4); }
        .details-header h1 { display: inline; margin-right: var(--space-3); font-size: var(--text-2xl); }
        .header-actions { display: flex; gap: var(--space-3); }
        .details-grid { display: grid; grid-template-columns: 1fr 350px; gap: var(--space-6); }
        .main-content { display: flex; flex-direction: column; gap: var(--space-6); }
        .main-content h3 { margin-bottom: var(--space-4); font-size: var(--text-lg); }
        .detail-row { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3) 0; border-bottom: 1px solid var(--gray-100); color: var(--gray-600); }
        .detail-row:last-child { border-bottom: none; }
        .detail-row strong { margin-left: auto; color: var(--gray-900); }
        .detail-row .amount { color: var(--primary-600); font-size: var(--text-xl); }
        .sidebar-content h3 { margin-bottom: var(--space-4); font-size: var(--text-lg); }
        .customer-info { display: flex; gap: var(--space-4); margin-bottom: var(--space-4); align-items: center; }
        .customer-info img { width: 56px; height: 56px; border-radius: var(--radius-lg); object-fit: cover; }
        .customer-info h4 { margin: 0; font-size: var(--text-base); }
        .contact-info { display: flex; flex-direction: column; gap: var(--space-3); }
        .contact-item { display: flex; align-items: center; gap: var(--space-3); font-size: var(--text-sm); color: var(--gray-600); }
        .badge { padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; text-transform: uppercase; }
        .badge-warning { background: #fffbeb; color: #d97706; }
        .badge-success { background: #dcfce7; color: #16a34a; }
        .badge-secondary { background: #f3f4f6; color: #4b5563; }
        @media (max-width: 1024px) { .details-grid { grid-template-columns: 1fr; } }
        @media (max-width: 768px) { .details-header { flex-direction: column; align-items: flex-start; } .header-actions { width: 100%; justify-content: space-between; } }
      `}</style>
        </div>
    );
};

export default JobDetails;
