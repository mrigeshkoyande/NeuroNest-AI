import React, { useState } from 'react'
import {
    AreaChart, Area, BarChart, Bar, LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import {
    Zap, CheckSquare, Clock, Target, SmilePlus,
    TrendingUp, Plus, Brain, Calendar, MessageCircle, Loader,
} from 'lucide-react'
import { useStudent, useAssignments, useMoodLogs } from '../hooks/useApi'
import { weeklyProductivity, aiInsights } from '../data/mockData'

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null
    return (
        <div style={{ background: '#0d1f3c', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 10, padding: '8px 12px', fontSize: 12 }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: 4 }}>{label}</p>
            {payload.map((p, i) => <p key={i} style={{ color: p.color, fontWeight: 600 }}>{p.name}: {p.value}</p>)}
        </div>
    )
}

function StatCard({ icon: Icon, label, value, unit, change, changeDir, glowColor }) {
    return (
        <div className="glass-card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: `rgba(${glowColor},0.15)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={18} color={`rgb(${glowColor})`} />
                </div>
                {change && <span className={`stat-change ${changeDir}`}>{changeDir === 'up' ? '↑' : '↓'} {change}</span>}
            </div>
            <div className="stat-value" style={{ fontSize: 28 }}>{value}<span style={{ fontSize: 16, fontWeight: 500, color: 'var(--text-muted)', marginLeft: 2 }}>{unit}</span></div>
            <div className="stat-label">{label}</div>
        </div>
    )
}

function LoadingSkeleton() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[1, 2, 3].map(i => (
                <div key={i} className="glass-card shimmer" style={{ height: 80, borderRadius: 12 }} />
            ))}
        </div>
    )
}

export default function Dashboard({ setCurrentPage }) {
    const { student, loading: sLoading } = useStudent()
    const { assignments, loading: aLoading } = useAssignments()
    const { moodLogs, loading: mLoading } = useMoodLogs()

    const loading = sLoading || aLoading || mLoading

    if (loading) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '20px 0' }}>
                    <Loader size={18} className="spin" color="var(--accent-blue)" />
                    <span style={{ color: 'var(--text-secondary)' }}>Loading your dashboard…</span>
                </div>
                <LoadingSkeleton />
            </div>
        )
    }

    const pending = assignments.filter(a => !a.completed)
    const urgent = assignments.filter(a => !a.completed && a.priority === 'high')
    const todayMood = moodLogs.length ? moodLogs[moodLogs.length - 1] : null
    const moodChartData = moodLogs.map(m => ({ date: m.date.slice(5), mood: m.moodScore, stress: m.stress }))
    const firstName = student?.name?.split(' ')[0] ?? 'Student'

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }} className="fade-in">
            {/* Header */}
            <div className="section-header">
                <div>
                    <h1 className="section-title">
                        Good afternoon, <span className="gradient-text">{firstName}</span> 👋
                    </h1>
                    <p className="section-subtitle">Here's your productivity snapshot · Data synced live</p>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button className="btn btn-primary btn-sm" onClick={() => setCurrentPage('ai-mentor')}><MessageCircle size={13} /> Ask AI Mentor</button>
                    <button className="btn btn-ghost btn-sm" onClick={() => setCurrentPage('weekly-plan')}><Calendar size={13} /> Generate Week Plan</button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid-4 fade-in-delay-1">
                <StatCard icon={Target} label="Pending Tasks" value={pending.length} unit="" change="+2 today" changeDir="up" glowColor="59,130,246" />
                <StatCard icon={Zap} label="Urgent Deadlines" value={urgent.length} unit="" change="Due this week" changeDir="up" glowColor="245,158,11" />
                <StatCard icon={TrendingUp} label="Productivity Score" value={student?.productivityScore ?? '—'} unit="%" change="+6% vs last week" changeDir="up" glowColor="139,92,246" />
                <StatCard icon={Clock} label="Focus Time Today" value={student?.focusHoursToday ?? '—'} unit="h" change="On track!" changeDir="up" glowColor="6,182,212" />
            </div>

            {/* Mood + streak */}
            <div className="grid-2 fade-in-delay-2" style={{ gridTemplateColumns: '1fr 220px' }}>
                <div className="glass-card" style={{ padding: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                        <SmilePlus size={18} style={{ color: 'var(--accent-pink)' }} />
                        <h3 style={{ fontSize: 15, fontWeight: 700 }}>Today's Mood</h3>
                        <span className="badge badge-green" style={{ marginLeft: 'auto' }}>Just logged</span>
                    </div>
                    {todayMood ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <div style={{ fontSize: 48, lineHeight: 1 }}>{todayMood.mood}</div>
                            <div>
                                <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 2 }}>{todayMood.moodScore}/10</div>
                                <div style={{ fontSize: 13, color: 'var(--text-secondary)', maxWidth: 280 }}>{todayMood.note}</div>
                                <div className="insight-card" style={{ marginTop: 10, padding: '8px 12px' }}>
                                    <span>🧘</span><span>Your mood is tracked. Keep checking in!</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button className="btn btn-ghost btn-sm" onClick={() => setCurrentPage('mood-tracker')}>
                            <SmilePlus size={13} /> Log Today's Mood
                        </button>
                    )}
                </div>
                <div className="glass-card" style={{ padding: 20, textAlign: 'center' }}>
                    <div style={{ fontSize: 48, marginBottom: 4 }}>🔥</div>
                    <div style={{ fontSize: 42, fontWeight: 900, color: '#fbbf24', fontFamily: 'var(--font-heading)' }}>{student?.streakDays ?? 0}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 10 }}>Day Streak!</div>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${((student?.streakDays ?? 0) / 30) * 100}%`, background: 'linear-gradient(90deg,#f59e0b,#ef4444)' }} />
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>{30 - (student?.streakDays ?? 0)} days to monthly badge</div>
                </div>
            </div>

            {/* Charts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="fade-in-delay-2">
                <div className="glass-card" style={{ padding: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 700 }}>Weekly Productivity</h3>
                        <span className="badge badge-blue">This Week</span>
                    </div>
                    <ResponsiveContainer width="100%" height={180}>
                        <AreaChart data={weeklyProductivity}>
                            <defs>
                                <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="10%" stopColor="#3b82f6" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                            <YAxis tick={{ fontSize: 11 }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="score" name="score" stroke="#3b82f6" fill="url(#scoreGrad)" strokeWidth={2} dot={{ r: 3, fill: '#3b82f6' }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="glass-card" style={{ padding: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 700 }}>Study vs Exercise</h3>
                        <span className="badge badge-purple">Hours / Day</span>
                    </div>
                    <ResponsiveContainer width="100%" height={180}>
                        <BarChart data={weeklyProductivity} barSize={12}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                            <YAxis tick={{ fontSize: 11 }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ fontSize: 11 }} />
                            <Bar dataKey="study" name="study" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="exercise" name="exercise" fill="#10b981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Mood trend + insights + quick actions */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="fade-in-delay-3">
                <div className="glass-card" style={{ padding: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 700 }}>Mood Trends</h3>
                        <span className="badge badge-purple">{moodLogs.length} Days</span>
                    </div>
                    <ResponsiveContainer width="100%" height={160}>
                        <LineChart data={moodChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                            <YAxis tick={{ fontSize: 10 }} domain={[0, 10]} />
                            <Tooltip />
                            <Line type="monotone" dataKey="mood" name="Mood" stroke="#ec4899" strokeWidth={2} dot={{ r: 3 }} />
                            <Line type="monotone" dataKey="stress" name="Stress" stroke="#ef4444" strokeWidth={2} strokeDasharray="4 2" dot={{ r: 3 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div className="glass-card" style={{ padding: 20, flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                            <Brain size={16} color="var(--accent-blue)" />
                            <h3 style={{ fontSize: 15, fontWeight: 700 }}>AI Insights</h3>
                            <div className="pulse-dot" style={{ background: 'var(--accent-blue)', marginLeft: 4 }} />
                        </div>
                        {aiInsights.slice(0, 3).map((ins, i) => (
                            <div key={i} className="insight-card" style={{ marginBottom: 8 }}>
                                <span className="insight-icon">{ins.icon}</span>
                                <span>{ins.text}</span>
                            </div>
                        ))}
                    </div>
                    <div className="glass-card" style={{ padding: 16 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Quick Actions</div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            <button className="btn btn-ghost btn-xs" onClick={() => setCurrentPage('assignments')}><Plus size={11} /> Add Task</button>
                            <button className="btn btn-ghost btn-xs" onClick={() => setCurrentPage('mood-tracker')}><SmilePlus size={11} /> Log Mood</button>
                            <button className="btn btn-ghost btn-xs" onClick={() => setCurrentPage('ai-mentor')}><MessageCircle size={11} /> Ask AI</button>
                            <button className="btn btn-primary btn-xs" onClick={() => setCurrentPage('weekly-plan')}><Calendar size={11} /> Plan Week</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Upcoming assignments */}
            <div className="glass-card fade-in-delay-4" style={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700 }}>Upcoming Deadlines <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 400 }}>— live from DB</span></h3>
                    <button className="btn btn-ghost btn-xs" onClick={() => setCurrentPage('assignments')}>View All</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {pending.slice(0, 4).map(a => (
                        <div key={a.id} className="assignment-item">
                            <div style={{ width: 6, height: 6, borderRadius: '50%', flexShrink: 0, background: a.priority === 'high' ? 'var(--accent-red)' : a.priority === 'medium' ? 'var(--accent-orange)' : 'var(--accent-green)' }} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 13, fontWeight: 600 }}>{a.title}</div>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{a.subject} · Due {a.deadline}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: a.priority === 'high' ? 'var(--accent-red)' : 'var(--text-secondary)' }}>{a.priority.toUpperCase()}</div>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{a.progress}% done</div>
                            </div>
                        </div>
                    ))}
                    {pending.length === 0 && <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 20 }}>🎉 No pending tasks!</div>}
                </div>
            </div>
        </div>
    )
}
