import React, { useState, useEffect } from 'react';

const Allocations = () => {
    const [allocations, setAllocations] = useState([]);
    const [resources, setResources] = useState([]);
    const [events, setEvents] = useState([]);

    const [newAlloc, setNewAlloc] = useState({ event_id: '', resource_id: '' });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

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
        setError(null);
        setSuccess(null);

        try {
            const res = await fetch('http://localhost:5000/api/allocations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAlloc)
            });

            const data = await res.json();

            if (!res.ok) {
                if (res.status === 409) {
                    setError(`Conflict! ${data.details}`);
                } else {
                    setError('Allocation failed');
                }
            } else {
                setSuccess('Resource allocated successfully!');
                fetchData();
            }
        } catch (err) {
            setError('Network error');
        }
    };

    return (
        <div>
            <h3 style={{ color: 'var(--color-primary)' }}>Allocate Resources</h3>

            <div className="card" style={{ marginBottom: '2rem' }}>
                {error && <div className="alert" style={{ background: '#FECACA', color: '#991B1B', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>{error}</div>}
                {success && <div className="alert" style={{ background: '#D1FAE5', color: '#065F46', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>{success}</div>}

                <form onSubmit={handleAllocate} style={{ display: 'grid', gap: '1rem' }}>
                    <div>
                        <label>Select Event</label>
                        <select
                            value={newAlloc.event_id}
                            onChange={e => setNewAlloc({ ...newAlloc, event_id: e.target.value })}
                            required
                        >
                            <option value="">-- Choose Event --</option>
                            {events.map(e => (
                                <option key={e.id} value={e.id}>{e.title} ({new Date(e.start_time).toLocaleDateString()})</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Select Resource</label>
                        <select
                            value={newAlloc.resource_id}
                            onChange={e => setNewAlloc({ ...newAlloc, resource_id: e.target.value })}
                            required
                        >
                            <option value="">-- Choose Resource --</option>
                            {resources.map(r => (
                                <option key={r.id} value={r.id}>{r.name} ({r.type})</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary">Allocate</button>
                </form>
            </div>

            <h4>Current Allocations</h4>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
                {allocations.map(a => (
                    <div key={a.id} className="card" style={{ padding: '0.75rem', fontSize: '0.9rem' }}>
                        <strong>{a.event_title}</strong> in <strong>{a.resource_name}</strong>
                        <br />
                        <span style={{ color: '#666' }}>
                            {new Date(a.start_time).toLocaleString()} - {new Date(a.end_time).toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Allocations;
