import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Search as SearchIcon, Add as AddIcon, PhotoCamera } from '@mui/icons-material';
import InfoIcon from '@mui/icons-material/Info';


interface Clinician {
  id: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
  photo?: string;
}

const initialClinicians: Clinician[] = [
  {
    id: '1',
    name: 'Dr. John Smith',
    email: 'john.smith@example.com',
    phone: '+1 234 567 8900',
    designation: 'Senior Cardiologist',
  },
  {
    id: '2',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 234 567 8901',
    designation: 'Pediatric Cardiologist',
  },
];

function stringToColor(string: string) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function getInitials(name: string) {
  const names = name.split(' ');
  return names.length > 1
    ? `${names[0][0]}${names[names.length - 1][0]}`
    : names[0].substring(0, 2);
}

export default function Clinicians() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [clinicians] = useState<Clinician[]>(initialClinicians);
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [newClinician, setNewClinician] = useState({
    name: '',
    email: '',
    phone: '',
    designation: '',
  });

  const filteredClinicians = clinicians.filter(
    (clinician) =>
      clinician.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clinician.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clinician.designation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewClinician({
      name: '',
      email: '',
      phone: '',
      designation: '',
    });
    setSelectedImage(null);
    setPreviewUrl('');
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('New clinician:', { ...newClinician, photo: selectedImage });
    handleClose();
  };

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewClinician({
      ...newClinician,
      [field]: event.target.value,
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const EmptyState = () => (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: 2,
        textAlign: 'center'
      }}
    >
      <InfoIcon />
      <Typography variant="h6" sx={{ mt: 2, color: 'text.primary' }}>
        No Clinicians Found
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 400 }}>
        There are no clinicians matching your search criteria. Try adjusting your search or add a new clinician.
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ p: isMobile ? 2 : 3, height:'calc(100vh - 56px)' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h1" sx={{ 
          color: 'primary.main',
          fontWeight: 600,
          mb: 3 
        }}>
          Clinicians
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'center', 
          gap: 2, 
          mb: 3 
        }}>
          {isMobile && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleClickOpen}
              fullWidth
            >
              Add New Clinician
            </Button>
          )}
          
          <TextField
            placeholder="Search clinicians"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ 
              flexGrow: 1,
              maxWidth: isMobile ? '100%' : 400,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#f5f5f5',
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          {!isMobile && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleClickOpen}
            >
              Add New Clinician
            </Button>
          )}
        </Box>
      </Box>

      <TableContainer 
        component={Paper}
        sx={{ 
          boxShadow: 'none',
          border: '0px solid #e0e0e0',
          minHeight: filteredClinicians.length === 0 ? 400 : 'auto'
        }}
      >
        {filteredClinicians.length === 0 ? (
          <EmptyState />
        ) : (
          <Table sx={{ minWidth: isMobile ? 'auto' : 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell>Profile</TableCell>
                <TableCell>Name</TableCell>
                {!isMobile && (
                  <>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Designation</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredClinicians.map((clinician) => (
                <TableRow
                  key={clinician.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  <TableCell>
                    <Avatar
                      src={clinician.photo}
                      alt={clinician.name}
                      sx={{ 
                        width: 40, 
                        height: 40,
                        bgcolor: stringToColor(clinician.name)
                      }}
                    >
                      {getInitials(clinician.name)}
                    </Avatar>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {clinician.name}
                  </TableCell>
                  {!isMobile && (
                    <>
                      <TableCell>{clinician.email}</TableCell>
                      <TableCell>{clinician.phone}</TableCell>
                      <TableCell>{clinician.designation}</TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Clinician</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  src={previewUrl}
                  alt={newClinician.name || 'Preview'}
                  sx={{ 
                    width: 100, 
                    height: 100,
                    color: 'primary.main',
                    bgcolor: newClinician.name ? stringToColor(newClinician.name) : 'grey.300'
                  }}
                >
                  {newClinician.name ? getInitials(newClinician.name) : 'Upload'}
                </Avatar>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="photo-upload"
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="photo-upload">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    sx={{
                      position: 'absolute',
                      bottom: -8,
                      right: -8,
                      backgroundColor: 'white',
                      boxShadow: 1,
                      '&:hover': { backgroundColor: 'grey.100' }
                    }}
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </Box>
            </Box>
            <TextField
              label="Name"
              fullWidth
              value={newClinician.name}
              onChange={handleInputChange('name')}
            />
            <TextField
              label="Email"
              fullWidth
              type="email"
              value={newClinician.email}
              onChange={handleInputChange('email')}
            />
            <TextField
              label="Phone"
              fullWidth
              value={newClinician.phone}
              onChange={handleInputChange('phone')}
            />
            <TextField
              label="Designation"
              fullWidth
              value={newClinician.designation}
              onChange={handleInputChange('designation')}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{display:'flex',justifyContent:'center',marginBottom:'20px'}}>
          <Button onClick={handleSave} variant="contained">Save</Button>
          <Button onClick={handleClose} variant="outlined">Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}