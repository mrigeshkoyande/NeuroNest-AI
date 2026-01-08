import React, { useState } from 'react'
import { Calendar, Sparkles, RefreshCw, CheckCircle2, Loader } from 'lucide-react'
import { weeklyPlanTemplate } from '../data/mockData'
import { useWeeklyPlan } from '../hooks/useApi'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const typeColors = {
    study: { bg: 'rgba(59,130,246,0.2)', color: '#93c5fd', border: '#3b82f6' },
    health: { bg: 'rgba(16,185,129,0.2)', color: '#6ee7b7', border: '#10b981' },
    personal: { bg: 'rgba(139,92,246,0.2)', color: '#c4b5fd', border: '#8b5cf6' },
    deadline: { bg: 'rgba(245,158,11,0.2)', color: '#fcd34d', border: '#f59e0b' },
}

const planInsights = [
    { icon: '⚡', text: 'You have 3 deadlines between Feb 24–28. Urgent work front-loaded Mon–Tue.' },
    { icon: '🌅', text: 'Your focus peaks 9–11 AM. Deep work sessions scheduled in that window.' },
    { icon: '💪', text: 'Health blocks inserted daily to prevent burnout.' },
    { icon: '🔄', text: 'Weekend allocated for recovery + next-week prep.' },
]

const defaultInputs = {
    subjects: ['Data Structures (CS301)', 'Linear Algebra (MATH201)', 'OS (CS401)', 'English (ENG102)', 'Physics (PHY201)'],
    hours: '6-8', goals: 'Finish 3 assignments, maintain exercise routine, improve sleep', stress: 6,
}

export default function WeeklyPlanner() {
    const { plan: savedPlan, savedInputs, loading: planLoading, savePlan } = useWeeklyPlan()
    const [generated, setGenerated] = useState(false)
    const [generating, setGenerating] = useState(false)
    const [acceptSaving, setAcceptSaving] = useState(false)
    const [selectedDay, setSelectedDay] = useState('Mon')
    const [stressLevel, setStressLevel] = useState(defaultInputs.stress)

    // If we have a saved plan, show it right away on mount
    const showPlan = generated || (savedPlan && !planLoading && Object.keys(savedPlan).length > 0)
    const activePlan = generated ? weeklyPlanTemplate : (savedPlan || weeklyPlanTemplate)

    const handleGenerate = () => {
        setGenerating(true)
        setTimeout(() => { setGenerating(false); setGenerated(true) }, 2800)
    }

    const handleAccept = async () => {
        setAcceptSaving(true)
        try {
            await savePlan(weeklyPlanTemplate, { stress: stressLevel, hours: defaultInputs.hours })
            setGenerated(false)  // switch to "saved" state
        } finally { setAcceptSaving(false) }
    }

    if (planLoading) return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '40px 0' }}>
            <Loader size={18} className="spin" color="var(--accent-blue)" /> <span style={{ color: 'var(--text-secondary)' }}>Loading saved plan…</span>
        </div>
    )

    return (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="section-header">
                <div>
                    <h1 className="section-title"><span className="gradient-text">AI Weekly Life Planner</span></h1>
                    <p className="section-subtitle">
                        {savedPlan && !generated ? '✅ Showing your last saved plan — changes persist automatically' : 'Let AI design your perfect week'}
                    </p>
                </div>
                {showPlan && (
                    <button className="btn btn-ghost btn-sm" onClick={handleGenerate}>
                        <RefreshCw size={13} /> Regenerate
                    </button>
                )}
            </div>

            {!showPlan && !generating ? (
                /* ── Input form ── */
                <div style={{ maxWidth: 700, margin: '0 auto', width: '100%' }}>
                    <div className="glass-card" style={{ padding: 32 }}>
                        <div style={{ textAlign: 'center', marginBottom: 28 }}>
                            <div style={{ width: 72, height: 72, borderRadius: 20, margin: '0 auto 16px', background: 'linear-gradient(135deg,rgba(59,130,246,0.2),rgba(139,92,246,0.2))', border: '1px solid rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>🧠</div>
                            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Generate My Week with AI</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Tell the AI about your week and it'll craft a personalized, balanced schedule.</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                            <div>
                                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>📚 Subjects / Courses</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                    {defaultInputs.subjects.map(s => <span key={s} className="chip active">{s}</span>)}
                                </div>
                            </div>
                            <div>
                                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>⏰ Daily Available Hours</label>
                                <input className="input-field" defaultValue={defaultInputs.hours} style={{ maxWidth: 200 }} />
                            </div>
                            <div>
                                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>
                                    😰 Current Stress Level: <span style={{ color: stressLevel > 7 ? 'var(--accent-red)' : 'var(--accent-orange)' }}>{stressLevel}/10</span>
                                </label>
                                <input type="range" min={1} max={10} value={stressLevel} onChange={e => setStressLevel(+e.target.value)} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}><span>😌 Relaxed</span><span>😰 High Stress</span></div>
                            </div>
                            <button className="btn btn-primary" style={{ marginTop: 8, justifyContent: 'center' }} onClick={handleGenerate}>
                                <Sparkles size={16} /> Generate My AI Week Plan
                            </button>
                        </div>
                    </div>
                </div>

            ) : generating ? (
                /* ── Thinking animation ── */
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400, gap: 24 }}>
                    <div style={{ width: 90, height: 90, borderRadius: 22, background: 'linear-gradient(135deg,rgba(59,130,246,0.2),rgba(139,92,246,0.2))', border: '1px solid rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, animation: 'float 2s ease-in-out infinite' }}>🧠</div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>AI is analyzing your week…</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 16 }}>Balancing deadlines, energy levels, and health needs</div>
                        <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}><div className="thinking-dot" /><div className="thinking-dot" /><div className="thinking-dot" /></div>
                    </div>
                    {['📅 Analyzing 5 upcoming deadlines', '💪 Inserting health recovery blocks', '🎯 Optimizing peak performance windows', '✅ Finalizing your personalized schedule'].map((s, i) => (
                        <div key={i} className="insight-card" style={{ maxWidth: 400, width: '100%', animationDelay: `${i * 0.6}s` }}>
                            <Loader size={14} className="spin" color="var(--accent-blue)" /><span>{s}</span>
                        </div>
                    ))}
                </div>

            ) : (
                /* ── Generated / saved plan ── */
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div style={{ padding: '14px 20px', border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.08)', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                        <CheckCircle2 size={18} color="var(--accent-green)" />
                        <span style={{ fontSize: 14, fontWeight: 600, color: '#34d399' }}>
                            {generated ? 'AI plan generated' : '✅ Plan loaded from database'}
                        </span>
                        <span style={{ fontSize: 13, color: 'var(--text-secondary)', marginLeft: 4 }}>— Optimized for stress level {stressLevel}/10</span>
                    </div>

                    <div className="glass-card" style={{ padding: 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}><span style={{ fontSize: 16 }}>🧠</span><h3 style={{ fontSize: 15, fontWeight: 700 }}>AI Planning Insights</h3></div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {planInsights.map((ins, i) => (
                                <div key={i} className="insight-card"><span className="insight-icon">{ins.icon}</span><span>{ins.text}</span></div>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {days.map(d => (
                            <button key={d} className={`chip ${selectedDay === d ? 'active' : ''}`} onClick={() => setSelectedDay(d)} style={{ fontSize: 13, fontWeight: 700 }}>{d}</button>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>
                        {/* Day detail */}
                        <div className="glass-card" style={{ padding: 20 }}>
                            <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>📅 {selectedDay}'s Plan</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {(activePlan[selectedDay] || []).map((task, i) => {
                                    const tc = typeColors[task.type]
                                    return (
                                        <div key={i} style={{ padding: '10px 12px', borderRadius: 10, background: tc.bg, borderLeft: `3px solid ${tc.border}` }}>
                                            <div style={{ fontSize: 13, fontWeight: 700, color: tc.color }}>{task.title}</div>
                                            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 3 }}>{task.desc}</div>
                                            <div style={{ fontSize: 11, marginTop: 4, opacity: 0.7 }}>⏱ {task.duration}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Full week grid */}
                        <div className="glass-card" style={{ padding: 20 }}>
                            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Full Week Overview</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
                                {days.map(d => (
                                    <div key={d} onClick={() => setSelectedDay(d)} style={{ cursor: 'pointer' }}>
                                        <div style={{ fontSize: 11, fontWeight: 700, color: selectedDay === d ? 'var(--accent-blue)' : 'var(--text-muted)', textAlign: 'center', marginBottom: 6 }}>{d}</div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                            {(activePlan[d] || []).map((task, i) => {
                                                const tc = typeColors[task.type]
                                                return (
                                                    <div key={i} style={{ fontSize: 9, padding: '3px 5px', borderRadius: 4, background: tc.bg, color: tc.color, borderLeft: `2px solid ${tc.border}`, lineHeight: 1.2 }}>
                                                        {task.title.split('(')[0].trim().slice(0, 18)}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Legend */}
                            <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
                                {Object.entries(typeColors).map(([type, c]) => (
                                    <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                        <div style={{ width: 8, height: 8, borderRadius: 2, background: c.border }} />
                                        <span style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'capitalize' }}>{type}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {generated && (
                        <div style={{ display: 'flex', gap: 10 }}>
                            <button className="btn btn-primary btn-sm" onClick={handleAccept} disabled={acceptSaving}>
                                {acceptSaving ? <Loader size={13} className="spin" /> : <CheckCircle2 size={13} />} Accept & Save Plan
                            </button>
                            <button className="btn btn-ghost btn-sm" onClick={handleGenerate}><RefreshCw size={13} /> Regenerate</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
