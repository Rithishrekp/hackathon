import { CreditCard, Download, Filter } from 'lucide-react';

const PaymentHistory = () => {
    const transactions = [
        { id: 'TXN001', date: 'Jan 28, 2026', service: 'Home Cleaning', amount: 84, status: 'completed', method: 'Visa •••• 4242' },
        { id: 'TXN002', date: 'Jan 20, 2026', service: 'Plumbing', amount: 74, status: 'completed', method: 'Visa •••• 4242' },
        { id: 'TXN003', date: 'Jan 15, 2026', service: 'Electrical', amount: 84, status: 'completed', method: 'PayPal' },
        { id: 'TXN004', date: 'Jan 10, 2026', service: 'AC Service', amount: 94, status: 'refunded', method: 'Visa •••• 4242' },
    ];

    return (
        <div className="payments-page">
            <div className="page-header">
                <div><h1>Payment History</h1><p>View your transaction history</p></div>
                <button className="btn btn-secondary"><Download size={18} /> Export</button>
            </div>

            <div className="table-wrapper">
                <table className="table">
                    <thead>
                        <tr><th>Transaction ID</th><th>Date</th><th>Service</th><th>Payment Method</th><th>Amount</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                        {transactions.map(tx => (
                            <tr key={tx.id}>
                                <td><strong>{tx.id}</strong></td>
                                <td>{tx.date}</td>
                                <td>{tx.service}</td>
                                <td><CreditCard size={14} style={{ marginRight: '8px', verticalAlign: 'middle' }} />{tx.method}</td>
                                <td><strong>${tx.amount}</strong></td>
                                <td><span className={`badge ${tx.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>{tx.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style>{`
        .payments-page { max-width: 1000px; margin: 0 auto; }
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-6); }
        .page-header h1 { font-size: var(--text-2xl); margin-bottom: var(--space-1); }
        .page-header p { color: var(--gray-500); }
        @media (max-width: 768px) { .page-header { flex-direction: column; gap: var(--space-4); align-items: flex-start; } }
      `}</style>
        </div>
    );
};

export default PaymentHistory;
