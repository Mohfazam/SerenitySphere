import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Brain, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const navbarHeight = useTransform(scrollY, [0, 100], [80, 60]);
  const navbarOpacity = useTransform(scrollY, [0, 100], [1, 0.9]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (path) => {
    console.log(`Navigating to: ${path}`);
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
            <motion.a
              href="#"
              className="flex-shrink-0 flex items-center"
              onClick={() => handleNavigation('/')}
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
            </motion.a>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {/* Home Button */}
              <motion.a
                href="#home"
                onClick={() => handleNavigation('/home')}
                className="relative px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400"
                whileHover={{ scale: 1.05 }}
              >
                Home
              </motion.a>

              {/* Work Button */}
              <motion.a
                href="#work"
                onClick={() => handleNavigation('/work')}
                className="relative px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400"
                whileHover={{ scale: 1.05 }}
              >
                Work
              </motion.a>

              {/* Awards Button */}
              <motion.a
                href="#awards"
                onClick={() => handleNavigation('/awards')}
                className="relative px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400"
                whileHover={{ scale: 1.05 }}
              >
                Awards
              </motion.a>

              {/* Team Button */}
              <motion.a
                href="#team"
                onClick={() => handleNavigation('/team')}
                className="relative px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400"
                whileHover={{ scale: 1.05 }}
              >
                Team
              </motion.a>

              {/* Prices Button */}
              <motion.a
                href="#prices"
                onClick={() => handleNavigation('/prices')}
                className="relative px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400"
                whileHover={{ scale: 1.05 }}
              >
                Prices
              </motion.a>

              {/* Contact Button */}
              <motion.a
                href="#contact"
                onClick={() => handleNavigation('/contact')}
                className="relative px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400"
                whileHover={{ scale: 1.05 }}
              >
                Contact
              </motion.a>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMobileMenu}
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
              {/* Home Button */}
              <motion.a
                href="#home"
                onClick={() => handleNavigation('/home')}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
              >
                Home
              </motion.a>

              {/* Work Button */}
              <motion.a
                href="#work"
                onClick={() => handleNavigation('/work')}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
              >
                Work
              </motion.a>

              {/* Awards Button */}
              <motion.a
                href="#awards"
                onClick={() => handleNavigation('/awards')}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
              >
                Awards
              </motion.a>

              {/* Team Button */}
              <motion.a
                href="#team"
                onClick={() => handleNavigation('/team')}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
              >
                Team
              </motion.a>

              {/* Prices Button */}
              <motion.a
                href="#prices"
                onClick={() => handleNavigation('/prices')}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
              >
                Prices
              </motion.a>

              {/* Contact Button */}
              <motion.a
                href="#contact"
                onClick={() => handleNavigation('/contact')}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
              >
                Contact
              </motion.a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};