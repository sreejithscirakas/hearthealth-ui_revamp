import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import { useMediaQuery, Theme, Box } from '@mui/material';

const doctors = [
  {
    id: 1,
    name: 'Dr. John Smith',
    photo:
      'https://www.shutterstock.com/image-photo/head-shot-woman-wearing-white-600nw-1529466836.jpg',
  },
  {
    id: 2,
    name: 'Dr. Jane Doe',
    photo:
      'https://www.shutterstock.com/image-photo/head-shot-woman-wearing-white-600nw-1529466836.jpg',
  },
  {
    id: 3,
    name: 'Dr. Emily Johnson',
    photo:
      'https://www.shutterstock.com/image-photo/head-shot-woman-wearing-white-600nw-1529466836.jpg',
  },
];

const ClinicianList = () => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );

  return (
    <Box>
      {/* <Typography
        variant="body1"
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 0,
          whiteSpace: 'nowrap',
        }}
      >
         
        Clinicians
      </Typography>*/}
      <List
        dense
        sx={{
          display: isMobile ? 'flex' : 'block',
          width: isMobile ? '100%' : '100%',
          height: isMobile ? 'auto' : 'auto',
          overflowY: isMobile ? 'hidden' : 'auto',
          overflowX: isMobile ? 'auto' : 'hidden',
          bgcolor: 'background.paper',
          padding:0,
          '&::-webkit-scrollbar': {
            height: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '2px',
          },
        }}
      >
        {doctors.map((doctor) => {
          const labelId = `clinician-list-label-${doctor.id}`;
          return (
            <ListItem 
              key={doctor.id}
              sx={{
                width: isMobile ? 'auto' : '100%',
                minWidth: isMobile ? '200px' : 'auto',
                paddingLeft:0,
                paddingRight:0
              }}
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar alt={doctor.name} src={doctor.photo} />
                </ListItemAvatar>
                <ListItemText 
                  id={labelId} 
                  primary={doctor.name}
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default ClinicianList;