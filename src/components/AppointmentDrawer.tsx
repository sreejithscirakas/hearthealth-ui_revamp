import {
  Box,
  IconButton,
  Typography,
  Button,
  Stack,
  ButtonGroup,
  SwipeableDrawer,
  Chip,
  useTheme,
  useMediaQuery,
  Select,
  MenuItem,
  FormControl,
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

const attendees = [
  {
    id: 1,
    name: 'Dr. John Smith',
    photo: 'https://media.istockphoto.com/id/1311511363/photo/headshot-portrait-of-smiling-male-doctor-with-tablet.jpg?s=612x612&w=0&k=20&c=w5TecWtlA_ZHRpfGh20II-nq5AvnhpFu6BfOfMHuLMA=',
    label: 'Clinician',
    consentPending: true
  },
  {
    id: 2,
    name: 'Jane Doe',
    photo: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
    label: 'Patient',
    consentPending: true
  },
  {
    id: 3,
    name: 'Emily Johnson',
    photo: 'https://www.shutterstock.com/image-photo/head-shot-woman-wearing-white-600nw-1529466836.jpg',
    label: 'Practice Manager',
    consentPending: false
  },
];

interface AppointmentDrawerProps {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function AppointmentDrawer({ open, onClose, onOpen }: AppointmentDrawerProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      sx={{
        overflowX: 'unset',
        overflowY: 'unset',
        '& .MuiPaper-root.MuiPaper-elevation': {
          overflowY: 'unset'
        }
      }}
    >
      <IconButton 
          onClick={onClose}
          sx={{
            position: isMobile ? 'static' : 'absolute',
            left: isMobile ? 'auto' : '-60px',
            top: isMobile ? 'auto' : '17px',
            backgroundColor: isMobile ? 'transparent' : '#fff',
            color: isMobile ? 'inherit' : '#000',
            borderRadius: isMobile ? '50%' : '50%',
            width: isMobile ? '40px' : '48px',
            height: isMobile ? '40px' : '48px',
            '&:hover': {
              backgroundColor: isMobile ? 'rgba(0, 0, 0, 0.04)' : 'rgb(242, 244, 247)',
            },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CloseIcon />
        </IconButton>
      <Box
        sx={{ 
          width: { xs: '100vw', sm: '100vw', md: 590 },
          maxWidth: '100%',
          position: 'relative',
          height:'100%',
          overflowX:'auto'
        }}
        role="presentation"
      >
        <Stack spacing={2} sx={{ padding: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ background: '#ddd', padding: '10px', borderRadius: '5px', marginRight: '15px', alignItems: 'center', display: 'flex' }}>
                  <EventRounded />
                </Box>
                <Box>
                  <Typography variant="h6" data-testid="appointment-title">
                    Appointment Title
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
        <Chip sx={{ml:2}} label="Pending" color="warning" variant="outlined" /> 
        </Box>
        <Box sx={{ padding: '0px 20px' }}>
        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', marginBottom: 0 }}>
        Attendees
      </Typography>
        <List dense sx={{ width: '100%',height: 'auto', overflowY:'auto', bgcolor: 'background.paper' }}>
        {attendees.map((user) => {
          const labelId = `clinician-list-label-${user.id}`;
          return (
            <ListItem 
              key={user.id} 
              disablePadding
              sx={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                borderBottom: '1px solid #eee',
                py: 1
              }}
            >
              <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', }}>
                <ListItemButton sx={{ py: 0 }}>
                  <ListItemAvatar>
                    <Avatar
                      alt={user.name}
                      src={user.photo}
                    />
                  </ListItemAvatar>
                  <ListItemText 
                    id={labelId} 
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {user.name}
                        <Chip 
                          label={user.label} 
                          size="small" 
                          sx={{ ml: 1, height: '20px' }}
                        />
                      </Box>
                    } 
                  />
                </ListItemButton>
              </Box>
              {user.consentPending && (
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 9, width: '100%' }}>
                  <Typography variant="body2" sx={{ mr: 1, color: theme.palette.warning.main }}>
                    Consent Pending
                  </Typography>
                </Box>
              )}
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