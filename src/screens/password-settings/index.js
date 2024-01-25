import { useEffect, useState, useRef } from "react";
import Header from "../../components/header";
import Softkey from "../../components/softkey";
import DotsLoader from "../../components/dots-loader";
import "./styles.css";

function PasswordSettings({ findScreen }) {
  const [passcodeScreen, setPasscodeScreen] =
    useState(0); /* 0 || 1 || 2 || 3 */
  const [passcodeLength, setPasscodeLength] = useState(0);
  const [passcode, setPasscode] = useState("");
  const [okay, setOkay] = useState(false);
  const [passcodeState, setPasscodeState] =
    useState("inputting"); /* inputting || loading || rejected */

  const passcodeInput = useRef(null);

  let enterPasscode = passcodeScreen === 0 ? true : false;
  let inputNewPasscode = passcodeScreen === 1 ? true : false;
  let confirmNewPasscode = passcodeScreen === 2 ? true : false;
  let success = passcodeScreen === 3 ? true : false;

  useEffect(() => {
    if (passcodeInput.current) {
      passcodeInput.current.focus();
    }

    setPasscodeLength(0);
    setOkay(false);
    setPasscodeState("inputting");
  }, [passcodeScreen]);

  function checkPasscode() {
    setPasscodeScreen(1);
  }

  function handlePasscodeChange(e) {
    let eventName = e.target.name;
    console.log(eventName);
    setPasscodeLength(document.getElementById("passcode_input").value.length);

    if (eventName === "enterPasscode") {
      if (passcodeLength >= 5) {
        setPasscodeState("loading");
        e.target.disabled = true;
        e.target?.blur();
        e.currentTarget?.blur();
        setTimeout(() => {
          setPasscodeScreen(1);
        }, 1000);
      }
    } else if (eventName === "inputNewPasscode") {
      if (passcodeLength >= 5) {
        e.target.disabled = true;
        e.target?.blur();
        e.currentTarget?.blur();
        setOkay(true);
      }
    } else if (eventName === "confirmNewPasscode") {
      if (passcodeLength >= 5) {
        e.target.disabled = true;
        e.target?.blur();
        e.currentTarget?.blur();

        setOkay(true);
      }
    }
  }

  function handleClear() {
    setPasscodeLength(0);
    setOkay(false);
    let passcodeInput = document.getElementById("passcode_input");
    passcodeInput.value = "";
    passcodeInput.disabled = false;
    passcodeInput.focus();

    setPasscodeState("inputting");
  }

  function handleOk() {
    let currentPasscode = document.getElementById("passcode_input").value;
    if (passcodeScreen === 2) {
      setPasscodeState("loading");
      if (passcode === currentPasscode) {
        setTimeout(() => {
          setPasscodeScreen(passcodeScreen + 1);
        }, 1000);
      } else {
        setOkay(false);
        setPasscodeState("rejected");
      }
    } else if (passcodeScreen === 1) {
      setPasscode(currentPasscode);
      setPasscodeScreen(passcodeScreen + 1);
      console.log(currentPasscode);
    }
  }

  let inputting = passcodeState === "inputting" ? true : false;
  let loading = passcodeState === "loading" ? true : false;
  let rejected = passcodeState === "rejected" ? true : false;

  let beBlurredClass = okay ? "blurred" : "";

  return (
    <>
      {enterPasscode && (
        <div className="enterPasscode">
          <Header title="Please Enter Passcode" />
          <div>
            <div className="enter--passcode__inputContainer">
              <input
                id="passcode_input"
                type="password"
                className={`input`}
                ref={passcodeInput}
                name="enterPasscode"
                nav-selectable="true"
                onChange={handlePasscodeChange}
              />
              <div className="loader">
                {loading && <DotsLoader />}
                {rejected && <img src="/nin_error.svg" />}
              </div>
            </div>
            <div className="passcode_state">
              {inputting && (
                <div className={`below-label`}>
                  <span className="nin">Passcode should be 6</span>
                  <span>{passcodeLength}/6</span>
                </div>
              )}
              {loading && (
                <div className={`below-label-loading`}>Verifying...</div>
              )}

              {rejected && (
                <div className={`below-label-err`}>
                  Your Passcode is incorrect
                </div>
              )}
            </div>
          </div>
          <Softkey left="Back" onKeyLeft={() => findScreen("home")} />
        </div>
      )}
      {inputNewPasscode && (
        <div className="inputNewPasscode">
          <Header title="Input New Passcode" />
          <div>
            <div className="enter--passcode__inputContainer">
              <input
                id="passcode_input"
                type="password"
                className={`input ${beBlurredClass}`}
                name="inputNewPasscode"
                ref={passcodeInput}
                nav-selectable="true"
                onChange={handlePasscodeChange}
              />
            </div>
            <div className="passcode_state">
              {inputting && (
                <div className={`below-label`}>
                  <span className="nin">Passcode should be 6</span>
                  <span>{passcodeLength}/6</span>
                </div>
              )}
              {loading && (
                <div className={`below-label-loading`}>Verifying...</div>
              )}

              {rejected && (
                <div className={`below-label-err`}>
                  Your Passcode is incorrect
                </div>
              )}
            </div>
          </div>
          {okay && (
            <Softkey
              left="Clear"
              right={"Ok"}
              onKeyLeft={handleClear}
              onKeyRight={handleOk}
            />
          )}
          {!okay && <Softkey left="Clear" onKeyLeft={handleClear} />}
        </div>
      )}
      {confirmNewPasscode && (
        <div className="confirmNewPasscode">
          <Header title="Confirm New Passcode" />
          <div>
            <div className="enter--passcode__inputContainer">
              <input
                id="passcode_input"
                type="password"
                name="confirmNewPasscode"
                className={`input ${beBlurredClass}`}
                ref={passcodeInput}
                nav-selectable="true"
                onChange={handlePasscodeChange}
              />
              <div className="loader">
                {loading && <DotsLoader />}
                {/* {rejected && <img src="/nin_error.svg" />} */}
              </div>
            </div>
            <div className="passcode_state">
              {inputting && (
                <div className={`below-label`}>
                  <span className="nin">Passcodes should match</span>
                  <span>{passcodeLength}/6</span>
                </div>
              )}
              {loading && (
                <div className={`below-label-loading`}>Verifying...</div>
              )}

              {rejected && (
                <div className={`below-label-err`}>Passcodes do not match</div>
              )}
            </div>
          </div>
          {okay && (
            <Softkey
              left="Clear"
              right={"Ok"}
              onKeyLeft={handleClear}
              onKeyRight={handleOk}
            />
          )}
          {!okay && <Softkey left="Clear" onKeyLeft={handleClear} />}
        </div>
      )}
      {success && (
        <div className="successNewPasscode">
          <Header title="Success" />
          <div className="success__container">
            <div>
              <img src="/assets/images/ic_success.svg" />
            </div>
            <div className="info">
              <p className="heading">Success!</p>
              <p className="sub__leading">New passcode saved</p>
            </div>
          </div>
          <Softkey center="Ok" onKeyCenter={() => findScreen("home")} />
        </div>
      )}
    </>
  );
}

export default PasswordSettings;
