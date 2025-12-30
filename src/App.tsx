import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components';
import ProtectedRoute from './components/ProtectedRoute';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import { HomePage, ProductDetailPage, CartPage, CheckoutPage, LoginPage } from './pages';
import theme from './theme';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<WelcomeScreen />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
                      <Box component="main" sx={{ flexGrow: 1, backgroundColor: 'background.default', pb: 10 }}>
                        <Routes>
                          <Route
                            path="/home"
                            element={
                              <HomePage
                                searchQuery={searchQuery}
                                onSearchChange={setSearchQuery}
                              />
                            }
                          />
                          <Route path="/product/:id" element={<ProductDetailPage />} />
                          <Route path="/cart" element={<CartPage />} />
                          <Route path="/checkout" element={<CheckoutPage />} />
                          <Route path="*" element={<Navigate to="/home" replace />} />
                        </Routes>
                      </Box>
                      <Box
                    component="footer"
                    sx={{
                      py: 3,
                      px: 2,
                      mt: 'auto',
                      background: 'rgba(10, 14, 39, 0.8)',
                      backdropFilter: 'blur(20px)',
                      borderTop: '1px solid rgba(25, 118, 210, 0.1)',
                      textAlign: 'center',
                      fontFamily: '"Rajdhani", sans-serif',
                      letterSpacing: '0.05em',
                    }}
                  >
                    © 2025 SHOPSPHERE • NEXT-GEN SHOPPING
                  </Box>
                </Box>
              </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
