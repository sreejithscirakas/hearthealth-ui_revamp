import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  IconButton,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import { 
  ChevronLeft, 
  ChevronRight,
  LinkRounded,
  Add as AddIcon,
  FilterAlt,
  Settings,
} from '@mui/icons-material';
import type { SelectChangeEvent } from '@mui/material/Select';

interface CustomToolbarProps {
  week: string;
  handleChange: (event: SelectChangeEvent) => void;
  toggleDrawer: (open: boolean) => () => void;
}

export default function CustomToolbar({ week, handleChange, toggleDrawer }: CustomToolbarProps) {
  const theme = useTheme();

  return (
    <Box className="CustomToolbar" sx={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '20px' }}>
      <Box display="flex" alignItems="center" sx={{ gap: '20px',padding:'0px 25px' }}>
        <Button variant="outlined" size="medium">
          Today
        </Button>
        <Box display="flex" alignItems="center">
          <IconButton size="small">
            <ChevronLeft />
          </IconButton>
          <IconButton size="small">
            <ChevronRight />
          </IconButton>
          <Typography variant="body1" noWrap>30 Mar - 5 Apr 2025</Typography>
        </Box>

        <FormControl sx={{ margin: '0', padding: '0', minWidth: 120 }}>
          <Select
            value={week}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{
              '& .MuiSelect-select': {
                padding: '7px 14px',
                color: theme.palette.primary.main
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
              },
            }}
          >
            <MenuItem value="">Week</MenuItem>
            <MenuItem value={10}>Day</MenuItem>
            <MenuItem value={20}>Week</MenuItem>
            <MenuItem value={30}>Month</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box display="flex" alignItems="center" sx={{ gap: '20px' }}>
        <Button onClick={toggleDrawer(true)} variant="outlined" size="medium" startIcon={<LinkRounded />}>
          Booking
        </Button>
        <Button variant="contained" size="medium" startIcon={<AddIcon />}>
          New
        </Button>
        <IconButton size="medium">
          <FilterAlt />
        </IconButton>
        <IconButton size="medium" aria-label="more">
          <Settings />
        </IconButton>
      </Box>
    </Box>
  );
}