/* eslint-disable linebreak-style */
import { useState } from "react";
import { allScreen, registeredUserScreens, errorScreens } from "./screens";
import Header from "./components/header";

function App() {
  const [screen, setScreen] = useState(0);
  const [screenChoice, setScreenChoice] = useState(allScreen);

  let softkeyCalls = {
    next: () => setScreen((screen) => screen + 1),
    back: () => setScreen((screen) => screen - 1),
    login: () => {
      setScreen(1);
      setScreenChoice(registeredUserScreens);
    },
    findScreen: (screenName) => {
      const screenIndex = screenChoice.findIndex(
        (screen) => screen?.name === screenName
      );
      setScreen(screenIndex);
    },
    goLogin: () => {
      setScreen(allScreen.length - 1);
      setScreenChoice(allScreen);
    },
    goServerError: () => {
      setScreen(1);
      setScreenChoice(errorScreens);
    },
    goUserNotFound: () => {
      setScreen(0);
      setScreenChoice(errorScreens);
    },
  };

  return (
    <div className="App">
      {/* HEADER */}
      {screenChoice[screen]?.header && (
        <Header title={screenChoice[screen].header} />
      )}
      {/* BODY */}
      <main className="main">
        {screenChoice[screen]?.component(softkeyCalls)}
      </main>
    </div>
  );
}

export default App;
