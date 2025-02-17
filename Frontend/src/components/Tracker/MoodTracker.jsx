"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
  Moon,
} from "lucide-react"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const moodEmojis = [
  { emoji: <Smile size={32} />, label: "Happy", color: "bg-green-500", textColor: "text-green-500" },
  { emoji: <Meh size={32} />, label: "Neutral", color: "bg-yellow-500", textColor: "text-yellow-500" },
  { emoji: <Frown size={32} />, label: "Sad", color: "bg-blue-500", textColor: "text-blue-500" },
  { emoji: <Angry size={32} />, label: "Angry", color: "bg-red-500", textColor: "text-red-500" },
  { emoji: <Zap size={32} />, label: "Energetic", color: "bg-purple-500", textColor: "text-purple-500" },
]

export const MoodTracker = () => {
  const [moodEntries, setMoodEntries] = useState([])
  const [currentMood, setCurrentMood] = useState(null)
  const [notes, setNotes] = useState("")
  const [activities, setActivities] = useState([])
  const [sleepHours, setSleepHours] = useState("")
  const [waterIntake, setWaterIntake] = useState("")
  const [exerciseMinutes, setExerciseMinutes] = useState("")
  const [gratitudeList, setGratitudeList] = useState("")
  const [goals, setGoals] = useState("")
  const [weather, setWeather] = useState("")
  const [view, setView] = useState("input")
  const [showInfo, setShowInfo] = useState(false)
  const [expandedSection, setExpandedSection] = useState(null)

  const particlesInit = async (engine) => {
    await loadFull(engine)
  }

  useEffect(() => {
    const storedMoodEntries = localStorage.getItem("moodEntries")
    if (storedMoodEntries) {
      setMoodEntries(JSON.parse(storedMoodEntries))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("moodEntries", JSON.stringify(moodEntries))
  }, [moodEntries])

  const logMood = () => {
    if (!currentMood) return

    const newEntry = {
      date: new Date().toISOString(),
      mood: currentMood,
      notes,
      activities,
      sleepHours: Number.parseFloat(sleepHours),
      waterIntake: Number.parseFloat(waterIntake),
      exerciseMinutes: Number.parseInt(exerciseMinutes),
      gratitudeList: gratitudeList.split("\n"),
      goals: goals.split("\n"),
      weather,
    }

    setMoodEntries([...moodEntries, newEntry])
    resetForm()
  }

  const resetForm = () => {
    setCurrentMood(null)
    setNotes("")
    setActivities([])
    setSleepHours("")
    setWaterIntake("")
    setExerciseMinutes("")
    setGratitudeList("")
    setGoals("")
    setWeather("")
    setExpandedSection(null)
  }

  const toggleActivity = (activity) => {
    setActivities(activities.includes(activity) ? activities.filter((a) => a !== activity) : [...activities, activity])
  }

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const renderMoodInput = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold mb-4">How are you feeling today?</h2>
      <div className="grid grid-cols-5 gap-4 mb-6">
        {moodEmojis.map((mood, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentMood(mood)}
            className={`p-4 rounded-lg ${mood.color} shadow-sm hover:shadow-md transition-shadow ${currentMood === mood ? "ring-2 ring-offset-2 ring-blue-500" : ""}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {mood.emoji}
            <div className="text-xs mt-2 text-white">{mood.label}</div>
          </motion.button>
        ))}
      </div>

      {/* Notes Section */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <button
          onClick={() => toggleSection("notes")}
          className="w-full flex justify-between items-center"
        >
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold">Notes</span>
          </div>
          {expandedSection === "notes" ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        <AnimatePresence>
          {expandedSection === "notes" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about your mood..."
                className="w-full p-2 bg-gray-700 rounded-md text-white"
                rows="3"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Activities Section */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <button
          onClick={() => toggleSection("activities")}
          className="w-full flex justify-between items-center"
        >
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold">Activities</span>
          </div>
          {expandedSection === "activities" ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        <AnimatePresence>
          {expandedSection === "activities" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <div className="flex flex-wrap gap-2">
                {["Work", "Exercise", "Social", "Hobby", "Relax", "Chores"].map((activity) => (
                  <button
                    key={activity}
                    onClick={() => toggleActivity(activity)}
                    className={`px-3 py-1 rounded-full ${activities.includes(activity) ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"}`}
                  >
                    {activity}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sleep Tracker */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <button
          onClick={() => toggleSection("sleep")}
          className="w-full flex justify-between items-center"
        >
          <div className="flex items-center space-x-2">
            <Bed size={20} />
            <span className="text-lg font-semibold">Sleep Tracker</span>
          </div>
          {expandedSection === "sleep" ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        <AnimatePresence>
          {expandedSection === "sleep" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <input
                type="number"
                value={sleepHours}
                onChange={(e) => setSleepHours(e.target.value)}
                placeholder="Sleep hours"
                className="w-full p-2 bg-gray-700 rounded-md text-white"
              />
              <div className="mt-2 h-2 bg-gray-600 rounded-full">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${(sleepHours / 12) * 100}%` }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Water Intake Tracker */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <button
          onClick={() => toggleSection("water")}
          className="w-full flex justify-between items-center"
        >
          <div className="flex items-center space-x-2">
            <Droplet size={20} />
            <span className="text-lg font-semibold">Water Intake</span>
          </div>
          {expandedSection === "water" ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        <AnimatePresence>
          {expandedSection === "water" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <input
                type="number"
                value={waterIntake}
                onChange={(e) => setWaterIntake(e.target.value)}
                placeholder="Water intake (liters)"
                className="w-full p-2 bg-gray-700 rounded-md text-white"
              />
              <div className="mt-2 h-2 bg-gray-600 rounded-full">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${(waterIntake / 4) * 100}%` }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Exercise Tracker */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <button
          onClick={() => toggleSection("exercise")}
          className="w-full flex justify-between items-center"
        >
          <div className="flex items-center space-x-2">
            <HeartPulse size={20} />
            <span className="text-lg font-semibold">Exercise Tracker</span>
          </div>
          {expandedSection === "exercise" ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        <AnimatePresence>
          {expandedSection === "exercise" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <input
                type="number"
                value={exerciseMinutes}
                onChange={(e) => setExerciseMinutes(e.target.value)}
                placeholder="Exercise minutes"
                className="w-full p-2 bg-gray-700 rounded-md text-white"
              />
              <div className="mt-2 h-2 bg-gray-600 rounded-full">
                <div
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: `${(exerciseMinutes / 120) * 100}%` }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Gratitude Journal */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <button
          onClick={() => toggleSection("gratitude")}
          className="w-full flex justify-between items-center"
        >
          <div className="flex items-center space-x-2">
            <Sun size={20} />
            <span className="text-lg font-semibold">Gratitude Journal</span>
          </div>
          {expandedSection === "gratitude" ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        <AnimatePresence>
          {expandedSection === "gratitude" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <textarea
                value={gratitudeList}
                onChange={(e) => setGratitudeList(e.target.value)}
                placeholder="What are you grateful for today?"
                className="w-full p-2 bg-gray-700 rounded-md text-white"
                rows="3"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Goals for Tomorrow */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <button
          onClick={() => toggleSection("goals")}
          className="w-full flex justify-between items-center"
        >
          <div className="flex items-center space-x-2">
            <Target size={20} />
            <span className="text-lg font-semibold">Goals for Tomorrow</span>
          </div>
          {expandedSection === "goals" ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        <AnimatePresence>
          {expandedSection === "goals" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <textarea
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                placeholder="What are your goals for tomorrow?"
                className="w-full p-2 bg-gray-700 rounded-md text-white"
                rows="3"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Weather Input */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <button
          onClick={() => toggleSection("weather")}
          className="w-full flex justify-between items-center"
        >
          <div className="flex items-center space-x-2">
            <Cloud size={20} />
            <span className="text-lg font-semibold">Weather</span>
          </div>
          {expandedSection === "weather" ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        <AnimatePresence>
          {expandedSection === "weather" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <input
                type="text"
                value={weather}
                onChange={(e) => setWeather(e.target.value)}
                placeholder="What's the weather like today?"
                className="w-full p-2 bg-gray-700 rounded-md text-white"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Log Mood Button */}
      <button
        onClick={logMood}
        disabled={!currentMood}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-700 disabled:cursor-not-allowed"
      >
        Log Mood
      </button>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans relative">
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "#1f2937", // Match the dark theme
            },
          },
          particles: {
            number: {
              value: 50,
            },
            move: {
              enable: true,
              speed: 2,
            },
            opacity: {
              value: 0.5,
            },
            size: {
              value: 3,
            },
          },
        }}
      />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Mood Tracker</h1>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="p-2 rounded-full bg-blue-500 text-white"
          >
            <Info size={24} />
          </button>
        </div>

        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 rounded"
            >
              <p className="font-bold">Welcome to Mood Tracker!</p>
              <p>
                Track your daily moods, view your mood history, and gain insights into your emotional well-being.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {renderMoodInput()}
      </div>
    </div>
  )
}