import { User, Camera, Mail, Phone, MapPin, Star, Briefcase } from 'lucide-react';

const ProviderProfile = () => {
    const user = { name: 'John Provider', email: 'john.provider@email.com', phone: '+1 234-567-8901', address: 'New York, NY', rating: 4.9, jobs: 45, avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop' };

    return (
        <div className="profile-page">
            <div className="page-header"><h1>My Profile</h1><p>Manage your professional information</p></div>
            <div className="profile-grid">
                <div className="card profile-card">
                    <div className="avatar-section">
                        <div className="avatar-wrapper">
                            <img src={user.avatar} alt={user.name} className="avatar avatar-xl" />
                            <button className="avatar-edit"><Camera size={16} /></button>
                        </div>
                        <h3>{user.name}</h3>
                        <p>Professional Cleaner</p>
                        <div className="profile-stats">
                            <div><Star size={16} fill="#FBBF24" color="#FBBF24" /> <strong>{user.rating}</strong> Rating</div>
                            <div><Briefcase size={16} /> <strong>{user.jobs}</strong> Jobs</div>
                        </div>
                    </div>
                </div>
                <div className="card form-section">
                    <h3>Personal Information</h3>
                    <form>
                        <div className="form-row">
                            <div className="form-group"><label className="form-label">First Name</label><input type="text" className="form-input" defaultValue="John" /></div>
                            <div className="form-group"><label className="form-label">Last Name</label><input type="text" className="form-input" defaultValue="Provider" /></div>
                        </div>
                        <div className="form-group"><label className="form-label">Email</label><input type="email" className="form-input" defaultValue={user.email} /></div>
                        <div className="form-group"><label className="form-label">Phone</label><input type="tel" className="form-input" defaultValue={user.phone} /></div>
                        <div className="form-group"><label className="form-label">Bio</label><textarea className="form-input form-textarea" defaultValue="Professional cleaner with 5+ years of experience..." rows="3"></textarea></div>
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                    </form>
                </div>
            </div>
            <style>{`
        .profile-page { max-width: 900px; margin: 0 auto; }
        .page-header { margin-bottom: var(--space-6); }
        .page-header h1 { font-size: var(--text-2xl); margin-bottom: var(--space-1); }
        .page-header p { color: var(--gray-500); }
        .profile-grid { display: grid; grid-template-columns: 300px 1fr; gap: var(--space-6); }
        .profile-card { text-align: center; }
        .avatar-section { padding: var(--space-6); }
        .avatar-wrapper { position: relative; display: inline-block; margin-bottom: var(--space-4); }
        .avatar-wrapper img { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; }
        .avatar-edit { position: absolute; bottom: 0; right: 0; width: 32px; height: 32px; background: var(--primary-600); color: white; border: 3px solid white; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .avatar-section h3 { margin-bottom: var(--space-1); }
        .avatar-section > p { color: var(--gray-500); margin-bottom: var(--space-4); }
        .profile-stats { display: flex; justify-content: center; gap: var(--space-6); font-size: var(--text-sm); color: var(--gray-600); }
        .profile-stats div { display: flex; align-items: center; gap: var(--space-1); }
        .form-section h3 { margin-bottom: var(--space-5); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); }
        @media (max-width: 768px) { .profile-grid { grid-template-columns: 1fr; } .form-row { grid-template-columns: 1fr; } }
      `}</style>
        </div>
    );
};

export default ProviderProfile;
