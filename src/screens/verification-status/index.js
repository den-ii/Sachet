import { useState } from "react";
import Header from "../../components/header";
import Softkey from "../../components/softkey";
import "./styles.css";

function VerificationStatus({ next, back, findScreen }) {
  const [verificationStatus, setVerificationStatus] = useState(
    localStorage.getItem("confirm-picture")
  ); // ["pending", "verified", "rejected"
  const pending = verificationStatus === "pending" ? true : false;
  const verified = verificationStatus === "verified" ? true : false;
  const rejected = verificationStatus === "rejected" ? true : false;

  function handleRetry() {
    localStorage.removeItem("confirm-picture");
    findScreen("verify-identity");
  }

  return (
    <>
      <div className="verificationStatus">
        {rejected && (
          <div className="verificationError">
            {/* <Header title="Verify Identity" /> */}
            <div className="error_image">
              <img src="/assets/images/close.svg" />
            </div>
            <div className="error_info">
              <p className="heading">Identify Verification Error</p>
              <p className="info">
                We couldn't confirm your identity with the provided selfie.
                Please ensure it's clear and follows guidelines. For assistance,
                contact support. Your photo is only used for verification.
              </p>
            </div>
            <Softkey center="Retry Verification" onKeyCenter={handleRetry} />
          </div>
        )}
        {pending && (
          <div className="verificationPending">
            <div className="pending_image">
              <img src="/assets/images/pending.svg" />
            </div>
            <div className="pending_info">
              <p className="heading">Pending Verification</p>
              <p className="info">
                We're currently finalizing your account verification to ensure a
                secure experience. During this process, you can still use your
                account, but please note that some features may be limited. For
                full access, complete the verification at your earliest
                convenience. Thank you for your understanding.
              </p>
            </div>
            <Softkey center="Proceed With Limited Access" onKeyCenter={next} />
          </div>
        )}
      </div>
    </>
  );
}

export default VerificationStatus;
