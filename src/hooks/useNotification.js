import { useSelector, useDispatch } from 'react-redux';
import { markAsRead, markAllAsRead, addNotification, clearNotifications } from '../redux/slices/notificationSlice';

export const useNotification = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.items);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return {
    notifications,
    unreadCount,
    markAsRead: (id) => dispatch(markAsRead(id)),
    markAllAsRead: () => dispatch(markAllAsRead()),
    notify: (payload) => dispatch(addNotification(payload)),
    clearAll: () => dispatch(clearNotifications()),
  };
};
