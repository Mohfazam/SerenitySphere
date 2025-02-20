"use client"

import { motion } from "framer-motion"
import { ClipboardCheck, PieChart, Map } from "lucide-react"

const ProgressTracker = ({ currentStep }) => {
  const steps = [
    { id: "assessment", label: "Assessment", icon: ClipboardCheck },
    { id: "profile", label: "Profile", icon: PieChart },
    { id: "roadmap", label: "Roadmap", icon: Map },
  ]

  const getCurrentStepIndex = () => {
    return steps.findIndex((step) => step.id === currentStep)
  }

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center relative">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isActive = index <= getCurrentStepIndex()
          const isCompleted = index < getCurrentStepIndex()

          return (
            <div key={step.id} className="flex-1 flex flex-col items-center relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isActive ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
                }`}
              >
                <Icon className="w-5 h-5" />
              </motion.div>
              <span
                className={`mt-2 text-sm font-medium ${
                  isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          )
        })}

        <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700">
          <motion.div
            className="h-full bg-blue-600"
            initial={{ width: "0%" }}
            animate={{
              width: `${(getCurrentStepIndex() / (steps.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  )
}

export default ProgressTracker

