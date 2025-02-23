"use client"

import { useState, useEffect, useMemo, useReducer } from "react"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { Brain, Trophy, BookOpen, X, ChevronRight, Search, CheckCircle, Activity } from "lucide-react"

const modules = [
  {
    id: 1,
    title: "Understanding Anxiety",
    icon: Brain,
    color: "from-purple-500 to-indigo-500",
    lesson: `Anxiety is a natural response to stress, characterized by feelings of tension, worried thoughts, and physical changes...`,
    quiz: [
      {
        question: "What is the primary purpose of grounding techniques?",
        options: ["Increase anxiety", "Redirect focus to present", "Enhance memory", "Improve strength"],
        correct: 1,
        explanation: "Grounding techniques help redirect focus from anxious thoughts"
      }
    ]
  },
  {
    id: 2,
    title: "Managing Depression",
    icon: Brain,
    color: "from-blue-500 to-cyan-500",
    lesson: `Depression is a common mental health disorder characterized by persistent feelings of sadness...`,
    quiz: [
      {
        question: "Which activity helps combat depression?",
        options: ["Social isolation", "Physical exercise", "Sleeping excessively", "Avoiding sunlight"],
        correct: 1,
        explanation: "Exercise releases endorphins that improve mood"
      }
    ]
  },
  // Add more modules with unique IDs
]

function appReducer(state, action) {
  switch (action.type) {
    case 'LOAD_PROGRESS':
      return { ...state, ...action.payload }
    case 'COMPLETE_MODULE':
      return {
        ...state,
        completed: [...new Set([...state.completed, action.moduleId])],
        score: state.score + action.score
      }
    case 'SET_ACTIVE_MODULE':
      return { ...state, activeModuleId: action.moduleId }
    case 'START_QUIZ':
      return { ...state, quizState: 'active' }
    case 'RESET_MODULE':
      return { ...state, activeModuleId: null, quizState: 'idle' }
    default:
      return state
  }
}

const initialState = {
  completed: [],
  score: 0,
  activeModuleId: null,
  quizState: 'idle'
}

export default function EduHub() {
  const [searchTerm, setSearchTerm] = useState("")
  const [state, dispatch] = useReducer(appReducer, initialState)
  const [confetti, setConfetti] = useState([])
  const [quizAnswers, setQuizAnswers] = useState({})

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("mh-progress")) || initialState
    dispatch({ type: 'LOAD_PROGRESS', payload: saved })
  }, [])

  useEffect(() => {
    localStorage.setItem("mh-progress", JSON.stringify(state))
  }, [state])

  const fireConfetti = () => {
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10,
      rotate: Math.random() * 360
    }))
    setConfetti(particles)
    setTimeout(() => setConfetti([]), 3000)
  }

  const currentModule = modules.find(m => m.id === state.activeModuleId)
  const currentQuiz = currentModule?.quiz || []
  const currentProgress = currentQuiz.reduce((acc, _, index) => 
    acc + (quizAnswers[index]?.isCorrect ? 1 : 0), 0)
  const isQuizComplete = Object.keys(quizAnswers).length === currentQuiz.length

  const handleAnswer = (questionIndex, answerIndex) => {
    if (quizAnswers[questionIndex]) return
    
    setQuizAnswers(prev => ({
      ...prev,
      [questionIndex]: {
        selected: answerIndex,
        isCorrect: answerIndex === currentQuiz[questionIndex].correct
      }
    }))
  }

  const handleQuizComplete = () => {
    if (currentModule && !state.completed.includes(currentModule.id)) {
      const earnedScore = currentProgress * 10
      dispatch({ 
        type: 'COMPLETE_MODULE', 
        moduleId: currentModule.id, 
        score: earnedScore 
      })
      fireConfetti()
    }
    dispatch({ type: 'RESET_MODULE' })
    setQuizAnswers({})
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="fixed inset-0 pointer-events-none z-50">
        {confetti.map(p => (
          <motion.div
            key={p.id}
            className="absolute w-2 h-2 bg-purple-500 rounded-full"
            initial={{ x: `${p.x}%`, y: `${p.y}%`, opacity: 1, rotate: p.rotate }}
            animate={{ 
              y: "110%", 
              x: `${p.x + (Math.random() * 40 - 20)}%`,
              rotate: p.rotate + 360,
              opacity: 0
            }}
            transition={{ duration: 2, ease: "linear" }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.header className="flex items-center justify-between mb-8 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg">
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ rotate: 360 }}
              className="p-3 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg shadow-lg"
            >
              <Brain className="text-white w-6 h-6" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              MindAcademy
            </h1>
          </div>
          <div className="flex items-center gap-3 bg-purple-100 dark:bg-gray-700 px-4 py-2 rounded-xl">
            <Trophy className="text-amber-500 w-5 h-5" />
            <span className="font-semibold text-purple-600 dark:text-amber-400">
              {state.score} XP
            </span>
          </div>
        </motion.header>

        <div className="relative mb-8 group">
          <input
            type="text"
            placeholder="Search modules..."
            className="w-full p-4 pl-12 rounded-xl bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-purple-500 border-0 text-lg transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500" />
        </div>

        <LayoutGroup>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.filter(m => 
              m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
              m.lesson.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((module) => (
              <motion.div
                key={module.id}
                layoutId={module.id.toString()}
                className={`group relative bg-gradient-to-br ${module.color} rounded-2xl shadow-xl cursor-pointer overflow-hidden`}
                whileHover={{ scale: 1.03 }}
                onClick={() => dispatch({ type: 'SET_ACTIVE_MODULE', moduleId: module.id })}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-4">
                      <motion.div 
                        className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center"
                        whileHover={{ rotate: 15 }}
                      >
                        <module.icon className="text-white w-6 h-6" />
                      </motion.div>
                      <h2 className="text-xl font-semibold text-white">{module.title}</h2>
                      <p className="text-white/90 line-clamp-3">{module.lesson.substring(0, 150)}...</p>
                    </div>
                    <ChevronRight className="text-white/80 group-hover:text-white transition-colors" />
                  </div>
                  {state.completed.includes(module.id) && (
                    <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Completed
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </LayoutGroup>

        <AnimatePresence>
          {state.activeModuleId && currentModule && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => dispatch({ type: 'RESET_MODULE' })}
            >
              <motion.div
                layoutId={currentModule.id.toString()}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b dark:border-gray-700 flex items-center justify-between bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                  <h3 className="text-2xl font-bold">{currentModule.title}</h3>
                  <button 
                    onClick={() => dispatch({ type: 'RESET_MODULE' })}
                    className="p-2 hover:bg-white/10 rounded-full"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {state.quizState === 'idle' ? (
                    <div className="space-y-6">
                      <article className="prose dark:prose-invert max-w-none">
                        <h4 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">
                          Lesson Content
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                          {currentModule.lesson}
                        </p>
                      </article>
                      <button
                        onClick={() => dispatch({ type: 'START_QUIZ' })}
                        className="w-full bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl transition-colors"
                      >
                        Start Quiz ({currentModule.quiz.length} Questions)
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-purple-500">
                          Question {Object.keys(quizAnswers).length + 1}/{currentQuiz.length}
                        </span>
                        <div className="flex items-center gap-2">
                          <Trophy className="w-5 h-5 text-amber-500" />
                          <span className="font-medium">{currentProgress * 10} XP Earned</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {currentQuiz.map((question, index) => (
                          <div 
                            key={index}
                            className={`p-4 rounded-xl transition-colors ${
                              quizAnswers[index] ? 'bg-purple-50 dark:bg-purple-900/20' : ''
                            }`}
                          >
                            <h4 className="text-lg font-medium mb-4">{question.question}</h4>
                            <div className="grid gap-3">
                              {question.options.map((option, optionIndex) => {
                                const isSelected = quizAnswers[index]?.selected === optionIndex
                                const isCorrect = optionIndex === question.correct
                                return (
                                  <motion.button
                                    key={optionIndex}
                                    className={`p-3 rounded-xl text-left transition-colors ${
                                      isSelected
                                        ? isCorrect
                                          ? 'bg-green-100 dark:bg-green-900'
                                          : 'bg-red-100 dark:bg-red-900'
                                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                                    whileHover={{ scale: quizAnswers[index] ? 1 : 1.02 }}
                                    onClick={() => handleAnswer(index, optionIndex)}
                                    disabled={!!quizAnswers[index]}
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                        isSelected 
                                          ? isCorrect 
                                            ? 'bg-green-500 text-white' 
                                            : 'bg-red-500 text-white'
                                          : 'bg-gray-300 dark:bg-gray-600'
                                      }`}>
                                        {String.fromCharCode(65 + optionIndex)}
                                      </div>
                                      <span>{option}</span>
                                    </div>
                                    {quizAnswers[index] && isCorrect && (
                                      <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                                        {question.explanation}
                                      </p>
                                    )}
                                  </motion.button>
                                )
                              })}
                            </div>
                          </div>
                        ))}
                      </div>

                      {isQuizComplete && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center space-y-4"
                        >
                          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                          <h4 className="text-2xl font-bold">Quiz Complete!</h4>
                          <p className="text-xl">
                            Score: {currentProgress}/{currentQuiz.length}
                          </p>
                          <button
                            onClick={handleQuizComplete}
                            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl transition-colors"
                          >
                            {state.completed.includes(currentModule.id)
                              ? "Retake Quiz"
                              : "Complete Module"}
                          </button>
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}