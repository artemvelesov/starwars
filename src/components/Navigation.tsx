import { AppBar, Toolbar, Typography, Box, Chip } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Person } from '@mui/icons-material';
import { LocalStorageService } from '../services/localStorageService'

const Navigation = () => {
  const location = useLocation();
  const editedCount = LocalStorageService.getEditedCharactersCount();

  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {editedCount > 0 && (
            <Chip
              icon={<Person />}
              label={`${editedCount} edited`}
              color="secondary"
              size="small"
              sx={{
                fontWeight: 'medium',
                '& .MuiChip-icon': {
                  color: 'inherit',
                },
              }}
            />
          )}

          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            {location.pathname === '/' ? 'Browse Characters' : 'Character Details'}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;