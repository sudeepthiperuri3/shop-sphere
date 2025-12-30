import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Rating,
  Chip,
  Divider,
  Paper,
  IconButton,
  Skeleton,
  Alert,
  Breadcrumbs,
  Card,
  CardContent,
  Avatar,
  LinearProgress,
} from '@mui/material';
import {
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  ArrowBack,
  Add,
  Remove,
  LocalShipping,
  Verified,
  Refresh,
} from '@mui/icons-material';
import { fetchProductById, fetchProductReviews } from '../../services/api';
import type { Product, Review } from '../../types';
import { useCart } from '../../context/CartContext';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, isInCart, getItemQuantity, updateQuantity } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const inCart = product ? isInCart(product.id) : false;
  const cartQuantity = product ? getItemQuantity(product.id) : 0;

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const [productData, reviewsData] = await Promise.all([
          fetchProductById(parseInt(id, 10)),
          fetchProductReviews(parseInt(id, 10)),
        ]);
        setProduct(productData);
        setReviews(reviewsData);
      } catch (err) {
        setError('Failed to load product details. Please try again later.');
        console.error('Error loading product:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    }
  };

  const handleUpdateCartQuantity = (newQuantity: number) => {
    if (product && newQuantity >= 0) {
      updateQuantity(product.id, newQuantity);
    }
  };

  const calculateRatingDistribution = () => {
    const distribution = [0, 0, 0, 0, 0];
    reviews.forEach((review) => {
      distribution[review.rating - 1]++;
    });
    return distribution.reverse();
  };

  const ratingDistribution = calculateRatingDistribution();

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton variant="text" height={40} />
            <Skeleton variant="text" height={30} width="60%" />
            <Skeleton variant="text" height={60} width="40%" />
            <Skeleton variant="rectangular" height={100} sx={{ mt: 2 }} />
            <Skeleton variant="rectangular" height={50} sx={{ mt: 2 }} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" startIcon={<Refresh />} onClick={() => window.location.reload()}>
              Retry
            </Button>
          }
        >
          {error || 'Product not found'}
        </Alert>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Back to Products
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Home
        </Link>
        <Typography color="text.secondary" sx={{ textTransform: 'capitalize' }}>
          {product.category}
        </Typography>
        <Typography color="text.primary" noWrap sx={{ maxWidth: 200 }}>
          {product.title}
        </Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              p: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
              borderRadius: 2,
              position: 'relative',
            }}
          >
            <IconButton
              sx={{ position: 'absolute', top: 16, right: 16 }}
              onClick={() => setIsFavorite(!isFavorite)}
              color={isFavorite ? 'error' : 'default'}
            >
              {isFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
            <img
              src={product.image}
              alt={product.title}
              style={{
                maxWidth: '100%',
                maxHeight: 400,
                objectFit: 'contain',
              }}
            />
          </Paper>
        </Grid>

        {/* Product Info */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Chip
            label={product.category}
            color="primary"
            size="small"
            sx={{ mb: 2, textTransform: 'capitalize' }}
          />

          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, fontFamily: '"Rajdhani", sans-serif' }}>
            {product.title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Rating value={product.rating.rate} precision={0.1} readOnly />
            <Typography variant="body1" color="text.secondary">
              {product.rating.rate} ({product.rating.count} reviews)
            </Typography>
          </Box>

          <Typography variant="h3" color="primary" sx={{ fontWeight: 700, mb: 3, fontFamily: '"Orbitron", sans-serif' }}>
            ${product.price.toFixed(2)}
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
            {product.description}
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* Quantity Selector */}
          {!inCart ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Typography variant="subtitle1">Quantity:</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Remove />
                </IconButton>
                <Typography sx={{ minWidth: 40, textAlign: 'center' }}>{quantity}</Typography>
                <IconButton size="small" onClick={() => setQuantity(quantity + 1)}>
                  <Add />
                </IconButton>
              </Box>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Typography variant="subtitle1">In Cart:</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => handleUpdateCartQuantity(cartQuantity - 1)}
                >
                  <Remove />
                </IconButton>
                <Typography sx={{ minWidth: 40, textAlign: 'center' }}>{cartQuantity}</Typography>
                <IconButton size="small" onClick={() => handleUpdateCartQuantity(cartQuantity + 1)}>
                  <Add />
                </IconButton>
              </Box>
            </Box>
          )}

          {/* Add to Cart Button */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            {!inCart ? (
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                fullWidth
                sx={{ py: 1.5 }}
              >
                Add to Cart
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                size="large"
                onClick={() => navigate('/cart')}
                fullWidth
                sx={{ py: 1.5 }}
              >
                View Cart ({cartQuantity} items)
              </Button>
            )}
          </Box>

          {/* Features */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocalShipping color="primary" fontSize="small" />
              <Typography variant="body2">Free shipping on orders over $50</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Verified color="success" fontSize="small" />
              <Typography variant="body2">100% authentic products</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Reviews Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
          Customer Reviews
        </Typography>

        <Grid container spacing={4}>
          {/* Rating Summary */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h2" color="primary" sx={{ fontWeight: 700 }}>
                {product.rating.rate}
              </Typography>
              <Rating value={product.rating.rate} precision={0.1} readOnly size="large" />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Based on {product.rating.count} reviews
              </Typography>

              <Box sx={{ mt: 3 }}>
                {[5, 4, 3, 2, 1].map((star, index) => (
                  <Box key={star} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="body2" sx={{ minWidth: 20 }}>
                      {star}★
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(ratingDistribution[index] / reviews.length) * 100 || 0}
                      sx={{ flex: 1, height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ minWidth: 20 }}>
                      {ratingDistribution[index]}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Reviews List */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {reviews.map((review) => (
                <Card key={review.id} sx={{ '&:hover': { transform: 'none' } }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {review.user.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {review.user}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(review.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </Typography>
                      </Box>
                    </Box>
                    <Rating value={review.rating} size="small" readOnly sx={{ mb: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      {review.comment}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Back Button */}
      <Box sx={{ mt: 4 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)}>
          Back to Products
        </Button>
      </Box>
    </Container>
  );
}
