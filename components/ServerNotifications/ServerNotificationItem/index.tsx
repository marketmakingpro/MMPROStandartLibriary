import React, {Dispatch, SetStateAction, useState} from 'react';
import styled from "styled-components";
import ServerNotificationIcon from "../../../icons/ServerNotification";
import Cross from "../../../icons/Cross";
import {StartRow, JustifyStartColumn} from "../../../styles/GlobalStyledComponents";
import './index.scss'

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
      <ServerNotificationIcon />
      <JustifyStartColumn>
        <span>{notification.title}</span>
        <span>{notification.body}</span>
      </JustifyStartColumn>
    </div>
  );
};

export default ServerNotificationItem;