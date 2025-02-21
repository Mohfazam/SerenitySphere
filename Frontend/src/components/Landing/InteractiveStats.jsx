import React, { useCallback, useEffect, useState } from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { motion, AnimatePresence } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
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
import { Brain, Activity, Users, Sparkles } from 'lucide-react';

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
  const [selectedChart, setSelectedChart] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const moodData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{
      label: 'Average Mood Score',
      data: [6.5, 7.0, 6.8, 7.5, 8.0, 7.2, 8.5],
      backgroundColor: 'rgba(147, 51, 234, 0.5)',
      borderColor: 'rgba(147, 51, 234, 1)',
      borderWidth: 2,
      fill: true,
    }],
  };

  const engagementData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{
      label: 'Active Users',
      data: [1200, 1500, 1800, 2000, 2200, 2500, 3000],
      borderColor: 'rgba(59, 130, 246, 1)',
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      fill: true,
      tension: 0.4,
    }],
  };

  const resourceUsageData = {
    labels: ['Therapy', 'Meditation', 'Forums', 'Articles'],
    datasets: [{
      label: 'Usage',
      data: [300, 500, 400, 700],
      backgroundColor: [
        'rgba(236, 72, 153, 0.7)',
        'rgba(34, 197, 94, 0.7)',
        'rgba(234, 179, 8, 0.7)',
        'rgba(168, 85, 247, 0.7)',
      ],
      borderColor: [
        'rgba(236, 72, 153, 1)',
        'rgba(34, 197, 94, 1)',
        'rgba(234, 179, 8, 1)',
        'rgba(168, 85, 247, 1)',
      ],
      borderWidth: 2,
    }],
  };

  const stressLevelData = {
    labels: ['Low', 'Moderate', 'High'],
    datasets: [{
      label: 'Stress Levels',
      data: [40, 35, 25],
      backgroundColor: [
        'rgba(34, 197, 94, 0.7)',
        'rgba(234, 179, 8, 0.7)',
        'rgba(239, 68, 68, 0.7)',
      ],
      borderColor: [
        'rgba(34, 197, 94, 1)',
        'rgba(234, 179, 8, 1)',
        'rgba(239, 68, 68, 1)',
      ],
      borderWidth: 2,
    }],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { size: 14, family: 'Inter' },
          color: '#fff',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: { size: 16, family: 'Inter' },
        bodyFont: { size: 14, family: 'Inter' },
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#fff',
          font: { size: 12, family: 'Inter' },
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#fff',
          font: { size: 12, family: 'Inter' },
        },
      },
    },
  };

  const chartContainerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            opacity: 0,
          },
          particles: {
            number: {
              value: 50,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: "#ffffff",
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0.5,
              random: true,
            },
            size: {
              value: 3,
              random: true,
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "out",
              },
            },
          },
        }}
      />

      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center text-white mb-12"
        >
          Mental Health Analytics Dashboard
        </motion.h1>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {isLoaded && (
              <>
                <motion.div
                  custom={0}
                  variants={chartContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/15 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedChart('mood')}
                >
                  <div className="flex items-center mb-4">
                    <Brain className="w-6 h-6 text-purple-400 mr-2" />
                    <h3 className="text-xl font-semibold text-white">Mood Trends</h3>
                  </div>
                  <Line data={moodData} options={chartOptions} />
                </motion.div>

                <motion.div
                  custom={1}
                  variants={chartContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/15 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedChart('engagement')}
                >
                  <div className="flex items-center mb-4">
                    <Activity className="w-6 h-6 text-blue-400 mr-2" />
                    <h3 className="text-xl font-semibold text-white">User Engagement</h3>
                  </div>
                  <Bar data={engagementData} options={chartOptions} />
                </motion.div>

                <motion.div
                  custom={2}
                  variants={chartContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/15 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedChart('resources')}
                >
                  <div className="flex items-center mb-4">
                    <Users className="w-6 h-6 text-pink-400 mr-2" />
                    <h3 className="text-xl font-semibold text-white">Resource Usage</h3>
                  </div>
                  <Pie data={resourceUsageData} options={chartOptions} />
                </motion.div>

                <motion.div
                  custom={3}
                  variants={chartContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/15 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedChart('stress')}
                >
                  <div className="flex items-center mb-4">
                    <Sparkles className="w-6 h-6 text-yellow-400 mr-2" />
                    <h3 className="text-xl font-semibold text-white">Stress Levels</h3>
                  </div>
                  <Doughnut data={stressLevelData} options={chartOptions} />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};