import React, { useState, useEffect } from 'react';

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

    return (
        <div>
            <h3 style={{ color: 'var(--color-primary)' }}>Manage Resources</h3>

            <div className="card" style={{ marginBottom: '2rem' }}>
                <form onSubmit={handleAdd} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
                    <div style={{ flex: 1 }}>
                        <label>Resource Name</label>
                        <input
                            value={newRes.name}
                            onChange={e => setNewRes({ ...newRes, name: e.target.value })}
                            required
                        />
                    </div>
                    <div style={{ width: '150px' }}>
                        <label>Type</label>
                        <select
                            value={newRes.type}
                            onChange={e => setNewRes({ ...newRes, type: e.target.value })}
                        >
                            <option>Room</option>
                            <option>Instructor</option>
                            <option>Equipment</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Add New</button>
                </form>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {resources.map(r => (
                    <div key={r.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
                        <div>
                            <div style={{ fontWeight: 'bold' }}>{r.name}</div>
                            <div style={{ fontSize: '0.9rem', color: '#666' }}>{r.type}</div>
                        </div>
                        {/* Delete button could go here */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Resources;
