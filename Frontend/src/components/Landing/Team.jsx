import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { User, Linkedin, Twitter } from 'lucide-react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

export const Team = () => {
  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);

  const teamMembers = [
    {
      name: 'Mohammad Sarwar Khan',
      role: 'Team Lead',
      bio: "Building dreams with the MERN stack's might, crafting apps that shine so bright. A 4th-sem intern on a soaring flight, coding stories deep into the night.",
      social: { linkedin: 'https://www.linkedin.com/in/mohammed-sarwar-khan', twitter: 'https://x.com/mohfazam' }
    },
    {
      name: 'Md Mubashiruddin',
      role: 'Lead Developer',
      bio: 'MERN Stack Developer building scalable full-stack solutions. Passionate about web development, problem-solving, and creating impactful projects.',
      social: { linkedin: 'https://www.linkedin.com/in/md-mubashiruddin', twitter: 'https://x.com/amaanx_6' }
    },
    {
      name: 'Kafia Kauser',
      role: 'Research & Presenter',
      bio: 'A tech enthusiast exploring AI, web development, and innovation through hackathons, writing, and projects.',
      social: { linkedin: 'https://www.linkedin.com/in/kafia-kauser-019647294', twitter: 'https://x.com/KauserKafia' }
    },
    {
      name: 'Madiyah Numa',
      role: 'QA Tester',
      bio: 'QA tester ensuring quality digital experiences. Passionate about UI/UX, graphic design, and web development, combining creativity with technical skills.',
      social: { linkedin: 'https://www.linkedin.com/in/madiyah-numa-2903aa2a6/', twitter: 'https://x.com/mnuma0_0' }
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }
    })
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-900">
      <div className="absolute inset-0 w-full h-full">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            fullScreen: {
              enable: false,
              zIndex: 0
            },
            particles: {
              number: { value: 80, density: { enable: true, value_area: 800 } },
              color: { value: "#ffffff" },
              opacity: { value: 0.1 },
              size: { value: 2 },
              move: {
                enable: true,
                speed: 0.5,
                direction: "none",
                random: true,
                straight: false,
                outModes: { default: "out" }
              },
              links: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.05,
                width: 1
              },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: "grab" },
                onClick: { enable: true, mode: "push" }
              },
              modes: {
                grab: { distance: 140, links: { opacity: 0.2 } }
              }
            }
          }}
          className="w-full h-full"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            The passionate people behind our success
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="relative group"
            >
              <div className="relative h-full bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl transition-all duration-300 hover:border-blue-500/50 hover:shadow-blue-500/5">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden bg-gray-700 border-2 border-gray-600 group-hover:border-blue-500/50 transition-colors duration-300 flex items-center justify-center"
                  >
                    <User className="w-12 h-12 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-blue-400 font-medium mb-4 text-sm uppercase tracking-wider">
                    {member.role}
                  </p>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-4 group-hover:text-gray-300 transition-colors duration-300">
                    {member.bio}
                  </p>

                  <div className="flex justify-center space-x-4">
                    <motion.a
                      whileHover={{ scale: 1.1, y: -2 }}
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                    >
                      <Linkedin className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1, y: -2 }}
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                    >
                      <Twitter className="w-5 h-5" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;