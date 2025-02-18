"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Line, Bar } from "react-chartjs-2";

const AIAssistantTab = ({ moodEntries, darkMode }) => {
  const staticData = {
    moodTrends: [4, 3, 2, 4, 3, 5, 4],
    productivity: [8, 7, 6, 8, 9, 7, 8],
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  };

  const moodTrendsData = {
    labels: staticData.labels,
    datasets: [
      {
        label: "Mood Trend",
        data: staticData.moodTrends,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const productivityData = {
    labels: staticData.labels,
    datasets: [
      {
        label: "Productivity",
        data: staticData.productivity,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">AI Assistant Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Weekly Mood Trends</h3>
            <Line data={moodTrendsData} />
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Productivity Levels</h3>
            <Bar data={productivityData} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AIAssistantTab;