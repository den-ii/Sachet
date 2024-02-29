import { useEffect, useState } from "react";
import Header from "../../components/header";
import Softkey from "../../components/softkey";
import "../otp/styles.css";

function Status({ next, findScreen }) {
  // handle key center
  const [validationState, setValidationState] = useState(
    localStorage.getItem("confirm-picture")
  ); /* pending ||verified */

  useEffect(() => {
    console.log("Yo");
    const verified = validationState === "verified";
    if (verified) {
      findScreen("status");
    }
  }, []);

  return (
    <>
      {validationState === "pending" && (
        <div>
          <Header title="Limited Access" />
          <div className="otpContainer">
            <div className="success_heading">
              <div className="img_container">
                <img src="/limited_access.svg" />
              </div>
              <p>Your account has limited access</p>
            </div>
            <div className="otpPhoneContainer">
              <p className="leading">Your New Phone Number:</p>
              <p className="number">0905 987 4509</p>
            </div>
          </div>
          <Softkey center="Set Up Password" onKeyCenter={next} />
        </div>
      )}
      {validationState === "verified" && (
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
              <p className="number">0905 987 4509</p>
            </div>
          </div>
          <Softkey center="Set Up Password" onKeyCenter={next} />
        </div>
      )}
    </>
  );
}

export default Status;
