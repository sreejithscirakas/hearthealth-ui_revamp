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
    <Box className="CustomToolbar" sx={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '20px' }}>
      <Box display="flex" alignItems="center" sx={{ gap: '20px', padding: '0px 25px' }}>
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

        <FormControl sx={{ margin: '0', padding: '0', minWidth: 120 }}>
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

      <Box display="flex" alignItems="center" sx={{ gap: '20px', paddingRight: '15px' }}>
        {isMobile ? (
          <>
            <IconButton 
              size="medium" 
              onClick={onGroupClick}
              sx={{
                backgroundColor: theme.palette.grey[100],
                '&:hover': {
                  backgroundColor: theme.palette.grey[200],
                },
              }}
            >
              <GroupAdd />
            </IconButton>
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