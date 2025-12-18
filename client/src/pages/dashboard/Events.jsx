import React, { useState, useEffect } from 'react';
import { Calendar, Clock, AlignLeft, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import headerImage from '../../assets/header_events.png';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({ title: '', start_time: '', end_time: '', description: '' });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/events');
            const data = await res.json();
            setEvents(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newEvent)
            });
            if (res.ok) {
                fetchEvents();
                setNewEvent({ title: '', start_time: '', end_time: '', description: '' });
            }
        } catch (err) {
            console.error(err);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(undefined, {
            month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
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
                    <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>Event Schedule</h2>
                    <p style={{ margin: '0.5rem 0 0', opacity: 0.8 }}>Plan and organize your upcoming events.</p>
                </div>
            </div>

            <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #E2E8F0', background: 'white' }}>
                <h4 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#64748B' }}>Plan New Event</h4>
                <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ display: 'block', fontSize: '0.9rem', color: '#64748B', marginBottom: '0.5rem' }}>Title</label>
                        <div style={{ position: 'relative' }}>
                            <Calendar size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94A3B8' }} />
                            <input
                                value={newEvent.title}
                                onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                                required
                                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1' }}
                                placeholder="Product Launch"
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', color: '#64748B', marginBottom: '0.5rem' }}>Start Time</label>
                        <input
                            type="datetime-local"
                            value={newEvent.start_time}
                            onChange={e => setNewEvent({ ...newEvent, start_time: e.target.value })}
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', color: '#64748B', marginBottom: '0.5rem' }}>End Time</label>
                        <input
                            type="datetime-local"
                            value={newEvent.end_time}
                            onChange={e => setNewEvent({ ...newEvent, end_time: e.target.value })}
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1' }}
                        />
                    </div>

                    <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ display: 'block', fontSize: '0.9rem', color: '#64748B', marginBottom: '0.5rem' }}>Description</label>
                        <div style={{ position: 'relative' }}>
                            <AlignLeft size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94A3B8' }} />
                            <input
                                value={newEvent.description}
                                onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1' }}
                                placeholder="Details about the event..."
                            />
                        </div>
                    </div>

                    <div style={{ gridColumn: '1 / -1' }}>
                        <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Plus size={18} /> Create Event
                        </button>
                    </div>
                </form>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {events.map((e, i) => (
                    <motion.div
                        key={e.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="card"
                        style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        <div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.25rem' }}>{e.title}</div>
                            <div style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                                <Clock size={14} />
                                {formatDate(e.start_time)} — {formatDate(e.end_time)}
                            </div>
                        </div>
                        {e.description && (
                            <div style={{ background: '#F1F5F9', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.9rem', color: '#64748B' }}>
                                {e.description}
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Events;
