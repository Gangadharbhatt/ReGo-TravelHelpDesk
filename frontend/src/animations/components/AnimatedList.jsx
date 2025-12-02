import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainerVariants, staggerItemVariants } from '../variants';

export const AnimatedList = ({ children, className }) => (
    <motion.div
        variants={staggerContainerVariants}
        initial="initial"
        animate="enter"
        className={className}
    >
        {children}
    </motion.div>
);

export const AnimatedListItem = ({ children, className }) => (
    <motion.div variants={staggerItemVariants} className={className}>
        {children}
    </motion.div>
);
