"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, 
  XCircle, 
  Flame, 
  Book, 
  Moon, 
  Activity, 
  HeartPulse, 
  Plus, 
  Calendar, 
  Trophy, 
  Share, 
  Bell 
} from "lucide-react";

const HabitTrackerTab = ({ darkMode }) => {
  const [habits, setHabits] = useState([
    { id: 1, name: "Meditation", completed: false, streak: 0, category: "Mindfulness" },
    { id: 2, name: "Exercise", completed: false, streak: 0, category: "Health" },
    { id: 3, name: "Sleep 8 Hours", completed: false, streak: 0, category: "Health" },
    { id: 4, name: "Read a Book", completed: false, streak: 0, category: "Productivity" },
  ]);
  const [newHabit, setNewHabit] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [badges, setBadges] = useState([]);

  const toggleHabitCompletion = (id, e) => {
    if (e) e.stopPropagation();
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completed: !habit.completed,
              streak: habit.completed ? habit.streak : habit.streak + 1,
            }
          : habit
      )
    );
    // Play sound effect
    const audio = new Audio("/sounds/click.mp3");
    audio.play().catch(console.error); // Handle any audio playback errors
  };

  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits((prevHabits) => [
        ...prevHabits,
        {
          id: Date.now(), // Use timestamp for unique ID
          name: newHabit,
          completed: false,
          streak: 0,
          category: "Custom",
        },
      ]);
      setNewHabit("");
      setShowAddHabit(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addHabit();
    }
  };

  const filteredHabits = selectedCategory === "All"
    ? habits
    : habits.filter((habit) => habit.category === selectedCategory);

  const completedHabits = filteredHabits.filter((habit) => habit.completed).length;
  const totalHabits = filteredHabits.length;
  const progress = totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0;

  // Badge system
  useEffect(() => {
    const newBadges = [];
    if (habits.some((habit) => habit.streak >= 7)) {
      newBadges.push("7-Day Streak Master");
    }
    if (habits.some((habit) => habit.streak >= 30)) {
      newBadges.push("30-Day Legend");
    }
    setBadges(newBadges);
  }, [habits]);

  const getHabitIcon = (habitName) => {
    const icons = {
      "Meditation": <Moon className="text-blue-500" size={20} />,
      "Exercise": <Activity className="text-purple-500" size={20} />,
      "Sleep 8 Hours": <HeartPulse className="text-pink-500" size={20} />,
      "Read a Book": <Book className="text-green-500" size={20} />
    };
    return icons[habitName] || <Plus className="text-gray-500" size={20} />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
          Habit Tracker
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Build positive habits and track your progress daily.
        </p>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["All", "Health", "Mindfulness", "Productivity"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-blue-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            {completedHabits} of {totalHabits} habits completed today
          </p>
        </div>

        {/* Badges */}
        {badges.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
              Your Badges
            </h3>
            <div className="flex flex-wrap gap-2">
              {badges.map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900 px-4 py-2 rounded-full"
                >
                  <Trophy className="text-yellow-500" size={20} />
                  <span className="text-sm text-yellow-700 dark:text-yellow-200">
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Habit List */}
        <div className="space-y-4">
          {filteredHabits.map((habit) => (
            <motion.div
              key={habit.id}
              className={`flex items-center justify-between p-4 rounded-lg cursor-pointer ${
                habit.completed
                  ? "bg-green-50 dark:bg-green-900"
                  : "bg-gray-100 dark:bg-gray-700"
              } hover:shadow-md transition-all duration-200`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => toggleHabitCompletion(habit.id, e)}
            >
              <div className="flex items-center space-x-4 flex-1">
                <div
                  className={`p-2 rounded-full ${
                    habit.completed
                      ? "bg-green-100 dark:bg-green-800"
                      : "bg-gray-200 dark:bg-gray-600"
                  }`}
                >
                  {getHabitIcon(habit.name)}
                </div>
                <span
                  className={`text-lg ${
                    habit.completed
                      ? "text-green-700 dark:text-green-200"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {habit.name}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                {habit.streak > 0 && (
                  <div className="flex items-center space-x-1">
                    <Flame className="text-orange-500" size={20} />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {habit.streak}🔥
                    </span>
                  </div>
                )}
                <div
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  onClick={(e) => toggleHabitCompletion(habit.id, e)}
                >
                  <AnimatePresence mode="wait">
                    {habit.completed ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <CheckCircle className="text-green-500" size={24} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="cross"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <XCircle className="text-red-500" size={24} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Habit */}
        <div className="mt-6">
          <button
            onClick={() => setShowAddHabit(!showAddHabit)}
            className="flex items-center space-x-2 text-blue-500 hover:text-blue-700 transition-colors duration-200"
          >
            <Plus size={20} />
            <span>Add Habit</span>
          </button>
          {showAddHabit && (
            <motion.div 
              className="mt-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <input
                type="text"
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter a new habit"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={addHabit}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
              >
                Add
              </button>
            </motion.div>
          )}
        </div>

        {/* Motivational Quote */}
        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p className="text-gray-700 dark:text-gray-300 italic">
            "The journey of a thousand miles begins with a single step." 
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default HabitTrackerTab;