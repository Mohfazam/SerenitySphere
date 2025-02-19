"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Flame, Moon, Activity, HeartPulse } from "lucide-react";

const HabitTrackerTab = ({ darkMode }) => {
  const [habits, setHabits] = useState([
    { id: 1, name: "Meditation", completed: false, streak: 0 },
    { id: 2, name: "Exercise", completed: false, streak: 0 },
    { id: 3, name: "Sleep 8 Hours", completed: false, streak: 0 },
  ]);

  const toggleHabitCompletion = (id) => {
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
  };

  const completedHabits = habits.filter((habit) => habit.completed).length;
  const totalHabits = habits.length;
  const progress = (completedHabits / totalHabits) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Habit Tracker</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Build positive habits and track your progress daily.
        </p>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <motion.div
              className="bg-blue-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            {completedHabits} of {totalHabits} habits completed
          </p>
        </div>

        {/* Habit List */}
        <div className="space-y-4">
          {habits.map((habit) => (
            <motion.div
              key={habit.id}
              className={`flex items-center justify-between p-4 rounded-lg ${
                habit.completed
                  ? "bg-green-50 dark:bg-green-900"
                  : "bg-gray-100 dark:bg-gray-700"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`p-2 rounded-full ${
                    habit.completed
                      ? "bg-green-100 dark:bg-green-800"
                      : "bg-gray-200 dark:bg-gray-600"
                  }`}
                >
                  {habit.name === "Meditation" && <Moon className="text-blue-500" size={20} />}
                  {habit.name === "Exercise" && <Activity className="text-purple-500" size={20} />}
                  {habit.name === "Sleep 8 Hours" && <HeartPulse className="text-pink-500" size={20} />}
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
                    <span className="text-sm text-gray-600 dark:text-gray-300">{habit.streak}🔥</span>
                  </div>
                )}
                <button
                  onClick={() => toggleHabitCompletion(habit.id)}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
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
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HabitTrackerTab;