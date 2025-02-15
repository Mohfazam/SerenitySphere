import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, CloudRain, Zap, Leaf, PieChart, Award, BarChart, Clock } from 'lucide-react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export const MoodGarden = () => {
  const [garden, setGarden] = useState([]);
  const [dominantEmotion, setDominantEmotion] = useState(null);
  const [gardenName, setGardenName] = useState('My Mood Garden');
  const [achievements, setAchievements] = useState([]);

  // Emotion options with corresponding plant data
  const emotions = [
    {
      id: 'happy',
      label: 'Happiness',
      color: 'bg-yellow-400',
      message: 'Your happiness makes the garden bloom!',
      icon: <Sun className="w-8 h-8 text-yellow-600" />,
      sound: 'https://assets.mixkit.co/active_storage/sfx/3007/3007-preview.mp3', // Happy sound
      weather: 'sunny',
    },
    {
      id: 'sad',
      label: 'Sadness',
      color: 'bg-blue-400',
      message: 'Even in sadness, there’s beauty. Keep growing!',
      icon: <CloudRain className="w-8 h-8 text-blue-600" />,
      sound: 'https://assets.mixkit.co/active_storage/sfx/3008/3008-preview.mp3', // Sad sound
      weather: 'rainy',
    },
    {
      id: 'anxious',
      label: 'Anxiety',
      color: 'bg-red-400',
      message: 'Take a deep breath. You’re stronger than you think!',
      icon: <Zap className="w-8 h-8 text-red-600" />,
      sound: 'https://assets.mixkit.co/active_storage/sfx/3009/3009-preview.mp3', // Anxious sound
      weather: 'stormy',
    },
    {
      id: 'calm',
      label: 'Calm',
      color: 'bg-green-400',
      message: 'Your calmness brings peace to the garden.',
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      sound: 'https://assets.mixkit.co/active_storage/sfx/3010/3010-preview.mp3', // Calm sound
      weather: 'calm',
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
    checkAchievements();
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

  // Check for achievements
  const checkAchievements = () => {
    const newAchievements = [];
    if (garden.length >= 5 && !achievements.includes('Gardener')) {
      newAchievements.push('Gardener');
    }
    if (garden.length >= 10 && !achievements.includes('Master Gardener')) {
      newAchievements.push('Master Gardener');
    }
    setAchievements([...achievements, ...newAchievements]);
  };

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

  // Emotion statistics data for pie chart
  const emotionStats = {
    labels: emotions.map((emotion) => emotion.label),
    datasets: [
      {
        data: emotions.map(
          (emotion) => garden.filter((plant) => plant.emotion === emotion.label).length
        ),
        backgroundColor: emotions.map((emotion) => emotion.color.replace('bg-', '')),
      },
    ],
  };

  // Emotion statistics data for bar chart
  const barChartData = {
    labels: emotions.map((emotion) => emotion.label),
    datasets: [
      {
        label: 'Emotion Count',
        data: emotions.map(
          (emotion) => garden.filter((plant) => plant.emotion === emotion.label).length
        ),
        backgroundColor: emotions.map((emotion) => emotion.color.replace('bg-', '')),
      },
    ],
  };

  // Initialize tsparticles
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <section className={`py-20 ${getBackgroundColor()} dark:from-gray-900 dark:to-gray-800`}>
      {/* Interactive Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: 'bubble',
              },
            },
            modes: {
              bubble: {
                distance: 200,
                size: 6,
                duration: 2,
                opacity: 0.8,
              },
            },
          },
          particles: {
            color: {
              value: emotions.find((e) => e.label === dominantEmotion)?.color.replace('bg-', '') || '#32CD32',
            },
            links: {
              color: emotions.find((e) => e.label === dominantEmotion)?.color.replace('bg-', '') || '#32CD32',
              distance: 150,
              enable: true,
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 2,
              direction: 'none',
              random: true,
              straight: false,
              outMode: 'out',
              bounce: true,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 30,
            },
            opacity: {
              value: 0.5,
              random: true,
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: 3,
              random: true,
            },
          },
          detectRetina: true,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
          {gardenName}
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

        {/* Infographics Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Pie Chart Card */}
          <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
              <PieChart className="w-6 h-6 mr-2" /> Emotion Distribution
            </h3>
            <div className="w-48 h-48 mx-auto">
              <Pie data={emotionStats} />
            </div>
          </div>

          {/* Bar Chart Card */}
          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
              <BarChart className="w-6 h-6 mr-2" /> Emotion Count
            </h3>
            <div className="w-full h-48">
              <Bar data={barChartData} />
            </div>
          </div>

          {/* Timeline Card */}
          <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
              <Clock className="w-6 h-6 mr-2" /> Emotion Timeline
            </h3>
            <div className="space-y-2">
              {garden.slice(-5).map((plant) => (
                <div key={plant.id} className="text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">{plant.emotion}</span> - {plant.message}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements */}
        {achievements.length > 0 && (
          <div className="mt-10 p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Achievements
            </h3>
            <div className="flex space-x-4">
              {achievements.map((achievement) => (
                <div key={achievement} className="flex items-center space-x-2">
                  <Award className="w-6 h-6 text-yellow-500" />
                  <p className="text-lg text-gray-600 dark:text-gray-300">{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};