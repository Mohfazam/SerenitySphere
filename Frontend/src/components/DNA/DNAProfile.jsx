"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Radar } from "react-chartjs-2"
import { ArrowRight } from "lucide-react"

const DNAProfile = ({ profile, onContinue }) => {
  const chartRef = useRef(null)

  const radarData = {
    labels: Object.keys(profile).map((key) => key.split(/(?=[A-Z])/).join(" ")),
    datasets: [
      {
        label: "Your Mental DNA Profile",
        data: Object.values(profile),
        fill: true,
        backgroundColor: "rgba(147, 51, 234, 0.2)",
        borderColor: "rgba(147, 51, 234, 1)",
        pointBackgroundColor: "rgba(147, 51, 234, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(147, 51, 234, 1)",
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  }

  const radarOptions = {
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          color: "rgba(255, 255, 255, 0.5)",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        pointLabels: {
          color: "rgba(255, 255, 255, 0.8)",
          font: {
            size: 14,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
        >
          Your Mental DNA Profile
        </motion.h2>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-300"
        >
          Discover your unique psychological blueprint
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-lg border border-gray-700"
        >
          <h3 className="text-xl font-semibold mb-6">Profile Overview</h3>
          <div className="h-[400px]">
            <Radar data={radarData} options={radarOptions} />
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {Object.entries(profile).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-lg border border-gray-700"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">{key.split(/(?=[A-Z])/).join(" ")}</h4>
                <span className="text-2xl font-bold text-purple-400">{value}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 1, delay: 1 + index * 0.1 }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-center"
      >
        <motion.button
          onClick={onContinue}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Your Personalized Roadmap
          <ArrowRight className="inline-block ml-2" />
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default DNAProfile

