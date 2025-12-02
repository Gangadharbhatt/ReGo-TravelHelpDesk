import React from 'react';
import { Chip } from '@mui/material';
import { theme } from '../../../config/theme';

const getStatusStyle = (status) => {
  if (!status) return theme.statusColors.draft;

  const s = status.toLowerCase();
  const { statusColors } = theme;

  if (s.includes('approved') || s.includes('completed')) return statusColors.approved;
  if (s.includes('pending') || s.includes('review') || s.includes('awaiting')) return statusColors.pending;
  if (s.includes('rejected') || s.includes('cancelled')) return statusColors.rejected;
  if (s.includes('booked') || s.includes('confirmed')) return statusColors.completed;
  if (s.includes('progress')) return statusColors.inProgress;
  if (s.includes('hold')) return statusColors.onHold;

  return statusColors.draft;
};

const StatusChip = ({ label, color, ...props }) => {
  const style = getStatusStyle(label);

  return (
    <Chip
      label={label}
      size="small"
      sx={{
        fontWeight: theme.typography.fontWeight.medium,
        fontSize: theme.typography.fontSize.sm,
        backgroundColor: style.bg,
        color: style.text,
        border: `1px solid ${style.border}`,
        borderRadius: theme.borderRadius.full,
        height: '24px',
        '& .MuiChip-label': {
          padding: `0 ${theme.spacing.sm}`,
        }
      }}
      {...props}
    />
  );
};

export default StatusChip;
