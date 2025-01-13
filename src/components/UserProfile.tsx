import React, { useState, useRef } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Paper,
  Typography,
  styled
} from '@mui/material';
import {
  Mic as MicIcon,
  Stop as StopIcon,
  Person as PersonIcon
} from '@mui/icons-material';

interface UserProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  interests: string[];
  avatar: string;
  bio: string;
  lastActive: string;
}

interface VoiceMessage {
  id: string;
  senderId: string;
  audioUrl: string;
  timestamp: string;
}

// Styled components
const AudioPlayer = styled('audio')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

const UserProfilePage: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [voiceMessages, setVoiceMessages] = useState<VoiceMessage[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const dummyProfile: UserProfile = {
    id: '1',
    name: 'Sophie Martin',
    age: 28,
    location: 'Paris',
    interests: ['Yoga', 'Photographie', 'Voyages'],
    avatar: '/api/placeholder/150/150',
    bio: "Passionnée d'art et de culture, toujours partante pour découvrir de nouveaux endroits !",
    lastActive: 'Il y a 5 minutes'
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        const newMessage: VoiceMessage = {
          id: Date.now().toString(),
          senderId: '1',
          audioUrl,
          timestamp: new Date().toISOString()
        };
        
        setVoiceMessages(prev => [...prev, newMessage]);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Profile Card */}
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardHeader
          avatar={
            <Avatar
              src={dummyProfile.avatar}
              sx={{ width: 80, height: 80 }}
            >
              {dummyProfile.name[0]}
            </Avatar>
          }
          action={
            <Button
              variant="contained"
              color="primary"
              startIcon={<PersonIcon />}
              sx={{ mt: 2 }}
            >
              Rencontrer
            </Button>
          }
          title={
            <Typography variant="h4" component="h1" gutterBottom>
              {dummyProfile.name}
            </Typography>
          }
          subheader={
            <Box>
              <Typography variant="subtitle1" color="text.secondary">
                {dummyProfile.age} ans • {dummyProfile.location}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Actif(ve) : {dummyProfile.lastActive}
              </Typography>
            </Box>
          }
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            À propos
          </Typography>
          <Typography variant="body1" paragraph>
            {dummyProfile.bio}
          </Typography>

          <Typography variant="h6" gutterBottom>
            Centres d'intérêt
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {dummyProfile.interests.map((interest, index) => (
              <Chip
                key={index}
                label={interest}
                variant="outlined"
                color="primary"
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Voice Chat Card */}
      <Card elevation={3}>
        <CardHeader 
          title="Messages vocaux"
          sx={{ pb: 0 }}
        />
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {voiceMessages.map((message) => (
              <Paper key={message.id} elevation={1} sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ width: 40, height: 40 }}>U</Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <AudioPlayer src={message.audioUrl} controls />
                    <Typography variant="caption" color="text.secondary">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            {isRecording ? (
              <Button
                variant="contained"
                color="error"
                startIcon={<StopIcon />}
                onClick={stopRecording}
              >
                Arrêter
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                startIcon={<MicIcon />}
                onClick={startRecording}
              >
                Enregistrer
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserProfilePage;