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
      fontSize: 'clamp(1.5rem, 8vw, 3.5rem)',
      fontWeight: 700,
      color: '#000000',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: 'clamp(1.25rem, 6vw, 2.5rem)',
      fontWeight: 700,
      color: '#000000',
      lineHeight: 1.3,
    },
    h3: {
      fontSize: 'clamp(1rem, 4vw, 1.75rem)',
      fontWeight: 600,
      color: '#000000',
      lineHeight: 1.4,
    },
    h4: {
      fontSize: 'clamp(0.875rem, 3vw, 1.5rem)',
      fontWeight: 600,
      color: '#000000',
    },
    h5: {
      fontSize: 'clamp(0.75rem, 2.5vw, 1.25rem)',
      fontWeight: 600,
      color: '#000000',
    },
    h6: {
      fontSize: 'clamp(0.75rem, 2vw, 1rem)',
      fontWeight: 600,
      color: '#000000',
    },
    body1: {
      fontSize: 'clamp(0.875rem, 2vw, 1.1rem)',
      color: '#000000',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
      color: '#666666',
      lineHeight: 1.5,
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
      default: '#0F0F0F', // Preto mais puro
      paper: '#1F1F1F', // Cinza mais escuro
    },
    text: {
      primary: '#F0F0F0', // Branco com pouco tom
      secondary: '#C0C0C0', // Cinza claro
    },
    divider: 'rgba(0, 168, 107, 0.2)',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: 'clamp(1.5rem, 8vw, 3.5rem)',
      fontWeight: 700,
      color: '#F0F0F0',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: 'clamp(1.25rem, 6vw, 2.5rem)',
      fontWeight: 700,
      color: '#F0F0F0',
      lineHeight: 1.3,
    },
    h3: {
      fontSize: 'clamp(1rem, 4vw, 1.75rem)',
      fontWeight: 600,
      color: '#F0F0F0',
      lineHeight: 1.4,
    },
    h4: {
      fontSize: 'clamp(0.875rem, 3vw, 1.5rem)',
      fontWeight: 600,
      color: '#F0F0F0',
    },
    h5: {
      fontSize: 'clamp(0.75rem, 2.5vw, 1.25rem)',
      fontWeight: 600,
      color: '#F0F0F0',
    },
    h6: {
      fontSize: 'clamp(0.75rem, 2vw, 1rem)',
      fontWeight: 600,
      color: '#F0F0F0',
    },
    body1: {
      fontSize: 'clamp(0.875rem, 2vw, 1.1rem)',
      color: '#F0F0F0',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
      color: '#C0C0C0',
      lineHeight: 1.5,
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
          borderRadius: '12px',
          backgroundColor: '#1F1F1F',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: '#00D77D',
            boxShadow: '0 8px 24px rgba(0, 168, 107, 0.4)',
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
          backgroundColor: '#0F0F0F',
          color: '#F0F0F0',
          borderBottom: '2px solid #00A86B',
          boxShadow: '0 2px 8px rgba(0, 168, 107, 0.3)',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: 'clamp(1rem, 4vw, 2rem)',
          '@media (max-width: 600px)': {
            paddingLeft: 'clamp(0.5rem, 2vw, 1rem)',
            paddingRight: 'clamp(0.5rem, 2vw, 1rem)',
          },
        },
      },
    },
  },
});

export { lightTheme, darkTheme };
