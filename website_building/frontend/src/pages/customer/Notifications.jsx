import { Bell, CheckCircle, Calendar, Star, CreditCard, AlertCircle } from 'lucide-react';

const Notifications = () => {
    const notifications = [
        { id: 1, type: 'booking', icon: Calendar, title: 'Booking Confirmed', message: 'Your Home Cleaning is scheduled for Jan 30 at 10:00 AM', time: '2 hours ago', read: false },
        { id: 2, type: 'payment', icon: CreditCard, title: 'Payment Successful', message: 'Payment of $84 for Home Cleaning was successful', time: '2 hours ago', read: false },
        { id: 3, type: 'reminder', icon: Bell, title: 'Service Reminder', message: 'Your AC Service is scheduled for tomorrow at 2:00 PM', time: '1 day ago', read: true },
        { id: 4, type: 'review', icon: Star, title: 'Leave a Review', message: 'How was your Plumbing service? Share your experience!', time: '3 days ago', read: true },
        { id: 5, type: 'completed', icon: CheckCircle, title: 'Service Completed', message: 'Your Electrical repair has been completed', time: '1 week ago', read: true },
    ];

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="notifications-page">
            <div className="page-header">
                <div><h1>Notifications</h1><p>{unreadCount} unread notifications</p></div>
                <button className="btn btn-ghost">Mark all as read</button>
            </div>

            <div className="notifications-list">
                {notifications.map(notif => (
                    <div key={notif.id} className={`notification-item ${notif.read ? 'read' : 'unread'}`}>
                        <div className="notif-icon"><notif.icon size={20} /></div>
                        <div className="notif-content">
                            <h4>{notif.title}</h4>
                            <p>{notif.message}</p>
                            <span className="notif-time">{notif.time}</span>
                        </div>
                        {!notif.read && <div className="unread-dot"></div>}
                    </div>
                ))}
            </div>

            <style>{`
        .notifications-page { max-width: 700px; margin: 0 auto; }
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-6); }
        .page-header h1 { font-size: var(--text-2xl); margin-bottom: var(--space-1); }
        .page-header p { color: var(--gray-500); }
        .notifications-list { display: flex; flex-direction: column; gap: var(--space-3); }
        .notification-item { display: flex; gap: var(--space-4); padding: var(--space-4); background: white; border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); position: relative; }
        .notification-item.unread { background: var(--primary-50); border-left: 3px solid var(--primary-600); }
        .notif-icon { width: 40px; height: 40px; background: var(--gray-100); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; color: var(--primary-600); flex-shrink: 0; }
        .notification-item.unread .notif-icon { background: var(--primary-100); }
        .notif-content { flex: 1; }
        .notif-content h4 { font-size: var(--text-base); margin-bottom: var(--space-1); }
        .notif-content p { font-size: var(--text-sm); color: var(--gray-600); margin-bottom: var(--space-2); }
        .notif-time { font-size: var(--text-xs); color: var(--gray-400); }
        .unread-dot { width: 8px; height: 8px; background: var(--primary-600); border-radius: 50%; position: absolute; top: var(--space-4); right: var(--space-4); }
      `}</style>
        </div>
    );
};

export default Notifications;
