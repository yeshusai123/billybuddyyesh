import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { ProfileCardProps } from '../../types/community';
import ProfileImage from './ProfileImage';
import ProfileSocialLinks from './ProfileSocialLinks';

const ProfileCard: React.FC<ProfileCardProps> = ({ name, role, image, bio, socialLinks }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 10 }}
      className="group relative bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <ProfileImage src={image} alt={name} />

      <div className="relative p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-white mb-1">{name}</h3>
          <div className="flex items-center space-x-2 mb-3">
            <Shield className="w-4 h-4 text-indigo-400" />
            <p className="text-sm text-indigo-300">{role}</p>
          </div>
          <p className="text-sm text-gray-300 mb-4">{bio}</p>

          <ProfileSocialLinks links={socialLinks} />
        </motion.div>

        <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-500/30 rounded-2xl transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
};

export default ProfileCard;