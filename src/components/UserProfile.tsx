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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Link,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
  Alert,
  styled
} from '@mui/material';
import {
  Mic as MicIcon,
  Stop as StopIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  LocationOn,
  Cake,
  Mail,
  Notifications,
  Send,
  PersonAdd,
  Favorite,
  Share
} from '@mui/icons-material';

import { createTheme } from '@mui/material';

export const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          transition: 'transform 0.2s',
        },
      },
    },
  },
});

// Types
interface SocialLinks {
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
}

interface UserProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  interests: string[];
  avatar: string;
  bio: string;
  description: string;
  lastActive: string;
  socialLinks: SocialLinks;
  matchRate: number;
  followers: number;
  following: number;
}

interface Request {
  id: string;
  title: string;
  description: string;
  interests: string[];
  urgency: 'low' | 'medium' | 'high';
  timestamp: string;
}

// Styled Components
const StatsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  '&:hover': {
    transform: 'scale(1.1)',
    transition: 'transform 0.2s',
  },
}));

const UserProfilePage: React.FC = () => {
  const [openRequestDialog, setOpenRequestDialog] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [newRequest, setNewRequest] = useState({ title: '', description: '', interests: [] });
  const [isFollowing, setIsFollowing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const dummyProfile: UserProfile = {
    id: '1',
    name: 'Sophie Martin',
    age: 28,
    location: 'Paris',
    interests: ['Yoga', 'Photographie', 'Voyages', 'Art', 'Musique', 'Cuisine'],
    avatar: '/api/placeholder/150/150',
    bio: "Passionnée d'art et de culture, toujours partante pour découvrir de nouveaux endroits !",
    description: "Photographe professionnelle spécialisée dans les portraits et les paysages. J'aime capturer l'essence des moments et des lieux. Actuellement à la recherche de collaborations créatives et de nouvelles rencontres inspirantes.",
    lastActive: 'Il y a 5 minutes',
    socialLinks: {
      instagram: '@sophie.captures',
      linkedin: 'sophie-martin-photo',
      twitter: '@sophiemphoto',
      facebook: 'sophiemartinphoto'
    },
    matchRate: 85,
    followers: 1234,
    following: 891
  };

  const handleRequestSubmit = () => {
    const request: Request = {
      id: Date.now().toString(),
      title: newRequest.title,
      description: newRequest.description,
      interests: dummyProfile.interests.slice(0, 3),
      urgency: 'high',
      timestamp: new Date().toISOString()
    };
    
    setShowAlert(true);
    setOpenRequestDialog(false);
    setNewRequest({ title: '', description: '', interests: [] });
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setNotification(isFollowing ? 'Vous ne suivez plus Sophie' : 'Vous suivez maintenant Sophie');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Profile Header Card */}
      <Card elevation={3} sx={{ mb: 4, position: 'relative' }}>
        <Box sx={{ position: 'relative' }}>
          {/* Cover Photo */}
          <Box
            sx={{
              height: 200,
              backgroundColor: 'primary.light',
              backgroundImage: 'linear-gradient(45deg,rgb(17, 62, 99) 30%, #21CBF3 90%)',
            }}
          />
          
          {/* Profile Avatar */}
          <Avatar
            src="/images/persona.jpeg"
            sx={{
              width: 150,
              height: 150,
              border: '5px solid white',
              position: 'absolute',
              bottom: -50,
              left: 32,
            }}
          />
        </Box>

        <CardContent sx={{ pt: 8 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" gutterBottom>
                  {dummyProfile.name}
                  <Chip
                    label={`Match ${dummyProfile.matchRate}%`}
                    color="success"
                    size="small"
                    sx={{ ml: 2 }}
                  />
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant={isFollowing ? "outlined" : "contained"}
                    startIcon={<PersonAdd />}
                    onClick={handleFollow}
                  >
                    {isFollowing ? 'Suivi' : 'Suivre'}
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Send />}
                    onClick={() => setOpenRequestDialog(true)}
                  >
                    Contacter
                  </Button>
                </Stack>
              </Box>

              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="body1" color="text.secondary">
                  <LocationOn fontSize="small" /> {dummyProfile.location}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  <Cake fontSize="small" /> {dummyProfile.age} ans
                </Typography>
              </Stack>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Description
                </Typography>
                <Typography variant="body1" paragraph>
                  {dummyProfile.description}
                </Typography>
              </Box>

              {/* Interests */}
              <Box sx={{ mb: 3 }}>
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
                      sx={{ '&:hover': { transform: 'scale(1.05)' } }}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Statistiques
                </Typography>
                <Stack spacing={1}>
                  <StatsBox>
                    <Typography variant="body1">Abonnés</Typography>
                    <Typography variant="h6" color="primary">
                      {dummyProfile.followers.toLocaleString()}
                    </Typography>
                  </StatsBox>
                  <StatsBox>
                    <Typography variant="body1">Abonnements</Typography>
                    <Typography variant="h6" color="primary">
                      {dummyProfile.following.toLocaleString()}
                    </Typography>
                  </StatsBox>
                </Stack>
              </Paper>

              <Paper elevation={1} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Réseaux sociaux
                </Typography>
                <Stack spacing={2}>
                  <Link href={`https://instagram.com/${dummyProfile.socialLinks.instagram}`} target="_blank" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SocialButton color="secondary" size="small">
                      <InstagramIcon />
                    </SocialButton>
                    {dummyProfile.socialLinks.instagram}
                  </Link>
                  <Link href={`https://linkedin.com/in/${dummyProfile.socialLinks.linkedin}`} target="_blank" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SocialButton color="primary" size="small">
                      <LinkedInIcon />
                    </SocialButton>
                    {dummyProfile.socialLinks.linkedin}
                  </Link>
                  <Link href={`https://twitter.com/${dummyProfile.socialLinks.twitter}`} target="_blank" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SocialButton color="info" size="small">
                      <TwitterIcon />
                    </SocialButton>
                    {dummyProfile.socialLinks.twitter}
                  </Link>
                  <Link href={`https://facebook.com/${dummyProfile.socialLinks.facebook}`} target="_blank" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SocialButton color="primary" size="small">
                      <FacebookIcon />
                    </SocialButton>
                    {dummyProfile.socialLinks.facebook}
                  </Link>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Request Dialog */}
      <Dialog open={openRequestDialog} onClose={() => setOpenRequestDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Nouvelle demande à Sophie</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Titre de la demande"
            fullWidth
            value={newRequest.title}
            onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            multiline
            rows={4}
            margin="dense"
            label="Description de votre demande"
            fullWidth
            value={newRequest.description}
            onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRequestDialog(false)}>Annuler</Button>
          <Button onClick={handleRequestSubmit} variant="contained">Envoyer</Button>
        </DialogActions>
      </Dialog>

      {/* Notifications */}
      <Snackbar
        open={!!notification}
        autoHideDuration={6000}
        onClose={() => setNotification(null)}
        message={notification}
      />

      {/* Alert for match */}
      <Snackbar 
        open={showAlert} 
        autoHideDuration={6000} 
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" elevation={6} variant="filled">
          Demande envoyée ! Vous avez {dummyProfile.matchRate}% de centres d'intérêt en commun avec Sophie
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserProfilePage;