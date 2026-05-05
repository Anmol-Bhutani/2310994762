"use client";

import { useState, useEffect } from 'react';
import { Typography, CircularProgress, Alert, Box, Tabs, Tab } from '@mui/material';
import { useNotifications } from '../../hooks/useNotifications';
import { NotificationCard } from '../../components/NotificationCard';
import { Log } from 'logging_middleware';

const NOTIFICATION_TYPES = ["Placement", "Result", "Event"];

export default function FilterPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const activeType = NOTIFICATION_TYPES[selectedTab];
  
  const { notifications, loading, error, markAsViewed } = useNotifications(activeType);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    Log('frontend', 'info', 'page', `Filter changed to ${NOTIFICATION_TYPES[newValue]}`);
  };

  useEffect(() => {
    Log('frontend', 'info', 'page', 'Filter Page Rendered');
  }, []);

  return (
    <Box maxWidth="800px" mx="auto">
      <Typography variant="h4" fontWeight="bold" mb={3}>Filter by Type</Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="notification types">
          {NOTIFICATION_TYPES.map((type) => (
            <Tab key={type} label={type} />
          ))}
        </Tabs>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      {loading ? (
        <Box display="flex" justifyContent="center" my={5}><CircularProgress /></Box>
      ) : (
        <>
          {notifications.length === 0 ? (
            <Typography color="text.secondary">No notifications found for {activeType}.</Typography>
          ) : (
            notifications.map(n => (
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
