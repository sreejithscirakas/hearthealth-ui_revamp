import { useState, useRef, useEffect } from 'react';
import {
  SwipeableDrawer,
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
  Collapse,
  useMediaQuery,
  useTheme,
  Paper,
  Avatar,
  Select,
  MenuItem,
  Chip,
  FormControl,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import MiniCalendar from './MiniCalendar';
import Grid from '@mui/material/Grid2';
import { 
  EventRounded, 
  AttachFile as AttachFileIcon,
  Close as CloseIcon,
  InsertDriveFile as FileIcon,
  Image as ImageIcon,
  PictureAsPdf as PdfIcon,
} from '@mui/icons-material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import TextField from '@mui/material/TextField';

interface NewAppointmentsProps {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const timeSlots = [
  '09:00 AM - 10:00 AM',
  '11:00 AM - 12:00 PM',
  '02:00 PM - 03:00 PM',
  '04:00 PM - 05:00 PM',
  '06:00 PM - 07:00 PM',
  '07:00 PM - 08:00 PM',
];

const clinicians = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    photo:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop',
    price: '$100',
    designation: 'Cardiologist',
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    photo:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&auto=format&fit=crop',
    price: '$200',
    designation: 'Cardiologist',
  },
  {
    id: 3,
    name: 'Dr. Emily Brown',
    photo:
      'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=200&auto=format&fit=crop',
    price: '$300',
    designation: 'Heart Surgeon',
  },
];

const SLOTS_PER_PAGE = 4;

const getFileIcon = (fileType: string) => {
  if (fileType.startsWith('image/')) return <ImageIcon />;
  if (fileType === 'application/pdf') return <PdfIcon />;
  return <FileIcon />;
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default function NewAppointments({
  open,
  onClose,
  onOpen,
}: NewAppointmentsProps) {
  const theme = useTheme();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedClinician, setSelectedClinician] = useState<string>('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const calendarRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const totalPages = Math.ceil(timeSlots.length / SLOTS_PER_PAGE);
  const startIndex = currentPage * SLOTS_PER_PAGE;
  const visibleTimeSlots = timeSlots.slice(
    startIndex,
    startIndex + SLOTS_PER_PAGE
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setAttachedFiles((prev) => [...prev, ...newFiles]);
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      const newFiles = Array.from(event.dataTransfer.files);
      setAttachedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    };

    if (isCalendarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCalendarOpen]);

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
          overflowY: 'unset',
        },
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
            backgroundColor: isMobile
              ? 'rgba(0, 0, 0, 0.04)'
              : 'rgb(242, 244, 247)',
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
          height: '100%',
          overflowY: 'auto',
          position: 'relative',
          padding: '0 20px',
        }}
        role="presentation"
      >
        <Typography variant="h6" color="text.primary" sx={{ mt: 2, mb:2 }}>
          New Appointment
        </Typography>

        <Box sx={{ padding: '0', height:'calc(100vh - 135px)', overflowY:'auto' }}>

        <Box
          sx={{
            p: 2,
            mb: 3,
            cursor: 'pointer',
            border:'1px solid #ddd',
            borderRadius: '5px',
            '&:hover': { bgcolor: 'action.hover' },
          }}
          onClick={toggleCalendar}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  background: '#ddd',
                  padding: '10px',
                  borderRadius: '5px',
                  marginRight: '15px',
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <EventRounded />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  data-testid="appointment-title"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  Wed 16 Apr
                  {isCalendarOpen ? (
                    <ExpandLessRoundedIcon />
                  ) : (
                    <ExpandMoreRoundedIcon />
                  )}
                </Typography>
                <Typography variant="body2" data-testid="appointment-subtitle">
                  03:00 PM – 03:45 PM
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Box>

        <Collapse in={isCalendarOpen}>
          <Paper
            ref={calendarRef}
            sx={{
              paddingRight: 3,
              paddingTop: 3,
              position: 'absolute',
              zIndex: '100',
            }}
          >
            <Grid container spacing={1}>
              <Grid size={{ xs: 12, sm: 7 }}>
                <MiniCalendar />
              </Grid>
              <Grid size={{ xs: 12, sm: 5 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 1,
                    pt:'15px'
                  }}
                >
                  <Typography variant="subtitle2">Available Slot</Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={handlePrevPage}
                      disabled={currentPage === 0}
                      sx={{
                        backgroundColor: theme.palette.grey[100],
                        '&:hover': {
                          backgroundColor: theme.palette.grey[200],
                        },
                      }}
                    >
                      <KeyboardArrowLeftRoundedIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages - 1}
                      sx={{
                        backgroundColor: theme.palette.grey[100],
                        '&:hover': {
                          backgroundColor: theme.palette.grey[200],
                        },
                      }}
                    >
                      <KeyboardArrowRightRoundedIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Grid container spacing={1}>
                  {visibleTimeSlots.map((time) => (
                    <Grid size={{ xs: 12 }} key={time}>
                      <Button
                        fullWidth
                        variant={
                          selectedTime === time ? 'contained' : 'outlined'
                        }
                        onClick={() => handleTimeSelect(time)}
                        sx={{
                          borderRadius: 2,
                          textTransform: 'none',
                          p: '5px',
                        }}
                      >
                        {time}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Collapse>
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Preferred Doctor
          </Typography>
          <FormControl fullWidth>
            <Select
              value={selectedClinician}
              onChange={(e) => setSelectedClinician(e.target.value)}
              displayEmpty
              renderValue={(selected) => {
                if (!selected) {
                  return <Typography color="text.secondary">Select</Typography>;
                }
                const clinician = clinicians.find(
                  (c) => c.id.toString() === selected
                );
                return (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar
                      src={clinician?.photo}
                      sx={{ width: 24, height: 24 }}
                    />
                    <Typography>{clinician?.name}</Typography>
                  </Box>
                );
              }}
            >
              {clinicians.map((clinician) => (
                <MenuItem key={clinician.id} value={clinician.id.toString()}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      width: '100%',
                    }}
                  >
                    <Avatar src={clinician.photo} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2">
                        {clinician.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {clinician.designation}
                      </Typography>
                    </Box>
                    <Chip label={clinician.price} variant="outlined" />
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <TextField
            id="standard-multiline-static"
            label="Questions / Story"
            multiline
            rows={3}
            defaultValue=""
            variant="outlined"
            fullWidth
            sx={{ mt: 3, mb: 3 }}
          />

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
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="subtitle2">Total Payment : ₹100.00</Typography>
                        </Stack>
                      </Stack>

          <Box
            sx={{
              border: '1px solid #ddd',
              borderRadius: 1,
              p: 1,
              width:'200px',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
            }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              id="file-upload"
              style={{ display: 'none' }}
              onChange={handleFileChange}
              multiple
            />
            <label htmlFor="file-upload" style={{ cursor: 'pointer', display: 'flex', justifyContent:'center', alignItems:'center',gap:'10px' }}>
              <AttachFileIcon
                sx={{
                  fontSize: 18,
                  color: 'primary.main',
                  mb: 1,
                  transform: 'rotate(45deg)'
                }}
              />
              <Typography variant="subtitle1" color="primary" gutterBottom>
                Upload Files
              </Typography>
            </label>
          </Box>

          {attachedFiles.length > 0 && (
            <List sx={{ mt: 2 }}>
              {attachedFiles.map((file, index) => (
                <ListItem
                  key={index}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    mb: 1,
                  }}
                >
                  <ListItemIcon>
                    {getFileIcon(file.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={file.name}
                    secondary={formatFileSize(file.size)}
                    sx={{
                      '& .MuiListItemText-primary': {
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                      },
                    }}
                  />
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <CloseIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
        </Box>
        <Box
              sx={{
                p: 2,
                borderTop: '1px solid #eee',
                display: 'flex',
                justifyContent:'center',
                gap: 2,
                backgroundColor: 'background.paper',
              }}
            >
              <Button
                variant="contained"
                sx={{backgroundColor:'primary.main',color:'#fff'}}
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                onClick={onClose}
                sx={{color:'primary.main'}}
              >
                Cancel
              </Button>
            </Box>
      </Box>
    </SwipeableDrawer>
  );
}