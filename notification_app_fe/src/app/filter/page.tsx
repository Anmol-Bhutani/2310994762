"use client";

import { useState, useEffect } from 'react';
import { Typography, CircularProgress, Alert, Box, Container, Paper } from '@mui/material';
import { useNotifications } from '../../hooks/useNotifications';
import { NotificationCard } from '../../components/NotificationCard';
import { Log } from '../../utils/logger.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter } from 'lucide-react';

const NOTIFICATION_TYPES = ["Placement", "Result", "Event"];

export default function FilterPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const activeType = NOTIFICATION_TYPES[selectedTab];

  const { notifications, loading, error, markAsViewed } = useNotifications(activeType);

  useEffect(() => {
    Log('frontend', 'info', 'page', 'Filter Page Rendered');
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Box sx={{ p: 1, bgcolor: 'secondary.main', borderRadius: '10px', color: 'white' }}>
            <Filter size={20} />
          </Box>
          <Typography variant="h4">Refine Stream</Typography>
        </Box>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Categorized medical insights and campus updates.
        </Typography>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        gap: 1, 
        p: 0.8, 
        bgcolor: 'rgba(0,0,0,0.03)', 
        borderRadius: '16px',
        mb: 4,
        width: 'fit-content'
      }}>
        {NOTIFICATION_TYPES.map((type, idx) => (
          <Box
            key={type}
            onClick={() => {
              setSelectedTab(idx);
              Log('frontend', 'info', 'page', `Filter changed to ${type}`);
            }}
            sx={{
              px: 3,
              py: 1,
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9rem',
              transition: 'all 0.2s',
              bgcolor: selectedTab === idx ? 'white' : 'transparent',
              color: selectedTab === idx ? 'primary.main' : 'text.secondary',
              boxShadow: selectedTab === idx ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
              '&:hover': {
                color: selectedTab === idx ? 'primary.main' : 'text.primary'
              }
            }}
          >
            {type}
          </Box>
        ))}
      </Box>

      {error && <Alert severity="error" sx={{ mb: 4, borderRadius: '12px' }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 10 }}>
          <CircularProgress size={40} thickness={4} />
        </Box>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeType}
            variants={container}
            initial="hidden"
            animate="show"
          >
            {notifications.length === 0 ? (
              <Paper className="glass-card" sx={{ p: 8, textAlign: 'center' }}>
                <Typography sx={{ color: 'text.secondary' }}>No {activeType} notifications found.</Typography>
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
          </motion.div>
        </AnimatePresence>
      )}
    </Container>
  );
}
