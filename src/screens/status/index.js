import { useEffect, useState } from "react";
import Header from "../../components/header";
import Softkey from "../../components/softkey";
import "../otp2/styles.css";
import { userDetails } from "../../constants";

function Status({ next, findScreen }) {
  return (
    <>
      <div>
        <Header title="Success" />
        <div className="otpContainer">
          <div className="success_heading">
            <div className="img_container_success_status">
              <img src="/verified.svg" />
            </div>
            <p>
              Your account has been verified and your one-time passcode has been
              sent to your phone number. Proceed to login to complete
              onboarding.
            </p>
          </div>
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

export default Status;
