import {
  Box,
  Card,
  CardMedia,
  Typography,
  IconButton,
  TextField,
} from '@mui/material';
import { Delete, Add, Remove } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import type { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        mb: 2,
        p: 2,
        '&:hover': {
          transform: 'none',
        },
      }}
    >
      <Link to={`/product/${item.id}`}>
        <CardMedia
          component="img"
          sx={{
            width: { xs: '100%', sm: 120 },
            height: { xs: 150, sm: 120 },
            objectFit: 'contain',
            backgroundColor: '#fff',
            borderRadius: 1,
          }}
          image={item.image}
          alt={item.title}
        />
      </Link>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          ml: { xs: 0, sm: 2 },
          mt: { xs: 2, sm: 0 },
        }}
      >
        <Typography
          component={Link}
          to={`/product/${item.id}`}
          variant="h6"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            '&:hover': { color: 'primary.main' },
            fontSize: { xs: '1rem', sm: '1.1rem' },
          }}
        >
          {item.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
          {item.category}
        </Typography>

        <Typography variant="h6" color="primary" sx={{ fontWeight: 700, mt: 'auto' }}>
          ${item.price.toFixed(2)}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'row', sm: 'column' },
          alignItems: 'center',
          justifyContent: { xs: 'space-between', sm: 'center' },
          mt: { xs: 2, sm: 0 },
          gap: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            size="small"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <Remove fontSize="small" />
          </IconButton>
          <TextField
            size="small"
            value={item.quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (!isNaN(val) && val >= 1) {
                handleQuantityChange(val);
              }
            }}
            inputProps={{
              min: 1,
              style: { textAlign: 'center', width: 40 },
            }}
          />
          <IconButton size="small" onClick={() => handleQuantityChange(item.quantity + 1)}>
            <Add fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, minWidth: 80, textAlign: 'right' }}>
            ${(item.price * item.quantity).toFixed(2)}
          </Typography>
          <IconButton color="error" onClick={() => removeFromCart(item.id)} aria-label="remove item">
            <Delete />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}
