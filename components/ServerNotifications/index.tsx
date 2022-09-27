import React, {useContext, useState} from 'react';
import ServerNotificationItem from "./ServerNotificationItem";
import './index.scss'
import ServerNotificationContext from "../../ServerNotificationContext";

type ServerNotificationsProps = {
  notifications: {id: number, title: string, body: string}[]
}

const ServerNotifications = (props: ServerNotificationsProps) => {
  const {notifications} = props
  const [newNotifications, setNewNotifications] = useState(notifications)
  const {isNotificationsActive} = useContext(ServerNotificationContext)

  const handleRemove = (id: number) => {
    const newList = newNotifications.filter((item) => item.id !== id);
    setNewNotifications(newList);
  }

  return (
    <div className={`server-notifications-wrapper`}>
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