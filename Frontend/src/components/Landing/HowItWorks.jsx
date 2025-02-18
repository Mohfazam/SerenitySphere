import React from 'react';
import { motion } from 'framer-motion';
import { Download, Smile, Zap, Award } from 'lucide-react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

export const HowItWorks = () => {
  const steps = [
    { icon: Download, title: 'Download the App', description: 'Get started by downloading the SerenitySphere app on your mobile device.' },
    { icon: Smile, title: 'Create Your Profile', description: 'Set up your personalized profile and preferences for a tailored experience.' },
    { icon: Zap, title: 'Track Your Progress', description: 'Log your daily mood and activities to gain insights into your mental well-being.' },
    { icon: Award, title: 'Achieve Your Goals', description: 'Set and accomplish mental health goals with the support of our AI-powered system.' },
  ];

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <section id="how-it-works" className="relative py-20 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Parallax Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: {
              color: {
                value: "#1f2937", // Dark mode background
              },
            },
            particles: {
              number: {
                value: 50,
              },
              move: {
                enable: true,
                speed: 2,
              },
              opacity: {
                value: 0.5,
              },
              size: {
                value: 3,
              },
              color: {
                value: "#3b82f6", // Blue particles
              },
            },
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">How It Works</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Your Journey to Better Mental Health
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
            Follow these simple steps to start your path towards improved well-being with SerenitySphere.
          </p>
        </div>
        <div className="mt-20">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex items-start p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform-gpu"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                    <step.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">{step.title}</h4>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};