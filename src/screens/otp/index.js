import { useEffect, useState, useRef } from "react";
import Header from "../../components/header";
import Softkey from "../../components/softkey";
import DotsLoader from "../../components/dots-loader";
import { Backend } from "../../BackendConfig";
import { decrypt } from "../../encryption";
import "./styles.css";
import { userDetails } from "../../constants";
import onlyDigits from "../../utility";

const otpLength = 6;

function Otp({ next, back }) {
  const [otpState, setOtpState] =
    useState("inputting"); /* inputting || approved || create || */
  const [length, setLength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showClear, setShowClear] = useState(false);

  const otpInputRef = useRef(null);

  useEffect(() => {
    if (otpInputRef.current) {
      otpInputRef.current.focus();
    }
  }, []);

  function verifyOtp() {
    const nin = userDetails.nin;
    setError(false);
    setLoading(true);
    let otp = otpInputRef.current?.value;
    if (otp.length === otpLength || !isNaN(Number(otp))) {
      Backend.sachet()
        .verifyOtp({ nin, otp })
        .then((res) => res.json())
        .then((data) => {
          const result = decrypt(JSON.stringify(data.data));
          setLoading(false);
          if (!result.status) {
            throw new Error(result.error);
          } else {
            setOtpState("approved");
            next();
          }
        })
        .catch((err) => {
          setLoading(false);
          setError(true);
        });
    } else {
      setOtpState("error");
    }
  }

  function handleOtp(e) {
    onlyDigits(e);
    setLength(e.target.value.length);
    if (e.target.value.length >= otpLength) {
      setOtpState("verify");
      e.currentTarget.blur();
    } else if (e.target.value.length > 0) {
      setShowClear(true);
    } else {
      setShowClear(false);
    }
  }

  function handleCancel() {
    if (otpInputRef.current) {
      otpInputRef.current.value = "";
      setLength(0);
      otpInputRef.current.focus();
      setShowClear(false);
      setOtpState("inputting");
      setError(false);
    }
  }

  const inputting = otpState === "inputting" ? true : false;
  const approved = otpState === "approved" ? true : false;
  const create = otpState === "verify" ? true : false;
  const input_create = inputting || create ? true : false;
  const inputtingClass = (inputting || create) && !error ? "" : "none";
  const loadingClass = loading ? "" : "none";
  const errorClass = error ? "" : "none";

  const inputCancel = inputting && showClear ? true : false;
  const inputBack = inputting && !showClear ? true : false;
  const inputStyle = error ? "err" : loading || approved ? "green" : "";

  return (
    <>
      <div className="otp_setup">
        <Header title="Enter One Time Passcode" />
        <div className="otp_img">
          <img src="./password.svg" />
        </div>
        <div>
          <div className="otp_inputContainer">
            <label className="enter_otp">Please enter one time passcode</label>
            <div className="input_container">
              <input
                type="otp"
                id="otpInput"
                ref={otpInputRef}
                className={inputStyle}
                nav-selectable="true"
                onChange={(e) => handleOtp(e)}
              />
              <div className="loader">
                {loading && <DotsLoader />}
                {error && <img src="/nin_error.svg" />}
              </div>
            </div>
          </div>
          <div className="below_label">
            <div className={`below_label_input ${inputtingClass}`}>
              <p>OTP should be {otpLength}</p>
              <p>
                {length}/{otpLength}
              </p>
            </div>
            <div className={`below_label_err ${errorClass}`}>
              OTP is invalid
            </div>
          </div>
        </div>
        {!loading && (
          <div>
            {inputCancel && <Softkey left="Clear" onKeyLeft={handleCancel} />}
            {inputBack && <Softkey left="Back" onKeyLeft={back} />}
            {create && (
              <Softkey
                left="Clear"
                onKeyLeft={handleCancel}
                right="Verify"
                onKeyRight={verifyOtp}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
export default Otp;
