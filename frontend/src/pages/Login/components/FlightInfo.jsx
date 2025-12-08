import React from 'react';
import { motion } from 'framer-motion';

const InfoBlock = ({ label, value, animate, variant }) => {
    const getAnimation = () => {
        if (animate === 'blink') {
            return {
                opacity: [1, 0.4, 1],
                transition: {
                    duration: 0.3,
                    repeat: Infinity,
                    repeatDelay: 3
                }
            };
        }
        if (animate === 'pulse') {
            return {
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.05, 1],
                transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }
            };
        }
        return {};
    };

    return (
        <div className="info-block">
            <div className="info-block__label">{label}</div>
            <motion.div
                className={`info-block__value ${variant ? `info-block__value--${variant}` : ''}`}
                animate={getAnimation()}
            >
                {value}
            </motion.div>
        </div>
    );
};

const FlightInfo = () => {
    return (
        <div className="flight-info">
            <InfoBlock label="GATE" value="A1" animate="blink" />
            <InfoBlock label="CLASS" value="BUSINESS" variant="highlight" />
            <InfoBlock label="STATUS" value="NOW" animate="pulse" variant="success" />
        </div>
    );
};

export default FlightInfo;
