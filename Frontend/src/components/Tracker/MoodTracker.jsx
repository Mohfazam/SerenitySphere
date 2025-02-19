"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Info } from "lucide-react";
import MoodTrackerTab from "./MoodTrackerTab";
import InsightsTab from "./InsightsTab";
import AIAssistantTab from "./AIAssistantTab";
import HabitTrackerTab from "./HabitTrackerTab"; // Import the enhanced component

export const MoodTracker = () => {
  const [moodEntries, setMoodEntries] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("tracker");

  useEffect(() => {
    const savedEntries = localStorage.getItem("moodEntries");
    if (savedEntries) setMoodEntries(JSON.parse(savedEntries));

    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
  }, []);

  useEffect(() => {
    localStorage.setItem("moodEntries", JSON.stringify(moodEntries));
  }, [moodEntries]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const addMoodEntry = (newEntry) => {
    setMoodEntries([...moodEntries, newEntry]);
  };

  return (
    <div
      className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} transition-colors duration-300`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            MoodSphere
          </h1>
          <div className="flex space-x-4">
            {/* Dark Mode Toggle */}
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${darkMode ? "bg-yellow-400 text-gray-900" : "bg-gray-800 text-white"}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </motion.button>

            {/* Info Button */}
            <motion.button
              onClick={() => setShowInfo(!showInfo)}
              className="p-2 rounded-full bg-blue-500 text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Info size={24} />
            </motion.button>
          </div>
        </div>

        {/* Info Section */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 p-4 mb-6 rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-2">Welcome to MoodSphere!</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Track your daily moods, activities, and habits. Gain insights into your emotional well-being and
                discover patterns in your mood over time.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab Navigation */}
        <div className="flex justify-center space-x-4 mb-6">
          {["tracker", "insights", "ai", "habits"].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md ${activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "tracker" && <MoodTrackerTab key="tracker" addMoodEntry={addMoodEntry} darkMode={darkMode} />}
          {activeTab === "insights" && <InsightsTab key="insights" moodEntries={moodEntries} darkMode={darkMode} />}
          {activeTab === "ai" && <AIAssistantTab key="ai" moodEntries={moodEntries} darkMode={darkMode} />}
          {activeTab === "habits" && <HabitTrackerTab key="habits" darkMode={darkMode} />}
        </AnimatePresence>
      </div>
    </div>
  );
};