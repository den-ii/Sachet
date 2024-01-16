import { useEffect, useState } from "react";
import Header from "../../components/header";
import "./styles.css";
import Softkey from "../../components/softkey";

function passwordSetup({ next }) {
  const [passwordState, setPasswordState] =
    useState("inputting"); /* inputting || approved || error*/
  const [length, setLength] = useState(0);

  useEffect(() => {
    document.getElementById("passwordInput")?.focus();
  }, []);

  function create() {
    setPasswordState("approved");
  }

  function handlePassword(e) {
    setLength(e.target.value.length);
    if (e.target.value.length >= 6) {
      e.currentTarget.blur();
    }
  }

  function handleCancel() {
    const passwordInput = document.getElementById("passwordInput");
    passwordInput.value = "";
    passwordInput.focus();
  }

  const inputting = passwordState === "inputting" ? true : false;
  const approved = passwordState === "approved" ? true : false;

  return (
    <>
      {inputting && (
        <div className="password_setup">
          <Header title="Set Up Passcode" />
          <div className="password_img">
            <img src="./password.svg" />
          </div>
          <div>
            <div className="password_inputContainer">
              <label className="enter_password">Please enter passcode</label>
              <input
                type="number"
                id="passwordInput"
                nav-selectable="true"
                onChange={handlePassword}
              />
              <div className="below_label">
                <p>Passcode should be 6</p>
                <p>{length}/6</p>
              </div>
            </div>
          </div>
          <Softkey
            left="Cancel"
            onKeyLeft={handleCancel}
            right="Create"
            onKeyRight={create}
          />
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
          <Softkey center={"Continue to Sachet"} onKeyCenter={next} />
        </div>
      )}
    </>
  );
}
export default passwordSetup;
