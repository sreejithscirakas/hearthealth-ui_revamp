import { Box, Button, TextField, Typography, Link, Container, useMediaQuery,
  useTheme, } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import precisionHeartIcon from '../../assets/favicon.png';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

export default function Register() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        backgroundColor: '#ecf9fc',
        position: 'relative',
        overflow: 'hidden',
        alignItems:'center'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: -100,
          top: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background:
            "linear-gradient(135deg,rgba(255, 15, 123, 1) 0%, rgba(255, 255, 255, 1) 100%)",
          opacity: 0.2,
        }}
      ></Box>
      <Box
        sx={{
          position: 'absolute',
          right: -100,
          bottom: -100,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'linear-gradient(135deg,rgba(255, 255, 255, 1) 0%, rgba(255, 15, 123, 1) 100%)',
          opacity: 0.1,
        }}
      ></Box>
      {!isMobile && (
        <a href="https://hearthealth.ahimsa.global/" style={{ textDecoration: 'none' }}>
        <Box
          sx={{
            position: "absolute",
            left: 50,
            top: 50,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="img"
              src={precisionHeartIcon}
              alt="Logo"
              sx={{ width: 40, height: 40, mr: 1 }}
            ></Box>
            <Typography
              variant="h5"
              sx={{
                color: "primary.main",
                fontWeight: 600,
              }}
            >
              Precision-Heart
            </Typography>
          </Box>
        </Box>
        </a>
      )}

      <Container maxWidth="xs"
      sx={{
        border: "1px solid rgba(0, 0, 0, 0.12)",
        margin: "0 auto",
        padding: "48px",
        borderRadius: "8px",
        backgroundColor: "#FFFFFF",
      }}>
        {isMobile && (
          <a href="https://hearthealth.ahimsa.global/" style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 4,
            }}
          >
            <Box
              component="img"
              src={precisionHeartIcon}
              alt="Logo"
              sx={{ width: 40, height: 40, mr: 1 }}
            ></Box>
            <Typography
              variant="h5"
              sx={{
                color: "primary.main",
                fontWeight: 600,
              }}
            >
              Precision-Heart
            </Typography>
          </Box>
          </a>
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          

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
            <Box sx={{width:'100%',display:'flex',justifyContent:'center'}}>
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
        </Box>
      </Container>
    </Box>
  );
}