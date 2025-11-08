import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../../utils/animations';
import { gradientText } from '../../../styles/text';

const HeroTitle = () => (
  <motion.h1 
    {...fadeInUp}
    className="text-4xl font-bold sm:text-5xl md:text-6xl"
  >
    <span className={`inline-block ${gradientText.primary}`}>
      AI-Powered Protection
    </span>
  </motion.h1>
);

export default HeroTitle;