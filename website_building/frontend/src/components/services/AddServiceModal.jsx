import React, { useState } from 'react';
import { X, Loader } from 'lucide-react';
import { createService } from '../../api';

const AddServiceModal = ({ isOpen, onClose, onServiceAdded, user }) => {
    const [formData, setFormData] = useState({
        title: '',
        category: 'Home Cleaning',
        price: '',
        description: '',
        imageUrl: '' // Optional for now
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const categories = [
        'Home Cleaning',
        'Plumbing',
        'Electrical',
        'Gardening',
        'Moving Service',
        'Painting',
        'General Repair'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            const serviceData = {
                ...formData,
                price: parseFloat(formData.price),
                providerId: user.id
            };

            await createService(serviceData, token || user.token);
            setFormData({
                title: '',
                category: 'Home Cleaning',
                price: '',
                description: '',
                imageUrl: ''
            }); // Reset form
            onServiceAdded(); // Refresh parent
            onClose(); // Close modal
        } catch (err) {
            console.error(err);
            setError(err.message || 'Failed to add service');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 'var(--z-modal)',
            padding: 'var(--space-4)'
        }}>
            <div className="card" style={{
                width: '100%',
                maxWidth: '500px',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: 'var(--space-4)',
                        right: 'var(--space-4)',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--gray-500)'
                    }}
                >
                    <X size={24} />
                </button>

                <div className="card-header" style={{ borderBottom: 'none', paddingBottom: 0 }}>
                    <h3 className="card-title">Add New Service</h3>
                </div>

                <form onSubmit={handleSubmit} style={{ marginTop: 'var(--space-4)' }}>
                    {error && (
                        <div style={{
                            padding: 'var(--space-3)',
                            background: 'var(--error-light)',
                            color: 'var(--error)',
                            borderRadius: 'var(--radius-md)',
                            marginBottom: 'var(--space-4)'
                        }}>
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label">Service Title</label>
                        <input
                            type="text"
                            name="title"
                            className="form-input"
                            placeholder="e.g., Deep Kitchen Clean"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Category</label>
                        <div className="form-select-wrapper">
                            <select
                                name="category"
                                className="form-input form-select"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Price ($)</label>
                        <input
                            type="number"
                            name="price"
                            className="form-input"
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea
                            name="description"
                            className="form-input form-textarea"
                            placeholder="Describe what's included in this service..."
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end', marginTop: 'var(--space-6)' }}>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader size={18} className="spin-animation" />
                                    Creating...
                                </>
                            ) : 'Create Service'}
                        </button>
                    </div>
                </form>
            </div>
            <style>{`
                .spin-animation {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default AddServiceModal;
