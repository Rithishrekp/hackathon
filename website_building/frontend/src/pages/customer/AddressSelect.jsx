import { Link } from 'react-router-dom';
import { MapPin, Plus, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const AddressSelect = () => {
    const [selectedAddress, setSelectedAddress] = useState(1);
    const [showAddNew, setShowAddNew] = useState(false);

    const addresses = [
        { id: 1, label: 'Home', address: '123 Main Street, Apt 4B', city: 'New York, NY 10001' },
        { id: 2, label: 'Office', address: '456 Business Ave, Floor 12', city: 'New York, NY 10002' },
    ];

    return (
        <div className="address-page">
            <div className="page-header"><h1>Select Address</h1><p>Where should we provide the service?</p></div>

            <div className="steps-indicator">
                <div className="step completed"><span>✓</span>Select Service</div>
                <div className="step completed"><span>✓</span>Schedule</div>
                <div className="step active"><span>3</span>Address</div>
                <div className="step"><span>4</span>Checkout</div>
            </div>

            <div className="addresses-list">
                {addresses.map(addr => (
                    <div key={addr.id} className={`card address-card ${selectedAddress === addr.id ? 'selected' : ''}`} onClick={() => setSelectedAddress(addr.id)}>
                        <div className="address-icon"><MapPin size={20} /></div>
                        <div className="address-info">
                            <h4>{addr.label}</h4>
                            <p>{addr.address}</p>
                            <p className="city">{addr.city}</p>
                        </div>
                        {selectedAddress === addr.id && <CheckCircle size={24} className="check-icon" />}
                    </div>
                ))}

                <button className="card add-address-btn" onClick={() => setShowAddNew(!showAddNew)}>
                    <Plus size={20} /> Add New Address
                </button>
            </div>

            {showAddNew && (
                <div className="card new-address-form">
                    <h3>Add New Address</h3>
                    <div className="form-group"><label className="form-label">Label</label><input type="text" className="form-input" placeholder="e.g., Home, Office" /></div>
                    <div className="form-group"><label className="form-label">Street Address</label><input type="text" className="form-input" placeholder="Street address" /></div>
                    <div className="form-row">
                        <div className="form-group"><label className="form-label">City</label><input type="text" className="form-input" placeholder="City" /></div>
                        <div className="form-group"><label className="form-label">ZIP Code</label><input type="text" className="form-input" placeholder="ZIP" /></div>
                    </div>
                    <button className="btn btn-primary">Save Address</button>
                </div>
            )}

            <div className="nav-buttons">
                <Link to="/customer/schedule" className="btn btn-secondary">Back</Link>
                <Link to="/customer/checkout" className="btn btn-primary">Continue</Link>
            </div>

            <style>{`
        .address-page { max-width: 700px; margin: 0 auto; }
        .page-header { margin-bottom: var(--space-6); }
        .page-header h1 { font-size: var(--text-2xl); margin-bottom: var(--space-1); }
        .page-header p { color: var(--gray-500); }
        .steps-indicator { display: flex; justify-content: space-between; margin-bottom: var(--space-8); padding: var(--space-4); background: white; border-radius: var(--radius-xl); box-shadow: var(--shadow-sm); }
        .step { display: flex; align-items: center; gap: var(--space-2); color: var(--gray-400); font-size: var(--text-sm); }
        .step span { width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; background: var(--gray-100); border-radius: 50%; font-weight: var(--font-semibold); }
        .step.active { color: var(--primary-600); }
        .step.active span { background: var(--primary-600); color: white; }
        .step.completed span { background: var(--success); color: white; }
        .addresses-list { display: flex; flex-direction: column; gap: var(--space-4); margin-bottom: var(--space-6); }
        .address-card { display: flex; align-items: center; gap: var(--space-4); cursor: pointer; border: 2px solid transparent; }
        .address-card.selected { border-color: var(--primary-600); }
        .address-icon { width: 48px; height: 48px; background: var(--gray-100); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; color: var(--gray-500); }
        .address-card.selected .address-icon { background: var(--primary-50); color: var(--primary-600); }
        .address-info { flex: 1; }
        .address-info h4 { font-size: var(--text-base); margin-bottom: var(--space-1); }
        .address-info p { font-size: var(--text-sm); color: var(--gray-600); }
        .address-info .city { color: var(--gray-400); }
        .check-icon { color: var(--primary-600); }
        .add-address-btn { display: flex; align-items: center; justify-content: center; gap: var(--space-2); color: var(--primary-600); border: 2px dashed var(--gray-300); cursor: pointer; }
        .add-address-btn:hover { border-color: var(--primary-400); background: var(--primary-50); }
        .new-address-form { margin-bottom: var(--space-6); }
        .new-address-form h3 { margin-bottom: var(--space-4); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); }
        .nav-buttons { display: flex; justify-content: space-between; margin-top: var(--space-8); }
      `}</style>
        </div>
    );
};

export default AddressSelect;
