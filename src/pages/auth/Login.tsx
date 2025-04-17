import { useState } from 'react';
import { Box, Button, TextField, Typography, Link, Container, IconButton, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import precisionHeartIcon from '../../assets/favicon.png';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        backgroundColor: '#ecf9fc',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background circles */}
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
      <Box
        sx={{
          position: 'absolute',
          right: '10%',
          top: '20%',
          width: 200,
          height: 200,
          background: 'repeating-linear-gradient(45deg, #b794f4 0%, transparent 2px)',
          opacity: 0.1,
        }}
      />

      <Container maxWidth="xs">
        <Box
          sx={{
            mt: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Box
              component="img"
              src={precisionHeartIcon}
              alt="Logo"
              sx={{ width: 40, height: 40, borderRadius: '8px', mr: 1 }}
            />
            <Typography variant="h5" 
            sx={{ 
                color: 'primary.main',
                fontWeight: 600, 
                }}
            >
            Precision-Heart
            </Typography>
          </Box>

          <Typography variant="h4" sx={{ mb: 1, color: '#2d3748', fontWeight: 700 }}>
            Welcome back
          </Typography>

          <Box sx={{ width: '100%', mt: 3 }}>

            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/forgetpassword')}
              sx={{ mb: 3, display: 'block', textAlign: 'left', color: 'primary.main' }}
            >
              Forgot password?
            </Link>

            <Button
              fullWidth
              variant="contained"
              sx={{
                mb: 2,
                bgcolor: 'primary.main',
                height: '48px',
              }}
              onClick={() => navigate('/user-type')}
            >
              Log in
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}