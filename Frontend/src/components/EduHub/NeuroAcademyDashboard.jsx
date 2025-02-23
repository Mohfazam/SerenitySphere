"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Brain, Trophy, Star } from "lucide-react"
import { toast } from "react-toastify"
import ProgressRoadmap from "./ProgressRoadmap"
import LessonViewer from "./LessonViewer"
import AchievementSystem from "./AchievementSystem"
import ModuleSelector from "./ModuleSelector"

const NeuroAcademyDashboard = () => {
  const [progress, setProgress] = useState(
    () =>
      JSON.parse(localStorage.getItem("learningProgress") || "null") || {
        completedLessons: [],
        currentModule: "stress-basics",
        xp: 0,
        achievements: [],
        skillLevels: {
          stress: 0,
          anxiety: 0,
          focus: 0,
          resilience: 0,
          mindfulness: 0,
        },
      },
  )

  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    localStorage.setItem("learningProgress", JSON.stringify(progress))
  }, [progress])

  const handleLessonComplete = (lessonId, moduleType) => {
    if (!progress.completedLessons.includes(lessonId)) {
      const xpGain = 10
      const newProgress = {
        ...progress,
        completedLessons: [...progress.completedLessons, lessonId],
        xp: progress.xp + xpGain,
        skillLevels: {
          ...progress.skillLevels,
          [moduleType]: progress.skillLevels[moduleType] + 2,
        },
      }
      setProgress(newProgress)
      toast.success(`Congratulations! You earned ${xpGain} XP!`, {
        position: "bottom-right",
        autoClose: 3000,
      })
    }
  }

  const handleModuleChange = (moduleId) => {
    setProgress((prev) => ({
      ...prev,
      currentModule: moduleId,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950 p-6">
      <motion.div
        className="max-w-6xl mx-auto space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg"
              >
                <Brain className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </motion.div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">NeuroFlourish Academy</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Your journey to mental wellness through education
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-lg">{progress.xp} XP</span>
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
          >
            <div className="flex items-start gap-3">
              <Star className="w-5 h-5 text-blue-500 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">Welcome to NeuroFlourish Academy!</h3>
                <p className="text-blue-800 dark:text-blue-200 mt-1">
                  Begin your journey to better mental health through interactive learning. Complete lessons to earn XP
                  and unlock achievements.
                </p>
                <button
                  onClick={() => setShowWelcome(false)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2"
                >
                  Got it, thanks!
                </button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Module Selection and Progress */}
          <div className="md:col-span-1 space-y-6">
            <ModuleSelector
              currentModule={progress.currentModule}
              completedLessons={progress.completedLessons}
              onModuleSelect={handleModuleChange}
            />
            <AchievementSystem xp={progress.xp} achievements={progress.achievements} setProgress={setProgress} />
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Your Learning Progress</h3>
              <ProgressRoadmap progress={progress} />
            </div>

            <LessonViewer
              currentModule={progress.currentModule}
              completedLessons={progress.completedLessons}
              onComplete={handleLessonComplete}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default NeuroAcademyDashboard

