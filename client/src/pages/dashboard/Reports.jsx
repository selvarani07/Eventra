import React, { useState, useEffect } from 'react';

const Reports = () => {
    const [stats, setStats] = useState([]);
    const [filters, setFilters] = useState({ start_date: '', end_date: '' });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        let url = 'http://localhost:5000/api/reports/utilization?';
        if (filters.start_date) url += `start_date=${filters.start_date}&`;
        if (filters.end_date) url += `end_date=${filters.end_date}`;

        const res = await fetch(url);
        const data = await res.json();
        setStats(data);
    };

    return (
        <div>
            <h3 style={{ color: 'var(--color-primary)' }}>Resource Utilization</h3>

            <div className="card" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
                <div>
                    <label>From</label>
                    <input type="datetime-local" onChange={e => setFilters({ ...filters, start_date: e.target.value })} />
                </div>
                <div>
                    <label>To</label>
                    <input type="datetime-local" onChange={e => setFilters({ ...filters, end_date: e.target.value })} />
                </div>
                <button className="btn btn-primary" onClick={fetchStats}>Filter</button>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '0.5rem', overflow: 'hidden' }}>
                    <thead style={{ background: 'var(--color-secondary)', color: 'white' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Resource</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Type</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Total Bookings</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Hours Utilized</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.map(s => (
                            <tr key={s.id} style={{ borderBottom: '1px solid #ddd' }}>
                                <td style={{ padding: '1rem' }}>{s.name}</td>
                                <td style={{ padding: '1rem' }}>{s.type}</td>
                                <td style={{ padding: '1rem' }}>{s.bookings}</td>
                                <td style={{ padding: '1rem', fontWeight: 'bold' }}>{s.total_hours} hrs</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Reports;
