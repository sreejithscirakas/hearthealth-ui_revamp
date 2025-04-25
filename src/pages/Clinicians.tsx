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
  TablePagination,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  PhotoCamera,
} from '@mui/icons-material';
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
  {
    id: '3',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 234 567 8901',
    designation: 'Pediatric Cardiologist',
  },
  {
    id: '4',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 234 567 8901',
    designation: 'Pediatric Cardiologist',
  },
  {
    id: '5',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 234 567 8901',
    designation: 'Pediatric Cardiologist',
  },
  {
    id: '6',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 234 567 8901',
    designation: 'Pediatric Cardiologist',
  },
  {
    id: '7',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 234 567 8901',
    designation: 'Pediatric Cardiologist',
  },
  {
    id: '8',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 234 567 8901',
    designation: 'Pediatric Cardiologist',
  },
  {
    id: '9',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 234 567 8901',
    designation: 'Pediatric Cardiologist',
  },
  {
    id: '10',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 234 567 8901',
    designation: 'Pediatric Cardiologist',
  },
  {
    id: '11',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 234 567 8901',
    designation: 'Pediatric Cardiologist',
  },
  {
    id: '12',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 234 567 8901',
    designation: 'Pediatric Cardiologist',
  },
  {
    id: '13',
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

const ROWS_PER_PAGE = 10;

export default function Clinicians() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [clinicians] = useState<Clinician[]>(initialClinicians);
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [page, setPage] = useState(0);
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

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

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
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
        textAlign: 'center',
      }}
    >
      <InfoIcon />
      <Typography variant="h6" sx={{ mt: 2, color: 'text.primary' }}>
        No Clinicians Found
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 1, maxWidth: 400 }}
      >
        There are no clinicians matching your search criteria. Try adjusting
        your search or add a new clinician.
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ padding: '0px 25px', height: 'calc(100vh - 56px)' }}>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            color: 'primary.main',
            fontWeight: 600,
            mb: 3,
          }}
        >
          Clinicians
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'stretch' : 'center',
            gap: 2,
            mb: 3,
          }}
        >
          

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
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleClickOpen}
            >
              Add New Clinician
            </Button>
          
        </Box>
      </Box>


      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 'none',
          border: '0px solid #e0e0e0',
          minHeight: filteredClinicians.length === 0 ? 400 : 'auto',
          maxHeight: isMobile? 'calc(100vh - 350px)' :'calc(100vh - 200px)',
        }}
      >
        {filteredClinicians.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <Table sx={{ minWidth: isMobile ? 'auto' : 650, }} stickyHeader>
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
                {filteredClinicians
                  .slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE)
                  .map((clinician) => (
                    <TableRow
                      key={clinician.id}
                      sx={{
                        '&:last-child td, &:last-child th': { borderBottom: '1px solid #e0e0e0' },
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
                            bgcolor: stringToColor(clinician.name),
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
            <TablePagination
              component="div"
              count={filteredClinicians.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={ROWS_PER_PAGE}
              rowsPerPageOptions={[ROWS_PER_PAGE]}
            />
          </>
        )}
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
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
                    bgcolor: newClinician.name
                      ? stringToColor(newClinician.name)
                      : 'grey.300',
                  }}
                >
                  {newClinician.name
                    ? getInitials(newClinician.name)
                    : 'Upload'}
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
                      '&:hover': { backgroundColor: 'grey.100' },
                    }}
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </Box>
            </Box>
            <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(3, 1fr)' },
            gap: 2,
          }}
        >
            <TextField
              label="First Name"
              fullWidth
              value={newClinician.name}
              onChange={handleInputChange('name')}
            />
            <TextField
              label="Last Name"
              fullWidth
              value={newClinician.name}
              onChange={handleInputChange('lastname')}
            />
            <TextField
              label="Gender"
              fullWidth
              value={newClinician.name}
              onChange={handleInputChange('gender')}
            />
            <TextField
              label="DOB"
              fullWidth
              value={newClinician.name}
              onChange={handleInputChange('dob')}
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
              label="Fee"
              fullWidth
              value={newClinician.designation}
              onChange={handleInputChange('fee')}
            />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            p: 1,
            display: "flex",
            flexWrap:'wrap',
            justifyContent:'center',
            alignItems: "center",
          }}
        >
            <Button
              color="primary"
              size="large"
              variant="contained"
              sx={{ borderRadius: "25px" }}
            >
              Submit
            </Button>
          <Button
            onClick={handleClose}
            color="primary"
            size="large"
            variant="outlined"
            sx={{ borderRadius: "25px" }}
          >
            Cancel
          </Button>
            <Typography color="error" sx={{width:'100%', textAlign:'center'}}>
              All mandatory fields marked * must be filled
            </Typography>
        </DialogActions>
      </Dialog>
    </Box>
  );
}