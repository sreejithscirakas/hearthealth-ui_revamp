import { useState } from 'react';
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
  Chip,
  SwipeableDrawer,
  useTheme,
  useMediaQuery,
  Button,
  Stack,
  TablePagination,
} from '@mui/material';
import {
  ChevronRight,
  Close as CloseIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';

interface Payment {
  id: string;
  billTo: string;
  service: string;
  date: string;
  price: string;
  status: 'Completed' | 'Refunded' | 'Pending';
  clientName?: string;
  clientPhone?: string;
  clientEmail?: string;
  description?: string;
  dueDate?: string;
}

const initialPayments: Payment[] = [
  {
    id: '000001',
    billTo: 'John Doe',
    service: 'Final Appointment',
    date: 'Mar 18, 2025',
    price: '₹100.00',
    status: 'Completed',
    clientName: 'John Doe',
    clientPhone: '18005550100',
    clientEmail: 'john@example.com',
    description: 'Invoice for Final Appointment with John Doe',
    dueDate: 'Mar 26, 2025',
  },
  {
    id: '000002',
    billTo: 'Sarah Doe',
    service: 'Followup',
    date: 'Mar 23, 2025',
    price: '₹200.00',
    status: 'Refunded',
    clientName: 'Sarah Doe',
    clientPhone: '18005550101',
    clientEmail: 'sarah@example.com',
    description: 'Invoice for Followup Appointment',
    dueDate: 'Mar 30, 2025',
  },
  {
    id: '000003',
    billTo: 'Dr. Bobby Doe',
    service: 'Followup',
    date: 'Mar 22, 2025',
    price: '₹400.00',
    status: 'Completed',
    clientName: 'Bobby Doe',
    clientPhone: '18005550102',
    clientEmail: 'bobby@example.com',
    description: 'Invoice for Followup Appointment',
    dueDate: 'Mar 29, 2025',
  },
];

const ROWS_PER_PAGE = 5;

export default function BillPayment() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [searchQuery, setSearchQuery] = useState('');
  const [payments] = useState<Payment[]>(initialPayments);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(0);

  const filteredPayments = payments.filter(
    (payment) =>
      payment.billTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const formatService = (service: string) => {
    return service.length > 8 ? `${service.substring(0, 8)}...` : service;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'Refunded':
        return 'warning';
      case 'Pending':
        return 'info';
      default:
        return 'default';
    }
  };

  const handleRowClick = (payment: Payment) => {
    setSelectedPayment(payment);
    setDrawerOpen(true);
  };

  const handleDownload = () => {
    console.log('Downloading invoice...');
  };

  return (
    <Box sx={{ padding: '0px 25px', height: 'calc(100vh - 56px)' }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{
            color: 'primary.main',
            fontWeight: 600,
            mb: 3,
          }}>
          Payments
          <Typography component="span" color="text.secondary" sx={{ ml: 1 }}>
            ({payments.length} Invoices)
          </Typography>
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'center',
          gap: 2,
          mb: 3,
        }}
      >
        <TextField
          placeholder="Search"
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
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
          sx={{
            whiteSpace: 'nowrap',
            width: isMobile ? 'auto' : 'auto',
          }}
        >
          Download
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 'none',
          border: '0px solid #eee',
          borderRadius: '8px',
        }}
      >
        <Table sx={{ minWidth: isMobile ? 'auto' : 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              {!isMobile && <TableCell>Invoice</TableCell>}
              <TableCell>Name</TableCell>
              {!isMobile && (
                <>
                  <TableCell>Appointments</TableCell>
                  <TableCell>Date</TableCell>
                </>
              )}
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPayments
              .slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE)
              .map((payment) => (
                <TableRow
                  key={payment.id}
                  onClick={() => handleRowClick(payment)}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      cursor: 'pointer',
                    },
                  }}
                >
                  {!isMobile && (
                    <TableCell component="th" scope="row">
                      {payment.id}
                    </TableCell>
                  )}
                  <TableCell>{payment.billTo}</TableCell>
                  {!isMobile && (
                    <>
                      <TableCell>{formatService(payment.service)}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                    </>
                  )}
                  <TableCell>{payment.price}</TableCell>
                  <TableCell>
                    <Chip
                      label={payment.status}
                      color={
                        getStatusColor(payment.status) as
                          | 'success'
                          | 'warning'
                          | 'info'
                          | 'default'
                      }
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(payment);
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
          count={filteredPayments.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={ROWS_PER_PAGE}
          rowsPerPageOptions={[ROWS_PER_PAGE]}
        />
      </TableContainer>

      <SwipeableDrawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
        sx={{
          overflowX: 'unset',
          overflowY: 'unset',
          '& .MuiPaper-root.MuiPaper-elevation': {
            overflowY: 'unset',
          },
        }}
      >
        <IconButton
          onClick={() => setDrawerOpen(false)}
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
        {selectedPayment && (
          <Box
            sx={{
              width: { xs: '100vw', sm: '100vw', md: 590 },
              maxWidth: '100%',
              height: '100%',
              overflowY: 'auto',
              position: 'relative',
            }}
          >
            <Box sx={{ p: 0 }}>
              <Paper sx={{ p: 4, mb: 0, boxShadow: 'unset' }}>
                <Stack spacing={4}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Typography variant="h4">Invoice</Typography>
                    <Button
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      onClick={handleDownload}
                    >
                      Download
                    </Button>
                  </Box>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Box>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        gutterBottom
                      >
                        Bill to
                      </Typography>
                      <Typography variant="body1">
                        {selectedPayment.clientName}
                      </Typography>
                      <Typography variant="body2">
                        {selectedPayment.clientPhone}
                      </Typography>
                      <Typography variant="body2">
                        {selectedPayment.clientEmail}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        gutterBottom
                      >
                        Invoice # {selectedPayment.id}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        sx={{ mt: 1 }}
                        gutterBottom
                      >
                        Date issued : {selectedPayment.date}
                      </Typography>
                    </Box>
                  </Box>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                          <TableCell>Date</TableCell>
                          <TableCell>Service</TableCell>
                          <TableCell>Price</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>{selectedPayment.date}</TableCell>
                          <TableCell>
                            {selectedPayment.service}
                            <Typography
                              variant="caption"
                              display="block"
                              color="text.secondary"
                            >
                              45 mins
                            </Typography>
                          </TableCell>
                          <TableCell>{selectedPayment.price}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Description
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {selectedPayment.description}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        mt: 2,
                      }}
                    >
                      <Box sx={{ width: '200px' }}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mb: 1,
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                          >
                            Subtotal
                          </Typography>
                          <Typography variant="body1">
                            {selectedPayment.price}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Typography variant="subtitle1" fontWeight="bold">
                            Total (INR)
                          </Typography>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {selectedPayment.price}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Stack>
              </Paper>
            </Box>
          </Box>
        )}
      </SwipeableDrawer>
    </Box>
  );
}