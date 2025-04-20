import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function MiniCalendar() {
  return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
        
      />
      </LocalizationProvider>
  );
}