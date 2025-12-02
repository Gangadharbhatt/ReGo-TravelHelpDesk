// src/sharedComponents/modals/SharedModal.jsx
import React from 'react';
import { Modal, Box, IconButton, Fade, Backdrop } from '@mui/material';
import { Close } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { theme } from '../../../config/theme';
import { modalVariants } from '../../../animations/variants';

const SharedModal = ({
  open,
  onClose,
  width = 600,
  children,
  title
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)'
        }
      }}
    >
      <Fade in={open}>
        <Box
          component={motion.div}
          variants={modalVariants.content}
          initial="initial"
          animate="enter"
          exit="exit"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) !important', // Override transform from motion if needed, but motion handles it
            width: { xs: '95%', sm: width },
            maxWidth: '95vw',
            bgcolor: theme.neutral[0],
            borderRadius: theme.borderRadius.xxl,
            boxShadow: theme.shadows.xl,
            p: theme.spacing.xl,
            maxHeight: '90vh',
            overflowY: 'auto',
            outline: 'none',
            '&::-webkit-scrollbar': { width: '6px' },
            '&::-webkit-scrollbar-track': { background: theme.neutral[100] },
            '&::-webkit-scrollbar-thumb': { background: theme.neutral[300], borderRadius: '3px' },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: theme.spacing.lg }}>
            {title && (
              <Box component="h2" sx={{
                m: 0,
                fontSize: theme.typography.fontSize.xl,
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.neutral[900]
              }}>
                {title}
              </Box>
            )}
            <IconButton
              onClick={onClose}
              sx={{
                color: theme.neutral[500],
                '&:hover': { color: theme.neutral[900], bgcolor: theme.neutral[100] }
              }}
            >
              <Close />
            </IconButton>
          </Box>
          {children}
        </Box>
      </Fade>
    </Modal>
  );
};

export default SharedModal;