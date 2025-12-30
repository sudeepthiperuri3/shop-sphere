import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Divider,
  Alert,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  CreditCard,
  LocalShipping,
  CheckCircle,
  ArrowBack,
} from '@mui/icons-material';
import { useCart } from '../../context/CartContext';
import type { CheckoutFormData } from '../../types';

const steps = ['Shipping', 'Payment', 'Review'];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState<Partial<CheckoutFormData>>({});

  if (items.length === 0 && !orderComplete) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="contained"
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof CheckoutFormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData((prev) => ({ ...prev, cardNumber: formatted }));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value.replace('/', ''));
    setFormData((prev) => ({ ...prev, expiryDate: formatted }));
  };

  const validateShipping = () => {
    const newErrors: Partial<CheckoutFormData> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors: Partial<CheckoutFormData> = {};
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    else if (formData.cardNumber.replace(/\s/g, '').length < 16)
      newErrors.cardNumber = 'Card number must be 16 digits';
    if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
    if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
    else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate))
      newErrors.expiryDate = 'Invalid format (MM/YY)';
    if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
    else if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = 'CVV must be 3-4 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (activeStep === 0 && !validateShipping()) return;
    if (activeStep === 1 && !validatePayment()) return;
    if (activeStep === 2) {
      // Process order
      setOrderComplete(true);
      clearCart();
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const tax = totalPrice * 0.08;
  const total = totalPrice + tax;

  const renderShippingForm = () => (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LocalShipping color="primary" />
        Shipping Information
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            required
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            required
            fullWidth
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            required
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            required
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            error={!!errors.address}
            helperText={errors.address}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            required
            fullWidth
            label="City"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            error={!!errors.city}
            helperText={errors.city}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <TextField
            required
            fullWidth
            label="State"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            error={!!errors.state}
            helperText={errors.state}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <TextField
            required
            fullWidth
            label="ZIP Code"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            error={!!errors.zipCode}
            helperText={errors.zipCode}
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderPaymentForm = () => (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CreditCard color="primary" />
        Payment Information
      </Typography>
      <Alert severity="info" sx={{ mb: 3 }}>
        This is a demo checkout. No real payment will be processed.
      </Alert>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            required
            fullWidth
            label="Card Number"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleCardNumberChange}
            error={!!errors.cardNumber}
            helperText={errors.cardNumber}
            placeholder="1234 5678 9012 3456"
            inputProps={{ maxLength: 19 }}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            required
            fullWidth
            label="Name on Card"
            name="cardName"
            value={formData.cardName}
            onChange={handleInputChange}
            error={!!errors.cardName}
            helperText={errors.cardName}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            required
            fullWidth
            label="Expiry Date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleExpiryChange}
            error={!!errors.expiryDate}
            helperText={errors.expiryDate}
            placeholder="MM/YY"
            inputProps={{ maxLength: 5 }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            required
            fullWidth
            label="CVV"
            name="cvv"
            type="password"
            value={formData.cvv}
            onChange={handleInputChange}
            error={!!errors.cvv}
            helperText={errors.cvv}
            inputProps={{ maxLength: 4 }}
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderReview = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Order Review
      </Typography>

      {/* Shipping Summary */}
      <Card sx={{ mb: 2, '&:hover': { transform: 'none' } }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            Shipping Address
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formData.firstName} {formData.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formData.address}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formData.city}, {formData.state} {formData.zipCode}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formData.email}
          </Typography>
        </CardContent>
      </Card>

      {/* Payment Summary */}
      <Card sx={{ mb: 2, '&:hover': { transform: 'none' } }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            Payment Method
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Card ending in {formData.cardNumber.slice(-4)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formData.cardName}
          </Typography>
        </CardContent>
      </Card>

      {/* Items */}
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
        Order Items ({items.length})
      </Typography>
      {items.map((item) => (
        <Box
          key={item.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            py: 1,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            style={{ width: 50, height: 50, objectFit: 'contain' }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
              {item.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Qty: {item.quantity}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            ${(item.price * item.quantity).toFixed(2)}
          </Typography>
        </Box>
      ))}
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/cart')}
        sx={{ mb: 3 }}
      >
        Back to Cart
      </Button>

      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, fontFamily: '"Orbitron", sans-serif' }}>
        Checkout
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3 }}>
            {activeStep === 0 && renderShippingForm()}
            {activeStep === 1 && renderPaymentForm()}
            {activeStep === 2 && renderReview()}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? 'Place Order' : 'Continue'}
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, position: 'sticky', top: 80 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              Order Summary
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography color="text.secondary">
                Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items)
              </Typography>
              <Typography>${totalPrice.toFixed(2)}</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography color="text.secondary">Shipping</Typography>
              <Typography color="success.main">Free</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography color="text.secondary">Tax</Typography>
              <Typography>${tax.toFixed(2)}</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Total</Typography>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                ${total.toFixed(2)}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Order Complete Dialog */}
      <Dialog open={orderComplete} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', pt: 4 }}>
          <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Order Confirmed!
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Thank you for your purchase! Your order has been placed successfully.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Order confirmation has been sent to {formData.email}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
