"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft } from "lucide-react"
import AssessmentForm from "./AssessmentForm"
import MentalHealthProfile from "./MentalHealthProfile"
import PersonalizedRoadmap from "./PersonalizedRoadmap"
import ProgressTracker from "./ProgressTracker"

const MentalHealthTest = () => {
  const [step, setStep] = useState("assessment") // 'assessment', 'profile', 'roadmap'
  const [responses, setResponses] = useState({})
  const [scores, setScores] = useState(null)

  const calculateScores = (responses) => {
    const domainScores = {
      stress: 0,
      anxiety: 0,
      depression: 0,
      resilience: 0,
      emotional: 0,
    }

    // Calculate scores for each domain based on responses
    Object.entries(responses).forEach(([questionId, response]) => {
      const question = questions.find((q) => q.id === Number.parseInt(questionId))
      if (question) {
        domainScores[question.domain] += response
      }
    })

    // Normalize scores to be out of 10
    Object.keys(domainScores).forEach((domain) => {
      const questionsInDomain = questions.filter((q) => q.domain === domain).length
      domainScores[domain] = Math.round((domainScores[domain] / (questionsInDomain * 5)) * 10)
    })

    return domainScores
  }

  const handleAssessmentComplete = (responses) => {
    setResponses(responses)
    const calculatedScores = calculateScores(responses)
    setScores(calculatedScores)
    setStep("profile")
  }

  const handleBack = () => {
    if (step === "profile") setStep("assessment")
    if (step === "roadmap") setStep("profile")
  }

  const handleNext = () => {
    if (step === "profile") setStep("roadmap")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Mental Health DNA Test</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Discover your mental health profile and get personalized recommendations
          </p>
        </div>

        <ProgressTracker currentStep={step} />

        {step !== "assessment" && (
          <motion.button
            onClick={handleBack}
            className="mb-6 flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </motion.button>
        )}

        <AnimatePresence mode="wait">
          {step === "assessment" && (
            <motion.div
              key="assessment"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <AssessmentForm onComplete={handleAssessmentComplete} />
            </motion.div>
          )}

          {step === "profile" && scores && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <MentalHealthProfile scores={scores} onNext={handleNext} />
            </motion.div>
          )}

          {step === "roadmap" && scores && (
            <motion.div
              key="roadmap"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <PersonalizedRoadmap scores={scores} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export const questions = [
  {
    id: 1,
    text: "I find it difficult to relax and unwind after a busy day.",
    domain: "stress",
  },
  {
    id: 2,
    text: "I worry excessively about different aspects of my life.",
    domain: "anxiety",
  },
  {
    id: 3,
    text: "I feel down, depressed, or hopeless.",
    domain: "depression",
  },
  {
    id: 4,
    text: "I can bounce back quickly after difficult situations.",
    domain: "resilience",
  },
  {
    id: 5,
    text: "I'm able to recognize and understand my emotions.",
    domain: "emotional",
  },
  {
    id: 6,
    text: "Physical tension and stress affect my daily activities.",
    domain: "stress",
  },
  {
    id: 7,
    text: "I experience sudden feelings of panic or anxiety.",
    domain: "anxiety",
  },
  {
    id: 8,
    text: "I have little interest or pleasure in doing things I usually enjoy.",
    domain: "depression",
  },
  {
    id: 9,
    text: "I adapt well to change and challenging circumstances.",
    domain: "resilience",
  },
  {
    id: 10,
    text: "I can effectively manage and regulate my emotions.",
    domain: "emotional",
  },
  {
    id: 11,
    text: "I feel overwhelmed by my responsibilities.",
    domain: "stress",
  },
  {
    id: 12,
    text: "I find it hard to control my worrying.",
    domain: "anxiety",
  },
  {
    id: 13,
    text: "I feel tired or have little energy.",
    domain: "depression",
  },
  {
    id: 14,
    text: "I maintain a positive outlook despite challenges.",
    domain: "resilience",
  },
  {
    id: 15,
    text: "I can express my feelings appropriately to others.",
    domain: "emotional",
  },
]

export default MentalHealthTest

