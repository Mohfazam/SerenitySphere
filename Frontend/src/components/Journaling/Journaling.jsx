import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit, Save, BookOpen, Trash, Smile, Meh, Frown, Download  } from 'lucide-react';

export const Journaling = () => {
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState([]);
  const [selectedMood, setSelectedMood] = useState("Neutral");
  const [tags, setTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [previewEntry, setPreviewEntry] = useState(null);

  const moods = [
    { label: "Happy", icon: <Smile size={20} className="text-green-500" /> },
    { label: "Neutral", icon: <Meh size={20} className="text-yellow-500" /> },
    { label: "Sad", icon: <Frown size={20} className="text-red-500" /> },
  ];

  const saveEntry = () => {
    if (entry.trim()) {
      const newEntry = {
        text: entry,
        date: new Date().toLocaleDateString(),
        mood: selectedMood,
        tags: tags,
      };
      setEntries([...entries, newEntry]);
      setEntry("");
      setTags([]);
      setSelectedMood("Neutral");
    }
  };

  const filteredEntries = entries.filter((entry) =>
    entry.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const exportEntries = () => {
    const blob = new Blob([JSON.stringify(entries, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "journal_entries.json";
    link.click();
  };

  const deleteEntry = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
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

      {/* Export Button */}
      <div className="mt-6">
        <button
          onClick={exportEntries}
          className="flex items-center space-x-2 text-blue-500 hover:text-blue-700"
        >
          <Download size={16} />
          <span>Export Entries</span>
        </button>
      </div>

      {/* Entry Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Entry Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="text-gray-700 dark:text-gray-300">
                <p>{previewEntry?.text}</p>
                <div className="mt-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Mood: {previewEntry?.mood}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-4">
                    Tags: {previewEntry?.tags.join(", ")}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};