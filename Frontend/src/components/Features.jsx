import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, BarChart, Zap, Heart, Shield } from 'lucide-react';

export const Features = () => {
  const [expandedIndex, setExpandedIndex] = React.useState(null);

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const stats = [
    { label: 'Users Helped', value: 95, color: 'bg-blue-500' },
    { label: 'Positive Feedback', value: 90, color: 'bg-green-500' },
    { label: 'Community Growth', value: 85, color: 'bg-purple-500' },
  ];

  const faqs = [
    {
      question: 'How does SerenitySphere help with mental health?',
      answer: 'SerenitySphere provides personalized tools, AI-powered insights, and a supportive community to help you manage your mental well-being.',
    },
    {
      question: 'Is my data safe with SerenitySphere?',
      answer: 'Yes, we use the highest security standards to encrypt and protect your data.',
    },
    {
      question: 'Can I use SerenitySphere for free?',
      answer: 'Yes, SerenitySphere offers a free tier with access to basic features. Premium features are available with a subscription.',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Progress Bars */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Our Impact
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
            See how SerenitySphere is making a difference in people's lives.
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
              >
                <div className="flex items-center justify-center">
                  <BarChart className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">{stat.label}</h3>
                <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.value}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full ${stat.color}`}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{stat.value}%</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Cards */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Why Choose SerenitySphere?
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
            Discover the unique features that set us apart.
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'AI-Powered Insights', description: 'Get personalized recommendations based on your data.' },
              { icon: Heart, title: 'Emotional Tracking', description: 'Track your mood and emotions with intuitive tools.' },
              { icon: Shield, title: 'Privacy First', description: 'Your data is encrypted and secure at all times.' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Accordion FAQ Section */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
            Find answers to common questions about SerenitySphere.
          </p>
          <div className="mt-10 space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-4 flex items-center justify-between text-left text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  <span className="text-lg font-medium">{faq.question}</span>
                  {expandedIndex === index ? (
                    <ChevronUp className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  )}
                </button>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="p-4 pt-0 text-gray-500 dark:text-gray-400"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};