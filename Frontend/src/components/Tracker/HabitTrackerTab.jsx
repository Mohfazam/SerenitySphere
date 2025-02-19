"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

const HabitTrackerTab = () => {
  const [habits, setHabits] = useState([
    { id: 1, name: "Meditation", completed: false },
    { id: 2, name: "Exercise", completed: false },
    { id: 3, name: "Sleep 8 Hours", completed: false },
  ]);

  const toggleHabitCompletion = (id) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

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
          Track your daily habits to build a healthier lifestyle.
        </p>
        <div className="space-y-4">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className={`flex items-center justify-between p-4 rounded-lg ${
                habit.completed
                  ? "bg-green-100 dark:bg-green-900"
                  : "bg-gray-100 dark:bg-gray-700"
              }`}
            >
              <span
                className={`text-lg ${
                  habit.completed
                    ? "text-green-700 dark:text-green-200"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {habit.name}
              </span>
              <button
                onClick={() => toggleHabitCompletion(habit.id)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {habit.completed ? (
                  <CheckCircle className="text-green-500" size={24} />
                ) : (
                  <XCircle className="text-red-500" size={24} />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HabitTrackerTab;