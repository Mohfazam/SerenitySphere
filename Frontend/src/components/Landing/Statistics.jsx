import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Users, Heart, Shield } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const Statistics = () => {
  const [selectedStat, setSelectedStat] = useState(null);

  const stats = [
    {
      icon: BarChart,
      value: '95%',
      label: 'User Satisfaction',
      color: '#2563eb',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        values: [88, 90, 92, 93, 94, 95]
      }
    },
    {
      icon: Users,
      value: '50K+',
      label: 'Active Users',
      color: '#0891b2',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        values: [30, 35, 40, 44, 47, 50]
      }
    },
    {
      icon: Heart,
      value: '90%',
      label: 'Positive Feedback',
      color: '#4f46e5',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        values: [82, 84, 86, 87, 89, 90]
      }
    },
    {
      icon: Shield,
      value: '100%',
      label: 'Data Security',
      color: '#0d9488',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        values: [100, 100, 100, 100, 100, 100]
      }
    }
  ];

  const getChartData = useCallback((stat) => {
    return {
      labels: stat.data.labels,
      datasets: [
        {
          label: stat.label,
          data: stat.data.values,
          fill: false,
          borderColor: stat.color,
          tension: 0.4,
          pointBackgroundColor: stat.color,
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ]
    };
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1f2937',
        bodyColor: '#1f2937',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
          drawBorder: false
        },
        ticks: {
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 12
          },
          color: '#6b7280'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 12
          },
          color: '#6b7280'
        }
      }
    }
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white sm:text-4xl">
            Performance Metrics
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Key indicators of our platform's success and growth
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className={`
                    p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm 
                    border border-gray-100 dark:border-gray-700
                    cursor-pointer transition-all duration-300
                    ${selectedStat === index ? 'ring-2 ring-offset-2 ring-blue-500' : ''}
                  `}
                  onClick={() => setSelectedStat(index)}
                >
                  <div className="flex items-center space-x-4">
                    <Icon
                      className="w-8 h-8"
                      style={{ color: stat.color }}
                    />
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
          >
            <div className="h-[300px]">
              {selectedStat !== null ? (
                <Line
                  data={getChartData(stats[selectedStat])}
                  options={chartOptions}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  Select a metric to view detailed trends
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

