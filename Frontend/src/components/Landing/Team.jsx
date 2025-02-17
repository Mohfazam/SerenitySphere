import React from 'react';
import { motion } from 'framer-motion';
import { User, Linkedin, Twitter } from 'lucide-react';

export const Team = () => {
  const teamMembers = [
    {
      name: 'Mohammad Sarwar Khan',
      role: 'Team Lead',
      bio: "Building dreams with the MERN stack's might, crafting apps that shine so bright. A 4th-sem intern on a soaring flight, coding stories deep into the night.",
      social: { linkedin: 'https://www.linkedin.com/in/mohammed-sarwar-khan', twitter: 'https://x.com/mohfazam' },
      icon: User,
    },
    {
      name: 'Md Mubashiruddin',
      role: 'Lead Developer',
      bio: 'MERN Stack Developer building scalable full-stack solutions. Passionate about web development, problem-solving, and creating impactful projects.',
      social: { linkedin: 'https://www.linkedin.com/in/md-mubashiruddin', twitter: 'https://x.com/amaanx_6' },
      icon: User,
    },
    {
      name: 'Kafia Kauser',
      role: 'Research & Presenter',
      bio: 'Kafia Kauser is a tech enthusiast exploring AI, web development, and innovation through hackathons, writing, and projects.',
      social: { linkedin: 'https://www.linkedin.com/in/kafia-kauser-019647294', twitter: 'https://x.com/KauserKafia' },
      icon: User,
    },
    {
      name: 'Syed Ahmed',
      role: 'QA Tester',
      bio: 'QA Tester focused on ensuring smooth performance, reliability, and a great user experience.',
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
        <div className="mt-10 grid grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center" // Added flex and text-center
            >
              <div className="flex items-center justify-center">
                <member.icon className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">{member.role}</p>
              <p className="mt-4 text-gray-500 dark:text-gray-400">{member.bio}</p>
              <div className="mt-4 flex space-x-4 justify-center"> {/* Added justify-center */}
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