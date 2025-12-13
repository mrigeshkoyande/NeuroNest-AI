import React, { useState } from 'react'
import TopNav from './components/TopNav'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import WeeklyPlanner from './pages/WeeklyPlanner'
import Assignments from './pages/Assignments'
import AIMentor from './pages/AIMentor'
import MoodTracker from './pages/MoodTracker'
import HabitTracker from './pages/HabitTracker'
import Analytics from './pages/Analytics'
import AgentsPage from './pages/AgentsPage'

const pageMap = {
    dashboard: Dashboard,
    'weekly-plan': WeeklyPlanner,
    assignments: Assignments,
    'ai-mentor': AIMentor,
    'mood-tracker': MoodTracker,
    'habit-tracker': HabitTracker,
    analytics: Analytics,
    agents: AgentsPage,
}

export default function App() {
    const [currentPage, setCurrentPage] = useState('dashboard')

    const PageComponent = pageMap[currentPage] || Dashboard

    return (
        <div className="app-layout">
            <TopNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <main className="main-content" key={currentPage}>
                <PageComponent setCurrentPage={setCurrentPage} />
            </main>
        </div>
    )
}
