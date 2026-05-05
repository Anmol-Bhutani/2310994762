import { useState, useEffect } from 'react';
import { Log } from 'logging_middleware';

export interface Notification {
  ID: string;
  Type: string;
  Message: string;
  Timestamp: string;
  isViewed?: boolean;
}

const NOTIFICATION_API = 'http://20.207.122.201/evaluation-service/notifications';

export const useNotifications = (typeFilter?: string, limit?: number, page?: number) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Log('frontend', 'info', 'hook', 'useNotifications initialized');

    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const token = process.env.NEXT_PUBLIC_API_TOKEN;
        
        if (!token) {
          throw new Error("No API token found. Please register first.");
        }

        let url = new URL(NOTIFICATION_API);
        if (typeFilter) url.searchParams.append('notification_type', typeFilter);
        if (limit) url.searchParams.append('limit', limit.toString());
        if (page) url.searchParams.append('page', page.toString());

        const res = await fetch(url.toString(), {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!res.ok) {
          throw new Error(`API returned ${res.status}`);
        }

        const data = await res.json();
        const rawNotifs: Notification[] = data.notifications || [];

        // Load viewed state from localStorage
        const viewedIds = JSON.parse(localStorage.getItem('viewed_notifications') || '[]');

        const processed = rawNotifs.map(n => ({
          ...n,
          isViewed: viewedIds.includes(n.ID)
        }));

        setNotifications(processed);
        Log('frontend', 'info', 'api', `Fetched ${processed.length} notifications`);
      } catch (err: any) {
        setError(err.message);
        Log('frontend', 'error', 'api', `Failed to fetch: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [typeFilter, limit, page]);

  const markAsViewed = (id: string) => {
    const viewedIds = JSON.parse(localStorage.getItem('viewed_notifications') || '[]');
    if (!viewedIds.includes(id)) {
      viewedIds.push(id);
      localStorage.setItem('viewed_notifications', JSON.stringify(viewedIds));
      
      setNotifications(prev => prev.map(n => 
        n.ID === id ? { ...n, isViewed: true } : n
      ));
      
      Log('frontend', 'info', 'state', `Marked notification ${id} as viewed`);
    }
  };

  return { notifications, loading, error, markAsViewed };
};
