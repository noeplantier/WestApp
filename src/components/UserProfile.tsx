import React, { useState } from 'react';
import { Avatar, Box, Button, Card, CardContent, Chip, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { LocationOn, Cake, PersonAdd } from '@mui/icons-material';
import { CreateEventModal, EventData } from './createvent/CreateEventModal'; // Assurez-vous que ce chemin est correct.

const UserProfilePage: React.FC = () => {
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [events, setEvents] = useState<EventData[]>([]); // Stocke les événements.
  const [isFollowing, setIsFollowing] = useState(false);

  const dummyProfile = {
    id: '1',
    name: 'Sophie Martin',
    age: 28,
    location: 'Paris',
    interests: ['Yoga', 'Photographie', 'Voyages', 'Art', 'Musique', 'Cuisine'],
    avatar: '/api/placeholder/150/150',
    bio: "Passionnée d'art et de culture, toujours partante pour découvrir de nouveaux endroits !",
    description: "Photographe professionnelle spécialisée dans les portraits et les paysages...",
    events: 12,
    followers: 1234,
    following: 891,
  };

  const handleEventCreate = (newEvent: EventData) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]); // Ajouter l'événement créé.
  };

  const handleFollow = () => {
    setIsFollowing((prev) => !prev);
  };

  return (
    <Container maxWidth="lg">
      <Card elevation={3} sx={{ mb: 4 }}>
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              height: 200,
              backgroundColor: 'primary.light',
              backgroundImage: 'linear-gradient(45deg, rgb(17, 62, 99) 30%, #21CBF3 90%)',
            }}
          />
          <Avatar
            src={dummyProfile.avatar}
            sx={{
              width: 150,
              height: 150,
              border: '5px solid white',
              position: 'absolute',
              bottom: -60,
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
                </Typography>
                <Button
                  variant={isFollowing ? 'outlined' : 'contained'}
                  startIcon={<PersonAdd />}
                  onClick={handleFollow}
                >
                  {isFollowing ? 'Suivi' : 'Suivre'}
                </Button>
              </Box>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="body1" color="text.secondary">
                  <LocationOn fontSize="small" /> {dummyProfile.location}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  <Cake fontSize="small" /> {dummyProfile.age} ans
                </Typography>
              </Stack>

              <Box sx={{ mb: 3, mt: 5 }}>
                <Typography variant="h6" gutterBottom>
                  Centres d'intérêt
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {dummyProfile.interests.map((interest, index) => (
                    <Chip key={index} label={interest} variant="outlined" color="primary" />
                  ))}
                </Box>
              </Box>

              <Box sx={{ mb: 3, mt: 5 }}>
                <Typography variant="h6" gutterBottom>
                  Description
                </Typography>
                <Typography variant="body1" paragraph>
                  {dummyProfile.description}
                </Typography>
              </Box>

              {/* Section des événements */}
              <Box sx={{ mb: 3, mt: 5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">Événements</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setIsEventModalOpen(true)}
                  >
                    Ajouter un événement
                  </Button>
                </Box>
                {events.length > 0 ? (
                  <Grid container spacing={2}>
                    {events.map((event) => (
                      <Grid item xs={12} md={6} lg={4} key={event.id}>
                        <Card>
                          <CardContent>
                            <Typography variant="h6" gutterBottom>
                              {event.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              {event.description}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              📍 {event.location} | 🗓 {new Date(event.date).toLocaleDateString()}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Aucun événement pour le moment.
                  </Typography>
                )}
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper elevation={1} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Statistiques
                </Typography>
                <Stack spacing={1}>
                  <Box>
                    <Typography variant="body1">Évènements</Typography>
                    <Typography variant="h6" color="primary">
                      {dummyProfile.events.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1">Abonnés</Typography>
                    <Typography variant="h6" color="primary">
                      {dummyProfile.followers.toLocaleString()}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <CreateEventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onEventCreate={handleEventCreate}
      />
    </Container>
  );
};

export default UserProfilePage;
