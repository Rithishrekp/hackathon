import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, CreditCard, Shield, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState('card');

    const booking = {
        service: 'Home Cleaning',
        provider: 'CleanPro Services',
        date: 'January 30, 2026',
        time: '10:00 AM',
        address: '123 Main Street, Apt 4B, New York, NY 10001',
        price: 79,
        serviceFee: 5,
        total: 84,
    };

    return (
        <div className="checkout-page">
            <div className="page-header"><h1>Checkout</h1><p>Review and confirm your booking</p></div>

            <div className="steps-indicator">
                <div className="step completed"><span>✓</span>Select Service</div>
                <div className="step completed"><span>✓</span>Schedule</div>
                <div className="step completed"><span>✓</span>Address</div>
                <div className="step active"><span>4</span>Checkout</div>
            </div>

            <div className="checkout-layout">
                <div className="checkout-main">
                    <div className="card">
                        <h3>Booking Summary</h3>
                        <div className="summary-item"><span>Service</span><strong>{booking.service}</strong></div>
                        <div className="summary-item"><span>Provider</span><strong>{booking.provider}</strong></div>
                        <div className="summary-item"><Calendar size={16} /><span>{booking.date}</span></div>
                        <div className="summary-item"><Clock size={16} /><span>{booking.time}</span></div>
                        <div className="summary-item"><MapPin size={16} /><span>{booking.address}</span></div>
                    </div>

                    <div className="card">
                        <h3>Payment Method</h3>
                        <div className="payment-options">
                            <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                                <input type="radio" name="payment" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                                <CreditCard size={20} />
                                <span>Credit/Debit Card</span>
                            </label>
                            <label className={`payment-option ${paymentMethod === 'paypal' ? 'selected' : ''}`}>
                                <input type="radio" name="payment" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} />
                                <span>PayPal</span>
                            </label>
                        </div>
                        {paymentMethod === 'card' && (
                            <div className="card-form">
                                <div className="form-group"><label className="form-label">Card Number</label><input type="text" className="form-input" placeholder="1234 5678 9012 3456" /></div>
                                <div className="form-row">
                                    <div className="form-group"><label className="form-label">Expiry</label><input type="text" className="form-input" placeholder="MM/YY" /></div>
                                    <div className="form-group"><label className="form-label">CVV</label><input type="text" className="form-input" placeholder="123" /></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="checkout-sidebar">
                    <div className="card order-summary">
                        <h3>Order Total</h3>
                        <div className="price-row"><span>Service Price</span><span>${booking.price}</span></div>
                        <div className="price-row"><span>Service Fee</span><span>${booking.serviceFee}</span></div>
                        <div className="price-row total"><span>Total</span><span>${booking.total}</span></div>
                        <Link to="/customer/confirmation" className="btn btn-primary btn-lg" style={{ width: '100%' }}>Confirm Booking</Link>
                        <div className="secure-badge"><Shield size={16} /> Secure Payment</div>
                    </div>
                </div>
            </div>

            <style>{`
        .checkout-page { max-width: 1000px; margin: 0 auto; }
        .page-header { margin-bottom: var(--space-6); }
        .page-header h1 { font-size: var(--text-2xl); margin-bottom: var(--space-1); }
        .page-header p { color: var(--gray-500); }
        .steps-indicator { display: flex; justify-content: space-between; margin-bottom: var(--space-8); padding: var(--space-4); background: white; border-radius: var(--radius-xl); box-shadow: var(--shadow-sm); }
        .step { display: flex; align-items: center; gap: var(--space-2); color: var(--gray-400); font-size: var(--text-sm); }
        .step span { width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; background: var(--gray-100); border-radius: 50%; font-weight: var(--font-semibold); }
        .step.active { color: var(--primary-600); }
        .step.active span { background: var(--primary-600); color: white; }
        .step.completed span { background: var(--success); color: white; }
        .checkout-layout { display: grid; grid-template-columns: 1fr 350px; gap: var(--space-6); }
        .checkout-main { display: flex; flex-direction: column; gap: var(--space-6); }
        .checkout-main h3 { margin-bottom: var(--space-4); }
        .summary-item { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3) 0; border-bottom: 1px solid var(--gray-100); color: var(--gray-600); font-size: var(--text-sm); }
        .summary-item:last-child { border-bottom: none; }
        .summary-item strong { margin-left: auto; color: var(--gray-900); }
        .payment-options { display: flex; flex-direction: column; gap: var(--space-3); margin-bottom: var(--space-4); }
        .payment-option { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-4); border: 2px solid var(--gray-200); border-radius: var(--radius-lg); cursor: pointer; }
        .payment-option.selected { border-color: var(--primary-600); background: var(--primary-50); }
        .payment-option input { accent-color: var(--primary-600); }
        .card-form { padding-top: var(--space-4); border-top: 1px solid var(--gray-100); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); }
        .order-summary h3 { margin-bottom: var(--space-4); }
        .price-row { display: flex; justify-content: space-between; padding: var(--space-3) 0; border-bottom: 1px solid var(--gray-100); color: var(--gray-600); }
        .price-row.total { border-bottom: none; padding-top: var(--space-4); font-size: var(--text-xl); font-weight: var(--font-bold); color: var(--gray-900); }
        .secure-badge { display: flex; align-items: center; justify-content: center; gap: var(--space-2); margin-top: var(--space-4); font-size: var(--text-sm); color: var(--gray-500); }
        @media (max-width: 1024px) { .checkout-layout { grid-template-columns: 1fr; } }
      `}</style>
        </div>
    );
};

export default Checkout;
