import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Badge,
  Stack
} from '@mui/material';
import { Notifications } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { markNotificationRead } from '../../../redux/slices/dashboardSlice';
import { theme } from '../../../config/theme';

const Navbar = ({ user, onLogout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const { notifications } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  const handleMarkRead = (id) => {
    dispatch(markNotificationRead(id));
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: theme.primary[600],
        boxShadow: theme.shadows.md,
        height: '64px', // Uniform height
        justifyContent: 'center',
        zIndex: theme.zIndex.appBar
      }}
    >
      <Toolbar sx={{ minHeight: '64px !important' }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: '-0.5px',
              color: theme.neutral[0]
            }}
            onClick={() => navigate('/dashboard')}
          >
            ReGo
          </Typography>
        </motion.div>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton
            sx={{
              color: theme.neutral[0],
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.1)' }
            }}
            onClick={(e) => setNotifAnchorEl(e.currentTarget)}
          >
            <Badge badgeContent={notifications.filter(n => !n.read).length} color="warning">
              <Notifications />
            </Badge>
          </IconButton>

          <IconButton
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{
              p: 0,
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.1)' }
            }}
          >
            <Avatar
              sx={{
                bgcolor: theme.neutral[0],
                color: theme.primary[600],
                fontWeight: 600
              }}
            >
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </Avatar>
          </IconButton>
        </Stack>

        <Menu
          anchorEl={notifAnchorEl}
          open={Boolean(notifAnchorEl)}
          onClose={() => setNotifAnchorEl(null)}
          PaperProps={{
            sx: { mt: 1, borderRadius: theme.borderRadius.lg, minWidth: 320, maxHeight: 400, boxShadow: theme.shadows.lg }
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ p: 2, borderBottom: `1px solid ${theme.neutral[200]}` }}>
            <Typography variant="subtitle1" fontWeight={600}>Notifications</Typography>
          </Box>
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <MenuItem
                key={notif.id}
                onClick={() => {
                  handleMarkRead(notif.id);
                  setNotifAnchorEl(null);
                }}
                sx={{
                  py: 1.5,
                  display: 'block',
                  bgcolor: notif.read ? 'transparent' : theme.primary[50],
                  borderLeft: notif.read ? '3px solid transparent' : `3px solid ${theme.primary[600]}`
                }}
              >
                <Typography variant="body2" sx={{ whiteSpace: 'normal', fontWeight: notif.read ? 400 : 600 }}>
                  {notif.message}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>{notif.time}</Typography>
              </MenuItem>
            ))
          ) : (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">No new notifications</Typography>
            </Box>
          )}
        </Menu>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          PaperProps={{
            sx: {
              mt: 1,
              borderRadius: theme.borderRadius.lg,
              minWidth: 150,
              boxShadow: theme.shadows.lg
            }
          }}
        >
          <MenuItem onClick={onLogout} sx={{ fontWeight: 500 }}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
