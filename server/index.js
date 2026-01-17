// ============================================================
// server/index.js – Express API server for NeuroNest AI
// ============================================================
import express from 'express'
import cors from 'cors'

// Route modules
import assignmentsRouter from './routes/assignments.js'
import moodRouter from './routes/moodLogs.js'
import habitsRouter from './routes/habits.js'
import chatRouter from './routes/chat.js'
import weeklyPlanRouter from './routes/weeklyPlan.js'
import studentRouter from './routes/student.js'

import { getDb } from './db.js'

const app = express()
const PORT = process.env.PORT || 3001

// ── Middleware ──
app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json())

// ── Health check ──
app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }))

// ── Routes ──
app.use('/api/assignments', assignmentsRouter)
app.use('/api/mood', moodRouter)
app.use('/api/habits', habitsRouter)
app.use('/api/chat', chatRouter)
app.use('/api/weekly-plan', weeklyPlanRouter)
app.use('/api/student', studentRouter)

// ── 404 fallback ──
app.use((_req, res) => res.status(404).json({ error: 'Not Found' }))

// ── Start ──
getDb().then(() => {
  app.listen(PORT, () => {
    console.log(`\n  🧠 NeuroNest AI Server running on http://localhost:${PORT}`)
    console.log(`  📦 lowdb JSON database ready\n`)
  })
})
