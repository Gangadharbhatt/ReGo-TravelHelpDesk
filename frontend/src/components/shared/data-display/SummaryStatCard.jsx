import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { theme } from '../../../config/theme';
import { TrendingUp, TrendingDown, Remove } from '@mui/icons-material';

/**
 * SummaryStatCard - Shared component for dashboard metric cards
 * Used across Manager, AVP, SVP, CHRO, Finance dashboards
 * 
 * @param {string} title - Card title (e.g., "All Requests")
 * @param {number|string} value - Main metric value
 * @param {React.ReactNode} icon - Icon component
 * @param {object} trend - Trend data { value: number, direction: 'up'|'down'|'neutral' }
 * @param {string} color - Theme color key ('primary', 'success', 'warning', 'error', 'info')
 * @param {function} onClick - Optional click handler
 */
const SummaryStatCard = ({
    title,
    value,
    icon,
    trend,
    color = 'primary',
    onClick
}) => {
    const getTrendColor = (direction) => {
        switch (direction) {
            case 'up': return theme.success.main;
            case 'down': return theme.error.main;
            default: return theme.neutral[500];
        }
    };

    const getTrendIcon = (direction) => {
        switch (direction) {
            case 'up': return <TrendingUp fontSize="small" />;
            case 'down': return <TrendingDown fontSize="small" />;
            default: return <Remove fontSize="small" />;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            whileHover={{
                y: -2,
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.12)',
                transition: { duration: 0.15 }
            }}
            style={{ height: '100%' }}
        >
            <Box
                onClick={onClick}
                sx={{
                    bgcolor: theme.neutral[0],
                    borderRadius: theme.borderRadius.xxl,
                    boxShadow: theme.shadows.card,
                    p: theme.spacing.lg,
                    cursor: onClick ? 'pointer' : 'default',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: theme.transitions.normal,
                    '&:hover': onClick ? {
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.12)'
                    } : {}
                }}
            >
                {/* Top Row: Label and Icon */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: theme.spacing.md
                }}>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            color: theme.neutral[500],
                            fontWeight: theme.typography.fontWeight.medium,
                            fontSize: theme.typography.fontSize.sm,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}
                    >
                        {title}
                    </Typography>

                    <Box sx={{
                        width: '40px',
                        height: '40px',
                        borderRadius: theme.borderRadius.lg,
                        bgcolor: theme[color][50],
                        color: theme[color][600],
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                    }}>
                        {icon}
                    </Box>
                </Box>

                {/* Main Value */}
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: theme.typography.fontWeight.bold,
                        color: theme.neutral[900],
                        fontSize: theme.typography.fontSize.xxxl,
                        lineHeight: theme.typography.lineHeight.tight,
                        mb: theme.spacing.sm
                    }}
                >
                    {value}
                </Typography>

                {/* Trend Indicator */}
                {trend && (
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: theme.spacing.xs,
                        mt: 'auto'
                    }}>
                        <Box sx={{
                            color: getTrendColor(trend.direction),
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            {getTrendIcon(trend.direction)}
                        </Box>
                        <Typography
                            variant="body2"
                            sx={{
                                color: getTrendColor(trend.direction),
                                fontWeight: theme.typography.fontWeight.medium,
                                fontSize: theme.typography.fontSize.sm
                            }}
                        >
                            {trend.value}%
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: theme.neutral[400],
                                fontSize: theme.typography.fontSize.sm
                            }}
                        >
                            vs last month
                        </Typography>
                    </Box>
                )}
            </Box>
        </motion.div>
    );
};

export default SummaryStatCard;
