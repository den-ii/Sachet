import { useState, useEffect } from "react";
import Header from "../../components/header";
import Softkey from "../../components/softkey";
import "./styles.css";

function passwordSetup({ next, login }) {
  const [passwordState, setPasswordState] =
    useState("inputting"); /* inputting || done*/

  useEffect(() => {
    document.getElementById("passwordInput")?.focus();
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

  function handleLogin() {}

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
              />
            </div>
          </div>
        </div>
        {inputting && <Softkey center="Next" onKeyCenter={handleNext} />}
        {done && <Softkey center="Log In" onKeyCenter={login} />}
      </div>
    </>
  );
}
export default passwordSetup;
