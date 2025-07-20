import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,

  Pagination,
  CircularProgress,
  Alert,

  Chip,
} from '@mui/material';
import { Person } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useCharacters } from '../hooks/useCharacters';
import { LocalStorageService } from '../services/localStorageService'
import type { Character } from '../types/swapi';

const CharactersPage = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1);
    }, 300);
    
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const charactersQuery = useCharacters({
    page,
    search: debouncedSearch.trim() || undefined
  });

  const { data, isLoading, error, isFetching } = charactersQuery;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

    const renderCharacterCard = (character: Character) => {
    const isEdited = LocalStorageService.isCharacterEdited(character.uid);

    return (
      <Card
        key={character.uid}
        component={Link}
        to={`/character/${character.uid}`}
        sx={{
          textDecoration: 'none',
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '280px',

          background: `
            linear-gradient(135deg, 
              rgba(26, 26, 26, 0.95) 0%, 
              rgba(42, 42, 42, 0.85) 50%, 
              rgba(26, 26, 26, 0.95) 100%
            )
          `,
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 215, 0, 0.2)',
          borderRadius: '16px',
          transition: 'all 0.3s ease-in-out',

          '&:hover': {
            background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(42, 42, 42, 0.9) 50%, rgba(26, 26, 26, 0.95) 100%)',
            border: '1px solid rgba(255, 215, 0, 0.6)',
            boxShadow: '0 8px 32px rgba(255, 215, 0, 0.3), 0 0 20px rgba(0, 212, 255, 0.2)',
          },

          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #FFD700, transparent)',
            opacity: 0,
            transition: 'opacity 0.3s ease-in-out',
          },
          '&:hover::before': {
            opacity: 1,
          },


        }}
      >
        {isEdited && (
          <Chip
            label="MODIFIED"
            color="secondary"
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              zIndex: 2,
              fontWeight: 'bold',
              fontSize: '0.75rem',
              background: 'linear-gradient(45deg, #00D4FF, #0099CC)',
              color: '#000',
              '& .MuiChip-icon': {
                color: '#000',
              },
            }}
          />
        )}

        <CardContent sx={{
          flexGrow: 1,
          textAlign: 'center',
          pt: 3,
          pb: 2,
        }}>
          <Box sx={{
            position: 'relative',
            display: 'inline-block',
            mb: 3,
          }}>
            <Box sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(0, 212, 255, 0.1))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid rgba(255, 215, 0, 0.3)',
              margin: '0 auto',
            }}>
              <Person sx={{
                fontSize: 40,
                color: 'primary.main',
                filter: 'drop-shadow(0 0 5px rgba(255, 215, 0, 0.5))',
              }} />
            </Box>
          </Box>

          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              fontSize: '1.1rem',
              mb: 2,
              background: 'linear-gradient(45deg, #FFFFFF, #B0B0B0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {character.name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: '0.85rem',
              fontStyle: 'italic',
              opacity: 0.8,
            }}
          >
            Click anywhere to view details
          </Typography>
        </CardContent>


      </Card>
    );
  };

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Error loading characters: {(error as Error)?.message || 'Unknown error'}
      </Alert>
    );
  }

  return (
    <Box>
      <Box sx={{
        textAlign: 'center',
        mb: 6,
        position: 'relative',
        py: 4,
      }}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
          <img 
            src="https://cdn.freebiesupply.com/logos/large/2x/star-wars-logo-png-transparent.png" 
            alt="Star Wars" 
            style={{
              height: '100px',
              width: 'auto',
              filter: 'invert(1) drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))',
            }}
          />
        </Box>
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            fontSize: '1.5rem',
            mb: 2,
            color: 'primary.main',
            textShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
          }}
        >
          CHARACTERS
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            fontStyle: 'italic',
            letterSpacing: '1px',
            opacity: 0.9,
          }}
        >
          Explore the galaxy far, far away...
        </Typography>

        <Box sx={{
          width: '100px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #FFD700, transparent)',
          margin: '20px auto',
        }} />
      </Box>

      <Box sx={{ mb: 6, display: 'flex', justifyContent: 'center' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search characters by name..."
          value={searchQuery}
          onChange={handleSearchChange}
 
          sx={{
            maxWidth: '600px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              fontSize: '1.1rem',
              padding: '4px 8px',
              background: 'rgba(26, 26, 26, 0.9)',
              backdropFilter: 'blur(10px)',
              transition: 'none',
            },
            '& input': {
              padding: '16px 8px',
              fontSize: '1.1rem',
              fontWeight: 500,
            },
          }}
        />
      </Box>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress size={60} />
        </Box>
      )}

      {data && (
        <Box>
          <Box sx={{
            mb: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}>
            <Box sx={{
              background: 'rgba(26, 26, 26, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 215, 0, 0.2)',
              borderRadius: '8px',
              padding: '8px 16px',
            }}>
              <Typography
                variant="body1"
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                }}
              >
                {debouncedSearch
                  ? `Found ${data.total_records} results for "${debouncedSearch}"`
                  : `Showing ${data.results.length} of ${data.total_records} characters`
                }
              </Typography>
            </Box>
            {isFetching && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress
                  size={20}
                  sx={{ color: 'primary.main' }}
                />
                <Typography variant="body2" color="primary.main">
                  Loading...
                </Typography>
              </Box>
            )}
          </Box>

          {data.results.length > 0 ? (
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
                xl: 'repeat(5, 1fr)'
              },
              gap: { xs: 2, sm: 3, md: 4 },
              justifyItems: 'center',
              '& > *': {
                width: '100%',
                maxWidth: '300px',
              }
            }}>
              {data.results.map(renderCharacterCard)}
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" gutterBottom>
                No characters found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your search query
              </Typography>
            </Box>
          )}

          {data.total_pages > 1 && (
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 6,
              pt: 4,
              borderTop: '1px solid rgba(255, 215, 0, 0.2)',
            }}>
              <Box sx={{
                background: 'rgba(26, 26, 26, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 215, 0, 0.2)',
                borderRadius: '12px',
                padding: '12px 20px',
              }}>
                <Pagination
                  count={data.total_pages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      fontSize: '1rem',
                      fontWeight: 600,
                      minWidth: '40px',
                      height: '40px',
                      margin: '0 2px',
                      borderRadius: '8px',
                      transition: 'none',
                      border: '1px solid rgba(255, 215, 0, 0.2)',
                      '&.Mui-selected': {
                        background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                        color: '#000',
                        fontWeight: 700,
                      },
                    },
                  }}
                />
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default CharactersPage;