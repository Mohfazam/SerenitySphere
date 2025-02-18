import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import { User, Settings, BookOpen, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Aisha Malik',
    role: 'Freelance Designer',
    content: `"SerenitySphere's mood tracking has helped me manage burnout during tight deadlines. The community support is a lifesaver!"`,
    moodData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [{
        label: 'Mood Score',
        data: [30, 45, 60, 75, 90],
        borderColor: '#34d399',
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8
      }]
    },
    rating: 5,
    icon: User,
  },
  {
    name: 'Carlos Rivera',
    role: 'Product Manager',
    content: `"The AI recommendations helped me identify stress triggers I never noticed. Life-changing!"`,
    moodData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [{
        label: 'Mood Score',
        data: [25, 35, 55, 70, 85],
        borderColor: '#f59e0b',
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8
      }]
    },
    rating: 4.5,
    icon: Settings,
  },
  {
    name: 'Priya Kapoor',
    role: 'Clinical Psychologist',
    content: `"I recommend SerenitySphere to my patients. The data visualization helps them understand their mental health patterns."`,
    moodData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [{
        label: 'Mood Score',
        data: [40, 50, 65, 80, 95],
        borderColor: '#60a5fa',
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8
      }]
    },
    rating: 4.8,
    icon: BookOpen,
  },
];

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95 }
};

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-gradient-to-br from-blue-50 to-indigo-100 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            Transforming Lives
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-400 mx-auto">
            See how SerenitySphere has made a difference
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              exit="exit"
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-shadow"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                  <testimonial.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-xl shadow-md p-4 bg-gray-50 dark:bg-gray-900">
                <Line
                  data={testimonial.moodData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      tooltip: { enabled: false }
                    },
                    scales: {
                      x: {
                        display: false,
                        grid: { display: false }
                      },
                      y: {
                        display: false,
                        grid: { display: false }
                      }
                    },
                    elements: {
                      line: {
                        tension: 0.4,
                        borderColor: 'rgba(52, 211, 199, 1)'
                      },
                      point: {
                        radius: 5,
                        hoverRadius: 8
                      }
                    }
                  }}
                />
              </div>
              <div className="mt-6">
                <blockquote className="text-gray-700 dark:text-gray-300">
                  {testimonial.content}
                </blockquote>
                <div className="mt-4 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        testimonial.rating > i ? 'text-yellow-500' : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};