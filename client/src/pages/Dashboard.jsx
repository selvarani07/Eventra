import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, Users, BarChart3, Hexagon, UserCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Resources from './dashboard/Resources';
import Events from './dashboard/Events';
import Allocations from './dashboard/Allocations';
import Reports from './dashboard/Reports';
import Profile from './dashboard/Profile';

const Dashboard = () => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const navItems = [
        { path: '/dashboard/resources', label: 'Resources', icon: <Users size={20} /> },
        { path: '/dashboard/events', label: 'Events', icon: <Calendar size={20} /> },
        { path: '/dashboard/allocations', label: 'Allocations', icon: <Hexagon size={20} /> },
        { path: '/dashboard/reports', label: 'Insights', icon: <BarChart3 size={20} /> },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC' }}>

            {/* Sidebar */}
            <motion.div
                className="sidebar-glass"
                initial={{ width: '260px' }}
                animate={{ width: collapsed ? '80px' : '260px' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                style={{
                    padding: '2rem 1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'fixed',
                    height: '100vh',
                    color: 'white',
                    zIndex: 10,
                    overflow: 'hidden'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem', paddingLeft: '0.5rem' }}>
                    <div style={{ minWidth: '32px', height: '32px', background: 'var(--color-accent)', borderRadius: '8px' }} />
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.h1
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}
                            >
                                Eventra
                            </motion.h1>
                        )}
                    </AnimatePresence>
                </div>

                {/* Navigation */}
                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {navItems.map(item => {
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                title={collapsed ? item.label : ''}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: collapsed ? 'center' : 'flex-start',
                                    gap: '1rem',
                                    padding: '1rem',
                                    borderRadius: '0.75rem',
                                    textDecoration: 'none',
                                    color: isActive ? 'white' : '#94A3B8',
                                    background: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                                    transition: 'all 0.2s ease',
                                    fontWeight: 500
                                }}
                            >
                                <span style={{ color: isActive ? 'var(--color-accent)' : 'inherit' }}>{item.icon}</span>
                                {!collapsed && (
                                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ whiteSpace: 'nowrap' }}>
                                        {item.label}
                                    </motion.span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Toggle Button */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '32px', height: '32px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#94A3B8',
                        cursor: 'pointer',
                        alignSelf: 'center',
                        marginBottom: '1rem'
                    }}
                >
                    {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>

                {/* Profile Link */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                    <Link
                        to="/dashboard/profile"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: collapsed ? 'center' : 'flex-start',
                            gap: '1rem',
                            padding: '1rem',
                            borderRadius: '0.75rem',
                            textDecoration: 'none',
                            color: location.pathname === '/dashboard/profile' ? 'white' : '#94A3B8',
                            background: location.pathname === '/dashboard/profile' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                        }}
                    >
                        <UserCircle size={24} />
                        {!collapsed && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ overflow: 'hidden' }}>
                                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'white' }}>Admin User</div>
                                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>View Profile</div>
                            </motion.div>
                        )}
                    </Link>
                </div>
            </motion.div>

            {/* Main Content Area */}
            <motion.div
                animate={{ marginLeft: collapsed ? '80px' : '260px' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                style={{ flex: 1, padding: '2rem' }}
            >
                <Routes>
                    <Route path="/" element={<div style={{ color: '#64748B' }}>Select a menu item to manage your organization.</div>} />
                    <Route path="resources" element={<Resources />} />
                    <Route path="events" element={<Events />} />
                    <Route path="allocations" element={<Allocations />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="profile" element={<Profile />} />
                </Routes>
            </motion.div>
        </div>
    );
};

export default Dashboard;
