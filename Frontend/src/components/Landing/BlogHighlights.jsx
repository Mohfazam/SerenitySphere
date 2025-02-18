import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export const BlogHighlights = () => {
  const posts = [
    {
      title: '5 Tips for Better Mental Health',
      description: 'Learn how to improve your mental well-being with these simple tips.',
      icon: BookOpen,
    },
    {
      title: 'The Science of Mindfulness',
      description: 'Discover the benefits of mindfulness and how it can transform your life.',
      icon: BookOpen,
    },
    {
      title: 'Building a Supportive Community',
      description: 'Find out how community support can help you on your mental health journey.',
      icon: BookOpen,
    },
  ];

  return (
    <section className="py-10 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Blog Highlights
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
            Explore our latest blog posts on mental health and well-being.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center">
                <post.icon className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">{post.title}</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">{post.description}</p>
              <button className="mt-4 text-blue-600 dark:text-blue-400 hover:underline">
                Read More
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};