"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Line, Bar } from "react-chartjs-2";
import { Lightbulb, AlertTriangle, TrendingUp, Rocket, Zap, Clock, Activity, Brain, HeartPulse } from "lucide-react";

const AIAssistantTab = ({ moodEntries, darkMode }) => {
  const [activeTip, setActiveTip] = useState(null);
  const [selectedMyth, setSelectedMyth] = useState(null);
  
  const insightsData = {
    moodFrequency: {
      labels: ["Focus", "Creativity", "Stress", "Energy", "Social"],
      data: [82, 68, 45, 73, 58]
    },
    productivityPeaks: ["10 AM", "2 PM", "7 PM"],
    cognitivePatterns: [
      { label: "Deep Work", value: "3.2h/day" },
      { label: "Creative Flow", value: "1.1h/day" },
      { label: "Mental Fatigue", value: "4.8/10" }
    ]
  };

  const neuroStrategies = [
    {
      title: "Pomodoro 2.0",
      content: "52min work / 17min break cycles show 31% better retention",
      icon: <Clock className="w-5 h-5 text-purple-500" />
    },
    {
      title: "Neuro Priming",
      content: "Morning light exposure increases afternoon productivity by 40%",
      icon: <Zap className="w-5 h-5 text-blue-500" />
    },
    {
      title: "Cognitive Reframing",
      content: "Stress-to-challenge mindset boosts performance by 22%",
      icon: <Brain className="w-5 h-5 text-green-500" />
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Activity className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Neural Performance Dashboard</h2>
            <p className="text-gray-600 dark:text-gray-300">Optimizing cognitive output through behavioral analytics</p>
          </div>
        </div>

        {/* Cognitive Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insightsData.cognitivePatterns.map((metric, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
            >
              <div className="flex items-center gap-3 mb-2">
                <HeartPulse className="w-6 h-6 text-red-500" />
                <h3 className="font-semibold">{metric.label}</h3>
              </div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {metric.value}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Advanced Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Neuro Strategies */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-500" />
              Neuroscience-Backed Strategies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {neuroStrategies.map((strategy, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -3 }}
                  className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600"
                >
                  <div className="flex items-start gap-3">
                    <div className="pt-1">{strategy.icon}</div>
                    <div>
                      <h4 className="font-medium mb-1">{strategy.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {strategy.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Performance Peaks */}
          <div className="space-y-6">
            <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
              <h4 className="font-semibold mb-2">Prime Performance Windows</h4>
              <div className="space-y-2">
                {insightsData.productivityPeaks.map((peak, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium">{peak}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      ({["Focus", "Creativity", "Analysis"][index]} peak)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mood Correlation Matrix */}
          <div className="p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Mood & Performance Correlation</h3>
            <div className="grid grid-cols-5 gap-2 text-xs">
              {/* Matrix Header */}
              <div className="col-span-1"></div>
              {["Focus", "Creativity", "Stress", "Energy", "Social"].map((label) => (
                <div key={label} className="text-center font-medium py-2">
                  {label}
                </div>
              ))}
              
              {/* Matrix Rows */}
              {["Morning", "Afternoon", "Evening"].map((time, rowIndex) => (
                <>
                  <div className="font-medium py-2">{time}</div>
                  {[0.82, 0.65, 0.45, 0.73, 0.58].map((value, colIndex) => (
                    <div 
                      key={colIndex}
                      className="h-8 rounded flex items-center justify-center"
                      style={{
                        backgroundColor: `rgba(59, 130, 246, ${value * 0.4})`,
                        color: value > 0.7 ? 'white' : 'inherit'
                      }}
                    >
                      {Math.round(value * 100)}%
                    </div>
                  ))}
                </>
              ))}
            </div>
          </div>

          {/* Cognitive Timeline */}
          <div className="p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Daily Performance Rhythm</h3>
            <div className="space-y-3">
              {[
                { time: "8 AM", mood: 7.2, productivity: 6.8 },
                { time: "12 PM", mood: 8.1, productivity: 8.4 },
                { time: "4 PM", mood: 6.5, productivity: 7.2 },
                { time: "8 PM", mood: 5.8, productivity: 4.9 }
              ].map((entry, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-16 font-medium">{entry.time}</div>
                  <div className="flex-1">
                    <div className="flex gap-2 items-center">
                      <div className="w-20 text-right">Mood:</div>
                      <div 
                        className="h-2 bg-blue-100 rounded-full"
                        style={{ width: `${entry.mood * 10}%` }}
                      >
                        <div 
                          className="h-2 bg-blue-500 rounded-full"
                          style={{ width: '100%' }}
                        />
                      </div>
                      <div className="w-8">{entry.mood}</div>
                    </div>
                    <div className="flex gap-2 items-center mt-1">
                      <div className="w-20 text-right">Productivity:</div>
                      <div 
                        className="h-2 bg-green-100 rounded-full"
                        style={{ width: `${entry.productivity * 10}%` }}
                      >
                        <div 
                          className="h-2 bg-green-500 rounded-full"
                          style={{ width: '100%' }}
                        />
                      </div>
                      <div className="w-8">{entry.productivity}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Action Items */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Priority Optimization Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Schedule creative work between 10AM-12PM (peak flow state)",
              "Implement 5-4-3-2-1 grounding technique before meetings",
              "Use blue light filtering after 7PM for better sleep quality",
              "Conduct weekly reflection every Friday 4PM"
            ].map((action, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 5 }}
                className="flex items-start gap-2 p-3 bg-white dark:bg-gray-700 rounded-lg"
              >
                <div className="pt-1">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{action}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AIAssistantTab;