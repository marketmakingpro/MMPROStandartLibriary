import React, {useState} from 'react';
import styled, {css} from "styled-components";
import ServerNotificationIcon from "../../../icons/ServerNotification";
import Cross from "../../../icons/Cross";
import {JustifyStartColumn} from "../../../styles/GlobalStyledComponents";
import './index.scss'
import Text from '../../Text'
import {INotification} from "../../../types/Notification";

type ServerNotificationItemProps = {
  handleRemove: (id: number) => void,
  notification: INotification,
  isNotificationUnread: boolean
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

const UnreadNotificationIcon = styled.div`
  position: absolute;
  top: -4px;
  left: -4px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #33CC66;
`

const UnreadNotificationIconWrapper = styled.div<{isNotificationsActive: boolean}>`
  opacity: 1;

  ${({ isNotificationsActive }) => !isNotificationsActive && css`
    transition: opacity .2s;
    opacity: 0;
  `};
`

const ServerNotificationItem = (props: ServerNotificationItemProps) => {
  const {notification, handleRemove, isNotificationUnread} = props
  const [isNotificationOpen, setIsNotificationOpen] = useState(true)

  const toggleNotificationActive = (id: number) => {
    setTimeout(() => {
      handleRemove(id)
    }, 500)
    setIsNotificationOpen(false)
  }

  return (
    <div className={`notification-item-wrapper ${isNotificationOpen ? '' : 'closed'} `}>
      <UnreadNotificationIconWrapper isNotificationsActive={isNotificationUnread}>
        <UnreadNotificationIcon />
      </UnreadNotificationIconWrapper>
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