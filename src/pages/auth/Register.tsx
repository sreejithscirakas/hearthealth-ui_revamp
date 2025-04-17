import { useState } from 'react';
import { Box, Button, TextField, Typography, Link, Container, IconButton, InputAdornment, Checkbox, FormControlLabel } from '@mui/material';
import { Google, Apple, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import precisionHeartIcon from '../../assets/favicon.png';

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        backgroundColor: '#f8f9ff',
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

      <Container maxWidth="sm">
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
            Let's get started
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 3, color: '#718096' }}>
            and all the work you do! — It's free
          </Typography>

          <Box sx={{ width: '100%', mt: 1 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Google />}
              sx={{ mb: 2, height: '48px', textTransform: 'none' }}
            >
              Sign up with Google
            </Button>

            <Button
              fullWidth
              variant="contained"
              startIcon={<Apple />}
              sx={{
                mb: 3,
                bgcolor: '#000',
                height: '48px',
                textTransform: 'none',
                '&:hover': { bgcolor: '#333' }
              }}
            >
              Sign up with Apple
            </Button>

            <Typography variant="body2" align="center" sx={{ mb: 3, color: '#718096' }}>
              OR
            </Typography>

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
              sx={{ mb: 2 }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  sx={{ '&.Mui-checked': { color: '#6b46c1' } }}
                />
              }
              label={
                <Typography variant="body2" sx={{ color: '#718096' }}>
                  I agree to the{' '}
                  <Link href="#" sx={{ color: '#6b46c1' }}>Terms of Use</Link>
                  {' '}and the{' '}
                  <Link href="#" sx={{ color: '#6b46c1' }}>Privacy Policy</Link>
                  {' '}for my account.
                </Typography>
              }
              sx={{ mb: 3 }}
            />

            <Button
              fullWidth
              variant="contained"
              disabled={!agreed}
              sx={{
                mb: 2,
                bgcolor: '#6b46c1',
                height: '48px',
                '&:hover': { bgcolor: '#553c9a' },
                '&.Mui-disabled': { bgcolor: '#e2e8f0' }
              }}
              onClick={() => navigate('/user-type')}
            >
              Create free account
            </Button>

            <Typography variant="body2" align="center" sx={{ color: '#718096' }}>
              Already have an account?{' '}
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate('/login')}
                sx={{ color: '#6b46c1' }}
              >
                Log in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}