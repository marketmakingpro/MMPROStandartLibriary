import React, {useState} from 'react';
import styled from "styled-components";
import ServerNotificationIcon from "../../../icons/ServerNotification";
import Cross from "../../../icons/Cross";
import {JustifyStartColumn} from "../../../styles/GlobalStyledComponents";
import './index.scss'
import Text from '../../Text'

type ServerNotificationItemProps = {
  handleRemove: (id: number) => void,
  notification: {id: number, title: string, body: string},
}

const CrossWrapper = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
  width: 15px;
  height: 15px;
  cursor: pointer;
`

const NotificationIconWrapper = styled.div`
  width: 30px;
  height: 30px;
`

const ServerNotificationItem = (props: ServerNotificationItemProps) => {
  const {notification, handleRemove} = props
  const [isNotificationOpen, setIsNotificationOpen] = useState(true)

  const toggleNotificationActive = (id: number) => {
    setTimeout(() => {
      handleRemove(id)
    }, 500)
    setIsNotificationOpen(false)
  }

  return (
    <div className={`notification-item-wrapper ${isNotificationOpen ? '' : 'closed'} `}>
      <CrossWrapper onClick={() => toggleNotificationActive(notification.id)}>
        <Cross />
      </CrossWrapper>
      <NotificationIconWrapper>
        <ServerNotificationIcon />
      </NotificationIconWrapper>
      <JustifyStartColumn>
        <Text fontWeight={500} fontSize={14}>{notification.title}</Text>
        <Text fontWeight={400} fontSize={12}>{notification.body}</Text>
      </JustifyStartColumn>
    </div>
  );
};

export default ServerNotificationItem;