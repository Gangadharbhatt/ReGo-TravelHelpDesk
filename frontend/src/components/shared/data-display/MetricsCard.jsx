import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { theme } from '../../../config/theme';
import { AnimatedCard } from '../../../animations/components';
import { counterVariants } from '../../../animations/variants';
import { TrendingUp, TrendingDown, Remove } from '@mui/icons-material';

const MetricsCard = ({
    title,
    value,
    icon,
    trend, // { value: number, direction: 'up' | 'down' | 'neutral' }
    color = 'primary',
    delay = 0,
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
        <AnimatedCard
            delay={delay}
            onClick={onClick}
            variant="stat"
            style={{ cursor: onClick ? 'pointer' : 'default' }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: theme.spacing.md }}>
                <Box>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            color: theme.neutral[500],
                            fontWeight: theme.typography.fontWeight.medium,
                            mb: theme.spacing.xs
                        }}
                    >
                        {title}
                    </Typography>
                    <motion.div
                        variants={counterVariants}
                        initial="initial"
                        animate="enter"
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: theme.typography.fontWeight.bold,
                                color: theme.neutral[900],
                                fontSize: theme.typography.fontSize.xxxl
                            }}
                        >
                            {value}
                        </Typography>
                    </motion.div>
                </Box>

                <Box sx={{
                    p: theme.spacing.sm,
                    borderRadius: theme.borderRadius.lg,
                    bgcolor: theme[color][50],
                    color: theme[color][600],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {icon}
                </Box>
            </Box>

            {trend && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: theme.spacing.xs }}>
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
                            fontWeight: theme.typography.fontWeight.medium
                        }}
                    >
                        {trend.value}%
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.neutral[400] }}>
                        vs last month
                    </Typography>
                </Box>
            )}
        </AnimatedCard>
    );
};

export default MetricsCard;
