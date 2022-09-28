import React, {useContext, useRef, useState} from 'react';
import ServerNotificationItem from "./ServerNotificationItem";
import './index.scss'
import ServerNotificationContext from "../../ServerNotificationContext";
import useOnClickOutside from "../../hooks/useOnClickOutside";

type ServerNotificationsProps = {
  notifications: {id: number, title: string, body: string}[]
}

const ServerNotifications = (props: ServerNotificationsProps) => {
  const {notifications} = props
  const ref = useRef(null)
  const [newNotifications, setNewNotifications] = useState(notifications)
  const {setIsNotificationsActive} = useContext(ServerNotificationContext)

  const handleRemove = (id: number) => {
    const newList = newNotifications.filter((item) => item.id !== id);
    setNewNotifications(newList);
  }

  useOnClickOutside(ref, () => setIsNotificationsActive(false))

  return (
    <div className={`server-notifications-wrapper top-right`} ref={ref}>
      {newNotifications.map(notification => <ServerNotificationItem
        handleRemove={handleRemove}
        key={notification.id}
        notification={notification}
       />
      )}
    </div>
  );
};

export default ServerNotifications;