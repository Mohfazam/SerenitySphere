// ProgressTracker.jsx
"use client"

import { motion } from "framer-motion"
import { ClipboardCheck, PieChart, Map, Check } from "lucide-react"

const ProgressTracker = ({ currentStep }) => {
  const steps = [
    { id: "assessment", label: "Assessment", icon: ClipboardCheck },
    { id: "profile", label: "Analysis", icon: PieChart },
    { id: "roadmap", label: "Action Plan", icon: Map },
  ]

  const currentIndex = steps.findIndex(step => step.id === currentStep)

  return (
    <div className="mb-8">
      <div className="relative">
        <div className="flex justify-between items-center mb-8">
          {steps.map((step, index) => {
            const isCompleted = index < currentIndex
            const isActive = index <= currentIndex
            
            return (
              <div key={step.id} className="relative z-10">
                <motion.div
                  className={`flex flex-col items-center transition-all duration-300 ${
                    isActive ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2
                    ${isCompleted ? "bg-green-500 text-white" : 
                     isActive ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-400"}`}>
                    {isCompleted ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-6 h-6" />
                    )}
                  </div>
                  <span className={`text-sm font-medium ${
                    isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-500"
                  }`}>
                    {step.label}
                  </span>
                </motion.div>
              </div>
            )
          })}
        </div>

        <motion.div 
          className="absolute top-6 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </div>
  )
}

export default ProgressTracker