import { Box, Typography, Stack, useMediaQuery, Theme } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useTheme } from '@mui/material/styles';

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

export default function UpcomingAppointment({
  appointments,
  onClick,
}: UpcomingAppointmentProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('lg')
  );

  return (
    <Box>
      <Typography
        variant="body1"
        sx={{ mb: 2, fontWeight: 500 }}
      >
        Upcoming appointments
      </Typography>

      <Box
        sx={{
          display: isMobile ? 'flex' : 'flex',
          width: isMobile ? '100%' : '100%',
          height: isMobile ? 'auto' : 'calc(100vh - 505px)',
          overflowY: isMobile ? 'hidden' : 'auto',
          overflowX: isMobile ? 'auto' : 'hidden',
          flexDirection: isMobile ? 'unset' : 'column',
        }}
      >
        {appointments.map((appointment) => (
          <Box
            key={appointment.id}
            sx={{
              backgroundColor: '#f8f9fa',
              borderRadius: 1,
              p: 2,
              width: isMobile ? '300px' : '100%',
              minWidth: isMobile ? '300px' : 'auto',
              mr: isMobile ? 2 : 0,
              mb: isMobile ? 0 : 2,
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
                mb: 0.5,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%'
              }}
            >
              {appointment.title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessTimeIcon sx={{ fontSize: 20 }} />
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  display: 'flex',
                  alignItems: 'center',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  gap: 0.5,
                }}
              >
                {appointment.startTime} - {appointment.endTime}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}