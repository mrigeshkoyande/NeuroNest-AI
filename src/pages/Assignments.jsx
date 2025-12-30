import React, { useState } from 'react'
import { Plus, CheckCircle2, Trash2, Brain, AlertTriangle, Loader } from 'lucide-react'
import { useAssignments } from '../hooks/useApi'

const priorities = ['high', 'medium', 'low']
const subjects = ['CS301', 'MATH201', 'CS401', 'ENG102', 'PHY201', 'CS302', 'MATH101', 'Other']

const aiAssignmentInsights = [
    { icon: '⚠️', text: 'DS Assignment #4 is only 35% done with 2 days left. Start NOW!' },
    { icon: '🌙', text: 'Best time to work on OS Lab: 7–9 PM (your focus peak evening window).' },
    { icon: '📅', text: 'Your workload peaks Thursday. Split OS report across Wed + Thu.' },
    { icon: '✅', text: 'English Essay is 80% done. One focused session will finish it!' },
]

export default function Assignments() {
    const { assignments, loading, error, add, update, toggle, remove } = useAssignments()
    const [showForm, setShowForm] = useState(false)
    const [saving, setSaving] = useState(false)
    const [form, setForm] = useState({ title: '', subject: 'CS301', deadline: '', priority: 'medium', estimatedHours: 2 })

    const pending = assignments.filter(a => !a.completed)
    const done = assignments.filter(a => a.completed)
    const completionRate = assignments.length ? Math.round((done.length / assignments.length) * 100) : 0

    const handleAdd = async () => {
        if (!form.title || !form.deadline) return
        setSaving(true)
        try {
            await add(form)
            setForm({ title: '', subject: 'CS301', deadline: '', priority: 'medium', estimatedHours: 2 })
            setShowForm(false)
        } finally { setSaving(false) }
    }

    if (loading) return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '40px 0' }}>
            <Loader size={18} className="spin" color="var(--accent-blue)" />
            <span style={{ color: 'var(--text-secondary)' }}>Loading assignments from database…</span>
        </div>
    )

    if (error) return <div style={{ color: 'var(--accent-red)', padding: 20 }}>Error: {error}</div>

    return (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="section-header">
                <div>
                    <h1 className="section-title">Assignment Tracker</h1>
                    <p className="section-subtitle">{pending.length} pending · {done.length} completed · {completionRate}% completion rate</p>
                </div>
                <button className="btn btn-primary btn-sm" onClick={() => setShowForm(v => !v)}>
                    <Plus size={13} /> Add Assignment
                </button>
            </div>

            {showForm && (
                <div className="glass-card fade-in" style={{ padding: 20 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>New Assignment</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px 160px', gap: 12, marginBottom: 12 }}>
                        <input className="input-field" placeholder="Assignment title…" value={form.title}
                            onChange={e => setForm(v => ({ ...v, title: e.target.value }))} />
                        <select className="input-field" value={form.subject}
                            onChange={e => setForm(v => ({ ...v, subject: e.target.value }))}>
                            {subjects.map(s => <option key={s}>{s}</option>)}
                        </select>
                        <input type="date" className="input-field" value={form.deadline}
                            onChange={e => setForm(v => ({ ...v, deadline: e.target.value }))} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '160px 160px 1fr', gap: 12, alignItems: 'center' }}>
                        <select className="input-field" value={form.priority}
                            onChange={e => setForm(v => ({ ...v, priority: e.target.value }))}>
                            {priorities.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)} Priority</option>)}
                        </select>
                        <input type="number" className="input-field" placeholder="Est. hours" min={0.5} max={20} step={0.5}
                            value={form.estimatedHours}
                            onChange={e => setForm(v => ({ ...v, estimatedHours: +e.target.value }))} />
                        <div style={{ display: 'flex', gap: 8 }}>
                            <button className="btn btn-primary btn-sm" onClick={handleAdd} disabled={saving}>
                                {saving ? <Loader size={12} className="spin" /> : <Plus size={12} />} Save
                            </button>
                            <button className="btn btn-ghost btn-sm" onClick={() => setShowForm(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {/* Pending */}
                    <div className="glass-card" style={{ padding: 20 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <AlertTriangle size={14} color="var(--accent-orange)" /> Pending ({pending.length})
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {pending.map(a => (
                                <div key={a.id} className="assignment-item">
                                    <div className="checkbox-custom" onClick={() => toggle(a.id)} style={{ cursor: 'pointer' }} />
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontWeight: 600, fontSize: 14 }}>{a.title}</div>
                                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                                            {a.subject} · Due {a.deadline} · ~{a.estimatedHours}h
                                        </div>
                                        {a.progress > 0 && (
                                            <div style={{ marginTop: 8 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>
                                                    <span>Progress</span><span>{a.progress}%</span>
                                                </div>
                                                <div className="progress-bar">
                                                    <div className="progress-fill" style={{ width: `${a.progress}%`, background: a.progress > 70 ? 'linear-gradient(90deg,#10b981,#06b6d4)' : 'linear-gradient(90deg,#3b82f6,#8b5cf6)' }} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <span className={`badge badge-${a.priority === 'high' ? 'red' : a.priority === 'medium' ? 'orange' : 'green'}`}>{a.priority}</span>
                                        <button onClick={() => remove(a.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 4 }}>
                                            <Trash2 size={13} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {pending.length === 0 && (
                                <div style={{ textAlign: 'center', padding: 24, color: 'var(--text-muted)' }}>
                                    <CheckCircle2 size={32} style={{ display: 'block', margin: '0 auto 8px' }} color="var(--accent-green)" />
                                    All caught up! 🎉
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Completed */}
                    {done.length > 0 && (
                        <div className="glass-card" style={{ padding: 20 }}>
                            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                                <CheckCircle2 size={14} color="var(--accent-green)" /> Completed ({done.length})
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {done.map(a => (
                                    <div key={a.id} className="assignment-item completed">
                                        <CheckCircle2 size={16} color="var(--accent-green)" />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 600, fontSize: 13 }}>{a.title}</div>
                                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{a.subject}</div>
                                        </div>
                                        <button onClick={() => toggle(a.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-blue)', fontSize: 12 }}>Undo</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div className="glass-card" style={{ padding: 20 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Brain size={14} color="var(--accent-blue)" /> AI Insights
                        </h3>
                        {aiAssignmentInsights.map((ins, i) => (
                            <div key={i} className="insight-card" style={{ marginBottom: 8 }}>
                                <span className="insight-icon">{ins.icon}</span>
                                <span style={{ fontSize: 12 }}>{ins.text}</span>
                            </div>
                        ))}
                    </div>
                    <div className="glass-card" style={{ padding: 20 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Completion Rate</h3>
                        <div style={{ textAlign: 'center', marginBottom: 14 }}>
                            <div style={{ fontSize: 44, fontWeight: 900, color: completionRate > 60 ? 'var(--accent-green)' : 'var(--accent-orange)', fontFamily: 'var(--font-heading)' }}>
                                {completionRate}%
                            </div>
                            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{done.length} of {assignments.length} completed</div>
                        </div>
                        <div className="progress-bar" style={{ height: 8 }}>
                            <div className="progress-fill" style={{ width: `${completionRate}%`, background: 'linear-gradient(90deg,#10b981,#06b6d4)' }} />
                        </div>
                        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {priorities.map(p => {
                                const count = assignments.filter(a => a.priority === p && !a.completed).length
                                return (
                                    <div key={p} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13 }}>
                                        <span className={`priority-${p}`} style={{ fontWeight: 600, textTransform: 'capitalize' }}>⬤ {p}</span>
                                        <span style={{ color: 'var(--text-muted)' }}>{count} pending</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
