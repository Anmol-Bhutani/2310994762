import { useState, useEffect } from 'react';
import { Log } from '../utils/logger.js';

export interface Notification {
  ID: string;
  Type: string;
  Message: string;
  Timestamp: string;
  isViewed?: boolean;
}

export const useNotifications = (typeFilter?: string, limit?: number, page?: number) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Log('frontend', 'info', 'hook', 'useNotifications initialized');

    const fetchNotifications = async () => {
      try {
        setLoading(true);
        setError('');

        // Use internal Next.js API proxy to avoid CORS issues
        const params = new URLSearchParams();
        if (typeFilter) params.append('notification_type', typeFilter);
        if (limit) params.append('limit', limit.toString());
        if (page) params.append('page', page.toString());

        const url = `/api/notifications${params.toString() ? '?' + params.toString() : ''}`;
        const res = await fetch(url);

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || `API returned ${res.status}`);
        }

        const data = await res.json();
        const rawNotifs: Notification[] = data.notifications || data.data || [];

        // Load viewed state from localStorage
        const viewedIds = JSON.parse(localStorage.getItem('viewed_notifications') || '[]');

        const processed = rawNotifs.map((n: Notification) => ({
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
