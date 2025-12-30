# ShopSphere - E-Commerce Product Listing App

A rich, user-friendly, and responsive e-commerce product listing application built with React, TypeScript, and Material UI.

![ShopSphere](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![MUI](https://img.shields.io/badge/MUI-6-purple)

## ✨ Features

### Product Listing
- **Product Grid**: Browse products in a responsive grid layout
- **Real API Integration**: Products fetched from [Fake Store API](https://fakestoreapi.com)
- **Loading States**: Skeleton loading animations for better UX

### Filtering & Search
- **Category Filters**: Filter products by category (electronics, jewelery, men's clothing, women's clothing)
- **Price Range Slider**: Filter products within a specific price range
- **Debounced Search**: Search products with 300ms debounce for optimal performance
- **Active Filter Chips**: Visual indicators showing active filters with quick clear options

### Product Details
- **Detailed View**: Full product information including description, price, and category
- **Rating Display**: Star ratings with review count
- **Customer Reviews**: Mock reviews with rating distribution
- **Quantity Selector**: Adjust quantity before adding to cart
- **Favorites**: Mark products as favorites

### Shopping Cart
- **Persistent Cart**: Cart state saved to localStorage
- **Quantity Management**: Update quantities or remove items
- **Order Summary**: Subtotal, shipping, tax calculation
- **Item Count Badge**: Visual indicator in header

### Checkout
- **Multi-step Process**: Shipping → Payment → Review
- **Form Validation**: Real-time validation with error messages
- **Mock Payment**: Demo credit card input with formatting
- **Order Confirmation**: Success dialog on order completion

### Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Mobile Filters**: Bottom sheet filter drawer on mobile
- **Collapsible Navigation**: Hamburger menu for mobile devices

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Material UI (MUI)** - Component library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Vite** - Build tool

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header/         # Navigation header with search
│   ├── ProductCard/    # Product display card
│   ├── FilterSidebar/  # Category & price filters
│   ├── SearchBar/      # Search input component
│   ├── CartItem/       # Cart item row
│   └── ProductSkeleton/# Loading skeleton
├── pages/              # Page components
│   ├── HomePage/       # Product listing page
│   ├── ProductDetailPage/ # Single product view
│   ├── CartPage/       # Shopping cart
│   └── CheckoutPage/   # Checkout flow
├── context/            # React context providers
│   └── CartContext.tsx # Cart state management
├── hooks/              # Custom React hooks
│   └── useDebounce.ts  # Debounce hook for search
├── services/           # API services
│   └── api.ts          # Axios API client
├── types/              # TypeScript types
│   └── index.ts        # Shared type definitions
├── theme/              # MUI theme configuration
│   └── index.ts        # Custom theme
├── App.tsx             # Root component
└── main.tsx            # Entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🎯 What This Proves

This project demonstrates proficiency in:

### Real UI Flows
- Multi-page e-commerce application
- Product browsing and filtering
- Add to cart functionality
- Complete checkout process
- Responsive design patterns

### State Handling
- React Context for global cart state
- Local state for UI components
- Reducer pattern for cart operations
- localStorage persistence

### API Usage
- RESTful API integration with Axios
- Async/await patterns
- Error handling
- Loading states
- Mock data for reviews

## 📄 License

MIT License - feel free to use this project for learning or as a starting point for your own e-commerce app!
