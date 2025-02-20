"use client"

import { motion } from "framer-motion"

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="w-20 h-20 mx-auto mb-8"
        >
          <div className="w-full h-full rounded-full border-4 border-t-purple-500 border-r-pink-500 border-b-blue-500 border-l-indigo-500 animate-spin" />
        </motion.div>
        <motion.h2
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="text-2xl font-bold text-white"
        >
          Preparing Your Journey...
        </motion.h2>
      </motion.div>
    </div>
  )
}

export default LoadingScreen

