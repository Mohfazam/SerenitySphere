"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Line, Bar, Pie, Radar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

const InsightsTab = ({ moodEntries, darkMode }) => {
  const baseOptions = {
    color: "white", // Set all text to white
    borderColor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
  };

  const moodEmojis = [
    { label: "Happy", color: "rgba(16, 185, 129, 0.7)" },
    { label: "Neutral", color: "rgba(245, 158, 11, 0.7)" },
    { label: "Sad", color: "rgba(59, 130, 246, 0.7)" },
    { label: "Angry", color: "rgba(239, 68, 68, 0.7)" },
    { label: "Energetic", color: "rgba(139, 92, 246, 0.7)" },
  ];

  // Refs to store chart instances
  const moodHistoryChartRef = useRef(null);
  const activityDistributionChartRef = useRef(null);
  const sleepQualityChartRef = useRef(null);
  const waterIntakeChartRef = useRef(null);
  const exerciseChartRef = useRef(null);
  const moodCorrelationChartRef = useRef(null);

  // Destroy charts on unmount
  useEffect(() => {
    return () => {
      if (moodHistoryChartRef.current) moodHistoryChartRef.current.destroy();
      if (activityDistributionChartRef.current) activityDistributionChartRef.current.destroy();
      if (sleepQualityChartRef.current) sleepQualityChartRef.current.destroy();
      if (waterIntakeChartRef.current) waterIntakeChartRef.current.destroy();
      if (exerciseChartRef.current) exerciseChartRef.current.destroy();
      if (moodCorrelationChartRef.current) moodCorrelationChartRef.current.destroy();
    };
  }, []);

  // Helper function to format dates as "MM/DD"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`; // Format as "MM/DD"
  };

  const renderMoodHistory = () => {
    // Filter out entries with undefined moods
    const validEntries = moodEntries.filter((entry) =>
      moodEmojis.some((mood) => mood.label === entry.mood.label)
    );
  
    const data = {
      labels: validEntries.map((entry) => formatDate(entry.date)), // Use formatted dates
      datasets: [
        {
          label: "Mood",
          data: validEntries.map((entry) =>
            moodEmojis.findIndex((mood) => mood.label === entry.mood.label)
          ),
          backgroundColor: validEntries.map((entry) => {
            const mood = moodEmojis.find((mood) => mood.label === entry.mood.label);
            return mood ? mood.color : "rgba(0, 0, 0, 0.1)"; // Fallback color (should not be needed now)
          }),
          borderColor: validEntries.map((entry) => {
            const mood = moodEmojis.find((mood) => mood.label === entry.mood.label);
            return mood ? mood.color : "rgba(0, 0, 0, 0.1)"; // Fallback color (should not be needed now)
          }),
          borderWidth: 1,
          fill: false,
          tension: 0.4,
        },
      ],
    };
  
    const options = {
      ...baseOptions,
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: moodEmojis.length - 1,
          title: {
            display: true,
            text: "Mood Level", // Y-axis title
            color: "white", // Y-axis title color
            font: {
              size: 14, // Y-axis title font size
              weight: "bold", // Y-axis title font weight
            },
          },
          ticks: {
            color: "white", // Set y-axis text color to white
            callback: (value) => moodEmojis[value]?.label, // No fallback label
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)", // Set grid color for y-axis
          },
        },
        x: {
          title: {
            display: true,
            text: "Date", // X-axis title
            color: "white", // X-axis title color
            font: {
              size: 14, // X-axis title font size
              weight: "bold", // X-axis title font weight
            },
          },
          ticks: {
            color: "white", // Set x-axis text color to white
            autoSkip: true, // Automatically skip labels to avoid clutter
            maxTicksLimit: 10, // Limit the number of labels shown
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)", // Set grid color for x-axis
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const mood = moodEmojis[context.raw];
              return `Mood: ${mood.label}`; // No fallback label
            },
          },
          bodyColor: "white", // Set tooltip text color to white
          titleColor: "white", // Set tooltip title color to white
        },
      },
    };
  
    return (
      <Line
        data={data}
        options={options}
        ref={(node) => (moodHistoryChartRef.current = node?.chartInstance)}
      />
    );
  };

  const renderActivityDistribution = () => {
    const activityCounts = moodEntries.reduce((acc, entry) => {
      entry.activities.forEach((activity) => {
        acc[activity] = (acc[activity] || 0) + 1;
      });
      return acc;
    }, {});

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
    };

    const options = {
      ...baseOptions,
      responsive: true,
      plugins: {
        legend: {
          position: "right",
          labels: {
            color: "white", // Set legend text color to white
          },
        },
        title: {
          display: true,
          text: "Activity Distribution",
          color: "white", // Set title text color to white
        },
        tooltip: {
          bodyColor: "white", // Set tooltip text color to white
          titleColor: "white", // Set tooltip title color to white
        },
      },
    };

    return (
      <Pie
        data={data}
        options={options}
        ref={(node) => (activityDistributionChartRef.current = node?.chartInstance)}
      />
    );
  };

  const renderSleepQualityChart = () => {
    const data = {
      labels: moodEntries.map((entry) => formatDate(entry.date)), // Use formatted dates
      datasets: [
        {
          label: "Sleep Hours",
          data: moodEntries.map((entry) => entry.sleepHours),
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          tension: 0.1,
        },
      ],
    };

    const options = {
      ...baseOptions,
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Sleep Quality Over Time",
          color: "white", // Set title text color to white
        },
        tooltip: {
          bodyColor: "white", // Set tooltip text color to white
          titleColor: "white", // Set tooltip title color to white
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Hours of Sleep",
            color: "white", // Set y-axis title text color to white
          },
          ticks: {
            color: "white", // Set y-axis text color to white
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)", // Set grid color for y-axis
          },
        },
        x: {
          ticks: {
            color: "white", // Set x-axis text color to white
            autoSkip: true, // Automatically skip labels to avoid clutter
            maxTicksLimit: 10, // Limit the number of labels shown
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)", // Set grid color for x-axis
          },
        },
      },
    };

    return (
      <Bar
        data={data}
        options={options}
        ref={(node) => (sleepQualityChartRef.current = node?.chartInstance)}
      />
    );
  };

  const renderWaterIntakeChart = () => {
    const data = {
      labels: moodEntries.map((entry) => formatDate(entry.date)), // Use formatted dates
      datasets: [
        {
          label: "Water Intake",
          data: moodEntries.map((entry) => entry.waterIntake),
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgb(54, 162, 235)",
          borderWidth: 1,
        },
      ],
    };

    const options = {
      ...baseOptions,
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Daily Water Intake",
          color: "white", // Set title text color to white
        },
        tooltip: {
          bodyColor: "white", // Set tooltip text color to white
          titleColor: "white", // Set tooltip title color to white
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Liters",
            color: "white", // Set y-axis title text color to white
          },
          ticks: {
            color: "white", // Set y-axis text color to white
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)", // Set grid color for y-axis
          },
        },
        x: {
          ticks: {
            color: "white", // Set x-axis text color to white
            autoSkip: true, // Automatically skip labels to avoid clutter
            maxTicksLimit: 10, // Limit the number of labels shown
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)", // Set grid color for x-axis
          },
        },
      },
    };

    return (
      <Bar
        data={data}
        options={options}
        ref={(node) => (waterIntakeChartRef.current = node?.chartInstance)}
      />
    );
  };

  const renderExerciseChart = () => {
    const data = {
      labels: moodEntries.map((entry) => formatDate(entry.date)), // Use formatted dates
      datasets: [
        {
          label: "Exercise Duration",
          data: moodEntries.map((entry) => entry.exerciseMinutes),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgb(255, 99, 132)",
          borderWidth: 1,
        },
      ],
    };

    const options = {
      ...baseOptions,
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Daily Exercise Duration",
          color: "white", // Set title text color to white
        },
        tooltip: {
          bodyColor: "white", // Set tooltip text color to white
          titleColor: "white", // Set tooltip title color to white
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Minutes",
            color: "white", // Set y-axis title text color to white
          },
          ticks: {
            color: "white", // Set y-axis text color to white
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)", // Set grid color for y-axis
          },
        },
        x: {
          ticks: {
            color: "white", // Set x-axis text color to white
            autoSkip: true, // Automatically skip labels to avoid clutter
            maxTicksLimit: 10, // Limit the number of labels shown
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)", // Set grid color for x-axis
          },
        },
      },
    };

    return (
      <Bar
        data={data}
        options={options}
        ref={(node) => (exerciseChartRef.current = node?.chartInstance)}
      />
    );
  };

  const renderMoodCorrelationChart = () => {
    const moodScores = {
      Happy: 4,
      Energetic: 3,
      Neutral: 2,
      Sad: 1,
      Angry: 0,
    };

    const averages = moodEntries.reduce(
      (acc, entry) => {
        acc.mood += moodScores[entry.mood.label];
        acc.sleep += entry.sleepHours;
        acc.water += entry.waterIntake;
        acc.exercise += entry.exerciseMinutes;
        return acc;
      },
      { mood: 0, sleep: 0, water: 0, exercise: 0 },
    );

    const count = moodEntries.length;
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
    };

    const options = {
      ...baseOptions,
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Mood Correlation with Habits",
          color: "white", // Set title text color to white
        },
        tooltip: {
          bodyColor: "white", // Set tooltip text color to white
          titleColor: "white", // Set tooltip title color to white
        },
      },
      scales: {
        r: {
          angleLines: {
            display: false,
          },
          suggestedMin: 0,
          suggestedMax: 5,
          ticks: {
            color: "white", // Set radar chart text color to white
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)", // Set grid color for radar chart
          },
        },
      },
    };

    return (
      <Radar
        data={data}
        options={options}
        ref={(node) => (moodCorrelationChartRef.current = node?.chartInstance)}
      />
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg ${darkMode ? "text-white" : "text-black"}`}>
        <h2 className="text-2xl font-semibold mb-4 text-white">Mood Insights</h2>
        {moodEntries.length === 0 ? (
          <p className="text-gray-400">
            No mood entries yet. Start logging your moods to see insights!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-white">Mood History</h3>
              {renderMoodHistory()}
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-white">Activity Distribution</h3>
              {renderActivityDistribution()}
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-white">Sleep Quality</h3>
              {renderSleepQualityChart()}
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-white">Water Intake</h3>
              {renderWaterIntakeChart()}
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-white">Exercise Duration</h3>
              {renderExerciseChart()}
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-white">Mood Correlation</h3>
              {renderMoodCorrelationChart()}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default InsightsTab;