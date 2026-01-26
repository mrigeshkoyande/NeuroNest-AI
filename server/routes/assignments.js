import { Router } from 'express'
import { getDb } from '../db.js'

const router = Router()

// GET /api/assignments
router.get('/', async (_req, res) => {
  const db = await getDb()
  const assignments = [...db.data.assignments].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1
    return new Date(a.deadline) - new Date(b.deadline)
  })
  res.json(assignments)
})

// POST /api/assignments
router.post('/', async (req, res) => {
  const { title, subject = 'Other', deadline, priority = 'medium', estimatedHours = 2 } = req.body
  if (!title || !deadline) return res.status(400).json({ error: 'title and deadline are required' })

  const db = await getDb()
  const id = db.data.nextAssignmentId
  const newAssignment = {
    id,
    title,
    subject,
    deadline,
    priority,
    completed: false,
    progress: 0,
    estimatedHours,
    createdAt: new Date().toISOString(),
  }
  db.data.assignments.push(newAssignment)
  db.data.nextAssignmentId = id + 1
  await db.write()
  res.status(201).json(newAssignment)
})

// PATCH /api/assignments/:id
router.patch('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const db = await getDb()
  const assignment = db.data.assignments.find(a => a.id === id)
  if (!assignment) return res.status(404).json({ error: 'Assignment not found' })

  const { title, subject, deadline, priority, completed, progress, estimatedHours } = req.body
  if (title !== undefined) assignment.title = title
  if (subject !== undefined) assignment.subject = subject
  if (deadline !== undefined) assignment.deadline = deadline
  if (priority !== undefined) assignment.priority = priority
  if (completed !== undefined) assignment.completed = completed
  if (progress !== undefined) assignment.progress = progress
  if (estimatedHours !== undefined) assignment.estimatedHours = estimatedHours

  await db.write()
  res.json(assignment)
})

// DELETE /api/assignments/:id
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const db = await getDb()
  const index = db.data.assignments.findIndex(a => a.id === id)
  if (index === -1) return res.status(404).json({ error: 'Not found' })
  db.data.assignments.splice(index, 1)
  await db.write()
  res.json({ success: true })
})

export default router
