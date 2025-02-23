"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, Trophy, BookOpen, X, ChevronRight, Search, CheckCircle, Clock, AlertTriangle, Video, Activity } from "lucide-react"
import ModuleCard from "./ModuleCard"
import ModuleDetailModal from "./ModuleDetailModal"
import confetti from 'canvas-confetti'

const modules = [
  {
    title: "Understanding Anxiety",
    description: "Master anxiety management techniques",
    detailedContent: {
      articles: [
        {
          title: "The Science of Anxiety",
          content: "Explore the neurobiology behind anxiety responses and modern treatment approaches...",
          duration: "8 min read"
        },
        {
          title: "Daily Practices for Calm",
          content: "Practical exercises to incorporate into your daily routine...",
          duration: "5 min read"
        }
      ],
      videos: [
        {
          title: "Breathing Masterclass",
          duration: "12:30",
          thumbnail: "https://source.unsplash.com/random/800x450/?calm"
        }
      ],
      exercises: [
        {
          title: "5-4-3-2-1 Grounding",
          steps: ["Identify 5 things you see", "4 things you feel", "3 things you hear", "2 things you smell", "1 thing you taste"],
          duration: "5 mins"
        }
      ]
    },
    icon: Brain,
    color: "from-purple-500 to-indigo-500",
    quiz: [
      {
        question: "Which technique provides immediate anxiety relief?",
        options: ["Deep Breathing", "Caffeine", "Ignoring", "Isolation"],
        correct: 0,
        explanation: "Deep breathing activates the parasympathetic nervous system"
      },
      {
        question: "What's the first step in cognitive restructuring?",
        options: ["Medication", "Identifying Distortions", "Exercise", "Journaling"],
        correct: 1,
        explanation: "You must first identify distorted thoughts before challenging them"
      }
    ]
  }
]

export default function EduHub() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedModule, setSelectedModule] = useState(null)
  const [quizState, setQuizState] = useState({ active: false, questionIndex: 0, score: 0 })
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem("mh-progress")
    return saved ? JSON.parse(saved) : { completed: [], score: 0 }
  })

  const fireConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }

  const filteredModules = useMemo(() => 
    modules.filter(m => 
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      m.description.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]
  )

  useEffect(() => {
    localStorage.setItem("mh-progress", JSON.stringify(progress))
  }, [progress])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.header 
          className="flex items-center justify-between mb-8 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ rotate: 360, scale: 1.1 }}
              className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl shadow-lg"
            >
              <Brain className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              MindAcademy Pro
            </h1>
          </div>
          <div className="flex items-center gap-4 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-gray-700 dark:to-gray-600 px-4 py-2 rounded-xl">
            <Trophy className="w-6 h-6 text-amber-500" />
            <span className="font-bold text-amber-600 dark:text-amber-400">
              {progress.score} XP
            </span>
          </div>
        </motion.header>

        <motion.div
          className="relative mb-8 group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity" />
          <input
            type="text"
            placeholder="Search modules..."
            className="w-full p-4 pl-12 rounded-2xl bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-purple-500 border-0 text-lg transition-all duration-300 hover:shadow-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500" />
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          layout
        >
          {filteredModules.map((module, index) => (
            <ModuleCard 
              key={index}
              module={module}
              isCompleted={progress.completed.includes(module.title)}
              progress={progress}
              onClick={() => setSelectedModule(module)}
            />
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedModule && (
            <ModuleDetailModal
              module={selectedModule}
              quizState={quizState}
              progress={progress}
              onClose={() => {
                setSelectedModule(null)
                setQuizState({ active: false, questionIndex: 0, score: 0 })
              }}
              onQuizStart={() => setQuizState({ active: true, questionIndex: 0, score: 0 })}
              onAnswer={(index) => {
                const isCorrect = index === selectedModule.quiz[quizState.questionIndex].correct
                const newScore = isCorrect ? quizState.score + 1 : quizState.score
                
                if(quizState.questionIndex < selectedModule.quiz.length - 1) {
                  setQuizState(prev => ({ ...prev, questionIndex: prev.questionIndex + 1, score: newScore }))
                } else {
                  setQuizState({ active: false, questionIndex: 0, score: newScore })
                  if(!progress.completed.includes(selectedModule.title)) {
                    setProgress(prev => ({
                      completed: [...prev.completed, selectedModule.title],
                      score: prev.score + newScore
                    }))
                    fireConfetti()
                  }
                }
              }}
              fireConfetti={fireConfetti}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}