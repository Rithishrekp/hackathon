import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import { useState } from 'react';

const BlogList = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const posts = [
        { id: 1, title: '10 Tips for Finding the Right Home Cleaner', excerpt: 'Learn how to choose the best cleaning service for your home with these expert tips.', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=250&fit=crop', category: 'Tips', date: 'Jan 15, 2026', readTime: '5 min' },
        { id: 2, title: 'How to Prepare Your Home for a Plumbing Service', excerpt: 'Get the most out of your plumbing appointment with proper preparation.', image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=250&fit=crop', category: 'Guides', date: 'Jan 12, 2026', readTime: '4 min' },
        { id: 3, title: 'The Benefits of Regular AC Maintenance', excerpt: 'Discover why regular AC maintenance can save you money and extend equipment life.', image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=250&fit=crop', category: 'Maintenance', date: 'Jan 10, 2026', readTime: '6 min' },
        { id: 4, title: 'DIY vs Professional: When to Call an Expert', excerpt: 'Know when to tackle home repairs yourself and when to call a professional.', image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=250&fit=crop', category: 'Tips', date: 'Jan 8, 2026', readTime: '7 min' },
        { id: 5, title: 'Spring Cleaning Checklist for Every Room', excerpt: 'A comprehensive guide to deep cleaning your entire home this spring.', image: 'https://images.unsplash.com/photo-1527515545081-5db817172677?w=400&h=250&fit=crop', category: 'Guides', date: 'Jan 5, 2026', readTime: '8 min' },
        { id: 6, title: 'How ServisGo Verifies Service Providers', excerpt: 'Learn about our rigorous verification process that keeps you safe.', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=250&fit=crop', category: 'Company', date: 'Jan 2, 2026', readTime: '4 min' },
    ];

    const categories = ['All', 'Tips', 'Guides', 'Maintenance', 'Company'];
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredPosts = posts.filter(post =>
        (activeCategory === 'All' || post.category === activeCategory) &&
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="blog-page">
            <section className="page-hero">
                <div className="container">
                    <h1>Blog</h1>
                    <p>Tips, guides, and insights for home services</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="blog-toolbar">
                        <div className="search-input-wrapper">
                            <Search size={20} className="search-icon" />
                            <input type="text" placeholder="Search articles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="form-input search-input" />
                        </div>
                        <div className="category-tabs">
                            {categories.map(cat => (
                                <button key={cat} className={`tab ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>{cat}</button>
                            ))}
                        </div>
                    </div>

                    <div className="blog-grid">
                        {filteredPosts.map(post => (
                            <Link key={post.id} to={`/blog/${post.id}`} className="card blog-card">
                                <img src={post.image} alt={post.title} className="blog-image" />
                                <div className="blog-content">
                                    <span className="blog-category">{post.category}</span>
                                    <h3>{post.title}</h3>
                                    <p>{post.excerpt}</p>
                                    <div className="blog-meta">
                                        <span><Calendar size={14} /> {post.date}</span>
                                        <span><Clock size={14} /> {post.readTime}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {filteredPosts.length === 0 && <div className="empty-state text-center"><p>No articles found</p></div>}
                </div>
            </section>

            <style>{`
        .page-hero { background: var(--gradient-hero); padding: var(--space-16) 0; text-align: center; color: white; }
        .page-hero h1 { color: white; margin-bottom: var(--space-3); }
        .page-hero p { color: rgba(255,255,255,0.9); font-size: var(--text-xl); }
        .blog-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-8); gap: var(--space-4); flex-wrap: wrap; }
        .blog-toolbar .search-input-wrapper { max-width: 300px; }
        .category-tabs { display: flex; gap: var(--space-2); }
        .blog-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6); }
        .blog-card { padding: 0; overflow: hidden; }
        .blog-image { width: 100%; height: 200px; object-fit: cover; }
        .blog-content { padding: var(--space-5); }
        .blog-category { font-size: var(--text-xs); color: var(--primary-600); background: var(--primary-50); padding: var(--space-1) var(--space-2); border-radius: var(--radius-sm); display: inline-block; margin-bottom: var(--space-3); }
        .blog-content h3 { font-size: var(--text-lg); margin-bottom: var(--space-2); }
        .blog-content p { font-size: var(--text-sm); line-height: 1.6; margin-bottom: var(--space-4); }
        .blog-meta { display: flex; gap: var(--space-4); font-size: var(--text-sm); color: var(--gray-500); }
        .blog-meta span { display: flex; align-items: center; gap: var(--space-1); }
        .empty-state { padding: var(--space-12); }
        @media (max-width: 1024px) { .blog-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) { .blog-grid { grid-template-columns: 1fr; } .category-tabs { overflow-x: auto; } }
      `}</style>
        </div>
    );
};

export default BlogList;
