import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import headerImage from '../assets/header_analytics.png';

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
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {/* Header Image */}
            <div style={{
                height: '160px',
                borderRadius: '1.5rem',
                background: 'linear-gradient(to right, #0F172A, #334155)',
                marginBottom: '2rem',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                padding: '0 2rem'
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: `url(${headerImage}) center/cover`, opacity: 0.3 }} />
                <div style={{ position: 'relative', zIndex: 1, color: 'white' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>Utilization Analytics</h2>
                    <p style={{ margin: '0.5rem 0 0', opacity: 0.8 }}>Deep insights into resource usage.</p>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                <button className="btn" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', border: '1px solid #CBD5E1', background: 'white' }}>
                    <Download size={18} /> Export Data
                </button>
            </div>

            <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-end', background: 'white' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#64748B' }}>From Date</label>
                    <input
                        type="datetime-local"
                        onChange={e => setFilters({ ...filters, start_date: e.target.value })}
                        style={{ padding: '0.6rem', border: '1px solid #CBD5E1', borderRadius: '0.5rem' }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#64748B' }}>To Date</label>
                    <input
                        type="datetime-local"
                        onChange={e => setFilters({ ...filters, end_date: e.target.value })}
                        style={{ padding: '0.6rem', border: '1px solid #CBD5E1', borderRadius: '0.5rem' }}
                    />
                </div>
                <button className="btn btn-primary" onClick={fetchStats}>Apply Filters</button>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ overflowX: 'auto', background: 'white', borderRadius: '1rem', border: '1px solid #E2E8F0' }}
            >
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                        <tr>
                            <th style={{ padding: '1.25rem', textAlign: 'left', color: '#475569' }}>Resource Name</th>
                            <th style={{ padding: '1.25rem', textAlign: 'left', color: '#475569' }}>Type</th>
                            <th style={{ padding: '1.25rem', textAlign: 'left', color: '#475569' }}>Total Bookings</th>
                            <th style={{ padding: '1.25rem', textAlign: 'left', color: '#475569' }}>Hours Utilized</th>
                            <th style={{ padding: '1.25rem', textAlign: 'left', color: '#475569' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.map((s, i) => (
                            <motion.tr
                                key={s.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.05 }}
                                style={{ borderBottom: '1px solid #F1F5F9' }}
                            >
                                <td style={{ padding: '1.25rem', fontWeight: 600, color: 'var(--color-primary)' }}>{s.name}</td>
                                <td style={{ padding: '1.25rem', color: '#64748B' }}>{s.type}</td>
                                <td style={{ padding: '1.25rem' }}>{s.bookings}</td>
                                <td style={{ padding: '1.25rem', fontWeight: 'bold' }}>{s.total_hours.toFixed(1)} hrs</td>
                                <td style={{ padding: '1.25rem' }}>
                                    <span style={{
                                        background: s.total_hours > 0 ? '#DCFCE7' : '#F1F5F9',
                                        color: s.total_hours > 0 ? '#166534' : '#94A3B8',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '1rem',
                                        fontSize: '0.85rem',
                                        fontWeight: 600
                                    }}>
                                        {s.total_hours > 0 ? 'Active' : 'Idle'}
                                    </span>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </motion.div>
    );
};

export default Reports;
