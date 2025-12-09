// src/components/shared/chips/StatusChip.jsx
import React from 'react';
import { Chip, alpha } from '@mui/material';

// Modern "Soft" Color Palette
const STATUS_STYLES = {
  success: {
    color: '#059669', // Emerald 600
    bgcolor: '#ecfdf5', // Emerald 50
    borderColor: '#a7f3d0' // Emerald 200
  },
  warning: {
    color: '#d97706', // Amber 600
    bgcolor: '#fffbeb', // Amber 50
    borderColor: '#fde68a' // Amber 200
  },
  error: {
    color: '#dc2626', // Red 600
    bgcolor: '#fef2f2', // Red 50
    borderColor: '#fecaca' // Red 200
  },
  info: {
    color: '#0891b2', // Cyan 600
    bgcolor: '#ecfeff', // Cyan 50
    borderColor: '#a5f3fc' // Cyan 200
  },
  default: {
    color: '#4b5563', // Gray 600
    bgcolor: '#f3f4f6', // Gray 100
    borderColor: '#e5e7eb' // Gray 200
  }
};

const getStatusKey = (status) => {
  if (!status) return 'default';
  const s = String(status).toLowerCase();
  if (s.includes('approved') || s.includes('completed') || s.includes('success')) return 'success';
  if (s.includes('pending') || s.includes('review') || s.includes('process') || s.includes('wait') || s.includes('progress')) return 'warning';
  if (s.includes('rejected') || s.includes('cancel') || s.includes('decline')) return 'error';
  if (s.includes('booked') || s.includes('confirm') || s.includes('submitted')) return 'info';
  return 'default';
};

const StatusChip = ({ label, color }) => {
  // Determine color key: prop > logic > default
  // But wait, the prop 'color' is usually 'success', 'warning' etc. 
  // If a specific mui color is passed, we might map it to our keys unless it matches one

  let styleKey = 'default';

  if (color && STATUS_STYLES[color]) {
    styleKey = color;
  } else {
    styleKey = getStatusKey(label);
  }

  const styles = STATUS_STYLES[styleKey];

  return (
    <Chip
      label={label}
      size="small"
      sx={{
        fontWeight: 600,
        fontSize: '0.75rem',
        color: styles.color,
        bgcolor: styles.bgcolor,
        border: `1px solid ${styles.borderColor}`,
        borderRadius: '6px', // Modern slightly squared look, or 16px for rounded
        height: '24px',
        '& .MuiChip-label': {
          px: 1.5,
          py: 0
        }
      }}
    />
  );
};

export default StatusChip;
