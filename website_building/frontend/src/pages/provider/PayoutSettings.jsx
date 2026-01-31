import { CreditCard, Building, Plus } from 'lucide-react';

const PayoutSettings = () => {
    const bankAccounts = [
        { id: 1, bank: 'Chase Bank', last4: '4567', type: 'Checking', isDefault: true },
        { id: 2, bank: 'Bank of America', last4: '8901', type: 'Savings', isDefault: false },
    ];

    return (
        <div className="payout-page">
            <div className="page-header"><h1>Payout Settings</h1><p>Manage how you receive payments</p></div>

            <div className="card">
                <div className="section-header"><h3>Bank Accounts</h3><button className="btn btn-secondary btn-sm"><Plus size={16} /> Add Account</button></div>
                <div className="accounts-list">
                    {bankAccounts.map(acc => (
                        <div key={acc.id} className={`account-item ${acc.isDefault ? 'default' : ''}`}>
                            <div className="account-icon"><Building size={20} /></div>
                            <div className="account-info">
                                <h4>{acc.bank}</h4>
                                <p>{acc.type} •••• {acc.last4}</p>
                            </div>
                            {acc.isDefault ? <span className="badge badge-primary">Default</span> : <button className="btn btn-ghost btn-sm">Set as Default</button>}
                        </div>
                    ))}
                </div>
            </div>

            <div className="card">
                <h3>Payout Schedule</h3>
                <p>Your earnings are paid out <strong>weekly</strong> every Monday.</p>
                <div className="form-group" style={{ marginTop: 'var(--space-4)', maxWidth: '300px' }}>
                    <label className="form-label">Change Schedule</label>
                    <select className="form-input form-select">
                        <option>Weekly (Every Monday)</option>
                        <option>Bi-weekly</option>
                        <option>Monthly</option>
                    </select>
                </div>
            </div>

            <style>{`
        .payout-page { max-width: 800px; margin: 0 auto; }
        .page-header { margin-bottom: var(--space-6); }
        .page-header h1 { font-size: var(--text-2xl); margin-bottom: var(--space-1); }
        .page-header p { color: var(--gray-500); }
        .card { margin-bottom: var(--space-6); }
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4); }
        .section-header h3 { margin: 0; }
        .accounts-list { display: flex; flex-direction: column; gap: var(--space-3); }
        .account-item { display: flex; align-items: center; gap: var(--space-4); padding: var(--space-4); background: var(--gray-50); border-radius: var(--radius-lg); }
        .account-item.default { border: 2px solid var(--primary-300); background: var(--primary-50); }
        .account-icon { width: 48px; height: 48px; background: white; border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; color: var(--primary-600); }
        .account-info { flex: 1; }
        .account-info h4 { margin-bottom: var(--space-1); }
        .account-info p { font-size: var(--text-sm); color: var(--gray-500); }
        .card > p { color: var(--gray-600); }
      `}</style>
        </div>
    );
};

export default PayoutSettings;
