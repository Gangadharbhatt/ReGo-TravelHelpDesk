import React from 'react';
import { Table, TableContainer, Paper } from '@mui/material';
import { theme } from '../../../config/theme';

const SharedTable = ({ children }) => (
  <TableContainer
    component={Paper}
    sx={{
      boxShadow: theme.shadows.sm,
      borderRadius: theme.borderRadius.lg,
      overflowX: 'auto',
      overflowY: 'auto',
      maxHeight: 'calc(100vh - 200px)', // Reasonable default
      '&::-webkit-scrollbar': { width: '6px', height: '6px' },
      '&::-webkit-scrollbar-track': { background: theme.neutral[100], borderRadius: '3px' },
      '&::-webkit-scrollbar-thumb': { background: theme.neutral[400], borderRadius: '3px' },
      '&::-webkit-scrollbar-thumb:hover': { background: theme.neutral[500] },
    }}
  >
    <Table stickyHeader sx={{
      '& .MuiTableBody-root .MuiTableRow-root': {
        transition: theme.transitions.fast,
        '&:nth-of-type(even)': { backgroundColor: theme.neutral[50] },
        '&:nth-of-type(odd)': { backgroundColor: theme.neutral[0] },
        '&:hover': { backgroundColor: theme.primary[50] },
      },
      '& .MuiTableCell-root': {
        borderColor: theme.neutral[200],
        padding: `${theme.spacing.md} ${theme.spacing.lg}`,
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.fontSize.base,
      }
    }}>
      {children}
    </Table>
  </TableContainer>
);

export default SharedTable;
