import React, { useState } from 'react';
import { useTheme, Theme } from '@mui/material/styles';
import {
  Box,
  CssBaseline,
  SwipeableDrawer,
  useMediaQuery,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

import Sidemenu from './components/Sidemenu';
import Header from './components/Header';
import CustomToolbar from './components/CustomToolbar';
import AppointmentDrawer from './components/AppointmentDrawer';
import MiniCalendar from './components/MiniCalendar';
import WeekCalendar from './components/WeekCalendar';
import ClinicianList from './components/ClinicianList';

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
    padding: '0px 25px',
  },
  calendarContainer: {
    flex: '1 1 0%',
    width: '100%',
    height: 'calc(-125px + 100vh)',
  },
};

export default function Layout() {
  const theme = useTheme();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  const [open, setOpen] = useState(false);
  const [week, setWeek] = React.useState('');
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = React.useState(false);
  const [calendarDrawerOpen, setCalendarDrawerOpen] = React.useState(false);
  const [clinicianDrawerOpen, setClinicianDrawerOpen] = React.useState(false);

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

  React.useEffect(() => {
    const handleToggleFilter = () => {
      setFilterDrawerOpen(prev => !prev);
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

  return (
    <Box sx={styles.container}>
      <CssBaseline />
      <Sidemenu open={open} setOpen={setOpen} />
      <Box component="main" sx={styles.main(theme)}>
        <Header />
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
              <Box sx={{height:'336px'}}>
                <MiniCalendar />
              </Box>
              <Box sx={styles.clinicianList}>
                <ClinicianList />
              </Box>
            </Box>
          )}
          <Box sx={styles.calendarContainer}>
            <WeekCalendar events={events} onEventClick={handleEventClick} />
          </Box>
        </Box>
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