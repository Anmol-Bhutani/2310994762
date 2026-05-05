"use client";

import { useState } from 'react';
import { Typography, CircularProgress, Alert, Pagination, Box } from '@mui/material';
import { useNotifications } from '../hooks/useNotifications';
import { NotificationCard } from '../components/NotificationCard';
import { Log } from 'logging_middleware';

export default function AllNotificationsPage() {
  const [page, setPage] = useState(1);
  const { notifications, loading, error, markAsViewed } = useNotifications(undefined, 10, page);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    Log('frontend', 'info', 'page', `Changed to page ${value}`);
    setPage(value);
  };

  return (
    <Box maxWidth="800px" mx="auto">
      <Typography variant="h4" fontWeight="bold" mb={3}>All Notifications</Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      {loading ? (
        <Box display="flex" justifyContent="center" my={5}><CircularProgress /></Box>
      ) : (
        <>
          {notifications.length === 0 ? (
            <Typography color="text.secondary">No notifications found.</Typography>
          ) : (
            notifications.map(n => (
              <NotificationCard 
                key={n.ID} 
                notification={n} 
                onClick={() => markAsViewed(n.ID)} 
              />
            ))
          )}
          
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination 
              count={5} // Mocked count, usually from API total pages
              page={page} 
              onChange={handlePageChange} 
              color="primary" 
            />
          </Box>
        </>
      )}
    </Box>
  );
}
