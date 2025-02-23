"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Radar } from "react-chartjs-2"
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js"

// Register ChartJS components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const ProgressRoadmap = ({ progress }) => {
  const chartRef = useRef(null)

  const data = {
    labels: Object.keys(progress.skillLevels).map((key) => key.charAt(0).toUpperCase() + key.slice(1)),
    datasets: [
      {
        label: "Skill Level",
        data: Object.values(progress.skillLevels),
        backgroundColor: "rgba(147, 51, 234, 0.2)",
        borderColor: "rgba(147, 51, 234, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(147, 51, 234, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(147, 51, 234, 1)",
      },
    ],
  }

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        suggestedMax: 10,
        angleLines: {
          display: true,
        },
        grid: {
          color: "rgba(147, 51, 234, 0.1)",
        },
        ticks: {
          stepSize: 2,
          color: "rgba(147, 51, 234, 0.8)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `Level: ${context.raw}`,
        },
      },
    },
    maintainAspectRatio: false,
  }

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-[300px]"
      >
        <Radar ref={chartRef} data={data} options={options} />
      </motion.div>
    </div>
  )
}

export default ProgressRoadmap

