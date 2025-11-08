import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../../utils/animations';
import { buttonStyles } from '../../../styles/buttons';

const HeroAction = () => (
  <motion.div
    {...fadeInUp}
    transition={{ delay: 0.7 }}
    className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-8"
  >
    <Link
      to="/chat"
      className={buttonStyles.heroAction}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-indigo-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <Shield className="w-5 h-5 mr-2 text-indigo-600 group-hover:animate-pulse relative z-10" />
      <span className="relative z-10">Get Protected Now</span>
    </Link>
  </motion.div>
);

export default HeroAction;