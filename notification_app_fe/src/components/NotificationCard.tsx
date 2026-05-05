import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { Notification } from '../hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';

export const NotificationCard = ({ notification, onClick }: { notification: Notification, onClick: () => void }) => {
  const isViewed = notification.isViewed;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Placement': return 'error';
      case 'Result': return 'warning';
      case 'Event': return 'info';
      default: return 'default';
    }
  };

  return (
    <Card 
      onClick={onClick}
      sx={{ 
        mb: 2, 
        cursor: 'pointer',
        borderLeft: isViewed ? '4px solid transparent' : '4px solid #1976d2',
        bgcolor: isViewed ? '#f9f9f9' : '#ffffff',
        transition: 'all 0.2s',
        '&:hover': {
          boxShadow: 3
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Chip label={notification.Type} color={getTypeColor(notification.Type)} size="small" />
          <Typography variant="caption" color="text.secondary">
            {formatDistanceToNow(new Date(notification.Timestamp), { addSuffix: true })}
          </Typography>
        </Box>
        <Typography variant="body1" fontWeight={isViewed ? 'normal' : 'bold'}>
          {notification.Message}
        </Typography>
      </CardContent>
    </Card>
  );
};
