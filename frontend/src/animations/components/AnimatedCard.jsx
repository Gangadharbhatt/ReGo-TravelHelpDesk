import React from 'react';
import { motion } from 'framer-motion';
import { cardVariants } from '../variants';

export const AnimatedCard = ({ children, className, delay = 0, onClick }) => (
  <motion.div
    variants={cardVariants}
    initial="initial"
    animate="enter"
    whileHover="hover"
    whileTap="tap"
    transition={{ delay }}
    className={className}
    onClick={onClick}
  >
    {children}
  </motion.div>
);