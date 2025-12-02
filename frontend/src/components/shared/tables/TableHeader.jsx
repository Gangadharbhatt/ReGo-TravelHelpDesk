import React from 'react';
import { TableHead, TableRow, TableCell } from '@mui/material';
import { theme } from '../../../config/theme';

const TableHeader = ({ columns }) => (
  <TableHead>
    <TableRow>
      {columns.map((col) => {
        const isNumeric = col.numeric || (typeof col === 'object' && col.align === 'right');
        const isAction = col.id === 'actions' || col === 'Actions';
        const label = typeof col === 'object' ? col.label : col;
        const align = typeof col === 'object' && col.align ? col.align : (isNumeric ? 'right' : (isAction ? 'center' : 'left'));

        return (
          <TableCell
            key={col.id || col}
            align={align}
            sx={{
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.neutral[900],
              backgroundColor: theme.neutral[100],
              boxShadow: theme.shadows.xs,
              whiteSpace: 'nowrap',
              zIndex: theme.zIndex.sticky,
            }}
          >
            {label}
          </TableCell>
        );
      })}
    </TableRow>
  </TableHead>
);

export default TableHeader;