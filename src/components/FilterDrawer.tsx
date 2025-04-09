import {
    Box,
    SwipeableDrawer,
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Divider,
    Button,
  } from '@mui/material';
  
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
        <Box sx={{ width: 320, p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Filter Calendar
          </Typography>
  
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Status
          </Typography>
          <FormGroup sx={{ mb: 3 }}>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Confirmed" />
            <FormControlLabel control={<Checkbox defaultChecked />} label="Pending" />
            <FormControlLabel control={<Checkbox defaultChecked />} label="Cancelled" />
          </FormGroup>
  
          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Button variant="contained" fullWidth onClick={onClose}>
              Apply
            </Button>
            <Button variant="outlined" fullWidth onClick={onClose}>
              Reset
            </Button>
          </Box>
        </Box>
      </SwipeableDrawer>
    );
  }