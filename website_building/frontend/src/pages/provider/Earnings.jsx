import { DollarSign, TrendingUp, Calendar, Download, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Earnings = () => {
    const stats = [
        { label: 'This Week', value: '$850', change: '+12%', up: true },
        { label: 'This Month', value: '$3,420', change: '+8%', up: true },
        { label: 'Total Earnings', value: '$24,500', change: null },
    ];

    const transactions = [
        { id: 1, service: 'Home Cleaning', date: 'Jan 28', amount: 79, status: 'paid' },
        { id: 2, service: 'Deep Cleaning', date: 'Jan 25', amount: 99, status: 'paid' },
        { id: 3, service: 'Office Cleaning', date: 'Jan 22', amount: 149, status: 'pending' },
        { id: 4, service: 'Home Cleaning', date: 'Jan 20', amount: 79, status: 'paid' },
    ];

    return (
        <div className="earnings-page">
            <div className="page-header">
                <div><h1>Earnings</h1><p>Track your income</p></div>
                <button className="btn btn-secondary"><Download size={18} /> Export</button>
            </div>

            <div className="stats-grid">
                {stats.map((s, i) => (
                    <div key={i} className="card stat-card">
                        <div className="stat-header"><DollarSign size={20} />{s.label}</div>
                        <div className="stat-value">{s.value}</div>
                        {s.change && <div className={`stat-change ${s.up ? 'up' : 'down'}`}>{s.up ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />} {s.change}</div>}
                    </div>
                ))}
            </div>

            <div className="card">
                <h3>Recent Transactions</h3>
                <div className="table-wrapper">
                    <table className="table">
                        <thead><tr><th>Service</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead>
                        <tbody>
                            {transactions.map(t => (
                                <tr key={t.id}>
                                    <td><strong>{t.service}</strong></td>
                                    <td>{t.date}</td>
                                    <td><strong>${t.amount}</strong></td>
                                    <td><span className={`badge ${t.status === 'paid' ? 'badge-success' : 'badge-warning'}`}>{t.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <style>{`
        .earnings-page { max-width: 1000px; margin: 0 auto; }
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-6); }
        .page-header h1 { font-size: var(--text-2xl); margin-bottom: var(--space-1); }
        .page-header p { color: var(--gray-500); }
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6); margin-bottom: var(--space-6); }
        .stat-card { text-align: center; }
        .stat-header { display: flex; align-items: center; justify-content: center; gap: var(--space-2); font-size: var(--text-sm); color: var(--gray-500); margin-bottom: var(--space-2); }
        .stat-value { font-size: var(--text-3xl); font-weight: var(--font-bold); color: var(--primary-600); }
        .stat-change { display: flex; align-items: center; justify-content: center; gap: var(--space-1); font-size: var(--text-sm); font-weight: var(--font-medium); margin-top: var(--space-1); }
        .stat-change.up { color: var(--success); }
        .stat-change.down { color: var(--error); }
        .card h3 { margin-bottom: var(--space-4); }
        @media (max-width: 768px) { .stats-grid { grid-template-columns: 1fr; } .page-header { flex-direction: column; gap: var(--space-4); align-items: flex-start; } }
      `}</style>
        </div>
    );
};

export default Earnings;
