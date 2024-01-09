/* eslint-disable linebreak-style */
import { useState, useEffect } from "react";

import Splash from "./screens/splash"
import Header from "./components/header"
import DataConsent from "./screens/dataconsent/"
import ConfirmAgreement from "./screens/confirm-agreement"
import CreateAccount from "./screens/create-account"
import VerifyIdentity from "./screens/verify-identity"
import TakePhoto from "./screens/take-photo"
import Otp from "./screens/otp"
import PasswordSetup from "./screens/password-setup"
import LogIn from "./screens/login"
import Home from "./screens/home"


const screens = [
  {
    component: (softkeyCalls) => <Splash next={softkeyCalls.next}/>,
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
  {
    header: false,
    component: (softkeyCalls) => <TakePhoto next={softkeyCalls.next} />,
  },
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
  
]
const registeredUserScreens = [
  {
    component: (softkeyCalls) => <Splash />,
  },
  {
    header: "Sachet",
    component: (softkeyCalls) => <Home />,
  }
]

function App() {
  const [screen, setScreen] = useState(0)
  // let screenChoice = registeredUserScreens
  let screenChoice = screens


  let softkeyCalls = {
    next: () => setScreen((screen) => screen + 1),
    back: () => setScreen((screen) => screen - 1),
  }
 
  return (
    <div className="App">
      {/* HEADER */}
      {screenChoice[screen].header && <Header title={screenChoice[screen].header} />}
      {/* BODY */}
      <main className="main">{screenChoice[screen].component(softkeyCalls)}</main>
    </div>
  );
}

export default App;
