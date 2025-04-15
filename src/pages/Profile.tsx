import { useState, useRef, ChangeEvent } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  Input,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FileUploadIcon from '@mui/icons-material/FileUpload';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  photo?: string;
}

const initialProfile: UserProfile = {
  firstName: 'John',
  lastName: 'Deo',
  email: 'johndeo@gmail.com',
  phone: '+91 38485839575',
  password: '********',
};

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof UserProfile) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setProfile((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handlePhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log('Saving profile:', profile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfile(initialProfile);
    setPreviewUrl('');
    setIsEditing(false);
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  return (
    <Box
      sx={{
        padding: { xs: '10px 20px 60px 20px', md: '0px 25px' },
        height: 'calc(100vh - 56px)',
        overflowY: 'auto',
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>
          My Profile
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 4 }}>
        <Typography
          variant="body1"
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          Personal details
          <Button
            variant="outlined"
            endIcon={<EditIcon />}
            onClick={() => setIsEditing(!isEditing)}
            
          >
          Edit
          </Button>
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          maxWidth: '100%',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={previewUrl || profile.photo}
              sx={{
                width: 100,
                height: 100,
                bgcolor: 'primary.main',
                fontSize: '2.5rem',
              }}
            >
              {getInitials(profile.firstName, profile.lastName)}
            </Avatar>
            {isEditing && (
              <>
                <Input
                  type="file"
                  inputRef={fileInputRef}
                  onChange={handlePhotoUpload}
                  sx={{ display: 'none' }}
                  inputProps={{ accept: 'image/*' }}
                />
                <IconButton
                  onClick={() => fileInputRef.current?.click()}
                  sx={{
                    position: 'absolute',
                    bottom: -4,
                    right: -4,
                    backgroundColor: 'white',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    },
                  }}
                >
                  <FileUploadIcon />
                </IconButton>
              </>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '2fr', md: 'repeat(3, 1fr)' },
            gap: 5,
          }}
        >
          <TextField
            label="First Name"
            value={profile.firstName}
            onChange={handleInputChange('firstName')}
            disabled={!isEditing}
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: '#000',
                color: '#000',
              },
              '& .MuiOutlinedInput-root.Mui-disabled': {
                '& > fieldset': { borderColor: '#E0E0E0' },
              },
              '& .MuiInputLabel-root.Mui-disabled': {
                color: 'rgba(0, 0, 0, 0.6)',
              },
            }}
          />
          <TextField
            label="Last Name"
            value={profile.lastName}
            onChange={handleInputChange('lastName')}
            disabled={!isEditing}
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: '#000',
                color: '#000',
              },
              '& .MuiOutlinedInput-root.Mui-disabled': {
                '& > fieldset': { borderColor: '#E0E0E0' },
              },
              '& .MuiInputLabel-root.Mui-disabled': {
                color: 'rgba(0, 0, 0, 0.6)',
              },
            }}
          />

          <TextField
            label="Email"
            value={profile.email}
            onChange={handleInputChange('email')}
            disabled={!isEditing}
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: '#000',
                color: '#000',
              },
              '& .MuiOutlinedInput-root.Mui-disabled': {
                '& > fieldset': { borderColor: '#E0E0E0' },
              },
              '& .MuiInputLabel-root.Mui-disabled': {
                color: 'rgba(0, 0, 0, 0.6)',
              },
            }}
          />

          <TextField
            label="Phone Number"
            value={profile.phone}
            onChange={handleInputChange('phone')}
            disabled={!isEditing}
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: '#000',
                color: '#000',
              },
              '& .MuiOutlinedInput-root.Mui-disabled': {
                '& > fieldset': { borderColor: '#E0E0E0' },
              },
              '& .MuiInputLabel-root.Mui-disabled': {
                color: 'rgba(0, 0, 0, 0.6)',
              },
            }}
          />

          <TextField
            label="Password"
            type="password"
            value={profile.password}
            onChange={handleInputChange('password')}
            disabled={!isEditing}
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: '#000',
                color: '#000',
              },
              '& .MuiOutlinedInput-root.Mui-disabled': {
                '& > fieldset': { borderColor: '#E0E0E0' },
              },
              '& .MuiInputLabel-root.Mui-disabled': {
                color: 'rgba(0, 0, 0, 0.6)',
              },
            }}
          />
        </Box>
        {isEditing && (
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{ textTransform: 'none' }}
            >
              Save Changes
            </Button>
            <Button
              variant="outlined"
              onClick={handleCancel}
              sx={{ textTransform: 'none' }}
            >
              Cancel
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}