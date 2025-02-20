// MentalHealthProfile.jsx
"use client"

import { motion } from "framer-motion"
import { Radar, Bar } from "react-chartjs-2"
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, CategoryScale, LinearScale, BarElement } from 'chart.js'
import { ArrowRight, Info } from "lucide-react"

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  CategoryScale,
  LinearScale,
  BarElement
)

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

  const radarOptions = {
    scales: {
      r: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 2,
          color: "#6B7280",
          backdropColor: "transparent"
        },
        grid: {
          color: "rgba(209, 213, 219, 0.3)"
        },
        pointLabels: {
          color: "#374151",
          font: {
            size: 14
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  }

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        ticks: {
          color: "#6B7280"
        },
        grid: {
          color: "rgba(209, 213, 219, 0.3)"
        }
      },
      x: {
        ticks: {
          color: "#6B7280"
        },
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  }

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Your Mental Blueprint
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Based on your assessment results
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 p-6 rounded-2xl">
          <Radar data={radarData} options={radarOptions} />
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 p-6 rounded-2xl">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>

      <div className="space-y-6 mb-8">
        {Object.entries(scores).map(([domain, score]) => (
          <div key={domain} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                {domain.replace(/([A-Z])/g, ' $1')}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-bold">{score}/10</span>
                <Info className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div className="relative h-3 bg-gray-200 dark:bg-gray-600 rounded-full">
              <motion.div
                className="absolute h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${score * 10}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        ))}
      </div>

      <motion.button
        onClick={onNext}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold
                 hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Continue to Action Plan
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </motion.div>
  )
}

export default MentalHealthProfile