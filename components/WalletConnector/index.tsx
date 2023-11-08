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
import UserDataContext from "../../UserDataContext";
import button from "../Button";
import {HeaderButton} from '../../types/HeaderButton'
import UserStatusContext from "../../../context/UserStatusContext";
import {metaMask, hooks} from "../../../wallet/metaMask";
import {walletConnectV2} from "../../../wallet/walletConnectV2";
import {isMetaMaskInstalled} from '../../../metamask';
import NotificationContext from "../../utils/NotificationContext";

type WalletConnectorPropType = {
	buttons: HeaderButton[]
}

const WalletConnectorDefaultProps = {}

const WalletConnector = (props: WalletConnectorPropType) => {
	const {locale} = useContext(LocaleContext)
	const {bubbleValue} = useContext(WalletConnectorBubbleContext)
	const {isUserVerified} = useContext(UserDataContext)
	const { account, connector} = useWeb3React();
	const {useIsActive, useChainId} = hooks
	const active = useIsActive()
	const chainId = useChainId()
	const ref = useRef(null);
	const {buttons} = props
	const [isConnectorOpen, setIsConnectorOpen] = useState(false)
	const {isWalletVerified} = useContext(UserStatusContext)
	const {displayNotification} = useContext(NotificationContext)

	const [metaMaskInstalled, setMetaMaskInstalled] = useState<boolean>(false);

	useOnClickOutside(ref, () => setIsConnectorOpen(false))

	function mainButtonClick() {
		setIsConnectorOpen(!isConnectorOpen)
	}

	useEffect(() => {
		const initNetwork = async () => {
			if (56 !== chainId) {
				await switchNetwork();
			}
		};
		initNetwork();
	}, [active, chainId]);

	const onClickConnectorButton = () => {
		setIsConnectorOpen(false)
	}

	const connectMetaMask = async () => {
		if (metaMaskInstalled) {
			await metaMask.activate()
				.then(res => console.log(res))
				.catch((e) => console.log(e))
			return
		}

		displayNotification(
			'Please install MetaMask',
			''
		)
	}

	const connectWalletConnect = async () => {
		try {
			await walletConnectV2.activate()
		} catch (error) {
			console.error('Error connecting with WalletConnect', error);
		}
	};

	return (
		<div className={'disconnect-button-container'} ref={ref}>
			<div className={`notification-bubble ${(!active || bubbleValue.length === 0) ? 'hiding' : ''}`}>
				{bubbleValue.replace("EMPTY", " ")}
			</div>
			<div
				style={{zIndex: 2, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}
			>
				<button
					className={`wallet-button connected ${isConnectorOpen ? 'open' : ''}`} onClick={mainButtonClick}
				>
					{active || isWalletVerified ?
						<>
							<MetamaskJazzicon/>
							<span className={`connect-title ${isConnectorOpen ? 'open' : ''}`}
							      style={{height: 30}}>{localized(texts.profile, locale)}</span>
						</>
						:
						<span
							className={`connect-title ${isConnectorOpen ? 'open' : ''}`}>{localized(texts.connectWallet, locale)}</span>
					}
					<div className={`swoosh ${isConnectorOpen ? 'open' : ''}`}>
						<Swoosh/>
					</div>
				</button>
				{active || isWalletVerified ?
					<div
						className={`connect-wallet-flex ${isConnectorOpen ? 'open' : ''} connected`}>
						<div className={`connector-options ${isConnectorOpen ? 'open' : ''}`}>
							{
								buttons.map((item, index) => {
									return (
										<div key={index} onClick={onClickConnectorButton} style={{minWidth: 210}}>
											{item}
										</div>
									)
								})
							}
						</div>
					</div>
					:
					<div className={`connect-wallet-flex ${isConnectorOpen ? 'open' : ''}`}>
						<div className={`connector-options ${isConnectorOpen ? 'open' : ''}`}>
							<div
								className={`connection-button`}
								onClick={connectMetaMask}
							>
								<img
									src="/images/wallet/metamask.svg"
									alt="metamask"
									width="30"
									height="30"
									style={{marginRight: 10}}
								/>
								<span>MetaMask</span>
							</div>
							<div
								className={`connection-button`}
								onClick={connectWalletConnect}
							>
								<img
									src="/images/wallet/trustwallet.svg"
									alt="metamask"
									width="30"
									height="30"
									style={{marginRight: 10}}
								/>
								<span>Wallet connect</span>
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