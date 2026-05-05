"use client";

import { ThemeProvider, createTheme, CssBaseline, Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Notifications as NotificationsIcon, Star as StarIcon, FilterList as FilterIcon } from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  }
});

const drawerWidth = 240;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { text: 'All Notifications', icon: <NotificationsIcon />, path: '/' },
    { text: 'Priority Inbox', icon: <StarIcon />, path: '/priority' },
    { text: 'Filter by Type', icon: <FilterIcon />, path: '/filter' },
  ];

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ display: 'flex' }}>
            <Drawer
              variant="permanent"
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
              }}
            >
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" color="primary" fontWeight="bold">
                  Campus Updates
                </Typography>
              </Box>
              <List>
                {menuItems.map((item) => (
                  <ListItem key={item.text} disablePadding>
                    <ListItemButton 
                      selected={pathname === item.path}
                      onClick={() => router.push(item.path)}
                    >
                      <ListItemIcon sx={{ color: pathname === item.path ? 'primary.main' : 'inherit' }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
              {children}
            </Box>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
