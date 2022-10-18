import React from 'react';
import {INotification} from "./types/Notification";

const ServerNotificationContext = React.createContext <{
  isNotificationsActive: boolean,
  setIsNotificationsActive: (value: boolean) => void,
  notifications: INotification[],
  setNotifications: (notifications: INotification[]) => void
}>({
  isNotificationsActive: false,
  setIsNotificationsActive: (value: boolean) => {},
  notifications: [],
  setNotifications: (notifications: INotification[]) => {}
})

export default ServerNotificationContext;