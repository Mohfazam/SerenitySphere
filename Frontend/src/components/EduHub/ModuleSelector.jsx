"use client"

import { motion } from "framer-motion"
import { Brain, Heart, Target, Zap, Leaf } from "lucide-react"

const modules = [
  {
    id: "stress-basics",
    title: "Stress Basics",
    description: "Understanding your stress response",
    icon: Brain,
    color: "text-blue-500",
    bgColor: "bg-blue-100 dark:bg-blue-900",
  },
  {
    id: "anxiety-management",
    title: "Anxiety Management",
    description: "Tools for managing anxiety",
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-100 dark:bg-red-900",
  },
  {
    id: "focus-training",
    title: "Focus Training",
    description: "Improve concentration",
    icon: Target,
    color: "text-green-500",
    bgColor: "bg-green-100 dark:bg-green-900",
  },
  {
    id: "resilience-building",
    title: "Resilience Building",
    description: "Develop emotional resilience",
    icon: Zap,
    color: "text-yellow-500",
    bgColor: "bg-yellow-100 dark:bg-yellow-900",
  },
  {
    id: "mindfulness-practice",
    title: "Mindfulness Practice",
    description: "Introduction to mindfulness",
    icon: Leaf,
    color: "text-purple-500",
    bgColor: "bg-purple-100 dark:bg-purple-900",
  },
]

const ModuleSelector = ({ currentModule, completedLessons, onModuleSelect }) => {
  const getModuleProgress = (moduleId) => {
    const moduleCompletedLessons = completedLessons.filter((lesson) => lesson.startsWith(moduleId))
    return (moduleCompletedLessons.length / 2) * 100 // Assuming 2 lessons per module
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold">Learning Modules</h2>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {modules.map((module) => {
            const Icon = module.icon
            const progress = getModuleProgress(module.id)
            const isActive = currentModule === module.id

            return (
              <motion.button
                key={module.id}
                onClick={() => onModuleSelect(module.id)}
                className={`w-full text-left p-4 rounded-lg transition-colors ${
                  isActive
                    ? "bg-gray-100 dark:bg-gray-700 ring-2 ring-purple-500"
                    : "hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${module.bgColor}`}>
                    <Icon className={`w-4 h-4 ${module.color}`} />
                  </div>
                  <div>
                    <h3 className="font-medium">{module.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{module.description}</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1">
                  <div
                    className="bg-purple-500 h-1 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ModuleSelector

