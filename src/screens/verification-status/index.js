import { useEffect, useState } from "react";
import Header from "../../components/header";
import Softkey from "../../components/softkey";
import "./styles.css";

function VerificationStatus({ next, back, findScreen }) {
  const [verificationStatus, setVerificationStatus] = useState(
    localStorage.getItem("confirm-picture")
  ); // "pending" ||"verified" || "limit-reached" ||"rejected"
  useEffect(() => {
    const verified = verificationStatus === "verified";
    if (verified) {
      findScreen("status");
    }
  }, []);

  const pending = verificationStatus === "pending";
  const limitReached = verificationStatus === "limit-reached";
  const rejected = verificationStatus === "rejected";

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
        {limitReached && (
          <div className="verificationPending">
            <div className="pending_image">
              <img src="/assets/images/pending.svg" />
            </div>
            <div className="pending_info">
              <p className="heading">Verification Limit Exceeded</p>
              <p className="info">
                Second attempt failed. Verification limit reached. For further
                assistance, please contact our support team.
              </p>
            </div>
            <Softkey center="Contact Support" />
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
                secure experience. Thank you for your understanding.
              </p>
            </div>
            {/* <Softkey center="Proceed With Limited Access" onKeyCenter={next} /> */}
          </div>
        )}
      </div>
    </>
  );
}

export default VerificationStatus;
