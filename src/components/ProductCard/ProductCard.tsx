import { Link } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Rating,
  Box,
  Chip,
  IconButton,
} from '@mui/material';
import { AddShoppingCart, RemoveShoppingCart } from '@mui/icons-material';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, removeFromCart, isInCart, getItemQuantity } = useCart();
  const inCart = isInCart(product.id);
  const quantity = getItemQuantity(product.id);

  const handleCartAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(25, 118, 210, 0.1), transparent)',
          transition: 'left 0.5s ease',
        },
        '&:hover::before': {
          left: '100%',
        },
      }}
    >
      <Box 
        sx={{ 
          position: 'relative',
          height: 250,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          overflow: 'hidden',
        }}
      >
        <Link 
          to={`/product/${product.id}`} 
          style={{ 
            textDecoration: 'none',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
        >
          <CardMedia
            component="img"
            image={product.image}
            alt={product.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              maxHeight: 220,
            }}
          />
        </Link>
        <Chip
          label={product.category}
          size="small"
          color="primary"
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            textTransform: 'capitalize',
          }}
        />
        {inCart && (
          <Chip
            label={`${quantity} in cart`}
            size="small"
            color="success"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          />
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              minHeight: '3.6em',
              lineHeight: '1.8em',
              fontSize: '1rem',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            {product.title}
          </Typography>
        </Link>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
          <Rating value={product.rating.rate} precision={0.1} size="small" readOnly />
          <Typography variant="body2" color="text.secondary">
            ({product.rating.count})
          </Typography>
        </Box>

        <Typography variant="h5" color="primary" sx={{ fontWeight: 700, fontFamily: '"Orbitron", sans-serif' }}>
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button
          component={Link}
          to={`/product/${product.id}`}
          size="small"
          variant="outlined"
        >
          View Details
        </Button>
        <IconButton
          color={inCart ? 'error' : 'primary'}
          onClick={handleCartAction}
          aria-label={inCart ? 'remove from cart' : 'add to cart'}
        >
          {inCart ? <RemoveShoppingCart /> : <AddShoppingCart />}
        </IconButton>
      </CardActions>
    </Card>
  );
}
