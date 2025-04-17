import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';

const doctors = [
  { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiologist' },
  { id: 2, name: 'Dr. Michael Chen', specialty: 'Heart Surgeon' },
  { id: 3, name: 'Dr. Emily Brown', specialty: 'Cardiologist' },
];

const genders = ['Male', 'Female', 'Other', 'Prefer not to say'];

export default function PatientGetin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: null,
    age: '',
    gender: '',
    email: '',
    phone: '',
    gp1Name: '',
    gp1Email: '',
    gp1Phone: '',
    gp2Name: '',
    gp2Email: '',
    gp2Phone: '',
    story: '',
    preferredDate: null,
    preferredTime: null,
    preferredDoctor: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field: string) => (event: any) => {
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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

        <Container maxWidth="md">
          <Typography variant="h4" sx={{ mb: 4, color: '#ff1493', fontWeight: 700 }}>
            Please fill your basic info
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm:6 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  required
                  value={formData.firstName}
                  onChange={handleChange('firstName')}
                  
                />
              </Grid>

              <Grid size={{ xs: 12, sm:6 }}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleChange('lastName')}
                />
              </Grid>

              <Grid size={{ xs: 12, sm:6 }}>
                <DatePicker
                  label="Date of Birth"
                  value={formData.dob}
                  onChange={(newValue) => handleChange('dob')({ target: { value: newValue } })}
                  sx={{ width: '100%' }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm:6 }}>
                <TextField
                  fullWidth
                  label="Age"
                  value={formData.age}
                  onChange={handleChange('age')}
                />
              </Grid>

              <Grid size={{ xs: 12, sm:6 }}>
                <FormControl fullWidth required>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    value={formData.gender}
                    label="Gender"
                    onChange={handleChange('gender')}
                  >
                    {genders.map((gender) => (
                      <MenuItem key={gender} value={gender}>
                        {gender}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm:6 }}>
                <TextField
                  fullWidth
                  label="Email"
                  required
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  
                />
              </Grid>

              <Grid size={{ xs: 12, sm:6 }}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={formData.phone}
                  onChange={handleChange('phone')}
                  helperText="Format: +1234567890"
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
                  General practitioner
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm:4 }}>
                <TextField
                  fullWidth
                  label="Name"
                  value={formData.gp1Name}
                  onChange={handleChange('gp1Name')}
                />
              </Grid>

              <Grid size={{ xs: 12, sm:4 }}>
                <TextField
                  fullWidth
                  label="Email"
                  value={formData.gp1Email}
                  onChange={handleChange('gp1Email')}
                />
              </Grid>

              <Grid size={{ xs: 12, sm:4 }}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={formData.gp1Phone}
                  onChange={handleChange('gp1Phone')}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
                  Additional practitioner (optional)
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm:4 }}>
                <TextField
                  fullWidth
                  label="Name"
                  value={formData.gp2Name}
                  onChange={handleChange('gp2Name')}
                />
              </Grid>

              <Grid size={{ xs: 12, sm:4 }}>
                <TextField
                  fullWidth
                  label="Email"
                  value={formData.gp2Email}
                  onChange={handleChange('gp2Email')}
                />
              </Grid>

              <Grid size={{ xs: 12, sm:4 }}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={formData.gp2Phone}
                  onChange={handleChange('gp2Phone')}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Questions / Story"
                  multiline
                  rows={4}
                  value={formData.story}
                  onChange={handleChange('story')}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Do you wish to speak with a heart health specialist?
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm:4 }}>
                <DatePicker
                  label="Preferred Date"
                  value={formData.preferredDate}
                  onChange={(newValue) => handleChange('preferredDate')({ target: { value: newValue } })}
                  sx={{ width: '100%' }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm:4 }}>
                <TimePicker
                  label="Preferred Time"
                  value={formData.preferredTime}
                  onChange={(newValue) => handleChange('preferredTime')({ target: { value: newValue } })}
                  sx={{ width: '100%' }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm:4 }}>
                <FormControl fullWidth>
                  <InputLabel>Preferred Doctor</InputLabel>
                  <Select
                    value={formData.preferredDoctor}
                    label="Preferred Doctor"
                    onChange={handleChange('preferredDoctor')}
                  >
                    {doctors.map((doctor) => (
                      <MenuItem key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialty}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
    </LocalizationProvider>
  );
}