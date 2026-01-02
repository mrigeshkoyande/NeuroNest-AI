import React, { useState } from 'react'
import { useHabits } from '../hooks/useApi'
import { badges } from '../data/mockData'
import { Award, Plus, Loader } from 'lucide-react'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function HabitRing({ pct, color, size = 60 }) {
    const r = (size - 10) / 2
    const circ = 2 * Math.PI * r
    const dash = (pct / 100) * circ
    return (
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={6} />
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={6}
                strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
                style={{ transition: 'stroke-dasharray 1s cubic-bezier(0.4,0,0.2,1)' }} />
        </svg>
    )
}

function HabitCard({ habit, onLog }) {
    const today = habit.values?.length ? habit.values[habit.values.length - 1] : 0
    const pct = Math.min(100, Math.round((today / habit.target) * 100))
    const avg = habit.values?.length ? +(habit.values.reduce((s, v) => s + v, 0) / habit.values.length).toFixed(1) : 0
    const todayDate = new Date().toISOString().split('T')[0]
    const [inputVal, setInputVal] = useState('')
    const [saving, setSaving] = useState(false)

    const handleLog = async () => {
        const val = parseFloat(inputVal)
        if (isNaN(val)) return
        setSaving(true)
        try { await onLog(habit.id, todayDate, val); setInputVal('') }
        finally { setSaving(false) }
    }

    // Use the habit.logs for the bar chart (last 7 entries)
    const barValues = habit.values ?? []

    return (
        <div className="glass-card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 24 }}>{habit.icon}</span>
                <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{habit.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Target: {habit.target} {habit.unit}/day</div>
                </div>
                <div style={{ position: 'relative', width: 60, height: 60 }}>
                    <HabitRing pct={pct} color={habit.color} />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: habit.color }}>
                        {pct}%
                    </div>
                </div>
            </div>

            {/* Mini bars */}
            <div style={{ display: 'flex', gap: 3, marginBottom: 12 }}>
                {barValues.map((v, i) => {
                    const barPct = Math.min(100, (v / habit.target) * 100)
                    return (
                        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                            <div style={{ width: '100%', height: 50, display: 'flex', alignItems: 'flex-end', borderRadius: 4, overflow: 'hidden', background: 'rgba(255,255,255,0.04)' }}>
                                <div style={{ width: '100%', height: `${barPct}%`, background: habit.color, opacity: i === barValues.length - 1 ? 1 : 0.5, borderRadius: 3, transition: 'height 0.8s ease' }} />
                            </div>
                            <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>{days[i] ?? '?'}</span>
                        </div>
                    )
                })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 10 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Today: <strong style={{ color: habit.color }}>{today} {habit.unit}</strong></span>
                <span style={{ color: 'var(--text-secondary)' }}>Avg: <strong>{avg} {habit.unit}</strong></span>
            </div>

            {/* Log today's value */}
            <div style={{ display: 'flex', gap: 6 }}>
                <input type="number" className="input-field" placeholder={`Log today (${habit.unit})`}
                    value={inputVal} onChange={e => setInputVal(e.target.value)} min={0} step={0.5}
                    style={{ padding: '6px 10px', fontSize: 12 }} />
                <button className="btn btn-ghost btn-xs" onClick={handleLog} disabled={saving || !inputVal}>
                    {saving ? <Loader size={11} className="spin" /> : <Plus size={11} />}
                </button>
            </div>
        </div>
    )
}

export default function HabitTracker() {
    const { habits, loading, logDay } = useHabits()
    const overallStreak = 12
    const weeklyScore = 76

    if (loading) return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '40px 0' }}>
            <Loader size={18} className="spin" color="var(--accent-blue)" /> <span style={{ color: 'var(--text-secondary)' }}>Loading habits…</span>
        </div>
    )

    return (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="section-header">
                <div>
                    <h1 className="section-title">Habit & Activity Tracker</h1>
                    <p className="section-subtitle">Daily values saved automatically — log each habit below</p>
                </div>
            </div>

            {/* Top stats */}
            <div className="grid-4">
                {[
                    { icon: '🔥', label: 'Current Streak', value: overallStreak, unit: ' days', color: '#f59e0b' },
                    { icon: '⭐', label: 'Weekly Score', value: weeklyScore, unit: '%', color: '#3b82f6' },
                    { icon: '🎯', label: 'Habits On Track', value: habits.filter(h => { const v = h.values?.[h.values.length - 1] ?? 0; return v >= h.target }).length, unit: `/${habits.length}`, color: '#10b981' },
                    { icon: '🏆', label: 'Badges Earned', value: badges.length, unit: '', color: '#8b5cf6' },
                ].map(({ icon, label, value, unit, color }) => (
                    <div key={label} className="glass-card" style={{ padding: 20, textAlign: 'center' }}>
                        <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
                        <div style={{ fontSize: 28, fontWeight: 900, color, fontFamily: 'var(--font-heading)' }}>
                            {value}<span style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-secondary)' }}>{unit}</span>
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>{label}</div>
                    </div>
                ))}
            </div>

            <div className="grid-2">
                {habits.map(h => <HabitCard key={h.id} habit={h} onLog={logDay} />)}
            </div>

            {/* Badges */}
            <div className="glass-card" style={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <Award size={16} color="var(--accent-orange)" /><h3 style={{ fontSize: 15, fontWeight: 700 }}>Achievement Badges</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
                    {badges.map(b => (
                        <div key={b.id} className={`streak-badge ${b.type}`}>
                            <div style={{ fontSize: 28 }}>{b.icon}</div>
                            <div style={{ fontSize: 12, fontWeight: 700, textAlign: 'center' }}>{b.name}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center' }}>{b.desc}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* AI insights */}
            <div className="glass-card" style={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <span style={{ fontSize: 16 }}>🧠</span><h3 style={{ fontSize: 15, fontWeight: 700 }}>AI Habit Insights</h3>
                </div>
                {[
                    { icon: '💪', text: 'Exercise consistency has improved 40% over 2 weeks. Keep it up!' },
                    { icon: '😴', text: 'Your sleep average is below the 8h target. Prioritize sleep this week.' },
                    { icon: '☕', text: 'You take fewer breaks on deadline days. Set a timer to remind yourself.' },
                    { icon: '📚', text: 'Best study streaks happen when you start before 10 AM.' },
                ].map((ins, i) => (
                    <div key={i} className="insight-card" style={{ marginBottom: 8 }}>
                        <span className="insight-icon">{ins.icon}</span>
                        <span style={{ fontSize: 13 }}>{ins.text}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
