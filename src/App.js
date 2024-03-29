/* eslint-disable linebreak-style */
import { useState } from "react";
import { allScreen, registeredUserScreens } from "./screens";
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
      console.log(screenName);
      const screenIndex = screenChoice.findIndex(
        (screen) => screen?.name === screenName
      );
      console.log(screenIndex);
      setScreen(screenIndex);
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
