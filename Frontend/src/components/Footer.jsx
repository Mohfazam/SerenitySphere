import { motion } from 'framer-motion';
import { 
  BrainCircuit,
  LineChart,
  CalendarCheck,
  BookOpenCheck,
  Dna,
  ArrowUpRight,
  Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { useCallback } from 'react';

export const Footer = () => {
  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);

  const features = [
    {
      icon: BrainCircuit,
      title: "Cognitive Analysis",
      route: "/ai",
      description: "Neural pattern recognition system"
    },
    {
      icon: LineChart,
      title: "Behavior Insights",
      route: "/analytics",
      description: "Predictive mood tracking"
    },
    {
      icon: CalendarCheck,
      title: "Habit Optimization",
      route: "/habits",
      description: "Performance-driven routines"
    },
    {
      icon: BookOpenCheck,
      title: "Mind Journal",
      route: "/journal",
      description: "Structured reflection system"
    },
    {
      icon: Dna,
      title: "Biometric Sync",
      route: "/dna",
      description: "Genomic integration platform"
    }
  ];

  return (
    <footer className="relative bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <Particles
        init={particlesInit}
        className="absolute inset-0 opacity-10 dark:opacity-20"
        options={{
          particles: {
            number: { value: 40 },
            color: { value: '#3B82F6' },
            size: { value: 1 },
            move: { speed: 0.5 }
          }
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-20">
          {features.map(({ icon: Icon, title, route, description }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              viewport={{ once: true, margin: "-30px" }}
            >
              <Link
                to={route}
                className="group block h-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4 w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/50 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {description}
                  </p>
                  <div className="mt-auto flex justify-end">
                    <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          className="my-12 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"
        />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex items-center space-x-3">
            <BrainCircuit className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-semibold text-gray-900 dark:text-white">
              NeuroSync
            </span>
          </div>
          
          <div className="flex items-center space-x-6">
            <motion.a
              href="#"
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              whileHover={{ y: -1 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              whileHover={{ y: -1 }}
            >
              Terms of Service
            </motion.a>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Built with purpose</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};