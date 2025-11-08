import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../../utils/animations';
import { gradientText } from '../../../styles/text';

const HeroSubtitle = () => (
  <motion.div
    {...fadeInUp}
    transition={{ delay: 0.3 }}
    className="mt-6"
  >
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-light">
      <span className="text-indigo-100">Cutting-edge technology</span>{' '}
      <span className={gradientText.secondary}>
        working to keep you safe
      </span>
    </h2>
  </motion.div>
);

export default HeroSubtitle;