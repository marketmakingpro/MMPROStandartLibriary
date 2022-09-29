import React, {useContext, useEffect, useRef, useState} from 'react';
import ServerNotificationItem from "./ServerNotificationItem";
import './index.scss'
import ServerNotificationContext from "../../ServerNotificationContext";
import useOnClickOutside from "../../hooks/useOnClickOutside";

type ServerNotificationsProps = {}

const ServerNotifications = () => {
  const ref = useRef(null)

  const {setIsNotificationsActive, notifications, setNotifications, isNotificationsActive} = useContext(ServerNotificationContext)

  const [isNotificationUnread, setIsNotificationUnread] = useState(true)

  const handleRemove = (id: number) => {
    const newList = notifications.filter((item) => item.id !== id);
    setNotifications(newList);
  }

  useOnClickOutside(ref, () => setIsNotificationsActive(false))

  return (
    <div className={`server-notifications-wrapper ${isNotificationsActive ? 'shown' : ''}`} ref={ref}>
      {notifications.slice(0,3).map(notification => <ServerNotificationItem
        handleRemove={handleRemove}
        key={notification.id}
        notification={notification}
        isNotificationUnread={isNotificationUnread}
       />
      )}
    </div>
  );
};

export default ServerNotifications;