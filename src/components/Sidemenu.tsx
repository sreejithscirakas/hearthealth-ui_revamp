import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Drawer as MuiDrawer,
  List,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
}

const menuItems = [
  { text: 'Calendar', icon: <CalendarTodayIcon />, active: true },
  { text: 'Signup Requests', icon: <ContactPageIcon />, active: false },
  { text: 'Billing', icon: <PaymentIcon />, active: false },
  { text: 'Profile', icon: <AccountCircleIcon />, active: false },
];

export default function Sidemenu({ open, setOpen }: SidemenuProps) {
  const theme = useTheme();

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={precisionHeartIcon} alt="Logo" style={{ height: '40px', marginRight: '8px' }} />
            <Typography className="logo-txt" variant="h6" noWrap
            sx={{ display: open ? 'block' : 'none', color:'primary.main' }}
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
            borderRadius:'0px',
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
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton 
              sx={{ 
                justifyContent: open ? 'initial' : 'center',
                backgroundColor: item.active ? theme.palette.primary.main : 'transparent',
                '&:hover': {
                  backgroundColor: item.active ? theme.palette.primary.dark : 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <ListItemIcon 
                sx={{ 
                  justifyContent: 'center', 
                  mr: open ? 0 : 'auto', 
                  color: item.active ? 'white' : 'black'
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  opacity: open ? 1 : 0, 
                  color: item.active ? 'white' : 'black'
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}