import { useEffect, useState } from "react";
import Header from "../../components/header";
import Softkey from "../../components/softkey";
import "./styles.css";

function PasscodeStatus({ next, findScreen }) {
  return (
    <>
      <div className="success-status">
        <Header title="Success" />
        <div className="container">
          <div className="img_container">
            <img src="/verified.svg" />
          </div>
          <h2 style={{ fontWeight: 700, marginBottom: 6, fontSize: 14 }}>
            Well done!
          </h2>
          <p>Your passcode has been set.</p>
        </div>
        <Softkey
          center="Continue To Sachet"
          onKeyCenter={() => findScreen("login")}
          noLeft={true}
          noRight={true}
        />
      </div>
    </>
  );
}

export default PasscodeStatus;
