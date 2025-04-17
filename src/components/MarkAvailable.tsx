import {
    Box,
    Typography,
    IconButton,
    SwipeableDrawer,
    useTheme,
    useMediaQuery,
    Stack,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Chip,
  } from '@mui/material';
  import { Close as CloseIcon } from '@mui/icons-material';
  import { LocalizationProvider } from '@mui/x-date-pickers';
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  import { DatePicker } from '@mui/x-date-pickers/DatePicker';
  import { TimePicker } from '@mui/x-date-pickers/TimePicker';
  import { useState } from 'react';
  import dayjs from 'dayjs';
  
  interface MarkAvailableProps {
    open: boolean;
    onClose: () => void;
    onOpen: () => void;
  }
  
  const timeSlots = [
    '15 minutes',
    '30 minutes',
    '45 minutes',
    '1 hour',
    '1.5 hours',
    '2 hours',
  ];
  
  const repeatOptions = [
    'Does not repeat',
    'Daily',
    'Weekly',
    'Monthly',
    'Custom',
  ];
  
  export default function MarkAvailable({ open, onClose, onOpen }: MarkAvailableProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
    const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
    const [selectedDuration, setSelectedDuration] = useState('30 minutes');
    const [repeatOption, setRepeatOption] = useState('Does not repeat');
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
  
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
    const handleDayToggle = (day: string) => {
      setSelectedDays(prev => 
        prev.includes(day) 
          ? prev.filter(d => d !== day)
          : [...prev, day]
      );
    };
  
    const handleSave = () => {
      console.log({
        date: selectedDate,
        startTime,
        endTime,
        duration: selectedDuration,
        repeat: repeatOption,
        days: selectedDays,
      });
      onClose();
    };
  
    return (
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={onClose}
        onOpen={onOpen}
        sx={{
            overflowX: 'unset',
            overflowY: 'unset',
            '& .MuiPaper-root.MuiPaper-elevation': {
              overflowY: 'unset',
            },
          }}
      >
        <IconButton
        onClick={onClose}
        sx={{
          position: isMobile ? 'static' : 'absolute',
          left: isMobile ? 'auto' : '-60px',
          top: isMobile ? 'auto' : '17px',
          backgroundColor: isMobile ? 'transparent' : '#fff',
          color: isMobile ? 'inherit' : '#000',
          borderRadius: isMobile ? '50%' : '50%',
          width: isMobile ? '40px' : '48px',
          height: isMobile ? '40px' : '48px',
          '&:hover': {
            backgroundColor: isMobile
              ? 'rgba(0, 0, 0, 0.04)'
              : 'rgb(242, 244, 247)',
          },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CloseIcon />
      </IconButton>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ 
            p: 2, 
            borderBottom: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography variant="h6">Mark Available</Typography>
            
          </Box>
  
          <Box sx={{ p: 2, flexGrow: 1, overflowY: 'auto' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DatePicker
                  label="Date"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  sx={{ width: '100%' }}
                />
  
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TimePicker
                    label="Start Time"
                    value={startTime}
                    onChange={(newValue) => setStartTime(newValue)}
                    sx={{ flex: 1 }}
                  />
                  <TimePicker
                    label="End Time"
                    value={endTime}
                    onChange={(newValue) => setEndTime(newValue)}
                    sx={{ flex: 1 }}
                  />
                </Box>
  
                <FormControl fullWidth>
                  <InputLabel>Duration</InputLabel>
                  <Select
                    value={selectedDuration}
                    label="Duration"
                    onChange={(e) => setSelectedDuration(e.target.value)}
                  >
                    {timeSlots.map((slot) => (
                      <MenuItem key={slot} value={slot}>
                        {slot}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
  
                <FormControl fullWidth>
                  <InputLabel>Repeat</InputLabel>
                  <Select
                    value={repeatOption}
                    label="Repeat"
                    onChange={(e) => setRepeatOption(e.target.value)}
                  >
                    {repeatOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
  
                {(repeatOption === 'Weekly' || repeatOption === 'Custom') && (
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Repeat on
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {days.map((day) => (
                        <Chip
                          key={day}
                          label={day}
                          onClick={() => handleDayToggle(day)}
                          color={selectedDays.includes(day) ? 'primary' : 'default'}
                          variant={selectedDays.includes(day) ? 'filled' : 'outlined'}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
  
                {repeatOption === 'Custom' && (
                  <TextField
                    label="Custom Repeat Rule"
                    placeholder="e.g., Every 2 weeks"
                    fullWidth
                  />
                )}
              </Stack>
            </LocalizationProvider>
          </Box>
  
          <Box sx={{ 
            p: 2, 
            borderTop: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'center',
            gap: 2
          }}>
            
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </SwipeableDrawer>
    );
  }