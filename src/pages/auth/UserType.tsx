import { Box, Container, Typography, Card, CardContent, CardActionArea,  useMediaQuery,
  useTheme, } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from '@mui/icons-material';
import precisionHeartIcon from '../../assets/favicon.png';
import Practitioner from '../../assets/pm.webp';
import Clinician from '../../assets/clinician1.webp';
import Patient from '../../assets/patient.webp';
import Others from '../../assets/others.webp';

export default function UserType() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const userTypes = [
    {
      title: 'For patient',
      description: 'I receive care or health related services',
      image: Patient,
      path: '/patient-getin'
    },
    {
      title: 'For doctors',
      description: 'Provide medical care and consultations',
      image: Clinician,
      path: '/others-getin'
    },
    {
      title: 'For GP',
      description: 'Manage and grow your practice',
      image: Practitioner,
      path: '/others-getin'
    },
    {
      title: 'Others',
      description: 'Engage in diverse healthcare roles',
      image: Others,
      path: '/others-getin'
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        backgroundColor: '#ecf9fc',
        position: 'relative',
        overflow: 'hidden',
        alignItems: "center",
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
          background: 'linear-gradient(135deg,rgba(255, 15, 123, 1) 0%, rgba(255, 255, 255, 1) 100%)',
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

      <Container maxWidth="lg">
      {isMobile && (
        <a href="https://hearthealth.ahimsa.global/" style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 4,
              mt: 4,
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
          <Typography variant="h4" sx={{ mb: 4, color: '#2d3748', fontWeight: 700 }}>
            Which describes you best?
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: 3,
              width: '100%',
            }}
          >
            {userTypes.map((type) => (
              <Card
                key={type.title}
                sx={{
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardActionArea
                  onClick={() => navigate(type.path)}
                  sx={{ height: '100%' }}
                >
                  <CardContent sx={{ height: '100%', p: 3 }}>
                  {!isMobile && (
                    <Box
                      component="img"
                      src={type.image}
                      alt={type.title}
                      sx={{
                        width: '100%',
                        height: 200,
                        objectFit: 'cover',
                        borderRadius: 2,
                        mb: 2,
                      }}
                    ></Box>
                  )}
                    <Typography variant="h6" sx={{ mb: 1, color: '#2d3748' }}>
                      {type.title}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        {type.description}
                      </Typography>
                      <ArrowRight sx={{ color: 'primary.main' }} />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}