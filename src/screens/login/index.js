import { useState, useEffect, useRef } from "react";
import Header from "../../components/header";
import Softkey from "../../components/softkey";
import "./styles.css";
import { useIdentity } from "../../contexts";
import { Backend } from "../../BackendConfig";
import { decrypt } from "../../encryption";

function passwordSetup({ next, login }) {
  const passwordInputRef = useRef(null);
  const [passwordState, setPasswordState] =
    useState("inputting"); /* inputting || done*/
  const { phoneNumber } = useIdentity();

  useEffect(() => {
    const passwordInput = passwordInputRef.current;
    if (!passwordInput) return;
    passwordInput.focus();
  }, []);

  function handleNext() {
    setPasswordState("done");
  }

  function handlePassword(e) {
    if (e.target.value.length >= 6) {
      e.currentTarget.blur();
      e.currentTarget?.blur();
    }
  }

  function handleLogin() {
    const passwordInput = passwordInputRef.current;
    if (!passwordInput) return;
    Backend.sachet()
      .login({ phoneNumber, password: passwordInput.value })
      .then((res) => res.json())
      .then((data) => {
        const result = decrypt(JSON.stringify(data.data));
        if (!result.status) {
          throw new Error(result.data);
        } else {
          login();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const inputting = passwordState === "inputting" ? true : false;
  const done = passwordState === "done" ? true : false;

  return (
    <>
      <div className="login">
        <Header title="Log In To Sachet" />

        <div>
          <div className="login_inputContainer">
            <div className="subContainer">
              <p className="leading">Phone Number</p>
              <div className="disabled">09059874509</div>
            </div>
            <div>
              <p className="leading">Passcode</p>
              <input
                type="password"
                id="passwordInput"
                className={done ? "disabled" : ""}
                nav-selectable="true"
                disabled={done}
                onChange={handlePassword}
                ref={passwordInputRef}
              />
            </div>
          </div>
        </div>
        {inputting && <Softkey center="Next" onKeyCenter={handleNext} />}
        {done && <Softkey center="Log In" onKeyCenter={handleLogin} />}
      </div>
    </>
  );
}
export default passwordSetup;
