import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export const Newsletter = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
          Subscribe to Our Newsletter
        </h2>
        <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
          Get the latest updates and mental health tips delivered to your inbox.
        </p>
        <div className="mt-8 flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-64 px-4 py-2 rounded-l-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 rounded-r-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
          >
            <Mail className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};