import { useEffect, useLayoutEffect, useState } from "react";
import Softkey from "../../components/softkey";
import "./styles.css";
import { Backend } from "../../BackendConfig";
import { userDetails } from "../../constants";
import { decrypt } from "../../encryption";

function VerificationStatus({ next, back, findScreen }) {
  const [verificationStatus, setVerificationStatus] = useState(
    localStorage.getItem("kycStatus")
  ); // "pending" ||"verified" || "limit-reached" ||"rejected"
  const [showReCheck, setShowReCheck] = useState(false);
  useLayoutEffect(() => {
    if (localStorage.getItem("kycStatus") === "approved") {
      findScreen("status");
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (verificationStatus === "pending") {
        handleReCheck();
        setShowReCheck(true);
      }
    }, 30000);

    return () => clearTimeout(timeoutId);
  });
  console.log(verificationStatus);
  const pending = verificationStatus === "pending";
  const limitReached = verificationStatus === "limitReached";
  const rejected = verificationStatus === "rejected";

  function handleRetry() {
    findScreen("verify-identity");
  }

  function handleReCheck() {
    console.log("yep");
    Backend.sachet()
      .onboardSachetCustomer({
        nin: userDetails.nin,
      })
      .then((res) => {
        console.log(res.status);
        if (res.status === 409) {
          findScreen("login");
          return;
        }
        return res.json();
      })
      .then((data) => {
        const result = decrypt(JSON.stringify(data.data));
        console.log(result);
        const { kycStatus, retriesLeft, hasCreatedPassword, phoneNumber } =
          result.data;
        console.log(retriesLeft);
        if (result.status) {
          if (kycStatus === "notApproved") {
            next();
          } else if (kycStatus === "approved") {
            localStorage.setItem("kycStatus", "approved");
            userDetails.phoneNumber = phoneNumber;
            if (hasCreatedPassword) findScreen("login");
            else findScreen("status");
          } else if (kycStatus === "pending") {
            localStorage.setItem("kycStatus", "pending");
            findScreen("verification-status");
          } else if (kycStatus === "rejected" && retriesLeft) {
            localStorage.setItem("kycStatus", "rejected");
            findScreen("verification-status");
          } else if (kycStatus === "rejected" && !retriesLeft) {
            localStorage.setItem("kycStatus", "limit-reached");
            findScreen("verification-status");
          }
        } else {
          throw new Error("an error occurred");
        }
      })
      .catch((err) => console.log("error", err));
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
            <Softkey
              center="Retry Verification"
              onKeyCenter={handleRetry}
              noLeft={true}
              noRight={true}
            />
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
            <Softkey center="Contact Support" noLeft={true} noRight={true} />
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
            {showReCheck && (
              <Softkey center="ReCheck" onKeyCenter={handleReCheck} />
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default VerificationStatus;
