import React, { useEffect } from "react";
import "./styles.css";

function Softkey({ left, onKeyLeft, center, onKeyCenter, right, onKeyRight }) {
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleKeyDown = (evt) => {
    switch (evt.key) {
      case "SoftLeft":
        return onKeyLeft && onKeyLeft(evt);
      case "Enter":
        return onKeyCenter && onKeyCenter(evt);
      case "SoftRight":
        return onKeyRight && console.log("yh");
      default:
        return;
    }
  };

  return (
    <div id="softkey">
      <label className="left">{left}</label>
      <label className="center">{center}</label>
      <label className="right">{right}</label>
    </div>
  );
}

export default Softkey;
