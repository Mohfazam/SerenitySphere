"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, Heart, ArrowRight } from "lucide-react"
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"

const questions = [
  {
    id: 1,
    category: "emotional",
    icon: Heart,
    question: "How do you typically handle strong emotions?",
    options: [
      { text: "I express them freely and healthily", value: 5 },
      { text: "I try to control them", value: 4 },
      { text: "I sometimes struggle to manage them", value: 3 },
      { text: "I often bottle them up", value: 2 },
      { text: "I feel overwhelmed by them", value: 1 },
    ],
  },
  {
    id: 2,
    category: "cognitive",
    icon: Brain,
    question: "When faced with challenges, how do you usually respond?",
    options: [
      { text: "I see them as opportunities for growth", value: 5 },
      { text: "I try to find solutions systematically", value: 4 },
      { text: "I sometimes feel uncertain but persist", value: 3 },
      { text: "I often feel stressed and worried", value: 2 },
      { text: "I tend to avoid them", value: 1 },
    ],
  },
  // Add more questions...
]

const AssessmentJourney = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState({})
  const [particlesContainer, setParticlesContainer] = useState(null)

  const particlesInit = async (engine) => {
    await loadFull(engine)
  }

  const handleResponse = (value) => {
    setResponses({ ...responses, [questions[currentQuestion].id]: value })
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      onComplete(responses)
    }
  }

  const Question = ({ question, onAnswer }) => {
    const Icon = question.icon

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-2xl mx-auto"
      >
        <div className="mb-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Icon className="w-8 h-8" />
          </motion.div>
          <h2 className="text-2xl font-bold mb-4">{question.question}</h2>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mb-4">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-gray-400">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <div className="space-y-4">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => onAnswer(option.value)}
              className="w-full p-4 bg-gray-800/50 backdrop-blur-lg rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300"
              whileHover={{ scale: 1.02, backgroundColor: "rgba(139, 92, 246, 0.1)" }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-left">{option.text}</span>
                <ArrowRight className="w-5 h-5 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "out",
            },
          },
          interactivity: {
            events: {
              onhover: { enable: true, mode: "repulse" },
              onclick: { enable: true, mode: "push" },
            },
          },
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          <Question key={currentQuestion} question={questions[currentQuestion]} onAnswer={handleResponse} />
        </AnimatePresence>
      </div>
    </div>
  )
}

export default AssessmentJourney

