import React from 'react';
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
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@mui/material';
import { 
  EventRounded, 
  VideoCall, 
  Link as LinkIcon,
  FilePresent,
  Download,
} from '@mui/icons-material';
import Grid from "@mui/material/Grid2";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import Transcription from './Transcription';
import Summary from './Summary';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`drawer-tabpanel-${index}`}
      aria-labelledby={`drawer-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const attendees = [
  {
    id: 1,
    name: 'Dr. John Smith',
    photo: 'https://media.istockphoto.com/id/1311511363/photo/headshot-portrait-of-smiling-male-doctor-with-tablet.jpg?s=612x612&w=0&k=20&c=w5TecWtlA_ZHRpfGh20II-nq5AvnhpFu6BfOfMHuLMA=',
    label: 'Clinician',
    status: 'Confirmed'
  },
  {
    id: 2,
    name: 'Jane Doe',
    photo: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
    label: 'Patient',
    status: 'Pending Patient Confirmation'
  },
  {
    id: 3,
    name: 'Emily Johnson',
    photo: 'https://www.shutterstock.com/image-photo/head-shot-woman-wearing-white-600nw-1529466836.jpg',
    label: 'Practice Manager',
    status: 'Rescheduled'
  },
];

const attachments = [
  {
    id: 1,
    name: 'file name jjrjr jnrjenbljr fnjrljr.doc',
    format: 'doc',
    size: '14MB',
    date: '15 Jan 2024',
    thumbnail: null
  },
  {
    id: 2,
    name: 'image with very long filename.jpg',
    format: 'jpg',
    size: '14MB',
    date: '15 Jan 2024',
    thumbnail: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=150&auto=format&fit=crop'
  }
];

const recordings = [
  {
    id: 1,
    name: 'Recording_20240115_session1.mp4',
    format: 'mp4',
    size: '256MB',
    date: '10 Apr 2025',
  }
];

interface AppointmentDrawerProps {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const formatFileName = (fileName: string): string => {
  const lastDotIndex = fileName.lastIndexOf('.');
  if (lastDotIndex === -1) return fileName;
  
  const name = fileName.substring(0, lastDotIndex);
  const extension = fileName.substring(lastDotIndex + 1);
  
  return name.length <= 8 
    ? `${name}.${extension}`
    : `${name.substring(0, 8)}...${extension}`;
};

export default function AppointmentDrawer({ open, onClose, onOpen }: AppointmentDrawerProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'success';
      case 'Pending Patient Confirmation':
        return 'warning';
      case 'Cancelled':
        return 'error';
      case 'Rescheduled':
        return 'info';
      default:
        return 'default';
    }
  };

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
          height:'100%',
          overflowY:'auto',
          position: 'relative'
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
                <LinkIcon />
              </Button>
            </ButtonGroup>
          </Box>
        </Stack>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="appointment tabs">
            <Tab label="Details" />
            <Tab label="Transcription" />
            <Tab label="Summary" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ padding: '0 20px',height:'calc(100vh - 235px)', overflowY:'auto' }}>
            <Box sx={{ display:'flex',justifyContent:'flex-end', mb: 2 }}>
              <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', marginBottom: 0 }}>
                Appointment Status:
              </Typography>
              <Chip sx={{ml:2}} label="Pending" color="warning" variant="outlined" /> 
            </Box>

            <Typography variant="body1" sx={{ mb: 2 }}>
              Attendees
            </Typography>
            <List dense sx={{ width: '100%', height: 'auto', overflowY:'auto', bgcolor: 'background.paper', mb: 3 }}>
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
                    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
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
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 9, width: '100%', mb: 1 }}>
                    <Typography variant="body2"
                        
                        color={getStatusColor(user.status)}
                      >
                        {user.status}
                      </Typography>
                    </Box>
                  </ListItem>
                );
              })}
            </List>

            <Stack 
              sx={{
                paddingRight:'20px',
                border:'solid 1px #ddd',
                borderLeft:'solid 3px #b10753',
                padding:'20px',
                borderRadius:'2px',
                mb: 3
              }} 
              direction="row" 
              justifyContent="space-between" 
              alignItems="center"
            >
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

            <Typography variant="body1" sx={{ mb: 2 }}>
              Questions / Story
            </Typography>
            <Box sx={{padding:'10px 20px',border:'solid 1px #ddd',borderRadius:'2px', mb: 3}}>
              <Typography variant="caption">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ mb: 2 }}>
              Attachments ({attachments.length})
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {attachments.map((file) => (
                <Grid key={file.id} size={{ xs: 4 }}>
                  <Box
                    sx={{
                      border: '1px solid #eee',
                      borderRadius: '8px',
                      height: '100px',
                      overflow: 'hidden',
                      position: 'relative',
                      cursor: 'pointer',
                      '&:hover': {
                        borderColor: '#ddd',
                      }
                    }}
                  >
                    {file.thumbnail ? (
                      <img 
                        src={file.thumbnail} 
                        alt={file.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          backgroundColor: '#f5f5f5',
                          paddingTop: '10px'
                        }}
                      >
                        <FilePresent sx={{ fontSize: 24, color: '#666', mb: 1 }} />
                      </Box>
                    )}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        padding: '4px',
                        fontSize: '10px',
                        textAlign: 'center',
                      }}
                    >
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          px: 1, 
                          textAlign: 'center',
                          display: '-webkit-box',
                          overflow: 'hidden',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2
                        }}
                      >
                        {formatFileName(file.name)}
                      </Typography>
                      <Typography variant="caption" display="block" color="text.secondary">
                        {file.date}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Typography variant="body1" sx={{ mb: 2 }}>
              Recordings
            </Typography>
            <List>
              {recordings.map((recording) => (
                <ListItem
                  key={recording.id}
                  sx={{
                    border: '1px solid #eee',
                    borderRadius: '8px',
                    mb: 1,
                  }}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <AudioFileIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={formatFileName(recording.name)}
                    secondary={`${recording.format.toUpperCase()} • ${recording.size} • ${recording.date}`}
                  />
                  <IconButton edge="end" aria-label="download" color="primary">
                    <Download />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ padding: '0 20px',display:'none' }}>
            <Typography variant="body1" color="text.secondary" align="center">
              No transcription available
            </Typography>
          </Box>
          <Box sx={{ padding: '0 0px',height:'calc(100vh - 235px)', overflowY:'auto' }}>
            <Transcription/>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Box sx={{ padding: '0 20px', display:'none'}}>
            <Typography variant="body1" color="text.secondary" align="center">
              No summary available
            </Typography>
          </Box>
          <Box sx={{ padding: '0 0px',height:'calc(100vh - 235px)', overflowY:'auto' }}>
            <Summary/>
          </Box>
        </TabPanel>
      </Box>
    </SwipeableDrawer>
  );
}