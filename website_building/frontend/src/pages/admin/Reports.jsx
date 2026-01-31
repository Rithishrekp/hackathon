import { DollarSign, Users, Briefcase, Calendar, TrendingUp, Download, ArrowUpRight } from 'lucide-react';

const Reports = () => {
    const metrics = [
        { label: 'Total Revenue', value: '$48,500', change: '+15%', icon: DollarSign },
        { label: 'New Users', value: '1,240', change: '+8%', icon: Users },
        { label: 'Total Bookings', value: '3,450', change: '+12%', icon: Calendar },
        { label: 'Active Providers', value: '1,024', change: '+5%', icon: Briefcase },
    ];

    const topServices = [
        { name: 'Home Cleaning', bookings: 850, revenue: 12500 },
        { name: 'Plumbing', bookings: 620, revenue: 9800 },
        { name: 'AC Service', bookings: 480, revenue: 8200 },
        { name: 'Electrical', bookings: 350, revenue: 6500 },
        { name: 'Beauty & Spa', bookings: 290, revenue: 4200 },
    ];

    return (
        <div className="reports-page">
            <div className="page-header">
                <div><h1>Reports & Analytics</h1><p>Business insights and performance metrics</p></div>
                <button className="btn btn-secondary"><Download size={18} /> Export Report</button>
            </div>

            <div className="metrics-grid">
                {metrics.map((m, i) => (
                    <div key={i} className="card metric-card">
                        <div className="metric-icon"><m.icon size={24} /></div>
                        <div className="metric-info">
                            <span className="metric-label">{m.label}</span>
                            <span className="metric-value">{m.value}</span>
                            <span className="metric-change"><ArrowUpRight size={14} /> {m.change}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="reports-grid">
                <div className="card">
                    <h3>Revenue Trend</h3>
                    <div className="chart-placeholder"><TrendingUp size={64} /><p>Chart visualization would go here</p></div>
                </div>
                <div className="card">
                    <h3>Top Services</h3>
                    <div className="table-wrapper">
                        <table className="table">
                            <thead><tr><th>Service</th><th>Bookings</th><th>Revenue</th></tr></thead>
                            <tbody>
                                {topServices.map((s, i) => (
                                    <tr key={i}><td><strong>{s.name}</strong></td><td>{s.bookings}</td><td>${s.revenue.toLocaleString()}</td></tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <style>{`
        .reports-page { max-width: 1200px; margin: 0 auto; }
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-6); }
        .page-header h1 { font-size: var(--text-2xl); margin-bottom: var(--space-1); }
        .page-header p { color: var(--gray-500); }
        .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-6); margin-bottom: var(--space-6); }
        .metric-card { display: flex; gap: var(--space-4); align-items: center; }
        .metric-icon { width: 56px; height: 56px; background: var(--primary-50); border-radius: var(--radius-xl); display: flex; align-items: center; justify-content: center; color: var(--primary-600); }
        .metric-label { font-size: var(--text-sm); color: var(--gray-500); display: block; }
        .metric-value { font-size: var(--text-2xl); font-weight: var(--font-bold); display: block; }
        .metric-change { font-size: var(--text-sm); color: var(--success); display: flex; align-items: center; gap: 2px; }
        .reports-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-6); }
        .reports-grid h3 { margin-bottom: var(--space-4); }
        .chart-placeholder { text-align: center; padding: var(--space-12); color: var(--gray-300); }
        .chart-placeholder p { margin-top: var(--space-4); color: var(--gray-400); }
        @media (max-width: 1024px) { .metrics-grid { grid-template-columns: repeat(2, 1fr); } .reports-grid { grid-template-columns: 1fr; } }
        @media (max-width: 768px) { .metrics-grid { grid-template-columns: 1fr; } .page-header { flex-direction: column; gap: var(--space-4); align-items: flex-start; } }
      `}</style>
        </div>
    );
};

export default Reports;
