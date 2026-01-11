import React, { useState, useEffect } from 'react'
import { agents } from '../data/mockData'
import { Cpu, ArrowRight, Zap } from 'lucide-react'

function AgentCard({ agent, active, delay }) {
    const [lit, setLit] = useState(false)
    useEffect(() => {
        const t = setTimeout(() => setLit(true), delay)
        return () => clearTimeout(t)
    }, [delay])

    return (
        <div className="glass-card" style={{
            padding: 20, border: lit ? `1px solid ${agent.color}40` : '1px solid var(--border)',
            boxShadow: lit ? `0 0 20px ${agent.color}20` : '',
            transition: 'all 0.6s ease', opacity: lit ? 1 : 0.5,
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    background: `${agent.color}18`,
                    border: `1px solid ${agent.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                }}>
                    {agent.icon}
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{agent.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                        <div className="pulse-dot" style={{ background: '#22c55e' }} />
                        <span style={{ fontSize: 11, color: '#22c55e', fontWeight: 600 }}>Online</span>
                    </div>
                </div>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12, lineHeight: 1.6 }}>
                {agent.description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {agent.tasks.map(t => (
                    <span key={t} style={{
                        fontSize: 11, padding: '2px 8px', borderRadius: 99,
                        background: `${agent.color}15`, color: agent.color, fontWeight: 600,
                    }}>
                        {t}
                    </span>
                ))}
            </div>
        </div>
    )
}

const flowSteps = [
    { icon: '👤', label: 'Student Input', desc: 'Tasks, mood, deadlines, questions', color: '#3b82f6' },
    { icon: '⚙️', label: 'AI Agents Analyze', desc: '5 specialized agents process data', color: '#8b5cf6' },
    { icon: '💡', label: 'Insights Generated', desc: 'Personalized recommendations', color: '#06b6d4' },
    { icon: '📊', label: 'Dashboard Updates', desc: 'Real-time UI reflects insights', color: '#10b981' },
]

export default function AgentsPage() {
    return (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="section-header">
                <div>
                    <h1 className="section-title">
                        <span className="gradient-text">Multi-Agent AI System</span>
                    </h1>
                    <p className="section-subtitle">5 specialized AI agents working in harmony to support your student life</p>
                </div>
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)',
                    borderRadius: 99, padding: '6px 14px'
                }}>
                    <div className="pulse-dot" style={{ background: '#22c55e' }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#86efac' }}>All Systems Online</span>
                </div>
            </div>

            {/* Flow diagram */}
            <div className="glass-card" style={{ padding: 28 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>
                    How the AI System Works
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, flexWrap: 'wrap' }}>
                    {flowSteps.map((step, i) => (
                        <React.Fragment key={i}>
                            <div style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                                padding: '16px 20px', borderRadius: 16, minWidth: 130,
                                background: `${step.color}10`, border: `1px solid ${step.color}30`,
                            }}>
                                <div style={{ fontSize: 36 }}>{step.icon}</div>
                                <div style={{ fontSize: 13, fontWeight: 700, textAlign: 'center', color: step.color }}>{step.label}</div>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.4 }}>{step.desc}</div>
                            </div>
                            {i < flowSteps.length - 1 && (
                                <div style={{ padding: '0 12px' }}>
                                    <ArrowRight size={20} color="var(--text-muted)" />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Agent cards */}
            <div className="grid-auto">
                {agents.map((agent, i) => (
                    <AgentCard key={agent.id} agent={agent} active delay={i * 150} />
                ))}
            </div>

            {/* Architecture visual */}
            <div className="glass-card" style={{ padding: 28 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Agent Collaboration Architecture</h3>
                <div style={{ position: 'relative', minHeight: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Central hub */}
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 90, height: 90, borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(139,92,246,0.3))',
                        border: '2px solid rgba(59,130,246,0.5)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        zIndex: 2, boxShadow: '0 0 40px rgba(59,130,246,0.3)',
                        animation: 'float 3s ease-in-out infinite',
                    }}>
                        <Cpu size={28} color="#60a5fa" />
                        <span style={{ fontSize: 9, color: '#60a5fa', fontWeight: 700, marginTop: 4 }}>AI CORE</span>
                    </div>

                    {/* Orbiting agents */}
                    {agents.map((agent, i) => {
                        const angle = (i / agents.length) * 2 * Math.PI - Math.PI / 2
                        const rx = 150, ry = 100
                        const x = Math.cos(angle) * rx
                        const y = Math.sin(angle) * ry
                        return (
                            <div key={agent.id} style={{
                                position: 'absolute',
                                left: '50%', top: '50%',
                                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                            }}>
                                <div style={{
                                    width: 44, height: 44, borderRadius: 12,
                                    background: `${agent.color}18`, border: `1.5px solid ${agent.color}50`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                                    boxShadow: `0 0 12px ${agent.color}30`,
                                }}>
                                    {agent.icon}
                                </div>
                                <span style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 600, whiteSpace: 'nowrap', maxWidth: 90, textAlign: 'center' }}>
                                    {agent.name.split(' ')[0]}
                                </span>
                            </div>
                        )
                    })}
                </div>
                <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)', marginTop: 16 }}>
                    All agents share a common context store and coordinate via an event bus, producing holistic recommendations.
                </p>
            </div>

            {/* Team footer */}
            <div className="glass-card" style={{ padding: 28, background: 'linear-gradient(135deg, rgba(59,130,246,0.06), rgba(139,92,246,0.04))' }}>
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '1px' }}>
                        🏆 Hackathon Project
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 900 }}>
                        Productivity Dashboard – AI-Powered Student Life Companion
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', marginTop: 8, fontSize: 14 }}>
                        A next-generation multi-agent AI platform for holistic student success
                    </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
                    {[
                        { role: 'Team Leader', name: 'Soham Rathi', icon: '👑' },
                        { role: 'Team Member', name: 'Mrigesh Koyande', icon: '⭐' },
                        { role: 'Team Member', name: 'Tirtha Pawar', icon: '⭐' },
                    ].map(({ role, name, icon }) => (
                        <div key={name} style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
                            <div style={{ fontSize: 14, fontWeight: 700 }}>{name}</div>
                            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{role}</div>
                        </div>
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
                    <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                        <strong style={{ color: 'var(--accent-blue-light)' }}>Team Alpha</strong> · Built with React + Recharts + AI Vision
                    </span>
                </div>
            </div>
        </div>
    )
}
