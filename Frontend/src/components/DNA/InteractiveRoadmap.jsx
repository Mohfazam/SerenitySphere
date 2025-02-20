"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, Heart, Shield, Sun, Star, Zap, CheckCircle, ChevronRight } from "lucide-react"

const InteractiveRoadmap = ({ profile }) => {
  const [selectedMilestone, setSelectedMilestone] = useState(null)

  const milestones = [
    {
      id: 1,
      title: "Foundation",
      icon: Shield,
      color: "from-blue-400 to-blue-600",
      tasks: ["Establish daily mindfulness practice", "Create a sleep routine", "Set boundaries in relationships"],
    },
    {
      id: 2,
      title: "Growth",
      icon: Sun,
      color: "from-yellow-400 to-orange-600",
      tasks: ["Join support groups", "Start journaling practice", "Develop stress management techniques"],
    },
    {
      id: 3,
      title: "Mastery",
      icon: Star,
      color: "from-purple-400 to-pink-600",
      tasks: ["Lead meditation sessions", "Mentor others", "Share your journey"],
    },
  ]

  const exercises = [
    {
      id: 1,
      title: "Mindful Breathing",
      description: "5-minute guided breathing exercise",
      icon: Brain,
      duration: "5 mins",
    },
    {
      id: 2,
      title: "Gratitude Practice",
      description: "List three things you're grateful for",
      icon: Heart,
      duration: "3 mins",
    },
    {
      id: 3,
      title: "Energy Boost",
      description: "Quick physical movement routine",
      icon: Zap,
      duration: "2 mins",
    },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
        >
          Your Growth Journey
        </motion.h2>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-300"
        >
          A personalized roadmap to mental wellness
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {milestones.map((milestone, index) => {
          const Icon = milestone.icon
          return (
            <motion.div
              key={milestone.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              className={`relative bg-gray-800/50 backdrop-blur-lg rounded-lg border border-gray-700 overflow-hidden group cursor-pointer`}
              onClick={() => setSelectedMilestone(milestone)}
              whileHover={{ scale: 1.02 }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${milestone.color} opacity-10 group-hover:opacity-20 transition-opacity`}
              />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${milestone.color} flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold ml-4">{milestone.title}</h3>
                </div>
                <ul className="space-y-3">
                  {milestone.tasks.map((task, taskIndex) => (
                    <motion.li
                      key={taskIndex}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.2 + taskIndex * 0.1 }}
                      className="flex items-center text-gray-300"
                    >
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                      {task}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-gray-800/50 backdrop-blur-lg rounded-lg border border-gray-700 p-6"
      >
        <h3 className="text-xl font-semibold mb-6">Quick Exercises</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {exercises.map((exercise, index) => {
            const Icon = exercise.icon
            return (
              <motion.button
                key={exercise.id}
                className="bg-gray-700/50 rounded-lg p-4 text-left hover:bg-gray-700 transition-colors group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Icon className="w-6 h-6 text-purple-400 mr-3" />
                    <h4 className="font-medium">{exercise.title}</h4>
                  </div>
                  <span className="text-sm text-gray-400">{exercise.duration}</span>
                </div>
                <p className="text-sm text-gray-400">{exercise.description}</p>
                <ChevronRight className="w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity mt-2 ml-auto" />
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedMilestone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedMilestone(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-lg p-6 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center mb-6">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${selectedMilestone.color} flex items-center justify-center`}
                >
                  <selectedMilestone.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold ml-4">{selectedMilestone.title}</h3>
              </div>
              <div className="space-y-4">
                {selectedMilestone.tasks.map((task, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1" />
                    <div>
                      <h4 className="font-medium">{task}</h4>
                      <p className="text-sm text-gray-400">Track your progress and celebrate small wins</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedMilestone(null)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default InteractiveRoadmap

