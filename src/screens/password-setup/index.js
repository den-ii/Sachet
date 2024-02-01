import { useEffect, useState } from "react";
import { useIdentity } from "../../contexts";
import Header from "../../components/header";
import Softkey from "../../components/softkey";
import { Backend } from "../../BackendConfig";
import { decrypt } from "../../encryption";
import "./styles.css";

function passwordSetup({ next, back }) {
  const { identityNumber } = useIdentity();
  const [passwordState, setPasswordState] =
    useState(
      "inputting"
    ); /* inputting || loading || approved || create || error*/
  const [length, setLength] = useState(0);
  const [showClear, setShowClear] = useState(false);

  useEffect(() => {
    document.getElementById("passwordInput")?.focus();
  }, []);

  function setUpPassword() {
    setPasswordState("loading");
    console.log("id", identityNumber);
    const userId = identityNumber ? identityNumber : "00000000000";
    let password = document.getElementById("passwordInput")?.value;
    if (password.length === 6 || Number(password)) {
      Backend.sachet()
        .createPassword({ userId, password })
        .then((res) => res.json())
        .then((data) => {
          console.log(decrypt(JSON.stringify(data.data)));
          setPasswordState("approved");
        })
        .catch((err) => console.log(err));
    } else {
      setPasswordState("error");
    }
  }

  function handlePassword(e) {
    setLength(e.target.value.length);
    if (e.target.value.length >= 6) {
      setPasswordState("create");
      e.currentTarget.blur();
    } else if (e.target.value.length > 0) {
      setShowClear(true);
    } else {
      setShowClear(false);
    }
  }

  function handleCancel() {
    const passwordInput = document.getElementById("passwordInput");
    passwordInput.value = "";
    setLength(0);
    passwordInput.focus();
    setShowClear(false);
    setPasswordState("inputting");
  }

  const inputting = passwordState === "inputting" ? true : false;
  const approved = passwordState === "approved" ? true : false;
  const create = passwordState === "create" ? true : false;
  const input_create = inputting || create ? true : false;

  const inputCancel = inputting && showClear ? true : false;
  const inputBack = inputting && !showClear ? true : false;

  return (
    <>
      {input_create && (
        <div className="password_setup">
          <Header title="Set Up Passcode" />
          <div className="password_img">
            <img src="./password.svg" />
          </div>
          <div>
            <div className="password_inputContainer">
              <label className="enter_password">Please enter passcode</label>
              <input
                type="password"
                id="passwordInput"
                nav-selectable="true"
                onChange={(e) => handlePassword(e)}
              />
              <div className="loader">
                {loading && <DotsLoader />}
                {error && <img src="/nin_error.svg" />}
              </div>
            </div>
            <div className="below_label">
              <div className="below-label-input">
                <p>Passcode should be 6</p>
                <p>{length}/6</p>
              </div>
              <div className={`below-label-err ${errorClass}`}>
                User cannot be registered
              </div>
            </div>
          </div>
          {inputCancel && <Softkey left="Cancel" onKeyLeft={handleCancel} />}
          {inputBack && <Softkey left="Back" onKeyLeft={back} />}
          {create && (
            <Softkey
              left="Cancel"
              onKeyLeft={handleCancel}
              right="Create"
              onKeyRight={setUpPassword}
            />
          )}
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
