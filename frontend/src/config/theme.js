export const theme = {
    // SPACING SCALE
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        xxl: '32px',
        xxxl: '48px'
    },

    // PRIMARY COLOR SYSTEM (ReGo Brand Red)
    primary: {
        50: '#FEF2F2',   // Lightest backgrounds
        100: '#FEE2E2',
        200: '#FECACA',
        300: '#FCA5A5',
        400: '#F87171',
        500: '#DC2626',  // Main action color (ReGo Brand Red)
        600: '#B91C1C',  // Hover state
        700: '#991B1B',
        800: '#7F1D1D',  // Darkest text on light
        900: '#6B1515'
    },

    // NEUTRAL PALETTE
    neutral: {
        0: '#FFFFFF',    // Pure white
        50: '#F9FAFB',   // Lightest gray background
        100: '#F3F4F6',  // Alternating row color, disabled state
        200: '#E5E7EB',  // Borders, dividers
        300: '#D1D5DB',  // Input borders
        400: '#9CA3AF',  // Secondary text
        500: '#6B7280',  // Medium gray text
        600: '#4B5563',  // Darker gray
        700: '#374151',  // Dark text
        800: '#1F2937',  // Very dark text
        900: '#111827'   // Darkest text
    },

    // SEMANTIC COLORS
    success: { light: '#D1FAE5', main: '#10B981', dark: '#047857' },
    warning: { light: '#FEF3C7', main: '#F59E0B', dark: '#B45309' },
    error: { light: '#FEE2E2', main: '#EF4444', dark: '#B91C1C' },
    info: { light: '#DBEAFE', main: '#3B82F6', dark: '#1D4ED8' },

    // STATUS CHIP COLORS
    statusColors: {
        pending: { bg: '#FEF3C7', text: '#92400E', border: '#FCD34D' },
        approved: { bg: '#D1FAE5', text: '#065F46', border: '#6EE7B7' },
        rejected: { bg: '#FEE2E2', text: '#991B1B', border: '#FCA5A5' },
        inProgress: { bg: '#DBEAFE', text: '#1E40AF', border: '#93C5FD' },
        draft: { bg: '#F3F4F6', text: '#374151', border: '#D1D5DB' },
        completed: { bg: '#D1FAE5', text: '#065F46', border: '#6EE7B7' },
        cancelled: { bg: '#F3F4F6', text: '#6B7280', border: '#D1D5DB' },
        onHold: { bg: '#FEF3C7', text: '#92400E', border: '#FCD34D' }
    },

    // TYPOGRAPHY SYSTEM
    typography: {
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        fontSize: {
            xs: '11px',
            sm: '12px',
            base: '14px',
            md: '16px',
            lg: '18px',
            xl: '20px',
            xxl: '24px',
            xxxl: '32px'
        },
        fontWeight: { regular: 400, medium: 500, semibold: 600, bold: 700 },
        lineHeight: { tight: 1.25, normal: 1.5, relaxed: 1.75 }
    },

    // SHADOW SYSTEM
    shadows: {
        none: 'none',
        xs: '0 1px 2px rgba(0, 0, 0, 0.04)',
        sm: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.03)',
        card: '0px 2px 12px rgba(0, 0, 0, 0.08)',  // Specific for dashboard cards
        inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.04)'
    },

    // BORDER RADIUS
    borderRadius: {
        none: '0',
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        xxl: '16px',
        full: '9999px'
    },

    // BREAKPOINTS
    breakpoints: {
        mobile: '480px',
        tablet: '768px',
        laptop: '1024px',
        desktop: '1280px',
        largeDesktop: '1536px'
    },

    // Z-INDEX HIERARCHY
    zIndex: {
        dropdown: 100,
        sticky: 200,
        modal: 300,
        tooltip: 400,
        toast: 500
    },

    // TRANSITIONS
    transitions: {
        fast: '150ms ease',
        normal: '250ms ease',
        slow: '350ms ease',
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    }
};
