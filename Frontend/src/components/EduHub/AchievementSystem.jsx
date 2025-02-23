"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Trophy, Star, Target, Award, CheckCircle } from "lucide-react"
import { toast } from "react-toastify"

const achievements = [
  {
    id: "beginner",
    name: "Beginner Mind",
    description: "Complete your first lesson",
    icon: Star,
    requirement: (progress) => progress.completedLessons.length >= 1,
    color: "text-yellow-500",
    bgColor: "bg-yellow-100 dark:bg-yellow-900",
  },
  {
    id: "dedicated",
    name: "Dedicated Learner",
    description: "Complete 5 lessons",
    icon: Target,
    requirement: (progress) => progress.completedLessons.length >= 5,
    color: "text-blue-500",
    bgColor: "bg-blue-100 dark:bg-blue-900",
  },
  {
    id: "expert",
    name: "Mental Health Expert",
    description: "Reach level 5 in any skill",
    icon: Award,
    requirement: (progress) => Object.values(progress.skillLevels).some((level) => level >= 5),
    color: "text-purple-500",
    bgColor: "bg-purple-100 dark:bg-purple-900",
  },
  {
    id: "master",
    name: "Wellness Master",
    description: "Accumulate 100 XP",
    icon: Trophy,
    requirement: (progress) => progress.xp >= 100,
    color: "text-green-500",
    bgColor: "bg-green-100 dark:bg-green-900",
  },
]

const AchievementSystem = ({ xp, achievements: unlockedAchievements, setProgress }) => {
  useEffect(() => {
    achievements.forEach((achievement) => {
      if (!unlockedAchievements.includes(achievement.id)) {
        setProgress((prev) => {
          if (achievement.requirement(prev)) {
            toast.success(`Achievement Unlocked: ${achievement.name}!`, {
              position: "bottom-right",
              autoClose: 3000,
            })
            return {
              ...prev,
              achievements: [...prev.achievements, achievement.id],
            }
          }
          return prev
        })
      }
    })
  }, [unlockedAchievements, setProgress])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Achievements
        </h2>
      </div>
      <div className="p-4">
        <div className="grid gap-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon
            const isUnlocked = unlockedAchievements.includes(achievement.id)

            return (
              <motion.div
                key={achievement.id}
                initial={false}
                animate={isUnlocked ? { opacity: 1 } : { opacity: 0.5 }}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  isUnlocked ? "bg-gray-100 dark:bg-gray-700" : "bg-gray-50 dark:bg-gray-900"
                }`}
              >
                <div className={`p-2 rounded-lg ${achievement.bgColor}`}>
                  <Icon className={`w-4 h-4 ${achievement.color}`} />
                </div>
                <div>
                  <h4 className="font-medium">{achievement.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{achievement.description}</p>
                </div>
                {isUnlocked && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AchievementSystem

