import { useState, useEffect, useRef } from "react";
import Header from "../../components/header";
import Softkey from "../../components/softkey";
import "./styles.css";
import { Backend } from "../../BackendConfig";
import { decrypt, encrypt } from "../../encryption";
import PopUpLoader from "../../components/popup-loader";

function LogIn({ next, login, findScreen }) {
  const [passwordState, setPasswordState] =
    useState("inputting"); /* inputting || done*/
  const [phoneNumberState, setPhoneNumberState] = useState("inputting");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loginIndex, setLoginIndex] = useState(0);
  const [nextHandler, setNextHandler] = useState(false);
  const passwordInputRef = useRef(null);
  const phoneNumberInputRef = useRef(null);

  useEffect(() => {
    const phoneNumberInput = phoneNumberInputRef.current;
    const passwordInput = passwordInputRef.current;
    if (!phoneNumberInput) return;
    if (phoneNumberState === "inputting") {
      phoneNumberInput.value = "";
      passwordInput.value = "";
      phoneNumberInput.focus();
      setNextHandler(false);
    }
  }, [phoneNumberState, passwordState]);

  function handleNext(state) {
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

  function handlePassword(e) {
    if (e.target.value.length >= 6) {
      e.currentTarget?.blur();
      handleNext("password");
      setNextHandler(true);
    }
  }
  const handleUp = (evt) => {
    const loginInputs = document.querySelectorAll(".login-input");
    for (let i = 0; i < loginInputs.length; i++) {
      if (loginInputs[i].classList.contains("item_active")) {
        loginInputs[i].classList.remove("item_active");
        const prevIndex = i === 0 ? loginInputs.length - 1 : i - 1;
        loginInputs[prevIndex].classList.add("item_active");
        loginInputs[prevIndex].focus();
        break;
      }
    }
  };

  const handleDown = (evt) => {
    const loginInputs = document.querySelectorAll(".login-input");
    for (let i = 0; i < loginInputs.length; i++) {
      if (loginInputs[i].classList.contains("item_active")) {
        loginInputs[i].classList.remove("item_active");
        const nextIndex = i === loginInputs.length - 1 ? 0 : i + 1;
        loginInputs[nextIndex].classList.add("item_active");
        loginInputs[nextIndex].focus();
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

  function handlePhoneNumber(e) {
    const value = e.target.value;
    const sanitizedValue = value.replace(/\D/g, ""); // Remove non-digit characters
    e.target.value = sanitizedValue;
    if (e.target.value.length >= 11) {
      e.currentTarget?.blur();
      handleNext("phoneNumber");
      const passwordInput = passwordInputRef.current;
      if (!passwordInput) return;
      passwordInput.focus();
    }
  }

  function handleReEnter() {
    setPhoneNumberState("inputting");
    setPasswordState("inputting");
    if (!phoneNumberInputRef.current || !passwordInputRef.current) return;
    phoneNumberInputRef.current.disabled = false;
    passwordInputRef.current.disabled = false;
  }

  function handleLogin() {
    setLoading(true);
    const passwordInput = passwordInputRef.current;
    if (!passwordInput) return;
    Backend.sachet()
      .login({ phoneNumber, password: passwordInput.value })
      .then((res) => res.json())
      .then((data) => {
        const result = decrypt(JSON.stringify(data.data));
        if (!result.status) {
          throw new Error(result.error);
        }
        localStorage.setItem("jwt", result.data);
        setLoading(false);
        login();
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setError(true);
      });
  }

  const inputting =
    passwordState === "inputting" || phoneNumberState === "inputting";
  const phoneNumberDone = phoneNumberState === "done";
  const passwordDone = passwordState === "done";
  const done = phoneNumberDone && passwordDone && !loading;
  const nextV = nextHandler && !loading;

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
              <input
                type="tel"
                className={`login-input item_active`}
                ref={phoneNumberInputRef}
                onChange={handlePhoneNumber}
              />
            </div>
            <div>
              <p className="leading">Passcode</p>
              <input
                type="password"
                className={`login-input`}
                nav-selectable="true"
                onChange={handlePassword}
                ref={passwordInputRef}
              />
            </div>
          </div>
        </div>
        {inputting && (
          <Softkey left="Back" onKeyLeft={() => findScreen("index")} />
        )}
        {nextV && (
          <Softkey
            left="Back"
            onKeyLeft={() => findScreen("index")}
            right="Next"
            onKeyRight={handleNext}
          />
        )}
        {done && (
          <Softkey
            left="Clear"
            onKeyLeft={() => handleReEnter()}
            right="Log In"
            onKeyRight={handleLogin}
          />
        )}
      </div>
    </>
  );
}
export default LogIn;
