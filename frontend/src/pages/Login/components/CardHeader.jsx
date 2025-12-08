import React from 'react';
import { motion } from 'framer-motion';

const CardHeader = () => {
    return (
        <div className="card-header">
            <div className="airline-name">
                <span className="airline-logo">REGO</span>
                <span className="airline-suffix">AIRWAYS</span>
            </div>
            <motion.div
                className="plane-icon"
                animate={{
                    y: [0, -3, 0],
                    rotate: [-2, 2, -2]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
            >
                ✈️
            </motion.div>
        </div>
    );
};

export default CardHeader;
