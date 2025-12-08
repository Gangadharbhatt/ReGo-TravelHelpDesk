import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TransitionOverlay = ({ isActive, onComplete }) => {
    return (
        <AnimatePresence>
            {isActive && (
                <motion.div
                    className="transition-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onAnimationComplete={onComplete}
                >
                    {/* Flying plane */}
                    <motion.div
                        className="flying-plane"
                        initial={{ x: '30%', y: '60%', scale: 1, rotate: -20 }}
                        animate={{
                            x: '50%',
                            y: '-20%',
                            scale: 0.3,
                            rotate: -30
                        }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        ✈️
                    </motion.div>

                    {/* Cloud/speed lines */}
                    <motion.div
                        className="speed-lines"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1 }}
                    >
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="speed-line"
                                initial={{ x: '100%', opacity: 0 }}
                                animate={{ x: '-100%', opacity: [0, 1, 0] }}
                                transition={{
                                    duration: 0.6,
                                    delay: i * 0.05,
                                    ease: 'linear'
                                }}
                                style={{ '--line-top': `${10 + i * 12}%` }}
                            />
                        ))}
                    </motion.div>

                    {/* Bright fade to white */}
                    <motion.div
                        className="white-fade"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default TransitionOverlay;
