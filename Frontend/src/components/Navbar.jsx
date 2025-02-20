import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Brain, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const navbarHeight = useTransform(scrollY, [0, 100], [80, 60]);
  const navbarOpacity = useTransform(scrollY, [0, 100], [1, 0.9]);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      style={{ height: navbarHeight, opacity: navbarOpacity }}
      className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <motion.button
              onClick={() => handleNavigation('/')}
              className="flex-shrink-0 flex items-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 1 }}
              >
                <Brain className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </motion.div>
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                SerenitySphere
              </span>
            </motion.button>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <motion.button
                onClick={() => handleNavigation('/')}
                className="relative px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400"
                whileHover={{ scale: 1.05 }}
              >
                Home
              </motion.button>

              <motion.button
                onClick={() => handleNavigation('/tracker')}
                className="relative px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400"
                whileHover={{ scale: 1.05 }}
              >
                MoodSphere
              </motion.button>

              <motion.button
                onClick={() => handleNavigation('/journaling')}
                className="relative px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400"
                whileHover={{ scale: 1.05 }}
              >
                Journaling
              </motion.button>

              <motion.button
                onClick={() => handleNavigation('/DNA')}
                className="relative px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400"
                whileHover={{ scale: 1.05 }}
              >
                DNA
              </motion.button>

              <motion.button
                onClick={() => handleNavigation('/contact')}
                className="relative px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400"
                whileHover={{ scale: 1.05 }}
              >
                Contact
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md text-gray-700 dark:text-gray-300 transition-colors duration-200 md:hidden"
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4"
          >
            <div className="flex flex-col space-y-2">
              <motion.button
                onClick={() => handleNavigation('/')}
                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
              >
                Home
              </motion.button>

              <motion.button
                onClick={() => handleNavigation('/tracker')}
                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
              >
                MoodSphere
              </motion.button>

              <motion.button
                onClick={() => handleNavigation('/journaling')}
                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
              >
                Journaling
              </motion.button>

              <motion.button
                onClick={() => handleNavigation('/DNA')}
                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
              >
                DNA
              </motion.button>

              <motion.button
                onClick={() => handleNavigation('/contact')}
                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
              >
                Contact
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};