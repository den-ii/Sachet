import { useState } from "react";
import Header from "../../components/header";
import Softkey from "../../components/softkey";

function PendingVerification() {
  const [verificationStatus, setVerificationStatus] = useState("pending"); // ["pending", "verified", "rejected"
  const pending = verificationStatus === "pending" ? true : false;
  const verified = verificationStatus === "verified" ? true : false;
  const rejected = verificationStatus === "rejected" ? true : false;

  return (
    <div className="verificationStatus">
      {rejected && (
        <div className="verificationError">
          <Header title="Verify Identity" />
          <div>
            <img src="/assets/images/close.svg" />
          </div>
          <div>
            <p>Identify Verification Error</p>
            <p>
              We couldn't confirm your identity with the provided selfie. Please
              ensure it's clear and follows guidelines. For assistance, contact
              support. Your photo is only used for verification.
            </p>
          </div>
          <Softkey center="Retry Verification" />
        </div>
      )}
      {pending && (
        <div className="verificationPending">
          <div>
            <img src="/assets/images/pending.svg" />
          </div>
          <div>
            We're currently finalizing your account verification to ensure a
            secure experience. During this process, you can still use your
            account, but please note that some features may be limited. For full
            access, complete the verification at your earliest convenience.
            Thank you for your understanding
          </div>
          <Softkey center="Proceed With Limited Access" />
        </div>
      )}
    </div>
  );
}

export default PendingVerification;
