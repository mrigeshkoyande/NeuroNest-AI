import { Router } from 'express'
import { getDb } from '../db.js'

const router = Router()

// GET /api/mood
router.get('/', async (_req, res) => {
  const db = await getDb()
  const logs = [...db.data.moodLogs].sort((a, b) => new Date(a.date) - new Date(b.date))
  res.json(logs)
})

// POST /api/mood – upserts today's entry (one log per day)
router.post('/', async (req, res) => {
  const { date, mood, moodScore, energy, note = '', stress } = req.body
  if (!date || !mood || moodScore == null || energy == null) {
    return res.status(400).json({ error: 'date, mood, moodScore, energy are required' })
  }

  const db = await getDb()
  // Remove existing entry for that date (upsert)
  db.data.moodLogs = db.data.moodLogs.filter(l => l.date !== date)
  const id = db.data.nextMoodId
  const newLog = {
    id,
    date,
    mood,
    moodScore,
    energy,
    note,
    stress: stress ?? 10 - energy,
    createdAt: new Date().toISOString(),
  }
  db.data.moodLogs.push(newLog)
  db.data.nextMoodId = id + 1
  await db.write()
  res.status(201).json(newLog)
})

export default router
