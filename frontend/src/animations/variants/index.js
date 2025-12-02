// PAGE TRANSITIONS (Full page movement)
export const pageVariants = {
    initial: { opacity: 0, y: 20 },
    enter: {
        opacity: 1, y: 0,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    },
    exit: {
        opacity: 0, y: -10,
        transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
    }
};

// CARD ANIMATIONS (Hover, tap effects)
export const cardVariants = {
    initial: { opacity: 0, y: 30, scale: 0.96 },
    enter: {
        opacity: 1, y: 0, scale: 1,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
    },
    hover: {
        y: -4,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.08)',
        transition: { duration: 0.25 }
    },
    tap: { scale: 0.98 }
};

// MODAL ANIMATIONS (Appear/disappear with scale)
export const modalVariants = {
    overlay: {
        initial: { opacity: 0 },
        enter: { opacity: 1, transition: { duration: 0.25 } },
        exit: { opacity: 0, transition: { duration: 0.2 } }
    },
    content: {
        initial: { opacity: 0, scale: 0.92, y: 20 },
        enter: {
            opacity: 1, scale: 1, y: 0,
            transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
        },
        exit: {
            opacity: 0, scale: 0.96, y: 10,
            transition: { duration: 0.2 }
        }
    }
};

// BUTTON MICRO-INTERACTIONS (Hover & click feedback)
export const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.97, transition: { duration: 0.1 } }
};

// LIST STAGGER (Children appear sequentially)
export const staggerContainerVariants = {
    initial: {},
    enter: {
        transition: { staggerChildren: 0.06, delayChildren: 0.1 }
    }
};

export const staggerItemVariants = {
    initial: { opacity: 0, y: 20 },
    enter: {
        opacity: 1, y: 0,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
};

// TABLE ROW ANIMATIONS (Smooth row appearance)
export const tableRowVariants = {
    initial: { opacity: 0, x: -10 },
    enter: {
        opacity: 1, x: 0,
        transition: { duration: 0.3 }
    },
    exit: {
        opacity: 0, x: 10,
        transition: { duration: 0.2 }
    }
};

// FADE IN UP (General purpose smooth entrance)
export const fadeInUpVariants = {
    initial: { opacity: 0, y: 15 },
    enter: {
        opacity: 1, y: 0,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
};

// SLIDE IN RIGHT (Sidebar, panel animations)
export const slideInRightVariants = {
    initial: { opacity: 0, x: 50 },
    enter: {
        opacity: 1, x: 0,
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
    },
    exit: {
        opacity: 0, x: 50,
        transition: { duration: 0.25 }
    }
};

// PULSE BADGE (Notification indicator animation)
export const pulseBadgeVariants = {
    initial: { scale: 1 },
    pulse: {
        scale: [1, 1.15, 1],
        transition: { duration: 0.4 }
    }
};

// COUNTER ANIMATION (Metric card numbers)
export const counterVariants = {
    initial: { opacity: 0, scale: 0.5 },
    enter: {
        opacity: 1, scale: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
};

// TOOLTIP ANIMATION (Quick popover)
export const tooltipVariants = {
    initial: { opacity: 0, y: 5, scale: 0.95 },
    enter: {
        opacity: 1, y: 0, scale: 1,
        transition: { duration: 0.15 }
    },
    exit: {
        opacity: 0, y: 5, scale: 0.95,
        transition: { duration: 0.1 }
    }
};

// DROPDOWN ANIMATION (Menu appearance)
export const dropdownVariants = {
    initial: { opacity: 0, y: -10, scaleY: 0.95 },
    enter: {
        opacity: 1, y: 0, scaleY: 1,
        transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
    },
    exit: {
        opacity: 0, y: -5, scaleY: 0.98,
        transition: { duration: 0.15 }
    }
};

// SHAKE ANIMATION (Error feedback)
export const shakeVariants = {
    initial: { x: 0 },
    shake: {
        x: [-2, 2, -2, 2, 0],
        transition: { duration: 0.3 }
    }
};

// CHECKMARK ANIMATION (Success confirmation)
export const checkmarkVariants = {
    initial: { scale: 0, opacity: 0 },
    enter: {
        scale: 1, opacity: 1,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
};
