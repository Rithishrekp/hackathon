import { useState } from 'react';
import { Clock, Save } from 'lucide-react';

const Availability = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const [schedule, setSchedule] = useState(
        days.map(day => ({ day, enabled: day !== 'Sunday', start: '09:00', end: '17:00' }))
    );

    const toggleDay = (idx) => {
        const updated = [...schedule];
        updated[idx].enabled = !updated[idx].enabled;
        setSchedule(updated);
    };

    return (
        <div className="availability-page">
            <div className="page-header"><h1>Availability</h1><p>Set your working hours</p></div>
            <div className="card">
                <div className="schedule-list">
                    {schedule.map((item, idx) => (
                        <div key={item.day} className={`schedule-row ${item.enabled ? 'enabled' : 'disabled'}`}>
                            <label className="day-toggle">
                                <input type="checkbox" checked={item.enabled} onChange={() => toggleDay(idx)} />
                                <span>{item.day}</span>
                            </label>
                            {item.enabled ? (
                                <div className="time-range">
                                    <input type="time" value={item.start} className="form-input" onChange={(e) => { const u = [...schedule]; u[idx].start = e.target.value; setSchedule(u); }} />
                                    <span>to</span>
                                    <input type="time" value={item.end} className="form-input" onChange={(e) => { const u = [...schedule]; u[idx].end = e.target.value; setSchedule(u); }} />
                                </div>
                            ) : (
                                <span className="unavailable">Unavailable</span>
                            )}
                        </div>
                    ))}
                </div>
                <button className="btn btn-primary" style={{ marginTop: 'var(--space-6)' }}><Save size={18} /> Save Schedule</button>
            </div>
            <style>{`
        .availability-page { max-width: 700px; margin: 0 auto; }
        .page-header { margin-bottom: var(--space-6); }
        .page-header h1 { font-size: var(--text-2xl); margin-bottom: var(--space-1); }
        .page-header p { color: var(--gray-500); }
        .schedule-list { display: flex; flex-direction: column; gap: var(--space-4); }
        .schedule-row { display: flex; align-items: center; justify-content: space-between; padding: var(--space-4); background: var(--gray-50); border-radius: var(--radius-lg); }
        .schedule-row.disabled { opacity: 0.6; }
        .day-toggle { display: flex; align-items: center; gap: var(--space-3); font-weight: var(--font-medium); cursor: pointer; }
        .day-toggle input { accent-color: var(--primary-600); width: 20px; height: 20px; }
        .time-range { display: flex; align-items: center; gap: var(--space-2); }
        .time-range input { width: 120px; text-align: center; }
        .unavailable { color: var(--gray-400); font-style: italic; }
      `}</style>
        </div>
    );
};

export default Availability;
