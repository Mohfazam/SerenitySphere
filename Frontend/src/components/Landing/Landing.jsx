import React, { useState, useEffect } from 'react';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { Hero } from './Hero';
import { Features } from './Features';
import { HowItWorks } from './HowItWorks';
import { Testimonials } from './Testimonials';
import { Statistics } from './Statistics';
import { Pricing } from './Pricing';
import { BlogHighlights } from './BlogHighlights';
import { Team } from './Team';
import {MoodGarden} from './MoodGarden'
// import { Download } from './Download';
// import { Newsletter } from './Newsletter';
// import { Partners } from './Partners';
// import { GlobeSection } from './GlobeSection';
import { InteractiveStats } from './InteractiveStats'; // Import the new component

export const Landing = () => {
  const [darkMode, setDarkMode] = useState(false);

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
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Statistics />
      <InteractiveStats /> {/* Add the new component here */}
      <Pricing />
      <BlogHighlights />
      <MoodGarden />
      <Team />
      {/* <Download /> */}
      {/* <Newsletter /> */}
      {/* <Partners /> */}
      <Footer />
    </div>
  );
};