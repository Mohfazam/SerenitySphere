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
    <section id="how-it-works" className="relative py-20 bg-gray-900 overflow-hidden">
      {/* Parallax Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: {
              color: {
                value: "#0f172a", // Darker background
              },
            },
            particles: {
              number: {
                value: 80,
              },
              move: {
                enable: true,
                speed: 3,
              },
              opacity: {
                value: 0.7,
              },
              size: {
                value: 4,
              },
              color: {
                value: "#3b82f6", // Blue particles
              },
              shape: {
                type: "circle",
              },
              links: {
                enable: true,
                distance: 150,
                color: "#3b82f6",
                opacity: 0.5,
                width: 1,
              },
            },
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading Section */}
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-base text-blue-500 font-semibold tracking-wide uppercase"
          >
            How It Works
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-2 text-4xl font-extrabold text-white sm:text-5xl"
          >
            Your Journey to Better Mental Health
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-4 max-w-2xl text-xl text-gray-400 mx-auto"
          >
            Follow these simple steps to start your path towards improved well-being with SerenitySphere.
          </motion.p>
        </div>

        {/* Steps Section */}
        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group p-8 bg-gray-800 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform-gpu"
              >
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                  <step.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-white text-center mb-4">{step.title}</h3>
                <p className="text-lg text-gray-400 text-center">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};