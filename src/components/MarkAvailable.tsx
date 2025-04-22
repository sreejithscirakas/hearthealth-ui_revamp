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
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { Close as CloseIcon, Add as AddIcon } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useState } from 'react';
import dayjs from 'dayjs';

interface TimeSlot {
  startTime: dayjs.Dayjs | null;
  endTime: dayjs.Dayjs | null;
}

interface MarkAvailableProps {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const repeatOptions = [
  'Does not repeat',
  'Daily',
  'Weekly',
  'Monthly',
  'Custom',
];

const weekDays = [
  { key: 'Mon', label: 'M' },
  { key: 'Tue', label: 'T' },
  { key: 'Wed', label: 'W' },
  { key: 'Thu', label: 'T' },
  { key: 'Fri', label: 'F' },
  { key: 'Sat', label: 'S' },
  { key: 'Sun', label: 'S' },
];

export default function MarkAvailable({ open, onClose, onOpen }: MarkAvailableProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([{
    startTime: null,
    endTime: null
  }]);
  const [repeatOption, setRepeatOption] = useState('Does not repeat');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [repeatInterval, setRepeatInterval] = useState(1);
  const [repeatUnit, setRepeatUnit] = useState('week');
  const [endType, setEndType] = useState('never');
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);
  const [occurrences, setOccurrences] = useState('13');

  const handleDayToggle = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const handleAddTimeSlot = () => {
    setTimeSlots(prev => [...prev, { startTime: null, endTime: null }]);
  };

  const handleTimeChange = (index: number, type: 'startTime' | 'endTime', value: dayjs.Dayjs | null) => {
    setTimeSlots(prev => {
      const newSlots = [...prev];
      newSlots[index] = {
        ...newSlots[index],
        [type]: value
      };
      return newSlots;
    });
  };

  const handleSave = () => {
    console.log({
      date: selectedDate,
      timeSlots,
      repeat: repeatOption,
      custom: repeatOption === 'Custom' ? {
        interval: repeatInterval,
        unit: repeatUnit,
        days: selectedDays,
        endType,
        endDate,
        occurrences: endType === 'after' ? occurrences : undefined
      } : undefined
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
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column',
        width: { xs: '100vw', sm: '100vw', md: 590 },
        maxWidth: '100%',
       }}>
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
            {repeatOption !== 'Custom' && repeatOption !== 'Weekly' && (
                <DatePicker
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  sx={{ width: '100%' }}
                />
              )}

{timeSlots.map((slot, index) => (
                    <Box key={index} sx={{ display: 'flex', gap: 2 }}>
                      <TimePicker
                        label="Start Time"
                        value={slot.startTime}
                        onChange={(newValue) => handleTimeChange(index, 'startTime', newValue)}
                        sx={{ flex: 1 }}
                      />
                      <TimePicker
                        label="End Time"
                        value={slot.endTime}
                        onChange={(newValue) => handleTimeChange(index, 'endTime', newValue)}
                        sx={{ flex: 1 }}
                      />
                    </Box>
                  ))}
                  {repeatOption !== 'Custom' && repeatOption !== 'Weekly' && (
                  <Button
                    startIcon={<AddIcon />}
                    onClick={handleAddTimeSlot}
                    variant="outlined"
                    sx={{ alignSelf: 'flex-start' }}
                  >
                    Add More Time Slot
                  </Button>
                
                  )}

              <FormControl fullWidth sx={{ width: '100%' }}>
                <InputLabel>Repeat</InputLabel>
                <Select
                sx={{ width: '100%' }}
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
              {repeatOption === 'Weekly' && (
                  <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Repeat on
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {weekDays.map((day) => (
                      <Button
                        key={day.key}
                        variant={selectedDays.includes(day.key) ? "contained" : "outlined"}
                        onClick={() => handleDayToggle(day.key)}
                        sx={{ 
                          minWidth: '40px',
                          borderRadius: '50%',
                          p: 0,
                          width: '40px',
                          height: '40px'
                        }}
                      >
                        {day.label}
                      </Button>
                    ))}
                  </Box>
                </Box>
              )}
              

              
               
 

                {repeatOption === 'Custom' && (
                <Stack spacing={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography>Repeat every</Typography>
                    <Select
                      value={repeatInterval}
                      onChange={(e) => setRepeatInterval(Number(e.target.value))}
                      size="small"
                      sx={{ width: 80 }}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <MenuItem key={num} value={num}>{num}</MenuItem>
                      ))}
                    </Select>
                    <Select
                      value={repeatUnit}
                      onChange={(e) => setRepeatUnit(e.target.value)}
                      size="small"
                      sx={{ width: 120 }}
                    >
                      <MenuItem value="week">week</MenuItem>
                      <MenuItem value="day">day</MenuItem>
                      <MenuItem value="month">month</MenuItem>
                      <MenuItem value="month">year</MenuItem>
                    </Select>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Repeat on
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {weekDays.map((day) => (
                        <Button
                          key={day.key}
                          variant={selectedDays.includes(day.key) ? "contained" : "outlined"}
                          onClick={() => handleDayToggle(day.key)}
                          sx={{ 
                            minWidth: '40px',
                            borderRadius: '50%',
                            p: 0,
                            width: '40px',
                            height: '40px'
                          }}
                        >
                          {day.label}
                        </Button>
                      ))}
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Ends
                    </Typography>
                    <RadioGroup
                      value={endType}
                      onChange={(e) => setEndType(e.target.value)}
                    >
                      <FormControlLabel 
                        value="never" 
                        control={<Radio />} 
                        label="Never" 
                        sx={{ width: 50 }}
                      />
                      <FormControlLabel
                        sx={{ mb: 1 }}
                        value="on"
                        control={<Radio />}
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography sx={{ width: 50 }}>On</Typography>
                            <DatePicker
                              value={endDate}
                              onChange={(newValue) => setEndDate(newValue)}
                              disabled={endType !== 'on'}
                              sx={{
                                width: 200,
                                '& .MuiInputBase-input': {
                                    padding: '10px',
                                },
                            }}
                              
                            />
                          </Box>
                        }
                      />
                      <FormControlLabel
                        value="after"
                        control={<Radio />}
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography sx={{ width: 50 }}>After</Typography>
                            <Select
                              value={occurrences}
                              onChange={(e) => setOccurrences(e.target.value)}
                              size="small"
                              disabled={endType !== 'after'}
                              sx={{ width: 100 }}
                            >
                              {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
                                <MenuItem key={num} value={num}>{num}</MenuItem>
                              ))}
                            </Select>
                            <Typography>occurrences</Typography>
                          </Box>
                        }
                      />
                    </RadioGroup>
                  </Box>
                </Stack>
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