// ============================================================
// NEURONEST AI – MOCK DATA STORE
// Realistic student data to make the app feel alive on load
// ============================================================

export const student = {
    name: 'Soham Rathi',
    avatar: 'SR',
    major: 'Computer Science',
    year: 'Sophomore',
    university: 'MIT',
    productivityScore: 78,
    streakDays: 12,
    focusHoursToday: 4.5,
    totalTasksDone: 127,
}

export const assignments = [
    { id: 1, title: 'Data Structures Assignment #4', subject: 'CS301', deadline: '2026-02-24', priority: 'high', completed: false, progress: 35, estimatedHours: 5 },
    { id: 2, title: 'Linear Algebra Problem Set', subject: 'MATH201', deadline: '2026-02-25', priority: 'high', completed: false, progress: 60, estimatedHours: 3 },
    { id: 3, title: 'Operating Systems Lab Report', subject: 'CS401', deadline: '2026-02-28', priority: 'medium', completed: false, progress: 15, estimatedHours: 4 },
    { id: 4, title: 'English Essay – AI Ethics', subject: 'ENG102', deadline: '2026-03-01', priority: 'medium', completed: false, progress: 80, estimatedHours: 2 },
    { id: 5, title: 'Physics Experiment Write-up', subject: 'PHY201', deadline: '2026-03-03', priority: 'low', completed: false, progress: 0, estimatedHours: 2 },
    { id: 6, title: 'Database Design Project', subject: 'CS302', deadline: '2026-02-20', priority: 'high', completed: true, progress: 100, estimatedHours: 8 },
    { id: 7, title: 'Calculus Quiz Prep', subject: 'MATH101', deadline: '2026-02-19', priority: 'medium', completed: true, progress: 100, estimatedHours: 2 },
]

export const weeklyProductivity = [
    { day: 'Mon', score: 72, study: 4, exercise: 1 },
    { day: 'Tue', score: 85, study: 6, exercise: 0.5 },
    { day: 'Wed', score: 68, study: 3, exercise: 1.5 },
    { day: 'Thu', score: 91, study: 7, exercise: 1 },
    { day: 'Fri', score: 78, study: 5, exercise: 0 },
    { day: 'Sat', score: 55, study: 2, exercise: 2 },
    { day: 'Sun', score: 62, study: 3, exercise: 2.5 },
]

export const moodLogs = [
    { date: '2026-02-16', mood: '😊', moodScore: 8, energy: 7, note: 'Great day! Finished DS assignment and felt motivated.', stress: 3 },
    { date: '2026-02-17', mood: '😐', moodScore: 5, energy: 5, note: 'Feeling a bit overwhelmed with multiple deadlines.', stress: 7 },
    { date: '2026-02-18', mood: '😔', moodScore: 3, energy: 4, note: 'Didn\'t sleep well. Struggling to focus.', stress: 8 },
    { date: '2026-02-19', mood: '😊', moodScore: 7, energy: 8, note: 'Finished the Calculus quiz prep. Feeling better!', stress: 4 },
    { date: '2026-02-20', mood: '🤩', moodScore: 9, energy: 9, note: 'Submitted DB project. Relief! Had a productive gym session.', stress: 2 },
    { date: '2026-02-21', mood: '😌', moodScore: 6, energy: 6, note: 'Weekend. Rested and reviewed notes lightly.', stress: 3 },
    { date: '2026-02-22', mood: '😊', moodScore: 7, energy: 7, note: 'New week starts. Feeling motivated and ready.', stress: 4 },
]

export const habits = [
    { id: 1, name: 'Study', icon: '📚', unit: 'hours', target: 6, values: [4, 6, 3, 7, 5, 2, 4.5], color: '#3b82f6' },
    { id: 2, name: 'Exercise', icon: '🏃', unit: 'hours', target: 1, values: [1, 0.5, 1.5, 1, 0, 2, 1], color: '#10b981' },
    { id: 3, name: 'Sleep', icon: '😴', unit: 'hours', target: 8, values: [7, 6.5, 6, 7.5, 7, 8.5, 7.5], color: '#8b5cf6' },
    { id: 4, name: 'Breaks', icon: '☕', unit: 'taken', target: 4, values: [3, 5, 2, 4, 4, 6, 3], color: '#f59e0b' },
]

export const weeklyPlanTemplate = {
    Mon: [
        { title: 'Morning Review (8–9 AM)', type: 'study', duration: '1h', desc: 'Review yesterday\'s notes' },
        { title: 'DS Assignment Deep Work (10AM–1PM)', type: 'study', duration: '3h', desc: 'Focused sprint on Assignment #4' },
        { title: 'Lunch + Walk Break', type: 'health', duration: '45m', desc: 'Rest your brain' },
        { title: 'Linear Algebra (3–5 PM)', type: 'study', duration: '2h', desc: 'Problem Set practice' },
        { title: 'Gym / Exercise (6–7 PM)', type: 'health', duration: '1h', desc: 'Physical well-being' },
    ],
    Tue: [
        { title: 'DS Assignment Finish (9AM–12PM)', type: 'deadline', duration: '3h', desc: '⚠️ URGENT: Due Tuesday!' },
        { title: 'OS Lab Report Start (2–4 PM)', type: 'study', duration: '2h', desc: 'Begin research and outline' },
        { title: 'English Essay Progress (5–6 PM)', type: 'study', duration: '1h', desc: 'Polish existing draft' },
        { title: 'Evening Walk', type: 'health', duration: '30m', desc: 'Light recovery' },
    ],
    Wed: [
        { title: 'Linear Algebra Due (9–11 AM)', type: 'deadline', duration: '2h', desc: '⚠️ DUE TODAY – Final review!' },
        { title: 'Light Study Day', type: 'study', duration: '2h', desc: 'Review week\'s material lightly' },
        { title: 'Mindfulness / Meditation', type: 'personal', duration: '30m', desc: 'Mental health check-in' },
        { title: 'Social / Hobby Time', type: 'personal', duration: '2h', desc: 'Recharge and connect' },
    ],
    Thu: [
        { title: 'Physics Write-up Start (9AM–12PM)', type: 'study', duration: '3h', desc: 'Data analysis section' },
        { title: 'OS Lab Report Continue (1–4 PM)', type: 'study', duration: '3h', desc: 'Write methodology' },
        { title: 'English Essay Submit (5–6 PM)', type: 'deadline', duration: '1h', desc: '⚠️ DUE TODAY!' },
        { title: 'Gym Session', type: 'health', duration: '1h', desc: 'Strength training' },
    ],
    Fri: [
        { title: 'OS Lab Report Finish (9AM–1PM)', type: 'deadline', duration: '4h', desc: 'Final edits & submission' },
        { title: 'Week Review (3–4 PM)', type: 'personal', duration: '1h', desc: 'Reflect on progress' },
        { title: 'Light Evening', type: 'health', duration: '2h', desc: 'Movie / Gaming / Relax' },
    ],
    Sat: [
        { title: 'Sleep In & Rest', type: 'health', duration: '9h', desc: 'Recovery sleep mandatory!' },
        { title: 'Optional Study Review (2–4 PM)', type: 'study', duration: '2h', desc: 'Review if needed' },
        { title: 'Social / Friends', type: 'personal', duration: '3h', desc: 'Balance is key' },
    ],
    Sun: [
        { title: 'Week Preparation (10AM–12PM)', type: 'study', duration: '2h', desc: 'Plan & organize next week' },
        { title: 'Physics Write-up Final (1–3 PM)', type: 'study', duration: '2h', desc: 'Complete and review' },
        { title: 'Meal Prep & Rest', type: 'health', duration: '1.5h', desc: 'Fuel for the week ahead' },
        { title: 'Mindfulness Evening', type: 'personal', duration: '1h', desc: 'Wind down intentionally' },
    ],
}

export const aiInsights = [
    { icon: '⚡', text: 'You have 3 deadlines between Feb 24–28. Start the DS assignment today!', type: 'urgent' },
    { icon: '🌅', text: 'Your productivity peaks between 9–11 AM. Schedule deep work then.', type: 'tip' },
    { icon: '🧠', text: 'You\'ve studied 4.5 hours today. A 20-min break will boost retention.', type: 'health' },
    { icon: '😰', text: 'Stress indicators are mid-high. Consider lighter tasks tomorrow morning.', type: 'mood' },
    { icon: '🎯', text: 'Your weekly consistency score is 78%. Top performers average 82%.', type: 'goal' },
]

export const chatHistory = [
    {
        role: 'ai',
        content: '👋 Hi Soham! I\'m your AI Mentor. I can help you with study planning, overcoming stress, optimizing your schedule, and exam prep. What would you like help with today?',
        time: '12:01 PM',
    },
]

export const aiResponses = {
    'plan my study schedule': `📅 **Here's your optimized study plan:**

Based on your deadlines and energy patterns, I recommend:

• **9–11 AM:** Deep work on urgent tasks (your peak performance window)
• **2–4 PM:** Medium-difficulty tasks or review sessions  
• **6–7 PM:** Light reading or note review

**Priority order this week:**
1. DS Assignment #4 (Due Feb 24) ⚠️
2. Linear Algebra Problem Set (Due Feb 25)
3. OS Lab Report (Due Feb 28)

Start with DS today – you're only 35% done with 2 days left!`,

    'i feel overwhelmed': `💙 **I hear you – feeling overwhelmed is completely normal.**

Here's what I want you to know:
- It's okay to not do everything perfectly
- Your productivity score (78%) shows you're actually doing great!

**Immediate steps:**
1. Take a 10-minute deep breathing break right now
2. Write down your 3 most urgent tasks only
3. Do ONE task for 25 minutes (Pomodoro)
4. Celebrate that small win

Remember: **progress > perfection**. You're already ahead of 70% of your peers based on your consistency.`,

    'help me focus': `🎯 **Focus Enhancement Protocol:**

**Immediate (next 5 minutes):**
- Phone in another room or on Do Not Disturb
- Clear your desk of everything except what you need
- Open only ONE browser tab

**Session setup:**
- Set a 25-minute Pomodoro timer
- Write your micro-goal: "By the end of this session I will..."
- Put on lo-fi music or brown noise

**Your personal tip:** You tend to focus best after a light snack. Your last productive session started around 10 AM. Try recreating those conditions!`,

    'optimize my day': `⚡ **Your Optimized Day Plan (Feb 22):**

| Time | Activity | Why |
|------|----------|-----|
| 8:30 AM | Morning review (30 min) | Activate memory |
| 9–11 AM | DS Assignment #4 | Peak energy window |
| 11–11:15 AM | Short break | Prevent burnout |
| 11:15 AM–1 PM | Linear Algebra | Still high focus |
| 1–2 PM | Lunch & Walk | Essential recovery |
| 2–4 PM | OS Lab Report start | Moderate energy |
| 4–4:15 PM | Break | Energy dip |
| 4:15–5:30 PM | English Essay | Light creative work |
| 6–7 PM | Exercise | Evening energy boost |
| 8–9 PM | Light review | Consolidate learning |

**Predicted productivity score: 88%** 🚀`,

    default: `🤖 **Great question, Soham!** Let me think through this...

Based on your current patterns and the data I'm tracking, here's my personalized advice:

Your productivity is strong (78% score) with clear peaks in the morning. You tend to do better when you break tasks into smaller chunks and take regular breaks.

**Key recommendation:** Focus on your top 3 priorities first, maintain your 12-day streak, and make sure to get 7+ hours of sleep tonight – your tasks this week are demanding.

Is there a specific aspect of this you'd like me to elaborate on? 🎯`,
}

export const analyticsData = {
    productivityVsMood: [
        { week: 'Week 1', productivity: 65, mood: 6 },
        { week: 'Week 2', productivity: 72, mood: 7 },
        { week: 'Week 3', productivity: 68, mood: 5 },
        { week: 'Week 4', productivity: 78, mood: 8 },
        { week: 'Week 5', productivity: 82, mood: 7.5 },
        { week: 'Week 6', productivity: 78, mood: 7 },
    ],
    assignmentCompletion: [
        { name: 'CS301', completed: 3, total: 4, fill: '#3b82f6' },
        { name: 'MATH201', completed: 4, total: 5, fill: '#8b5cf6' },
        { name: 'CS401', completed: 2, total: 4, fill: '#06b6d4' },
        { name: 'ENG102', completed: 3, total: 3, fill: '#10b981' },
        { name: 'PHY201', completed: 1, total: 3, fill: '#f59e0b' },
    ],
    habitConsistency: [
        { habit: 'Study', rate: 82 },
        { habit: 'Exercise', rate: 71 },
        { habit: 'Sleep', rate: 65 },
        { habit: 'Breaks', rate: 78 },
        { habit: 'Mindfulness', rate: 45 },
    ],
}

export const agents = [
    {
        id: 'academic',
        name: 'Academic Planning Agent',
        icon: '📚',
        color: '#3b82f6',
        description: 'Analyzes deadlines, workload, and generates optimal study schedules',
        status: 'active',
        tasks: ['Deadline tracking', 'Schedule optimization', 'Subject balancing'],
    },
    {
        id: 'health',
        name: 'Health Monitoring Agent',
        icon: '💪',
        color: '#10b981',
        description: 'Tracks physical activity, sleep, and prevents burnout',
        status: 'active',
        tasks: ['Exercise tracking', 'Sleep analysis', 'Burnout prevention'],
    },
    {
        id: 'mood',
        name: 'Mood Analysis Agent',
        icon: '🧠',
        color: '#8b5cf6',
        description: 'Monitors emotional wellbeing and stress levels',
        status: 'active',
        tasks: ['Mood pattern detection', 'Stress alerts', 'Wellbeing suggestions'],
    },
    {
        id: 'mentor',
        name: 'AI Mentor Agent',
        icon: '🤖',
        color: '#06b6d4',
        description: 'Provides personalized advice and answers student questions',
        status: 'active',
        tasks: ['Q&A assistance', 'Motivation boosts', 'Study tips'],
    },
    {
        id: 'notify',
        name: 'Notification Agent',
        icon: '🔔',
        color: '#f59e0b',
        description: 'Sends smart reminders at the right time',
        status: 'active',
        tasks: ['Deadline reminders', 'Break nudges', 'Achievement alerts'],
    },
]

export const badges = [
    { id: 1, name: '12-Day Streak', icon: '🔥', type: 'golden', desc: 'Consistent daily activity' },
    { id: 2, name: 'Early Bird', icon: '🌅', type: 'silver', desc: 'Studied before 9 AM 5 times' },
    { id: 3, name: 'Assignment Crusher', icon: '💥', type: 'golden', desc: 'Completed 5 assignments on time' },
    { id: 4, name: 'Wellness Focus', icon: '🧘', type: 'platinum', desc: 'Maintained health balance for 2 weeks' },
    { id: 5, name: 'Night Owl', icon: '🦉', type: 'silver', desc: 'Late night study session (use sparingly!)' },
    { id: 6, name: 'AI Power User', icon: '🤖', type: 'platinum', desc: 'Asked AI Mentor 20+ questions' },
]
