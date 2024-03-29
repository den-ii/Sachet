import { useEffect, useState } from "react";
import Header from "../../components/header";
import Softkey from "../../components/softkey";
import "../otp/styles.css";
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
            <p className="leading">Your New Phone Number:</p>
            <p className="number">{userDetails.phoneNumber}</p>
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
