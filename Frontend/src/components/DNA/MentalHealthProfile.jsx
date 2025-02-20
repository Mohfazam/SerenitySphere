"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Radar, Bar } from "react-chartjs-2"

const MentalHealthProfile = ({ scores, onNext }) => {
  const domains = {
    stress: "Stress Management",
    anxiety: "Anxiety Level",
    depression: "Mood State",
    resilience: "Resilience",
    emotional: "Emotional Intelligence",
  }

  const radarData = {
    labels: Object.values(domains),
    datasets: [
      {
        label: "Your Mental Health Profile",
        data: Object.values(scores),
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(99, 102, 241, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(99, 102, 241, 1)",
      },
    ],
  }

  const barData = {
    labels: Object.values(domains),
    datasets: [
      {
        label: "Domain Scores",
        data: Object.values(scores),
        backgroundColor: [
          "rgba(239, 68, 68, 0.7)",
          "rgba(59, 130, 246, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(245, 158, 11, 0.7)",
          "rgba(139, 92, 246, 0.7)",
        ],
      },
    ],
  }

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  }

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
      },
    },
  }

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Your Mental Health Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Domain Overview</h3>
          <div className="h-64">
            <Radar data={radarData} options={options} />
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Score Breakdown</h3>
          <div className="h-64">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {Object.entries(scores).map(([domain, score]) => (
          <div key={domain} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-gray-900 dark:text-white">{domains[domain]}</h4>
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{score}/10</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <motion.div
                className="bg-blue-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${score * 10}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        ))}
      </div>

      <motion.button
        onClick={onNext}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        View Personalized Roadmap
        <ArrowRight className="ml-2 w-5 h-5" />
      </motion.button>
    </motion.div>
  )
}

export default MentalHealthProfile

