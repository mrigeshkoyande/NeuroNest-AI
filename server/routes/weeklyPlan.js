import { Router } from 'express'
import { getDb } from '../db.js'

const router = Router()

// GET /api/weekly-plan
router.get('/', async (_req, res) => {
  const db = await getDb()
  if (!db.data.weeklyPlan) return res.json(null)
  res.json(db.data.weeklyPlan)
})

// POST /api/weekly-plan – save/overwrite
router.post('/', async (req, res) => {
  const { plan, inputs } = req.body
  if (!plan) return res.status(400).json({ error: 'plan is required' })

  const db = await getDb()
  db.data.weeklyPlan = { plan, inputs: inputs ?? {}, generatedAt: new Date().toISOString() }
  await db.write()
  res.json({ success: true })
})

export default router
