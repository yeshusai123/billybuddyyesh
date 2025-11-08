import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../../utils/animations';

const HeroDescription = () => (
  <motion.p
    {...fadeInUp}
    transition={{ delay: 0.5 }}
    className="mt-8 max-w-md mx-auto text-base text-indigo-100 sm:text-lg md:mt-8 md:text-xl md:max-w-3xl"
  >
    Advanced AI technology providing immediate support, detecting threats,
    and creating a safer digital environment for everyone.
  </motion.p>
);

export default HeroDescription;