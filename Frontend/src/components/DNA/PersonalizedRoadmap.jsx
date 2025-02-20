"use client"

import { motion } from "framer-motion"
import { CheckCircle, ChevronRight, Star, BookOpen, Users, Activity, Heart, Brain, Shield, Sun } from "lucide-react"

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
      resources: [
        "Guided meditation apps",
        "Stress management workshops",
        "Time management tools",
        "Relaxation techniques guide"
      ],
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
      resources: [
        "Anxiety support groups",
        "CBT resources",
        "Relaxation techniques",
        "Professional counseling services"
      ],
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
      resources: [
        "Mental health hotlines",
        "Depression support groups",
        "Self-help books",
        "Therapist directory"
      ],
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
      resources: [
        "Resilience training programs",
        "Personal development courses",
        "Support communities",
        "Mindset coaching"
      ],
    },
    emotional: {
      icon: Brain,
      title: "Emotional Intelligence",
      tips: [
        "Practice emotional awareness",
        "Express feelings appropriately",
        "Develop empathy",
        "Set healthy boundaries",
      ],
      resources: [
        "Emotional intelligence workshops",
        "Journaling guides",
        "Communication skills training",
        "Relationship coaching"
      ],
    },
  }

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Your Action Plan
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Personalized recommendations based on your results
        </p>
      </div>

      <div className="space-y-8">
        {Object.entries(scores)
          .sort((a, b) => a[1] - b[1])
          .map(([domain], index) => {
            const { icon: IconComponent, title, tips, resources } = recommendations[domain] || {}

            if (!IconComponent) return null

            return (
              <motion.div
                key={domain}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 p-6 rounded-2xl"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {title}
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium text-blue-600 dark:text-blue-400 flex items-center gap-2">
                          <Star className="w-5 h-5" />
                          Key Strategies
                        </h4>
                        <ul className="space-y-2">
                          {tips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium text-purple-600 dark:text-purple-400 flex items-center gap-2">
                          <BookOpen className="w-5 h-5" />
                          Recommended Resources
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {resources.map((resource, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow-sm transition-all"
                            >
                              <ChevronRight className="w-5 h-5 text-blue-500" />
                              <span className="text-gray-700 dark:text-gray-300">{resource}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
      </div>

      <motion.div 
        className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-xl font-bold mb-4">Ready to Begin?</h3>
        <p className="mb-6 opacity-90">
          Start your journey to better mental health with these first steps
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users, text: "Community Support" },
            { icon: Activity, text: "Daily Exercises" },
            { icon: Heart, text: "Self Care Kit" },
            { icon: BookOpen, text: "Learning Hub" },
          ].map((action, i) => (
            <motion.button
              key={i}
              className="flex flex-col items-center p-4 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <action.icon className="w-8 h-8 mb-2" />
              <span className="text-sm text-center">{action.text}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default PersonalizedRoadmap
