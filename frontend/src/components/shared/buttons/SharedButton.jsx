import React from 'react';
import { motion } from 'framer-motion';
import { CircularProgress } from '@mui/material';
import { theme } from '../../../config/theme';
import { buttonVariants } from '../../../animations/variants';

const SharedButton = ({
  variant = 'primary',
  size = 'md',
  children,
  loading,
  startIcon,
  disabled,
  className,
  onClick,
  type = 'button',
  fullWidth = false,
  ...props
}) => {

  // Base styles
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    fontWeight: theme.typography.fontWeight.medium,
    fontFamily: theme.typography.fontFamily,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    border: 'none',
    outline: 'none',
    transition: theme.transitions.normal,
    position: 'relative',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    minWidth: '120px', // Prevent collapse
    maxWidth: fullWidth ? '100%' : '200px', // Prevent expansion
    width: fullWidth ? '100%' : 'auto',
  };

  // Size styles
  const sizeStyles = {
    sm: {
      padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
      fontSize: theme.typography.fontSize.sm,
      height: '32px',
    },
    md: {
      padding: `${theme.spacing.md} ${theme.spacing.xl}`,
      fontSize: theme.typography.fontSize.base,
      height: '44px',
    },
    lg: {
      padding: `${theme.spacing.lg} ${theme.spacing.xxl}`,
      fontSize: theme.typography.fontSize.md,
      height: '56px',
    },
  };

  // Variant styles
  const variantStyles = {
    primary: {
      background: theme.primary[500],
      color: theme.neutral[0],
      boxShadow: theme.shadows.md,
      '&:hover': {
        background: theme.primary[600],
        boxShadow: theme.shadows.lg,
      },
    },
    secondary: {
      background: theme.primary[100],
      color: theme.primary[700],
      '&:hover': {
        background: theme.primary[200],
      },
    },
    outline: {
      background: 'transparent',
      border: `1px solid ${theme.neutral[300]}`,
      color: theme.neutral[700],
      '&:hover': {
        borderColor: theme.primary[500],
        color: theme.primary[600],
        background: theme.primary[50],
      },
    },
    ghost: {
      background: 'transparent',
      color: theme.neutral[600],
      minWidth: 'auto',
      '&:hover': {
        background: theme.neutral[100],
        color: theme.neutral[900],
      },
    },
    danger: {
      background: theme.error.main,
      color: theme.neutral[0],
      '&:hover': {
        background: theme.error.dark,
      },
    },
  };

  const combinedStyles = {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };

  return (
    <motion.button
      variants={!disabled && !loading ? buttonVariants : {}}
      initial="idle"
      whileHover="hover"
      whileTap="tap"
      style={combinedStyles}
      onClick={!disabled && !loading ? onClick : undefined}
      disabled={disabled || loading}
      type={type}
      className={className}
      {...props}
    >
      {loading ? (
        <CircularProgress size={20} color="inherit" thickness={5} />
      ) : (
        <>
          {startIcon && <span style={{ display: 'flex' }}>{startIcon}</span>}
          {children}
        </>
      )}
    </motion.button>
  );
};

export default SharedButton;
