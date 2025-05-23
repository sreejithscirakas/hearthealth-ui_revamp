import React, { useState } from 'react';
import { useTheme, Theme } from '@mui/material/styles';
import {
  Box,
  CssBaseline,
  SwipeableDrawer,
  useMediaQuery,
  Collapse,
  Typography,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import type { SelectChangeEvent } from '@mui/material/Select';

import Sidemenu from './components/Sidemenu';
import Header from './components/Header';
import CustomToolbar from './components/CustomToolbar';
import AppointmentDrawer from './components/AppointmentDrawer';
import MiniCalendar from './components/MiniCalendar';
import WeekCalendar from './components/WeekCalendar';
import ClinicianList from './components/ClinicianList';
import SignupRequests from './pages/SignupRequests';
import Clinicians from './pages/Clinicians';
import BillPayment from './pages/BillPayment';
import Profile from './pages/Profile';
import UpcomingAppointment from './components/UpcomingAppointment';

const styles = {
  container: {
    display: 'flex',
    margin: 0,
    overflowX: 'hidden',
  },
  main: (theme: Theme) => ({
    flexGrow: 1,
    p: '0 0px',
    margin: 0,
    width: '100%',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }),
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0px',
    width: '340px',
    overflowY: 'auto',
    flexShrink: 0,
    scrollbarGutter: 'stable',
    height: 'calc(-125px + 100vh)',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 25px',
    margin:'0px 15px 0px 15px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
  clinicianList: {
    padding: '0px 25px',
  },
};

export default function Layout() {
  const theme = useTheme();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [open, setOpen] = useState(true);
  const [week, setWeek] = React.useState('');
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = React.useState(false);
  const [calendarDrawerOpen, setCalendarDrawerOpen] = React.useState(false);
  const [clinicianDrawerOpen, setClinicianDrawerOpen] = React.useState(false);
  const [activeView, setActiveView] = React.useState('calendar');
  
  const [cliniciansOpen, setClinicianOpen] = React.useState(true);
  const [otherEventsOpen, setOtherEventsOpen] = React.useState(false);

  const [events] = useState([
    {
      title: 'Board meeting',
      start: new Date(2025, 3, 5, 10, 0),
      end: new Date(2025, 3, 5, 12, 0),
    },
    {
      title: 'Team lunch',
      start: new Date(2025, 3, 6, 12, 0),
      end: new Date(2025, 3, 6, 13, 0),
    },
  ]);

  const UpcomingAppointments = [
    {
      id: '1',
      title: 'New Appointment',
      startTime: '10:30 AM',
      endTime: '11:30 AM'
    },
    {
      id: '2',
      title: 'Follow-up',
      startTime: '11:30 AM',
      endTime: '12:30 PM'
    },
    {
      id: '3',
      title: 'New Appointment',
      startTime: '10:30 AM',
      endTime: '11:30 AM'
    },
    {
      id: '4',
      title: 'Follow-up',
      startTime: '11:30 AM',
      endTime: '12:30 PM'
    }
  ];

  React.useEffect(() => {
    const handleToggleFilter = () => {
      setFilterDrawerOpen((prev) => !prev);
    };

    window.addEventListener('toggleFilterDrawer', handleToggleFilter);
    return () => {
      window.removeEventListener('toggleFilterDrawer', handleToggleFilter);
    };
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setWeek(event.target.value);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const toggleFilterDrawer = (open: boolean) => () => {
    setFilterDrawerOpen(open);
  };

  const handleCalendarClick = () => {
    setCalendarDrawerOpen(true);
  };

  const handleGroupClick = () => {
    setClinicianDrawerOpen(true);
  };

  const handleEventClick = (event: any) => {
    setDrawerOpen(true);
  };

  const handleMenuItemClick = (index: number) => {
    switch (index) {
      case 0:
        setActiveView('calendar');
        break;
      case 1:
        setActiveView('signup-requests');
        break;
      case 2:
        setActiveView('clinicians');
        break;
      case 3:
        setActiveView('billing');
        break;
      case 4:
        setActiveView('profile');
        break;
      default:
        setActiveView('calendar');
    }
  };

  const toggleSection = (section: string) => {
    if (section === 'clinicians') {
      setClinicianOpen(!cliniciansOpen);
      setOtherEventsOpen(false);
    } else if (section === 'services') {
      setClinicianOpen(false);
      setOtherEventsOpen(false);
    } else if (section === 'otherEvents') {
      setOtherEventsOpen(!otherEventsOpen);
      setClinicianOpen(false);
    }
  };

  return (
    <Box sx={styles.container}>
      <CssBaseline />
      <Sidemenu
        open={open}
        setOpen={setOpen}
        onMenuItemClick={handleMenuItemClick}
      />
      <Box component="main" sx={styles.main(theme)}>
        <Header />
        {activeView === 'calendar' && (
          <>
            <CustomToolbar
              week={week}
              handleChange={handleChange}
              toggleDrawer={toggleDrawer}
              onCalendarClick={handleCalendarClick}
              onGroupClick={handleGroupClick}
            />

            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              {!isMobile && (
                <Box sx={styles.sidebar}>
                  <Box >
                    <MiniCalendar />
                  </Box>
                  
                  {/* Clinicians Section */}
                  <Box>
                    <Box 
                      sx={styles.sectionHeader} 
                      onClick={() => toggleSection('clinicians')}
                    >
                      <Typography variant="subtitle1">Clinicians</Typography>
                      <IconButton size="small">
                        {cliniciansOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    </Box>
                    <Collapse in={cliniciansOpen}>
                      <Box sx={styles.clinicianList}>
                        <ClinicianList />
                      </Box>
                    </Collapse>
                  </Box>

                  <Box>
                    <Box 
                      sx={styles.sectionHeader}
                      onClick={() => toggleSection('otherEvents')}
                    >
                      <Typography variant="subtitle1">Upcoming Appointments</Typography>
                      <IconButton size="small">
                        {otherEventsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    </Box>
                    <Collapse in={otherEventsOpen}>
                      <Box sx={styles.clinicianList}>
                        <UpcomingAppointment 
                          appointments={UpcomingAppointments}
                        />
                      </Box>
                    </Collapse>
                  </Box>
                </Box>
              )}
              <Box
                sx={{
                  flex: '1 1 0%',
                  width: '100%',
                  height: isMobile
                    ? 'calc(-270px + 100vh)'
                    : 'calc(-125px + 100vh)',
                }}
              >
                <WeekCalendar events={events} onEventClick={handleEventClick} />
              </Box>
            </Box>
            <Box
              className="resscreen_clinicianlist"
              sx={{ display: isMobile ? 'block' : 'none', marginTop: '25px' }}
            >
              <ClinicianList />
            </Box>
          </>
        )}

        {activeView === 'signup-requests' && <SignupRequests />}
        {activeView === 'clinicians' && <Clinicians />}
        {activeView === 'billing' && <BillPayment />}
        {activeView === 'profile' && <Profile />}
      </Box>

      <AppointmentDrawer
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      />

      <SwipeableDrawer
        anchor="bottom"
        open={calendarDrawerOpen}
        onClose={() => setCalendarDrawerOpen(false)}
        onOpen={() => setCalendarDrawerOpen(true)}
      >
        <Box sx={{ height: '50vh', padding: 2 }}>
          <MiniCalendar />
        </Box>
      </SwipeableDrawer>

      <SwipeableDrawer
        anchor="bottom"
        open={clinicianDrawerOpen}
        onClose={() => setClinicianDrawerOpen(false)}
        onOpen={() => setClinicianDrawerOpen(true)}
      >
        <Box sx={{ height: '50vh', padding: 2 }}>
          <ClinicianList />
        </Box>
      </SwipeableDrawer>
    </Box>
  );
}