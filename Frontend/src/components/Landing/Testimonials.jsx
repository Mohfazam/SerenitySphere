import React from 'react';
import { motion } from 'framer-motion';
import { User, Settings, BookOpen } from 'lucide-react';

export const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Manager',
      content: 'SerenitySphere has been a game-changer for my mental health. The personalized insights and community support are invaluable.',
      icon: User,
    },
    {
      name: 'Michael Chen',
      role: 'Software Engineer',
      content: 'As someone who struggles with anxiety, this app has been a lifesaver. The AI-powered recommendations are spot-on.',
      icon: Settings,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Teacher',
      content: 'I love how easy it is to track my mood and see patterns over time. SerenitySphere has helped me become more self-aware.',
      icon: BookOpen,
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            What Our Users Say
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
            Hear from people who have transformed their lives with SerenitySphere.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <testimonial.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-4">{testimonial.content}</p>
              <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};