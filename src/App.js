import { useState, useEffect } from "react";

import Splash from "./screens/Splash/";
import Header from "./components/header";
import DataConsent from "./screens/dataconsent/";
import ConfirmAgreement from "./screens/confirm-agreement";
import Softkey from "./components/softkey";
import CreateAccount from "./screens/create-account";

const screens = [
  {
    component: () => <Splash />,
  },
  {
    header: "Data Consent Agreement",
    component: () => <DataConsent />,
    style: "",
    footer: true,
    rightHand: "Next",
    rightHandCall: "next",
  },
  {
    header: "Confirm Agreement",
    component: () => <ConfirmAgreement />,
    style: "",
    footer: true,
    leftHand: "Back",
    leftHandCall: "back",
    rightHand: "Next",
    rightHandCall: "next",
  },
  {
  header: "Create Account",
  component: () => <CreateAccount />,
  style: "",
  footer: true,
  rightHand: "Next",
  rightHandCall: "next",
  }
];

function App() {
  const [screen, setScreen] = useState(0);

  useEffect(() => {
    if (screen === 0) {
     let timer = setTimeout(() => setScreen(1), 3000);

      return () => {
       clearTimeout(timer);
      };
    }
  });

  let functionCalls = {
    next: () => setScreen((screen) => screen + 1),
    back: () => setScreen((screen) => screen - 1),
  };

  return (
    <div className="App">
      {/* HEADER */}
      {screens[screen].header && <Header title={screens[screen].header} />}
      {/* BODY */}
      <main className="main">{screens[screen].component()}</main>
      {/* SOFTKEY */}
      {screens[screen].footer && (
        <Softkey
          left={screens[screen].leftHand}
          onKeyLeft={functionCalls[screens[screen].leftHandCall]}
          right={screens[screen].rightHand}
          onKeyRight={functionCalls[screens[screen].rightHandCall]}
        />
      )}
    </div>
  );
}

export default App;
