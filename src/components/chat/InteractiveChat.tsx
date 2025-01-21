import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  TextField,
  Box,
  Avatar,
  Paper,
  Stack,
  Button,
  Badge
} from '@mui/material';
import {
  Chat as ChatIcon,
  Send as SendIcon,
  Close as CloseIcon,
  AttachFile as AttachFileIcon,
  EmojiEmotions as EmojiIcon
} from '@mui/icons-material';

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: 'user' | 'other';
}

const InteractiveChat: React.FC<{ recipientName: string; recipientAvatar: string }> = ({
  recipientName,
  recipientAvatar
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulated initial messages
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          content: `Bonjour ! Je suis ${recipientName}. Comment puis-je vous aider ?`,
          timestamp: new Date(Date.now() - 3600000),
          sender: 'other'
        }
      ]);
    }
  }, [recipientName]);

  const handleSend = () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: newMessage.trim(),
        timestamp: new Date(),
        sender: 'user'
      };
      
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      setIsTyping(true);

      // Simulate response
      setTimeout(() => {
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: "Je vous remercie pour votre message. Je vais y répondre dès que possible !",
          timestamp: new Date(),
          sender: 'other'
        };
        setMessages(prev => [...prev, responseMessage]);
        setIsTyping(false);
        if (!isOpen) {
          setUnreadCount(prev => prev + 1);
        }
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <>
      <Badge badgeContent={unreadCount} color="error">
        <Button
          variant="contained"
          startIcon={<ChatIcon />}
          onClick={() => {
            setIsOpen(true);
            setUnreadCount(0);
          }}
          sx={{ ml: 1 }}
        >
          Messages
        </Button>
      </Badge>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            height: '80vh'
          }
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          p: 2,
          borderBottom: 1,
          borderColor: 'divider'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar src={recipientAvatar} />
            <Typography variant="h6">{recipientName}</Typography>
          </Box>
          <IconButton onClick={() => setIsOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flexGrow: 1, overflow: 'auto', mb: 2 }}>
            <Stack spacing={2}>
              {messages.map((message) => (
                <Box
                  key={message.id}
                  sx={{
                    display: 'flex',
                    justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  {message.sender === 'other' && (
                    <Avatar
                      src={recipientAvatar}
                      sx={{ width: 32, height: 32, mr: 1 }}
                    />
                  )}
                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      maxWidth: '70%',
                      bgcolor: message.sender === 'user' ? 'primary.main' : 'grey.100',
                      color: message.sender === 'user' ? 'white' : 'text.primary',
                    }}
                  >
                    <Typography variant="body1">{message.content}</Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        mt: 0.5,
                        color: message.sender === 'user' ? 'white' : 'text.secondary',
                      }}
                    >
                      {formatTime(message.timestamp)}
                    </Typography>
                  </Paper>
                </Box>
              ))}
              {isTyping && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar src={recipientAvatar} sx={{ width: 32, height: 32 }} />
                  <Paper sx={{ p: 1, bgcolor: 'grey.100' }}>
                    <Typography variant="body2" color="text.secondary">
                      En train d'écrire...
                    </Typography>
                  </Paper>
                </Box>
              )}
              <div ref={messagesEndRef} />
            </Stack>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
            <IconButton size="small">
              <EmojiIcon />
            </IconButton>
            <IconButton size="small">
              <AttachFileIcon />
            </IconButton>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Écrivez votre message..."
              variant="outlined"
              size="small"
            />
            <IconButton
              color="primary"
              onClick={handleSend}
              disabled={!newMessage.trim()}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InteractiveChat;