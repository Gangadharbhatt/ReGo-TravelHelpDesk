import React from 'react';
import { motion } from 'framer-motion';

const PerforatedEdge = () => {
    return (
        <motion.div
            className="perforated-edge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
        />
    );
};

export default PerforatedEdge;
