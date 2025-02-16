import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Users, Heart, Shield } from 'lucide-react';

export const Statistics = () => {
  const stats = [
    { icon: BarChart, value: '95%', label: 'User Satisfaction' },
    { icon: Users, value: '50K+', label: 'Active Users' },
    { icon: Heart, value: '90%', label: 'Positive Feedback' },
    { icon: Shield, value: '100%', label: 'Data Security' },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            By the Numbers
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
            See how SerenitySphere is making an impact.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center">
                <stat.icon className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mt-4 text-4xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
              <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};