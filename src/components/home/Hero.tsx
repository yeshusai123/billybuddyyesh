import React from 'react';
import { motion } from 'framer-motion';
import NetworkBackground from './NetworkBackground';
import HeroTitle from './hero/HeroTitle';
import HeroSubtitle from './hero/HeroSubtitle';
import HeroDescription from './hero/HeroDescription';
import HeroAction from './hero/HeroAction';
import { fadeInUp } from '../../utils/animations';

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <NetworkBackground />
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28">
          <motion.div 
            {...fadeInUp}
            className="text-center"
          >
            <HeroTitle />
            <HeroSubtitle />
            <HeroDescription />
            <HeroAction />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;