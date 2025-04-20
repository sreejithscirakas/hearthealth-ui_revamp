import React, { useState } from 'react';
import { useTheme, Theme } from '@mui/material/styles';
import {
  Box,
  CssBaseline,
  SwipeableDrawer,
  useMediaQuery,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

import ClinicianSidemenu from './components/ClinicianSidemenu';
import ClinicianHeader from './components/ClinicianHeader';
import CustomToolbar from './components/CustomToolbar';
import AppointmentDrawer from './components/AppointmentDrawer';
import MiniCalendar from './components/MiniCalendar';
import WeekCalendar from './components/WeekCalendar';
import BillPayment from './pages/BillPayment';
import Profile from './pages/Profile';
import MarkAvailable from './components/MarkAvailable';
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
    overflow: 'hidden',
    flexShrink: 0,
    scrollbarGutter: 'stable',
    height: 'calc(-125px + 100vh)',
  },
  clinicianList: {
    padding: '0px 25px'
  },
};

export default function Layout() {
  const theme = useTheme();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('lg')
  );
  const [open, setOpen] = useState(false);
  const [week, setWeek] = React.useState('');
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = React.useState(false);
  const [calendarDrawerOpen, setCalendarDrawerOpen] = React.useState(false);
  const [markAvailableOpen, setMarkAvailableOpen] = React.useState(false);
  const [activeView, setActiveView] = React.useState('calendar');
  const [clinicianDrawerOpen, setClinicianDrawerOpen] = React.useState(false);

  const [events] = useState([
    {
      title: 'Appointment',
      start: new Date(2025, 3, 5, 10, 0),
      end: new Date(2025, 3, 5, 12, 0),
    },
    {
      title: 'Appointment',
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

  const handleMarkAvailable = () => {
    setMarkAvailableOpen(true);
  };

  const handleMenuItemClick = (index: number) => {
    switch (index) {
      case 0:
        setActiveView('calendar');
        break;
      case 1:
        setActiveView('billing');
        break;
      case 2:
        setActiveView('profile');
        break;
      default:
        setActiveView('calendar');
    }
  };

  return (
    <Box sx={styles.container}>
      <CssBaseline />
      <ClinicianSidemenu
        open={open}
        setOpen={setOpen}
        onMenuItemClick={handleMenuItemClick}
      />
      <Box component="main" sx={styles.main(theme)}>
        <ClinicianHeader onNewAppointment={handleMarkAvailable} />
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
                  <Box sx={{ height: '336px' }}>
                    <MiniCalendar />
                  </Box>
                  <Box sx={styles.clinicianList}>
                  <UpcomingAppointment 
                    appointments={UpcomingAppointments}
                  />
                  </Box>
                </Box>
              )}
              <Box
                sx={{
                  flex: '1 1 0%',
                  width: '100%',
                  height: isMobile
                    ? 'calc(-290px + 100vh)'
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
               <UpcomingAppointment 
                    appointments={UpcomingAppointments}
                  />
            </Box>
          </>
        )}
        {activeView === 'billing' && <BillPayment />}
        {activeView === 'profile' && <Profile />}
      </Box>

      <AppointmentDrawer
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      />

      <MarkAvailable
        open={markAvailableOpen}
        onClose={() => setMarkAvailableOpen(false)}
        onOpen={() => setMarkAvailableOpen(true)}
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

    </Box>
  );
}