"use client"

import { useState, useEffect, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { Environment, Float, OrbitControls } from "@react-three/drei"
import { Sparkles } from "lucide-react"
import dynamic from "next/dynamic"
import AssessmentJourney from "./AssessmentJourney"
import DNAProfile from "./DNAProfile"
import InteractiveRoadmap from "./InteractiveRoadmap"
import LoadingScreen from "./LoadingScreen"

// Dynamically import the DNA model component
const DNAHelix = dynamic(() => import("./DNAHelix"), { ssr: false })

const MentalHealthDNA = () => {
  const [stage, setStage] = useState("intro") // intro, assessment, profile, roadmap
  const [responses, setResponses] = useState({})
  const [dnaProfile, setDnaProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleStart = () => {
    setStage("assessment")
  }

  const handleAssessmentComplete = (results) => {
    setResponses(results)
    // Calculate DNA profile based on responses
    const profile = calculateDNAProfile(results)
    setDnaProfile(profile)
    setStage("profile")
  }

  const calculateDNAProfile = (results) => {
    // Complex calculation of mental health DNA profile
    // This would include weighted scoring and pattern analysis
    return {
      emotionalStability: calculateDomainScore(results, "emotional"),
      stressResilience: calculateDomainScore(results, "stress"),
      anxietyManagement: calculateDomainScore(results, "anxiety"),
      moodRegulation: calculateDomainScore(results, "mood"),
      socialConnection: calculateDomainScore(results, "social"),
      mindfulnessAwareness: calculateDomainScore(results, "mindfulness"),
    }
  }

  const calculateDomainScore = (results, domain) => {
    // Implement complex scoring algorithm
    return Math.random() * 100 // Placeholder
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-purple-900/20 to-indigo-900/40" />
      </div>

      {/* 3D Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Float speed={4} rotationIntensity={1} floatIntensity={2} floatingRange={[0, 0.5]}>
              <DNAHelix />
            </Float>
            <OrbitControls enableZoom={false} enablePan={false} />
            <Environment preset="sunset" />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {stage === "intro" && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="max-w-2xl mx-auto text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-8 inline-block"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="w-10 h-10" />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
              >
                Discover Your Mental DNA
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-xl mb-8 text-gray-300"
              >
                Embark on a journey of self-discovery through our innovative mental health assessment. Uncover your
                unique psychological blueprint and receive personalized insights.
              </motion.p>

              <motion.button
                onClick={handleStart}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Begin Your Journey
              </motion.button>
            </motion.div>
          )}

          {stage === "assessment" && <AssessmentJourney onComplete={handleAssessmentComplete} />}

          {stage === "profile" && dnaProfile && (
            <DNAProfile profile={dnaProfile} onContinue={() => setStage("roadmap")} />
          )}

          {stage === "roadmap" && dnaProfile && <InteractiveRoadmap profile={dnaProfile} />}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default MentalHealthDNA

