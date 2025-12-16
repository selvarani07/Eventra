import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section style={{
                minHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                background: 'linear-gradient(180deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                color: 'white',
                padding: '2rem'
            }}>
                <h1 className="animate-fade-in" style={{
                    fontSize: '4rem',
                    marginBottom: '1rem',
                    fontWeight: 800,
                    background: 'linear-gradient(to right, var(--color-accent), var(--color-accent-hover))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Events Managed Perfectly.
                </h1>

                <p className="animate-fade-in" style={{
                    fontSize: '1.25rem',
                    maxWidth: '600px',
                    marginBottom: '2rem',
                    color: '#94A3B8',
                    animationDelay: '0.2s'
                }}>
                    Schedule events, allocate resources, and prevent conflicts with our intelligent management system.
                </p>

                <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <Link to="/register" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                        Get Started Now
                    </Link>
                </div>
            </section>

            {/* Features Grid */}
            <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '3rem', color: 'var(--color-primary)' }}>
                    Why Choose Eventra?
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <FeatureCard
                        title="Conflict Detection"
                        desc="Automatically detect double-booked rooms or instructors before they happen."
                        delay="0s"
                    />
                    <FeatureCard
                        title="Resource Management"
                        desc="Track usage of rooms, equipment, and personnel in one central hub."
                        delay="0.1s"
                    />
                    <FeatureCard
                        title="Insightful Reports"
                        desc="Analyze resource utilization with detailed usage metrics and reports."
                        delay="0.2s"
                    />
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ title, desc, delay }) => (
    <div className="card animate-slide-in" style={{ animationDelay: delay }}>
        <h3 style={{ color: 'var(--color-primary)', marginTop: 0 }}>{title}</h3>
        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>{desc}</p>
    </div>
);

export default Landing;
