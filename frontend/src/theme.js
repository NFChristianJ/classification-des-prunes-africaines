import { createTheme } from '@mui/material';

// Custom theme with fruit-inspired colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50', // Green for "good" fruits
      light: '#80e27e',
      dark: '#087f23'
    },
    secondary: {
      main: '#ff9800', // Orange for "ripe" fruits
      light: '#ffc947',
      dark: '#c66900'
    },
    error: {
      main: '#f44336', // Red for "rotten" fruits
      light: '#ff7961',
      dark: '#ba000d'
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff'
    }
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 20px'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '0.9rem'
        }
      }
    }
  }
});

export default theme;