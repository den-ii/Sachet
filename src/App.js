import { useState, useEffect } from "react";

import Splash from "./screens/splash";
import DataConsent from "./screens/dataconsent/";
import Header from "./components/header/Header";
import Softkey from "./components/softkey";
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
];

function App() {
  const [screen, setScreen] = useState(0);

  useEffect(() => {
    let timer = setTimeout(() => setScreen(1), 3000);

    return () => {
      clearTimeout(timer);
    };
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
      <main>{screens[screen].component()}</main>
      {/* SOFTKEY */}
      {screens[screen].footer && (
        <Softkey
          right={screens[screen].rightHand}
          onKeyRight={functionCalls[screens[screen].rightHandCall]}
        />
      )}
    </div>
  );
}

export default App;
