import React, { useState } from 'react';
import {
  Modal,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  TextField,
  Typography,
  Alert,
  Snackbar,
  Fade,
  Backdrop,
  styled
} from '@mui/material';
import {
  Security,
  LocationOn,
  Notifications,

  DataUsage,
  Edit,
  Delete,
  Close as CloseIcon,
} from '@mui/icons-material';

// Styled Components
const SettingsCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: 12,
}));

const SettingSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

interface SettingsState {
  locationEnabled: boolean;
  notifications: boolean;
  activityRadius: number;
  language: string;
  privateProfile: boolean;
  dataCollection: boolean;
  email: string;
  password: string;
}

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

const initialSettings: SettingsState = {
  locationEnabled: true,
  notifications: true,
  activityRadius: 50,
  language: 'Français',
  privateProfile: false,
  dataCollection: true,
  email: 'utilisateur@example.com',
  password: '********'
};

const SettingsModal: React.FC<SettingsModalProps> = ({ open, onClose }) => {
  const [settings, setSettings] = useState<SettingsState>(initialSettings);
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [tempSettings, setTempSettings] = useState<Partial<SettingsState>>({});

  const handleToggle = (setting: keyof SettingsState) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
    setNotification(`Paramètre ${setting} mis à jour`);
  };

  const handleSave = () => {
    setSettings(prev => ({
      ...prev,
      ...tempSettings
    }));
    setOpenDialog(null);
    setNotification('Paramètres mis à jour avec succès');
    localStorage.setItem('user-settings', JSON.stringify({ ...settings, ...tempSettings }));
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 800,
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            overflow: 'auto'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5">Paramètres</Typography>
              <IconButton onClick={onClose} aria-label="Fermer">
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Sécurité et Confidentialité */}
            <SettingsCard elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Sécurité et Confidentialité
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Security />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Compte"
                      secondary="Email et mot de passe"
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => setOpenDialog('security')}>
                        <Edit />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                    </ListItemIcon>
                    <ListItemText 
                      primary="Profil Privé"
                      secondary="Contrôlez qui peut voir votre profil"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={settings.privateProfile}
                        onChange={() => handleToggle('privateProfile')}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </CardContent>
            </SettingsCard>

            {/* Localisation et Activités */}
            <SettingsCard elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Localisation et Activités
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <LocationOn />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Géolocalisation"
                      secondary="Permettre l'accès à votre position"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={settings.locationEnabled}
                        onChange={() => handleToggle('locationEnabled')}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                    </ListItemIcon>
                    <ListItemText 
                      primary="Rayon d'activités"
                      secondary={`${settings.activityRadius} km autour de vous`}
                    />
                    <ListItemSecondaryAction>
                      <Button 
                        variant="outlined"
                        size="small"
                        onClick={() => setOpenDialog('radius')}
                      >
                        Modifier
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </CardContent>
            </SettingsCard>

            {/* Notifications */}
            <SettingsCard elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Notifications
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Notifications />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Notifications Push"
                      secondary="Recevoir des alertes pour les nouvelles activités"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={settings.notifications}
                        onChange={() => handleToggle('notifications')}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </CardContent>
            </SettingsCard>

            {/* Données et Confidentialité */}
            <SettingsCard elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Données et Confidentialité
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <DataUsage />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Collecte de données"
                      secondary="Autoriser la collecte de données pour améliorer l'expérience"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={settings.dataCollection}
                        onChange={() => handleToggle('dataCollection')}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <Delete color="error" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Supprimer le compte"
                      secondary="Supprimer définitivement votre compte et vos données"
                      primaryTypographyProps={{ color: 'error' }}
                    />
                    <ListItemSecondaryAction>
                      <Button 
                        color="error" 
                        variant="outlined"
                        size="small"
                        onClick={() => setOpenDialog('delete')}
                      >
                        Supprimer
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </CardContent>
            </SettingsCard>
          </Box>
        </Fade>
      </Modal>

      {/* Dialogs */}
      <Dialog
        open={openDialog === 'security'}
        onClose={() => setOpenDialog(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Modifier les informations de sécurité</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            value={settings.email}
            onChange={(e) => setTempSettings({ ...tempSettings, email: e.target.value })}
          />
          <TextField
            fullWidth
            label="Nouveau mot de passe"
            type="password"
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(null)}>Annuler</Button>
          <Button onClick={handleSave} variant="contained">Sauvegarder</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDialog === 'radius'}
        onClose={() => setOpenDialog(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Modifier le rayon d'activités</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Rayon en kilomètres"
            type="number"
            margin="normal"
            value={settings.activityRadius}
            onChange={(e) => setTempSettings({ ...tempSettings, activityRadius: Number(e.target.value) })}
            inputProps={{ min: 1, max: 100 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(null)}>Annuler</Button>
          <Button onClick={handleSave} variant="contained">Sauvegarder</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDialog === 'delete'}
        onClose={() => setOpenDialog(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Supprimer le compte</DialogTitle>
        <DialogContent>
          <Typography color="error" paragraph>
            Attention : Cette action est irréversible. Toutes vos données seront définitivement supprimées.
          </Typography>
          <TextField
            fullWidth
            label="Tapez 'SUPPRIMER' pour confirmer"
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(null)}>Annuler</Button>
          <Button color="error" variant="contained">
            Confirmer la suppression
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notifications */}
      <Snackbar
        open={!!notification}
        autoHideDuration={6000}
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" elevation={6} variant="filled" onClose={() => setNotification(null)}>
          {notification}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SettingsModal;