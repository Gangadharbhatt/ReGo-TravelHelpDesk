import React from 'react';
import { motion } from 'framer-motion';
import { pageVariants } from '../variants';

export const AnimatedPage = ({ children, className }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="enter"
    exit="exit"
    className={className}
  >
    {children}
  </motion.div>
);