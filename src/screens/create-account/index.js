import { useState, useRef, useEffect } from "react";
import DotsLoader from "../../components/dots-loader";
import Softkey from "../../components/softkey";
import "./styles.css";
import { Backend } from "../../BackendConfig";
import { decrypt } from "../../encryption";
import { userDetails } from "../../constants";
import onlyDigits from "../../utility";

function CreateAccount({ next, back, findScreen }) {
  const [stateTrack, setStateTrack] =
    useState("inputting"); /* inputting || loading || approved || error*/
  const [ninLength, setNinLength] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [showClear, setShowClear] = useState(false);
  const [select, setSelect] = useState(false);

  const ninInput = useRef(null);

  useEffect(() => {
    // navigator?.mozMobileConnections[0]
    //   ?.getDeviceIdentities()
    //   ?.then((deviceInfo) => {
    //     console.log(deviceInfo.imei);
    //   });

    if (ninInput.current) {
      ninInput.current.focus();
    }
  }, []);

  function handleClear(val) {
    const ninNav = document.querySelectorAll(".nin-nav");
    ninNav[1].classList.remove("item_active");
    ninNav[0].classList.add("item_active");
    if (!ninInput.current) return;

    ninInput.current.value = "";
    ninInput.current.disabled = false;

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

  function handleVerification() {
    setStateTrack("loading");
    setDisabled(true);
    Backend.sachet()
      .onboardSachetCustomer({
        nin: ninInput.current?.value,
      })
      .then((res) => {
        console.log(res.status);
        if (res.status === 409) {
          findScreen("login");
          return;
        }
        return res.json();
      })
      .then((data) => {
        const result = decrypt(JSON.stringify(data.data));
        console.log(result);
        const { kycStatus, retriesLeft, hasCreatedPassword, phoneNumber } =
          result.data;
        let nin;
        if (ninInput.current) nin = ninInput.current.value;
        if (result.status) {
          userDetails.nin = nin;
          setStateTrack("approved");
          if (kycStatus === "notApproved") {
            next();
          } else if (kycStatus === "pending") {
            localStorage.setItem("kycStatus", "pending");
            findScreen("verification-status");
          } else if (kycStatus === "notApproved") {
            localStorage.setItem("kycStatus", "rejected");
            findScreen("verification-status");
          }
        } else {
          if (result.data === "Customer Already Exists!") {
            findScreen("login");
          } else if (
            result.data === "Maximum number of verifications reached."
          ) {
            localStorage.setItem("kycStatus", "limitReached");
            findScreen("verification-status");
          } else throw new Error("an error occurred");
        }
      })
      .catch((err) => {
        if (ninInput.current) ninInput.current.disabled = true;
        setStateTrack("error");
      });
  }

  function handleNinChange(event) {
    let length = event.target.value.length;
    setNinLength(length);
    if (stateTrack === "inputting") {
      if (length >= 11) {
        setStateTrack("loading");
        setDisabled(true);
        handleVerification();
        ninInput.current.blur();
      } else if (length > 0) {
        setShowClear(true);
      } else {
        setShowClear(false);
      }
    }
  }

  const handleSelect = (evt) => {
    evt.preventDefault();
    if (select) {
      findScreen("login");
    }
  };

  const handleUp = (evt) => {
    evt.preventDefault();
    const ninNav = document.querySelectorAll(".nin-nav");
    for (let i = 0; i < ninNav.length; i++) {
      if (ninNav[i].classList.contains("item_active")) {
        ninNav[i].blur();
        ninNav[i].classList.remove("item_active");
        const prevIndex = i === 0 ? ninNav.length - 1 : i - 1;
        ninNav[prevIndex].classList.add("item_active");
        ninNav[prevIndex].focus();
        prevIndex === 1 ? setSelect(true) : setSelect(false);
        break;
      }
    }
  };

  const handleDown = (evt) => {
    evt.preventDefault();
    const ninNav = document.querySelectorAll(".nin-nav");
    for (let i = 0; i < ninNav.length; i++) {
      ninNav[i].blur();
      if (ninNav[i].classList.contains("item_active")) {
        ninNav[i].classList.remove("item_active");
        const nextIndex = i === ninNav.length - 1 ? 0 : i + 1;
        ninNav[nextIndex].classList.add("item_active");
        ninNav[nextIndex].focus();
        nextIndex === 1 ? setSelect(true) : setSelect(false);
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

  function back() {
    localStorage.clear();
    findScreen("register");
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  let inputting = stateTrack == "inputting";
  let loading = stateTrack == "loading";
  let approved = stateTrack == "approved";
  let error = stateTrack == "error";
  let showBack = ninLength === 0;

  let inputtingClass = inputting ? "" : "none";
  let loadingClass = loading ? "" : "none";
  let approvedClass = approved ? "" : "none";
  let errorClass = error ? "" : "none";

  let inputClear = inputting && showClear && !select;
  let inputBack = inputting && !showClear && !select;
  let inputBackSelect = inputting && !showClear && select;
  let selectClear = select && showClear && inputting;
  let errorSelect = error && select;
  let errorOnly = error && !select;

  let inputStyle = error ? "err" : loading || approved ? "green" : "";

  return (
    <div>
      <div className="create_account">
        {/* Version */}
        <div className="create_acount--version">v1.1.3</div>

        {/* ------------------- */}
        <div className="ninimg">
          <img src="/assets/images/nin.svg" />
        </div>
        <label className="label">Please input your NIN</label>
        <div className="nin_inputContainer">
          <input
            id="text-field"
            type="number"
            className={`input nin-nav item_active ${inputStyle}`}
            disabled={disabled}
            ref={ninInput}
            placeholder="Enter NIN"
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
        <div className="login-button__container">
          <div className="login-button nin-nav">
            <span>Already have an account?</span>
            {""}
            <span className="login-button__login"> Log In</span>
          </div>
        </div>
      </div>

      {/* footer */}
      <div>
        {inputBackSelect && (
          <Softkey center={"Select"} onKeyCenter={handleSelect} />
        )}
        {inputClear && (
          <Softkey left={"Clear"} onKeyLeft={() => handleClear(false)} />
        )}
        {selectClear && (
          <Softkey
            left={"Clear"}
            onKeyLeft={() => handleClear}
            center={"Select"}
            onKeyCenter={handleSelect}
          />
        )}
        {approved && <Softkey right={"Next"} onKeyRight={next} />}
        {errorOnly && <Softkey right={"Re-Enter"} onKeyRight={reEnter} />}
        {errorSelect && (
          <Softkey
            center={"Select"}
            right={"Re-Enter"}
            onKeyRight={reEnter}
            onKeyCenter={handleSelect}
          />
        )}
      </div>
    </div>
  );
}

export default CreateAccount;
