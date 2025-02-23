"use client"

import { motion } from "framer-motion"
import { ChevronRight, CircleCheck, Clock, Activity } from "lucide-react"

export default function ModuleCard({ module, isCompleted, progress, onClick }) {
  return (
    <motion.div
      className="group relative cursor-pointer"
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
      layoutId={`module-${module.title}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 from-purple-500/20 to-blue-500/20 rounded-2xl" />
      
      <div className={`relative p-6 rounded-2xl shadow-xl bg-gradient-to-br ${module.color} overflow-hidden`}>
        {isCompleted && (
          <motion.div 
            className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm flex items-center gap-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            <CircleCheck className="w-4 h-4" />
            <span>Completed</span>
          </motion.div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="space-y-4">
            <motion.div 
              className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm"
              whileHover={{ rotate: 15 }}
            >
              <module.icon className="w-6 h-6 text-white" />
            </motion.div>
            
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">{module.title}</h2>
              <p className="text-white/90 line-clamp-2">{module.description}</p>
            </div>
          </div>
          <ChevronRight className="text-white/80 group-hover:text-white transition-colors w-8 h-8" />
        </div>

        {/* Progress Ring */}
        {!isCompleted && progress.completed.includes(module.title) && (
          <div className="absolute bottom-4 right-4">
            <svg className="w-12 h-12 transform -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="20"
                className="stroke-current text-white/20"
                strokeWidth="4"
                fill="transparent"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                className="stroke-current text-green-400"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={`${(progress.score / 10) * 125.6} 125.6`}
              />
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  )
}