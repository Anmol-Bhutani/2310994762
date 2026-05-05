"use client";

import { useMemo, useEffect } from 'react';
import { Typography, CircularProgress, Alert, Box } from '@mui/material';
import { useNotifications, Notification } from '../../hooks/useNotifications';
import { NotificationCard } from '../../components/NotificationCard';
import { Log } from 'logging_middleware';

const WEIGHTS: Record<string, number> = {
  "Placement": 3,
  "Result": 2,
  "Event": 1
};

const calculateRecency = (timestampStr: string) => {
  const timestamp = new Date(timestampStr).getTime();
  const now = new Date().getTime();
  const diffMinutes = Math.max(0, (now - timestamp) / (1000 * 60));
  return 1 / (1 + diffMinutes);
};

export default function PriorityInboxPage() {
  const { notifications, loading, error, markAsViewed } = useNotifications();

  useEffect(() => {
    Log('frontend', 'info', 'page', 'Priority Inbox Page Rendered');
  }, []);

  const priorityNotifications = useMemo(() => {
    const unread = notifications.filter(n => !n.isViewed);
    
    const scored = unread.map(notif => {
      const weight = WEIGHTS[notif.Type] || 0;
      const recency = calculateRecency(notif.Timestamp);
      return {
        ...notif,
        score: weight * recency
      };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 10); // Top 10
  }, [notifications]);

  return (
    <Box maxWidth="800px" mx="auto">
      <Typography variant="h4" fontWeight="bold" mb={1}>Priority Inbox</Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Top 10 most important unread notifications.
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      {loading ? (
        <Box display="flex" justifyContent="center" my={5}><CircularProgress /></Box>
      ) : (
        <>
          {priorityNotifications.length === 0 ? (
            <Typography color="text.secondary">No priority notifications right now.</Typography>
          ) : (
            priorityNotifications.map((n: any) => (
              <NotificationCard 
                key={n.ID} 
                notification={n} 
                onClick={() => markAsViewed(n.ID)} 
              />
            ))
          )}
        </>
      )}
    </Box>
  );
}
