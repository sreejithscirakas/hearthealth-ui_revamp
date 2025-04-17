import { Box, Button, TextField, Typography, Link, Container, } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import precisionHeartIcon from '../../assets/favicon.png';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

export default function Register() {
  const navigate = useNavigate();

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
            Reset Password
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2, color: '#718096',textAlign:'center' }}>
          Enter your email address and we'll send you instructions to reset your password
          </Typography>

          <Box sx={{ width: '100%', mt: 2 }}>

            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              sx={{ mb: 3 }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{
                mb: 2,
                bgcolor: 'primary.main',
                height: '48px',
              }}
            >
              Submit
            </Button>
            <Link
                component="button"
                variant="body2"
                onClick={() => navigate('/login')}
                sx={{ color: 'primary.main',display:'flex',alignItems:'center' }}
              >
                <ArrowBackIosNewRoundedIcon sx={{fontSize:'14px',marginRight:'5px'}}/> Back Log in
              </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}