// src/components/shared/cards/SharedCard.jsx
import React from 'react';
import { AnimatedCard } from '../../../animations/components';
import { theme } from '../../../config/theme';

const SharedCard = ({
  children,
  className,
  delay = 0,
  onClick,
  variant = 'default', // default, stat, dashboard, auth
  ...props
}) => {

  const getStyles = () => {
    const base = {
      background: theme.neutral[0],
      borderRadius: theme.borderRadius.xl,
      border: `1px solid ${theme.neutral[200]}`,
      padding: theme.spacing.xl,
      boxShadow: theme.shadows.md,
      overflow: 'hidden',
      position: 'relative',
    };

    switch (variant) {
      case 'stat':
        return {
          ...base,
          borderTop: `4px solid ${theme.primary[500]}`,
        };
      case 'dashboard':
        return {
          ...base,
          boxShadow: theme.shadows.lg,
        };
      case 'auth':
        return {
          ...base,
          maxWidth: '450px',
          margin: '0 auto',
          padding: theme.spacing.xxl,
          borderTop: `4px solid ${theme.primary[500]}`,
        };
      default:
        return base;
    }
  };

  return (
    <AnimatedCard
      delay={delay}
      onClick={onClick}
      className={className}
    >
      <div style={getStyles()} {...props}>
        {children}
      </div>
    </AnimatedCard>
  );
};

export default SharedCard;