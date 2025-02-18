"use client"
import { motion } from "framer-motion"
import { Line, Bar, Pie, Radar } from "react-chartjs-2"

const InsightsTab = ({ moodEntries, darkMode }) => {
  const moodEmojis = [
    { label: "Happy", color: "rgba(16, 185, 129, 0.7)" },
    { label: "Neutral", color: "rgba(245, 158, 11, 0.7)" },
    { label: "Sad", color: "rgba(59, 130, 246, 0.7)" },
    { label: "Angry", color: "rgba(239, 68, 68, 0.7)" },
    { label: "Energetic", color: "rgba(139, 92, 246, 0.7)" },
  ]

  const renderMoodHistory = () => {
    const data = {
      labels: moodEntries.map((entry) => new Date(entry.date).toLocaleDateString()),
      datasets: [
        {
          label: "Mood",
          data: moodEntries.map((entry) => moodEmojis.findIndex((mood) => mood.label === entry.mood.label)),
          backgroundColor: moodEntries.map((entry) => moodEmojis.find((mood) => mood.label === entry.mood.label).color),
          borderColor: moodEntries.map((entry) => moodEmojis.find((mood) => mood.label === entry.mood.label).color),
          borderWidth: 1,
          fill: false,
          tension: 0.4,
        },
      ],
    }

    const options = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: moodEmojis.length - 1,
          ticks: {
            callback: (value) => moodEmojis[value]?.label,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context) => `Mood: ${moodEmojis[context.raw].label}`,
          },
        },
      },
    }

    return <Line data={data} options={options} />
  }

  const renderActivityDistribution = () => {
    const activityCounts = moodEntries.reduce((acc, entry) => {
      entry.activities.forEach((activity) => {
        acc[activity] = (acc[activity] || 0) + 1
      })
      return acc
    }, {})

    const data = {
      labels: Object.keys(activityCounts),
      datasets: [
        {
          data: Object.values(activityCounts),
          backgroundColor: [
            "rgba(255, 99, 132, 0.7)",
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(153, 102, 255, 0.7)",
            "rgba(255, 159, 64, 0.7)",
            "rgba(199, 199, 199, 0.7)",
            "rgba(83, 102, 255, 0.7)",
            "rgba(40, 159, 64, 0.7)",
            "rgba(210, 199, 199, 0.7)",
          ],
        },
      ],
    }

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "right",
        },
        title: {
          display: true,
          text: "Activity Distribution",
        },
      },
    }

    return <Pie data={data} options={options} />
  }

  const renderSleepQualityChart = () => {
    const data = {
      labels: moodEntries.map((entry) => new Date(entry.date).toLocaleDateString()),
      datasets: [
        {
          label: "Sleep Hours",
          data: moodEntries.map((entry) => entry.sleepHours),
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          tension: 0.1,
        },
      ],
    }

    const options = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Sleep Quality Over Time",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Hours of Sleep",
          },
        },
      },
    }

    return <Bar data={data} options={options} />
  }

  const renderWaterIntakeChart = () => {
    const data = {
      labels: moodEntries.map((entry) => new Date(entry.date).toLocaleDateString()),
      datasets: [
        {
          label: "Water Intake",
          data: moodEntries.map((entry) => entry.waterIntake),
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgb(54, 162, 235)",
          borderWidth: 1,
        },
      ],
    }

    const options = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Daily Water Intake",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Liters",
          },
        },
      },
    }

    return <Bar data={data} options={options} />
  }

  const renderExerciseChart = () => {
    const data = {
      labels: moodEntries.map((entry) => new Date(entry.date).toLocaleDateString()),
      datasets: [
        {
          label: "Exercise Duration",
          data: moodEntries.map((entry) => entry.exerciseMinutes),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgb(255, 99, 132)",
          borderWidth: 1,
        },
      ],
    }

    const options = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Daily Exercise Duration",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Minutes",
          },
        },
      },
    }

    return <Bar data={data} options={options} />
  }

  const renderMoodCorrelationChart = () => {
    const moodScores = {
      Happy: 4,
      Energetic: 3,
      Neutral: 2,
      Sad: 1,
      Angry: 0,
    }

    const averages = moodEntries.reduce(
      (acc, entry) => {
        acc.mood += moodScores[entry.mood.label]
        acc.sleep += entry.sleepHours
        acc.water += entry.waterIntake
        acc.exercise += entry.exerciseMinutes
        return acc
      },
      { mood: 0, sleep: 0, water: 0, exercise: 0 },
    )

    const count = moodEntries.length
    const data = {
      labels: ["Mood", "Sleep", "Water", "Exercise"],
      datasets: [
        {
          label: "Average Values",
          data: [averages.mood / count, averages.sleep / count, averages.water / count, averages.exercise / count],
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132)",
          pointBackgroundColor: "rgb(255, 99, 132)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(255, 99, 132)",
        },
      ],
    }

    const options = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Mood Correlation with Habits",
        },
      },
      scales: {
        r: {
          angleLines: {
            display: false,
          },
          suggestedMin: 0,
          suggestedMax: 5,
        },
      },
    }

    return <Radar data={data} options={options} />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Mood Insights</h2>
        {moodEntries.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            No mood entries yet. Start logging your moods to see insights!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Mood History</h3>
              {renderMoodHistory()}
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Activity Distribution</h3>
              {renderActivityDistribution()}
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Sleep Quality</h3>
              {renderSleepQualityChart()}
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Water Intake</h3>
              {renderWaterIntakeChart()}
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Exercise Duration</h3>
              {renderExerciseChart()}
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Mood Correlation</h3>
              {renderMoodCorrelationChart()}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default InsightsTab

