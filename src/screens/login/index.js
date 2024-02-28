import { useState, useEffect, useRef } from "react";
import Header from "../../components/header";
import Softkey from "../../components/softkey";
import "./styles.css";
import { Backend } from "../../BackendConfig";
import { decrypt, encrypt } from "../../encryption";
import PopUpLoader from "../../components/popup-loader";

function LogIn({ next, login, findScreen }) {
  const passwordInputRef = useRef(null);
  const [passwordState, setPasswordState] =
    useState("inputting"); /* inputting || done*/
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [nextHandler, setNextHandler] = useState(false);

  useEffect(() => {
    const encryptedData = localStorage.getItem("phoneNumber");

    if (encryptedData) {
      const decryptedData = decrypt(encryptedData);
      setPhoneNumber(decryptedData.phoneNumber);
    }
  }, []);
  useEffect(() => {
    const passwordInput = passwordInputRef.current;
    if (!passwordInput) return;
    if (passwordState === "inputting") {
      passwordInput.value = "";
      passwordInput.focus();
      setNextHandler(false);
    }
  }, [passwordState]);

  function handleNext() {
    setPasswordState("done");
  }

  function handlePassword(e) {
    if (e.target.value.length >= 6) {
      e.currentTarget?.blur();
      setNextHandler(true);
    }
  }

  function handleReEnter() {
    setPasswordState("inputting");
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

  const inputting = passwordState === "inputting";
  const done = passwordState === "done" && !loading;
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
            left="Back"
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
