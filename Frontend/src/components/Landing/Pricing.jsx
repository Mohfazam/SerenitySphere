import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Shield, Gem, Crown } from 'lucide-react';

export const Pricing = () => {
  const [hoveredPlan, setHoveredPlan] = useState(null);

  const plans = [
    {
      name: 'Essential',
      price: '₹0',
      period: 'per month',
      description: 'Perfect for individuals and small teams',
      features: [
        'All Essential Features',
        'Basic Analytics Dashboard',
        'Email Support',
        'Up to 5 Team Members',
        'Basic Integrations'
      ],
      icon: Shield,
      color: 'from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900',
      accent: 'border-slate-200 dark:border-slate-700'
    },
    {
      name: 'Professional',
      price: '₹99',
      period: 'per month',
      description: 'Ideal for growing businesses',
      features: [
        'Everything in Essential',
        'Advanced Analytics',
        'Priority Support',
        'Up to 20 Team Members',
        'Advanced Integrations'
      ],
      icon: Gem,
      color: 'from-white to-blue-50 dark:from-slate-900 dark:to-blue-900/20',
      accent: 'border-blue-100 dark:border-blue-800',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '₹149',
      period: 'per month',
      description: 'For large-scale organizations',
      features: [
        'Everything in Professional',
        'Custom Analytics',
        'Dedicated Support',
        'Unlimited Team Members',
        'Custom Integrations'
      ],
      icon: Crown,
      color: 'from-white to-purple-50 dark:from-slate-900 dark:to-purple-900/20',
      accent: 'border-purple-100 dark:border-purple-800'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-semibold text-slate-900 dark:text-white mb-4"
          >
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400"
          >
            Choose the perfect plan for your business needs
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              onHoverStart={() => setHoveredPlan(index)}
              onHoverEnd={() => setHoveredPlan(null)}
              className={`relative rounded-2xl overflow-hidden bg-gradient-to-b ${plan.color} border-2 ${plan.accent}`}
              style={{
                boxShadow: hoveredPlan === index ? '0 8px 30px rgba(0, 0, 0, 0.12)' : '0 4px 6px rgba(0, 0, 0, 0.05)'
              }}
            >
              {plan.popular && (
                <div className="absolute top-6 right-6">
                  <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <div className="flex items-center mb-6">
                  <plan.icon className={`w-8 h-8 ${plan.popular ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}`} />
                  <h3 className="ml-3 text-xl font-semibold text-slate-900 dark:text-white">
                    {plan.name}
                  </h3>
                </div>

                <p className="text-slate-600 dark:text-slate-400 mb-6 min-h-[48px]">
                  {plan.description}
                </p>

                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="ml-2 text-slate-600 dark:text-slate-400">
                    {plan.period}
                  </span>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      variants={featureVariants}
                      className="flex items-center text-slate-700 dark:text-slate-300"
                    >
                      <Check className="w-5 h-5 mr-3 text-blue-600 dark:text-blue-400" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-6 rounded-lg text-center font-medium transition-colors
                    ${plan.popular 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-slate-800 dark:bg-white hover:bg-slate-900 dark:hover:bg-slate-100 text-white dark:text-slate-900'}`}
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center text-sm text-slate-600 dark:text-slate-400"
        >
          All plans include 30-day money-back guarantee and 24/7 customer support
        </motion.div>
      </div>
    </div>
  );
};