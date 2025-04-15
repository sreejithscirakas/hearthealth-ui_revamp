import { useTheme, Theme } from '@mui/material/styles';
import {
  Box,
  Button,
  IconButton,
  Typography,
  FormControl,
  Select,
  MenuItem,
  useMediaQuery
} from '@mui/material';
import { 
  ChevronLeft, 
  ChevronRight,
  FilterAlt,
  CalendarToday,
  GroupAdd,
} from '@mui/icons-material';
import type { SelectChangeEvent } from '@mui/material/Select';
import FilterChips from './FilterChips';

interface CustomToolbarProps {
  week: string;
  handleChange: (event: SelectChangeEvent) => void;
  toggleDrawer: (open: boolean) => () => void;
  onCalendarClick: () => void;
  onGroupClick: () => void;
}

export default function CustomToolbar({ week, handleChange, toggleDrawer, onCalendarClick, onGroupClick }: CustomToolbarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  const handleFilterClick = () => {
    window.dispatchEvent(new CustomEvent('toggleFilterDrawer'));
  };

  return (
    <Box className="CustomToolbar" 
    sx={{ 
      display: 'flex', 
      width:'100%',
      justifyContent: 'space-between', 
      paddingBottom: isMobile ? '20px' : '10px', 
      paddingTop: isMobile ? '10px' : '0px' 
      }}>
      <Box display="flex" alignItems="center" sx={{ gap: isMobile ? '0px' : '20px', padding: isMobile ? '0px 0px' : '0px 25px' }}>
        {!isMobile && (
          <Button variant="outlined" size="medium">
            Today
          </Button>
        )}
        <Box display="flex" alignItems="center">
          <IconButton size="small">
            <ChevronLeft />
          </IconButton>
          {isMobile && (
            <IconButton size="small" onClick={onCalendarClick}>
              <CalendarToday />
            </IconButton>
          )}
          <IconButton size="small">
            <ChevronRight />
          </IconButton>
          {!isMobile && (
            <Typography variant="body1" noWrap>30 Mar - 5 Apr 2025</Typography>
          )}
        </Box>

        <FormControl sx={{ margin: '0', padding: '0', minWidth: isMobile ? 'auto' : 120 }}>
          <Select
            value={week || (isMobile ? 'today' : 'week')}
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
            {isMobile && <MenuItem value="today">Today</MenuItem>}
            <MenuItem value="week">Week</MenuItem>
            <MenuItem value="day">Day</MenuItem>
            <MenuItem value="month">Month</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box display="flex" alignItems="center" sx={{ gap: isMobile ? '10px' : '20px', paddingRight: isMobile ? '15px' : '15px' }}>
        {isMobile ? (
          <>
            <IconButton 
              size="medium" 
              onClick={handleFilterClick}
              sx={{
                backgroundColor: theme.palette.grey[100],
                '&:hover': {
                  backgroundColor: theme.palette.grey[200],
                },
              }}
            >
              <FilterAlt />
            </IconButton>
          </>
        ) : (
          <FilterChips />
        )}
      </Box>
    </Box>
  );
}