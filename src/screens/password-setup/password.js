import { useState, useEffect, useRef } from "react";
import Header from "../../components/header";
import Softkey from "../../components/softkey";
import "./styles.css";
import { Backend } from "../../BackendConfig";
import { decrypt, encrypt } from "../../encryption";
import PopUpLoader from "../../components/popup-loader";
import onlyDigits from "../../utility";
import { userDetails } from "../../constants";

function PasswordSetup({
  next,
  login,
  findScreen,
  goUserNotFound,
  goServerError,
}) {
  const [passcodeState, setPasscodeState] =
    useState("inputting"); /* inputting || done*/
  const [cpasscodeState, setCpasscodeState] = useState("inputting");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passcodeLength, setPasscodeLength] = useState(0);
  const [cpasscodeLength, setCpasscodeLength] = useState(0);
  const [showSelect, setShowSelect] = useState(false);
  const [nextHandler, setNextHandler] = useState(false);
  const passcodeInputRef = useRef(null);
  const cpasscodeInputRef = useRef(null);

  useEffect(() => {
    const passcodeInput = passcodeInputRef.current;
    const cpasscodeInput = cpasscodeInputRef.current;
    if (!passcodeInput) return;
    if (passcodeState === "inputting") {
      passcodeInput.disabled = false;
      passcodeInput.value = "";
      cpasscodeInput.value = "";
      passcodeInput.focus();
      setNextHandler(false);
    }
  }, [passcodeState, cpasscodeState]);

  function handleNext(state) {
    console.log("called");
    if (state === "passcode") {
      setPasscodeState("done");
      if (!passcodeInputRef.current) return;
      passcodeInputRef.current.disabled = true;
      return;
    } else if (state === "cpasscode") {
      setCpasscodeState("done");
      if (!passcodeInputRef.current) return;
      cpasscodeInputRef.current.disabled = true;
    }
  }

  function handlePasscode(e) {
    onlyDigits(e);
    const length = e.target.value.length;
    setPasscodeLength(length);
    if (length >= 6) {
      e.currentTarget?.blur();
      const cpasscodeInput = cpasscodeInputRef.current;
      if (!cpasscodeInput) return;
      if (cpasscodeInput.value.length >= 6) {
        setNextHandler(true);
      }
      cpasscodeInput.focus();
    } else {
      setNextHandler(false);
    }
  }

  function handleCPasscode(e) {
    onlyDigits(e);
    const length = e.target.value.length;
    setCpasscodeLength(length);
    if (e.target.value.length >= 6) {
      e.currentTarget?.blur();
      const same = e.target.value == passcodeInputRef.current.value;
      if (passcodeInputRef?.current.value.length >= 6 && same) {
        setNextHandler(true);
      } else if (!same) {
        setErrorMessage("Passcodes do not match");
        setError(true);
        if (cpasscodeInputRef.current) {
          cpasscodeInputRef.current.disabled = true;
        }
        if (passcodeInputRef.current) {
          passcodeInputRef.current.disabled = true;
        }
      }
    } else {
      setNextHandler(false);
    }
  }
  const handleUp = (evt) => {
    evt.preventDefault();
    const passcodeInputs = document.querySelectorAll(".passcode-input");
    for (let i = 0; i < passcodeInputs.length; i++) {
      if (passcodeInputs[i].classList.contains("item_active")) {
        passcodeInputs[i].blur();
        passcodeInputs[i].classList.remove("item_active");
        const prevIndex = i === 0 ? passcodeInputs.length - 1 : i - 1;
        passcodeInputs[prevIndex].classList.add("item_active");
        passcodeInputs[prevIndex].focus();
        prevIndex >= 2 ? setShowSelect(true) : setShowSelect(false);
        break;
      }
    }
  };

  const handleDown = (evt) => {
    evt.preventDefault();
    const passcodeInputs = document.querySelectorAll(".passcode-input");
    for (let i = 0; i < passcodeInputs.length; i++) {
      if (passcodeInputs[i].classList.contains("item_active")) {
        passcodeInputs[i].blur();
        passcodeInputs[i].classList.remove("item_active");
        const nextIndex = i === passcodeInputs.length - 1 ? 0 : i + 1;
        passcodeInputs[nextIndex].classList.add("item_active");
        passcodeInputs[nextIndex].focus();
        nextIndex >= 2 ? setShowSelect(true) : setShowSelect(false);
        break;
      }
    }
  };

  const handleKeyDown = (evt) => {
    switch (evt.key) {
      case "ArrowUp":
        return handleUp(evt);
      case "ArrowDown":
        handleDown(evt);
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  function handleReEnter() {
    setPasscodeState("inputting");
    setCpasscodeState("inputting");
    const passcodeInput = passcodeInputRef.current;
    const cpasscodeInput = cpasscodeInputRef.current;
    if (!passcodeInput || !cpasscodeInput) return;
    passcodeInput.disabled = false;
    cpasscodeInput.disabled = false;
    passcodeInput.value = "";
    cpasscodeInput.value = "";
    passcodeInput.focus();
    setCpasscodeLength(0);
    setPasscodeLength(0);
    setError(false);
    setNextHandler(false);
  }

  function handleNextClick() {
    handleNext("passcode");
    handleNext("cpasscode");
  }

  function setUpPassword() {
    const phone = userDetails.phoneNumber;
    const newPassword = passcodeInputRef.current?.value;
    const currentPassword = userDetails.defaultPasscode;

    setError(false);
    setLoading(true);
    if (newPassword.length === passcodeLength) {
      Backend.sachet()
        .createPassword({ phone, newPassword, currentPassword })
        .then((res) => res.json())
        .then((data) => {
          const result = decrypt(JSON.stringify(data.data));
          console.log(result);
          setLoading(false);
          if (!result.status) {
            if (result.data == "Error: Incorrect Current Password") {
              throw new Error("Incorrect current passcode");
            } else {
              throw new Error("Something went wrong");
            }
          } else {
            setS;
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          setErrorMessage(err.message);
          setError(true);
        });
    } else {
      setErrorMessage("Passcode should be 6 digits");
      setError(true);
    }
  }

  const inputting =
    cpasscodeState === "inputting" || passcodeState === "inputting";
  const passcodeDone = passcodeState === "done";
  const cpasscodeDone = cpasscodeState === "done";
  const hasValue = cpasscodeLength > 0 || passcodeLength > 0;
  const selected = showSelect && inputting && !hasValue;

  let clear = hasValue && !selected;
  const selectedClear = showSelect && clear;

  const done = passcodeDone && cpasscodeDone && !loading;
  const doneOnly = done && !showSelect && !error;
  const doneSelected = done && showSelect && !error;
  const nextV = nextHandler && !loading && !selectedClear && !error;
  const nextVSelected = nextHandler && !loading && selectedClear && !error;

  return (
    <>
      <div className="login">
        <Header title="Set Up Passcode" />

        <div>
          <div className="login_inputContainer">
            {loading && (
              <div className="popUpLoading">
                <PopUpLoader text="Setting Up Passcode" />
              </div>
            )}
            <div className="subContainer">
              <p className="leading">Enter your new passcode</p>
              <div style={{ position: "relative" }}>
                <input
                  type="password"
                  id="passcode"
                  className={`passcode-input item_active ${error ? "login-input__error" : ""}`}
                  ref={passcodeInputRef}
                  onChange={handlePasscode}
                />
                <div className="error_sign">
                  {error && <img src="/nin_error.svg" />}
                </div>
              </div>
            </div>
            <div>
              <p className="leading">Confirm your new passcode</p>
              <div style={{ position: "relative" }}>
                <input
                  id="password"
                  type="password"
                  className={`passcode-input ${error ? "login-input__error" : ""}`}
                  nav-selectable="true"
                  onChange={handleCPasscode}
                  ref={cpasscodeInputRef}
                />
                <div className="error_sign">
                  {error && <img src="/nin_error.svg" />}
                </div>
              </div>
            </div>
            {error && <p className="login-error__statement">{errorMessage}</p>}
          </div>
          {/* <div className="forgot-password-button__container">
            {error && (
              <p className="login-error__statement">
                Phone number or password is incorrect!
              </p>
            )}
          </div> */}
        </div>
        {/* {inputting && (
          <Softkey left="Back" onKeyLeft={() => findScreen("index")} />
        )} */}
        {!loading && (
          <div>
            {clear && (
              <Softkey left="Clear" onKeyLeft={() => handleReEnter()} />
            )}
            {selectedClear && (
              <Softkey
                left="Clear"
                onKeyLeft={() => handleReEnter()}
                center={"Select"}
                onKeyCenter={handleSelect}
              />
            )}
            {selected && (
              <Softkey center={"Select"} onKeyCenter={handleSelect} />
            )}

            {nextVSelected && (
              <Softkey
                left="Clear"
                onKeyLeft={() => handleReEnter()}
                center={"Select"}
                onKeyCenter={handleSelect}
                right="Next"
                onKeyRight={handleNextClick}
              />
            )}
            {nextV && (
              <Softkey
                left="Clear"
                onKeyLeft={() => handleReEnter()}
                right="Next"
                onKeyRight={handleNextClick}
              />
            )}
            {doneOnly && (
              <Softkey
                left="Clear"
                onKeyLeft={() => handleReEnter()}
                right="Create"
                onKeyRight={setUpPassword}
              />
            )}
            {doneSelected && (
              <Softkey
                left="Clear"
                onKeyLeft={() => handleReEnter()}
                center={"Select"}
                onKeyCenter={handleSelect}
                right="Create"
                onKeyRight={setUpPassword}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
export default PasswordSetup;
