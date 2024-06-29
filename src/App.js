/* eslint-disable linebreak-style */
import { useState, useLayoutEffect, useEffect } from "react";
import { allScreen, registeredUserScreens } from "./screens";
import Header from "./components/header";

function App() {
  const [screen, setScreen] = useState(0);
  const [screenChoice, setScreenChoice] = useState(
    localStorage.getItem("jwt") ? registeredUserScreens : allScreen
  );

  const handleKeyDown = (evt) => {
    switch (evt.key) {
      case "Backspace":
        if (screenChoice !== registeredUserScreens) {
          evt.preventDefault();
          evt.stopPropagation();
        }
        return;
      default:
        return;
    }
  };

  useLayoutEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [screen]);

  let softkeyCalls = {
    next: () => setScreen((screen) => screen + 1),
    back: () => setScreen((screen) => screen - 1),
    login: () => {
      setScreen(0);
      setScreenChoice(registeredUserScreens);
    },
    findScreen: (screenName) => {
      const screenIndex = screenChoice.findIndex(
        (screen) => screen?.name === screenName
      );
      setScreen(screenIndex);
    },
    goLogin: () => {
      setScreen(0);
      setScreenChoice(allScreen);
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
