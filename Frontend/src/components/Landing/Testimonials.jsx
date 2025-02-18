import React from 'react';
import { motion } from 'framer-motion';
import { User, Settings, BookOpen, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Aisha Malik',
    role: 'Freelance Designer',
    content: `"SerenitySphere's mood tracking has helped me manage burnout during tight deadlines. The community support is a lifesaver!"`,
    rating: 5,
    icon: User,
  },
  {
    name: 'Carlos Rivera',
    role: 'Product Manager',
    content: `"The AI recommendations helped me identify stress triggers I never noticed. Life-changing!"`,
    rating: 4.5,
    icon: Settings,
  },
  {
    name: 'Priya Kapoor',
    role: 'Clinical Psychologist',
    content: `"I recommend SerenitySphere to my patients. The data visualization helps them understand their mental health patterns."`,
    rating: 4.8,
    icon: BookOpen,
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Real Stories, Real Impact
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
            See how SerenitySphere is helping people just like you
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                  <testimonial.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <blockquote className="text-gray-700 dark:text-gray-300">
                {testimonial.content}
              </blockquote>
              <div className="mt-4 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      testimonial.rating > i ? 'text-yellow-500' : 'text-gray-400'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};