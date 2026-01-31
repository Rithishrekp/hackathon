import { User, Mail, Phone, Camera } from 'lucide-react';
import { useState, useEffect } from 'react';

const Profile = () => {
    const [user, setUser] = useState({ name: '', email: '', phone: '', avatar: null });

    useEffect(() => {
        // Get user data from localStorage
        const userData = JSON.parse(localStorage.getItem('user')) || {};
        setUser({
            name: userData.name || 'User',
            email: userData.email || '',
            phone: userData.phone || '',
            avatar: null
        });
    }, []);

    return (
        <div className="profile-page">
            <div className="page-header"><h1>My Profile</h1><p>Manage your account information</p></div>

            <div className="profile-content">
                <div className="card avatar-section">
                    <div className="avatar-wrapper">
                        <div className="avatar avatar-xl">{user.avatar ? <img src={user.avatar} alt={user.name} /> : user.name.charAt(0)}</div>
                        <button className="avatar-edit"><Camera size={16} /></button>
                    </div>
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                </div>

                <div className="card form-section">
                    <h3>Personal Information</h3>
                    <form>
                        <div className="form-row">
                            <div className="form-group"><label className="form-label">Full Name</label><input type="text" className="form-input" defaultValue={user.name} /></div>
                            <div className="form-group"><label className="form-label">Email Address</label><input type="email" className="form-input" defaultValue={user.email} /></div>
                        </div>
                        <div className="form-group"><label className="form-label">Phone Number</label><input type="tel" className="form-input" defaultValue={user.phone} placeholder="+91 XXXXX XXXXX" /></div>
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                    </form>
                </div>

                <div className="card form-section">
                    <h3>Change Password</h3>
                    <form>
                        <div className="form-group"><label className="form-label">Current Password</label><input type="password" className="form-input" placeholder="Enter current password" /></div>
                        <div className="form-group"><label className="form-label">New Password</label><input type="password" className="form-input" placeholder="Enter new password" /></div>
                        <div className="form-group"><label className="form-label">Confirm Password</label><input type="password" className="form-input" placeholder="Confirm new password" /></div>
                        <button type="submit" className="btn btn-secondary">Update Password</button>
                    </form>
                </div>
            </div>

            <style>{`
        .profile-page { max-width: 800px; margin: 0 auto; }
        .page-header { margin-bottom: var(--space-6); }
        .page-header h1 { font-size: var(--text-2xl); margin-bottom: var(--space-1); }
        .page-header p { color: var(--gray-500); }
        .profile-content { display: flex; flex-direction: column; gap: var(--space-6); }
        .avatar-section { text-align: center; padding: var(--space-8); }
        .avatar-wrapper { position: relative; display: inline-block; margin-bottom: var(--space-4); }
        .avatar-edit { position: absolute; bottom: 0; right: 0; width: 32px; height: 32px; background: var(--primary-600); color: white; border: 3px solid white; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .avatar-section h3 { margin-bottom: var(--space-1); }
        .avatar-section p { color: var(--gray-500); }
        .form-section h3 { margin-bottom: var(--space-5); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); }
        @media (max-width: 768px) { .form-row { grid-template-columns: 1fr; } }
      `}</style>
        </div>
    );
};

export default Profile;
