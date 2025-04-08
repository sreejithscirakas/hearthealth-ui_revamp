import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

interface WeekCalendarProps {
  events: Array<{
    title: string;
    start: Date;
    end: Date;
  }>;
}

const EmptyToolbar = () => null;

export default function WeekCalendar({ events }: WeekCalendarProps) {
  return (
    
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        defaultView="week"
        components={{
          toolbar: EmptyToolbar,
        }}
      />
  );
}