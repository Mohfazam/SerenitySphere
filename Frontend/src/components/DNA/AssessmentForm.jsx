"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Check, Circle } from "lucide-react"
import { questions } from "./MentalHealthTest"  // Ensure this is imported correctly

const AssessmentForm = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState({})

  // Log questions to check if they are imported correctly
  useEffect(() => {
    console.log("Questions array:", questions)
  }, [])

  const handleResponse = (value) => {
    if (!questions || !questions[currentStep]) return // Prevent errors

    setResponses(prev => ({ ...prev, [questions[currentStep].id]: value }))

    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300)
    } else {
      onComplete(responses)
    }
  }

  if (!questions || questions.length === 0) {
    return <p className="text-red-500">Error: No questions available.</p>
  }

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="mb-8 space-y-4">
        <div className="flex justify-between items-center text-sm font-medium text-blue-600 dark:text-blue-400">
          <span>Question {currentStep + 1} of {questions.length}</span>
          <span>{Math.round(((currentStep + 1) / questions.length) * 100)}% Complete</span>
        </div>
        
        <div className="relative h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>

      <motion.div 
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="mb-8"
      >
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white leading-tight">
          {questions[currentStep]?.text ?? "Loading..."}  {/* Prevent crash */}
        </h3>
      </motion.div>

      <div className="grid grid-cols-1 gap-3">
        {[5, 4, 3, 2, 1].map((value) => (
          <motion.button
            key={value}
            onClick={() => handleResponse(value)}
            className={`p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between
              ${
                responses[questions[currentStep]?.id] === value
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-400 shadow-sm"
                  : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
              }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-medium text-gray-900 dark:text-white">
              {["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"][5 - value]}
            </span>
            
            {responses[questions[currentStep]?.id] === value ? (
              <Check className="w-5 h-5 text-blue-500 dark:text-blue-400" />
            ) : (
              <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600" />
            )}
          </motion.button>
        ))}
      </div>

      {currentStep === questions.length - 1 && (
        <motion.button
          onClick={() => onComplete(responses)}
          className="mt-8 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold
                   hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View Your Results
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      )}
    </motion.div>
  )
}

export default AssessmentForm
