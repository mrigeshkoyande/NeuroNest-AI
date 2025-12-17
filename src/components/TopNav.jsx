import React from 'react'
import { Brain, Bell, Search, Zap, User } from 'lucide-react'

export default function TopNav({ currentPage, setCurrentPage }) {
    return (
        <nav className="top-nav">
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '100%',
                padding: '0 24px',
                maxWidth: '100%',
            }}>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
                    onClick={() => setCurrentPage('dashboard')}>
                    <div style={{
                        width: 34, height: 34, borderRadius: 10,
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 15px rgba(59,130,246,0.4)',
                    }}>
                        <Brain size={18} color="white" />
                    </div>
                    <div>
                        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 16, lineHeight: 1 }}>
                            Neuro<span className="gradient-text">Nest</span>
                        </div>
                        <div style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1, marginTop: 2 }}>AI Student Companion</div>
                    </div>
                </div>

                {/* Search */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--border)',
                    borderRadius: 10, padding: '7px 14px',
                    minWidth: 260, cursor: 'text',
                }}>
                    <Search size={14} color="var(--text-muted)" />
                    <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>Search tasks, subjects, insights…</span>
                    <span style={{
                        marginLeft: 'auto', fontSize: 11, color: 'var(--text-muted)',
                        background: 'rgba(255,255,255,0.06)', padding: '1px 6px', borderRadius: 4
                    }}>⌘K</span>
                </div>

                {/* Right actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {/* AI status chip */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)',
                        borderRadius: 99, padding: '5px 12px',
                    }}>
                        <div className="pulse-dot" style={{ background: '#22c55e' }} />
                        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-blue-light)' }}>AI Active</span>
                    </div>

                    {/* Notification bell */}
                    <button style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', position: 'relative', color: 'var(--text-secondary)',
                    }}>
                        <Bell size={16} />
                        <span style={{
                            position: 'absolute', top: 6, right: 6,
                            width: 7, height: 7, borderRadius: '50%',
                            background: 'var(--accent-red)', border: '1px solid var(--bg-primary)',
                        }} />
                    </button>

                    {/* Zap / boost */}
                    <button style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', color: '#fbbf24',
                    }}>
                        <Zap size={16} />
                    </button>

                    {/* Avatar */}
                    <div style={{
                        width: 34, height: 34, borderRadius: 10,
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 13, fontWeight: 700, color: 'white',
                        cursor: 'pointer', flexShrink: 0,
                    }}>
                        SR
                    </div>
                </div>
            </div>
        </nav>
    )
}
