import React from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const InteractiveStats = () => {
  // Data for the charts
  const moodData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Average Mood Score (1-10)',
        data: [6.5, 7.0, 6.8, 7.5, 8.0, 7.2, 8.5],
        backgroundColor: 'rgba(74, 144, 226, 0.6)',
        borderColor: 'rgba(74, 144, 226, 1)',
        borderWidth: 1,
      },
    ],
  };

  const engagementData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Active Users',
        data: [1200, 1500, 1800, 2000, 2200, 2500, 3000],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
        tension: 0.4, // Smooth line
      },
    ],
  };

  const resourceUsageData = {
    labels: ['Therapy', 'Meditation', 'Forums', 'Articles'],
    datasets: [
      {
        label: 'Usage',
        data: [300, 500, 400, 700],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const stressLevelData = {
    labels: ['Low', 'Moderate', 'High'],
    datasets: [
      {
        label: 'Stress Levels',
        data: [40, 35, 25],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Options for the charts
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#111', // Dark text for visibility in light mode
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: 'Mental Health Insights',
        color: '#111', // Dark text for visibility in light mode
        font: {
          size: 18,
          weight: 'bold',
        },
      },
      tooltip: {
        backgroundColor: '#ffffff', // Light background for tooltips
        titleColor: '#111', // Dark text for tooltip titles
        bodyColor: '#111', // Dark text for tooltip body
        borderColor: '#e0e0e0', // Light border for tooltips
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#e0e0e0', // Light grid lines
        },
        ticks: {
          color: '#111', // Dark text for visibility in light mode
          font: {
            size: 12,
          },
        },
      },
      x: {
        grid: {
          color: '#e0e0e0', // Light grid lines
        },
        ticks: {
          color: '#111', // Dark text for visibility in light mode
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-10">
          Mental Health Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Bar Chart: Mood Trends */}
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Mood Trends
            </h3>
            <Bar data={moodData} options={options} />
          </div>

          {/* Line Chart: User Engagement */}
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              User Engagement
            </h3>
            <Line data={engagementData} options={options} />
          </div>

          {/* Pie Chart: Resource Usage */}
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Resource Usage
            </h3>
            <Pie data={resourceUsageData} options={options} />
          </div>

          {/* Doughnut Chart: Stress Levels */}
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Stress Levels
            </h3>
            <Doughnut data={stressLevelData} options={options} />
          </div>
        </div>
      </div>
    </section>
  );
};