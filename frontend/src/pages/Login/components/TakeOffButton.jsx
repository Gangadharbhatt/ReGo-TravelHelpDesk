import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BUTTON_STATES = {
    IDLE: 'idle',
    HOVER: 'hover',
    LOADING: 'loading',
    TAKEOFF: 'takeoff',
    SUCCESS: 'success'
};

// Plane Icon Component
const PlaneIcon = ({ state }) => {
    const variants = {
        idle: {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1
        },
        hover: {
            x: 5,
            y: -2,
            rotate: -10,
            transition: { duration: 0.3 }
        },
        loading: {
            x: [0, 150],
            transition: {
                duration: 0.8,
                ease: [0.4, 0, 1, 1]
            }
        },
        takeoff: {
            x: 150,
            y: -100,
            rotate: -30,
            scale: 0.5,
            opacity: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    return (
        <motion.span
            className="button-plane-icon"
            variants={variants}
            animate={state}
        >
            ✈️
        </motion.span>
    );
};

// Runway Lights Component
const RunwayLights = ({ visible }) => {
    const lights = [0, 1, 2, 3, 4, 5, 6, 7];

    return (
        <motion.div
            className="runway-lights"
            initial={{ opacity: 0 }}
            animate={{ opacity: visible ? 1 : 0 }}
        >
            {lights.map((i) => (
                <motion.span
                    key={i}
                    className="runway-light"
                    animate={{
                        opacity: [0.3, 1, 0.3],
                        scale: [0.8, 1, 0.8]
                    }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.08
                    }}
                />
            ))}
        </motion.div>
    );
};

// Button Text Component
const ButtonText = ({ state }) => {
    const texts = {
        idle: 'BOARD NOW',
        hover: 'READY TO DEPART',
        loading: 'TAKING OFF...',
        takeoff: '...',
        success: 'WELCOME ABOARD!'
    };

    return (
        <AnimatePresence mode="wait">
            <motion.span
                key={state}
                className="button-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
            >
                {texts[state]}
            </motion.span>
        </AnimatePresence>
    );
};

// Main TakeOffButton Component
const TakeOffButton = ({ onClick, isLoading, disabled }) => {
    const [buttonState, setButtonState] = useState(BUTTON_STATES.IDLE);
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = async (e) => {
        e.preventDefault();

        if (buttonState !== BUTTON_STATES.IDLE) return;

        setButtonState(BUTTON_STATES.LOADING);

        // Wait for loading animation
        await new Promise((r) => setTimeout(r, 800));

        setButtonState(BUTTON_STATES.TAKEOFF);

        // Wait for takeoff animation
        await new Promise((r) => setTimeout(r, 600));

        setButtonState(BUTTON_STATES.SUCCESS);

        // Trigger actual login
        if (onClick) {
            onClick();
        }
    };

    const buttonVariants = {
        idle: { scale: 1 },
        hover: { scale: 1.02 },
        tap: { scale: 0.98 }
    };

    return (
        <motion.button
            type="submit"
            className={`takeoff-button takeoff-button--${buttonState}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
            disabled={buttonState !== BUTTON_STATES.IDLE || disabled}
            variants={buttonVariants}
            whileHover={buttonState === BUTTON_STATES.IDLE ? 'hover' : undefined}
            whileTap={buttonState === BUTTON_STATES.IDLE ? 'tap' : undefined}
        >
            <span className="button-content">
                <PlaneIcon state={buttonState} />
                <RunwayLights visible={isHovered || buttonState === BUTTON_STATES.LOADING} />
                <ButtonText state={buttonState} />
            </span>
        </motion.button>
    );
};

export default TakeOffButton;
