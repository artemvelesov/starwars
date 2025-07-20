import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Chip,
  Divider,
  IconButton,
  Snackbar,
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  Save,
  Cancel,
  Person,
  CheckCircle,
} from '@mui/icons-material';
import { useCharacterDetails } from '../hooks/useCharacters';
import { LocalStorageService } from '../services/localStorageService'
import type { EditableCharacterData } from '../types/swapi';

const CharacterDetailPage = () => {
  const { uid } = useParams<{ uid: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [editedData, setEditedData] = useState<EditableCharacterData | null>(null);

  const { data, isLoading, error } = useCharacterDetails(uid!);

  const characterDetails = data?.result?.properties;
  const isEdited = uid ? LocalStorageService.isCharacterEdited(uid) : false;
  const storedData = uid ? LocalStorageService.getStoredCharacter(uid) : null;

  useEffect(() => {
    if (characterDetails && !editedData) {
      const initialData: EditableCharacterData = storedData || {
        name: characterDetails.name,
        height: characterDetails.height,
        mass: characterDetails.mass,
        hair_color: characterDetails.hair_color,
        skin_color: characterDetails.skin_color,
        eye_color: characterDetails.eye_color,
        birth_year: characterDetails.birth_year,
        gender: characterDetails.gender,
      };
      setEditedData(initialData);
    }
  }, [characterDetails, editedData, storedData]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (characterDetails) {
      const resetData: EditableCharacterData = storedData || {
        name: characterDetails.name,
        height: characterDetails.height,
        mass: characterDetails.mass,
        hair_color: characterDetails.hair_color,
        skin_color: characterDetails.skin_color,
        eye_color: characterDetails.eye_color,
        birth_year: characterDetails.birth_year,
        gender: characterDetails.gender,
      };
      setEditedData(resetData);
    }
    setIsEditing(false);
  };

  const handleSave = () => {
    if (editedData && uid) {
      try {
        LocalStorageService.saveCharacter(uid, editedData);
        setIsEditing(false);
        setShowSaveSuccess(true);
      } catch (error) {
  
      }
    }
  };

  const handleFieldChange = (field: keyof EditableCharacterData, value: string) => {
    if (editedData) {
      setEditedData({
        ...editedData,
        [field]: value,
      });
    }
  };

  const renderField = (
    label: string,
    field: keyof EditableCharacterData,
  ) => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {label}
      </Typography>
      {isEditing ? (
        <TextField
          fullWidth
          value={editedData?.[field] || ''}
          onChange={(e) => handleFieldChange(field, e.target.value)}
          variant="outlined"
          size="small"
        />
      ) : (
        <Typography variant="body1">
          {editedData?.[field] || 'N/A'}
        </Typography>
      )}
    </Box>
  );

  if (error) {
    return (
      <Box>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
          sx={{ mb: 2 }}
        >
          Back to Characters
        </Button>
        <Alert severity="error">
          Error loading character: {(error as Error)?.message || 'Unknown error'}
        </Alert>
      </Box>
    );
  }

  if (isLoading || !editedData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/')} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h4">
              {editedData.name}
            </Typography>
            {isEdited && (
              <Chip
                icon={<Edit />}
                label="Locally Modified"
                color="secondary"
                size="small"
              />
            )}
          </Box>
          <Typography variant="body2" color="text.secondary">
            Character Details {isEditing ? '(Editing Mode)' : ''}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {isEditing ? (
            <>
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleSave}
                color="primary"
              >
                Save Changes
              </Button>
              <Button
                variant="outlined"
                startIcon={<Cancel />}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              startIcon={<Edit />}
              onClick={handleEdit}
            >
              Edit Character
            </Button>
          )}
        </Box>
      </Box>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Person sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
            <Typography variant="h5">Character Information</Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            {renderField('Name', 'name')}
            {renderField('Height', 'height')}
            {renderField('Mass', 'mass')}
            {renderField('Hair Color', 'hair_color')}
            {renderField('Skin Color', 'skin_color')}
            {renderField('Eye Color', 'eye_color')}
            {renderField('Birth Year', 'birth_year')}
            {renderField('Gender', 'gender')}
          </Box>

          {characterDetails && (
            <>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" gutterBottom>
                Additional Information
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Films Count
                  </Typography>
                  <Typography variant="body1">
                    {characterDetails.films?.length || 0}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Vehicles Count
                  </Typography>
                  <Typography variant="body1">
                    {characterDetails.vehicles?.length || 0}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Starships Count
                  </Typography>
                  <Typography variant="body1">
                    {characterDetails.starships?.length || 0}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Species Count
                  </Typography>
                  <Typography variant="body1">
                    {characterDetails.species?.length || 0}
                  </Typography>
                </Box>
              </Box>
            </>
          )}
        </CardContent>
      </Card>

      <Snackbar
        open={showSaveSuccess}
        autoHideDuration={4000}
        onClose={() => setShowSaveSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowSaveSuccess(false)}
          severity="success"
          sx={{ width: '100%' }}
          icon={<CheckCircle />}
        >
          Character data saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CharacterDetailPage;