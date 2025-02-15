import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, CloudRain, Zap, Leaf } from 'lucide-react';

export const MoodGarden = () => {
  const [garden, setGarden] = useState([]);
  const [dominantEmotion, setDominantEmotion] = useState(null);

  // Emotion options with corresponding plant data
  const emotions = [
    {
      id: 'happy',
      label: 'Happiness',
      color: 'bg-yellow-400',
      message: 'Your happiness makes the garden bloom!',
      icon: <Sun className="w-8 h-8 text-yellow-600" />,
      sound: 'https://assets.mixkit.co/active_storage/sfx/3007/3007-preview.mp3', // Example sound
    },
    {
      id: 'sad',
      label: 'Sadness',
      color: 'bg-blue-400',
      message: 'Even in sadness, there’s beauty. Keep growing!',
      icon: <CloudRain className="w-8 h-8 text-blue-600" />,
      sound: 'https://assets.mixkit.co/active_storage/sfx/3008/3008-preview.mp3',
    },
    {
      id: 'anxious',
      label: 'Anxiety',
      color: 'bg-red-400',
      message: 'Take a deep breath. You’re stronger than you think!',
      icon: <Zap className="w-8 h-8 text-red-600" />,
      sound: 'https://assets.mixkit.co/active_storage/sfx/3009/3009-preview.mp3',
    },
    {
      id: 'calm',
      label: 'Calm',
      color: 'bg-green-400',
      message: 'Your calmness brings peace to the garden.',
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      sound: 'https://assets.mixkit.co/active_storage/sfx/3010/3010-preview.mp3',
    },
  ];

  // Handle planting an emotion
  const plantEmotion = (emotion) => {
    const newPlant = {
      id: Date.now(), // Unique ID for each plant
      emotion: emotion.label,
      color: emotion.color,
      message: emotion.message,
      icon: emotion.icon,
      position: {
        x: Math.random() * 80 + 10, // Random position (10% to 90%)
        y: Math.random() * 80 + 10,
      },
    };

    // Play sound effect
    const audio = new Audio(emotion.sound);
    audio.play();

    setGarden([...garden, newPlant]);
  };

  // Calculate dominant emotion
  useEffect(() => {
    if (garden.length > 0) {
      const emotionCounts = {};
      garden.forEach((plant) => {
        emotionCounts[plant.emotion] = (emotionCounts[plant.emotion] || 0) + 1;
      });
      const dominant = Object.keys(emotionCounts).reduce((a, b) =>
        emotionCounts[a] > emotionCounts[b] ? a : b
      );
      setDominantEmotion(dominant);
    }
  }, [garden]);

  // Background color based on dominant emotion
  const getBackgroundColor = () => {
    switch (dominantEmotion) {
      case 'Happiness':
        return 'bg-gradient-to-br from-yellow-50 to-yellow-100';
      case 'Sadness':
        return 'bg-gradient-to-br from-blue-50 to-blue-100';
      case 'Anxiety':
        return 'bg-gradient-to-br from-red-50 to-red-100';
      case 'Calm':
        return 'bg-gradient-to-br from-green-50 to-green-100';
      default:
        return 'bg-gradient-to-br from-green-50 to-green-100';
    }
  };

  return (
    <section className={`py-20 ${getBackgroundColor()} dark:from-gray-900 dark:to-gray-800`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
          Grow Your Mood Garden
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Plant your emotions and watch your garden bloom. Click on an emotion to get started!
        </p>

        {/* Emotion Buttons */}
        <div className="flex justify-center space-x-4 mb-10">
          {emotions.map((emotion) => (
            <motion.button
              key={emotion.id}
              className={`px-6 py-2 rounded-lg text-white font-semibold transition-all hover:scale-105 ${emotion.color}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => plantEmotion(emotion)}
            >
              {emotion.label}
            </motion.button>
          ))}
        </div>

        {/* Garden Canvas */}
        <div className="relative h-[500px] w-full bg-green-50 dark:bg-gray-700 rounded-lg overflow-hidden">
          {garden.map((plant) => (
            <motion.div
              key={plant.id}
              className="absolute w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer"
              style={{
                left: `${plant.position.x}%`,
                top: `${plant.position.y}%`,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 100 }}
              whileHover={{ scale: 1.2 }}
              title={`${plant.emotion}: ${plant.message}`}
            >
              <div className={`w-full h-full rounded-full flex items-center justify-center ${plant.color}`}>
                {plant.icon}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feedback Message */}
        {garden.length > 0 && (
          <motion.div
            className="mt-10 p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {garden[garden.length - 1].message}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};