import React, { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Plus, Brain, Heart, Loader } from 'lucide-react'
import { useMoodLogs } from '../hooks/useApi'

const moods = [
    { emoji: '🤩', label: 'Amazing', score: 10 },
    { emoji: '😊', label: 'Good', score: 8 },
    { emoji: '😌', label: 'Calm', score: 6 },
    { emoji: '😐', label: 'Okay', score: 5 },
    { emoji: '😔', label: 'Low', score: 3 },
    { emoji: '😤', label: 'Stressed', score: 2 },
    { emoji: '😠', label: 'Frustrated', score: 1 },
]

const wellbeingInsights = [
    { icon: '😰', text: 'You had a rough patch mid-week. Stress was above 7/10.' },
    { icon: '📈', text: 'Mood improved after completing your DB project. Celebrating wins helps!' },
    { icon: '💤', text: 'Low mood correlates with poor sleep. Protect your sleep schedule.' },
    { icon: '🧘', text: 'Consider mindfulness or light exercise. Your stress is mid-range.' },
]

export default function MoodTracker() {
    const { moodLogs, loading, logMood } = useMoodLogs()
    const [selectedMood, setSelectedMood] = useState(null)
    const [energy, setEnergy] = useState(7)
    const [note, setNote] = useState('')
    const [logged, setLogged] = useState(false)
    const [saving, setSaving] = useState(false)

    const chartData = moodLogs.map(l => ({
        date: l.date.slice(5), mood: l.moodScore, energy: l.energy, stress: l.stress,
    }))

    const todayStr = new Date().toISOString().split('T')[0]

    const handleLog = async () => {
        if (!selectedMood) return
        setSaving(true)
        try {
            await logMood({
                date: todayStr,
                mood: selectedMood.emoji,
                moodScore: selectedMood.score,
                energy,
                note: note || 'Mood logged today.',
                stress: 10 - energy,
            })
            setLogged(true)
        } finally { setSaving(false) }
    }

    const avgMood = moodLogs.length ? (moodLogs.reduce((s, l) => s + l.moodScore, 0) / moodLogs.length).toFixed(1) : '—'
    const avgEnergy = moodLogs.length ? (moodLogs.reduce((s, l) => s + l.energy, 0) / moodLogs.length).toFixed(1) : '—'
    const bestDay = moodLogs.length ? moodLogs.reduce((a, b) => a.moodScore > b.moodScore ? a : b) : null
    const worstDay = moodLogs.length ? moodLogs.reduce((a, b) => a.moodScore < b.moodScore ? a : b) : null

    if (loading) return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '40px 0' }}>
            <Loader size={18} className="spin" color="var(--accent-blue)" /> <span style={{ color: 'var(--text-secondary)' }}>Loading mood history…</span>
        </div>
    )

    return (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="section-header">
                <div>
                    <h1 className="section-title">Mood & Mental Health Tracker</h1>
                    <p className="section-subtitle">Your wellbeing data is saved automatically</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {/* Log form */}
                    <div className="glass-card" style={{ padding: 24 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Heart size={15} color="var(--accent-pink)" /> How are you feeling today?
                        </h3>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
                            {moods.map(m => (
                                <div key={m.emoji} className={`mood-emoji ${selectedMood?.emoji === m.emoji ? 'selected' : ''}`}
                                    onClick={() => { setSelectedMood(m); setLogged(false) }} title={m.label}>{m.emoji}</div>
                            ))}
                        </div>
                        {selectedMood && <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
                            Mood: <strong style={{ color: 'var(--text-primary)' }}>{selectedMood.label}</strong> ({selectedMood.score}/10)
                        </div>}
                        <div style={{ marginBottom: 16 }}>
                            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>
                                ⚡ Energy Level: <span style={{ color: 'var(--accent-blue-light)', fontWeight: 700 }}>{energy}/10</span>
                            </label>
                            <input type="range" min={1} max={10} value={energy} onChange={e => setEnergy(+e.target.value)} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                                <span>😴 Drained</span><span>⚡ Energized</span>
                            </div>
                        </div>
                        <div style={{ marginBottom: 16 }}>
                            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>📝 Quick Note (optional)</label>
                            <textarea className="input-field" rows={2} placeholder="What's on your mind today?" value={note} onChange={e => setNote(e.target.value)} style={{ resize: 'vertical', fontFamily: 'inherit' }} />
                        </div>
                        {logged ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 10, color: '#34d399', fontSize: 14, fontWeight: 600 }}>
                                ✅ Mood saved to database! Great job checking in.
                            </div>
                        ) : (
                            <button className="btn btn-primary" onClick={handleLog} disabled={!selectedMood || saving} style={{ justifyContent: 'center' }}>
                                {saving ? <Loader size={14} className="spin" /> : <Plus size={14} />} Log Mood
                            </button>
                        )}
                    </div>

                    {/* Mood chart */}
                    <div className="glass-card" style={{ padding: 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                            <h3 style={{ fontSize: 15, fontWeight: 700 }}>Mood History</h3>
                            <span className="badge badge-purple">{moodLogs.length} entries</span>
                        </div>
                        <ResponsiveContainer width="100%" height={200}>
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="moodGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="10%" stopColor="#ec4899" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                                <YAxis tick={{ fontSize: 10 }} domain={[0, 10]} />
                                <Tooltip />
                                <Area type="monotone" dataKey="mood" name="Mood" stroke="#ec4899" fill="url(#moodGrad)" strokeWidth={2} />
                                <Area type="monotone" dataKey="energy" name="Energy" stroke="#3b82f6" fill="none" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Log history */}
                    <div className="glass-card" style={{ padding: 20 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Recent Entries</h3>
                        <div className="scroll-list">
                            {[...moodLogs].reverse().map((l, i) => (
                                <div key={l.id ?? i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px 0', borderBottom: i < moodLogs.length - 1 ? '1px solid var(--border)' : 'none' }}>
                                    <span style={{ fontSize: 24 }}>{l.mood}</span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                                            <span style={{ fontWeight: 600, fontSize: 13 }}>{l.date}</span>
                                            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Energy: {l.energy}/10</span>
                                        </div>
                                        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{l.note}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div className="glass-card" style={{ padding: 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                            <Brain size={15} color="var(--accent-blue)" />
                            <h3 style={{ fontSize: 14, fontWeight: 700 }}>AI Wellbeing Insights</h3>
                        </div>
                        {wellbeingInsights.map((ins, i) => (
                            <div key={i} className="insight-card" style={{ marginBottom: 8 }}>
                                <span className="insight-icon">{ins.icon}</span>
                                <span style={{ fontSize: 12 }}>{ins.text}</span>
                            </div>
                        ))}
                    </div>
                    <div className="glass-card" style={{ padding: 20 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Weekly Summary</h3>
                        {[
                            { label: 'Average Mood', val: `${avgMood}/10`, color: 'var(--accent-blue-light)' },
                            { label: 'Average Energy', val: `${avgEnergy}/10`, color: 'var(--accent-cyan)' },
                            { label: 'Total Entries', val: moodLogs.length, color: 'var(--accent-green)' },
                            { label: 'Best Day', val: bestDay ? `${bestDay.date.slice(5)} ${bestDay.mood}` : '—', color: 'var(--accent-green)' },
                            { label: 'Toughest Day', val: worstDay ? `${worstDay.date.slice(5)} ${worstDay.mood}` : '—', color: 'var(--accent-red)' },
                        ].map(({ label, val, color }) => (
                            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 13 }}>
                                <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                                <span style={{ fontWeight: 700, color }}>{val}</span>
                            </div>
                        ))}
                    </div>
                    <div className="glass-card" style={{ padding: 20 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Mood Distribution</h3>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {moodLogs.map((l, i) => <div key={i} title={l.date} style={{ fontSize: 22 }}>{l.mood}</div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
