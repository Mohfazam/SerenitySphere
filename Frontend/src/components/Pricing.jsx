import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';

export const Pricing = () => {
  const plans = [
    {
      name: 'Basic',
      price: '$0',
      features: ['Mood Tracking', 'Community Access', 'Basic Insights'],
      icon: Zap,
    },
    {
      name: 'Pro',
      price: '$9.99',
      features: ['Advanced Insights', 'AI Recommendations', 'Priority Support'],
      icon: Check,
    },
    {
      name: 'Premium',
      price: '$19.99',
      features: ['All Pro Features', 'Personalized Therapy', '24/7 Support'],
      icon: Check,
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Pricing Plans
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
            Choose the plan that fits your needs.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center">
                <plan.icon className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
              <p className="mt-2 text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</p>
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-500 dark:text-gray-400">
                    <Check className="w-4 h-4 mr-2 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-6 w-full px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200">
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};