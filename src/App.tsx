import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container } from '@mui/material';
import CharactersPage from './pages/CharactersPage';
import CharacterDetailPage from './pages/CharacterDetailPage';
import Navigation from './components/Navigation';
import ErrorBoundary from './components/ErrorBoundary';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFD700',
      light: '#FFEF62',
      dark: '#FFC400',
      contrastText: '#000000',
    },
    secondary: {
      main: '#00D4FF',
      light: '#4DE5FF',
      dark: '#0099CC',
      contrastText: '#000000',
    },
    error: {
      main: '#FF0000',
      light: '#FF4444',
      dark: '#CC0000',
    },
    background: {
      default: '#000000',
      paper: 'rgba(26, 26, 26, 0.95)',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
  },
  typography: {
    fontFamily: '"Orbitron", "Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 900,
      fontSize: '3rem',
      letterSpacing: '2px',
      textShadow: '0 0 10px #FFD700',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.25rem',
      letterSpacing: '1px',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '0.5px',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '0.5px',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '#root': {
          width: '100%',
          maxWidth: 'none',
          margin: 0,
          padding: 0,
        },
        body: {
          background: `
            radial-gradient(ellipse at top, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at bottom, rgba(255, 215, 0, 0.05) 0%, transparent 50%),
            linear-gradient(180deg, #000000 0%, #0a0a0a 100%)
          `,
          minHeight: '100vh',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="0.5" fill="white" opacity="0.8"/><circle cx="80" cy="40" r="0.3" fill="white" opacity="0.6"/><circle cx="40" cy="60" r="0.4" fill="white" opacity="0.7"/><circle cx="70" cy="80" r="0.2" fill="white" opacity="0.5"/><circle cx="10" cy="80" r="0.3" fill="white" opacity="0.6"/><circle cx="90" cy="10" r="0.4" fill="white" opacity="0.8"/><circle cx="30" cy="30" r="0.2" fill="white" opacity="0.5"/><circle cx="60" cy="10" r="0.3" fill="white" opacity="0.7"/><circle cx="85" cy="70" r="0.2" fill="white" opacity="0.6"/><circle cx="15" cy="50" r="0.3" fill="white" opacity="0.7"/></svg>')
            `,
            backgroundSize: '800px 800px',
            opacity: 0.3,
            pointerEvents: 'none',
            zIndex: -1,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(26, 26, 26, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 215, 0, 0.2)',
          borderRadius: '12px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
          fontWeight: 600,
          letterSpacing: '1px',
          borderRadius: '8px',
          transition: 'none',
        },
        contained: {
          boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 215, 0, 0.3)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            background: 'rgba(26, 26, 26, 0.8)',
            '& fieldset': {
              borderColor: 'rgba(255, 215, 0, 0.3)',
            },

            '&.Mui-focused fieldset': {
              borderColor: '#FFD700',
              boxShadow: '0 0 10px rgba(255, 215, 0, 0.3)',
            },
          },
        },
      },
    },
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <ErrorBoundary>
            <Navigation />
            <Container
              maxWidth={false}
              sx={{
                py: 2,
                px: { xs: 2, sm: 3, md: 4 },
                width: '100%',
              }}
            >
              <Routes>
                <Route path="/" element={<CharactersPage />} />
                <Route path="/character/:uid" element={<CharacterDetailPage />} />
                <Route path="*" element={<CharactersPage />} />
              </Routes>
            </Container>
          </ErrorBoundary>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
