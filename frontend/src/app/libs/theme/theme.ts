import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00A86B', // Verde
      light: '#00D77D',
      dark: '#00854D',
    },
    secondary: {
      main: '#000000', // Preto
      light: '#333333',
      dark: '#000000',
    },
    background: {
      default: '#FFFFFF', // Branco
      paper: '#F5F5F5',
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#000000',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#000000',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#000000',
    },
    body1: {
      fontSize: '1rem',
      color: '#000000',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0, 168, 107, 0.3)',
          },
        },
        contained: {
          backgroundColor: '#00A86B',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#00854D',
          },
        },
        outlined: {
          borderColor: '#00A86B',
          color: '#00A86B',
          '&:hover': {
            backgroundColor: 'rgba(0, 168, 107, 0.05)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '2px solid #000000',
          borderRadius: '8px',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: '#00A86B',
            boxShadow: '0 8px 24px rgba(0, 168, 107, 0.15)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderColor: '#000000',
            '&:hover fieldset': {
              borderColor: '#00A86B',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00A86B',
              borderWidth: 2,
            },
          },
          '& label': {
            color: '#000000',
          },
          '& label.Mui-focused': {
            color: '#00A86B',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#000000',
          borderBottom: '2px solid #000000',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00A86B', // Verde
      light: '#00D77D',
      dark: '#00854D',
    },
    secondary: {
      main: '#FFFFFF', // Branco em modo escuro
      light: '#F5F5F5',
      dark: '#E0E0E0',
    },
    background: {
      default: '#1A1A1A', // Cinza escuro
      paper: '#2D2D2D',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#FFFFFF',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#FFFFFF',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#FFFFFF',
    },
    body1: {
      fontSize: '1rem',
      color: '#FFFFFF',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0, 168, 107, 0.5)',
          },
        },
        contained: {
          backgroundColor: '#00A86B',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#00D77D',
          },
        },
        outlined: {
          borderColor: '#00A86B',
          color: '#00A86B',
          '&:hover': {
            backgroundColor: 'rgba(0, 168, 107, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '2px solid #00A86B',
          borderRadius: '8px',
          backgroundColor: '#2D2D2D',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: '#00D77D',
            boxShadow: '0 8px 24px rgba(0, 168, 107, 0.3)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderColor: '#00A86B',
            backgroundColor: '#2D2D2D',
            color: '#FFFFFF',
            '&:hover fieldset': {
              borderColor: '#00D77D',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00D77D',
              borderWidth: 2,
            },
          },
          '& label': {
            color: '#B0B0B0',
          },
          '& label.Mui-focused': {
            color: '#00A86B',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A1A1A',
          color: '#FFFFFF',
          borderBottom: '2px solid #00A86B',
          boxShadow: '0 2px 8px rgba(0, 168, 107, 0.2)',
        },
      },
    },
  },
});

export { lightTheme, darkTheme };
