import { motion } from 'framer-motion';
import { 
  BrainCircuit,
  LineChart,
  CalendarCheck,
  BookOpen,
  Dna,
  ArrowRight,
  HeartPulse
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
      title: "Neuro Assistant",
      route: "/ai-assistant",
      desc: "24/7 AI Mental Health Companion",
      color: "from-purple-500 to-indigo-500"
    },
    { 
      icon: LineChart,
      title: "Mind Analytics",
      route: "/insights",
      desc: "Personalized Mood Patterns",
      color: "from-cyan-500 to-blue-500"
    },
    { 
      icon: CalendarCheck,
      title: "Habit Architect",
      route: "/habits",
      desc: "Behavior Transformation System",
      color: "from-emerald-500 to-teal-500"
    },
    { 
      icon: BookOpen,
      title: "Thought Journal",
      route: "/journal",
      desc: "Cognitive Reflection Space",
      color: "from-rose-500 to-pink-500"
    },
    { 
      icon: Dna,
      title: "Bio Insights",
      route: "/dna",
      desc: "Genetic Wellness Analysis",
      color: "from-amber-500 to-orange-500"
    }
  ];

  return (
    <footer className="relative isolate overflow-hidden bg-gradient-to-b from-gray-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      {/* Animated particle layer */}
      <Particles
        id="footer-particles"
        init={particlesInit}
        className="absolute inset-0 z-0 opacity-20 dark:opacity-40"
        options={{
          particles: {
            number: { value: 80 },
            color: { value: ['#6366f1', '#06b6d4', '#10b981', '#f43f5e', '#f59e0b'] },
            opacity: { value: 0.5 },
            size: { value: { min: 0.5, max: 1.5 } },
            move: {
              enable: true,
              speed: 0.6,
              direction: 'none',
              random: true,
              straight: false,
              outModes: 'out'
            },
            links: {
              enable: true,
              distance: 120,
              color: '#64748b',
              opacity: 0.3,
              width: 1
            }
          }
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Feature Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-20"
        >
          {features.map(({ icon: Icon, title, route, desc, color }, index) => (
            <motion.div
              key={title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Link
                to={route}
                className="group block h-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-transparent shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative p-6 h-full flex flex-col">
                  {/* Gradient Border Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  {/* Icon Container */}
                  <div className={`mb-4 w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {desc}
                  </p>
                  
                  {/* Animated Arrow */}
                  <div className="mt-auto">
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors ml-auto" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Bottom */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="border-t border-gray-200 dark:border-gray-700 pt-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Branding */}
            <div className="flex items-center space-x-3">
              <HeartPulse className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                MindForge
              </span>
            </div>

            {/* Legal */}
            <div className="flex items-center space-x-8">
              <motion.a
                href="#"
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                whileHover={{ y: -2 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#"
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                whileHover={{ y: -2 }}
              >
                Terms of Service
              </motion.a>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <HeartPulse className="w-4 h-4 text-rose-500" />
                <span>Built for Humanity</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};