import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, Loader, Trash2 } from 'lucide-react'
import { useChat } from '../hooks/useApi'
import { aiResponses } from '../data/mockData'

const suggestedPrompts = [
    '📅 Plan my study schedule',
    '😰 I feel overwhelmed',
    '🎯 Help me focus',
    '⚡ Optimize my day',
    '📚 Exam prep tips',
    '💤 Improve my sleep',
]

function findResponse(text) {
    const lower = text.toLowerCase()
    for (const [key, val] of Object.entries(aiResponses)) {
        if (lower.includes(key)) return val
    }
    return aiResponses.default
}

function formatMessage(text) {
    return text.split('\n').map((line, i) => {
        if (line.startsWith('**') && line.endsWith('**')) return <p key={i}><strong>{line.slice(2, -2)}</strong></p>
        if (line.startsWith('• ') || line.startsWith('- ')) return <p key={i} style={{ marginLeft: 12 }}>• {line.slice(2)}</p>
        if (!line.trim()) return <br key={i} />
        return <p key={i}>{line}</p>
    })
}

export default function AIMentor() {
    const { messages, loading, send, clearHistory } = useChat()
    const [input, setInput] = useState('')
    const [isThinking, setIsThinking] = useState(false)
    const bottomRef = useRef(null)

    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, isThinking])

    const sendMessage = async (text) => {
        const msg = text || input.trim()
        if (!msg) return
        setInput('')

        const now = new Date()
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        // Save user message to DB
        await send({ role: 'user', content: msg, time: timeStr })
        setIsThinking(true)

        const delay = 1000 + Math.random() * 1500
        setTimeout(async () => {
            const response = findResponse(msg)
            setIsThinking(false)
            // Save AI response to DB
            await send({ role: 'ai', content: response, time: timeStr })
        }, delay)
    }

    return (
        <div className="fade-in" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div className="section-header" style={{ marginBottom: 16 }}>
                <div>
                    <h1 className="section-title"><span className="gradient-text">AI Mentor</span></h1>
                    <p className="section-subtitle">Conversations saved automatically · pick up where you left off</p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', borderRadius: 99, padding: '6px 14px' }}>
                        <div className="pulse-dot" style={{ background: '#22c55e' }} />
                        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-blue-light)' }}>AI Mentor Online</span>
                    </div>
                    <button className="btn btn-ghost btn-sm" onClick={clearHistory} title="Clear chat history">
                        <Trash2 size={13} /> Clear
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 16, flex: 1, minHeight: 0 }}>
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    {/* Messages list */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {loading && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Loader size={14} className="spin" color="var(--accent-blue)" />
                                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Loading conversation history…</span>
                            </div>
                        )}
                        {messages.map((msg, i) => (
                            <div key={msg.id ?? i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
                                    {msg.role === 'ai' && (
                                        <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Bot size={14} color="white" />
                                        </div>
                                    )}
                                    <div className={`chat-bubble ${msg.role}`}>
                                        {msg.role === 'ai' ? <div style={{ lineHeight: 1.7 }}>{formatMessage(msg.content)}</div> : msg.content}
                                    </div>
                                </div>
                                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4, marginLeft: msg.role === 'ai' ? 36 : 0 }}>{msg.time}</div>
                            </div>
                        ))}
                        {isThinking && (
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                                <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Bot size={14} color="white" />
                                </div>
                                <div className="chat-bubble ai" style={{ paddingTop: 14, paddingBottom: 14 }}>
                                    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                                        <div className="thinking-dot" /><div className="thinking-dot" /><div className="thinking-dot" />
                                        <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 6 }}>AI is thinking…</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>
                    {/* Input */}
                    <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <input
                                className="input-field"
                                placeholder="Ask your AI Mentor anything…"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                            />
                            <button className="btn btn-primary" onClick={() => sendMessage()} disabled={!input.trim() || isThinking} style={{ padding: '10px 16px' }}>
                                <Send size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div className="glass-card" style={{ padding: 16 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>💡 Suggested Prompts</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {suggestedPrompts.map((p, i) => (
                                <button key={i} className="btn btn-ghost btn-sm" onClick={() => sendMessage(p.replace(/^[^ ]+ /, ''))} style={{ justifyContent: 'flex-start', textAlign: 'left', fontSize: 13 }}>
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="glass-card" style={{ padding: 16 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 10, textTransform: 'uppercase' }}>📊 Session Stats</div>
                        {[
                            { label: 'Messages Today', val: messages.filter(m => m.role === 'user').length },
                            { label: 'Total Saved', val: messages.length },
                        ].map(({ label, val }) => (
                            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
                                <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                                <span style={{ fontWeight: 700, color: 'var(--accent-blue-light)' }}>{val}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
