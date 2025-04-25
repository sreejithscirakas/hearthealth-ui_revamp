import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  InputAdornment,
  TablePagination,
  Tabs,
  Tab,
  useMediaQuery,
  SwipeableDrawer,
  Button,
  Stack,
  Avatar,
  Select,
  MenuItem,
  Chip,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  ChevronRight,
  FilePresent,
  Close as CloseIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Grid from '@mui/material/Grid2';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';

interface SignupRequest {
  id: string;
  name: string;
  email: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  requestTitle?: string;
  requestedClinician?: {
    name: string;
    photo: string;
    designation: string;
    availability: 'Available' | 'Busy';
  };
  preferredDate?: string;
  preferredTime?: string;
  story?: string;
}

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
      id={`signup-tabpanel-${index}`}
      aria-labelledby={`signup-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
}

const initialRequests: SignupRequest[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    date: '24-03-2025',
    status: 'Pending',
    requestTitle: 'Initial Consultation Request',
    requestedClinician: {
      name: 'Dr. Sarah Johnson',
      photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop',
      designation: 'Pediatric Cardiologist',
      availability: 'Available'
    },
    preferredDate: '2025-03-28',
    preferredTime: '10:00 AM',
    story: 'I have been experiencing chest pain and shortness of breath for the past few weeks. Looking for a thorough cardiac evaluation.',
  },
  {
    id: '2',
    name: 'Sarah Doe',
    email: 'sarahdoe@gmail.com',
    date: '23-03-2025',
    status: 'Pending',
    requestTitle: 'Follow-up Consultation',
    requestedClinician: {
      name: 'Dr. John Smith',
      photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&auto=format&fit=crop',
      designation: 'Cardiologist',
      availability: 'Busy'
    },
    preferredDate: '2025-03-29',
    preferredTime: '2:00 PM',
    story: 'Need a follow-up consultation for my ongoing treatment plan.',
  },
  {
    id: '3',
    name: 'Bobby Doe',
    email: 'bobydoe@gmail.com',
    date: '22-03-2025',
    status: 'Pending',
  },
  {
    id: '4',
    name: 'Alice Smith',
    email: 'alice@gmail.com',
    date: '21-03-2025',
    status: 'Pending',
  },
  {
    id: '5',
    name: 'Bob Johnson',
    email: 'bob@gmail.com',
    date: '20-03-2025',
    status: 'Pending',
  },
  {
    id: '6',
    name: 'Carol White',
    email: 'carol@gmail.com',
    date: '19-03-2025',
    status: 'Pending',
  },
  {
    id: '7',
    name: 'David Brown',
    email: 'david@gmail.com',
    date: '18-03-2025',
    status: 'Pending',
  },
  {
    id: '8',
    name: 'Eve Wilson',
    email: 'eve@gmail.com',
    date: '17-03-2025',
    status: 'Approved',
  },
];

const ROWS_PER_PAGE = 10;

const attachments = [
  {
    id: 1,
    name: 'file name jjrjr jnrjenbljr fnjrljr.doc',
    format: 'doc',
    size: '14MB',
    date: '15 Jan 2024',
    thumbnail: null,
  },
  {
    id: 2,
    name: 'image with very long filename.jpg',
    format: 'jpg',
    size: '14MB',
    date: '15 Jan 2024',
    thumbnail:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=150&auto=format&fit=crop',
  },
];

const clinicians = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    photo:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop',
    availability: 'Available',
    designation: 'Pediatric Cardiologist',
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    photo:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&auto=format&fit=crop',
    availability: 'Busy',
    designation: 'Cardiologist',
  },
  {
    id: 3,
    name: 'Dr. Emily Brown',
    photo:
      'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=200&auto=format&fit=crop',
    availability: 'Available',
    designation: 'Heart Surgeon',
  },
];

const formatFileName = (fileName: string): string => {
  const lastDotIndex = fileName.lastIndexOf('.');
  if (lastDotIndex === -1) return fileName;

  const name = fileName.substring(0, lastDotIndex);
  const extension = fileName.substring(lastDotIndex + 1);

  return name.length <= 8
    ? `${name}.${extension}`
    : `${name.substring(0, 8)}...${extension}`;
};

export default function SignupRequests() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchQuery, setSearchQuery] = useState('');
  const [requests] = useState<SignupRequest[]>(initialRequests);
  const [page, setPage] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<SignupRequest | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<dayjs.Dayjs | null>(null);
  const [selectedClinician, setSelectedClinician] = useState<string>('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setPage(0);
  };

  const getFilteredRequests = (status: 'Pending' | 'Approved' | 'Rejected') => {
    return requests.filter(
      (request) =>
        request.status === status &&
        (request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          request.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const pendingRequests = getFilteredRequests('Pending');
  const approvedRequests = getFilteredRequests('Approved');
  const rejectedRequests = getFilteredRequests('Rejected');

  const currentRequests = [pendingRequests, approvedRequests, rejectedRequests][
    tabValue
  ];

  const handleViewRequest = (id: string) => {
    const request = requests.find((r) => r.id === id);
    if (request) {
      setSelectedRequest(request);
      setDrawerOpen(true);
    }
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleAcceptRequest = () => {
    console.log('Accepting request:', selectedRequest?.id);
    setDrawerOpen(false);
  };

  const handleRejectRequest = () => {
    console.log('Rejecting request:', selectedRequest?.id);
    setDrawerOpen(false);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
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
      <QuestionMarkIcon />
      <Typography variant="h6" sx={{ mt: 2, color: 'text.primary' }}>
        No{' '}
        {tabValue === 0 ? 'Pending' : tabValue === 1 ? 'Approved' : 'Rejected'}{' '}
        Requests
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 1, maxWidth: 400 }}
      >
        There are no{' '}
        {tabValue === 0 ? 'pending' : tabValue === 1 ? 'approved' : 'rejected'}{' '}
        signup requests at the moment.
      </Typography>
    </Box>
  );

  const RequestsTable = ({ requests }: { requests: SignupRequest[] }) => (
    <>
    <TableContainer
        component={Paper}
        sx={{
          boxShadow: 'none',
          border: '0px solid #e0e0e0',
          maxHeight: isMobile? 'calc(100vh - 350px)' :'calc(100vh - 200px)',
        }}
      >
      <Table sx={{ minWidth: isMobile ? 'auto' : 650 }} stickyHeader>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
            <TableCell>Name</TableCell>
            {!isMobile && (
              <>
                <TableCell>Email</TableCell>
                <TableCell>Date</TableCell>
              </>
            )}
            <TableCell>Status</TableCell>
            <TableCell align="right">View</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests
            .slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE)
            .map((request) => (
              <TableRow
                key={request.id}
                onClick={() => handleViewRequest(request.id)}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                  transition: 'background-color 0.2s ease',
                }}
              >
                <TableCell component="th" scope="row">
                  {request.name}
                </TableCell>
                {!isMobile && (
                  <>
                    <TableCell>{request.email}</TableCell>
                    <TableCell>{request.date}</TableCell>
                  </>
                )}
                <TableCell>
                  <Typography
                    component="span"
                    sx={{
                      color:
                        request.status === 'Pending'
                          ? 'warning.main'
                          : request.status === 'Approved'
                          ? 'success.main'
                          : 'error.main',
                      backgroundColor:
                        request.status === 'Pending'
                          ? '#fff7e6'
                          : request.status === 'Approved'
                          ? '#e6f4ea'
                          : '#fce8e8',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '0.875rem',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {request.status}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewRequest(request.id);
                    }}
                    sx={{
                      color: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'rgba(177, 7, 83, 0.04)',
                      },
                    }}
                  >
                    <ChevronRight />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={requests.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={ROWS_PER_PAGE}
        rowsPerPageOptions={[ROWS_PER_PAGE]}
        sx={{
          borderTop: '0px solid #e0e0e0',
        }}
      />
      </TableContainer>
    </>
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
          Patients
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
        <TextField
          placeholder="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            flexGrow: 1,
            maxWidth: 400,
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
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 'none',
          border: '0px solid #e0e0e0',
          minHeight: currentRequests.length === 0 ? 400 : 'auto',
        }}
      >
        <TabPanel value={tabValue} index={0}>
          {pendingRequests.length === 0 ? (
            <EmptyState />
          ) : (
            <RequestsTable requests={pendingRequests} />
          )}
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          {approvedRequests.length === 0 ? (
            <EmptyState />
          ) : (
            <RequestsTable requests={approvedRequests} />
          )}
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          {rejectedRequests.length === 0 ? (
            <EmptyState />
          ) : (
            <RequestsTable requests={rejectedRequests} />
          )}
        </TabPanel>
      </TableContainer>

      <SwipeableDrawer
        anchor="right"
        open={drawerOpen}
        onClose={handleCloseDrawer}
        onOpen={() => {}}
        sx={{
          overflowX: 'unset',
          overflowY: 'unset',
          '& .MuiPaper-root.MuiPaper-elevation': {
            overflowY: 'unset',
          },
        }}
      >
        <IconButton
          onClick={handleCloseDrawer}
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
          }}
        >
          <Box
            sx={{
              p: 2,
              borderBottom: '1px solid #eee',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6" color="text.primary">Patient Details</Typography>
          </Box>

          <Box sx={{ p: 2, flexGrow: 1, overflowY: 'auto', height:'calc(100vh - 136px )'}}>
            <Stack spacing={3}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Name
                </Typography>
                <Typography variant="body1">{selectedRequest?.name}</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">
                  {selectedRequest?.email}
                </Typography>
              </Box>

              {selectedRequest?.requestedClinician && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Preferred Schedule
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 2, 
                    p: 2, 
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" color="text.secondary">Date:</Typography>
                      <Typography variant="body2">{selectedRequest.preferredDate}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" color="text.secondary">Time:</Typography>
                      <Typography variant="body2">{selectedRequest.preferredTime}</Typography>
                    </Box>
                  </Box>
                </Box>
              )}

              {selectedRequest?.requestedClinician && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Preferred Clinician
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 2,
                      bgcolor: 'background.paper',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      cursor: 'pointer'
                    }}
                  >
                    <Avatar
                      src={selectedRequest.requestedClinician.photo}
                      alt={selectedRequest.requestedClinician.name}
                      sx={{ width: 48, height: 48, mr: 2 }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Typography variant="subtitle1">
                          {selectedRequest.requestedClinician.name}
                        </Typography>
                        <IconButton size="small">
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {selectedRequest.requestedClinician.designation}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccessTimeIcon
                          fontSize="small"
                          sx={{
                            color: selectedRequest.requestedClinician.availability === 'Available' 
                              ? 'success.main' 
                              : 'error.main',
                          }}
                        />
                        <Chip
                          label={selectedRequest.requestedClinician.availability}
                          size="small"
                          color={selectedRequest.requestedClinician.availability === 'Available' 
                            ? 'success' 
                            : 'error'}
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}


              <Box>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Questions / Story
                </Typography>
                <Box
                  sx={{
                    padding: '10px 20px',
                    border: 'solid 1px #ddd',
                    borderRadius: '2px',
                    mb: 3,
                  }}
                >
                  <Typography variant="body2">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
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
                          },
                        }}
                      >
                        {file.thumbnail ? (
                          <img
                            src={file.thumbnail}
                            alt={file.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
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
                              paddingTop: '10px',
                            }}
                          >
                            <FilePresent
                              sx={{ fontSize: 24, color: '#666', mb: 1 }}
                            />
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
                              WebkitLineClamp: 2,
                            }}
                          >
                            {formatFileName(file.name)}
                          </Typography>
                          <Typography
                            variant="caption"
                            display="block"
                            color="text.secondary"
                          >
                            {file.date}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Stack>
          </Box>

          
        </Box>
      </SwipeableDrawer>
    </Box>
  );
}