// src/components/shared/tables/SharedTable.jsx
import React from 'react';
import { Table, TableContainer, Paper } from '@mui/material';

const SharedTable = ({ children, stickyHeader = false, maxHeight, sx = {} }) => (
  <TableContainer
    component={Paper}
    sx={{
      maxHeight: maxHeight,
      ...sx
    }}
  >
    <Table stickyHeader={stickyHeader}>
      {children}
    </Table>
  </TableContainer>
);

export default SharedTable;
