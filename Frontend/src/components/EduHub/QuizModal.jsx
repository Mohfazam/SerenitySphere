// QuizModal.jsx
import {useState, useEffect} from 'react'

import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, ChevronLeft, Trophy } from "lucide-react"

export default function QuizModal({ module, onClose, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const handleAnswer = (index) => {
    setSelectedAnswer(index)
    if(index === module.quiz[currentQuestion].correct) {
      setScore(s => s + 1)
    }
    
    setTimeout(() => {
      if(currentQuestion < module.quiz.length - 1) {
        setCurrentQuestion(c => c + 1)
        setSelectedAnswer(null)
      } else {
        onComplete(score)
      }
    }, 1500)
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >
        <div className="p-6 border-b dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-xl font-semibold">{module.title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {module.quiz.length}
            </span>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="font-medium">{score} Correct</span>
            </div>
          </div>

          <h4 className="text-lg font-medium mb-4">
            {module.quiz[currentQuestion].question}
          </h4>

          <div className="space-y-3">
            {module.quiz[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-3 rounded-lg text-left transition-colors ${
                  selectedAnswer === index
                    ? index === module.quiz[currentQuestion].correct
                      ? "bg-green-100 dark:bg-green-900"
                      : "bg-red-100 dark:bg-red-900"
                    : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                }`}
              >
                {option}
                {selectedAnswer === index && (
                  <CheckCircle
                    className={`inline ml-2 w-4 h-4 ${
                      index === module.quiz[currentQuestion].correct 
                        ? "text-green-500" 
                        : "text-red-500"
                    }`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}