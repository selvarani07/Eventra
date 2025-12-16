import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav style={{
            backgroundColor: 'var(--color-primary)',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'white',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
                    <span style={{ color: 'var(--color-accent)' }}>Event</span>ra
                </h1>
            </div>

            <div style={{ display: 'flex', gap: '2rem' }}>
                {!token ? (
                    <>
                        <Link to="/" style={linkStyle}>Home</Link>
                        <Link to="/login" style={linkStyle}>Login</Link>
                        <Link to="/register" style={{ ...linkStyle, color: 'var(--color-accent)' }}>Sign Up</Link>
                    </>
                ) : (
                    <>
                        <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
                        <button onClick={handleLogout} style={buttonStyle}>Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
};

const linkStyle = {
    textDecoration: 'none',
    color: 'white',
    fontWeight: 500,
    transition: 'color 0.2s'
};

const buttonStyle = {
    background: 'transparent',
    border: '1px solid var(--color-accent)',
    color: 'var(--color-accent)',
    padding: '0.4rem 1rem',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    fontWeight: 600
};

export default Navbar;
