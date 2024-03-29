import React, {useContext, useEffect, useState} from "react";
import './index.css'
import Logo from '../../icons/MMPROLogo/preview.svg';
import LogoSmall from '../../icons/SmallMMPROLogo/preview.svg'
import {LocaleSelector} from "../LocaleSelector";
import {Link} from "react-router-dom";
import WalletConnector from "../WalletConnector";
import styled from 'styled-components'
import {useCookies} from "react-cookie";
import {HeaderButton} from "../../types/HeaderButton";
import {IPage} from '../../types/Page'
import {NavItems} from "../../types/NavItems";

type HeaderProps = {
  headerButtons?: React.ReactElement[],
  connectorButtons?: HeaderButton[],
  logoHref?: string,
  hideWalletConnector?: boolean,
  locales: string[],
  pages?: IPage[],
  headerNavigation?: NavItems[]
}

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
  border-bottom: 1px solid rgba(24,24,51, .1);
`

const NavContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 80px;
  gap: 36px;
  
  @media screen and (max-width: 1200px) {
    align-items: flex-start;
   
    padding: 0;
    gap: 10px;
  }
`

const LogoAndTabs = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  min-width: 200px;
  
  @media screen and (max-width: 1200px) {
    min-width: 0;
  }
`

const ControlStrip = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px
`

const Header = (props: HeaderProps) => {

  const {
    locales,
    pages,
    logoHref,
    hideWalletConnector,
    headerButtons,
    connectorButtons,
    headerNavigation
  } = props

  const [selectedPage, setSelectedPage] = useState(pages ? pages[0].url : '')

  const [cookies] = useCookies(["auth"])
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    setSelectedPage(window.location.pathname)
  }, [])

  useEffect(() => {
    if (cookies.auth) {
      setIsUserLoggedIn(true)
    } else {
      setIsUserLoggedIn(false)
    }
  }, [cookies])

  return (
    <HeaderContainer>
      <div className="flex flex-row justify-between items-center w-full">
        <LogoAndTabs>
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
        </LogoAndTabs>

        <NavContainer>
          {headerNavigation &&
            headerNavigation.map((nav, index) => <div key={index}>{nav}</div>)
          }
        </NavContainer>

        <ControlStrip>
          {headerButtons &&
            headerButtons.map((button, index) => <div key={index}>{button}</div>)
          }
          {!hideWalletConnector && connectorButtons &&
            <WalletConnector buttons={connectorButtons}/>
          }
          {locales.length > 1 &&
            <LocaleSelector locales={locales}/>
          }
        </ControlStrip>
      </div>
    </HeaderContainer>
  );
};

Header.defaultProps = HeaderDefaultProps

export default Header