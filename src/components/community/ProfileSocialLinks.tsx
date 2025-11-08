import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Linkedin, Twitter } from 'lucide-react';
import { SocialLink } from '../../types/community';

interface ProfileSocialLinksProps {
  links: SocialLink[];
}

const ProfileSocialLinks: React.FC<ProfileSocialLinksProps> = ({ links }) => {
  const getIcon = (platform: string) => {
    switch (platform) {
      case 'github':
        return Github;
      case 'linkedin':
        return Linkedin;
      case 'twitter':
        return Twitter;
      default:
        return ExternalLink;
    }
  };

  return (
    <div className="flex space-x-3">
      {links.map((link) => {
        const Icon = getIcon(link.platform);
        return (
          <motion.a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300"
          >
            <Icon className="w-5 h-5" />
          </motion.a>
        );
      })}
    </div>
  );
};

export default ProfileSocialLinks;