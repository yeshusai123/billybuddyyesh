import ProfileCard from './ProfileCard';
import { communityProfiles } from '../../data/communityProfiles';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const ProfileGrid = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex justify-center mt-8 relative z-50" // ✅ keeps it above background & clickable
    >
      <div className="w-full max-w-lg">
        {communityProfiles.map((profile) => (
          <ProfileCard key={profile.id} {...profile} />
        ))}
      </div>
    </motion.div>
  );
};

export default ProfileGrid;
