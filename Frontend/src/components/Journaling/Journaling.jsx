import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit, Save, BookOpen, Trash } from 'lucide-react';

export const Journaling = () => {
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState([]);

  const saveEntry = () => {
    if (entry.trim()) {
      setEntries([...entries, { text: entry, date: new Date().toLocaleDateString() }]);
      setEntry('');
    }
  };

  const deleteEntry = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <BookOpen size={28} className="mr-2 text-blue-600 dark:text-blue-400" />
          Journaling
        </h2>

        {/* Journal Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg"
        >
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            className="w-full p-4 rounded-lg bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write about your thoughts and feelings..."
            maxLength={500}
            rows={5}
          />
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {entry.length}/500
            </p>
            <motion.button
              onClick={saveEntry}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Save size={16} className="mr-2" /> Save Entry
            </motion.button>
          </div>
        </motion.div>

        {/* Recent Entries Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Entries
          </h3>
          <AnimatePresence>
            {entries.slice(-5).reverse().map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <BookOpen size={20} className="text-blue-600 dark:text-blue-400 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {entry.date}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteEntry(entries.length - 1 - index)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Trash size={16} className="text-red-500" />
                  </button>
                </div>
                <p className="mt-3 text-gray-600 dark:text-gray-400">
                  {entry.text}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};