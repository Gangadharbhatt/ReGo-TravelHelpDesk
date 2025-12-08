import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../../features/authSlice';
import { toast } from 'react-toastify';
import './Login.css';

// Components
import BoardingPassCard from './components/BoardingPassCard';
import TransitionOverlay from './components/TransitionOverlay';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, loginError, isAuthenticated } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showTransition, setShowTransition] = useState(false);

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    // Clear errors on unmount
    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.email || !formData.password) {
            toast.error('Please fill in all fields');
            return;
        }

        try {
            await dispatch(login(formData)).unwrap();

            // Show transition animation
            setShowTransition(true);

            // Wait for transition animation
            await new Promise((r) => setTimeout(r, 1200));

            toast.success('Login successful!');
            navigate('/dashboard');
        } catch (error) {
            // Error is handled by Redux and displayed in UI
            toast.error(loginError || 'Login failed');
        }
    };

    return (
        <>
            <a href="#main" className="skip-link">
                Skip to main content
            </a>

            <div
                className="login-page"
                id="main"
            >
                <BoardingPassCard
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    error={loginError}
                />
            </div>

            {/* Page Transition Overlay */}
            <TransitionOverlay
                isActive={showTransition}
                onComplete={() => setShowTransition(false)}
            />
        </>
    );
};

export default LoginPage;
