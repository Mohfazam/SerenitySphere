import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Users, Heart, Shield, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const baseChartConfig = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      titleColor: '#1f2937',
      bodyColor: '#1f2937',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
      displayColors: false,
      callbacks: {
        label: (context) => `${context.parsed.y}%`
      }
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
        font: { size: 12 },
        color: '#6b7280',
        padding: 8
      }
    },
    x: {
      grid: { display: false },
      ticks: {
        font: { size: 12 },
        color: '#6b7280',
        padding: 8
      }
    }
  }
};

export const Statistics = () => {
  const [selectedStat, setSelectedStat] = useState(0);

  const stats = [
    {
      icon: BarChart,
      value: '95%',
      change: '+5%',
      label: 'User Satisfaction',
      color: '#3b82f6',
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          data: [88, 90, 92, 93, 94, 95],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.4
        }]
      }
    },
    {
      icon: Users,
      value: '50K+',
      change: '+12K',
      label: 'Active Users',
      color: '#8b5cf6',
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          data: [30, 35, 40, 44, 47, 50],
          borderColor: '#8b5cf6',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          fill: true,
          tension: 0.4
        }]
      }
    },
    {
      icon: Heart,
      value: '90%',
      change: '+8%',
      label: 'Positive Feedback',
      color: '#ec4899',
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          data: [82, 84, 86, 87, 89, 90],
          borderColor: '#ec4899',
          backgroundColor: 'rgba(236, 72, 153, 0.1)',
          fill: true,
          tension: 0.4
        }]
      }
    },
    {
      icon: Shield,
      value: '100%',
      change: 'Maintained',
      label: 'Data Security',
      color: '#10b981',
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          data: [100, 100, 100, 100, 100, 100],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true,
          tension: 0.4
        }]
      }
    }
  ];

  const StatCard = ({ stat, index, isActive, onSelect }) => {
    const Icon = stat.icon;
    
    return (
      <motion.div
        initial={false}
        className={`
          relative p-6 rounded-xl cursor-pointer
          bg-white dark:bg-gray-800
          ${isActive ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'}
          transform transition-all duration-300
        `}
        style={{
          boxShadow: isActive ? `0 0 20px ${stat.color}20` : undefined
        }}
        onClick={onSelect}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 rounded-lg" style={{ backgroundColor: `${stat.color}10` }}>
            <Icon size={24} style={{ color: stat.color }} />
          </div>
          <div className="flex items-center px-3 py-1 rounded-full text-sm font-medium" 
               style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
            <ArrowUpRight className="w-4 h-4 mr-1" />
            {stat.change}
          </div>
        </div>
        
        <div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {stat.value}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {stat.label}
          </div>
        </div>

        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute bottom-0 left-0 right-0 h-1 rounded-b-xl"
            style={{ backgroundColor: stat.color }}
            initial={false}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Performance Analytics
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Real-time insights into key performance metrics
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="grid sm:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                stat={stat}
                index={index}
                isActive={selectedStat === index}
                onSelect={() => setSelectedStat(index)}
              />
            ))}
          </div>

          <motion.div
            layout
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {stats[selectedStat].label}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  6-month performance trend
                </p>
              </div>
              <div
                className="flex items-center space-x-2 px-3 py-1 rounded-full"
                style={{ backgroundColor: `${stats[selectedStat].color}15` }}
              >
                <TrendingUp size={16} style={{ color: stats[selectedStat].color }} />
                <span className="text-sm font-medium" style={{ color: stats[selectedStat].color }}>
                  {stats[selectedStat].change}
                </span>
              </div>
            </div>

            <div className="h-[400px]">
              <Line
                data={stats[selectedStat].chartData}
                options={baseChartConfig}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

