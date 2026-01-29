import { Router } from 'express'
import { getDb } from '../db.js'

const router = Router()

// GET /api/habits – habits with last 7 days of logs
router.get('/', async (_req, res) => {
  const db = await getDb()
  const result = db.data.habits.map(h => {
    const logs = [...h.logs]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 7)
      .reverse() // oldest first
    return {
      id: h.id,
      name: h.name,
      icon: h.icon,
      unit: h.unit,
      target: h.target,
      color: h.color,
      logs,
      values: logs.map(l => l.value),
    }
  })
  res.json(result)
})

// PATCH /api/habits/:id/log – log today's value (upsert)
router.patch('/:id/log', async (req, res) => {
  const id = parseInt(req.params.id)
  const { date, value } = req.body
  if (!date || value == null) return res.status(400).json({ error: 'date and value are required' })

  const db = await getDb()
  const habit = db.data.habits.find(h => h.id === id)
  if (!habit) return res.status(404).json({ error: 'Habit not found' })

  const existingLog = habit.logs.find(l => l.date === date)
  if (existingLog) {
    existingLog.value = value
  } else {
    habit.logs.push({ date, value })
  }

  await db.write()
  res.json({ success: true, habitId: id, date, value })
})

export default router
