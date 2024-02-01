import { useState, useRef, useEffect } from "react";
import DotsLoader from "../../components/dots-loader";
import Softkey from "../../components/softkey";
// import { encrypt } from "../../encryption"
import "./styles.css";
import { Backend } from "../../BackendConfig";
import { decrypt } from "../../encryption";
import { useIdentity } from "../../contexts";

function CreateAccount({ next, back }) {
  const [stateTrack, setStateTrack] =
    useState("inputting"); /* inputting || loading || approved || error*/
  const [ninLength, setNinLength] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [showClear, setShowClear] = useState(false);
  const { setIdentityNumber } = useIdentity();

  const ninInput = useRef(null);

  useEffect(() => {
    if (ninInput.current) {
      ninInput.current.focus();
    }
  }, []);

  function reEnter() {
    setStateTrack("inputting");
    ninInput.current.value = "";
    document.getElementById("text-field").disabled = false;
    ninInput.current?.focus();
    setNinLength(0);
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
    const backend = new Backend();
    backend
      .useJsonContent()
      .sachet()
      .onboardSachetCustomer({ nin: ninInput.current?.value })
      .then((res) => res.json())
      .then((data) => {
        const result = decrypt(JSON.stringify(data.data));
        if (!result.status) {
          setStateTrack("error");
          return;
        } else {
          setIdentityNumber(ninInput.current?.value);
          setStateTrack("approved");
        }
      })
      .catch((err) => setStateTrack("error"));
  }

  function handleNinChange(event) {
    setNinLength(document.getElementById("text-field").value.length);
    if (stateTrack === "inputting") {
      if (ninInput.current.value?.length >= 11) {
        setStateTrack("loading");
        handleVerification();
        setDisabled(true);
        ninInput.current.blur();
      } else if (ninInput.current.value?.length > 0) {
        setShowClear(true);
      } else {
        setShowClear(false);
      }
    }
  }

  function handleClear() {
    ninInput.current.value = "";
    setNinLength(0);
    setShowClear(false);
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
        {inputBack && <Softkey left={"Back"} onKeyLeft={back} />}
        {inputClear && <Softkey left={"Clear"} onKeyLeft={handleClear} />}
        {approved && (
          <Softkey
            left="Back"
            onKeyLeft={back}
            right={"Next"}
            onKeyRight={next}
          />
        )}
        {error && (
          <Softkey
            left="Back"
            onKeyLeft={back}
            right={"Re-Enter"}
            onKeyRight={reEnter}
          />
        )}
      </div>
    </div>
  );
}

export default CreateAccount;
