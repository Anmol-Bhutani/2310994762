"use client";

import { useState } from 'react';
import { Typography, CircularProgress, Alert, Pagination, Box, Container, Grid, Paper } from '@mui/material';
import { useNotifications } from '../hooks/useNotifications';
import { NotificationCard } from '../components/NotificationCard';
import { Log } from '../utils/logger.js';
import { motion } from 'framer-motion';
import { Inbox, CheckCircle, Clock } from 'lucide-react';

export default function AllNotificationsPage() {
  const [page, setPage] = useState(1);
  const { notifications, loading, error, markAsViewed } = useNotifications(undefined, 10, page);

  const unreadCount = notifications.filter(n => !n.isViewed).length;

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    Log('frontend', 'info', 'page', `Changed to page ${value}`);
    setPage(value);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ mb: 1, color: '#0f172a' }}>Welcome back, Anmol</Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
          Here is what's happening at the medical center today.
        </Typography>

        <Grid container spacing={3}>
          {[
            { label: 'Total Notifications', value: notifications.length, icon: <Inbox size={20}/>, color: '#2563eb' },
            { label: 'Unread Alert', value: unreadCount, icon: <Clock size={20}/>, color: '#ef4444' },
            { label: 'System Health', value: '100%', icon: <CheckCircle size={20}/>, color: '#10b981' },
          ].map((stat, idx) => (
            <Grid key={idx} size={{ xs: 12, md: 4 }}>
              <Paper className="glass-card" sx={{ p: 3, border: 'none' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: `${stat.color}15`, color: stat.color }}>
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block' }}>
                      {stat.label}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {stat.value}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>Recent Updates</Typography>
        <Box sx={{ px: 2, py: 0.5, bgcolor: 'rgba(0,0,0,0.05)', borderRadius: '20px' }}>
          <Typography variant="caption" sx={{ fontWeight: 600 }}>Page {page} of 5</Typography>
        </Box>
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
          {notifications.length === 0 ? (
            <Paper className="glass-card" sx={{ p: 8, textAlign: 'center' }}>
              <Typography sx={{ color: 'text.secondary' }}>No notifications found at this time.</Typography>
            </Paper>
          ) : (
            notifications.map(n => (
              <NotificationCard
                key={n.ID}
                notification={n}
                onClick={() => markAsViewed(n.ID)}
              />
            ))
          )}

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 10 }}>
            <Pagination
              count={5}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              sx={{
                '& .MuiPaginationItem-root': {
                  borderRadius: '12px',
                  fontWeight: 600
                }
              }}
            />
          </Box>
        </motion.div>
      )}
    </Container>
  );
}
