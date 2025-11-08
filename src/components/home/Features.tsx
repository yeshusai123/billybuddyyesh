import React from 'react';
import { Shield, Brain, Lock, Users, Zap, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Advanced machine learning algorithms detect and prevent cyberbullying in real-time.'
  },
  {
    icon: Shield,
    title: 'Proactive Protection',
    description: 'Continuous monitoring and early warning system to identify potential threats.'
  },
  {
    icon: Lock,
    title: 'Secure Reporting',
    description: 'Anonymous and encrypted reporting system to ensure user privacy and safety.'
  },
  {
    icon: Users,
    title: 'Community Support',
    description: 'Connect with others and share experiences in a moderated, safe environment.'
  },
  {
    icon: Zap,
    title: 'Instant Response',
    description: '24/7 automated support with immediate assistance and guidance.'
  },
  {
    icon: Bell,
    title: 'Smart Alerts',
    description: 'Customizable notification system for potential cyberbullying incidents.'
  }
];

const Features = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900">
          AI-Powered Protection
        </h2>
        <p className="mt-4 text-xl text-gray-600">
          Cutting-edge technology working to keep you safe
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-indigo-50 hover:border-indigo-200 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mb-6">
              <feature.icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Features;