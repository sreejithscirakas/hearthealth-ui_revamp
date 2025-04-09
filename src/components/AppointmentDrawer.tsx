import {
  Box,
  IconButton,
  Typography,
  Button,
  Stack,
  ButtonGroup,
  SwipeableDrawer,
  Chip,
} from '@mui/material';
import { 
  EventRounded, 
  VideoCall, 
  Link,
} from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar'; 

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

interface AppointmentDrawerProps {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function AppointmentDrawer({ open, onClose, onOpen }: AppointmentDrawerProps) {
  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      sx={{overflowX:'unset',overflowY:'unset'}}
    >
      <Box
        sx={{ width: 590 }}
        role="presentation"
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px', borderBottom: '1px solid #eee' }}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Stack spacing={2} sx={{ padding: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ background: '#ddd', padding: '10px', borderRadius: '5px', marginRight: '15px', alignItems: 'center', display: 'flex' }}>
                  <EventRounded />
                </Box>
                <Box>
                  <Typography variant="h6" data-testid="appointment-title">
                    Appointment
                  </Typography>
                  <Typography variant="body2" data-testid="appointment-subtitle">
                    Wed, 02 Apr • 03:00 PM – 03:45 PM 
                  </Typography>
                </Box>
              </Box>
              <IconButton
                aria-label="edit appointment"
                sx={{ background: '#ddd', padding: '10px', borderRadius: '5px', alignItems: 'center', display: 'flex' }}
              >
                <EditIcon />
              </IconButton>
            </Box>
          </Stack>

          <Box sx={{ display: 'flex' }}>
            <ButtonGroup
              variant="contained"
              sx={{ display: 'flex', width: '100%' }}
            >
              <Button
                sx={{ width: '100%' }}
                startIcon={<VideoCall />}
              >Join video call</Button>
              <Button>
                <Link />
              </Button>
            </ButtonGroup>
          </Box>
        </Stack>
        <Box sx={{ padding: '10px 20px',display:'flex',justifyContent:'flex-end' }}>
        <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', marginBottom: 0 }}>
            Appointment Status:
        </Typography>
            <Chip sx={{ml:2}} label="Confirmed" color="primary" variant="outlined" />
        </Box>
        <Box sx={{ padding: '0px 20px' }}>
        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', marginBottom: 0 }}>
        Attendees
      </Typography>
        <List dense sx={{ width: '100%',height: 'auto', overflowY:'auto', bgcolor: 'background.paper' }}>
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
</Box>

        <Box sx={{padding:'10px 20px'}}>
        <Stack 
        sx={{
            paddingRight:'20px',
            border:'solid 1px #ddd',
            borderLeft:'solid 3px #b10753',
            padding:'20px',
            borderRadius:'2px'
        }} 
        direction="row" justifyContent="space-between" alignItems="center">
          <Stack>
            <Typography variant="subtitle1">Payment</Typography>
            <Box sx={{display:'flex',alignItems:'center'}}>
                <Typography variant="body2">Status :</Typography>
                <Chip sx={{ml:2}} label="Completed" color="success" variant="outlined" />
            </Box>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="subtitle2">₹100.00</Typography>
           
          </Stack>
        </Stack>
      </Box>

      <Box sx={{padding:'10px 20px'}}>
      <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', marginBottom: 0 }}>
      Questions / Story
      </Typography>
      <Box sx={{padding:'10px 20px',border:'solid 1px #ddd',borderRadius:'2px'}}>
        <Typography variant="caption">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </Typography>
      </Box>
      </Box>
      </Box>
    </SwipeableDrawer>
  );
}