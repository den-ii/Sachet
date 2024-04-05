import { useState, useEffect, useRef } from "react";
import Header from "../../components/header";
import Softkey from "../../components/softkey";
import "./styles.css";
import { Backend } from "../../BackendConfig";
import { decrypt, encrypt } from "../../encryption";
import PopUpLoader from "../../components/popup-loader";
import onlyDigits from "../../utility";
import { userDetails } from "../../constants";

function LogIn({ next, login, findScreen, goUserNotFound, goServerError }) {
  const [passwordState, setPasswordState] =
    useState("inputting"); /* inputting || done*/
  const [phoneNumberState, setPhoneNumberState] = useState("inputting");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [phoneNumberLength, setPhoneNumberLength] = useState(0);
  const [passwordLength, setPasswordLength] = useState(0);
  const [showSelect, setShowSelect] = useState(false);
  const [nextHandler, setNextHandler] = useState(false);
  const passwordInputRef = useRef(null);
  const phoneNumberInputRef = useRef(null);

  useEffect(() => {
    const phoneNumberInput = phoneNumberInputRef.current;
    const passwordInput = passwordInputRef.current;
    if (!phoneNumberInput) return;
    if (phoneNumberState === "inputting") {
      phoneNumberInput.disabled = false;
      phoneNumberInput.value = "";
      passwordInput.value = "";
      phoneNumberInput.focus();
      setNextHandler(false);
    }
  }, [phoneNumberState, passwordState]);

  function handleNext(state) {
    console.log("called");
    if (state === "phoneNumber") {
      setPhoneNumberState("done");
      if (!phoneNumberInputRef.current) return;
      phoneNumberInputRef.current.disabled = true;
      return;
    } else if (state === "password") {
      setPasswordState("done");
      if (!phoneNumberInputRef.current) return;
      passwordInputRef.current.disabled = true;
    }
  }

  function handlePhoneNumber(e) {
    onlyDigits(e);
    const length = e.target.value.length;
    setPhoneNumberLength(length);
    if (length >= 11) {
      e.currentTarget?.blur();
      const passwordInput = passwordInputRef.current;
      if (!passwordInput) return;
      if (passwordInput.value.length >= 6) {
        setNextHandler(true);
      }
      passwordInput.focus();
    } else {
      setNextHandler(false);
    }
  }

  function handlePassword(e) {
    onlyDigits(e);
    const length = e.target.value.length;
    setPasswordLength(length);
    if (e.target.value.length >= 6) {
      e.currentTarget?.blur();
      if (phoneNumberInputRef?.current.value.length >= 11) {
        setNextHandler(true);
      }
    } else {
      setNextHandler(false);
    }
  }
  const handleUp = (evt) => {
    evt.preventDefault();
    const loginInputs = document.querySelectorAll(".login-input");
    for (let i = 0; i < loginInputs.length; i++) {
      if (loginInputs[i].classList.contains("item_active")) {
        loginInputs[i].blur();
        loginInputs[i].classList.remove("item_active");
        const prevIndex = i === 0 ? loginInputs.length - 1 : i - 1;
        loginInputs[prevIndex].classList.add("item_active");
        loginInputs[prevIndex].focus();
        prevIndex === 2 ? setShowSelect(true) : setShowSelect(false);
        break;
      }
    }
  };

  const handleDown = (evt) => {
    evt.preventDefault();
    const loginInputs = document.querySelectorAll(".login-input");
    for (let i = 0; i < loginInputs.length; i++) {
      if (loginInputs[i].classList.contains("item_active")) {
        loginInputs[i].blur();
        loginInputs[i].classList.remove("item_active");
        const nextIndex = i === loginInputs.length - 1 ? 0 : i + 1;
        loginInputs[nextIndex].classList.add("item_active");
        loginInputs[nextIndex].focus();
        nextIndex === 2 ? setShowSelect(true) : setShowSelect(false);
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
    setPhoneNumberState("inputting");
    setPasswordState("inputting");
    const phoneNumberInput = phoneNumberInputRef.current;
    const passwordInput = passwordInputRef.current;
    if (!phoneNumberInput || !passwordInput) return;
    phoneNumberInput.disabled = false;
    passwordInput.disabled = false;
    phoneNumberInput.value = "";
    passwordInput.value = "";
    phoneNumberInput.focus();
    setPasswordLength(0);
    setPhoneNumberLength(0);
    setError(false);
    setNextHandler(false);
    // if (!phoneNumberInputRef.current || !passwordInputRef.current) return;
    // phoneNumberInputRef.current.disabled = false;
    // passwordInputRef.current.disabled = false;
  }

  function handleNextClick() {
    handleNext("password");
    handleNext("phoneNumber");
  }

  function handleLogin() {
    setLoading(true);
    const phoneNumberInput = document.getElementById("tel").value;

    const passwordInput = document.getElementById("password").value;

    if (!passwordInput) return;
    console.log(document.getElementById("password").value);
    Backend.sachet()
      .login({
        phoneNumber: phoneNumberInput,
        password: passwordInput,
      })
      .then((res) => res.json())
      .then((data) => {
        const result = decrypt(JSON.stringify(data.data));
        console.log(result);
        userDetails.phoneNumber = phoneNumberInput;
        if (!result.status) {
          if (result.data === "Error: Customer not found") {
            setLoading(false);
            goUserNotFound();
          } else {
            throw new Error(result);
          }
        } else {
          localStorage.setItem("jwt", result.data);
          setLoading(false);
          login();
        }
      })
      .catch((err) => {
        console.error("err:", err);
        setLoading(false);
        goServerError();
      });
  }

  const inputting =
    passwordState === "inputting" || phoneNumberState === "inputting";
  const phoneNumberDone = phoneNumberState === "done";
  const passwordDone = passwordState === "done";
  const hasValue = passwordLength > 0 || phoneNumberLength > 0;
  const selected = showSelect && inputting && !hasValue;

  let clear = hasValue && !selected;
  const selectedClear = showSelect && clear;

  const done = phoneNumberDone && passwordDone && !loading;
  const doneOnly = done && !showSelect && !error;
  const doneSelected = done && showSelect && !error;
  const nextV = nextHandler && !loading && !selectedClear && !error;
  const nextVSelected = nextHandler && !loading && selectedClear && !error;

  return (
    <>
      <div className="login">
        <Header title="Log In To Sachet" />

        <div>
          <div className="login_inputContainer">
            {loading && (
              <div className="popUpLoading">
                <PopUpLoader text="Verification in process" />
              </div>
            )}
            <div className="subContainer">
              <p className="leading">Phone Number</p>
              <div style={{ position: "relative" }}>
                <input
                  type="tel"
                  id="tel"
                  className={`login-input item_active ${error ? "login-input__error" : ""}`}
                  ref={phoneNumberInputRef}
                  onChange={handlePhoneNumber}
                />
                <div className="error_sign">
                  {error && <img src="/nin_error.svg" />}
                </div>
              </div>
            </div>
            <div>
              <p className="leading">Passcode</p>
              <div style={{ position: "relative" }}>
                <input
                  id="password"
                  type="password"
                  className={`login-input ${error ? "login-input__error" : ""}`}
                  nav-selectable="true"
                  onChange={handlePassword}
                  ref={passwordInputRef}
                />
                <div className="error_sign">
                  {error && <img src="/nin_error.svg" />}
                </div>
              </div>
            </div>
            {error && (
              <p className="login-error__statement">
                Phone number or password is incorrect!
              </p>
            )}
          </div>
          <div className="login__signup-button__container">
            <div className="signup-button login-input">
              <span>New to Sachet? </span>
              <span className="signup-button__signup">Sign Up</span>
            </div>
          </div>
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
                onKeyCenter={() => findScreen("create-account")}
              />
            )}
            {selected && (
              <Softkey
                center={"Select"}
                onKeyCenter={() => findScreen("create-account")}
              />
            )}

            {nextVSelected && (
              <Softkey
                left="Clear"
                onKeyLeft={() => handleReEnter()}
                center={"Select"}
                onKeyCenter={() => findScreen("create-account")}
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
                right="Log In"
                onKeyRight={handleLogin}
              />
            )}
            {doneSelected && (
              <Softkey
                left="Clear"
                onKeyLeft={() => handleReEnter()}
                center={"Select"}
                onKeyCenter={() => findScreen("create-account")}
                right="Log In"
                onKeyRight={handleLogin}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
export default LogIn;
