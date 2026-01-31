import { MapPin, Plus, Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';

const SavedAddresses = () => {
    const [addresses] = useState([
        { id: 1, label: 'Home', address: '123 Main Street, Apt 4B', city: 'New York', zip: 'NY 10001', isDefault: true },
        { id: 2, label: 'Office', address: '456 Business Ave, Floor 12', city: 'New York', zip: 'NY 10002', isDefault: false },
    ]);

    return (
        <div className="addresses-page">
            <div className="page-header">
                <div><h1>Saved Addresses</h1><p>Manage your delivery addresses</p></div>
                <button className="btn btn-primary"><Plus size={18} /> Add New</button>
            </div>

            <div className="addresses-grid">
                {addresses.map(addr => (
                    <div key={addr.id} className="card address-card">
                        <div className="address-header">
                            <div className="address-icon"><MapPin size={20} /></div>
                            <div className="address-label">
                                <h4>{addr.label}</h4>
                                {addr.isDefault && <span className="badge badge-primary">Default</span>}
                            </div>
                            <div className="address-actions">
                                <button className="btn btn-ghost btn-icon btn-sm"><Edit2 size={16} /></button>
                                <button className="btn btn-ghost btn-icon btn-sm"><Trash2 size={16} /></button>
                            </div>
                        </div>
                        <p>{addr.address}</p>
                        <p className="text-gray">{addr.city}, {addr.zip}</p>
                        {!addr.isDefault && <button className="btn btn-ghost btn-sm" style={{ marginTop: 'var(--space-3)' }}>Set as Default</button>}
                    </div>
                ))}
            </div>

            <style>{`
        .addresses-page { max-width: 900px; margin: 0 auto; }
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-6); }
        .page-header h1 { font-size: var(--text-2xl); margin-bottom: var(--space-1); }
        .page-header p { color: var(--gray-500); }
        .addresses-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-6); }
        .address-card { position: relative; }
        .address-header { display: flex; align-items: flex-start; gap: var(--space-3); margin-bottom: var(--space-3); }
        .address-icon { width: 40px; height: 40px; background: var(--primary-50); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; color: var(--primary-600); }
        .address-label { flex: 1; }
        .address-label h4 { display: inline; margin-right: var(--space-2); }
        .address-actions { display: flex; gap: var(--space-1); }
        .address-card p { font-size: var(--text-sm); color: var(--gray-600); margin-bottom: var(--space-1); }
        @media (max-width: 768px) { .addresses-grid { grid-template-columns: 1fr; } .page-header { flex-direction: column; gap: var(--space-4); align-items: flex-start; } }
      `}</style>
        </div>
    );
};

export default SavedAddresses;
