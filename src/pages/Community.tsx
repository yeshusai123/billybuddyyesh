import React from 'react';
import ProfileGrid from '../components/community/ProfileGrid';
import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';

const Community = () => {
  return (
    <div className="min-h-screen py-12">
      <motion.div 
        {...fadeInUp} 
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-bold text-white mb-4">
          Our Community Leaders
        </h1>
        <p className="text-indigo-200 max-w-2xl mx-auto">
          Meet our dedicated team of experts working tirelessly to create a safer digital environment
        </p>
      </motion.div>
      <ProfileGrid />
    </div>
  );
};

export default Community;