// ============================================================
// src/hooks/useApi.js
// Custom React hooks to interact with the NeuroNest REST API.
// Each hook exposes { data, loading, error } + mutation helpers.
// ============================================================

import { useState, useEffect, useCallback } from 'react'

// ---------- generic fetcher ----------
async function apiFetch(path, options = {}) {
    const res = await fetch(path, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    })
    if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }))
        throw new Error(err.error || 'API error')
    }
    return res.json()
}

// ============================================================
// useStudent
// ============================================================
export function useStudent() {
    const [student, setStudent] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetch = useCallback(async () => {
        try {
            setLoading(true)
            const data = await apiFetch('/api/student')
            setStudent(data)
        } catch (e) { setError(e.message) }
        finally { setLoading(false) }
    }, [])

    useEffect(() => { fetch() }, [fetch])

    const update = async (patch) => {
        const updated = await apiFetch('/api/student', { method: 'PATCH', body: JSON.stringify(patch) })
        setStudent(updated)
        return updated
    }

    return { student, loading, error, refetch: fetch, update }
}

// ============================================================
// useAssignments
// ============================================================
export function useAssignments() {
    const [assignments, setAssignments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetch = useCallback(async () => {
        try {
            setLoading(true)
            const data = await apiFetch('/api/assignments')
            setAssignments(data)
        } catch (e) { setError(e.message) }
        finally { setLoading(false) }
    }, [])

    useEffect(() => { fetch() }, [fetch])

    const add = async (payload) => {
        const created = await apiFetch('/api/assignments', { method: 'POST', body: JSON.stringify(payload) })
        setAssignments(prev => [...prev, created])
        return created
    }

    const update = async (id, patch) => {
        const updated = await apiFetch(`/api/assignments/${id}`, { method: 'PATCH', body: JSON.stringify(patch) })
        setAssignments(prev => prev.map(a => a.id === id ? updated : a))
        return updated
    }

    const remove = async (id) => {
        await apiFetch(`/api/assignments/${id}`, { method: 'DELETE' })
        setAssignments(prev => prev.filter(a => a.id !== id))
    }

    const toggle = async (id) => {
        const assignment = assignments.find(a => a.id === id)
        if (!assignment) return
        return update(id, {
            completed: !assignment.completed,
            progress: !assignment.completed ? 100 : 0,
        })
    }

    return { assignments, loading, error, refetch: fetch, add, update, remove, toggle }
}

// ============================================================
// useMoodLogs
// ============================================================
export function useMoodLogs() {
    const [moodLogs, setMoodLogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetch = useCallback(async () => {
        try {
            setLoading(true)
            const data = await apiFetch('/api/mood')
            setMoodLogs(data)
        } catch (e) { setError(e.message) }
        finally { setLoading(false) }
    }, [])

    useEffect(() => { fetch() }, [fetch])

    const logMood = async (payload) => {
        const created = await apiFetch('/api/mood', { method: 'POST', body: JSON.stringify(payload) })
        setMoodLogs(prev => {
            const filtered = prev.filter(l => l.date !== created.date)
            return [...filtered, created].sort((a, b) => a.date.localeCompare(b.date))
        })
        return created
    }

    return { moodLogs, loading, error, refetch: fetch, logMood }
}

// ============================================================
// useHabits
// ============================================================
export function useHabits() {
    const [habits, setHabits] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetch = useCallback(async () => {
        try {
            setLoading(true)
            const data = await apiFetch('/api/habits')
            setHabits(data)
        } catch (e) { setError(e.message) }
        finally { setLoading(false) }
    }, [])

    useEffect(() => { fetch() }, [fetch])

    const logDay = async (habitId, date, value) => {
        await apiFetch(`/api/habits/${habitId}/log`, {
            method: 'PATCH',
            body: JSON.stringify({ date, value }),
        })
        await fetch()  // re-fetch to get updated window
    }

    return { habits, loading, error, refetch: fetch, logDay }
}

// ============================================================
// useChat
// ============================================================
export function useChat() {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetch = useCallback(async () => {
        try {
            setLoading(true)
            const data = await apiFetch('/api/chat')
            setMessages(data)
        } catch (e) { setError(e.message) }
        finally { setLoading(false) }
    }, [])

    useEffect(() => { fetch() }, [fetch])

    const send = async (payload) => {
        const created = await apiFetch('/api/chat', { method: 'POST', body: JSON.stringify(payload) })
        setMessages(prev => [...prev, created])
        return created
    }

    const clearHistory = async () => {
        await apiFetch('/api/chat', { method: 'DELETE' })
        await fetch()
    }

    return { messages, loading, error, refetch: fetch, send, clearHistory }
}

// ============================================================
// useWeeklyPlan
// ============================================================
export function useWeeklyPlan() {
    const [plan, setPlan] = useState(null)
    const [savedInputs, setSavedInputs] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetch = useCallback(async () => {
        try {
            setLoading(true)
            const data = await apiFetch('/api/weekly-plan')
            if (data) {
                setPlan(data.plan)
                setSavedInputs(data.inputs)
            }
        } catch (e) { setError(e.message) }
        finally { setLoading(false) }
    }, [])

    useEffect(() => { fetch() }, [fetch])

    const savePlan = async (planData, inputs) => {
        await apiFetch('/api/weekly-plan', {
            method: 'POST',
            body: JSON.stringify({ plan: planData, inputs }),
        })
        setPlan(planData)
        setSavedInputs(inputs)
    }

    return { plan, savedInputs, loading, error, refetch: fetch, savePlan }
}
