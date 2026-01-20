import { Router } from 'express'
import { getDb } from '../db.js'

const router = Router()

// GET /api/student
router.get('/', async (_req, res) => {
  const db = await getDb()
  res.json(db.data.student)
})

// PATCH /api/student
router.patch('/', async (req, res) => {
  const { productivityScore, streakDays, focusHoursToday, totalTasksDone } = req.body
  const db = await getDb()
  if (productivityScore !== undefined) db.data.student.productivityScore = productivityScore
  if (streakDays !== undefined) db.data.student.streakDays = streakDays
  if (focusHoursToday !== undefined) db.data.student.focusHoursToday = focusHoursToday
  if (totalTasksDone !== undefined) db.data.student.totalTasksDone = totalTasksDone
  await db.write()
  res.json(db.data.student)
})

export default router
