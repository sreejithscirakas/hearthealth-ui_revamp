import {
    AppBar,
    Toolbar,
    Button,
    IconButton,
    Badge,
    Avatar,
    Typography,
  } from '@mui/material';
  import {
    AddRounded,
    HelpRounded,
    NotificationsRounded,
    ArrowDropDown,
  } from '@mui/icons-material';
  
  const styles = {
    appBar: {
      backgroundColor: 'white',
      color: 'black',
      boxShadow: 'none',
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '20px',
      paddingLeft: '0 !important',
      paddingRight: '0 !important',
    },
    userContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    avatar: {
      marginRight: 1,
    },
  };
  
  export default function Header() {
    return (
      <AppBar position="static" sx={styles.appBar}>
        <Toolbar sx={styles.toolbar}>
          <Button variant="contained" size="small" aria-label="Quick actions">
            <AddRounded />
          </Button>
  
          <IconButton aria-label="Help">
            <HelpRounded />
          </IconButton>
  
          <IconButton aria-label="Activity">
            <Badge badgeContent={0} color="primary">
              <NotificationsRounded />
            </Badge>
          </IconButton>
  
          <div style={styles.userContainer}>
            <Avatar sx={styles.avatar}>PM</Avatar>
            <Typography variant="subtitle1" aria-label="User">Practice Manager</Typography>
            <IconButton aria-label="Dropdown">
              <ArrowDropDown />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    );
  }