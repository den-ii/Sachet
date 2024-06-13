import { useEffect, useState, useRef } from "react";
import Header from "../../components/header";
import Dinput from "../../components/dinput";
import Softkey from "../../components/softkey";
import "./styles.css";

function ForgotPassword({ findScreen }) {
  const [screen, setScreen] = useState(0);

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [screen]);

  const firstScreen = screen === 0;
  const verifyScreen = screen === 1;
  const setupScreen = screen === 2;

  function handleScreenChange(value) {
    setScreen(value);
  }

  return (
    <div className="forgotPassword">
      {firstScreen && (
        <>
          <Header title="Forgot Password" />

          <div className="firstScreen">
            <p className="leading">
              Please enter your phone number to reset your passcode
            </p>
            <Dinput id="phone" type="number" iRef={inputRef} />
            <Softkey
              left="Back"
              onKeyLeft={() => findScreen("login")}
              noCenter={true}
              right="Send Code"
              onKeyRight={() => handleScreenChange(1)}
            />
          </div>
        </>
      )}
      {verifyScreen && (
        <>
          <Header title="Verification Code" />
          <div className="verifyScreen">
            <p className="leading">
              We have sent a verification code to *** *** 4500.
            </p>
            <p className="bold">Please enter the code below.</p>
            <Dinput
              id="passcode"
              type="number"
              value="Phone Number"
              iRef={inputRef}
            />
            <Softkey
              left="Back"
              onKeyLeft={() => handleScreenChange(0)}
              noCenter={true}
              right="Verify"
              onKeyRight={() => handleScreenChange(2)}
            />
          </div>
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
