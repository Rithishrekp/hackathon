import { Plus, Edit2, Trash2, Eye, Search, Filter } from 'lucide-react';

const AdminServiceManagement = () => {
    const categories = [
        { id: 1, name: 'Cleaning', services: 12, providers: 45, status: 'active' },
        { id: 2, name: 'Plumbing', services: 8, providers: 32, status: 'active' },
        { id: 3, name: 'Electrical', services: 10, providers: 28, status: 'active' },
        { id: 4, name: 'AC & Appliances', services: 6, providers: 24, status: 'active' },
        { id: 5, name: 'Painting', services: 5, providers: 18, status: 'active' },
        { id: 6, name: 'Beauty & Spa', services: 15, providers: 56, status: 'active' },
    ];

    return (
        <div className="service-management-page">
            <div className="page-header">
                <div><h1>Service Management</h1><p>Manage service categories and offerings</p></div>
                <button className="btn btn-primary"><Plus size={18} /> Add Category</button>
            </div>

            <div className="toolbar">
                <div className="search-input-wrapper"><Search size={18} className="search-icon" /><input type="text" className="form-input search-input" placeholder="Search categories..." /></div>
            </div>

            <div className="categories-grid">
                {categories.map(cat => (
                    <div key={cat.id} className="card category-card">
                        <div className="cat-header">
                            <h3>{cat.name}</h3>
                            <span className="badge badge-success">{cat.status}</span>
                        </div>
                        <div className="cat-stats">
                            <div><strong>{cat.services}</strong><span>Services</span></div>
                            <div><strong>{cat.providers}</strong><span>Providers</span></div>
                        </div>
                        <div className="cat-actions">
                            <button className="btn btn-ghost btn-sm"><Eye size={16} /> View</button>
                            <button className="btn btn-ghost btn-sm"><Edit2 size={16} /> Edit</button>
                            <button className="btn btn-ghost btn-sm" style={{ color: 'var(--error)' }}><Trash2 size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
        .service-management-page { max-width: 1200px; margin: 0 auto; }
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-6); }
        .page-header h1 { font-size: var(--text-2xl); margin-bottom: var(--space-1); }
        .page-header p { color: var(--gray-500); }
        .toolbar { margin-bottom: var(--space-6); }
        .toolbar .search-input-wrapper { max-width: 300px; }
        .categories-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6); }
        .category-card { padding: var(--space-5); }
        .cat-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4); }
        .cat-header h3 { font-size: var(--text-lg); }
        .cat-stats { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); margin-bottom: var(--space-4); padding-bottom: var(--space-4); border-bottom: 1px solid var(--gray-100); }
        .cat-stats div { text-align: center; }
        .cat-stats strong { display: block; font-size: var(--text-2xl); color: var(--primary-600); }
        .cat-stats span { font-size: var(--text-sm); color: var(--gray-500); }
        .cat-actions { display: flex; gap: var(--space-2); }
        @media (max-width: 1024px) { .categories-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) { .categories-grid { grid-template-columns: 1fr; } .page-header { flex-direction: column; gap: var(--space-4); align-items: flex-start; } }
      `}</style>
        </div>
    );
};

export default AdminServiceManagement;
