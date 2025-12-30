import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Typography,
  IconButton,
  Badge,
  Box,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';
import {
  ShoppingCart,
  Menu as MenuIcon,
  Home,
  Store,
  Close,
  Logout,
  ExitToApp,
  Person,
} from '@mui/icons-material';
import { alpha, keyframes } from '@mui/material/styles';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import SearchBar from '../SearchBar/SearchBar';

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 10px rgba(25, 118, 210, 0.3); }
  50% { box-shadow: 0 0 20px rgba(25, 118, 210, 0.6), 0 0 30px rgba(25, 118, 210, 0.4); }
`;

interface HeaderProps {
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

export default function Header({ onSearchChange, searchQuery }: HeaderProps) {
  const { totalItems } = useCart();
  const { isAuthenticated, username, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { text: 'Home', icon: <Home />, path: '/home' },
    { text: 'Products', icon: <Store />, path: '/home' },
    { text: 'Cart', icon: <ShoppingCart />, path: '/cart' },
  ];

  const drawer = (
    <Box sx={{ width: 280 }} role="presentation">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
          ShopSphere
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {isAuthenticated && (
          <>
            <ListItem sx={{ py: 2 }}>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText
                primary={username}
                secondary="Signed in"
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItem>
            <Divider />
          </>
        )}
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        {isAuthenticated && (
          <>
            <Divider />
            <ListItem
              onClick={() => {
                handleLogout();
                handleDrawerToggle();
              }}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      {/* Sticky Top Bar with Logo, SearchBar, and Cart */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          background: 'rgba(10, 14, 39, 0.95)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
          py: { xs: 1.5, sm: 2 },
          px: { xs: 2, sm: 4 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: { xs: 1, sm: 2, md: 4 },
            maxWidth: '1600px',
            mx: 'auto',
          }}
        >
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'rotate(90deg)',
                  background: 'rgba(25, 118, 210, 0.2)',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* ShopSphere Logo */}
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/home"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              fontFamily: '"Orbitron", sans-serif',
              background: 'linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'none',
              letterSpacing: '0.05em',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              flexShrink: 0,
              '&:hover': {
                filter: 'brightness(1.2)',
                transform: 'scale(1.05)',
              },
            }}
          >
            SHOPSPHERE
          </Typography>

          {/* SearchBar - Hidden on mobile */}
          {!isMobile && (
            <Box sx={{ flex: 1, maxWidth: 700, mx: 'auto' }}>
              <SearchBar 
                value={searchQuery} 
                onChange={onSearchChange}
                placeholder="Discover products..."
              />
            </Box>
          )}

          {/* Right Side: Cart & Logout */}
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {/* Cart Icon Button */}
            <IconButton
              onClick={() => navigate('/cart')}
              sx={{
                background: 'linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)',
                color: '#fff',
                animation: totalItems > 0 ? `${pulse} 2s ease-in-out infinite` : 'none',
                transition: 'all 0.3s ease',
                flexShrink: 0,
                boxShadow: '0 4px 16px rgba(25, 118, 210, 0.4)',
                '&:hover': {
                  transform: 'scale(1.1)',
                  boxShadow: '0 6px 24px rgba(25, 118, 210, 0.6)',
                  animation: `${glow} 1s ease-in-out infinite`,
                },
              }}
            >
              <Badge
                badgeContent={totalItems}
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    fontFamily: '"Orbitron", sans-serif',
                  },
                }}
              >
                <ShoppingCart />
              </Badge>
            </IconButton>

            {/* Logout Button - Hidden on mobile */}
            {!isMobile && isAuthenticated && (
              <Button
                onClick={handleLogout}
                startIcon={<ExitToApp />}
                sx={{
                  color: '#fff',
                  fontFamily: '"Rajdhani", sans-serif',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  px: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(244, 67, 54, 0.1)',
                    color: '#f44336',
                  },
                }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            background: 'rgba(10, 14, 39, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(25, 118, 210, 0.2)',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
