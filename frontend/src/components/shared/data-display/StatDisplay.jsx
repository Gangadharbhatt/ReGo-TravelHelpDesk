// src/components/shared/data-display/StatDisplay.jsx
import React from 'react';
import { Box, Typography, alpha } from '@mui/material';
import SharedCard from '../cards/SharedCard';

const StatDisplay = ({ title, value, icon, trend, onClick, active, color }) => {
  // Use the passed color or default to primary
  const activeColor = color || '#b91c1c';

  return (
    <SharedCard
      onClick={onClick}
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        border: '1px solid',
        borderColor: active ? activeColor : 'transparent',
        bgcolor: active ? alpha(activeColor, 0.05) : 'white',
        boxShadow: active
          ? `0 4px 12px ${alpha(activeColor, 0.15)}`
          : '0 2px 12px rgba(0,0,0,0.05)',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: onClick ? 'translateY(-2px)' : 'none',
          boxShadow: onClick
            ? `0 8px 24px ${alpha(activeColor, 0.15)}`
            : '0 4px 12px rgba(0,0,0,0.08)'
        }
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography
            variant="body2"
            sx={{
              color: active ? activeColor : 'text.secondary',
              fontWeight: active ? 600 : 500,
              fontSize: '0.875rem'
            }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              color: active ? activeColor : 'text.secondary',
              opacity: active ? 1 : 0.7,
              transform: active ? 'scale(1.1)' : 'scale(1)',
              transition: 'all 0.2s'
            }}
          >
            {icon}
          </Box>
        </Box>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: active ? 'text.primary' : 'text.primary',
            fontSize: '2rem'
          }}
        >
          {value}
        </Typography>

        {trend && (
          <Typography
            variant="caption"
            sx={{
              mt: 1,
              display: 'block',
              color: trend > 0 ? 'success.main' : 'error.main',
              fontWeight: 500
            }}
          >
            {trend > 0 ? '+' : ''}{trend}% vs last month
          </Typography>
        )}
      </Box>
    </SharedCard>
  );
};

export default StatDisplay;