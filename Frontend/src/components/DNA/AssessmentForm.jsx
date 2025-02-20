"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"
import { questions } from "./MentalHealthTest"

const AssessmentForm = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState({})

  const handleResponse = (value) => {
    setResponses({ ...responses, [questions[currentStep].id]: value })
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete(responses)
    }
  }

  const getResponseLabel = (value) => {
    switch (value) {
      case 1:
        return "Strongly Disagree"
      case 2:
        return "Disagree"
      case 3:
        return "Neutral"
      case 4:
        return "Agree"
      case 5:
        return "Strongly Agree"
      default:
        return ""
    }
  }

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Question {currentStep + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {Math.round(((currentStep + 1) / questions.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-blue-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <motion.h3
        key={currentStep}
        className="text-xl font-semibold mb-6 text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {questions[currentStep].text}
      </motion.h3>

      <div className="grid grid-cols-1 gap-3">
        {[5, 4, 3, 2, 1].map((value) => (
          <motion.button
            key={value}
            onClick={() => handleResponse(value)}
            className={`p-4 rounded-lg border-2 text-left transition-colors ${
              responses[questions[currentStep].id] === value
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900 dark:border-blue-400"
                : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900 dark:text-white">{getResponseLabel(value)}</span>
              {responses[questions[currentStep].id] === value && (
                <Check className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {currentStep === questions.length - 1 && Object.keys(responses).length === questions.length && (
        <motion.button
          onClick={() => onComplete(responses)}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Complete Assessment
          <ArrowRight className="ml-2 w-5 h-5" />
        </motion.button>
      )}
    </motion.div>
  )
}

export default AssessmentForm

