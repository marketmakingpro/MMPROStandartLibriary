import React from 'react';

const ServerNotificationContext = React.createContext({
  isNotificationsActive: false,
  setIsNotificationsActive: (value: boolean) => {}
})

export default ServerNotificationContext;