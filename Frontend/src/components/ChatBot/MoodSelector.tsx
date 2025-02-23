import React from 'react';
import { motion } from 'framer-motion';
import { Smile, Meh, Frown, Heart, ThumbsUp } from 'lucide-react';

interface MoodSelectorProps {
  onMoodSelect: (mood: string) => void;
}

const moods = [
  { icon: Smile, label: 'Happy', color: 'text-green-400' },
  { icon: Heart, label: 'Loved', color: 'text-pink-400' },
  { icon: ThumbsUp, label: 'Good', color: 'text-blue-400' },
  { icon: Meh, label: 'Neutral', color: 'text-yellow-400' },
  { icon: Frown, label: 'Sad', color: 'text-purple-400' },
];

export const MoodSelector: React.FC<MoodSelectorProps> = ({ onMoodSelect }) => {
  return (
    <div className="flex flex-col items-center mb-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-200">How are you feeling today?</h3>
      <div className="flex space-x-4">
        {moods.map(({ icon: Icon, label, color }) => (
          <motion.button
            key={label}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onMoodSelect(label)}
            className={`flex flex-col items-center p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors`}
          >
            <Icon className={`w-8 h-8 ${color}`} />
            <span className="mt-2 text-sm text-gray-300">{label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};