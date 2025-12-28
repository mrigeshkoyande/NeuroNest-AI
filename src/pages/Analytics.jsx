import React from 'react'
import {
    AreaChart, Area, BarChart, Bar, LineChart, Line, RadarChart, Radar,
    PolarGrid, PolarAngleAxis, ScatterChart, Scatter, XAxis, YAxis,
    CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell,
} from 'recharts'
import { analyticsData, weeklyProductivity, moodLogs, habits } from '../data/mockData'
import { TrendingUp, Award } from 'lucide-react'

const prodMoodData = analyticsData.productivityVsMood

export default function Analytics() {
    const habitConsistency = analyticsData.habitConsistency
    const assignCompletion = analyticsData.assignmentCompletion

    return (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="section-header">
                <div>
                    <h1 className="section-title">Analytics Dashboard</h1>
                    <p className="section-subtitle">Deep insights into your productivity, mood, and habits</p>
                </div>
                <span className="badge badge-blue">Last 6 Weeks</span>
            </div>

            {/* KPI row */}
            <div className="grid-4">
                {[
                    { label: 'Avg Productivity', val: '75%', trend: '↑ 8% vs prev', color: 'var(--accent-blue)', icon: '📈' },
                    { label: 'Avg Mood Score', val: '6.4/10', trend: '↑ 0.8 vs prev', color: 'var(--accent-pink)', icon: '😊' },
                    { label: 'Habit Consistency', val: '74%', trend: '↑ 5% vs prev', color: 'var(--accent-green)', icon: '✅' },
                    { label: 'Tasks Completed', val: '127', trend: '+23 this month', color: 'var(--accent-orange)', icon: '🎯' },
                ].map(({ label, val, trend, color, icon }) => (
                    <div key={label} className="glass-card" style={{ padding: 20 }}>
                        <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
                        <div style={{ fontSize: 26, fontWeight: 900, color, fontFamily: 'var(--font-heading)' }}>{val}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{label}</div>
                        <div style={{ fontSize: 11, color: 'var(--accent-green)', marginTop: 6, fontWeight: 600 }}>{trend}</div>
                    </div>
                ))}
            </div>

            {/* Productivity trend */}
            <div className="glass-card" style={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700 }}>Productivity vs Mood Trend</h3>
                    <span className="badge badge-purple">6-week overview</span>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={prodMoodData}>
                        <defs>
                            <linearGradient id="prodGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="moodGrad2" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                        <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
                        <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} domain={[0, 10]} />
                        <Tooltip />
                        <Legend />
                        <Area yAxisId="left" type="monotone" dataKey="productivity" name="Productivity %" stroke="#3b82f6" fill="url(#prodGrad)" strokeWidth={2} />
                        <Area yAxisId="right" type="monotone" dataKey="mood" name="Mood /10" stroke="#ec4899" fill="url(#moodGrad2)" strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
                <div className="insight-card" style={{ marginTop: 12 }}>
                    <span className="insight-icon">🔗</span>
                    <span style={{ fontSize: 12 }}>Strong correlation detected: when mood score rises above 7, productivity follows within 1–2 days.</span>
                </div>
            </div>

            <div className="grid-2">
                {/* Assignment completion by subject */}
                <div className="glass-card" style={{ padding: 20 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Assignment Completion by Subject</h3>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={assignCompletion} layout="vertical" barSize={10}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" tick={{ fontSize: 10 }} domain={[0, 5]} />
                            <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={60} />
                            <Tooltip />
                            <Bar dataKey="completed" name="Completed" radius={[0, 4, 4, 0]}>
                                {assignCompletion.map((e, i) => <Cell key={i} fill={e.fill} />)}
                            </Bar>
                            <Bar dataKey="total" name="Total" fill="rgba(255,255,255,0.08)" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Habit consistency */}
                <div className="glass-card" style={{ padding: 20 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Habit Consistency Rate</h3>
                    <ResponsiveContainer width="100%" height={220}>
                        <RadarChart data={habitConsistency} outerRadius={80}>
                            <PolarGrid stroke="rgba(255,255,255,0.06)" />
                            <PolarAngleAxis dataKey="habit" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                            <Radar name="Consistency" dataKey="rate" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.25} strokeWidth={2} />
                            <Tooltip />
                        </RadarChart>
                    </ResponsiveContainer>
                    <div className="insight-card" style={{ marginTop: 8 }}>
                        <span className="insight-icon">💡</span>
                        <span style={{ fontSize: 12 }}>Mindfulness needs the most attention — only 45% consistency this month.</span>
                    </div>
                </div>
            </div>

            {/* Weekly breakdown */}
            <div className="glass-card" style={{ padding: 20 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>This Week's Breakdown</h3>
                <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={weeklyProductivity} barSize={14}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="study" name="Study (h)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="exercise" name="Exercise (h)" fill="#10b981" radius={[4, 4, 0, 0]} />
                        <Line type="monotone" dataKey="score" name="Score %" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Performance summary */}
            <div className="glass-card" style={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <Award size={16} color="var(--accent-orange)" />
                    <h3 style={{ fontSize: 15, fontWeight: 700 }}>AI Performance Summary</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 10 }}>
                    {[
                        { icon: '🚀', text: 'Your productivity improved 8% compared to last month. You\'re in the top 30% of users.' },
                        { icon: '💪', text: 'Exercise habit shows 40% improvement. Morning workouts correlate with 20% higher productivity.' },
                        { icon: '📚', text: 'Study efficiency peaks on Tuesday and Thursday. Consider scheduling hardest tasks then.' },
                        { icon: '🎯', text: 'Assignment completion rate (71%) is above average. 3 more completions will hit 80% this semester.' },
                    ].map((ins, i) => (
                        <div key={i} className="insight-card">
                            <span className="insight-icon">{ins.icon}</span>
                            <span style={{ fontSize: 13 }}>{ins.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
