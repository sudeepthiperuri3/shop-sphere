import {
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  Divider,
  Paper,
  Button,
  Skeleton,
} from '@mui/material';
import { FilterList, Clear } from '@mui/icons-material';

interface FilterSidebarProps {
  categories: string[];
  selectedCategory: string;
  priceRange: [number, number];
  maxPrice: number;
  onCategoryChange: (category: string) => void;
  onPriceChange: (range: [number, number]) => void;
  onClearFilters: () => void;
  loading?: boolean;
}

export default function FilterSidebar({
  categories,
  selectedCategory,
  priceRange,
  maxPrice,
  onCategoryChange,
  onPriceChange,
  onClearFilters,
  loading = false,
}: FilterSidebarProps) {
  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    onPriceChange(newValue as [number, number]);
  };

  const hasActiveFilters = selectedCategory !== '' || priceRange[0] > 0 || priceRange[1] < maxPrice;

  return (
    <Paper 
      sx={{ 
        p: 3, 
        height: 'fit-content', 
        position: 'sticky', 
        top: 80,
        background: 'rgba(26, 29, 58, 0.6)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(25, 118, 210, 0.2)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterList color="primary" />
          <Typography variant="h6" component="h2">
            Filters
          </Typography>
        </Box>
        {hasActiveFilters && (
          <Button
            size="small"
            startIcon={<Clear />}
            onClick={onClearFilters}
            color="secondary"
          >
            Clear
          </Button>
        )}
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Categories */}
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
        Category
      </Typography>

      {loading ? (
        <Box sx={{ mb: 3 }}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} height={36} sx={{ mb: 0.5 }} />
          ))}
        </Box>
      ) : (
        <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
          <RadioGroup
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <FormControlLabel
              value=""
              control={<Radio size="small" />}
              label="All Categories"
              sx={{ '& .MuiFormControlLabel-label': { textTransform: 'capitalize' } }}
            />
            {categories.map((category) => (
              <FormControlLabel
                key={category}
                value={category}
                control={<Radio size="small" />}
                label={category}
                sx={{ '& .MuiFormControlLabel-label': { textTransform: 'capitalize' } }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}

      <Divider sx={{ mb: 3 }} />

      {/* Price Range */}
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
        Price Range
      </Typography>

      <Box sx={{ px: 1 }}>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={maxPrice}
          valueLabelFormat={(value) => `$${value}`}
          sx={{ mb: 1 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            ${priceRange[0]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${priceRange[1]}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
