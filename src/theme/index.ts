import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0a0e27',
      paper: '#1a1d3a',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    success: {
      main: '#00e676',
      light: '#69f0ae',
    },
    error: {
      main: '#ff1744',
      light: '#ff5252',
    },
  },
  typography: {
    fontFamily: '"Rajdhani", "Orbitron", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      fontFamily: '"Orbitron", "Roboto", sans-serif',
      letterSpacing: '0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      fontFamily: '"Orbitron", "Roboto", sans-serif',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      fontFamily: '"Rajdhani", "Roboto", sans-serif',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      fontFamily: '"Rajdhani", "Roboto", sans-serif',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      fontFamily: '"Rajdhani", "Roboto", sans-serif',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      fontFamily: '"Rajdhani", "Roboto", sans-serif',
    },
    body1: {
      fontFamily: '"Rajdhani", "Roboto", sans-serif',
    },
    body2: {
      fontFamily: '"Rajdhani", "Roboto", sans-serif',
    },
    button: {
      fontFamily: '"Rajdhani", "Roboto", sans-serif',
      fontWeight: 600,
      letterSpacing: '0.05em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
          fontWeight: 600,
          borderRadius: '8px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 20px rgba(25, 118, 210, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, rgba(26, 29, 58, 0.9) 0%, rgba(15, 22, 40, 0.9) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 40px rgba(25, 118, 210, 0.2)',
            border: '1px solid rgba(25, 118, 210, 0.3)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          backdropFilter: 'blur(10px)',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          background: 'rgba(26, 29, 58, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 0 10px rgba(25, 118, 210, 0.2)',
            },
            '&.Mui-focused': {
              boxShadow: '0 0 20px rgba(25, 118, 210, 0.3)',
            },
          },
        },
      },
    },
  },
});

export default theme;
