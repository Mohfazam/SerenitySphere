import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Heart, Star, ChevronRight, Brain, Smile } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      {/* Background Floating Circles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      >
        {/* Floating Circle 1 */}
        <motion.div
          animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 left-1/4 w-64 h-64 bg-blue-200 dark:bg-blue-800 rounded-full opacity-30 blur-3xl"
        ></motion.div>
        {/* Floating Circle 2 */}
        <motion.div
          animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/2 right-1/4 w-48 h-48 bg-blue-300 dark:bg-blue-700 rounded-full opacity-30 blur-3xl"
        ></motion.div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Text Content with Visual Enhancements */}
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-7 lg:text-left">
            {/* Animated Brain Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-16 h-16 mx-auto lg:mx-0 mb-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
            >
              <Brain className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
            >
              <span className="block xl:inline">Empowering Your</span>{' '}
              <span className="block text-blue-600 dark:text-blue-400 xl:inline">Mental Well-being</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
            >
              SerenitySphere: Your personalized mental health companion
            </motion.p>

            {/* Call-to-Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                Explore Now
                <ChevronRight className="ml-2 w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Additional Visual Elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              {/* Feature 1 */}
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Instant Mood Boost</span>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Personalized Support</span>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center space-x-2">
                <Smile className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Daily Happiness Tips</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Stats and Ratings */}
          <div className="mt-12 lg:mt-0 lg:col-span-5">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="space-y-6">
                {/* Stat 1 */}
                <motion.div
                  whileHover={{ scale: 1.02, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}
                  className="flex items-center space-x-4 p-4 rounded-lg bg-blue-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
                >
                  <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">75.2%</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Average daily activity</p>
                  </div>
                </motion.div>

                {/* Stat 2 */}
                <motion.div
                  whileHover={{ scale: 1.02, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}
                  className="flex items-center space-x-4 p-4 rounded-lg bg-blue-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
                >
                  <Heart className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">~20k</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Average daily users</p>
                  </div>
                </motion.div>

                {/* Rating */}
                <motion.div
                  whileHover={{ scale: 1.02, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}
                  className="flex items-center space-x-4 p-4 rounded-lg bg-blue-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
                >
                  <Star className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">4.5</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Average user rating</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};