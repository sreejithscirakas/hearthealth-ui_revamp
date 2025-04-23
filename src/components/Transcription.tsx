import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  TextField,
  Button,
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
  IconButton,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

type Message = {
  speaker: string;
  text: string;
};

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

export default function EnhancedTranscriptUI() {
  const [messages, setMessages] = useState<Message[]>([
    { speaker: 'Naina Sayed', text: 'Good Morn.' },
    { speaker: 'Kiara Seth', text: 'Good morning, Mrs. Sharma, How are you feeling today?' },
    { speaker: 'Naina Sayed', text: 'Good Morn.' },
    { speaker: 'Kiara Seth', text: 'Good morning, Mrs. Sharma, How are you feeling today?' },
    { speaker: 'Naina Sayed', text: "Good morning doctor. I'm all right, but I have been feeling tired more often lately. That is why I should come in." },
    { speaker: 'Naina Sayed', text: "Good morning doctor. I'm all right, but I have been feeling tired more often lately. That is why I should come in." },
  ]);

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

  const handleTextChange = (index: number, newText: string) => {
    const updated = [...messages];
    updated[index].text = newText;
    setMessages(updated);
  };

  const handleSave = () => {
    setEditMode(false);
    // You can add logic to persist changes here
  };

  const handleCancel = () => {
    setEditMode(false);
    // Optionally reload/reset messages here if needed
  };

  return (
    <Box sx={{ bgcolor: '#fff', padding: '0px 15px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ShareIcon />}
            onClick={() => setDialogOpen(true)}
          >
            Share
          </Button>
        </Box>
      </Box>

      <Stack spacing={2}>
        {messages.map((msg, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              p: 2,
              bgcolor: '#f5f5f5',
            }}
          >
            <Typography variant="subtitle2" sx={{ mb:1 }}>
              Speaker: {msg.speaker}
            </Typography>
            {editMode ? (
              <TextField
                fullWidth
                multiline
                value={msg.text}
                onChange={(e) => handleTextChange(index, e.target.value)}
              />
            ) : (
              <Typography variant="body2">
                Transcript: {msg.text}
              </Typography>
            )}
          </Paper>
        ))}
      </Stack>

      {editMode && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" color="primary" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
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
