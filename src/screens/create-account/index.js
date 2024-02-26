import { useState, useRef, useEffect } from "react";
import DotsLoader from "../../components/dots-loader";
import Softkey from "../../components/softkey";
import "./styles.css";
import { Backend } from "../../BackendConfig";
import { decrypt, encrypt } from "../../encryption";

function CreateAccount({ next, back, findScreen }) {
  const [stateTrack, setStateTrack] =
    useState("inputting"); /* inputting || loading || approved || error*/
  const [ninLength, setNinLength] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [showClear, setShowClear] = useState(false);

  const ninInput = useRef(null);

  useEffect(() => {
    // if (localStorage.getItem("ninVerified")) {
    //   findScreen("verify-identity");
    // }

    if (ninInput.current) {
      ninInput.current.focus();
    }
  }, []);

  function handleClear(val) {
    ninInput.current.value = "";
    document.getElementById("text-field").disabled = false;

    setNinLength(0);
    setShowClear(val);
    if (ninInput.current) {
      ninInput.current.focus();
    }
  }

  function reEnter() {
    setStateTrack("inputting");
    handleClear(false);
  }

  function handleDelete() {
    const cursorPosition = textField.selectionStart;
    let deleteValue = document.getElementById("text-field").value;
    let deleteValueOff = deleteValue.split("");
    deleteValueOff.splice(cursorPosition - 1, 1);
    deleteValue = deleteValueOff.join("");
    // ninInput.current.value = deleteValue
  }

  function handleVerification() {
    setStateTrack("loading");
    setDisabled(true);
    Backend.sachet()
      .onboardSachetCustomer({
        nin: ninInput.current?.value,
      })
      .then((res) => res.json())
      .then((data) => {
        const result = decrypt(JSON.stringify(data.data));
        console.log(result);
        if (!result.status) {
          setStateTrack("error");
          // localStorage.setItem("ninVerified", false);
        } else {
          localStorage.setItem(
            "nin",
            encrypt(JSON.stringify({ nin: ninInput.current?.value }))
          );
          // localStorage.setItem("ninVerified", true);
          setStateTrack("approved");
          findScreen("verify-identity");
        }
      })
      .catch((err) => setStateTrack("error"));
  }

  function handleNinChange(event) {
    setNinLength(document.getElementById("text-field").value.length);
    if (stateTrack === "inputting") {
      if (ninInput.current.value?.length >= 11) {
        setStateTrack("loading");
        setDisabled(true);
        handleVerification();
        ninInput.current.blur();
      } else if (ninInput.current.value?.length > 0) {
        setShowClear(true);
      } else {
        setShowClear(false);
      }
    }
  }

  let inputting = stateTrack == "inputting" ? true : false;
  let loading = stateTrack == "loading" ? true : false;
  let approved = stateTrack == "approved" ? true : false;
  let error = stateTrack == "error" ? true : false;

  let inputtingClass = inputting ? "" : "none";
  let loadingClass = loading ? "" : "none";
  let approvedClass = approved ? "" : "none";
  let errorClass = error ? "" : "none";

  let inputClear = inputting && showClear ? true : false;
  let inputBack = inputting && !showClear ? true : false;

  let inputStyle = error ? "err" : loading || approved ? "green" : "";

  return (
    <div>
      <div className="create_account">
        <div className="ninimg">
          <img src="/assets/images/nin.svg" />
        </div>
        <label className="label">Please input your NIN</label>
        <div className="nin_inputContainer">
          <input
            id="text-field"
            type="number"
            className={`input ${inputStyle}`}
            disabled={disabled}
            ref={ninInput}
            nav-selectable="true"
            onChange={handleNinChange}
          />
          <div className="loader">
            {loading && <DotsLoader />}
            {error && <img src="/nin_error.svg" />}
            {approved && <img src="/nin_approved.svg" />}
          </div>
        </div>
        {/* inputting */}
        <div className={`below-label ${inputtingClass}`}>
          <span className="nin">Your NIN has 11 digits</span>
          <span>{ninLength}/11</span>
        </div>
        <div className={`below-label-loading ${loadingClass}`}>
          Verifying...
        </div>
        <div className={`below-label-approved ${approvedClass}`}>
          Your NIN has been verified
        </div>
        <div className={`below-label-err ${errorClass}`}>
          User cannot be registered
        </div>
      </div>

      {/* footer */}
      <div>
        {/* {inputBack && (
          <Softkey left={"Clear"} onKeyLeft={() => handleClear(false)} />
        )} */}
        {inputClear && (
          <Softkey left={"Clear"} onKeyLeft={() => handleClear(false)} />
        )}
        {approved && (
          <Softkey
            // left="Back"
            // onKeyLeft={back}
            right={"Next"}
            onKeyRight={() => findScreen("verify-identity")}
          />
        )}
        {error && (
          <Softkey
            // left="C"
            // onKeyLeft={back}
            right={"Re-Enter"}
            onKeyRight={reEnter}
          />
        )}
      </div>
    </div>
  );
}

export default CreateAccount;
