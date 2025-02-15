import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { InteractiveFeatures } from './InteractiveFeatures';
import { HowItWorks } from './HowItWorks';
import { Testimonials } from './Testimonials';
import { Statistics } from './Statistics'; // New component
import { Pricing } from './Pricing'; // New component
import { BlogHighlights } from './BlogHighlights'; // New component
import { Team } from './Team'; // New component
import { Download } from './Download'; // New component
import { Newsletter } from './Newsletter'; // New component
import { Partners } from './Partners'; // New component

export const Landing = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Navbar */}
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <InteractiveFeatures />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Statistics Section */}
      <Statistics />

      {/* Pricing Section */}
      <Pricing />

      {/* Blog Highlights Section */}
      <BlogHighlights />

      {/* Team Section */}
      <Team />

      {/* Download Section */}
      <Download />

      {/* Newsletter Section */}
      <Newsletter />

      {/* Partners Section */}
      <Partners />

      {/* Footer */}
      <Footer />
    </div>
  );
};