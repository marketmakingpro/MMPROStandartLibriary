import React from 'react';
import './index.scss';
import TrustButton from "../TrustButton";
import Text from "../Text";
import {useHistory} from "react-router-dom";

type NoPageErrorProps = {
  isServerError?: boolean
}

const DefaultProps = {
  isServerError: false
}

const NoPageError = (props: NoPageErrorProps) => {
  const {isServerError} = props
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
        {!isServerError && <div className="p404">404</div>}
        <div className="text">
          <Text fontWeight={400} fontSize={24}>{!isServerError ? 'Page not found :(' : 'Something bad happened'}</Text>
          <div className='mb-4'/>
          {!isServerError && <TrustButton isValid style={"green"} onClick={() => history.goBack()}>Go Back!</TrustButton>}
        </div>
      </div>
    </div>
  );
};

NoPageError.defaultProps = DefaultProps

export default NoPageError;