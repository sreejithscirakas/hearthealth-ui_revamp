import { Box, Typography, Stack } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface Appointment {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
}

interface UpcomingAppointmentProps {
  appointments: Appointment[];
  onClick?: (appointmentId: string) => void;
}





export default function UpcomingAppointment({ appointments, onClick }: UpcomingAppointmentProps) {
  return (
    <Box>
      <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
        Upcoming appointments
      </Typography>
      
      <Stack spacing={1} sx={{height:'calc(100vh - 510px)',overflowY:'auto'}}>
        {appointments.map((appointment) => (
          <Box
            key={appointment.id}
            sx={{
              backgroundColor: '#f8f9fa',
              borderRadius: 1,
              p: 2,
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: '#f0f1f2',
                transform: 'translateY(-1px)',
              },
            }}
            onClick={() => onClick?.(appointment.id)}
          >
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: 'text.primary',
                mb: 0.5
              }}
            >
              {appointment.title}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessTimeIcon/>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5
                }}
              >
                {appointment.startTime} - {appointment.endTime}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
