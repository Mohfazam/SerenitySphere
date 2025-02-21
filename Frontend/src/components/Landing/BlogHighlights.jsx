import React, { useCallback, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Brain, Heart, Users, ArrowRight } from 'lucide-react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export const BlogHighlights = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const [isHovered, setIsHovered] = useState(null);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const posts = [
    {
      title: 'The Science of Mental Wellness',
      description: 'Explore cutting-edge research on brain plasticity and emotional intelligence.',
      icon: Brain,
      readTime: '8 min read',
      category: 'Science'
    },
    {
      title: 'Building Emotional Resilience',
      description: 'Learn powerful techniques to strengthen your emotional foundation.',
      icon: Heart,
      readTime: '6 min read',
      category: 'Self-Development'
    },
    {
      title: 'Community & Mental Health',
      description: 'Discover how social connections impact psychological well-being.',
      icon: Users,
      readTime: '5 min read',
      category: 'Community'
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#0A0F1C] overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            opacity: 0
          },
          fpsLimit: 120,
          particles: {
            color: {
              value: ["#FF3F8E", "#4169E1", "#8A2BE2"]
            },
            links: {
              enable: true,
              color: "#ffffff",
              distance: 150,
              opacity: 0.1,
              width: 1
            },
            move: {
              enable: true,
              speed: 0.5,
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "bounce"
              }
            },
            number: {
              value: 30,
              density: {
                enable: true,
                value_area: 800
              }
            },
            opacity: {
              value: 0.15,
              random: true
            },
            shape: {
              type: "circle"
            },
            size: {
              value: 3,
              random: true
            }
          }
        }}
      />

      <motion.div 
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="absolute -inset-1 rounded-lg bg-gradient-to-r from-[#FF3F8E] via-[#4169E1] to-[#8A2BE2] opacity-75 blur-lg"
                animate={{
                  scale: [1, 1.02, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.h2 
                className="relative text-6xl font-bold bg-gradient-to-r from-[#c9bfc3] via-[#e5e8ef] to-[#e1d9e8] bg-clip-text text-transparent px-4 py-2"
              >
                Featured Insights
              </motion.h2>
            </motion.div>
          </div>
          <motion.p 
            className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Dive into our carefully curated collection of mental health articles, backed by research and expert insights.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              onHoverStart={() => setIsHovered(index)}
              onHoverEnd={() => setIsHovered(null)}
              className="relative group cursor-pointer"
            >
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-r from-[#FF3F8E] via-[#4169E1] to-[#8A2BE2] rounded-2xl opacity-50 group-hover:opacity-70 blur transition-all duration-500"
                animate={{
                  scale: isHovered === index ? 1.02 : 1,
                  rotate: isHovered === index ? 1 : 0
                }}
              />
              <div className="relative bg-[#0F1729] rounded-xl p-1">
                <div className="relative bg-[#0A0F1C] rounded-lg p-8 h-full backdrop-blur-sm">
                  <motion.div 
                    className="flex items-center justify-between mb-8"
                    animate={{
                      y: isHovered === index ? 0 : 5,
                      opacity: isHovered === index ? 1 : 0.8
                    }}
                  >
                    <span className="px-4 py-1.5 bg-[#1A2333] rounded-full text-sm font-medium text-[#4169E1] ring-1 ring-[#4169E1]/20">
                      {post.category}
                    </span>
                    <span className="text-gray-400 text-sm font-light">{post.readTime}</span>
                  </motion.div>

                  <motion.div
                    animate={{
                      y: isHovered === index ? 0 : 5,
                      opacity: isHovered === index ? 1 : 0.8
                    }}
                    className="relative"
                  >
                    <div className="absolute -left-1 -top-1 w-12 h-12 bg-gradient-to-r from-[#FF3F8E] via-[#4169E1] to-[#8A2BE2] rounded-lg opacity-20 blur" />
                    <post.icon className={`relative w-10 h-10 ${
                      isHovered === index 
                        ? 'text-[#4169E1]' 
                        : 'text-gray-400'
                    } transition-colors duration-300`} />
                    
                    <h3 className="mt-8 text-2xl font-bold text-white group-hover:text-[#4169E1] transition-colors duration-300 leading-tight">
                      {post.title}
                    </h3>
                    
                    <p className="mt-4 text-gray-400 font-light leading-relaxed">
                      {post.description}
                    </p>

                    <motion.button
                      className="mt-8 flex items-center text-[#4169E1] group/btn"
                      whileHover={{ x: 5 }}
                    >
                      <span className="font-medium group-hover/btn:text-white transition-colors duration-300">
                        Read Article
                      </span>
                      <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

