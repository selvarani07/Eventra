import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ShieldCheck, BarChart4, ChevronRight } from 'lucide-react';
import heroImage from '../assets/hero_illustration.png';

const Landing = () => {
    return (
        <div className="landing-page" style={{ overflowX: 'hidden' }}>
            {/* Hero Section */}
            <section style={{
                minHeight: '90vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle at top right, #1E293B 0%, #0F172A 100%)',
                color: 'white',
                padding: '2rem',
                position: 'relative'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '4rem',
                    alignItems: 'center',
                    zIndex: 1
                }}>
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div style={{
                            display: 'inline-block',
                            background: 'rgba(45, 212, 191, 0.1)',
                            color: 'var(--color-accent)',
                            padding: '0.5rem 1rem',
                            borderRadius: '2rem',
                            fontWeight: 600,
                            marginBottom: '1.5rem',
                            fontSize: '0.9rem'
                        }}>
                            ✨ Seamless Resource Management
                        </div>

                        <h1 style={{
                            fontSize: '3.5rem',
                            lineHeight: 1.1,
                            marginBottom: '1.5rem',
                            fontWeight: 800,
                            background: 'linear-gradient(to right, #fff, #94A3B8)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            Orchestrate Events <br />
                            <span style={{ color: 'var(--color-accent)', WebkitTextFillColor: 'var(--color-accent)' }}>Without Conflicts.</span>
                        </h1>

                        <p style={{
                            fontSize: '1.125rem',
                            marginBottom: '2.5rem',
                            color: '#94A3B8',
                            lineHeight: 1.6,
                            maxWidth: '500px'
                        }}>
                            The intelligent platform for scheduling events, allocating resources, and generating insights—all in one place.
                        </p>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link to="/register" className="btn btn-primary" style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '1.1rem',
                                padding: '1rem 2rem',
                                boxShadow: '0 0 20px rgba(45, 212, 191, 0.3)'
                            }}>
                                Get Started <ChevronRight size={20} />
                            </Link>
                            <Link to="/login" className="btn" style={{
                                background: 'rgba(255,255,255,0.05)',
                                color: 'white',
                                border: '1px solid rgba(255,255,255,0.1)',
                                padding: '1rem 2rem'
                            }}>
                                Log In
                            </Link>
                        </div>
                    </motion.div>

                    {/* Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ position: 'relative' }}
                    >
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '120%',
                            height: '120%',
                            background: 'radial-gradient(circle, rgba(45, 212, 191, 0.2) 0%, transparent 70%)',
                            filter: 'blur(60px)',
                            zIndex: -1
                        }} />
                        <img
                            src={heroImage}
                            alt="Dashboard Preview"
                            style={{
                                width: '100%',
                                height: 'auto',
                                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
                                borderRadius: '1rem'
                            }}
                        />
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section style={{ padding: '6rem 2rem', background: '#F8FAFC' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary)', fontWeight: 800 }}>
                            Why Choose Eventra?
                        </h2>
                        <p style={{ color: '#64748B', fontSize: '1.1rem' }}>Everything you need to manage your organization's schedule efficiently.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <FeatureCard
                            icon={<ShieldCheck size={32} color="var(--color-accent)" />}
                            title="ConflictGuard™ Technology"
                            desc="Our advanced algorithms automatically detect and prevent double-booking of rooms and instructors, ensuring zero scheduling clashes."
                            delay={0}
                        />
                        <FeatureCard
                            icon={<Calendar size={32} color="#F59E0B" />}
                            title="Unified Resource Hub"
                            desc="Manage rooms, equipment, and personnel in a single, intuitive dashboard. Track availability in real-time."
                            delay={0.1}
                        />
                        <FeatureCard
                            icon={<BarChart4 size={32} color="#3B82F6" />}
                            title="Deep Usage Insights"
                            desc="Visualize resource utilization with comprehensive reports. Identify bottlenecks and optimize allocation strategies."
                            delay={0.2}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="card"
        style={{
            padding: '2rem',
            background: 'white',
            border: '1px solid #E2E8F0',
            transition: 'transform 0.3s ease',
            cursor: 'default'
        }}
        whileHover={{ y: -10, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
    >
        <div style={{
            background: '#F1F5F9',
            width: '60px',
            height: '60px',
            borderRadius: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem'
        }}>
            {icon}
        </div>
        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 700 }}>{title}</h3>
        <p style={{ color: '#64748B', lineHeight: '1.6' }}>{desc}</p>
    </motion.div>
);

export default Landing;
