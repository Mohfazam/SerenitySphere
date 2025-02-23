"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, ChevronLeft, BookOpen, CircleCheck } from "lucide-react"

export default function ModuleDetailModal({ module, quizState, progress, onClose, onQuizStart, onAnswer }) {
  const currentQuestion = module.quiz[quizState.questionIndex]
  const isCompleted = progress.completed.includes(module.title)

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
        layoutId={`module-${module.title}`}
      >
        <div className="p-6 border-b dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-xl font-semibold">{module.title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {!quizState.active ? (
            <>
              <div 
                className="prose dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: module.detailedContent }}
              />
              
              <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  <span>{module.quiz.length}-Question Quiz</span>
                </div>
                {isCompleted ? (
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CircleCheck className="w-5 h-5" />
                    <span>Completed</span>
                  </div>
                ) : (
                  <button 
                    onClick={onQuizStart}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Start Quiz
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">
                  Question {quizState.questionIndex + 1} of {module.quiz.length}
                </span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium">{quizState.score} Correct</span>
                </div>
              </div>

              <h4 className="text-lg font-medium mb-4">{currentQuestion.question}</h4>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => onAnswer(index)}
                    className={`w-full p-3 rounded-lg text-left transition-colors ${
                      index === currentQuestion.correct
                        ? "bg-green-100 dark:bg-green-900"
                        : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}