import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Box, User, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import headerImage from '../../assets/header_resources.png';

const Resources = () => {
    const [resources, setResources] = useState([]);
    const [newRes, setNewRes] = useState({ name: '', type: 'Room' });

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/resources');
            const data = await res.json();
            setResources(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/resources', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRes)
            });
            if (res.ok) {
                fetchResources();
                setNewRes({ name: '', type: 'Room' });
            }
        } catch (err) {
            console.error(err);
        }
    };

    const getIcon = (type) => {
        if (type === 'Instructor') return <User size={20} color="#3B82F6" />;
        if (type === 'Equipment') return <Monitor size={20} color="#F59E0B" />;
        return <Box size={20} color="#10B981" />;
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
                    <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>Resource Registry</h2>
                    <p style={{ margin: '0.5rem 0 0', opacity: 0.8 }}>Manage your rooms, equipment, and personnel.</p>
                </div>
            </div>

            <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #E2E8F0', background: 'white' }}>
                <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.1rem', color: '#64748B' }}>Add New Resource</h4>
                <form onSubmit={handleAdd} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '0.9rem', color: '#64748B', display: 'block', marginBottom: '0.5rem' }}>Resource Name</label>
                        <input
                            value={newRes.name}
                            onChange={e => setNewRes({ ...newRes, name: e.target.value })}
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1' }}
                            placeholder="e.g. Conference Room B"
                        />
                    </div>
                    <div style={{ width: '200px' }}>
                        <label style={{ fontSize: '0.9rem', color: '#64748B', display: 'block', marginBottom: '0.5rem' }}>Type</label>
                        <select
                            value={newRes.type}
                            onChange={e => setNewRes({ ...newRes, type: e.target.value })}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1' }}
                        >
                            <option>Room</option>
                            <option>Instructor</option>
                            <option>Equipment</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', height: '42px' }}>
                        <Plus size={18} /> Add
                    </button>
                </form>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {resources.map((r, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        key={r.id}
                        className="card"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '1.5rem',
                            borderLeft: `4px solid ${r.type === 'Room' ? '#10B981' : r.type === 'Instructor' ? '#3B82F6' : '#F59E0B'}`
                        }}
                    >
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{
                                width: '40px', height: '40px',
                                background: '#F1F5F9',
                                borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                {getIcon(r.type)}
                            </div>
                            <div>
                                <div style={{ fontWeight: '600', fontSize: '1.1rem', color: 'var(--color-primary)' }}>{r.name}</div>
                                <div style={{ fontSize: '0.9rem', color: '#94A3B8' }}>{r.type}</div>
                            </div>
                        </div>

                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', opacity: 0.5 }} className="hover:opacity-100">
                            <Trash2 size={18} />
                        </button>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Resources;
