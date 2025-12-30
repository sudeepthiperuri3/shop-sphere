import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Divider,
} from '@mui/material';
import { ShoppingCart, ArrowBack } from '@mui/icons-material';
import { useCart } from '../../context/CartContext';
import { CartItem } from '../../components';

export default function CartPage() {
  const { items, totalItems, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <ShoppingCart sx={{ fontSize: 80, color: 'grey.400' }} />
          <Typography variant="h4" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Looks like you haven't added any products yet.
          </Typography>
          <Button
            component={Link}
            to="/home"
            variant="contained"
            size="large"
            startIcon={<ArrowBack />}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, fontFamily: '"Orbitron", sans-serif' }}>
        Shopping Cart
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4, fontFamily: '"Rajdhani", sans-serif' }}>
        {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4 }}>
        {/* Cart Items */}
        <Box sx={{ flex: 1 }}>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              to="/home"
              variant="outlined"
              startIcon={<ArrowBack />}
            >
              Continue Shopping
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
          </Box>
        </Box>

        {/* Order Summary */}
        <Box sx={{ width: { xs: '100%', lg: 350 } }}>
          <Paper sx={{ p: 3, position: 'sticky', top: 80 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              Order Summary
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography color="text.secondary">Subtotal ({totalItems} items)</Typography>
              <Typography>${totalPrice.toFixed(2)}</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography color="text.secondary">Shipping</Typography>
              <Typography color="success.main">Free</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography color="text.secondary">Tax (estimated)</Typography>
              <Typography>${(totalPrice * 0.08).toFixed(2)}</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Total</Typography>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                ${(totalPrice * 1.08).toFixed(2)}
              </Typography>
            </Box>

            <Button
              component={Link}
              to="/checkout"
              variant="contained"
              size="large"
              fullWidth
              sx={{ py: 1.5 }}
            >
              Proceed to Checkout
            </Button>

            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2, textAlign: 'center' }}>
              Secure checkout powered by ShopSphere
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}
