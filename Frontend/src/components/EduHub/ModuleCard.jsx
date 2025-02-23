"use client"

import { motion } from "framer-motion"
import { ChevronRight, CircleCheck } from "lucide-react"

export default function ModuleCard({ module, isCompleted, onClick }) {
  return (
    <motion.div
      className={`${module.color} p-6 rounded-xl shadow-lg cursor-pointer overflow-hidden relative group`}
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
      layoutId={`module-${module.title}`}
    >
      {isCompleted && (
        <div className="absolute top-2 left-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm flex items-center">
          <CircleCheck className="w-4 h-4 mr-1" />
          Completed
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">{module.title}</h2>
          <p className="text-white/80 line-clamp-2">{module.description}</p>
        </div>
        <ChevronRight className="text-white/80 group-hover:text-white transition-colors" />
      </div>
    </motion.div>
  )
}