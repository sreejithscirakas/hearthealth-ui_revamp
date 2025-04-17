import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Avatar,
  Typography,
  Box,
  useMediaQuery,
  Theme,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  AddRounded,
  ArrowDropDown,
  Person as PersonIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useState } from 'react';

const styles = {
  appBar: {
    backgroundColor: 'white',
    color: 'black',
    boxShadow: 'none',
    paddingRight: '15px'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
    minHeight: 'auto !important',
    margin: '10px 0px 10px 0px'
  },
  userContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '4px',
    borderRadius: '16px',
    cursor: 'pointer',
    background: '#ddd',
  },
  avatar: {
    fontSize: '0.75em',
    lineHeight: '16px',
    width: '24px',
    height: '24px',
    background: '#7986cb',
  },
  username: {
    fontSize: '0.8em',
    paddingLeft: '5px',
    fontWeight: '600'
  }
};

interface HeaderProps {
  onNewAppointment?: () => void;
}

export default function Header({ onNewAppointment }: HeaderProps) {

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (isMobile) {
    return null;
  }


  return (
    <AppBar position="static" sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        <Button sx={{ minWidth: 'auto'}} variant="contained" aria-label="Quick actions"
        onClick={onNewAppointment}
        >
          <AddRounded /> New Appointment
        </Button>

        

        <Box 
          style={styles.userContainer}
          onClick={handleClick}
          aria-controls={open ? 'user-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={styles.avatar}>PU</Avatar>
          <Typography sx={styles.username} variant="subtitle1" aria-label="User">Patient User</Typography>
          <IconButton sx={{padding: '5px', margin: '0'}} aria-label="Activity">
            <ArrowDropDown/>
          </IconButton>
        </Box>

        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            sx: {
              mt: 1,
              width: 320,
              '& .MuiMenuItem-root': {
                py: 1.5,
              },
            },
          }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Patient User</Typography>
            <Typography variant="body2" color="text.secondary">patient@example.com</Typography>
          </Box>
          <Divider />
          <Box sx={{ p: 1 }}>
            <Typography variant="overline" sx={{ px: 1, color: 'text.secondary' }}>
              Account
            </Typography>
            <MenuItem>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              My Profile
            </MenuItem>
          </Box>
          <Divider />
          <Box sx={{ p: 1 }}>
            <MenuItem sx={{ color: 'error.main' }}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" color="error" />
              </ListItemIcon>
              Sign out
            </MenuItem>
          </Box>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}