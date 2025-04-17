import { Box, Container, Typography, Card, CardContent, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from '@mui/icons-material';
import precisionHeartIcon from '../../assets/favicon.png';

export default function UserType() {
  const navigate = useNavigate();

  const userTypes = [
    {
      title: 'For practitioners',
      description: 'Manage and grow your practice',
      image: 'https://media.istockphoto.com/id/1215265825/photo/analyzing-medical-notes.jpg?s=612x612&w=0&k=20&c=yb5JEW0FzwDuc8fKBVE9AXkosXoiG7n_xPpkcYuph7w=',
      path: '/others-getin'
    },
    {
      title: 'For doctors',
      description: 'Provide medical care and consultations',
      image: 'https://www.vmcdn.ca/f/files/shared/health/nurse-adobestock_320982994.jpeg;w=960',
      path: '/others-getin'
    },
    {
      title: 'For patient',
      description: 'I receive care or health related services',
      image: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=200&auto=format&fit=crop',
      path: '/patient-getin'
    },
    {
      title: 'Others',
      description: 'I receive care or health related services',
      image: 'https://cdn-icons-png.flaticon.com/512/9596/9596156.png',
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

      <Container maxWidth="lg">
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

          <Typography variant="h4" sx={{ mb: 4, color: '#2d3748', fontWeight: 700 }}>
            Which describes you best?
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
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
                    <Box
                      component="img"
                      src={type.image}
                      alt={type.title}
                      sx={{
                        width: '100%',
                        height: 200,
                        objectFit: 'cover',
                        borderRadius: 2,
                        mb: 2
                      }}
                    />
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