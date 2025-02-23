"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, ArrowRight, AlertTriangle } from "lucide-react"
import { toast } from "react-toastify"

const lessons = {
  "stress-basics": [
    {
      id: "stress-1",
      type: "text",
      content:
        'When you experience stress, your body activates the "fight or flight" response. The amygdala, your brain\'s alarm system, triggers the release of stress hormones like cortisol and adrenaline.',
      moduleType: "stress",
    },
    {
      id: "stress-2",
      type: "quiz",
      content: "",
      question:
        "True or False: Chronic stress can lead to physical changes in the brain, including hippocampus shrinkage?",
      answer: true,
      explanation:
        "Chronic stress can indeed cause the hippocampus to shrink, affecting memory and learning capabilities. However, these changes can be reversed through stress management and healthy habits.",
      moduleType: "stress",
    },
  ],
  "anxiety-management": [
    {
      id: "anxiety-1",
      type: "text",
      content:
        "Anxiety is your body's natural response to perceived threats. While it can be uncomfortable, anxiety itself is not dangerous and serves as a protective mechanism.",
      moduleType: "anxiety",
    },
    {
      id: "anxiety-2",
      type: "quiz",
      content: "",
      question: "True or False: Deep breathing exercises can help reduce anxiety symptoms?",
      answer: true,
      explanation:
        "Deep breathing exercises help activate your parasympathetic nervous system, reducing anxiety symptoms.",
      moduleType: "anxiety",
    },
  ],
}

const LessonViewer = ({ currentModule, completedLessons, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [userAnswer, setUserAnswer] = useState(null)

  const currentLessons = lessons[currentModule] || []
  const currentLesson = currentLessons[currentStep]

  const handleNext = () => {
    if (currentStep < currentLessons.length - 1) {
      setCurrentStep((prev) => prev + 1)
      setShowExplanation(false)
      setUserAnswer(null)
    }
  }

  const handleAnswer = (answer) => {
    setUserAnswer(answer)
    setShowExplanation(true)
    if (answer === currentLesson.answer) {
      onComplete(currentLesson.id, currentLesson.moduleType)
      toast.success("Correct answer! Well done!", {
        position: "bottom-right",
        autoClose: 2000,
      })
    } else {
      toast.error("Not quite right. Try again!", {
        position: "bottom-right",
        autoClose: 2000,
      })
    }
  }

  if (!currentLesson) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
          <AlertTriangle className="w-5 h-5" />
          <p>No lessons available for this module yet. Please check back later!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold">{currentLesson.type === "text" ? "Learn" : "Quiz Time!"}</h2>
      </div>
      <div className="p-6">
        <AnimatePresence mode="wait">
          {currentLesson.type === "text" ? (
            <motion.div
              key={`text-${currentStep}`}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-4"
            >
              <p className="text-lg leading-relaxed">{currentLesson.content}</p>
              <button
                onClick={handleNext}
                className="mt-4 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg flex items-center gap-2 transition-colors"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={`quiz-${currentStep}`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="space-y-4"
            >
              <p className="text-lg font-medium mb-4">{currentLesson.question}</p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleAnswer(true)}
                  disabled={showExplanation}
                  className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                    userAnswer === true
                      ? "bg-purple-500 text-white"
                      : "bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                  }`}
                >
                  <CheckCircle className="w-4 h-4" /> True
                </button>
                <button
                  onClick={() => handleAnswer(false)}
                  disabled={showExplanation}
                  className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                    userAnswer === false
                      ? "bg-purple-500 text-white"
                      : "bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                  }`}
                >
                  <XCircle className="w-4 h-4" /> False
                </button>
              </div>

              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <div
                      className={`p-4 rounded-lg ${
                        userAnswer === currentLesson.answer
                          ? "bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-200"
                          : "bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-200"
                      }`}
                    >
                      <p>{currentLesson.explanation}</p>
                    </div>
                    {currentStep < currentLessons.length - 1 && (
                      <button
                        onClick={handleNext}
                        className="mt-4 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg flex items-center gap-2 transition-colors"
                      >
                        Next Question <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default LessonViewer

