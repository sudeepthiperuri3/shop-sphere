import { useState, useEffect, useMemo } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Alert,
  useTheme,
  useMediaQuery,
  Drawer,
  IconButton,
  Fab,
  Chip,
} from '@mui/material';
import { FilterList, Close } from '@mui/icons-material';
import { ProductCard, FilterSidebar, SearchBar, ProductSkeleton } from '../../components';
import { fetchProducts, fetchCategories } from '../../services/api';
import type { Product } from '../../types';
import { useDebounce } from '../../hooks/useDebounce';

interface HomePageProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function HomePage({ searchQuery, onSearchChange }: HomePageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const debouncedSearch = useDebounce(searchQuery, 300);

  // Fetch products and categories
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        
        setProducts(productsData);
        setCategories(categoriesData);
        
        // Set max price based on products
        const maxPrice = Math.ceil(Math.max(...productsData.map((p) => p.price)));
        setPriceRange([0, maxPrice]);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter products based on search, category, and price
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        debouncedSearch === '' ||
        product.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        product.description.toLowerCase().includes(debouncedSearch.toLowerCase());

      const matchesCategory =
        selectedCategory === '' || product.category === selectedCategory;

      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, debouncedSearch, selectedCategory, priceRange]);

  const maxPrice = useMemo(() => {
    if (products.length === 0) return 1000;
    return Math.ceil(Math.max(...products.map((p) => p.price)));
  }, [products]);

  const handleClearFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, maxPrice]);
    onSearchChange('');
  };

  const activeFiltersCount = [
    selectedCategory !== '',
    priceRange[0] > 0 || priceRange[1] < maxPrice,
    debouncedSearch !== '',
  ].filter(Boolean).length;

  const filterSidebar = (
    <FilterSidebar
      categories={categories}
      selectedCategory={selectedCategory}
      priceRange={priceRange}
      maxPrice={maxPrice}
      onCategoryChange={setSelectedCategory}
      onPriceChange={setPriceRange}
      onClearFilters={handleClearFilters}
      loading={loading}
    />
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4, mt: 0 }}>
      {/* Mobile Search Bar (shown only on mobile) */}
      {isMobile && (
        <Box sx={{ mb: 3 }}>
          <SearchBar 
            value={searchQuery} 
            onChange={onSearchChange}
            placeholder="Discover products..."
          />
        </Box>
      )}

      {/* Results Info */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <Typography variant="body2" color="text.secondary">
          {loading ? 'Loading...' : `${filteredProducts.length} products found`}
        </Typography>
        {selectedCategory && (
          <Chip
            label={selectedCategory}
            size="small"
            onDelete={() => setSelectedCategory('')}
            sx={{ textTransform: 'capitalize' }}
          />
        )}
        {debouncedSearch && (
          <Chip
            label={`Search: "${debouncedSearch}"`}
            size="small"
            onDelete={() => onSearchChange('')}
          />
        )}
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Desktop Filter Sidebar */}
        {!isMobile && (
          <Grid size={{ xs: 12, md: 3, lg: 2.5 }}>
            {filterSidebar}
          </Grid>
        )}

        {/* Products Grid */}
        <Grid size={{ xs: 12, md: 9, lg: 9.5 }}>
          <Grid container spacing={3}>
            {loading ? (
              <ProductSkeleton count={8} />
            ) : filteredProducts.length === 0 ? (
              <Grid size={{ xs: 12 }}>
                <Box
                  sx={{
                    textAlign: 'center',
                    py: 8,
                    px: 2,
                    backgroundColor: 'background.paper',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    No products found
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    Try adjusting your search or filter criteria
                  </Typography>
                  <Chip
                    label="Clear all filters"
                    onClick={handleClearFilters}
                    color="primary"
                    variant="outlined"
                  />
                </Box>
              </Grid>
            ) : (
              filteredProducts.map((product) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </Grid>

      {/* Mobile Filter FAB */}
      {isMobile && (
        <Fab
          color="primary"
          aria-label="filter"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          onClick={() => setMobileFilterOpen(true)}
        >
          <Box sx={{ position: 'relative' }}>
            <FilterList />
            {activeFiltersCount > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  backgroundColor: 'error.main',
                  color: 'white',
                  fontSize: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {activeFiltersCount}
              </Box>
            )}
          </Box>
        </Fab>
      )}

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="right"
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
      >
        <Box sx={{ width: 300, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Filters</Typography>
            <IconButton onClick={() => setMobileFilterOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          {filterSidebar}
        </Box>
      </Drawer>
    </Container>
  );
}
