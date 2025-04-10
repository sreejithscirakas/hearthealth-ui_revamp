import {
  Box,
  SwipeableDrawer,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FilterChips from './FilterChips';

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function FilterDrawer({ open, onClose, onOpen }: FilterDrawerProps) {
  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      sx={{ overflowX: 'unset', overflowY: 'unset' }}
    >
      <Box sx={{ width: 320 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid #eee' }}>
          <Typography variant="h6">Filter Calendar</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ p: 2 }}>
          <FilterChips vertical showLabel />
        </Box>

      </Box>
    </SwipeableDrawer>
  );
}