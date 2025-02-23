// EduHub.jsx
"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, Trophy, BookOpen, X, ChevronRight, Search, CheckCircle } from "lucide-react"
import ModuleCard from "./ModuleCard"
import QuizModal from "./QuizModal"

const modules = [
  {
    title: "Understanding Anxiety",
    description: "Learn about anxiety triggers, physiological responses, and evidence-based management techniques.",
    icon: Brain,
    color: "bg-purple-500",
    quiz: [
      {
        question: "Which technique helps manage anxiety immediately?",
        options: ["Deep breathing", "Ignoring it", "Caffeine", "Isolation"],
        correct: 0
      }
    ]
  },
  {
    title: "Mindfulness Basics",
    description: "Master mindfulness techniques to improve emotional regulation and stress management.",
    icon: BookOpen,
    color: "bg-teal-500",
    quiz: [
      {
        question: "Mindfulness helps with:",
        options: ["Present awareness", "Multitasking", "Memory loss", "Social media"],
        correct: 0
      }
    ]
  }
]

export default function EduHub() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedModule, setSelectedModule] = useState(null)
  const [progress, setProgress] = useState(() => {
    if(typeof window !== 'undefined') {
      const saved = localStorage.getItem("eduProgress")
      return saved ? JSON.parse(saved) : { completed: [], score: 0 }
    }
    return { completed: [], score: 0 }
  })

  const filteredModules = useMemo(() => 
    modules.filter(m => 
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      m.description.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]
  )

  useEffect(() => {
    localStorage.setItem("eduProgress", JSON.stringify(progress))
  }, [progress])

  const handleQuizComplete = (score) => {
    if(!progress.completed.includes(selectedModule.title)) {
      setProgress(prev => ({
        completed: [...prev.completed, selectedModule.title],
        score: prev.score + score
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4">
            <Brain className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              MindAcademy
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <span className="font-bold">{progress.score} XP</span>
          </div>
        </motion.div>

        {/* Search */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search lessons..."
            className="w-full p-4 pl-12 rounded-xl bg-white dark:bg-gray-700 shadow-sm focus:ring-2 focus:ring-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

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

        {/* Quiz Modal */}
        <AnimatePresence>
          {selectedModule && (
            <QuizModal 
              module={selectedModule}
              onClose={() => setSelectedModule(null)}
              onComplete={handleQuizComplete}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}