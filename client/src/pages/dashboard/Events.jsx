import React, { useState, useEffect } from 'react';

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
            // Simple validation or formatting if needed. HTML datetime-local provides ISO-ish format
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

    return (
        <div>
            <h3 style={{ color: 'var(--color-primary)' }}>Manage Events</h3>

            <div className="card" style={{ marginBottom: '2rem' }}>
                <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ gridColumn: '1 / -1' }}>
                        <label>Event Title</label>
                        <input
                            value={newEvent.title}
                            onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label>Start Time</label>
                        <input
                            type="datetime-local"
                            value={newEvent.start_time}
                            onChange={e => setNewEvent({ ...newEvent, start_time: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label>End Time</label>
                        <input
                            type="datetime-local"
                            value={newEvent.end_time}
                            onChange={e => setNewEvent({ ...newEvent, end_time: e.target.value })}
                            required
                        />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                        <label>Description</label>
                        <input
                            value={newEvent.description}
                            onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
                        />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                        <button type="submit" className="btn btn-primary">Create Event</button>
                    </div>
                </form>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {events.map(e => (
                    <div key={e.id} className="card">
                        <div style={{ fontWeight: 'bold' }}>{e.title}</div>
                        <div style={{ fontSize: '0.9rem' }}>
                            {new Date(e.start_time).toLocaleString()} - {new Date(e.end_time).toLocaleString()}
                        </div>
                        <div style={{ color: '#666' }}>{e.description}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;
