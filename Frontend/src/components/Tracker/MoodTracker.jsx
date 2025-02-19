"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Info } from "lucide-react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
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

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  const addMoodEntry = (newEntry) => {
    setMoodEntries([...moodEntries, newEntry]);
  };

  return (
    <div
      className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} transition-colors duration-300`}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: darkMode ? "#111827" : "#F3F4F6",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
          },
          particles: {
            color: {
              value: darkMode ? "#ffffff" : "#000000",
            },
            links: {
              color: darkMode ? "#ffffff" : "#000000",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            MoodSphere
          </h1>
          <div className="flex space-x-4">
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${darkMode ? "bg-yellow-400 text-gray-900" : "bg-gray-800 text-white"}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </motion.button>
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