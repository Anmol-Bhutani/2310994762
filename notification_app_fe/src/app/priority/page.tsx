"use client";

import { useMemo, useEffect } from 'react';
import { Typography, CircularProgress, Alert, Box, Container, Paper } from '@mui/material';
import { useNotifications, Notification } from '../../hooks/useNotifications';
import { NotificationCard } from '../../components/NotificationCard';
import { Log } from '../../utils/logger.js';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp } from 'lucide-react';

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
      return { ...notif, score: weight * recency };
    });
    scored.sort((a: any, b: any) => b.score - a.score);
    return scored.slice(0, 10);
  }, [notifications]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 1 }}>Priority Intelligence</Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          We've analyzed your {notifications.length} notifications to find the 10 most critical updates.
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 4, borderRadius: '12px' }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 10 }}>
          <CircularProgress size={40} thickness={4} />
        </Box>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          {priorityNotifications.length === 0 ? (
            <Paper className="glass-card" sx={{ p: 8, textAlign: 'center' }}>
              <TrendingUp size={48} color="#cbd5e1" style={{ marginBottom: '16px' }} />
              <Typography sx={{ color: 'text.secondary' }}>Inbox Zero! No high-priority items at the moment.</Typography>
            </Paper>
          ) : (
            priorityNotifications.map((n: Notification & { score: number }) => (
              <NotificationCard
                key={n.ID}
                notification={n}
                onClick={() => markAsViewed(n.ID)}
              />
            ))
          )}
        </motion.div>
      )}
    </Container>
  );
}
