import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';

export default function OthersGetin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
    // Clear error when user types
    if (errors[field as keyof typeof errors]) {
      setErrors({
        ...errors,
        [field]: '',
      });
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add validation logic here
    console.log(formData);
    navigate('/dashboard');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload
      console.log('File selected:', file.name);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f8f9ff',
        py: 4,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          left: -100,
          top: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #b794f4 0%, #9f7aea 100%)',
          opacity: 0.2,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          right: -100,
          bottom: -100,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #b794f4 0%, #9f7aea 100%)',
          opacity: 0.1,
        }}
      />

      <Container maxWidth="sm">
        <Typography variant="h4" sx={{ mb: 4, color: '#ff1493', fontWeight: 700 }}>
          Please fill your basic info
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="First Name"
                required
                value={formData.firstName}
                onChange={handleChange('firstName')}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Last Name"
                value={formData.lastName}
                onChange={handleChange('lastName')}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Email"
                required
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Contact Number"
                value={formData.contactNumber}
                onChange={handleChange('contactNumber')}
                helperText="Format: +1234567890"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange('message')}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<FileUploadRoundedIcon />}
                sx={{ textTransform: 'none' }}
              >
                Upload File (Optional)
                <input
                  type="file"
                  hidden
                  onChange={handleFileUpload}
                />
              </Button>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  bgcolor: '#ff1493',
                  height: '48px',
                  '&:hover': { bgcolor: '#ff1493dd' }
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}