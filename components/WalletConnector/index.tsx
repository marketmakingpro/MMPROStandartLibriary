import React, {useContext, useEffect, useRef, useState} from "react";
import texts from './localization'
import LocaleContext from "../../LocaleContext";
import {localized} from "../../utils/localized";
import MetamaskJazzicon from "../MetamaskJazzicon";
import {useWeb3React} from "@web3-react/core";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import './index.scss'
import {injected, switchNetwork, walletconnect} from "../../wallet";
import Swoosh from '../../images/NegativeBorderRadiusRight'
import WalletConnectorBubbleContext from "../../WalletConnectorBubbleContext";
import NotificationContext from "../../utils/NotificationContext";
import UserDataContext from "../../UserDataContext";
import button from "../Button";

export type HeaderButton = React.ReactElement
// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

type WalletConnectorPropType = {
  // You should declare props like this, delete this if you don't need props
  buttons: HeaderButton[]
}

const WalletConnectorDefaultProps = {
  // You should declare default props like this, delete this if you don't need props
}

const WalletConnector = (props: WalletConnectorPropType) => {
  const {locale} = useContext(LocaleContext)
  const {bubbleValue} = useContext(WalletConnectorBubbleContext)
  const {chainId, activate, active, error} = useWeb3React();
  const ref = useRef(null);
  const {buttons} = props
  const [isConnectorOpen, setIsConnectorOpen] = useState(false)

  useOnClickOutside(ref, () => setIsConnectorOpen(false))

  function mainButtonClick() {
    setIsConnectorOpen(!isConnectorOpen)
    if (56 !== chainId) {
      alert("To continue please switch your network to BSC")
    }
  }

  useEffect(() => {
    const initNetwork = async () => {
      if (56 !== chainId) {
        await switchNetwork();
      }
    };
    initNetwork();
  }, [active, chainId, error]);

  const onClickConnectorButton = () => {
    setIsConnectorOpen(false)
  }

  return (
    <div className={'disconnect-button-container'} ref={ref}>
      <div className={`notification-bubble ${(!active || bubbleValue.length === 0) ? 'hiding' : ''}`}>
        {bubbleValue.replace("EMPTY", " ")}
      </div>
      <div
        style={{zIndex: 2, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}
      >
        {/* @ts-ignore */}
        <button
          className={`wallet-button ${(active) ? 'connected' : 'not-connected'} 
                    ${isConnectorOpen ? 'open' : ''}`} onClick={mainButtonClick}
        >
          {active &&
            <>
              <MetamaskJazzicon/>
              <span className={`connect-title ${isConnectorOpen ? 'open' : ''}`}
                    style={{height: 30}}>{localized(texts.profile, locale)}</span>
            </>
          }
          {!active &&
            <>
              <span
                className={`connect-title ${isConnectorOpen ? 'open' : ''}`}>{localized(texts.connectWallet, locale)}
              </span>
              <img src="/images/wallet/metamask.svg" alt="metamask" className={'mobile-wallet-connector'}/>
            </>
          }
          <div className={`swoosh ${isConnectorOpen ? 'open' : ''}`}>
            <Swoosh/>
          </div>
        </button>
        {active &&
          <div
            className={`connect-wallet-flex ${isConnectorOpen ? 'open' : ''} ${(active) ? 'connected' : 'not-connected'} `}>
            <div className={`connector-options ${isConnectorOpen ? 'open' : ''}`}>
              {
                buttons.map((item, index) => {
                  return (
                    <div key={index} onClick={onClickConnectorButton} style={{width: '100%'}}>
                      {item}
                    </div>
                  )
                })
              }
            </div>
          </div>
        }
        {!active &&
          <div className={`connect-wallet-flex ${isConnectorOpen ? 'open' : ''}`}>
            <div className={`connector-options ${isConnectorOpen ? 'open' : ''}`}>
              <div
                className={`connection-button`}
                onClick={() => {
                  activate(injected).then();
                }}
              >
                <img
                  src="/images/wallet/metamask.svg"
                  alt="metamask"
                  width="30"
                  height="30"
                  style={{marginRight: 10}}
                />
                <p>MetaMask</p>
              </div>
              <div
                className={`connection-button`}
                onClick={() => {
                  activate(walletconnect).then(() => {
                    window.location.reload();
                  });
                }}
              >
                <img
                  src="/images/wallet/trustwallet.svg"
                  alt="metamask"
                  width="30"
                  height="30"
                  style={{marginRight: 10}}
                />
                <p>Wallet connect</p>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
};

WalletConnector.defaultProps = WalletConnectorDefaultProps

export default WalletConnector