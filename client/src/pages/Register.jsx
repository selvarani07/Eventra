import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('token', data.token);
                navigate('/dashboard/resources');
            } else {
                setError(data.error || 'Registration failed');
            }
        } catch (err) {
            setError('Network error');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at center, #1E293B 0%, #0F172A 100%)',
            padding: '2rem'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel"
                style={{
                    width: '100%',
                    maxWidth: '420px',
                    padding: '3rem',
                    borderRadius: '1.5rem',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '2rem', color: 'white', marginBottom: '0.5rem' }}>Start your journey</h2>
                    <p style={{ color: '#94A3B8' }}>Create an account to manage your events.</p>
                </div>

                {error && (
                    <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#F87171', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
                        <label style={{ color: '#CBD5E1', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Username</label>
                        <User size={18} style={{ position: 'absolute', top: '38px', left: '12px', color: '#94A3B8' }} />
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                            style={{
                                width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                                borderRadius: '0.5rem', border: '1px solid #334155',
                                background: 'rgba(15, 23, 42, 0.5)', color: 'white'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '2rem', position: 'relative' }}>
                        <label style={{ color: '#CBD5E1', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Password</label>
                        <Lock size={18} style={{ position: 'absolute', top: '38px', left: '12px', color: '#94A3B8' }} />
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            style={{
                                width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                                borderRadius: '0.5rem', border: '1px solid #334155',
                                background: 'rgba(15, 23, 42, 0.5)', color: 'white'
                            }}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1rem', boxShadow: '0 0 15px rgba(45, 212, 191, 0.2)' }}>
                        Sign Up
                    </button>
                </form>

                <div style={{ marginTop: '2rem', textAlign: 'center', color: '#94A3B8', fontSize: '0.9rem' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Login here</Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
