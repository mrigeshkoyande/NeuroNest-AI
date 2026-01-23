import { Router } from 'express'
import { getDb } from '../db.js'

const router = Router()

// GET /api/chat
router.get('/', async (_req, res) => {
  const db = await getDb()
  const messages = [...db.data.chatMessages].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  res.json(messages)
})

// POST /api/chat
router.post('/', async (req, res) => {
  const { role, content, time } = req.body
  if (!role || !content) return res.status(400).json({ error: 'role and content are required' })

  const db = await getDb()
  const id = db.data.nextChatId
  const newMessage = {
    id,
    role,
    content,
    time: time ?? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    createdAt: new Date().toISOString(),
  }
  db.data.chatMessages.push(newMessage)
  db.data.nextChatId = id + 1
  await db.write()
  res.status(201).json(newMessage)
})

// DELETE /api/chat – clear history (keep only the welcome message)
router.delete('/', async (_req, res) => {
  const db = await getDb()
  db.data.chatMessages = [{
    id: 1,
    role: 'ai',
    content: "👋 Hi Soham! I'm your AI Mentor. I can help you with study planning, overcoming stress, optimizing your schedule, and exam prep. What would you like help with today?",
    time: '12:01 PM',
    createdAt: new Date().toISOString(),
  }]
  db.data.nextChatId = 2
  await db.write()
  res.json({ success: true })
})

export default router
