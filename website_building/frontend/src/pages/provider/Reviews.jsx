import { useState, useEffect } from 'react';
import { Star, Calendar, MessageCircle } from 'lucide-react';
import { getBookings } from '../../api';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ average: 0, total: 0, breakdown: [] });
    const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});

    useEffect(() => {
        const fetchReviews = async () => {
            if (!user.id) return;
            try {
                const token = localStorage.getItem('token');
                const bookings = await getBookings(user.id, 'provider', token);

                // Filter only bookings with ratings
                const ratedBookings = bookings.filter(b => b.rating).map(b => ({
                    id: b.id,
                    customer: b.customer_name || 'Anonymous',
                    rating: b.rating,
                    date: new Date(b.booking_date).toLocaleDateString(),
                    comment: b.review || 'No comment provided',
                    service: b.service_name,
                    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop'
                }));

                setReviews(ratedBookings);

                // Calculate stats
                if (ratedBookings.length > 0) {
                    const total = ratedBookings.length;
                    const sum = ratedBookings.reduce((acc, curr) => acc + curr.rating, 0);
                    const average = (sum / total).toFixed(1);

                    const breakdown = [5, 4, 3, 2, 1].map(star => ({
                        stars: star,
                        count: ratedBookings.filter(b => b.rating === star).length
                    }));

                    setStats({ average, total, breakdown });
                }
            } catch (err) {
                console.error("Failed to fetch reviews", err);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, [user.id]);

    if (loading) return <div style={{ padding: 'var(--space-8)', textAlign: 'center' }}>Loading reviews...</div>;

    return (
        <div className="reviews-page">
            <div className="page-header"><h1>My Reviews</h1><p>See what customers say about your work</p></div>
            <div className="reviews-grid">
                <div className="card stats-card">
                    <div className="overall-rating">
                        <span className="big-rating">{stats.average}</span>
                        <div className="stars">{[...Array(5)].map((_, i) => <Star key={i} size={20} fill={i < Math.floor(stats.average) ? '#FBBF24' : '#E5E7EB'} color={i < Math.floor(stats.average) ? '#FBBF24' : '#E5E7EB'} />)}</div>
                        <p>{stats.total} reviews</p>
                    </div>
                    <div className="rating-breakdown">
                        {stats.breakdown.map(b => (
                            <div key={b.stars} className="breakdown-row">
                                <span>{b.stars} star</span>
                                <div className="bar"><div className="fill" style={{ width: `${(b.count / stats.total) * 100}%` }}></div></div>
                                <span>{b.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="reviews-list">
                    {reviews.length === 0 ? (
                        <div className="card" style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
                            <p>No reviews yet. Complete jobs and provide great service to earn ratings!</p>
                        </div>
                    ) : (
                        reviews.map(r => (
                            <div key={r.id} className="card review-card">
                                <div className="review-header">
                                    <img src={r.avatar} alt={r.customer} />
                                    <div>
                                        <h4>{r.customer}</h4>
                                        <span className="service">{r.service}</span>
                                    </div>
                                    <div className="review-meta">
                                        <div className="stars">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={14} fill={i < r.rating ? "#FBBF24" : "none"} color="#FBBF24" />
                                            ))}
                                        </div>
                                        <span><Calendar size={12} /> {r.date}</span>
                                    </div>
                                </div>
                                <p>{r.comment}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <style>{`
        .reviews-page { max-width: 1000px; margin: 0 auto; }
        .page-header { margin-bottom: var(--space-6); }
        .page-header h1 { font-size: var(--text-2xl); margin-bottom: var(--space-1); }
        .page-header p { color: var(--gray-500); }
        .reviews-grid { display: grid; grid-template-columns: 300px 1fr; gap: var(--space-6); }
        .stats-card { padding: var(--space-6); }
        .overall-rating { text-align: center; margin-bottom: var(--space-6); padding-bottom: var(--space-6); border-bottom: 1px solid var(--gray-100); }
        .big-rating { font-size: 3rem; font-weight: var(--font-bold); color: var(--gray-900); }
        .stars { display: flex; justify-content: center; gap: var(--space-1); margin: var(--space-2) 0; }
        .overall-rating p { color: var(--gray-500); }
        .rating-breakdown { display: flex; flex-direction: column; gap: var(--space-2); }
        .breakdown-row { display: flex; align-items: center; gap: var(--space-3); font-size: var(--text-sm); }
        .bar { flex: 1; height: 8px; background: var(--gray-100); border-radius: 4px; overflow: hidden; }
        .fill { height: 100%; background: var(--accent-yellow); }
        .reviews-list { display: flex; flex-direction: column; gap: var(--space-4); }
        .review-card { padding: var(--space-5); }
        .review-header { display: flex; gap: var(--space-3); margin-bottom: var(--space-3); }
        .review-header img { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; }
        .review-header h4 { margin-bottom: var(--space-1); }
        .review-header .service { font-size: var(--text-xs); color: var(--gray-500); }
        .review-meta { margin-left: auto; text-align: right; }
        .review-meta span { display: flex; align-items: center; gap: var(--space-1); font-size: var(--text-xs); color: var(--gray-400); margin-top: var(--space-1); }
        .review-card p { margin-bottom: var(--space-3); line-height: 1.6; }
        @media (max-width: 768px) { .reviews-grid { grid-template-columns: 1fr; } }
      `}</style>
        </div>
    );
};

export default Reviews;
