import React from 'react';
import { motion } from 'framer-motion';
import { DownloadCloud } from 'lucide-react';

export const Download = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Download the App
        </h2>
        <p className="mt-4 max-w-2xl text-xl text-blue-100 mx-auto">
          Start your journey to better mental health today.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors duration-200"
        >
          <DownloadCloud className="w-6 h-6 mr-2" />
          Download Now
        </motion.button>
      </div>
    </section>
  );
};