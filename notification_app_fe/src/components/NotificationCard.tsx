import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { Notification } from '../hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { Bell, Briefcase, FileText, Calendar } from 'lucide-react';

export const NotificationCard = ({ notification, onClick }: { notification: Notification, onClick: () => void }) => {
  const isViewed = notification.isViewed;

  const getStyle = (type: string) => {
    switch (type) {
      case 'Placement': 
        return { 
          color: '#ef4444', 
          bg: 'rgba(239, 68, 68, 0.1)', 
          icon: <Briefcase size={16} />,
          glow: '0 4px 20px rgba(239, 68, 68, 0.15)'
        };
      case 'Result': 
        return { 
          color: '#f59e0b', 
          bg: 'rgba(245, 158, 11, 0.1)', 
          icon: <FileText size={16} />,
          glow: '0 4px 20px rgba(245, 158, 11, 0.15)'
        };
      case 'Event': 
        return { 
          color: '#3b82f6', 
          bg: 'rgba(59, 130, 246, 0.1)', 
          icon: <Calendar size={16} />,
          glow: '0 4px 20px rgba(59, 130, 246, 0.15)'
        };
      default: 
        return { 
          color: '#64748b', 
          bg: 'rgba(100, 116, 139, 0.1)', 
          icon: <Bell size={16} />,
          glow: 'none'
        };
    }
  };

  const style = getStyle(notification.Type);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ y: -4, scale: 1.005 }}
      whileTap={{ scale: 0.995 }}
    >
      <Box 
        onClick={onClick}
        className="glass-card"
        sx={{ 
          mb: 2.5, 
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          borderLeft: `6px solid ${isViewed ? 'transparent' : style.color}`,
          bgcolor: isViewed ? 'rgba(255,255,255,0.4)' : 'white',
          boxShadow: isViewed ? 'none' : style.glow,
          '&:hover': {
            boxShadow: style.glow.replace('0.15', '0.25'),
            borderColor: style.color
          }
        }}
      >
        <CardContent sx={{ p: '20px !important' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ 
                p: 0.8, 
                borderRadius: '8px', 
                bgcolor: style.bg, 
                color: style.color,
                display: 'flex',
                alignItems: 'center'
              }}>
                {style.icon}
              </Box>
              <Typography 
                variant="caption" 
                sx={{ 
                  fontWeight: 700, 
                  textTransform: 'uppercase', 
                  letterSpacing: '1px',
                  color: style.color 
                }}
              >
                {notification.Type}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {!isViewed && (
                <Box className="status-dot pulse-red" />
              )}
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                {formatDistanceToNow(new Date(notification.Timestamp), { addSuffix: true })}
              </Typography>
            </Box>
          </Box>

          <Typography 
            variant="body1" 
            sx={{ 
              fontWeight: isViewed ? 500 : 600,
              color: isViewed ? 'text.secondary' : 'text.primary',
              fontSize: '1.05rem',
              lineHeight: 1.5
            }}
          >
            {notification.Message}
          </Typography>
          
          <Box sx={{ mt: 2, display: 'flex', gap: 1, opacity: isViewed ? 0.5 : 1 }}>
            <Typography variant="caption" sx={{ 
              px: 1, 
              py: 0.5, 
              borderRadius: '4px', 
              bgcolor: 'rgba(0,0,0,0.03)',
              color: 'text.secondary',
              fontSize: '0.7rem',
              fontWeight: 600
            }}>
              ID: {notification.ID.substring(0, 8)}
            </Typography>
          </Box>
        </CardContent>
      </Box>
    </motion.div>
  );
};
