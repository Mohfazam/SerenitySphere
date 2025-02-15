import React from 'react';
import { motion } from 'framer-motion';
import { User, Linkedin, Twitter } from 'lucide-react';

export const Team = () => {
  const teamMembers = [
    {
      name: 'John Doe',
      role: 'CEO & Founder',
      bio: 'Passionate about mental health and technology.',
      social: { linkedin: '#', twitter: '#' },
      icon: User,
    },
    {
      name: 'Jane Smith',
      role: 'Lead Therapist',
      bio: 'Dedicated to helping people achieve mental well-being.',
      social: { linkedin: '#', twitter: '#' },
      icon: User,
    },
    {
      name: 'Alex Johnson',
      role: 'Product Designer',
      bio: 'Creating intuitive and user-friendly experiences.',
      social: { linkedin: '#', twitter: '#' },
      icon: User,
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Meet the Team
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
            The passionate people behind SerenitySphere.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center">
                <member.icon className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">{member.role}</p>
              <p className="mt-4 text-gray-500 dark:text-gray-400">{member.bio}</p>
              <div className="mt-4 flex space-x-4">
                <a href={member.social.linkedin} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href={member.social.twitter} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};