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
            <div className="img_container">
              <img src="/verified.svg" />
            </div>
            <p>Your account has been verified</p>
          </div>
          <div className="otpPhoneContainer">
            <p>
              Your account has been verified and your one-time passcode has been
              sent to you phone number ***{userDetails.phoneNumber.slice(-4)}
            </p>
          </div>
        </div>
        <Softkey
          center="Set Up Password"
          onKeyCenter={next}
          noLeft={true}
          noRight={true}
        />
      </div>
    </>
  );
}

export default Status;
