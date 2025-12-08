import React from 'react';
import { motion } from 'framer-motion';
import CardHeader from './CardHeader';
import PerforatedEdge from './PerforatedEdge';
import LoginForm from './LoginForm';
import Barcode from './Barcode';

const BoardingPassCard = ({ formData, handleChange, handleSubmit, error }) => {
    const cardEntrance = {
        initial: { opacity: 0, x: 60, rotate: 3 },
        animate: {
            opacity: 1,
            x: 0,
            rotate: 0,
            transition: {
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.4
            }
        }
    };

    return (
        <motion.div
            className="boarding-pass"
            variants={cardEntrance}
            initial="initial"
            animate="animate"
        >
            <CardHeader />

            <PerforatedEdge />

            <LoginForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                error={error}
            />

            <PerforatedEdge />

            <Barcode />
        </motion.div>
    );
};

export default BoardingPassCard;
