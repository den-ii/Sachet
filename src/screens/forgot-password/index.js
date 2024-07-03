import { useEffect, useState, useRef } from "react";
import Header from "../../components/header";
import Dinput from "../../components/dinput";
import Softkey from "../../components/softkey";
import PopUpLoader from "../../components/popup-loader";
import "./styles.css";
import { Backend } from "../../BackendConfig";
import { decrypt } from "../../encryption";
import { userDetails } from "../../constants";

function ForgotPassword({ findScreen }) {
  const [screen, setScreen] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [length, setLength] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [showClear, setShowClear] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setShowClear(false);
    setShowNext(false);
    setLength(0);
  }, [screen]);

  const firstScreen = screen === 0;
  const verifyScreen = screen === 1;
  const setupScreen = screen === 2;

  function handleScreenChange(value) {
    setScreen(value);
  }

  function blurInput() {
    if (inputRef.current) inputRef.current.blur();
  }

  function inputChange(e, value) {
    console.log(e.target.value.length);
    if (e.target.value.length > 0) {
      setLength(e.target.value.length);
      setShowClear(true);
    } else setShowClear(false);

    if (e.target.value.length >= value) {
      setShowClear(false);
      setShowNext(true);
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  }

  function resetPasscode1() {
    setLoading(true);
    let nin;
    if (inputRef.current) {
      nin = inputRef.current.value;
      userDetails.nin = nin;
    }
    console.log(nin);
    Backend.sachet()
      .resetPasscode1({ nin })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setError(false);
        const result = decrypt(JSON.stringify(data.data));
        console.log(result);
        if (result.status === false) {
          if (result.data === "Customer not verified")
            throw new Error("Customer does not exist");
          else throw new Error("Something went wrong");
        } else {
          handleScreenChange(1);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        setErrorMsg(err.message);
        blurInput();
      });
  }

  function verifyOtp() {
    setLoading(true);
    let nin = userDetails.nin;
    let otp;
    if (inputRef.current) otp = inputRef.current.value;
    console.log(nin);
    Backend.sachet()
      .resetPasscode2({ nin, otp })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setError(false);
        const result = decrypt(JSON.stringify(data.data));
        console.log(result);
        if (result.status === false) {
          if (result.data === "Customer not verified")
            throw new Error("Customer does not exist");
          else throw new Error("Something went wrong");
        } else {
          handleScreenChange(2);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        setErrorMsg(err.message);
        blurInput();
      });
  }

  function goBackOrClear() {
    if (!inputRef.current) return;
    if (inputRef.current.value.length > 0) {
      setError(false);
      inputRef.current.value = "";
      setShowClear(false);
      setShowNext(false);
      inputRef.current.focus();
    } else {
      if (screen === 0) findScreen("login");
      if (screen === 1) handleScreenChange(0);
    }
  }

  let next = !loading && !error && showNext;
  let inputClear = !loading && !error && showClear && !showNext;
  let inputBack = !loading && !error && !showClear && !showNext;

  return (
    <div className="forgotPassword">
      {firstScreen && (
        <>
          <Header title="Forgot Password" />
          {loading && (
            <div className="popUpLoading">
              <PopUpLoader text="Checking NIN" />
            </div>
          )}
          <div className="firstScreen">
            <p className="leading">
              Please enter your nin to reset your passcode
            </p>
            <div className="forgotPassword__input">
              <Dinput
                id="nin"
                type="number"
                iRef={inputRef}
                onChange={(e) => inputChange(e, 11)}
                error={error}
              />
              <div className="forgotPassword__input--error">
                {error && <img src="/nin_error.svg" />}
              </div>
            </div>
            {error && <div className="forgotPassword__error">{errorMsg}</div>}
          </div>

          {loading && <></>}
          {next && (
            <Softkey
              left={"Clear"}
              onKeyLeft={goBackOrClear}
              noCenter={true}
              right="Send Code"
              onKeyRight={resetPasscode1}
            />
          )}
          {inputClear && (
            <Softkey left="Clear" onKeyLeft={goBackOrClear} noCenter={true} />
          )}
          {error && (
            <Softkey
              left="Re-Enter"
              onKeyLeft={goBackOrClear}
              noCenter={true}
            />
          )}
          {inputBack && (
            <Softkey left="Back" onKeyLeft={goBackOrClear} noCenter={true} />
          )}
        </>
      )}
      {verifyScreen && (
        <>
          <Header title="Verification Code" />
          {loading && (
            <div className="popUpLoading">
              <PopUpLoader text="Checking Code" />
            </div>
          )}
          <div className="verifyScreen">
            <p className="leading">
              We have sent a verification code to the phone number linked to
              your NIN.
            </p>
            <p className="bold">Please enter the code below.</p>
            <div className="forgotPassword__input">
              <Dinput
                id="code"
                type="number"
                iRef={inputRef}
                onChange={(e) => inputChange(e, 6)}
                error={error}
              />
              <div className="forgotPassword__input--error">
                {error && <img src="/nin_error.svg" />}
              </div>
            </div>
            {error && <div className="forgotPassword__error">{errorMsg}</div>}
          </div>
          {loading && <></>}
          {next && (
            <Softkey
              left={"Clear"}
              onKeyLeft={goBackOrClear}
              noCenter={true}
              right="Verify Code"
              onKeyRight={verifyOtp}
            />
          )}
          {inputClear && (
            <Softkey left="Clear" onKeyLeft={goBackOrClear} noCenter={true} />
          )}
          {error && (
            <Softkey
              left="Re-Enter"
              onKeyLeft={goBackOrClear}
              noCenter={true}
            />
          )}
          {inputBack && (
            <Softkey left="Back" onKeyLeft={goBackOrClear} noCenter={true} />
          )}
        </>
      )}
      {setupScreen && (
        <>
          <Header title="Set Up Passcode" />
          <div className="setupScreen">
            <div className="passcode_container">
              <label htmlFor="passcode">Enter Passcode</label>
              <Dinput id="passcode" type="number" iRef={inputRef} />
            </div>
            <div className="passcode_container">
              <label htmlFor="passcode">Confirm Passcode</label>
              <Dinput id="cpasscode" type="number" />
            </div>
            <Softkey
              left="Back"
              onKeyLeft={() => handleScreenChange(1)}
              noCenter={true}
              right="Reset Passcode"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default ForgotPassword;
