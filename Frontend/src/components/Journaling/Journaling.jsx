import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit, Save, BookOpen } from 'lucide-react';

export const Journaling = () => {
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState([]);

  const saveEntry = () => {
    if (entry.trim()) {
      setEntries([...entries, { text: entry, date: new Date().toLocaleDateString() }]);
      setEntry('');
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Journaling</h2>
      <div className="mb-4">
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          className="w-full p-3 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write about your thoughts and feelings..."
          maxLength={500}
          rows={4}
        />
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{entry.length}/500</p>
      </div>
      <motion.button
        onClick={saveEntry}
        className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 flex items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Save size={16} className="mr-2" /> Save Entry
      </motion.button>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Recent Entries</h3>
        <ul className="space-y-2">
          {entries.slice(-3).map((entry, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300">
              <BookOpen size={16} className="inline-block mr-2" />
              {entry.date}: {entry.text.slice(0, 50)}...
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};