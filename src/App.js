/* eslint-disable linebreak-style */
import { useState } from "react";

import Splash from "./screens/Splash";
import Header from "./components/header";
import DataConsent from "./screens/dataconsent/";
import ConfirmAgreement from "./screens/confirm-agreement";
import CreateAccount from "./screens/create-account";
import VerifyIdentity from "./screens/verify-identity";
import TakePhoto from "./screens/take-photo";
//import SmileTakePhoto from "./screens/smile-takephoto";
import Otp from "./screens/otp";
import VerificationStatus from "./screens/verification-status";
import PasswordSetup from "./screens/password-setup";
import LogIn from "./screens/login";
import Home from "./screens/home";
import PasswordSettings from "./screens/password-settings";

const screens = [
  // {
  //   component: ({ next }) => <Splash next={next} />,
  // },
  {
    header: "Data Consent Agreement",
    component: ({ next, findScreen }) => (
      <DataConsent next={next} findScreen={findScreen} />
    ),
  },
  {
    header: "Confirm Agreement",
    component: ({ next, back, findScreen }) => (
      <ConfirmAgreement next={next} back={back} findScreen={findScreen} />
    ),
  },
  {
    name: "create-account",
    header: "Create Account",
    component: ({ next, back }) => <CreateAccount next={next} back={back} />,
  },
  {
    name: "verify-identity",
    header: "Verify Identity",
    component: ({ next, back, findScreen }) => (
      <VerifyIdentity next={next} back={back} findScreen={findScreen} />
    ),
  },
  // {
  //   header: false,
  //   component: ({ next, findScreen }) => (
  //     <SmileTakePhoto next={next} findScreen={findScreen} />
  //   ),
  // },
  {
    header: false,
    component: ({ next }) => <TakePhoto next={next} />,
  },
  {
    name: "verification-status",
    header: false,
    component: ({ next, back, findScreen }) => (
      <VerificationStatus next={next} back={back} findScreen={findScreen} />
    ),
  },
  {
    header: false,
    component: ({ next }) => <Otp next={next} />,
  },
  {
    header: false,
    component: ({ next, back }) => <PasswordSetup next={next} back={back} />,
  },
  {
    header: false,
    component: ({ next, login }) => <LogIn next={next} login={login} />,
  },
];

const registeredUserScreens = [
  {
    component: ({ next }) => <Splash next={next} />,
  },
  {
    name: "home",
    header: "Sachet",
    component: ({ findScreen }) => <Home findScreen={findScreen} />,
  },
  {
    name: "password-settings",
    header: false,
    component: ({ findScreen }) => <PasswordSettings findScreen={findScreen} />,
  },
];

function App() {
  const [screen, setScreen] = useState(0);
  const [screenChoice, setScreenChoice] = useState(screens);
  // let screenChoice = registeredUserScreens

  let softkeyCalls = {
    next: () => setScreen((screen) => screen + 1),
    back: () => setScreen((screen) => screen - 1),
    login: () => {
      setScreen(1);
      setScreenChoice(registeredUserScreens);
    },
    findScreen: (screenName) => {
      const screenIndex = screenChoice.findIndex(
        (screen) => screen.name === screenName
      );
      setScreen(screenIndex);
    },
  };

  return (
    <div className="App">
      {/* HEADER */}
      {screenChoice[screen].header && (
        <Header title={screenChoice[screen].header} />
      )}
      {/* BODY */}
      <main className="main">
        {screenChoice[screen].component(softkeyCalls)}
      </main>
    </div>
  );
}

export default App;
