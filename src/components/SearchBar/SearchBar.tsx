import { InputBase, IconButton, Paper } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search products...',
}: SearchBarProps) {
  return (
    <Paper
      sx={{
        p: '4px 8px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        background: 'rgba(26, 29, 58, 0.6)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(25, 118, 210, 0.2)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease',
        '&:hover': {
          border: '1px solid rgba(25, 118, 210, 0.4)',
          boxShadow: '0 4px 30px rgba(25, 118, 210, 0.3)',
        },
        '&:focus-within': {
          border: '1px solid rgba(25, 118, 210, 0.6)',
          boxShadow: '0 4px 40px rgba(25, 118, 210, 0.4)',
        },
      }}
    >
      <IconButton sx={{ p: '10px', color: 'primary.main' }} aria-label="search">
        <Search />
      </IconButton>
      <InputBase
        sx={{ 
          ml: 1, 
          flex: 1,
          fontFamily: '"Rajdhani", sans-serif',
          fontSize: '1rem',
          letterSpacing: '0.02em',
        }}
        placeholder={placeholder}
        inputProps={{ 'aria-label': placeholder }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <IconButton
          sx={{ 
            p: '10px',
            transition: 'all 0.2s ease',
            '&:hover': {
              color: 'error.main',
              transform: 'rotate(90deg)',
            },
          }}
          aria-label="clear search"
          onClick={() => onChange('')}
        >
          <Clear />
        </IconButton>
      )}
    </Paper>
  );
}
