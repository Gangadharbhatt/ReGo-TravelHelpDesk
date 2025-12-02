import React from 'react';
import { Box, Paper, Button } from '@mui/material';
import { theme } from '../../../config/theme';
import SharedButton from '../buttons/SharedButton';
import { FilterList, Refresh } from '@mui/icons-material';

const FilterBar = ({ children, onReset, onRefresh, className }) => {
    return (
        <Paper
            elevation={0}
            className={className}
            sx={{
                position: 'sticky',
                top: 0,
                zIndex: theme.zIndex.sticky,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(8px)',
                borderBottom: `1px solid ${theme.neutral[200]}`,
                padding: theme.spacing.lg,
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.md,
                flexWrap: 'wrap',
                transition: theme.transitions.normal,
                marginBottom: theme.spacing.lg,
                [theme.breakpoints.mobile]: {
                    flexDirection: 'column',
                    alignItems: 'stretch',
                }
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, color: theme.neutral[500] }}>
                <FilterList fontSize="small" />
                <Box component="span" sx={{ fontWeight: theme.typography.fontWeight.medium, fontSize: theme.typography.fontSize.sm }}>
                    FILTERS
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flex: 1, gap: theme.spacing.md, flexWrap: 'wrap' }}>
                {children}
            </Box>

            <Box sx={{ display: 'flex', gap: theme.spacing.sm }}>
                {onReset && (
                    <SharedButton variant="ghost" size="sm" onClick={onReset}>
                        Reset
                    </SharedButton>
                )}
                {onRefresh && (
                    <SharedButton variant="secondary" size="sm" startIcon={<Refresh />} onClick={onRefresh}>
                        Refresh
                    </SharedButton>
                )}
            </Box>
        </Paper>
    );
};

export default FilterBar;
