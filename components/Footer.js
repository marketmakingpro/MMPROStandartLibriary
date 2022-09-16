import React from "react";

export default (props) => {
  return (
    <div className="py-3" style={{minWidth: 340, zIndex: 1000, background: '#fff'}}>
      <footer className="mx-auto px-4 flex flex-row justify-between items-center text-center">
        <img src="/images/MMPro_Footer_Logo.svg" alt=""/>
        <div className="flex items-center gap-2.5">
          <a
            href="https://twitter.com/MarketmakingPro"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-4"
          >
            <img src="/images/sm-twitter.svg" alt="" width="20" />
          </a>
          <a
            href="https://t.me/market_making_pro_eng"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-4"
          >
            <img src="/images/sm-telegram.svg" alt="" width="20" />
          </a>
          <span style={{color: '#1818337F'}}>v {props.version || "1.0.0"}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span style={{color: '#1818337F'}}>All Rights Reserved</span>
          <a style={{color: '#1818337F'}}>Terms And Conditions</a>
          <a style={{color: '#1818337F'}}>Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
};
