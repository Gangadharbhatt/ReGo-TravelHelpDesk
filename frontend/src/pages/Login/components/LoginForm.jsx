import React from 'react';
import { motion } from 'framer-motion';
import FormField from './FormField';
import FlightInfo from './FlightInfo';
import TakeOffButton from './TakeOffButton';

const LoginForm = ({ formData, handleChange, handleSubmit, error }) => {
    return (
        <form className="login-form" onSubmit={handleSubmit}>
            {error && (
                <motion.div
                    className="error-message"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {error}
                </motion.div>
            )}

            <FormField label="PASSENGER" icon="✉️" error={error}>
                <motion.input
                    type="email"
                    name="email"
                    placeholder="your.email@company.com"
                    className="form-field__input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-label="Email address"
                    aria-required="true"
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                />
            </FormField>

            <FormField label="BOARDING CODE" icon="🔒" error={error}>
                <motion.input
                    type="password"
                    name="password"
                    placeholder="••••••••••"
                    className="form-field__input"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    aria-label="Password"
                    aria-required="true"
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                />
            </FormField>

            <FlightInfo />

            <TakeOffButton />
        </form>
    );
};

export default LoginForm;
