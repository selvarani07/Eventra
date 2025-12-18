import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Mail, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

import heroImage from '../../assets/hero_illustration.png';

const Profile = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {/* Header */}
            <div style={{
                height: '200px',
                borderRadius: '1.5rem',
                background: 'linear-gradient(to right, #0F172A, #334155)',
                marginBottom: '-60px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: `url(${heroImage}) center/cover`, opacity: 0.1 }} />
            </div>

            <div style={{ padding: '0 2rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2rem' }}>
                        <div style={{
                            width: '120px', height: '120px',
                            borderRadius: '50%',
                            background: 'white',
                            padding: '4px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}>
                            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <User size={64} color="#94A3B8" />
                            </div>
                        </div>
                        <div style={{ paddingBottom: '1rem' }}>
                            <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, color: 'var(--color-primary)' }}>Admin User</h2>
                            <span style={{ color: '#64748B' }}>System Administrator</span>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="btn"
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            background: '#FEE2E2', color: '#DC2626', border: 'none',
                            padding: '0.75rem 1.5rem', fontWeight: 600,
                            marginBottom: '1rem'
                        }}
                    >
                        <LogOut size={18} /> Sign Out
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {/* Personal Info Card */}
                    <div className="card" style={{ padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid #E2E8F0' }}>
                        <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#475569' }}>Account Details</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label style={{ fontSize: '0.85rem', color: '#94A3B8', display: 'block', marginBottom: '0.5rem' }}>Full Name</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-primary)', fontWeight: 500 }}>
                                    <User size={18} color="#64748B" /> Admin User
                                </div>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.85rem', color: '#94A3B8', display: 'block', marginBottom: '0.5rem' }}>Email Address</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-primary)', fontWeight: 500 }}>
                                    <Mail size={18} color="#64748B" /> admin@eventra.com
                                </div>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.85rem', color: '#94A3B8', display: 'block', marginBottom: '0.5rem' }}>Role</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-primary)', fontWeight: 500 }}>
                                    <Shield size={18} color="#64748B" /> Super Admin
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Profile;
