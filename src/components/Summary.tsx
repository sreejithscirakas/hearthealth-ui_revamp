import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  Stack,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Checkbox,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
type User = {
    name: string;
    email: string;
    photo: string;
  };
const users: User[] = [
    {
      name: 'Aarav Mehta',
      email: 'aarav@example.com',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      name: 'Meera Jain',
      email: 'meera@example.com',
      photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      name: 'Dev Kapoor',
      email: 'dev@example.com',
      photo: 'https://randomuser.me/api/portraits/men/61.jpg',
    },
  ];

export default function Summary() {
  const [editMode, setEditMode] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleUserToggle = (email: string) => {
    setSelectedUsers((prev) =>
      prev.includes(email)
        ? prev.filter((e) => e !== email)
        : [...prev, email]
    );
  };

  const [summaryText, setSummaryText] = useState({
    recap:
      'The customer contacted the doctor due to feeling tired more often and experiencing symptoms such as chest pain, shortness of breath, and palpitations. The doctor suggested these could be signs of angina and proposed to run several tests, including an ECG, an echocardiogram, and blood work. The doctor reassured the customer that many heart conditions can be managed with lifestyle changes and medication, and suggested starting with reducing salt intake, avoiding heavy meals, and maintaining stress levels.',
    tasks1:
      '@Agent_Kiara_Seth will run a few tests, including an ECG, an echocardiogram, and some blood work, and depending on those results, might also do a stress test or refer Mrs. Sharma to a cardiologist.',
    tasks2:
      '@Agent_Kiara_Seth will advise Mrs. Sharma to reduce her salt intake, avoid heavy meals, and keep stress levels in check.',
  });

  const handleSave = () => {
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  return (
    <Box sx={{ p: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mr:2 }}>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? 'Stop Editing' : 'Edit'}
        </Button>
        <Button
          variant="outlined"
          startIcon={<ShareIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Share
        </Button>
      </Box>
      
      <Paper elevation={0} sx={{ p: 2 }}>
        <Typography variant="subtitle1">
          [recap] 
        </Typography>
        {editMode ? (
          <TextField
            fullWidth
            multiline
            value={summaryText.recap}
            onChange={(e) => setSummaryText({ ...summaryText, recap: e.target.value })}
          />
        ) : (
          <Typography variant="body2">
            {summaryText.recap}
          </Typography>
        )}
      </Paper>

      <Paper elevation={0} sx={{ p: 2 }}>
        <Typography variant="subtitle1">
          [Follow-Up Tasks] 
        </Typography>
        {editMode ? (
          <TextField
            fullWidth
            multiline
            value={summaryText.tasks1}
            onChange={(e) => setSummaryText({ ...summaryText, tasks1: e.target.value })}
          />
        ) : (
          <Typography variant="body2">
            {summaryText.tasks1}
          </Typography>
        )}
      </Paper>

      <Paper elevation={0} sx={{ p: 2 }}>
        <Typography variant="subtitle1">
          [Follow-Up Tasks] 
        </Typography>
        {editMode ? (
          <TextField
            fullWidth
            multiline
            value={summaryText.tasks2}
            onChange={(e) => setSummaryText({ ...summaryText, tasks2: e.target.value })}
          />
        ) : (
          <Typography variant="body2">
            {summaryText.tasks2}
          </Typography>
        )}
      </Paper>

      {editMode && (
        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{mr:2}}>
          <Button variant="contained" color="primary"  onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" color="primary" onClick={handleCancel}>
            Cancel
          </Button>
        </Stack>
     )}
     <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
<DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    Select Users to Share With
    <IconButton onClick={() => setDialogOpen(false)}>
      <CloseIcon />
    </IconButton>
  </DialogTitle>
  <DialogContent dividers>
    <List>
      {users.map((user) => (
        <ListItem key={user.email} disableGutters>
          <Box mr="15px">
            <Checkbox
              edge="end"
              onChange={() => handleUserToggle(user.email)}
              checked={selectedUsers.includes(user.email)}
            />
          </Box>
          <ListItemAvatar>
            <Avatar src={user.photo} />
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.email} />
        </ListItem>
      ))}
    </List>
  </DialogContent>
  <DialogActions sx={{p:2}}>
    <Button onClick={() => setDialogOpen(false)} variant="contained" color="primary">
      Share
    </Button>
    <Button onClick={() => setDialogOpen(false)} variant="outlined" color="primary">
      Cancel
    </Button>
  </DialogActions>
</Dialog>
    </Box>


  );
}
