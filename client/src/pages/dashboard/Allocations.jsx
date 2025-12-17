import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import headerImage from '../assets/header_allocations.png';

const Allocations = () => {
    const [allocations, setAllocations] = useState([]);
    const [resources, setResources] = useState([]);
    const [events, setEvents] = useState([]);

    const [newAlloc, setNewAlloc] = useState({ event_id: '', resource_id: '' });
    const [status, setStatus] = useState(null); // { type: 'error' | 'success', msg: '' }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const [resRes, evRes, allRes] = await Promise.all([
            fetch('http://localhost:5000/api/resources'),
            fetch('http://localhost:5000/api/events'),
            fetch('http://localhost:5000/api/allocations')
        ]);
        setResources(await resRes.json());
        setEvents(await evRes.json());
        setAllocations(await allRes.json());
    };

    const handleAllocate = async (e) => {
        e.preventDefault();
        setStatus(null);

        try {
            const res = await fetch('http://localhost:5000/api/allocations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAlloc)
            });

            const data = await res.json();

            if (!res.ok) {
                if (res.status === 409) {
                    setStatus({ type: 'error', msg: `Conflict Detected: ${data.details}` });
                } else {
                    setStatus({ type: 'error', msg: 'Allocation failed.' });
                }
            } else {
                setStatus({ type: 'success', msg: 'Resource allocated successfully!' });
                fetchData();
            }
        } catch (err) {
            setStatus({ type: 'error', msg: 'Network error.' });
        }
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
                    <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>Resource Allocation</h2>
                    <p style={{ margin: '0.5rem 0 0', opacity: 0.8 }}>Assign resources to events conflict-free.</p>
                </div>
            </div>

            <div className="card" style={{ marginBottom: '2rem', padding: '2rem', border: '1px solid #E2E8F0', position: 'relative', overflow: 'hidden', background: 'white' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--color-accent)' }}></div>

                {status && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="alert"
                        style={{
                            background: status.type === 'error' ? '#FEF2F2' : '#EFFDF5',
                            color: status.type === 'error' ? '#DC2626' : '#059669',
                            padding: '1rem',
                            borderRadius: '0.5rem',
                            marginBottom: '1.5rem',
                            display: 'flex', alignItems: 'center', gap: '0.75rem',
                            border: `1px solid ${status.type === 'error' ? '#FECACA' : '#A7F3D0'}`
                        }}
                    >
                        {status.type === 'error' ? <AlertTriangle size={20} /> : <CheckCircle size={20} />}
                        {status.msg}
                    </motion.div>
                )}

                <form onSubmit={handleAllocate} style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto', gap: '1rem', alignItems: 'end' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', color: '#64748B', marginBottom: '0.5rem' }}>Event</label>
                        <select
                            value={newAlloc.event_id}
                            onChange={e => setNewAlloc({ ...newAlloc, event_id: e.target.value })}
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1' }}
                        >
                            <option value="">Select Event...</option>
                            {events.map(e => (
                                <option key={e.id} value={e.id}>{e.title}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ paddingBottom: '0.75rem', color: '#CBD5E1' }}>
                        <ArrowRight />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', color: '#64748B', marginBottom: '0.5rem' }}>Resource</label>
                        <select
                            value={newAlloc.resource_id}
                            onChange={e => setNewAlloc({ ...newAlloc, resource_id: e.target.value })}
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1' }}
                        >
                            <option value="">Select Resource...</option>
                            {resources.map(r => (
                                <option key={r.id} value={r.id}>{r.name} ({r.type})</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>Allocate</button>
                </form>
            </div>

            <h4 style={{ color: '#64748B', marginTop: '3rem', marginBottom: '1rem' }}>Active Allocations</h4>
            <div style={{ background: 'white', borderRadius: '1rem', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                        <tr style={{ textAlign: 'left', color: '#64748B', fontSize: '0.9rem' }}>
                            <th style={{ padding: '1rem' }}>Event</th>
                            <th style={{ padding: '1rem' }}>Resource</th>
                            <th style={{ padding: '1rem' }}>Timing</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allocations.map(a => (
                            <tr key={a.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                                <td style={{ padding: '1rem', fontWeight: 600 }}>{a.event_title}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        background: '#EFF6FF', color: '#3B82F6',
                                        padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.85rem'
                                    }}>
                                        {a.resource_name}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem', color: '#64748B', fontSize: '0.9rem' }}>
                                    {new Date(a.start_time).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default Allocations;
