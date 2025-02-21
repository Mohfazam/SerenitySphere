"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Info, Brain, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MoodTrackerTab from "./MoodTrackerTab";
import InsightsTab from "./InsightsTab";
import AIAssistantTab from "./AIAssistantTab";
import HabitTrackerTab from "./HabitTrackerTab";

export const MoodTracker = () => {
  const [moodEntries, setMoodEntries] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [activeTab, setActiveTab] = useState("tracker");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const navbarHeight = useTransform(scrollY, [0, 100], [80, 60]);
  const navbarOpacity = useTransform(scrollY, [0, 100], [1, 0.9]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEntries = localStorage.getItem("moodEntries");
    if (savedEntries) setMoodEntries(JSON.parse(savedEntries));
  }, []);

  useEffect(() => {
    localStorage.setItem("moodEntries", JSON.stringify(moodEntries));
  }, [moodEntries]);

  const addMoodEntry = (newEntry) => {
    setMoodEntries([...moodEntries, newEntry]);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Custom Navbar with MoodSphere title */}
      <motion.nav
        style={{ height: navbarHeight, opacity: navbarOpacity }}
        className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Title */}
            <div className="flex items-center">
              <motion.button
                onClick={() => handleNavigation('/')}
                className="flex-shrink-0 flex items-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 1 }}
                >
                  <Brain className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <span className="ml-2 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                  MoodSphere
                </span>
              </motion.button>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center">
              <div className="flex items-baseline space-x-4">
                <motion.button
                  onClick={() => handleNavigation('/')}
                  className="relative px-3 py-2 rounded-md text-sm font-medium text-gray-300 transition-colors duration-200 hover:text-blue-400"
                  whileHover={{ scale: 1.05 }}
                >
                  Home
                </motion.button>

                <motion.button
                  onClick={() => handleNavigation('/tracker')}
                  className="relative px-3 py-2 rounded-md text-sm font-medium text-gray-300 transition-colors duration-200 hover:text-blue-400"
                  whileHover={{ scale: 1.05 }}
                >
                  MoodSphere
                </motion.button>

                <motion.button
                  onClick={() => handleNavigation('/journaling')}
                  className="relative px-3 py-2 rounded-md text-sm font-medium text-gray-300 transition-colors duration-200 hover:text-blue-400"
                  whileHover={{ scale: 1.05 }}
                >
                  Journaling
                </motion.button>

                <motion.button
                  onClick={() => handleNavigation('/DNA')}
                  className="relative px-3 py-2 rounded-md text-sm font-medium text-gray-300 transition-colors duration-200 hover:text-blue-400"
                  whileHover={{ scale: 1.05 }}
                >
                  DNA
                </motion.button>

                <motion.button
                  onClick={() => handleNavigation('/contact')}
                  className="relative px-3 py-2 rounded-md text-sm font-medium text-gray-300 transition-colors duration-200 hover:text-blue-400"
                  whileHover={{ scale: 1.05 }}
                >
                  Contact
                </motion.button>
                
                {/* Info Button moved inside navbar */}
                <motion.button
                  onClick={() => setShowInfo(!showInfo)}
                  className="p-2 rounded-full bg-blue-500 text-white ml-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Info size={20} />
                </motion.button>
              </div>
            </div>

            {/* Mobile Controls - Menu Toggle and Info Button */}
            <div className="flex items-center space-x-2 md:hidden">
              {/* Info Button - Mobile View */}
              <motion.button
                onClick={() => setShowInfo(!showInfo)}
                className="p-2 rounded-full bg-blue-500 text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Info size={20} />
              </motion.button>
              
              {/* Mobile Menu Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-300 transition-colors duration-200"
                aria-label="Toggle Mobile Menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4"
            >
              <div className="flex flex-col space-y-2">
                <motion.button
                  onClick={() => handleNavigation('/')}
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                >
                  Home
                </motion.button>

                <motion.button
                  onClick={() => handleNavigation('/tracker')}
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                >
                  MoodSphere
                </motion.button>

                <motion.button
                  onClick={() => handleNavigation('/journaling')}
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                >
                  Journaling
                </motion.button>

                <motion.button
                  onClick={() => handleNavigation('/DNA')}
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                >
                  DNA
                </motion.button>

                <motion.button
                  onClick={() => handleNavigation('/contact')}
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                >
                  Contact
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Info Panel */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 p-4 m-4 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-2">Welcome to MoodSphere!</h2>
            <p className="text-gray-300">
              Track your daily moods, activities, and habits. Gain insights into your emotional well-being and
              discover patterns in your mood over time.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex justify-center space-x-4 mb-6">
          {["tracker", "insights", "ai", "habits"].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md ${
                activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "tracker" && <MoodTrackerTab key="tracker" addMoodEntry={addMoodEntry} />}
          {activeTab === "insights" && <InsightsTab key="insights" moodEntries={moodEntries} />}
          {activeTab === "ai" && <AIAssistantTab key="ai" moodEntries={moodEntries} />}
          {activeTab === "habits" && <HabitTrackerTab key="habits" />}
        </AnimatePresence>
      </div>
    </div>
  );
};