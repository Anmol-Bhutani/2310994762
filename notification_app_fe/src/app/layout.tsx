"use client";

import { ThemeProvider, createTheme, CssBaseline, Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Container, Avatar } from '@mui/material';
import { Bell as NotificationsIcon, Star as StarIcon, Filter as FilterIcon, Activity, User } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2563eb' },
    secondary: { main: '#7c3aed' },
    background: { default: '#f8fafc' }
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h4: { fontFamily: 'Outfit, sans-serif', fontWeight: 700 },
    h6: { fontFamily: 'Outfit, sans-serif', fontWeight: 600 },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          margin: '4px 12px',
          '&.Mui-selected': {
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(37, 99, 235, 0.2)',
            },
          },
        },
      },
    },
  },
});

const drawerWidth = 280;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { text: 'All Notifications', icon: <NotificationsIcon size={20} />, path: '/' },
    { text: 'Priority Inbox', icon: <StarIcon size={20} />, path: '/priority' },
    { text: 'Filter by Type', icon: <FilterIcon size={20} />, path: '/filter' },
  ];

  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
            <Drawer
              variant="permanent"
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { 
                  width: drawerWidth, 
                  boxSizing: 'border-box',
                  bgcolor: '#0f172a',
                  color: 'white',
                  border: 'none'
                },
              }}
            >
              <Box sx={{ p: 4, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                  <Box sx={{ p: 1, bgcolor: 'primary.main', borderRadius: '12px' }}>
                    <Activity size={24} color="white" />
                  </Box>
                  <Typography variant="h6" sx={{ color: 'white', letterSpacing: '-0.5px' }}>
                    AffordMed
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', ml: 0.5 }}>
                  Medical Intelligence Hub
                </Typography>
              </Box>

              <List sx={{ px: 1 }}>
                {menuItems.map((item) => (
                  <ListItem key={item.text} disablePadding>
                    <ListItemButton 
                      selected={pathname === item.path}
                      onClick={() => router.push(item.path)}
                      sx={{
                        color: pathname === item.path ? 'primary.main' : 'rgba(255,255,255,0.7)',
                        transition: 'all 0.2s',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
                      }}
                    >
                      <ListItemIcon sx={{ 
                        color: pathname === item.path ? 'primary.main' : 'rgba(255,255,255,0.5)',
                        minWidth: 40
                      }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={item.text} 
                        sx={{
                          '& .MuiListItemText-primary': {
                            fontSize: '0.95rem',
                            fontWeight: pathname === item.path ? 600 : 400
                          }
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>

              <Box sx={{ mt: 'auto', p: 3 }}>
                <Box className="glass-card" sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.8rem' }}>AB</Avatar>
                    <Box>
                      <Typography variant="caption" sx={{ display: 'block', fontWeight: 600, color: 'white' }}>
                        Anmol Bhutani
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                        Administrator
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 0, overflowX: 'hidden' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={pathname}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Box sx={{ p: 4 }}>
                    {children}
                  </Box>
                </motion.div>
              </AnimatePresence>
            </Box>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
