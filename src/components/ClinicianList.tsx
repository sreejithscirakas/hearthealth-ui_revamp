import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add'; 

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
  return (
    <div>
      <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', marginBottom: 0 }}>
        Add Clinician
        <Fab size="small" color="primary" aria-label="Add Clinician" sx={{ marginLeft: 1 }}>
            <AddIcon />
        </Fab>
      </Typography>
      <List dense sx={{ width: '100%',height: 'calc(100vh - 528px)', overflowY:'auto', bgcolor: 'background.paper' }}>
        {doctors.map((doctor) => {
          const labelId = `clinician-list-label-${doctor.id}`;
          return (
            <ListItem key={doctor.id} disablePadding>
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