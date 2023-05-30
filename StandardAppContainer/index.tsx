/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, { ReactNode, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useConnectionCheck } from "../hooks/useConnectionCheck";
import { injected } from "../wallet";
import { useWeb3React } from "@web3-react/core";
import { useLocale } from "../hooks/useLocale";
import LocaleContext from "../LocaleContext";
import NotificationContext from "../utils/NotificationContext";
import UserDataContext from "../UserDataContext";
import "./index.css";
import "../styles.scss";
import { ConfigProvider } from "antd";
import WalletConnectorBubbleContext from "../WalletConnectorBubbleContext";
import styled from "styled-components";
import { HeaderButton } from "../types/HeaderButton";
import * as Sentry from "@sentry/react";
import { NavItems } from "../types/NavItems";
import { IPage } from "../types/Page";
import { INotification } from "../types/Notification";

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
`;

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
  const { active, activate, networkError, account, connector } = useWeb3React();
  const { setLocale, locale } = useLocale(forcedLocale);
  const [shouldDisplayNotification, setShouldDisplayNotification] = useState<boolean>(false);
  const [notificationTitle, setNotificationTitle] = useState<string>("");
  const [notificationSubtitle, setNotificationSubtitle] = useState<string>("");
  const [notificationIcon, setNotificationIcon] = useState<ReactNode>(null);
  const [bubbleValue, setBubbleValue] = useState<string>("");

  useConnectionCheck();

  const displayNotification = (title: string, subtitle: string, icon: ReactNode) => {
    setNotificationIcon(icon);
    setNotificationTitle(title);
    setNotificationSubtitle(subtitle);
    setShouldDisplayNotification(true);
    setTimeout(() => {
      setShouldDisplayNotification(false);
    }, 2500);
  };

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized && !active && !networkError) {
        activate(injected);
      }
    });
  }, [activate, networkError]);

  useEffect(() => {
    if (account) {
      Sentry.setUser({ wallet: account });
      Sentry.setTag("wallet", account);
      // @ts-ignore
      if (connector.walletConnectProvider) {
        Sentry.setTag("connection method", "Wallet Connect");
      } else {
        Sentry.setTag("connection method", "Metamask");
      }
    }
  }, [account]);

  return (
    // @ts-ignore
    <ConfigProvider getPopupContainer={trigger => trigger.parentElement}>
      <LocaleContext.Provider value={{ setLocale, locale }}>
        <WalletConnectorBubbleContext.Provider value={{
          setBubbleValue: setBubbleValue,
          bubbleValue: bubbleValue
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
                <Footer version={version} />
              </div>
            </div>
          </NotificationContext.Provider>
        </WalletConnectorBubbleContext.Provider>
      </LocaleContext.Provider>
    </ConfigProvider>
  );
};

StandardAppContainer.defaultProps = defaultProps;

export default StandardAppContainer;
