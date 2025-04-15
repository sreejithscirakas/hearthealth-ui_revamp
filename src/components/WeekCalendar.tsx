import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import FilterDrawer from './FilterDrawer';
import { useState, useEffect } from 'react';

const localizer = momentLocalizer(moment);

interface WeekCalendarProps {
  events: Array<{
    title: string;
    start: Date;
    end: Date;
  }>;
  onEventClick?: (event: any) => void;
}

const EmptyToolbar = () => null;

export default function WeekCalendar({ events, onEventClick }: WeekCalendarProps) {
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  useEffect(() => {
    const handleToggleFilter = () => {
      setFilterDrawerOpen(prev => !prev);
    };

    window.addEventListener('toggleFilterDrawer', handleToggleFilter);

    return () => {
      window.removeEventListener('toggleFilterDrawer', handleToggleFilter);
    };
  }, []);

  const handleEventClick = (event: any) => {
    if (onEventClick) {
      onEventClick(event);
    }
  };

  return (
    <>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        defaultView="month"
        components={{
          toolbar: EmptyToolbar,
        }}
        onSelectEvent={handleEventClick}
      />
      <FilterDrawer
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        onOpen={() => setFilterDrawerOpen(true)}
      />
    </>
  );
}