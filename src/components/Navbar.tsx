import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Users, MessageCircle, BarChart2, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/chat', icon: MessageCircle, label: 'Chat with Billy' },
    { path: '/community', icon: Users, label: 'Community' },
    { path: '/statistics', icon: BarChart2, label: 'Statistics' }
  ];

  const logoVariants = {
    hover: {
      scale: 1.05,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.5,
        rotate: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 1
        }
      }
    }
  };

  const navItemVariants = {
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 shadow-lg backdrop-blur-lg border-b border-indigo-50' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="group">
              <motion.div
                className="flex items-center space-x-3"
                variants={logoVariants}
                whileHover="hover"
              >
                <div className={`p-3 rounded-xl transform transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-gradient-to-br from-indigo-50 to-indigo-100 group-hover:from-indigo-100 group-hover:to-indigo-200' 
                    : 'bg-white/10 group-hover:bg-white/20'
                }`}>
                  <Shield className={`w-8 h-8 transform transition-all duration-300 ${
                    isScrolled 
                      ? 'text-indigo-600 group-hover:text-indigo-700' 
                      : 'text-white group-hover:scale-110'
                  }`} />
                </div>
                <div className="flex flex-col">
                  <span className={`text-xl font-bold tracking-tight transform transition-all duration-300 ${
                    isScrolled 
                      ? 'text-gray-900 group-hover:text-indigo-600' 
                      : 'text-white group-hover:text-indigo-200'
                  }`}>
                    Billy
                  </span>
                  <span className={`text-xs transform transition-all duration-300 ${
                    isScrolled 
                      ? 'text-indigo-600 group-hover:text-indigo-700' 
                      : 'text-indigo-200 group-hover:text-white'
                  }`}>
                    Cyberbullying Prevention
                  </span>
                </div>
              </motion.div>
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <motion.div
                  key={item.path}
                  variants={navItemVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                      location.pathname === item.path
                        ? isScrolled
                          ? 'bg-indigo-50 text-indigo-600 font-semibold shadow-sm'
                          : 'bg-white/10 text-white font-semibold'
                        : isScrolled
                          ? 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-md'
                          : 'text-white/90 hover:bg-white/10 hover:text-white hover:shadow-white/20'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 transition-transform duration-300 ${
                      location.pathname === item.path
                        ? 'scale-110'
                        : 'group-hover:scale-110'
                    }`} />
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
                isScrolled
                  ? 'hover:bg-indigo-50'
                  : 'hover:bg-white/10'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-white/95 backdrop-blur-lg border-t border-indigo-50 shadow-lg"
            >
              <div className="px-4 py-3 space-y-1">
                {navItems.map((item) => (
                  <motion.div
                    key={item.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        location.pathname === item.path
                          ? 'bg-indigo-50 text-indigo-600 font-semibold shadow-sm'
                          : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-md'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      
      {/* Spacer for fixed navbar */}
      <div className="h-20" />
    </>
  );
};

export default Navbar;