import { useEffect, useState, useRef } from "react";
import Header from "../../components/header";
import Softkey from "../../components/softkey";
import DotsLoader from "../../components/dots-loader";
import "./styles.css";
import onlyDigits from "../../utility";
import { Backend } from "../../BackendConfig";
import { decrypt } from "../../encryption";

function PasswordSettings({ findScreen, back }) {
  const [passcodeScreen, setPasscodeScreen] =
    useState(0); /* 0 || 1 || 2 || 3 */
  const [passcodeLength, setPasscodeLength] = useState(0);
  const [currPasscode, setCurrPasscode] = useState("");
  const [passcode, setPasscode] = useState("");
  const [okay, setOkay] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [passcodeState, setPasscodeState] =
    useState("inputting"); /* inputting || loading || rejected */

  const passcodeInput = useRef(null);

  let enterPasscode = passcodeScreen === 0;
  let inputNewPasscode = passcodeScreen === 1;
  let confirmNewPasscode = passcodeScreen === 2;
  let success = passcodeScreen === 3;

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
    onlyDigits(e);
    let eventName = e.target.name;
    setPasscodeLength(e.target.value.length);

    if (eventName === "enterPasscode") {
      if (passcodeLength >= 5) {
        e.target.disabled = true;
        console.log("yes");
        e.target?.blur();
        e.currentTarget?.blur();
        setOkay(true);
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
    if (passcodeLength === 0) {
      return findScreen("home");
    }
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
      if (passcode === currentPasscode) {
        console.log("curr", currPasscode);
        console.log("passcode", passcode);
        handleChangePasscode();
      } else {
        setOkay(false);
        setErrorMsg("Passcodes do not match");
        setPasscodeState("rejected");
      }
    } else if (passcodeScreen === 0) {
      setCurrPasscode(currentPasscode);
      setPasscodeScreen((passcodeScreen) => passcodeScreen + 1);
      setOkay(false);
    } else if (passcodeScreen === 1) {
      setPasscode(currentPasscode);
      setPasscodeScreen((passcodeScreen) => passcodeScreen + 1);
      setOkay(false);
    }
  }

  function handleChangePasscode() {
    setPasscodeState("loading");
    Backend.sachet()
      .changePassword({
        currentPassword: currPasscode,
        newPassword: passcode,
      })
      .then((res) => res.json())
      .then((data) => {
        const result = decrypt(JSON.stringify(data.data));
        console.log(result);
        if (!result.status) {
          throw new Error("Something went wrong");
        } else setPasscodeScreen((passcodeScreen) => passcodeScreen + 1);
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg("Something went wrong");
        setPasscodeState("rejected");
      });
  }

  let inputting = passcodeState === "inputting";
  let loading = passcodeState === "loading";
  let rejected = passcodeState === "rejected";
  const clearOrBack = passcodeLength === 0 ? "Back" : "Clear";

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
          {!okay && <Softkey left={clearOrBack} onKeyLeft={handleClear} />}
          {okay && (
            <Softkey
              left={clearOrBack}
              right={"Ok"}
              onKeyLeft={handleClear}
              onKeyRight={handleOk}
            />
          )}
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
              left={clearOrBack}
              right={"Ok"}
              onKeyLeft={handleClear}
              onKeyRight={handleOk}
            />
          )}
          {!okay && <Softkey left={clearOrBack} onKeyLeft={handleClear} />}
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

              {rejected && <div className={`below-label-err`}>{errorMsg}</div>}
            </div>
          </div>
          {okay && (
            <Softkey
              left={clearOrBack}
              right={"Ok"}
              onKeyLeft={handleClear}
              onKeyRight={handleOk}
            />
          )}
          {!okay && <Softkey left={clearOrBack} onKeyLeft={handleClear} />}
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
