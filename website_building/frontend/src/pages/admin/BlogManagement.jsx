import { Plus, Eye, Edit2, Trash2, Search, Calendar, ExternalLink } from 'lucide-react';

const BlogManagement = () => {
    const posts = [
        { id: 1, title: '10 Tips for Finding the Right Home Cleaner', status: 'published', author: 'Sarah J.', date: 'Jan 15, 2026', views: 1240 },
        { id: 2, title: 'How to Prepare for a Plumbing Service', status: 'published', author: 'Mike R.', date: 'Jan 12, 2026', views: 890 },
        { id: 3, title: 'Benefits of Regular AC Maintenance', status: 'draft', author: 'Sarah J.', date: 'Jan 10, 2026', views: 0 },
        { id: 4, title: 'DIY vs Professional: When to Call an Expert', status: 'published', author: 'John D.', date: 'Jan 8, 2026', views: 1560 },
    ];

    return (
        <div className="blog-management-page">
            <div className="page-header">
                <div><h1>Blog Management</h1><p>Create and manage blog content</p></div>
                <button className="btn btn-primary"><Plus size={18} /> New Post</button>
            </div>

            <div className="toolbar">
                <div className="search-input-wrapper"><Search size={18} className="search-icon" /><input type="text" className="form-input search-input" placeholder="Search posts..." /></div>
            </div>

            <div className="card">
                <div className="table-wrapper">
                    <table className="table">
                        <thead><tr><th>Title</th><th>Author</th><th>Date</th><th>Views</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            {posts.map(p => (
                                <tr key={p.id}>
                                    <td><strong>{p.title}</strong></td>
                                    <td>{p.author}</td>
                                    <td><Calendar size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />{p.date}</td>
                                    <td>{p.views.toLocaleString()}</td>
                                    <td><span className={`badge badge-${p.status === 'published' ? 'success' : 'gray'}`}>{p.status}</span></td>
                                    <td>
                                        <button className="btn btn-ghost btn-icon btn-sm"><ExternalLink size={16} /></button>
                                        <button className="btn btn-ghost btn-icon btn-sm"><Edit2 size={16} /></button>
                                        <button className="btn btn-ghost btn-icon btn-sm" style={{ color: 'var(--error)' }}><Trash2 size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <style>{`
        .blog-management-page { max-width: 1200px; margin: 0 auto; }
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-6); }
        .page-header h1 { font-size: var(--text-2xl); margin-bottom: var(--space-1); }
        .page-header p { color: var(--gray-500); }
        .toolbar { margin-bottom: var(--space-6); }
        .toolbar .search-input-wrapper { max-width: 300px; }
        @media (max-width: 768px) { .page-header { flex-direction: column; gap: var(--space-4); align-items: flex-start; } }
      `}</style>
        </div>
    );
};

export default BlogManagement;
