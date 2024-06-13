import { useEffect, useState } from "react";
import Header from "../../components/header";
import Softkey from "../../components/softkey";
import "./styles.css";

function SuccessStatus({ next, findScreen }) {
  return (
    <>
      <div className="success-status">
        <Header title="Success" />
        <div className="container">
          <div className="img_container">
            <img src="/verified.svg" />
          </div>
          <p>
            Your account has been verified and your one-time passcode has been
            sent to you phone number. Proceed to login to complete onboarding.
          </p>
        </div>
        <Softkey
          center="Login"
          onKeyCenter={() => findScreen("login")}
          noLeft={true}
          noRight={true}
        />
      </div>
    </>
  );
}

export default SuccessStatus;
