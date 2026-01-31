import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, Facebook, Twitter, Linkedin, ChevronRight } from 'lucide-react';

const BlogDetails = () => {
    const { blogId } = useParams();

    const post = {
        id: blogId,
        title: '10 Tips for Finding the Right Home Cleaner',
        excerpt: 'Learn how to choose the best cleaning service for your home with these expert tips.',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&h=500&fit=crop',
        category: 'Tips',
        date: 'January 15, 2026',
        readTime: '5 min read',
        author: { name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', role: 'Content Writer' },
        content: `
      <p>Finding the right home cleaner can feel overwhelming with so many options available. Whether you're hiring for the first time or looking to switch services, these tips will help you make an informed decision.</p>
      <h2>1. Check Reviews and Ratings</h2>
      <p>Always start by reading reviews from other customers. Look for consistent feedback about reliability, quality of work, and professionalism.</p>
      <h2>2. Verify Insurance and Bonding</h2>
      <p>A reputable cleaning service should be insured and bonded. This protects you in case of accidents or damages during the cleaning process.</p>
      <h2>3. Ask About Their Cleaning Products</h2>
      <p>If you have preferences for eco-friendly or hypoallergenic products, make sure to ask what the service uses before booking.</p>
      <h2>4. Get a Clear Price Quote</h2>
      <p>Avoid surprises by getting a detailed quote upfront. Understand what's included and any additional fees that might apply.</p>
      <h2>5. Check Their Availability</h2>
      <p>Make sure the cleaning service can accommodate your schedule. The best services offer flexible booking options.</p>
    `
    };

    const relatedPosts = [
        { id: 2, title: 'Spring Cleaning Checklist', image: 'https://images.unsplash.com/photo-1527515545081-5db817172677?w=300&h=200&fit=crop', date: 'Jan 5, 2026' },
        { id: 3, title: 'DIY vs Professional Cleaning', image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=300&h=200&fit=crop', date: 'Jan 8, 2026' },
    ];

    return (
        <div className="blog-details-page">
            <section className="blog-header">
                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/">Home</Link><ChevronRight size={16} /><Link to="/blog">Blog</Link><ChevronRight size={16} /><span>{post.category}</span>
                    </div>
                    <span className="blog-category">{post.category}</span>
                    <h1>{post.title}</h1>
                    <div className="blog-meta">
                        <div className="author-info">
                            <img src={post.author.avatar} alt={post.author.name} />
                            <div><strong>{post.author.name}</strong><span>{post.author.role}</span></div>
                        </div>
                        <div className="meta-items">
                            <span><Calendar size={16} /> {post.date}</span>
                            <span><Clock size={16} /> {post.readTime}</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="blog-content-section">
                <div className="container">
                    <div className="blog-layout">
                        <article className="blog-article">
                            <img src={post.image} alt={post.title} className="featured-image" />
                            <div className="article-content" dangerouslySetInnerHTML={{ __html: post.content }} />
                            <div className="share-section">
                                <span>Share this article:</span>
                                <div className="share-buttons">
                                    <button className="share-btn"><Facebook size={18} /></button>
                                    <button className="share-btn"><Twitter size={18} /></button>
                                    <button className="share-btn"><Linkedin size={18} /></button>
                                </div>
                            </div>
                        </article>
                        <aside className="blog-sidebar">
                            <div className="sidebar-section">
                                <h4>Related Articles</h4>
                                {relatedPosts.map(rp => (
                                    <Link key={rp.id} to={`/blog/${rp.id}`} className="related-post">
                                        <img src={rp.image} alt={rp.title} />
                                        <div><h5>{rp.title}</h5><span>{rp.date}</span></div>
                                    </Link>
                                ))}
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            <style>{`
        .blog-header { background: var(--gray-50); padding: var(--space-12) 0; }
        .breadcrumb { display: flex; align-items: center; gap: var(--space-2); font-size: var(--text-sm); color: var(--gray-500); margin-bottom: var(--space-6); }
        .breadcrumb a { color: var(--gray-600); }
        .blog-category { font-size: var(--text-sm); color: var(--primary-600); background: var(--primary-50); padding: var(--space-1) var(--space-3); border-radius: var(--radius-full); display: inline-block; margin-bottom: var(--space-4); }
        .blog-header h1 { font-size: var(--text-4xl); max-width: 800px; margin-bottom: var(--space-6); }
        .blog-meta { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-4); }
        .author-info { display: flex; gap: var(--space-3); align-items: center; }
        .author-info img { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; }
        .author-info strong { display: block; font-size: var(--text-base); }
        .author-info span { font-size: var(--text-sm); color: var(--gray-500); }
        .meta-items { display: flex; gap: var(--space-4); font-size: var(--text-sm); color: var(--gray-500); }
        .meta-items span { display: flex; align-items: center; gap: var(--space-2); }
        .blog-content-section { padding: var(--space-12) 0; }
        .blog-layout { display: grid; grid-template-columns: 1fr 300px; gap: var(--space-10); }
        .featured-image { width: 100%; border-radius: var(--radius-xl); margin-bottom: var(--space-8); }
        .article-content { font-size: var(--text-lg); line-height: 1.8; }
        .article-content h2 { font-size: var(--text-2xl); margin: var(--space-8) 0 var(--space-4); }
        .article-content p { margin-bottom: var(--space-4); color: var(--gray-700); }
        .share-section { display: flex; align-items: center; gap: var(--space-4); padding-top: var(--space-8); border-top: 1px solid var(--gray-200); margin-top: var(--space-8); }
        .share-buttons { display: flex; gap: var(--space-2); }
        .share-btn { width: 40px; height: 40px; border-radius: var(--radius-lg); border: 1px solid var(--gray-200); background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--gray-600); }
        .share-btn:hover { background: var(--gray-50); color: var(--primary-600); }
        .sidebar-section { background: white; padding: var(--space-5); border-radius: var(--radius-xl); box-shadow: var(--shadow-card); }
        .sidebar-section h4 { margin-bottom: var(--space-4); }
        .related-post { display: flex; gap: var(--space-3); padding: var(--space-3); border-radius: var(--radius-lg); margin-bottom: var(--space-2); }
        .related-post:hover { background: var(--gray-50); }
        .related-post img { width: 80px; height: 60px; border-radius: var(--radius-md); object-fit: cover; }
        .related-post h5 { font-size: var(--text-sm); margin-bottom: var(--space-1); }
        .related-post span { font-size: var(--text-xs); color: var(--gray-500); }
        @media (max-width: 1024px) { .blog-layout { grid-template-columns: 1fr; } }
      `}</style>
        </div>
    );
};

export default BlogDetails;
