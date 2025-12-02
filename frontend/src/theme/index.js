// src/theme/index.js
import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#DC2626', // ReGo Brand Red
      light: '#FCA5A5',
      dark: '#B91C1C',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#6B7280',
      light: '#9CA3AF',
      dark: '#4B5563',
    },
    success: {
      main: '#10B981',
      light: '#D1FAE5',
      dark: '#047857',
    },
    warning: {
      main: '#F59E0B',
      light: '#FEF3C7',
      dark: '#B45309',
    },
    error: {
      main: '#EF4444',
      light: '#FEE2E2',
      dark: '#B91C1C',
    },
    info: {
      main: '#3B82F6',
      light: '#DBEAFE',
      dark: '#1D4ED8',
    },
    background: {
      default: '#F9FAFB',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#111827',
      secondary: '#6B7280',
      disabled: '#9CA3AF',
    },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h1: {
      fontSize: '32px',
      fontWeight: 700,
      lineHeight: 1.25,
    },
    h2: {
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: 1.25,
    },
    h3: {
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: 1.25,
    },
    h4: {
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '14px',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '12px',
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 1px 2px rgba(0, 0, 0, 0.04)',
    '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
    '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
    '0px 2px 12px rgba(0, 0, 0, 0.08)', // Card shadow
    '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
    '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.03)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  ],
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#DC2626', // ReGo Brand Red
          color: '#FFFFFF',
        },
        colorPrimary: {
          backgroundColor: '#DC2626',
          color: '#FFFFFF',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

export default theme;