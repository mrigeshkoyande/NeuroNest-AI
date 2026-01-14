// ============================================================
// server/db.js – lowdb JSON database layer
// Pure JavaScript, no native compilation needed.
// Data is stored in server/db.json
// ============================================================
import { JSONFilePreset } from 'lowdb/node'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH = path.join(__dirname, 'db.json')

// Default database shape with seed data
const defaultData = {
  student: {
    name: 'Soham Rathi',
    avatar: 'SR',
    major: 'Computer Science',
    year: 'Sophomore',
    university: 'MIT',
    productivityScore: 78,
    streakDays: 12,
    focusHoursToday: 4.5,
    totalTasksDone: 127,
  },

  assignments: [
    { id: 1, title: 'Data Structures Assignment #4', subject: 'CS301', deadline: '2026-02-24', priority: 'high', completed: false, progress: 35, estimatedHours: 5, createdAt: new Date().toISOString() },
    { id: 2, title: 'Linear Algebra Problem Set', subject: 'MATH201', deadline: '2026-02-25', priority: 'high', completed: false, progress: 60, estimatedHours: 3, createdAt: new Date().toISOString() },
    { id: 3, title: 'Operating Systems Lab Report', subject: 'CS401', deadline: '2026-02-28', priority: 'medium', completed: false, progress: 15, estimatedHours: 4, createdAt: new Date().toISOString() },
    { id: 4, title: 'English Essay – AI Ethics', subject: 'ENG102', deadline: '2026-03-01', priority: 'medium', completed: false, progress: 80, estimatedHours: 2, createdAt: new Date().toISOString() },
    { id: 5, title: 'Physics Experiment Write-up', subject: 'PHY201', deadline: '2026-03-03', priority: 'low', completed: false, progress: 0, estimatedHours: 2, createdAt: new Date().toISOString() },
    { id: 6, title: 'Database Design Project', subject: 'CS302', deadline: '2026-02-20', priority: 'high', completed: true, progress: 100, estimatedHours: 8, createdAt: new Date().toISOString() },
    { id: 7, title: 'Calculus Quiz Prep', subject: 'MATH101', deadline: '2026-02-19', priority: 'medium', completed: true, progress: 100, estimatedHours: 2, createdAt: new Date().toISOString() },
  ],

  nextAssignmentId: 8,

  moodLogs: [
    { id: 1, date: '2026-02-16', mood: '😊', moodScore: 8, energy: 7, note: "Great day! Finished DS assignment and felt motivated.", stress: 3, createdAt: new Date().toISOString() },
    { id: 2, date: '2026-02-17', mood: '😐', moodScore: 5, energy: 5, note: "Feeling a bit overwhelmed with multiple deadlines.", stress: 7, createdAt: new Date().toISOString() },
    { id: 3, date: '2026-02-18', mood: '😔', moodScore: 3, energy: 4, note: "Didn't sleep well. Struggling to focus.", stress: 8, createdAt: new Date().toISOString() },
    { id: 4, date: '2026-02-19', mood: '😊', moodScore: 7, energy: 8, note: "Finished the Calculus quiz prep. Feeling better!", stress: 4, createdAt: new Date().toISOString() },
    { id: 5, date: '2026-02-20', mood: '🤩', moodScore: 9, energy: 9, note: "Submitted DB project. Relief! Had a productive gym session.", stress: 2, createdAt: new Date().toISOString() },
    { id: 6, date: '2026-02-21', mood: '😌', moodScore: 6, energy: 6, note: "Weekend. Rested and reviewed notes lightly.", stress: 3, createdAt: new Date().toISOString() },
    { id: 7, date: '2026-02-22', mood: '😊', moodScore: 7, energy: 7, note: "New week starts. Feeling motivated and ready.", stress: 4, createdAt: new Date().toISOString() },
  ],

  nextMoodId: 8,

  habits: [
    {
      id: 1, name: 'Study', icon: '📚', unit: 'hours', target: 6, color: '#3b82f6',
      logs: [
        { date: '2026-02-16', value: 4 }, { date: '2026-02-17', value: 6 }, { date: '2026-02-18', value: 3 },
        { date: '2026-02-19', value: 7 }, { date: '2026-02-20', value: 5 }, { date: '2026-02-21', value: 2 },
        { date: '2026-02-22', value: 4.5 },
      ],
    },
    {
      id: 2, name: 'Exercise', icon: '🏃', unit: 'hours', target: 1, color: '#10b981',
      logs: [
        { date: '2026-02-16', value: 1 }, { date: '2026-02-17', value: 0.5 }, { date: '2026-02-18', value: 1.5 },
        { date: '2026-02-19', value: 1 }, { date: '2026-02-20', value: 0 }, { date: '2026-02-21', value: 2 },
        { date: '2026-02-22', value: 1 },
      ],
    },
    {
      id: 3, name: 'Sleep', icon: '😴', unit: 'hours', target: 8, color: '#8b5cf6',
      logs: [
        { date: '2026-02-16', value: 7 }, { date: '2026-02-17', value: 6.5 }, { date: '2026-02-18', value: 6 },
        { date: '2026-02-19', value: 7.5 }, { date: '2026-02-20', value: 7 }, { date: '2026-02-21', value: 8.5 },
        { date: '2026-02-22', value: 7.5 },
      ],
    },
    {
      id: 4, name: 'Breaks', icon: '☕', unit: 'taken', target: 4, color: '#f59e0b',
      logs: [
        { date: '2026-02-16', value: 3 }, { date: '2026-02-17', value: 5 }, { date: '2026-02-18', value: 2 },
        { date: '2026-02-19', value: 4 }, { date: '2026-02-20', value: 4 }, { date: '2026-02-21', value: 6 },
        { date: '2026-02-22', value: 3 },
      ],
    },
  ],

  chatMessages: [
    {
      id: 1, role: 'ai',
      content: "👋 Hi Soham! I'm your AI Mentor. I can help you with study planning, overcoming stress, optimizing your schedule, and exam prep. What would you like help with today?",
      time: '12:01 PM', createdAt: new Date().toISOString(),
    },
  ],

  nextChatId: 2,

  weeklyPlan: null,  // null until first save
}

// Singleton DB promise
let _db = null

export async function getDb() {
  if (!_db) {
    _db = await JSONFilePreset(DB_PATH, defaultData)
  }
  return _db
}

export default { getDb }
