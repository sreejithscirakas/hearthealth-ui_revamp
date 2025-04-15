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
} from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';

interface Payment {
  id: string;
  billTo: string;
  service: string;
  date: string;
  price: string;
  status: 'Completed' | 'Refunded' | 'Pending';
}

const initialPayments: Payment[] = [
  {
    id: '0001',
    billTo: 'Dr.Johndeo',
    service: 'First Appointment',
    date: '24-03-2025',
    price: '100 $',
    status: 'Completed',
  },
  {
    id: '0002',
    billTo: 'Sarahdoe',
    service: 'Followup',
    date: '23-03-2025',
    price: '200 $',
    status: 'Refunded',
  },
  {
    id: '0003',
    billTo: 'Dr. bobydeo',
    service: 'Followup',
    date: '22-03-2025',
    price: '400 $',
    status: 'Completed',
  },
];

export default function BillPayment() {
  const [searchQuery, setSearchQuery] = useState('');
  const [payments] = useState<Payment[]>(initialPayments);

  const filteredPayments = payments.filter(
    (payment) =>
      payment.billTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
    <Box sx={{ padding: '0px 25px', height: 'calc(100vh - 56px)' }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Payments
          <Typography component="span" color="text.secondary" sx={{ ml: 1 }}>
            ({payments.length} Invoices)
          </Typography>
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
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
      </Box>

      <TableContainer 
        component={Paper} 
        sx={{ 
          boxShadow: 'none',
          border: '1px solid #eee',
          borderRadius: '8px',
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>Invoice</TableCell>
              <TableCell>Bill To</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow
                key={payment.id}
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {payment.id}
                </TableCell>
                <TableCell>{payment.billTo}</TableCell>
                <TableCell>{payment.service}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.price}</TableCell>
                <TableCell>
                  <Chip 
                    label={payment.status} 
                    color={getStatusColor(payment.status) as "success" | "warning" | "info" | "default"}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
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
      </TableContainer>
    </Box>
  );
}