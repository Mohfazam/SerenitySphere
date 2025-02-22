"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, XCircle, Flame, Book, Moon, Activity, 
  HeartPulse, Plus, Calendar, Trophy, Share, Bell, 
  Target, TrendingUp, Clock, Zap, Star, Award
} from "lucide-react";

const HabitTrackerTab = ({ darkMode }) => {
  const [habits, setHabits] = useState([
    { id: 1, name: "Morning Meditation", completed: false, streak: 0, category: "Mindfulness", frequency: "Daily" },
    { id: 2, name: "Workout Session", completed: false, streak: 0, category: "Fitness", frequency: "5x/week" },
    { id: 3, name: "Digital Detox", completed: false, streak: 0, category: "Wellness", frequency: "Daily" },
    { id: 4, name: "Learning Time", completed: false, streak: 0, category: "Growth", frequency: "3x/week" },
  ]);
  
  const [newHabit, setNewHabit] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [badges, setBadges] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const [selectedHabit, setSelectedHabit] = useState(null);

  // Badge configuration
  const badgeLevels = [
    { name: "Starter", threshold: 3, icon: <Star size={16} /> },
    { name: "Consistent", threshold: 7, icon: <Flame size={16} /> },
    { name: "Master", threshold: 21, icon: <Award size={16} /> },
    { name: "Legend", threshold: 30, icon: <Trophy size={16} /> }
  ];

  // Statistics state
  const [stats, setStats] = useState({
    currentStreak: 0,
    longestStreak: 0,
    monthlyCompletion: 0,
    weeklyProgress: Array(7).fill(0)
  });

  // Add Habit Function
  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits(prev => [
        ...prev,
        {
          id: Date.now(),
          name: newHabit,
          completed: false,
          streak: 0,
          category: "Custom",
          frequency: "Daily"
        }
      ]);
      setNewHabit("");
    }
  };

  // Handle Enter Key Press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addHabit();
    }
  };

  // Toggle Habit Completion
  const toggleHabitCompletion = (id, e) => {
    if (e) e.stopPropagation();
    setHabits(prev => prev.map(habit => 
      habit.id === id ? { 
        ...habit, 
        completed: !habit.completed,
        streak: habit.completed ? Math.max(0, habit.streak - 1) : habit.streak + 1
      } : habit
    ));
  };

  // Calculate Badges
  useEffect(() => {
    const newBadges = badgeLevels.filter(level => 
      habits.some(h => h.streak >= level.threshold) && 
      !badges.includes(level.name)
    ).map(level => level.name);
    
    setBadges(prev => [...new Set([...prev, ...newBadges])]);
  }, [habits]);

  // Calculate Statistics
  useEffect(() => {
    const streaks = habits.map(h => h.streak);
    setStats({
      currentStreak: Math.max(...streaks),
      longestStreak: Math.max(...streaks),
      monthlyCompletion: Math.round((habits.filter(h => h.completed).length / habits.length) * 100),
      weeklyProgress: Array(7).fill(0).map((_, i) => 
        Math.round(Math.random() * 100)
      )
    });
  }, [habits]);

  // Calendar View Render
  const renderCalendar = () => (
    <div className="grid grid-cols-7 gap-2 mb-6">
      {Array.from({ length: 31 }).map((_, day) => (
        <div key={day} className="aspect-square bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
          <span className="text-xs">{day + 1}</span>
        </div>
      ))}
    </div>
  );

  // Habit Details Modal
  const renderHabitDetails = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={() => setSelectedHabit(null)}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold mb-4">{selectedHabit.name}</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Current Streak:</span>
            <div className="flex items-center gap-2">
              <Flame className="text-orange-500" />
              <span>{selectedHabit.streak} days</span>
            </div>
          </div>
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
          <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Edit Habit
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen p-4"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Habit Forge</h1>
            <p className="text-gray-600 dark:text-gray-300">Craft your best self</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
              <Share size={20} />
            </button>
            <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
              <Bell size={20} />
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="text-blue-500" />
              <span className="font-medium">Current Streak</span>
            </div>
            <div className="text-2xl font-bold">{stats.currentStreak}d</div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-green-500" />
              <span className="font-medium">Monthly Completion</span>
            </div>
            <div className="text-2xl font-bold">{stats.monthlyCompletion}%</div>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Target className="text-purple-500" />
              <span className="font-medium">Active Goals</span>
            </div>
            <div className="text-2xl font-bold">{habits.length}</div>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-900 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="text-orange-500" />
              <span className="font-medium">Daily Average</span>
            </div>
            <div className="text-2xl font-bold">42m</div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setViewMode("list")}
            className={`px-4 py-2 rounded-lg ${viewMode === "list" ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
          >
            List View
          </button>
          <button
            onClick={() => setViewMode("calendar")}
            className={`px-4 py-2 rounded-lg ${viewMode === "calendar" ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
          >
            Calendar
          </button>
        </div>

        {/* Main Content */}
        {viewMode === "calendar" ? renderCalendar() : (
          <div className="space-y-4">
            {habits.map(habit => (
              <motion.div
                key={habit.id}
                className="group relative p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-md transition-all"
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedHabit(habit)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                      <Activity className="text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">{habit.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{habit.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Flame className="text-orange-500" />
                      <span>{habit.streak}</span>
                    </div>
                    <button 
                      className={`p-1 rounded-full ${habit.completed ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-600'}`}
                      onClick={(e) => toggleHabitCompletion(habit.id, e)}
                    >
                      {habit.completed ? 
                        <CheckCircle className="text-white" size={24} /> : 
                        <XCircle className="text-gray-500 dark:text-gray-300" size={24} />
                      }
                    </button>
                  </div>
                </div>
                <div className="mt-2 h-1 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-500" 
                    style={{ width: `${(habit.streak / 30) * 100}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Achievements Section */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Achievements</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badgeLevels.map(level => (
              <div 
                key={level.name}
                className={`p-4 rounded-xl transition-all ${
                  badges.includes(level.name) 
                    ? 'bg-yellow-100 dark:bg-yellow-900' 
                    : 'bg-gray-100 dark:bg-gray-700 opacity-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {level.icon}
                  <span className="font-medium">{level.name}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {level.threshold}+ day streak
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Add Habit Section */}
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="text"
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="New habit..."
                className="flex-1 p-2 bg-transparent border-b-2 border-blue-500 focus:outline-none"
              />
              <button
                onClick={addHabit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Add Habit
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedHabit && renderHabitDetails()}
      </AnimatePresence>
    </motion.div>
  );
};

export default HabitTrackerTab;