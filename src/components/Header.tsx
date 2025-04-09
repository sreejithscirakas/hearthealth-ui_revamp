import {
    AppBar,
    Toolbar,
    Button,
    IconButton,
    Badge,
    Avatar,
    Typography,
    Box
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
      paddingRight:'15px'
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '10px',
      paddingLeft: '0 !important',
      paddingRight: '0 !important',
      minHeight:'auto !important',
      margin:'5px 0px 10px 0px'
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
      fontSize:'0.75em',
      lineHeight:'16px',
      width: '24px',
      height: '24px',
      background: '#7986cb',
    },
    username:{
      fontSize:'0.8em',
      paddingLeft:'5px',
      fontWeight:'600'
    }
  };
  
  export default function Header() {
    return (
      <AppBar position="static" sx={styles.appBar}>
        <Toolbar sx={styles.toolbar}>
          <Button sx={{padding:'0',margin:'0',minWidth:'auto'}} variant="contained" size="small" aria-label="Quick actions">
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
  
          <Box style={styles.userContainer}>
            <Avatar sx={styles.avatar}>PM</Avatar>
            <Typography sx={styles.username} variant="subtitle1" aria-label="User">Practice Manager</Typography>
            <IconButton sx={{padding:'5px',margin:'0'}} aria-label="Activity">
              <ArrowDropDown/>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }