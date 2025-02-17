import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smile, Meh, Frown, Angry, AlertCircle } from 'lucide-react';

export const MoodTracker = () => {
  const [mood, setMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);

  const moods = [
    { emoji: <Smile size={24} />, label: 'Happy' },
    { emoji: <Meh size={24} />, label: 'Neutral' },
    { emoji: <Frown size={24} />, label: 'Sad' },
    { emoji: <Angry size={24} />, label: 'Angry' },
    { emoji: <AlertCircle size={24} />, label: 'Anxious' },
  ];

  const logMood = (selectedMood) => {
    setMood(selectedMood);
    setMoodHistory([...moodHistory, { mood: selectedMood, date: new Date().toLocaleDateString() }]);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Mood Tracker</h2>
      <div className="flex space-x-4 mb-6">
        {moods.map((m, index) => (
          <motion.button
            key={index}
            onClick={() => logMood(m.label)}
            className="p-3 rounded-full bg-white dark:bg-gray-700 shadow-sm hover:shadow-md transition-shadow"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {m.emoji}
          </motion.button>
        ))}
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Mood History</h3>
        <ul className="space-y-2">
          {moodHistory.slice(-7).map((entry, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300">
              {entry.date}: {entry.mood}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};