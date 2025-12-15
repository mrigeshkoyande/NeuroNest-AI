import React from 'react'
import {
    LayoutDashboard, Calendar, BookOpen, MessageCircle,
    Heart, Activity, BarChart3, Bot, ChevronRight, Cpu
} from 'lucide-react'
import { student } from '../data/mockData'

const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'weekly-plan', label: 'Weekly AI Plan', icon: Calendar },
    { id: 'assignments', label: 'Assignments', icon: BookOpen },
    { id: 'ai-mentor', label: 'AI Mentor', icon: MessageCircle },
    { id: 'mood-tracker', label: 'Mood Tracker', icon: Heart },
    { id: 'habit-tracker', label: 'Habit Tracker', icon: Activity },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'agents', label: 'AI Agents', icon: Cpu },
]

export default function Sidebar({ currentPage, setCurrentPage }) {
    return (
        <aside className="sidebar">
            {/* Student profile */}
            <div style={{
                padding: '12px 14px',
                background: 'rgba(59,130,246,0.06)',
                border: '1px solid rgba(59,130,246,0.15)',
                borderRadius: 'var(--radius-md)',
                marginBottom: 8,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                        width: 36, height: 36, borderRadius: 9,
                        background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 13, fontWeight: 700, color: 'white', flexShrink: 0,
                    }}>
                        {student.avatar}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', truncate: true }}>
                            {student.name}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{student.major} • {student.year}</div>
                    </div>
                </div>

                {/* Streak */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--border)',
                }}>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>🔥 {student.streakDays}-day streak</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#fbbf24' }}>⭐ {student.productivityScore}%</span>
                </div>
            </div>

            {/* Nav items */}
            <div style={{
                fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.8px',
                textTransform: 'uppercase', padding: '4px 6px', marginTop: 8
            }}>
                Navigation
            </div>

            {navItems.map(item => {
                const Icon = item.icon
                const isActive = currentPage === item.id
                return (
                    <button
                        key={item.id}
                        className={`nav-item ${isActive ? 'active' : ''}`}
                        onClick={() => setCurrentPage(item.id)}
                        style={{ width: '100%', textAlign: 'left', background: 'transparent', outline: 'none' }}
                    >
                        <Icon size={16} style={{ flexShrink: 0 }} />
                        <span style={{ flex: 1 }}>{item.label}</span>
                        {isActive && <ChevronRight size={12} style={{ opacity: 0.5 }} />}
                    </button>
                )
            })}

            {/* Bottom spacer + footer */}
            <div style={{ flex: 1 }} />
            <div style={{
                marginTop: 12, padding: '10px 14px', borderRadius: 'var(--radius-md)',
                background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)'
            }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <Bot size={16} color="#a78bfa" />
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#a78bfa' }}>AI Agents Online</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                    5 agents actively monitoring your progress
                </div>
            </div>
        </aside>
    )
}
