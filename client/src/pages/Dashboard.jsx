import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Resources from './dashboard/Resources';
import Events from './dashboard/Events';
import Allocations from './dashboard/Allocations';
import Reports from './dashboard/Reports';

const Dashboard = () => {
    const location = useLocation();

    const navItems = [
        { path: '/dashboard/resources', label: 'Resources' },
        { path: '/dashboard/events', label: 'Events' },
        { path: '/dashboard/allocations', label: 'Allocations' },
        { path: '/dashboard/reports', label: 'Reports' },
    ];

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
            <h2 style={{ marginBottom: '2rem', color: 'var(--color-primary)' }}>Dashboard</h2>

            {/* Sub-nav */}
            <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #ddd', paddingBottom: '1rem', marginBottom: '2rem' }}>
                {navItems.map(item => (
                    <Link
                        key={item.path}
                        to={item.path}
                        style={{
                            textDecoration: 'none',
                            color: location.pathname === item.path ? 'var(--color-accent)' : 'var(--color-text-muted)',
                            fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                            paddingBottom: '0.25rem',
                            borderBottom: location.pathname === item.path ? '2px solid var(--color-accent)' : 'none'
                        }}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>

            <Routes>
                <Route path="/" element={<div><h3>Select a tab above to manage your organization.</h3></div>} />
                <Route path="resources" element={<Resources />} />
                <Route path="events" element={<Events />} />
                <Route path="allocations" element={<Allocations />} />
                <Route path="reports" element={<Reports />} />
            </Routes>
        </div>
    );
};

export default Dashboard;
