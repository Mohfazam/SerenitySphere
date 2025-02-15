import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ChevronDown, ChevronUp, BarChart, Zap, Heart, Shield, Smile, Star, Users, Lock, Activity, Brain, Leaf, Users2, Calendar, MessageCircle } from 'lucide-react';

export const Features = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const controls = useAnimation();

  const toggleAccordion = async (index) => {
    if (expandedIndex === index) {
      await controls.start({ opacity: 0, height: 0 });
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
      await controls.start({ opacity: 1, height: 'auto' });
    }
  };

  const stats = [
    { label: 'Users Helped', value: 95, color: 'bg-blue-500', icon: Users },
    { label: 'Positive Feedback', value: 90, color: 'bg-green-500', icon: Smile },
    { label: 'Community Growth', value: 85, color: 'bg-purple-500', icon: Star },
  ];

  const features = [
    { icon: Zap, title: 'AI-Powered Insights', description: 'Get personalized recommendations based on your data.' },
    { icon: Heart, title: 'Emotional Tracking', description: 'Track your mood and emotions with intuitive tools.' },
    { icon: Shield, title: 'Privacy First', description: 'Your data is encrypted and secure at all times.' },
    { icon: Lock, title: 'Secure & Private', description: 'We prioritize your privacy with top-notch security.' },
    { icon: Activity, title: 'Stress Management', description: 'Learn techniques to manage stress and improve focus.' },
    { icon: Brain, title: 'Mindfulness Practices', description: 'Discover mindfulness exercises to stay present and calm.' },
    { icon: Leaf, title: 'Therapy Options', description: 'Access professional therapy sessions tailored to your needs.' },
    { icon: Users2, title: 'Community Support', description: 'Connect with others who understand your journey.' },
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
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: window.innerHeight + 100 }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'linear',
            }}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Animated Stats Section */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl font-extrabold text-white sm:text-4xl"
          >
            Our Impact
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 max-w-2xl text-xl text-gray-400 mx-auto"
          >
            See how SerenitySphere is making a difference in people's lives.
          </motion.p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{stat.label}</h3>
                <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stat.value}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                    className={`h-full ${stat.color}`}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-400">{stat.value}%</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Features Section */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl font-extrabold text-white sm:text-4xl"
          >
            Why Choose SerenitySphere?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 max-w-2xl text-xl text-gray-400 mx-auto"
          >
            Discover the unique features that set us apart.
          </motion.p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Mental Health Cards */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl font-extrabold text-white sm:text-4xl"
          >
            Explore Mental Health Resources
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 max-w-2xl text-xl text-gray-400 mx-auto"
          >
            Tools and resources to support your mental well-being.
          </motion.p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Calendar, title: 'Daily Check-Ins', description: 'Track your mood and set daily goals.' },
              { icon: MessageCircle, title: 'Therapist Chat', description: 'Connect with licensed therapists anytime.' },
              { icon: Leaf, title: 'Mindfulness Exercises', description: 'Practice mindfulness to reduce stress.' },
              { icon: Users2, title: 'Support Groups', description: 'Join communities for shared experiences.' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Accordion FAQ Section */}
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl font-extrabold text-white sm:text-4xl"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 max-w-2xl text-xl text-gray-400 mx-auto"
          >
            Find answers to common questions about SerenitySphere.
          </motion.p>
          <div className="mt-10 space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-lg shadow-lg"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-4 flex items-center justify-between text-left text-white hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  <span className="text-lg font-medium">{faq.question}</span>
                  {expandedIndex === index ? (
                    <ChevronUp className="w-6 h-6 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </button>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="p-4 pt-0 text-gray-400"
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