import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Smile,
  Meh,
  Frown,
  Angry,
  Zap,
  Calendar,
  BarChart2,
  Info,
  ChevronDown,
  ChevronUp,
  Droplet,
  Bed,
  HeartPulse,
  Target,
  Cloud,
  Sun,
  Moon
} from 'lucide-react'
import { Bar } from 'react-chartjs-2'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { Chart as ChartJS, registerables } from 'chart.js'

ChartJS.register(...registerables)

const moodEmojis = [
  { emoji: <Smile size={32} />, label: 'Happy', color: 'emerald-500' },
  { emoji: <Meh size={32} />, label: 'Neutral', color: 'amber-500' },
  { emoji: <Frown size={32} />, label: 'Sad', color: 'blue-500' },
  { emoji: <Angry size={32} />, label: 'Angry', color: 'rose-500' },
  { emoji: <Zap size={32} />, label: 'Energetic', color: 'violet-500' }
]

const particlesOptions = {
  background: { color: { value: '#1f2937' } },
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: { enable: true, mode: 'bounce' }
    },
    modes: {
      bubble: { distance: 250, opacity: 0 },
      push: { quantity: 4 },
      repulse: { distance: 200, duration: 0.4 }
    }
  },
  particles: {
    color: { value: '#ffffff' },
    links: { color: '#ffffff', distance: 150, enable: true, opacity: 0.4 },
    move: {
      direction: 'none',
      enable: true,
      outModes: { default: 'bounce' },
      speed: 2,
      straight: false
    },
    number: { value: 80 },
    opacity: { value: 0.5 },
    shape: { type: 'circle' },
    size: { value: { min: 1, max: 5 }}
  },
  detectRetina: true
}

export const MoodTracker = () => {
  const [moodEntries, setMoodEntries] = useState([])
  const [currentMood, setCurrentMood] = useState(null)
  const [notes, setNotes] = useState('')
  const [activities, setActivities] = useState([])
  const [sleepHours, setSleepHours] = useState('')
  const [waterIntake, setWaterIntake] = useState('')
  const [exerciseMinutes, setExerciseMinutes] = useState('')
  const [gratitudeList, setGratitudeList] = useState('')
  const [goals, setGoals] = useState('')
  const [weather, setWeather] = useState('')
  const [showInfo, setShowInfo] = useState(false)
  const [expandedSection, setExpandedSection] = useState(null)
  const [showMoodHistory, setShowMoodHistory] = useState(false)
  const [insightMessage, setInsightMessage] = useState('Start tracking!')

  const particlesInit = async engine => await loadFull(engine)

  useEffect(() => {
    const savedEntries = localStorage.getItem('moodEntries')
    if (savedEntries) setMoodEntries(JSON.parse(savedEntries))
  }, [])

  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(moodEntries))
    if (moodEntries.length > 0) {
      const lastEntry = moodEntries[moodEntries.length - 1]
      const insight = getInsight(lastEntry)
      setInsightMessage(insight)
    } else {
      setInsightMessage('Start tracking your moods!')
    }
  }, [moodEntries])

  const getInsight = entry => {
    const { mood, sleepHours, waterIntake } = entry
    switch (mood.label) {
      case 'Happy':
        return `🌟 ${mood.label} (+${sleepHours}hrs sleep, +${waterIntake}L water)`
      case 'Sad':
        return `🌈 ${mood.label} (-${sleepHours}hrs sleep, -${waterIntake}L water)`
      case 'Angry':
        return `💥 High stress detected. Try mindfulness exercises!`
      default:
        return '✨ Track moods to find patterns'
    }
  }

  const logMood = () => {
    if (!currentMood) return

    const newEntry = {
      date: new Date().toISOString(),
      mood: currentMood,
      notes,
      activities,
      sleepHours: parseFloat(sleepHours),
      waterIntake: parseFloat(waterIntake),
      exerciseMinutes: parseInt(exerciseMinutes),
      gratitudeList: gratitudeList.split('\n'),
      goals: goals.split('\n'),
      weather
    }

    setMoodEntries([...moodEntries, newEntry])
    resetForm()
  }

  const resetForm = () => {
    setCurrentMood(null)
    setNotes('')
    setActivities([])
    setSleepHours('')
    setWaterIntake('')
    setExerciseMinutes('')
    setGratitudeList('')
    setGoals('')
    setWeather('')
    setExpandedSection(null)
  }

  const toggleActivity = activity =>
    setActivities(
      activities.includes(activity)
        ? activities.filter(a => a !== activity)
        : [...activities, activity]
    )

  const toggleSection = section =>
    setExpandedSection(section === expandedSection ? null : section)

  return (
    <div className='min-h-screen bg-zinc-900 text-white font-sans relative'>
      <Particles id='particles' init={particlesInit} options={particlesOptions} />

      <div className='container mx-auto px-4 py-8 relative z-10'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500'>
            MoodSphere
          </h1>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className='p-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white'
          >
            <Info size={24} />
          </button>
        </div>

        <AnimatePresence>
          {showInfo && (
            <motion.div
              key='info'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className='bg-zinc-900/20 backdrop-blur-xl p-4 mb-6 rounded-lg flex items-center space-x-2'
            >
              <Info size={24} className='text-sky-500' />
              <div>
                <p className='font-bold text-sky-500'>✨ Welcome to MoodSphere</p>
                <p className='text-xs text-sky-300'>
                  Track your moods, unlock patterns, and embrace your emotional journey with AI-driven insights!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {showMoodHistory ? (
          <motion.div
            key='history'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className='text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-500 mb-4'>
              Your Mood Timeline
            </h2>
            {moodEntries.length === 0 ? (
              <p className='text-center text-sky-200'>✨ Start tracking to see your journey!</p>
            ) : (
              <div className='overflow-hidden bg-zinc-800 p-4 rounded-lg'>
                <Bar
                  data={{
                    labels: moodEntries.map(entry =>
                      new Date(entry.date).toLocaleDateString()
                    ),
                    datasets: [{
                      label: 'Mood',
                      data: moodEntries.map(entry => entry.mood.label),
                      backgroundColor: moodEntries.map(
                        entry => `hsl(${entry.mood.color.replace(
                          /[^\d,]+/g,
                          ''
                        )}, 1)`
                      ),
                      borderRadius: 5,
                      borderSkipped: false
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        callbacks: {
                          label: context => `You felt: ${context.parsed.label}`
                        }
                      }
                    },
                    scales: {
                      x: { display: false },
                      y: { display: false }
                    }
                  }}
                />
              </div>
            )}

            <motion.div
              className='bg-gradient-to-r from-indigo-500 to-teal-500 p-4 rounded-lg mt-6'
              style={{ backdropFilter: 'blur(10px)' }}
            >
              <h3 className='text-lg font-semibold text-white mb-2'>
                AI-Driven Insight:
              </h3>
              <p className='text-white opacity-90'>{insightMessage}</p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key='input'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className='space-y-6'
          >
            <h2 className='text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-4'>
              How are you feeling?
            </h2>
            <div className='grid grid-cols-5 gap-4 mb-6'>
              {moodEmojis.map((mood, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentMood(mood)}
                  className={`p-4 rounded-lg shadow-sm transition-colors ${currentMood === mood && 'ring-2 ring-teal-500'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`bg-${mood.color}-500 rounded-full p-2`}>
                    {mood.emoji}
                  </div>
                  <div className={`text-${mood.color}-500 text-xs mt-2`}>
                    {mood.label}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Notes Section */}
            <div className='bg-zinc-800 p-4 rounded-lg'>
              <button
                onClick={() => toggleSection('notes')}
                className='w-full flex justify-between items-center'
              >
                <motion.div
                  className={`text-lg font-semibold transition-colors ${
                    expandedSection === 'notes' ? 'text-teal-500' : 'text-zinc-400'
                  }`}
                >
                  Notes
                </motion.div>
                {expandedSection === 'notes' ? (
                  <ChevronUp size={20} className='text-teal-500' />
                ) : (
                  <ChevronDown size={20} className='text-zinc-400' />
                )}
              </button>
              <AnimatePresence>
                {expandedSection === 'notes' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className='mt-4'
                  >
                    <textarea
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      placeholder='Add your thoughts...'
                      className='w-full p-2 bg-zinc-700 rounded-md text-white resize-none'
                      rows='3'
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Activities Section */}
            <div className='bg-zinc-800 p-4 rounded-lg'>
              <button
                onClick={() => toggleSection('activities')}
                className='w-full flex justify-between items-center'
              >
                <motion.div
                  className={`text-lg font-semibold transition-colors ${
                    expandedSection === 'activities' ? 'text-amber-500' : 'text-zinc-400'
                  }`}
                >
                  Activities
                </motion.div>
                {expandedSection === 'activities' ? (
                  <ChevronUp size={20} className='text-amber-500' />
                ) : (
                  <ChevronDown size={20} className='text-zinc-400' />
                )}
              </button>
              <AnimatePresence>
                {expandedSection === 'activities' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className='mt-4'
                  >
                    <div className='flex flex-wrap gap-2'>
                      {['Work', 'Exercise', 'Social', 'Hobby', 'Relax', 'Chores'].map(
                        activity => (
                          <button
                            key={activity}
                            onClick={() => toggleActivity(activity)}
                            className={`px-3 py-1 rounded-full transition-colors ${
                              activities.includes(activity)
                                ? 'bg-amber-500 text-white'
                                : 'bg-zinc-700 text-zinc-400'
                            }`}
                          >
                            {activity}
                          </button>
                        )
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sleep Tracker */}
            <div className='bg-zinc-800 p-4 rounded-lg'>
              <button
                onClick={() => toggleSection('sleep')}
                className='w-full flex justify-between items-center'
              >
                <motion.div
                  className={`text-lg font-semibold transition-colors ${
                    expandedSection === 'sleep' ? 'text-blue-500' : 'text-zinc-400'
                  }`}
                >
                  Sleep Tracker
                </motion.div>
                {expandedSection === 'sleep' ? (
                  <ChevronUp size={20} className='text-blue-500' />
                ) : (
                  <ChevronDown size={20} className='text-zinc-400' />
                )}
              </button>
              <AnimatePresence>
                {expandedSection === 'sleep' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className='mt-4'
                  >
                    <input
                      type='number'
                      value={sleepHours}
                      onChange={e => setSleepHours(e.target.value)}
                      placeholder='Sleep hours'
                      className='w-full p-2 bg-zinc-700 rounded-md text-white'
                    />
                    <div className='mt-2 h-2 rounded-full overflow-hidden'>
                      <div
                        className='h-full bg-blue-500 transition-width'
                        style={{ width: `${(sleepHours / 12) * 100}%` }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Water Intake */}
            <div className='bg-zinc-800 p-4 rounded-lg'>
              <button
                onClick={() => toggleSection('water')}
                className='w-full flex justify-between items-center'
              >
                <motion.div
                  className={`text-lg font-semibold transition-colors ${
                    expandedSection === 'water' ? 'text-green-500' : 'text-zinc-400'
                  }`}
                >
                  Water Intake
                </motion.div>
                {expandedSection === 'water' ? (
                  <ChevronUp size={20} className='text-green-500' />
                ) : (
                  <ChevronDown size={20} className='text-zinc-400' />
                )}
              </button>
              <AnimatePresence>
                {expandedSection === 'water' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className='mt-4'
                  >
                    <input
                      type='number'
                      value={waterIntake}
                      onChange={e => setWaterIntake(e.target.value)}
                      placeholder='Water intake (liters)'
                      className='w-full p-2 bg-zinc-700 rounded-md text-white'
                    />
                    <div className='mt-2 h-2 rounded-full overflow-hidden'>
                      <div
                        className='h-full bg-green-500 transition-width'
                        style={{ width: `${(waterIntake / 4) * 100}%` }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Exercise Tracker */}
            <div className='bg-zinc-800 p-4 rounded-lg'>
              <button
                onClick={() => toggleSection('exercise')}
                className='w-full flex justify-between items-center'
              >
                <motion.div
                  className={`text-lg font-semibold transition-colors ${
                    expandedSection === 'exercise' ? 'text-pink-500' : 'text-zinc-400'
                  }`}
                >
                  Exercise Tracker
                </motion.div>
                {expandedSection === 'exercise' ? (
                  <ChevronUp size={20} className='text-pink-500' />
                ) : (
                  <ChevronDown size={20} className='text-zinc-400' />
                )}
              </button>
              <AnimatePresence>
                {expandedSection === 'exercise' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className='mt-4'
                  >
                    <input
                      type='number'
                      value={exerciseMinutes}
                      onChange={e => setExerciseMinutes(e.target.value)}
                      placeholder='Exercise minutes'
                      className='w-full p-2 bg-zinc-700 rounded-md text-white'
                    />
                    <div className='mt-2 h-2 rounded-full overflow-hidden'>
                      <div
                        className='h-full bg-pink-500 transition-width'
                        style={{ width: `${(exerciseMinutes / 120) * 100}%` }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Gratitude Journal */}
            <div className='bg-zinc-800 p-4 rounded-lg'>
              <button
                onClick={() => toggleSection('gratitude')}
                className='w-full flex justify-between items-center'
              >
                <motion.div
                  className={`text-lg font-semibold transition-colors ${
                    expandedSection === 'gratitude' ? 'text-yellow-500' : 'text-zinc-400'
                  }`}
                >
                  Gratitude Journal
                </motion.div>
                {expandedSection === 'gratitude' ? (
                  <ChevronUp size={20} className='text-yellow-500' />
                ) : (
                  <ChevronDown size={20} className='text-zinc-400' />
                )}
              </button>
              <AnimatePresence>
                {expandedSection === 'gratitude' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className='mt-4'
                  >
                    <textarea
                      value={gratitudeList}
                      onChange={e => setGratitudeList(e.target.value)}
                      placeholder='What are you grateful for today?'
                      className='w-full p-2 bg-zinc-700 rounded-md text-white resize-none'
                      rows='3'
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Goals for Tomorrow */}
            <div className='bg-zinc-800 p-4 rounded-lg'>
              <button
                onClick={() => toggleSection('goals')}
                className='w-full flex justify-between items-center'
              >
                <motion.div
                  className={`text-lg font-semibold transition-colors ${
                    expandedSection === 'goals' ? 'text-purple-500' : 'text-zinc-400'
                  }`}
                >
                  Goals for Tomorrow
                </motion.div>
                {expandedSection === 'goals' ? (
                  <ChevronUp size={20} className='text-purple-500' />
                ) : (
                  <ChevronDown size={20} className='text-zinc-400' />
                )}
              </button>
              <AnimatePresence>
                {expandedSection === 'goals' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className='mt-4'
                  >
                    <textarea
                      value={goals}
                      onChange={e => setGoals(e.target.value)}
                      placeholder='What are your goals for tomorrow?'
                      className='w-full p-2 bg-zinc-700 rounded-md text-white resize-none'
                      rows='3'
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Weather Input */}
            <div className='bg-zinc-800 p-4 rounded-lg'>
              <button
                onClick={() => toggleSection('weather')}
                className='w-full flex justify-between items-center'
              >
                <motion.div
                  className={`text-lg font-semibold transition-colors ${
                    expandedSection === 'weather' ? 'text-cyan-500' : 'text-zinc-400'
                  }`}
                >
                  Weather
                </motion.div>
                {expandedSection === 'weather' ? (
                  <ChevronUp size={20} className='text-cyan-500' />
                ) : (
                  <ChevronDown size={20} className='text-zinc-400' />
                )}
              </button>
              <AnimatePresence>
                {expandedSection === 'weather' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className='mt-4'
                  >
                    <input
                      type='text'
                      value={weather}
                      onChange={e => setWeather(e.target.value)}
                      placeholder='What is the weather like?'
                      className='w-full p-2 bg-zinc-700 rounded-md text-white'
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Log Mood Button */}
            <button
              onClick={logMood}
              disabled={!currentMood}
              className={`w-full py-2 px-4 rounded-lg text-white font-semibold shadow-md transition-colors mt-4 ${
                !currentMood ? 'bg-zinc-700 hover:bg-zinc-800' : 'bg-teal-500 hover:bg-teal-600'
              }`}
            >
              Log Mood
            </button>
          </motion.div>
        )}

        <motion.button
          onClick={() => setShowMoodHistory(!showMoodHistory)}
          className='absolute top-0 right-0 p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors cursor-pointer opacity-0 group-hover:opacity-100'
        >
          {showMoodHistory ? (
            <ChevronUp size={24} className='text-teal-500' />
          ) : (
            <ChevronDown size={24} className='text-teal-500' />
          )}
        </motion.button>
      </div>
    </div>
  )
}