import { useEffect, useLayoutEffect, useState } from "react";
import Softkey from "../../components/softkey";
import "./styles.css";
import { Backend } from "../../BackendConfig";
import PopUpLoader from "../../components/popup-loader";
import { userDetails } from "../../constants";
import { decrypt } from "../../encryption";

function VerificationStatus({ next, back, findScreen }) {
  const [verificationStatus, setVerificationStatus] = useState(
    localStorage.getItem("kycStatus")
  ); // "pending" ||"verified" || "limit-reached" ||"rejected"
  const [loading, setLoading] = useState(false);
  const [autoRetry, setAutoRetry] = useState(true);
  const [showReCheck, setShowReCheck] = useState(false);

  useLayoutEffect(() => {
    if (localStorage.getItem("kycStatus") === "approved") {
      findScreen("status");
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (verificationStatus === "pending") {
        handleReCheck();
        setAutoRetry(false);
        setShowReCheck(true);
      }
    }, 10000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [autoRetry]);

  function handleKeyDown(evt) {
    switch (evt.key) {
      case "Backspace":
        evt.preventDefault();
        evt.stopPropagation();
        return;
      default:
        return;
    }
  }
  const pending = verificationStatus === "pending";
  const limitReached = verificationStatus === "limitReached";
  const rejected = verificationStatus === "rejected";

  function handleRetry() {
    findScreen("verify-identity");
  }

  function handleReCheck() {
    setLoading(true);
    setShowReCheck(false);
    Backend.sachet()
      .getEnrollmentStatus({
        nin: userDetails.nin,
      })
      .then((res) => {
        if (res.status === 409) {
          findScreen("login");
          return;
        }
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        const result = decrypt(JSON.stringify(data.data));
        const { kycStatus } = result.data;
        if (result.status) {
          if (kycStatus === "approved") {
            localStorage.setItem("kycStatus", "approved");
            findScreen("status");
          } else if (kycStatus === "pending") {
            localStorage.setItem("kycStatus", "pending");
            setShowReCheck(true);
          } else if (kycStatus === "notApproved") {
            localStorage.setItem("kycStatus", "rejected");
            findScreen("verification-status");
          }
        } else {
          throw new Error("an error occurred");
        }
      })
      .catch((err) => {
        setLoading(false);
        setShowReCheck(true);
        console.log("error", err);
      });
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
                Verification limit reached. For further assistance, please
                contact our support team.
              </p>
            </div>
            <Softkey center="Contact Support" noLeft={true} noRight={true} />
          </div>
        )}
        {pending && (
          <div className="verificationPending">
            {loading && (
              <div className="popUpLoading">
                <PopUpLoader text="Looking up status" />
              </div>
            )}
            <div className="pending_image">
              <img src="/assets/images/pending.svg" />
            </div>
            <div className="pending_info">
              <p className="heading">Pending Verification</p>
              <p className="info">
                We're currently finalizing your account verification to ensure a
                secure experience. We will send a code to you shortly if
                approved. Thank you for your understanding.
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
