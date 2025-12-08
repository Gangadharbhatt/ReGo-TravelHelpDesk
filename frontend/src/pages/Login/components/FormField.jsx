import React from 'react';
import { motion } from 'framer-motion';

const FormField = ({ label, icon, children, error }) => {
    return (
        <motion.div
            className="form-field"
            animate={error ? { x: [-5, 5, -5, 5, 0] } : {}}
            transition={{ duration: 0.4 }}
        >
            <label className="form-field__label">
                {icon && <span className="form-field__icon">{icon}</span>}
                {label}
            </label>
            {children}
        </motion.div>
    );
};

export default FormField;
