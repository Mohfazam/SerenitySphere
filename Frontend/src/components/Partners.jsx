import React from 'react';
import { motion } from 'framer-motion';

export const Partners = () => {
  const partners = [
    { logo: '/partner1.svg', alt: 'Partner 1' },
    { logo: '/partner2.svg', alt: 'Partner 2' },
    { logo: '/partner3.svg', alt: 'Partner 3' },
    { logo: '/partner4.svg', alt: 'Partner 4' },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Trusted By
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
            Join the growing community of SerenitySphere users.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img src={partner.logo} alt={partner.alt} className="h-12" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};