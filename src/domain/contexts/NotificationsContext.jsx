import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import notificationsReducer, { initialNotificationsState } from '../reducers/notificationsReducer';

const NotificationsContext = createContext(null);
const STORAGE_KEY = 'inklusport_notifications';

const loadInitialNotificationState = () => {
  if (typeof window === 'undefined') return initialNotificationsState;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialNotificationsState;
    const parsed = JSON.parse(saved);
    return parsed && Array.isArray(parsed.items) ? parsed : initialNotificationsState;
  } catch {
    return initialNotificationsState;
  }
};

const saveNotificationState = (state) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage failures.
  }
};

export const NotificationsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationsReducer, initialNotificationsState, loadInitialNotificationState);

  useEffect(() => {
    saveNotificationState(state);
  }, [state]);

  const addNotification = (notification) => {
    const payload = {
      id: notification.id || `notif-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: notification.title || 'Nueva notificación',
      message: notification.message || '',
      category: notification.category || 'General',
      createdAt: notification.createdAt || new Date().toISOString(),
      read: notification.read || false,
    };
    dispatch({ type: 'ADD_NOTIFICATION', payload });
  };

  const setNotifications = (items) => {
    dispatch({ type: 'SET_NOTIFICATIONS', payload: items });
  };

  const markNotificationAsRead = (id) => {
    dispatch({
      type: 'SET_NOTIFICATIONS',
      payload: state.items.map((item) =>
        item.id === id ? { ...item, read: true } : item
      ),
    });
  };

  const markAllAsRead = () => {
    dispatch({
      type: 'SET_NOTIFICATIONS',
      payload: state.items.map((item) => ({ ...item, read: true })),
    });
  };

  const unreadCount = state.items.filter((item) => !item.read).length;

  const value = useMemo(
    () => ({
      notifications: state.items,
      unreadCount,
      addNotification,
      setNotifications,
      markNotificationAsRead,
      markAllAsRead,
    }),
    [state.items, unreadCount]
  );

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications debe usarse dentro de NotificationsProvider');
  }
  return context;
};

export default NotificationsContext;
