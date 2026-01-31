import { Plus, Edit2, Trash2, DollarSign, Clock, X, Image as ImageIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

import { getAllServices, createService } from '../../api';

const ServiceManagement = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const user = JSON.parse(localStorage.getItem('user')) || {};

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: 'Cleaning',
        imageUrl: ''
    });

    useEffect(() => {
        fetchProviderServices();
    }, []);

    const fetchProviderServices = async () => {
        try {
            const allServices = await getAllServices();
            // Filter services created by this provider
            const providerServices = allServices.filter(s => s.provider_id === user.id);
            setServices(providerServices);
        } catch (error) {
            console.error('Failed to fetch services:', error);
            setError('Failed to load services');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            const serviceData = {
                title: formData.title,
                description: formData.description,
                price: parseFloat(formData.price),
                category: formData.category,
                imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400',
                providerId: user.id
            };

            const newService = await createService(serviceData, token);

            // Add new service to the list
            setServices(prev => [newService, ...prev]);

            // Reset form and close modal
            setFormData({
                title: '',
                description: '',
                price: '',
                category: 'Cleaning',
                imageUrl: ''
            });
            setShowModal(false);
            alert('Service created successfully!');
        } catch (err) {
            setError(err.message || 'Failed to create service');
        } finally {
            setSubmitting(false);
        }
    };

    const categories = ['Cleaning', 'Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Gardening', 'Other'];

    const Modal = () => (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Create New Service</h2>
                    <button className="btn-close" onClick={() => setShowModal(false)}>
                        <X size={20} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Service Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="e.g., Home Deep Cleaning"
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Describe your service..."
                            className="form-input"
                            rows="3"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Price (₹) *</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                placeholder="500"
                                className="form-input"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Category *</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="form-input"
                                required
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Image URL (optional)</label>
                        <input
                            type="url"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleInputChange}
                            placeholder="https://example.com/image.jpg"
                            className="form-input"
                        />
                        <small style={{ color: 'var(--gray-500)', fontSize: 'var(--text-sm)' }}>
                            Leave blank for default image
                        </small>
                    </div>

                    <div className="modal-actions">
                        <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={() => setShowModal(false)}
                            disabled={submitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={submitting}
                        >
                            {submitting ? 'Creating...' : 'Create Service'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    return (
        <div className="services-page">
            <div className="page-header">
                <div>
                    <h1>My Services</h1>
                    <p>Manage the services you offer</p>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowModal(true)}
                >
                    <Plus size={18} /> Add Service
                </button>
            </div>

            {error && (
                <div className="error-message" style={{
                    color: 'red',
                    padding: '1rem',
                    background: '#fee',
                    borderRadius: '8px',
                    marginBottom: '1rem'
                }}>
                    {error}
                </div>
            )}

            {loading ? (
                <div className="loading-state">Loading your services...</div>
            ) : services.length === 0 ? (
                <div className="empty-state card">
                    <h3>No services yet</h3>
                    <p>Create your first service to start receiving bookings</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowModal(true)}
                    >
                        <Plus size={18} /> Create Service
                    </button>
                </div>
            ) : (
                <div className="services-list">
                    {services.map(s => (
                        <div key={s.id} className="card service-card">
                            <div className="service-header">
                                <img src={s.image_url} alt={s.title} className="service-thumbnail" />
                                <div className="service-main">
                                    <div>
                                        <h4>{s.title}</h4>
                                        <span className="service-category">{s.category}</span>
                                        <p className="service-description">{s.description}</p>
                                        <div className="service-meta">
                                            <span><DollarSign size={14} /> ₹{s.price}</span>
                                        </div>
                                    </div>
                                    <span className="badge badge-success">Active</span>
                                </div>
                            </div>
                            <div className="service-actions">
                                <button className="btn btn-ghost btn-sm"><Edit2 size={16} /> Edit</button>
                                <button className="btn btn-ghost btn-sm" style={{ color: 'var(--error)' }}>
                                    <Trash2 size={16} /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Render Modal directly with High Z-Index */}
            {showModal && <Modal />}

            <style>{`
                .services-page { max-width: 900px; margin: 0 auto; position: relative; }
                .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-6); }
                .page-header h1 { font-size: var(--text-2xl); margin-bottom: var(--space-1); }
                .page-header p { color: var(--gray-500); }
                
                .loading-state { text-align: center; padding: var(--space-8); color: var(--gray-500); }
                
                .empty-state { text-align: center; padding: var(--space-8); }
                .empty-state h3 { margin-bottom: var(--space-2); }
                .empty-state p { color: var(--gray-500); margin-bottom: var(--space-4); }
                
                .services-list { display: flex; flex-direction: column; gap: var(--space-4); }
                .service-card { padding: var(--space-4); }
                
                .service-header { display: flex; gap: var(--space-4); margin-bottom: var(--space-4); }
                .service-thumbnail { width: 100px; height: 100px; object-fit: cover; border-radius: var(--radius-lg); }
                .service-main { flex: 1; display: flex; justify-content: space-between; align-items: flex-start; }
                .service-main h4 { margin-bottom: var(--space-2); font-size: var(--text-lg); }
                .service-category { 
                    display: inline-block;
                    font-size: var(--text-xs);
                    background: var(--primary-100);
                    color: var(--primary-700);
                    padding: var(--space-1) var(--space-2);
                    border-radius: var(--radius-sm);
                    margin-bottom: var(--space-2);
                }
                .service-description { 
                    font-size: var(--text-sm); 
                    color: var(--gray-600); 
                    margin-bottom: var(--space-2);
                    line-height: 1.5;
                }
                .service-meta { display: flex; gap: var(--space-4); font-size: var(--text-sm); color: var(--gray-500); }
                .service-meta span { display: flex; align-items: center; gap: var(--space-1); font-weight: var(--font-semibold); }
                .service-actions { display: flex; gap: var(--space-2); padding-top: var(--space-3); border-top: 1px solid var(--gray-100); }
                
                /* Modal Styles */
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 99999;
                    padding: var(--space-4);
                    backdrop-filter: blur(4px);
                }
                .modal-content {
                    background: white;
                    border-radius: var(--radius-xl);
                    max-width: 600px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    padding: var(--space-6);
                    box-shadow: var(--shadow-2xl);
                    position: relative;
                    z-index: 100000;
                }
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: var(--space-6);
                }
                .modal-header h2 {
                    font-size: var(--text-xl);
                    margin: 0;
                }
                .btn-close {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: var(--space-2);
                    color: var(--gray-500);
                    border-radius: var(--radius-md);
                    transition: all var(--transition-fast);
                }
                .btn-close:hover {
                    background: var(--gray-100);
                    color: var(--gray-700);
                }
                
                .form-group {
                    margin-bottom: var(--space-4);
                }
                .form-group label {
                    display: block;
                    margin-bottom: var(--space-2);
                    font-weight: var(--font-medium);
                    color: var(--gray-700);
                }
                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: var(--space-4);
                }
                .modal-actions {
                    display: flex;
                    gap: var(--space-3);
                    justify-content: flex-end;
                    margin-top: var(--space-6);
                    padding-top: var(--space-4);
                    border-top: 1px solid var(--gray-200);
                }
                
                @media (max-width: 768px) { 
                    .page-header { flex-direction: column; gap: var(--space-4); align-items: flex-start; }
                    .service-header { flex-direction: column; }
                    .service-thumbnail { width: 100%; height: 200px; }
                    .form-row { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
};

export default ServiceManagement;
