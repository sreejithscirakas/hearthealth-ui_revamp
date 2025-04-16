import { styled, useTheme, Theme } from '@mui/material/styles';
import {
  Box,
  Drawer as MuiDrawer,
  List,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  useMediaQuery,
  Paper,
  Fab
} from '@mui/material';
import { ChevronLeft, ChevronRight, Add as AddIcon } from '@mui/icons-material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import precisionHeartIcon from "../assets/favicon.png";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  width: open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: open ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen,
  }),
  '& .MuiDrawer-paper': {
    width: open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
    overflow: 'unset',
    backgroundColor: theme.palette.sidebar.main,
    position: 'relative',
  },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface SidemenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onMenuItemClick: (index: number) => void;
}

const menuItems = [
  { text: 'Calendar', mobileText: 'Calendar', icon: <CalendarTodayIcon /> },
  { text: 'Billing', mobileText: 'Billing', icon: <PaymentIcon /> },
  { text: 'Profile', mobileText: 'Profile', icon: <AccountCircleIcon /> },
];

export default function Sidemenu({ open, setOpen, onMenuItemClick }: SidemenuProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
    onMenuItemClick(index);
  };

  if (isMobile) {
    return (
      <>
        <Fab 
          color="primary"
          aria-label="add"
          sx={{
            position: 'fixed',
            bottom: 50,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1100,
            width:'50px',
            height:'50px'
          }}
        >
          <AddIcon />
        </Fab>
        <Paper 
          sx={{ 
            position: 'fixed', 
            bottom: 0, 
            left: 0, 
            right: 0,
            zIndex: 1000,
            borderTop: '1px solid rgba(0, 0, 0, 0.12)'
          }} 
          elevation={3}
        >
          <BottomNavigation
            value={activeIndex}
            onChange={(event, newValue) => {
              handleItemClick(newValue);
            }}
            sx={{
              '& .Mui-selected': {
                color: theme.palette.primary.main,
              },
              '& .MuiBottomNavigationAction-label': {
                fontSize: '0.75rem !important',
                transition: 'none !important',
                lineHeight: '1.2 !important',
                fontWeight: '400 !important',
                opacity: '1 !important',
              },
              '& .Mui-selected .MuiBottomNavigationAction-label': {
                fontSize: '0.75rem !important',
                opacity: '1 !important',
              },
            }}
          >
            {menuItems.map((item, index) => (
              <BottomNavigationAction
                key={item.text}
                label={item.mobileText}
                icon={item.icon}
                sx={{
                  minWidth: 'auto',
                  padding: '6px 12px',
                  '& .MuiBottomNavigationAction-label': {
                    opacity: 1,
                  },
                }}
              />
            ))}
          </BottomNavigation>
        </Paper>
      </>
    );
  }

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={precisionHeartIcon} alt="Logo" style={{ height: '40px', marginRight: '8px' }} />
          <Typography 
            variant="h6" 
            noWrap
            sx={{ 
              display: open ? 'block' : 'none', 
              color: 'primary.main',
              fontWeight: 600 
            }}
          >
            Precision-Heart
          </Typography>
        </Box>
        <IconButton 
          onClick={() => setOpen(!open)} 
          sx={{ 
            position: 'absolute',
            right: '-24px',
            top: '0px',
            borderRadius: '0px',
            zIndex: 1,
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            width: '24px',
            height: '24px',
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
            '& .MuiSvgIcon-root': {
              fontSize: '20px',
            },
          }}
        >
          {open ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </DrawerHeader>
      
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton 
              onClick={() => handleItemClick(index)}
              sx={{ 
                justifyContent: open ? 'initial' : 'center',
                backgroundColor: activeIndex === index ? theme.palette.primary.main : 'transparent',
                '&:hover': {
                  backgroundColor: activeIndex === index ? theme.palette.primary.dark : 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <ListItemIcon 
                sx={{ 
                  justifyContent: 'center', 
                  mr: open ? 0 : 'auto', 
                  color: activeIndex === index ? 'white' : 'black'
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  opacity: open ? 1 : 0, 
                  color: activeIndex === index ? 'white' : 'black'
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}