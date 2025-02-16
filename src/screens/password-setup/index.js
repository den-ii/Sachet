import { useEffect, useState, useRef } from "react";
import Header from "../../components/header";
import Softkey from "../../components/softkey";
import DotsLoader from "../../components/dots-loader";
import { Backend } from "../../BackendConfig";
import { decrypt } from "../../encryption";
import "./styles.css";
import { userDetails } from "../../constants";
import onlyDigits from "../../utility";

const passcodeLength = 6;

function passwordSetup({ next, back }) {
  if (!passcodeLength) throw new Error("Invalid/Non-existent passcode length");
  const [passwordState, setPasswordState] =
    useState("inputting"); /* inputting || approved || create || */
  const [length, setLength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showClear, setShowClear] = useState(false);

  const passwordInputRef = useRef(null);
  const cpasswordInputRef = useRef(null);

  useEffect(() => {
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, []);

  function setUpPassword() {
    // let phoneNumber = decrypt(localStorage.getItem("phoneNumber")).phoneNumber;
    let phoneNumber = userDetails.phoneNumber;
    setError(false);
    setLoading(true);
    let password = document.getElementById("passwordInput")?.value;
    if (password.length === passcodeLength || !isNaN(Number(password))) {
      Backend.sachet()
        .createPassword({ phoneNumber, password })
        .then((res) => res.json())
        .then((data) => {
          const result = decrypt(JSON.stringify(data.data));
          setLoading(false);
          if (!result.status) {
            throw new Error(result.error);
          } else {
            setPasswordState("approved");
            // SET SCREEN STATE TO LOGIN
          }
        })
        .catch((err) => {
          setLoading(false);
          setError(true);
        });
    } else {
      setPasswordState("error");
    }
  }

  function handlePassword(e) {
    setLength(e.target.value.length);
    if (e.target.value.length >= passcodeLength) {
      setPasswordState("create");
      e.currentTarget.blur();
    } else if (e.target.value.length > 0) {
      setShowClear(true);
    } else {
      setShowClear(false);
    }
  }

  function handleCancel() {
    const passwordInput = document.getElementById("passwordInput");
    passwordInput.value = "";
    setLength(0);
    passwordInput.focus();
    setShowClear(false);
    setPasswordState("inputting");
    setError(false);
  }

  const inputting = passwordState === "inputting" ? true : false;
  const approved = passwordState === "approved" ? true : false;
  const create = passwordState === "create" ? true : false;
  const input_create = inputting || create ? true : false;
  const inputtingClass = (inputting || create) && !error ? "" : "none";
  const loadingClass = loading ? "" : "none";
  const errorClass = error ? "" : "none";

  const inputCancel = inputting && showClear ? true : false;
  const inputBack = inputting && !showClear ? true : false;
  const inputStyle = error ? "err" : loading || approved ? "green" : "";

  return (
    <>
      {input_create && (
        <div className="password_setup">
          <Header title="Set Up Passcode" />
          <div>
            <div className="password_inputContainer">
              <label className="enter_password">
                Please enter your new passcode
              </label>
              <div className="input_container">
                <input
                  type="password"
                  id="passwordInput"
                  className={inputStyle}
                  ref={passwordInputRef}
                  nav-selectable="true"
                  onChange={(e) => handlePassword(e)}
                />
                <div className="loader">
                  {loading && <DotsLoader />}
                  {error && <img src="/nin_error.svg" />}
                </div>
              </div>
            </div>
            <div className="below_label">
              <div className={`below_label_input ${inputtingClass}`}>
                <p>Passcode should be {passcodeLength}</p>
                <p>
                  {length}/{passcodeLength}
                </p>
              </div>
              <div className={`below_label_err ${errorClass}`}>
                Password cannot be created
              </div>
            </div>
            <div className="password_inputContainer" style={{ marginTop: 12 }}>
              <label className="enter_password">
                Please confirm your new passcode
              </label>
              <div className="input_container">
                <input
                  type="password"
                  id="cpasswordInput"
                  className={inputStyle}
                  ref={cpasswordInputRef}
                  nav-selectable="true"
                  onChange={(e) => handlePassword(e)}
                />
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
                  right="Create"
                  onKeyRight={setUpPassword}
                />
              )}
            </div>
          )}
        </div>
      )}
      {approved && (
        <div className="password_approved">
          <Header title="Success" />
          <div>
            <img src="./verified.svg" />
            <p className="heading">Well done!</p>
            <p className="leading">Your passcode has been set</p>
          </div>
          <Softkey
            center={"Continue to Sachet"}
            onKeyCenter={next}
            noLeft={true}
            noRight={true}
          />
        </div>
      )}
    </>
  );
}
export default passwordSetup;
