import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useTheme, useMediaQuery, Theme } from '@mui/material';

const doctors = [
  {
    id: 1,
    name: 'Dr. John Smith',
    photo: 'https://www.shutterstock.com/image-photo/head-shot-woman-wearing-white-600nw-1529466836.jpg',
  },
  {
    id: 2,
    name: 'Dr. Jane Doe',
    photo: 'https://www.shutterstock.com/image-photo/head-shot-woman-wearing-white-600nw-1529466836.jpg', 
  },
  {
    id: 3,
    name: 'Dr. Emily Johnson',
    photo: 'https://www.shutterstock.com/image-photo/head-shot-woman-wearing-white-600nw-1529466836.jpg', 
  },
];

const ClinicianList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  return (
    <div>
      <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', marginBottom: 0 }}>
        Add Clinician
        <Fab size="small" color="primary" aria-label="Add Clinician" sx={{ marginLeft: 1 }}>
            <AddIcon />
        </Fab>
      </Typography>
      <List dense sx={{ 
        width: '100%', 
        height: isMobile ? '100%' : 'calc(100vh - 505px)', 
        overflowY: 'auto', 
        bgcolor: 'background.paper' 
      }}>
        {doctors.map((doctor) => {
          const labelId = `clinician-list-label-${doctor.id}`;
          return (
            <ListItem 
              key={doctor.id} 
              disablePadding
              secondaryAction={
                <IconButton edge="end" aria-label="edit" size="small">
                  <EditIcon fontSize="small" />
                </IconButton>
              }
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    alt={doctor.name}
                    src={doctor.photo}
                  />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={doctor.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default ClinicianList;