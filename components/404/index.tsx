import React from 'react';
import './index.scss';
import TrustButton from "../TrustButton";
import Text from "../Text";
import {useHistory} from "react-router-dom";

const NoPageError = () => {
  const history = useHistory()
  return (
    <div className='container-error'>
      <div className='wrapper'>
        <div className="one">
          <div className="content">
            <span className="piece"/>
            <span className="piece"/>
            <span className="piece"/>
          </div>
        </div>
        <div className="two" >
          <div className="content">
            <span className="piece" />
            <span className="piece" />
            <span className="piece" />
          </div>
        </div>
        <div className="three">
          <div className="content">
            <span className="piece" />
            <span className="piece" />
          </div>
        </div>
      </div>
      <div className='text-wrapper'>
        <div className="p404">404</div>
        <div className="text">
          <Text fontWeight={400} fontSize={24}>Page not found :(</Text>
          <div className='mb-4'/>
          <TrustButton isValid style={"green"} onClick={() => history.push('/')}>Go Home!</TrustButton>
        </div>
      </div>
    </div>
  );
};

export default NoPageError;