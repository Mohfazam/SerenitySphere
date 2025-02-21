import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, CloudRain, Zap, Leaf, PieChart, Award, BarChart, Clock, Trophy } from 'lucide-react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const emotions = [
  {
    id: 'happy',
    label: 'Happiness',
    color: 'bg-blue-500',
    message: 'Your happiness makes the garden bloom!',
    icon: <Sun className="w-8 h-8 text-white" />,
    sound: 'https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3',
    particleColor: '#3B82F6'
  },
  {
    id: 'sad',
    label: 'Sadness',
    color: 'bg-blue-600',
    message: `Even in sadness, there's beauty. Keep growing!`,
    icon: <CloudRain className="w-8 h-8 text-white" />,
    sound: 'https://assets.mixkit.co/sfx/preview/mixkit-fairy-magic-sparkle-871.mp3',
    particleColor: '#2563EB'
  },
  {
    id: 'anxious',
    label: 'Anxiety',
    color: 'bg-blue-700',
    message: `Take a deep breath. You're stronger than you think!`,
    icon: <Zap className="w-8 h-8 text-white" />,
    sound: 'https://assets.mixkit.co/sfx/preview/mixkit-magic-sweep-game-trophy-257.mp3',
    particleColor: '#1D4ED8'
  },
  {
    id: 'calm',
    label: 'Calm',
    color: 'bg-blue-400',
    message: 'Your calmness brings peace to the garden.',
    icon: <Leaf className="w-8 h-8 text-white" />,
    sound: 'https://assets.mixkit.co/sfx/preview/mixkit-magical-quick-sweep-578.mp3',
    particleColor: '#60A5FA'
  }
];

const particleConfig = {
  particles: {
    number: { value: 30, density: { enable: true, value_area: 800 } },
    color: { value: "#60A5FA" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 }
    },
    opacity: {
      value: 0.3,
      random: true,
      anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
    },
    size: {
      value: 3,
      random: true,
      anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#60A5FA",
      opacity: 0.2,
      width: 1
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "bubble" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      bubble: { distance: 200, size: 6, duration: 2, opacity: 0.8, speed: 3 },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
};

const getRandomPosition = (existingPositions) => {
  let position;
  let attempts = 0;
  const maxAttempts = 50;
  const minDistance = 60; // Increased minimum distance between plants
  const padding = 10; // Padding from edges

  do {
    position = {
      x: padding + Math.random() * (100 - 2 * padding),
      y: padding + Math.random() * (100 - 2 * padding)
    };

    // Check if the position is too close to existing plants
    const isTooClose = existingPositions.some(pos => {
      const dx = pos.x - position.x;
      const dy = pos.y - position.y;
      return Math.sqrt(dx * dx + dy * dy) < minDistance;
    });

    if (!isTooClose || attempts >= maxAttempts) {
      break;
    }
    attempts++;
  } while (true);

  return position;
};

export const MoodGarden = () => {
  const [garden, setGarden] = useState([]);
  const [dominantEmotion, setDominantEmotion] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [showAchievement, setShowAchievement] = useState(false);
  const [lastAchievement, setLastAchievement] = useState('');

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const playSound = (url) => {
    const audio = new Audio(url);
    audio.volume = 0.3;
    audio.play();
  };

  const plantEmotion = (emotion) => {
    const existingPositions = garden.map(plant => plant.position);
    const position = getRandomPosition(existingPositions);
    
    const newPlant = {
      id: Date.now(),
      emotion,
      position,
      scale: Math.random() * 0.3 + 0.8,
      rotation: Math.random() * 360
    };

    setGarden(prev => [...prev, newPlant]);
    playSound(emotion.sound);
    checkAchievements([...garden, newPlant]);
  };

  useEffect(() => {
    if (garden.length > 0) {
      const emotionCounts = {};
      garden.forEach((plant) => {
        emotionCounts[plant.emotion.id] = (emotionCounts[plant.emotion.id] || 0) + 1;
      });
      const dominant = Object.entries(emotionCounts).reduce((a, b) => 
        b[1] > a[1] ? b : a
      )[0];
      setDominantEmotion(dominant);
    }
  }, [garden]);

  const checkAchievements = (updatedGarden) => {
    const newAchievements = [];
    
    if (updatedGarden.length >= 5 && !achievements.includes('Gardener')) {
      newAchievements.push('Gardener');
    }
    if (updatedGarden.length >= 10 && !achievements.includes('Master Gardener')) {
      newAchievements.push('Master Gardener');
    }
    
    const uniqueEmotions = new Set(updatedGarden.map(plant => plant.emotion.id));
    if (uniqueEmotions.size >= emotions.length && !achievements.includes('Emotion Explorer')) {
      newAchievements.push('Emotion Explorer');
    }

    if (newAchievements.length > 0) {
      setAchievements(prev => [...prev, ...newAchievements]);
      setLastAchievement(newAchievements[0]);
      setShowAchievement(true);
      setTimeout(() => setShowAchievement(false), 3000);
      playSound('https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3');
    }
  };

  const getBackgroundColor = () => {
    switch (dominantEmotion) {
      case 'happy': return 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800';
      case 'sad': return 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800';
      case 'anxious': return 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800';
      case 'calm': return 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800';
      default: return 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800';
    }
  };

  const emotionStats = {
    labels: emotions.map(e => e.label),
    datasets: [{
      data: emotions.map(emotion => 
        garden.filter(plant => plant.emotion.id === emotion.id).length
      ),
      backgroundColor: emotions.map(e => e.particleColor),
      borderColor: emotions.map(() => 'rgba(255, 255, 255, 0.8)'),
      borderWidth: 2
    }]
  };

  const barChartData = {
    labels: emotions.map(e => e.label),
    datasets: [{
      label: 'Emotion Count',
      data: emotions.map(emotion => 
        garden.filter(plant => plant.emotion.id === emotion.id).length
      ),
      backgroundColor: emotions.map(e => e.particleColor),
      borderColor: emotions.map(() => 'rgba(255, 255, 255, 0.8)'),
      borderWidth: 1
    }]
  };

  return (
    <section className={`relative overflow-hidden py-20 sm:py-32 ${getBackgroundColor()}`}>
      {/* Background Floating Circles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 left-1/4 w-64 h-64 bg-blue-200 dark:bg-blue-800 rounded-full opacity-30 blur-3xl"
        ></motion.div>
        <motion.div
          animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/2 right-1/4 w-48 h-48 bg-blue-300 dark:bg-blue-700 rounded-full opacity-30 blur-3xl"
        ></motion.div>
      </motion.div>

      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particleConfig}
        className="absolute inset-0"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-8"
        >
          My Mood Garden
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {emotions.map((emotion) => (
            <motion.button
              key={emotion.id}
              className={`px-6 py-3 rounded-lg ${emotion.color} text-white shadow-lg
                transition-all duration-300 flex items-center space-x-2 hover:ring-2 hover:ring-offset-2 hover:ring-blue-500`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => plantEmotion(emotion)}
            >
              {emotion.icon}
              <span className="font-medium">{emotion.label}</span>
            </motion.button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:col-span-2"
          >
            <div className="relative h-[600px] bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
              {garden.map((plant) => (
                <motion.div
                  key={plant.id}
                  className="absolute"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: plant.scale,
                    opacity: 1,
                    x: `${plant.position.x}%`,
                    y: `${plant.position.y}%`,
                    rotate: plant.rotation
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                >
                  <motion.div 
                    className={`p-4 rounded-full ${plant.emotion.color} 
                      shadow-lg cursor-pointer transition-transform hover:scale-110`}
                    whileHover={{ 
                      scale: 1.2,
                      boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)'
                    }}
                    title={plant.emotion.message}
                  >
                    {plant.emotion.icon}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <PieChart className="w-6 h-6 mr-2 text-blue-600" /> Emotion Distribution
              </h3>
              <Pie data={emotionStats} />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <BarChart className="w-6 h-6 mr-2 text-blue-600" /> Emotion Timeline
              </h3>
              <Bar data={barChartData} />
            </div>

            {achievements.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Award className="w-6 h-6 mr-2 text-blue-600" /> Achievements
                </h3>
                <div className="space-y-2">
                  {achievements.map((achievement) => (
                    <motion.div
                      key={achievement} 
                      className="flex items-center space-x-2 bg-blue-50 dark:bg-gray-700 rounded-lg p-3"
                      whileHover={{ scale: 1.02, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}
                    >
                      <Award className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-900 dark:text-white">{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        <AnimatePresence>
          {showAchievement && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="fixed bottom-8 right-8 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg"
            >
              <div className="flex items-center space-x-2">
                <Trophy className="w-6 h-6" />
                <span>Achievement Unlocked: {lastAchievement}!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// export default MoodGarden;