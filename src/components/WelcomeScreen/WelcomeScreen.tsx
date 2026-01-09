import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container, Fade, Zoom, Slide } from '@mui/material';
import { ShoppingBag, Rocket, TrendingUp, LocalShipping } from '@mui/icons-material';
import { keyframes } from '@mui/system';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(25, 118, 210, 0.4); }
  50% { box-shadow: 0 0 40px rgba(25, 118, 210, 0.8), 0 0 60px rgba(25, 118, 210, 0.6); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export default function WelcomeScreen() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const handleEnter = () => {
    navigate('/login');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a1d3a 50%, #0f1628 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 50%, rgba(25, 118, 210, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(156, 39, 176, 0.1) 0%, transparent 50%)
          `,
          animation: `${pulse} 8s ease-in-out infinite`,
        },
      }}
    >
      {/* Animated background particles */}
      {[...Array(20)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            borderRadius: '50%',
            background: 'rgba(25, 118, 210, 0.5)',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `${float} ${Math.random() * 3 + 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Fade in={show} timeout={1000}>
          <Box sx={{ textAlign: 'center' }}>
            {/* Logo Icon */}
            <Zoom in={show} timeout={1200}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)',
                  mb: 4,
                  animation: `${rotate} 20s linear infinite, ${glow} 2s ease-in-out infinite`,
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: -3,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)',
                    filter: 'blur(10px)',
                    opacity: 0.5,
                  },
                }}
              >
                <ShoppingBag sx={{ fontSize: 60, color: 'white', position: 'relative', zIndex: 1 }} />
              </Box>
            </Zoom>

            {/* App Name */}
            <Slide direction="down" in={show} timeout={1000}>
              <Typography
                variant="h1"
                sx={{
                  fontFamily: '"Orbitron", "Roboto", sans-serif',
                  fontWeight: 900,
                  fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
                  background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 50%, #9c27b0 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% auto',
                  animation: `${shimmer} 3s linear infinite`,
                  mb: 2,
                  letterSpacing: '0.05em',
                  textShadow: '0 0 30px rgba(25, 118, 210, 0.3)',
                }}
              >
                SHOPSPHERE
              </Typography>
            </Slide>

            {/* Tagline */}
            <Fade in={show} timeout={1500}>
              <Typography
                variant="h5"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontFamily: '"Rajdhani", "Roboto", sans-serif',
                  fontWeight: 300,
                  fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                  mb: 1,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                Next-Gen Shopping Experience
              </Typography>
            </Fade>

            {/* Feature Icons */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 4,
                my: 4,
                flexWrap: 'wrap',
              }}
            >
              {[
                { icon: <Rocket />, label: 'Fast' },
                { icon: <TrendingUp />, label: 'Trending' },
                { icon: <LocalShipping />, label: 'Free Ship' },
              ].map((feature, index) => (
                <Fade key={feature.label} in={show} timeout={1500 + index * 200}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '12px',
                        background: 'rgba(25, 118, 210, 0.1)',
                        border: '1px solid rgba(25, 118, 210, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        animation: `${float} ${3 + index}s ease-in-out infinite`,
                        '&:hover': {
                          background: 'rgba(25, 118, 210, 0.2)',
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 30px rgba(25, 118, 210, 0.3)',
                        },
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontFamily: '"Rajdhani", sans-serif',
                        textTransform: 'uppercase',
                        fontSize: '0.75rem',
                        letterSpacing: '0.1em',
                      }}
                    >
                      {feature.label}
                    </Typography>
                  </Box>
                </Fade>
              ))}
            </Box>

            {/* Enter Button */}
            <Zoom in={show} timeout={2000}>
              <Button
                variant="contained"
                size="large"
                onClick={handleEnter}
                sx={{
                  mt: 4,
                  px: 6,
                  py: 2,
                  fontSize: '1.25rem',
                  fontFamily: '"Orbitron", sans-serif',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  borderRadius: '50px',
                  background: 'linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)',
                  boxShadow: '0 10px 40px rgba(25, 118, 210, 0.4)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    transition: 'left 0.5s ease',
                  },
                  '&:hover': {
                    transform: 'scale(1.05) translateY(-2px)',
                    boxShadow: '0 15px 50px rgba(25, 118, 210, 0.6)',
                    '&::before': {
                      left: '100%',
                    },
                  },
                  '&:active': {
                    transform: 'scale(0.98)',
                  },
                }}
              >
                ENTER SPHERE
              </Button>
            </Zoom>


          </Box>
        </Fade>
      </Container>
    </Box>
  );
}
