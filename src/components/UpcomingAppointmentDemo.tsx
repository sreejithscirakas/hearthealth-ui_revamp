import UpcomingAppointment from './UpcomingAppointment';

const demoAppointments = [
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
  }
];

export default function UpcomingAppointmentDemo() {
  const handleAppointmentClick = (appointmentId: string) => {
    console.log('Appointment clicked:', appointmentId);
  };

  return (
    <div style={{ maxWidth: '400px', padding: '20px' }}>
      <UpcomingAppointment 
        appointments={demoAppointments}
        onClick={handleAppointmentClick}
      />
    </div>
  );
}