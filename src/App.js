/* eslint-disable linebreak-style */
import { useState, useEffect } from "react";

import Splash from "./screens/Splash";
import Header from "./components/header";
import DataConsent from "./screens/dataconsent/";
import ConfirmAgreement from "./screens/confirm-agreement";
import CreateAccount from "./screens/create-account";
import VerifyIdentity from "./screens/verify-identity";
import Otp from "./screens/otp";
import PasswordSetup from "./screens/password-setup";
import LogIn from "./screens/login";

const screens = [
  {
    component: (softkeyCalls) => <Splash />,
  },
  {
    header: "Data Consent Agreement",
    component: (softkeyCalls) => <DataConsent next={softkeyCalls.next}/>,
   
  },
  {
    header: "Confirm Agreement",
    component: (softkeyCalls) => <ConfirmAgreement next={softkeyCalls.next} back={softkeyCalls.back}/>,
    
  },
  {
    header: "Create Account",
    component: (softkeyCalls) => <CreateAccount next={softkeyCalls.next} />,
  },
  {
    header: "Verify Identity",
    component: (softkeyCalls) => <VerifyIdentity next={softkeyCalls.next} />,
  },
  // {
  //   header: false,
  //   component: (softkeyCalls) => <TakePhoto next={softkeyCalls.next} />,
  // },
  {
    header: false,
    component: (softkeyCalls) => <Otp next={softkeyCalls.next} />,
  },
  {
    header: false,
    component: (softkeyCalls) => <PasswordSetup next={softkeyCalls.next} />,
  },
  {
    header: false,
    component: (softkeyCalls) => <LogIn next={softkeyCalls.next} />,
  },
  
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
  }, []);

  let softkeyCalls = {
    next: () => setScreen((screen) => screen + 1),
    back: () => setScreen((screen) => screen - 1),
  };

  return (
    <div className="App">
      {/* HEADER */}
      {screens[screen].header && <Header title={screens[screen].header} />}
      {/* BODY */}
      <main className="main">{screens[screen].component(softkeyCalls)}</main>
      {/* SOFTKEY */}
    </div>
  );
}

export default App;
