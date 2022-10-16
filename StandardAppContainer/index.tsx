/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, {ReactNode, useEffect, useState} from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {useConnectionCheck} from "../hooks/useConnectionCheck";
import {injected} from "../wallet";
import {useWeb3React} from "@web3-react/core";
import {useLocale} from "../hooks/useLocale";
import LocaleContext from "../LocaleContext";
import NotificationContext from "../utils/NotificationContext";
import UserDataContext from "../UserDataContext";
import ServerNotificationContext from "../ServerNotificationContext";
import "./index.css";
import "../styles.scss";
import {ConfigProvider} from "antd";
import WalletConnectorBubbleContext from "../WalletConnectorBubbleContext";
import styled from "styled-components";
import {HeaderButton} from "../types/HeaderButton";
import * as Sentry from "@sentry/react";
import {NavItems} from "../types/NavItems";
import ServerNotifications from "../components/ServerNotifications";
import {IPage} from "../types/Page";
import {INotification} from '../types/Notification';
import ErrorBoundary from "../components/ErrorBoundary";

const mockServerNotifications: INotification[] = [
  {
    id: 1,
    title: "KYC Verification update required",
    body: "Please update your personal data in KYC to continue using our products"
  },
  {
    id: 2,
    title: "Все",
    body: "Повесточка пришла"
  },
  {
    id: 3,
    title: "текст",
    body: "Please update your personal data in KYC to continue using our products"
  },
  {
    id: 5,
    title: "текст2",
    body: "Please update your personal data in KYC to continue using our products"
  },
  {
    id: 6,
    title: "KYC Verification update required",
    body: "Please update your personal data in KYC to continue using our products"
  },
  {
    id: 7,
    title: "KYC Verification update required",
    body: "Please update your personal data in KYC to continue using our products"
  },
]

type StandardAppContainerProps = {
  headerButtons?: React.ReactElement[],
  logoHref?: string,
  connectorButtons?: HeaderButton[],
  hideWalletConnector?: boolean,
  children: any,
  locales: string[],
  isDarkBG?: boolean,
  version: string,
  pages?: IPage[],
  headerNavigation?: NavItems[]
}

const defaultProps = {
  locales: ["en"]
};

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 14px;
  margin-bottom: 10px;
`

const StandardAppContainer = (props: StandardAppContainerProps) => {
  const {
    locales,
    isDarkBG,
    version,
    pages,
    logoHref,
    hideWalletConnector,
    connectorButtons,
    headerButtons,
    headerNavigation
  } = props;

  let forcedLocale;
  if (locales.length === 1) {
    forcedLocale = locales[0];
  }
  // @ts-ignore
  const {active, activate, networkError, account, connector} = useWeb3React();
  const {setLocale, locale} = useLocale(forcedLocale);
  const [shouldDisplayNotification, setShouldDisplayNotification] = useState<boolean>(false);
  const [notificationTitle, setNotificationTitle] = useState<string>('')
  const [notificationSubtitle, setNotificationSubtitle] = useState<string>('')
  const [notificationIcon, setNotificationIcon] = useState<ReactNode>(null)
  const [bubbleValue, setBubbleValue] = useState<string>('');
  const [isUserVerified, setIsUserVerified] = useState<boolean>(false);
  const [isUserSubmitted, setIsUserSubmitted] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('')
  const [isServerNotificationActive, setIsServerNotificationActive] = useState<boolean>(false)
  const [notifications, setNotifications] = useState<INotification[]>(mockServerNotifications)

  useConnectionCheck();

  const displayNotification = (title: string, subtitle: string, icon: ReactNode) => {
    setNotificationIcon(icon)
    setNotificationTitle(title)
    setNotificationSubtitle(subtitle)
    setShouldDisplayNotification(true);
    setTimeout(() => {
      setShouldDisplayNotification(false);
    }, 2500);
  };

  async function getUserVerification() {
    const getUserDataUrl = `http://134.209.181.150:7002/api/validation?wallet=${account}`;

    const requestOptions = {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    };

    fetch(getUserDataUrl, requestOptions)
      .then(res => res.json())
      .then(json => {
        if (json && json.data && json.data.isVerified) {
          setIsUserVerified(json.data.isVerified)
          setIsUserSubmitted(json.data.isSubmitted)
          setUserEmail(json.data.email)
        } else {
          setIsUserVerified(false)
          setIsUserSubmitted(json.data.isSubmitted)
        }
      })
      .catch(e => {
      });
  }

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized && !active && !networkError) {
        activate(injected);
      }
    });
  }, [activate, networkError]);

  useEffect(() => {
    if (account) {
      getUserVerification()
      Sentry.setUser({wallet: account});
      Sentry.setTag("wallet", account);
      // @ts-ignore
      if (connector.walletConnectProvider) {
        Sentry.setTag("connection method", "Wallet Connect");
      } else {
        Sentry.setTag("connection method", "Metamask");
      }
    }
  }, [account, isUserVerified])

  return (
    // @ts-ignore
    <ConfigProvider getPopupContainer={trigger => trigger.parentElement}>
      <LocaleContext.Provider value={{setLocale, locale}}>
        <UserDataContext.Provider value={{isUserVerified, isUserSubmitted}}>
          <WalletConnectorBubbleContext.Provider value={{
            setBubbleValue: setBubbleValue,
            bubbleValue: bubbleValue,
          }}>
            <ServerNotificationContext.Provider value={{
              isNotificationsActive: isServerNotificationActive,
              setIsNotificationsActive: setIsServerNotificationActive,
              notifications,
              setNotifications
            }}>
              <NotificationContext.Provider
                value={{
                  displayNotification
                }}
              >
                <div className={`main-content-container main-background`}>
                  <div className={`notification ${shouldDisplayNotification ? "shown" : ""}`}>
                    <TitleWrapper>
                      {notificationIcon}
                      <div className={"notification-title"}>
                        {notificationTitle}
                      </div>
                    </TitleWrapper>
                    <div className={"notification-body"}>
                      {notificationSubtitle}
                    </div>
                  </div>
                  <ServerNotifications/>
                  <Header
                    headerNavigation={headerNavigation}
                    connectorButtons={connectorButtons}
                    logoHref={logoHref}
                    hideWalletConnector={hideWalletConnector}
                    pages={pages}
                    locales={locales}
                    headerButtons={headerButtons}
                  />
                  <div className={"children-container"}>
                    {props.children}
                    <Footer version={version}/>
                  </div>
                </div>
              </NotificationContext.Provider>
            </ServerNotificationContext.Provider>
          </WalletConnectorBubbleContext.Provider>
        </UserDataContext.Provider>
      </LocaleContext.Provider>
    </ConfigProvider>
  );
};

StandardAppContainer.defaultProps = defaultProps;

export default StandardAppContainer;
