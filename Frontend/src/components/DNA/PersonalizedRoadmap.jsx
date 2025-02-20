"use client"

import { motion } from "framer-motion"
import {
  Brain,
  Heart,
  Shield,
  Smile,
  Sun,
  BookOpen,
  Users,
  Coffee,
  SpaceIcon as Yoga,
  MessageCircle,
  CheckCircle,
} from "lucide-react"

const PersonalizedRoadmap = ({ scores }) => {
  const recommendations = {
    stress: {
      icon: Brain,
      title: "Stress Management",
      tips: [
        "Practice daily mindfulness meditation",
        "Take regular breaks during work",
        "Maintain a consistent sleep schedule",
        "Try deep breathing exercises",
      ],
      resources: ["Guided meditation apps", "Stress management workshops", "Time management tools"],
    },
    anxiety: {
      icon: Heart,
      title: "Anxiety Management",
      tips: [
        "Practice grounding techniques",
        "Challenge negative thoughts",
        "Maintain a worry journal",
        "Exercise regularly",
      ],
      resources: ["Anxiety support groups", "CBT resources", "Relaxation techniques"],
    },
    depression: {
      icon: Sun,
      title: "Mood Enhancement",
      tips: [
        "Establish a daily routine",
        "Set small, achievable goals",
        "Engage in physical activity",
        "Connect with loved ones",
      ],
      resources: ["Mental health hotlines", "Depression support groups", "Self-help books"],
    },
    resilience: {
      icon: Shield,
      title: "Building Resilience",
      tips: [
        "Develop problem-solving skills",
        "Build a strong support network",
        "Practice self-compassion",
        "Learn from challenges",
      ],
      resources: ["Resilience training programs", "Personal development courses", "Support communities"],
    },
    emotional: {
      icon: Smile,
      title: "Emotional Intelligence",
      tips: [
        "Practice emotional awareness",
        "Express feelings appropriately",
        "Develop empathy",
        "Set healthy boundaries",
      ],
      resources: ["Emotional intelligence workshops", "Journaling guides", "Communication skills training"],
    },
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Your Personalized Roadmap</h2>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
        {Object.entries(scores)
          .sort((a, b) => a[1] - b[1])
          .map(([domain, score]) => {
            const recommendation = recommendations[domain]
            const Icon = recommendation.icon

            return (
              <motion.div key={domain} variants={item} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{recommendation.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Score: {score}/10</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Recommended Actions:</h4>
                  <ul className="space-y-2">
                    {recommendation.tips.map((tip, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Helpful Resources:</h4>
                  <ul className="space-y-2">
                    {recommendation.resources.map((resource, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <BookOpen className="w-4 h-4 text-blue-500 mr-2" />
                        <span className="text-gray-700 dark:text-gray-300">{resource}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
      </motion.div>

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Next Steps</h3>
        <p className="text-blue-800 dark:text-blue-200 mb-4">
          Remember that your mental health journey is unique to you. Take small steps and celebrate your progress along
          the way.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users, text: "Join Support Group" },
            { icon: MessageCircle, text: "Talk to Therapist" },
            { icon: Yoga, text: "Try Meditation" },
            { icon: Coffee, text: "Build Routine" },
          ].map((action, index) => (
            <motion.button
              key={index}
              className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <action.icon className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
              <span className="text-sm text-gray-900 dark:text-white text-center">{action.text}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default PersonalizedRoadmap

