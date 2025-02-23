"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, Trophy, BookOpen, X, ChevronRight, Search, CheckCircle } from "lucide-react"
import ModuleCard from "./ModuleCard"
import ModuleDetailModal from "./ModuleDetailModal"

const modules = [
  {
    title: "Understanding Anxiety",
    description: "Master anxiety management techniques",
    detailedContent: `
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-purple-600">Anxiety Deep Dive</h2>
        <p class="text-lg">Anxiety is your body's natural response to stress. Learn to manage it effectively with evidence-based strategies.</p>
        
        <div class="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
          <h3 class="font-semibold mb-2">Key Concepts</h3>
          <ul class="list-disc pl-6 space-y-2">
            <li>Fight-or-Flight Response</li>
            <li>Cognitive Distortions</li>
            <li>Grounding Techniques</li>
            <li>Progressive Muscle Relaxation</li>
          </ul>
        </div>
      </div>
    `,
    icon: Brain,
    color: "bg-purple-500",
    quiz: [
      {
        question: "Which technique provides immediate anxiety relief?",
        options: ["Deep Breathing", "Caffeine", "Ignoring", "Isolation"],
        correct: 0
      }
    ]
  },
  {
    title: "Mindfulness Basics",
    description: "Develop present-moment awareness",
    detailedContent: `
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-teal-600">Mindfulness Mastery</h2>
        <p class="text-lg">Cultivate non-judgmental awareness of the present moment through proven mindfulness exercises.</p>
        
        <div class="bg-teal-50 dark:bg-teal-900 p-4 rounded-lg">
          <h3 class="font-semibold mb-2">Core Practices</h3>
          <ul class="list-disc pl-6 space-y-2">
            <li>Body Scan Meditation</li>
            <li>Breath Awareness</li>
            <li>Mindful Eating</li>
            <li>Walking Meditation</li>
          </ul>
        </div>
      </div>
    `,
    icon: BookOpen,
    color: "bg-teal-500",
    quiz: [
      {
        question: "Mindfulness helps with:",
        options: ["Rumination", "Impulsivity", "Both", "Neither"],
        correct: 2
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

  const filteredModules = useMemo(() => 
    modules.filter(m => 
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      m.description.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]
  )

  useEffect(() => {
    localStorage.setItem("mh-progress", JSON.stringify(progress))
  }, [progress])

  const handleQuizStart = () => {
    setQuizState({ active: true, questionIndex: 0, score: 0 })
  }

  const handleQuizComplete = () => {
    if(!progress.completed.includes(selectedModule.title)) {
      setProgress(prev => ({
        completed: [...prev.completed, selectedModule.title],
        score: prev.score + quizState.score
      }))
    }
    setQuizState({ active: false, questionIndex: 0, score: 0 })
  }

  const handleAnswer = (answerIndex) => {
    const isCorrect = answerIndex === selectedModule.quiz[quizState.questionIndex].correct
    const newScore = isCorrect ? quizState.score + 1 : quizState.score
    
    if(quizState.questionIndex < selectedModule.quiz.length - 1) {
      setQuizState(prev => ({
        ...prev,
        questionIndex: prev.questionIndex + 1,
        score: newScore
      }))
    } else {
      setQuizState(prev => ({ ...prev, score: newScore }))
      handleQuizComplete()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.header 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ rotate: 360 }}
              className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg"
            >
              <Brain className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              MindAcademy
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <span className="font-bold">{progress.score} XP</span>
          </div>
        </motion.header>

        {/* Search */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <input
            type="text"
            placeholder="Search modules..."
            className="w-full p-4 pl-12 rounded-xl bg-white dark:bg-gray-700 shadow-sm focus:ring-2 focus:ring-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </motion.div>

        {/* Modules Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          layout
        >
          {filteredModules.map((module, index) => (
            <ModuleCard 
              key={index}
              module={module}
              isCompleted={progress.completed.includes(module.title)}
              onClick={() => setSelectedModule(module)}
            />
          ))}
        </motion.div>

        {/* Detail & Quiz Modal */}
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
              onQuizStart={handleQuizStart}
              onAnswer={handleAnswer}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}