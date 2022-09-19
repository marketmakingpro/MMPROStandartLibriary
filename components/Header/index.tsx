import React, {useEffect, useState} from "react";
import './index.css'
import Logo from '../../icons/MMPROLogo/preview.svg';
import LogoSmall from '../../icons/SmallMMPROLogo/preview.svg'
import {LocaleSelector} from "../LocaleSelector";
import {Link} from "react-router-dom";
import WalletConnector, {HeaderButton} from "../WalletConnector";
import styled from 'styled-components'

const HeaderDefaultProps = {
  logoHref: 'https://marketmaking.pro/'
}

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 340px;
  z-index: 5;
  padding: 16px;
  height: 80px;
  position: fixed;
  width: 100vw;
  background: rgb(255, 255, 255);
  top: 0;
`

const Header = (props: { headerButtons?: React.ReactElement[], connectorButtons: HeaderButton[], logoHref?: string, hideWalletConnector?: boolean, locales: string[], pages?: { title: string, url: string }[] }) => {
  const {locales, pages, logoHref, hideWalletConnector, headerButtons, connectorButtons} = props
  const [selectedPage, setSelectedPage] = useState(pages ? pages[0].url : '')

  useEffect(() => {
    setSelectedPage(window.location.pathname)
  }, [])

  return (
    <HeaderContainer>
      <div className="flex flex-row justify-between items-center w-full">
        <div className={'logo-and-tabs'}>
          <a href={logoHref}>
            <img
              src={Logo}
              className="cursor-pointer logo-large"
              alt="mmpro logo"
            />
            <img
              src={LogoSmall}
              className="cursor-pointer logo-small"
              alt="mmpro logo"
            />
          </a>
          <div className={'tabs'}>
            {(pages !== undefined && pages.length > 0) &&
              <>
                {pages.map(page => (
                  <Link
                    key={page.title}
                    className={`page-tab ${selectedPage === page.url && 'tab-selected'}`}
                    onClick={() => {
                      setSelectedPage(page.url)
                    }}
                    to={page.url}
                  >
                    {page.title}
                    <div className={'tab-selector'}/>
                  </Link>
                ))}
              </>
            }
          </div>
        </div>

        <div className={'control-strip'}>
          {headerButtons &&
            headerButtons.map(button => button)
          }
          {locales.length > 1 &&
            <LocaleSelector locales={locales}/>
          }
          {!hideWalletConnector &&
            <WalletConnector buttons={connectorButtons}/>
          }
        </div>
      </div>
    </HeaderContainer>
  );
};

Header.defaultProps = HeaderDefaultProps

export default Header