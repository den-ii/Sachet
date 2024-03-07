import React, { useEffect } from "react";
import "./styles.css";

function Softkey({
  left,
  onKeyLeft,
  center,
  onKeyCenter,
  right,
  onKeyRight,
  noCenter,
  noLeft,
  noRight,
}) {
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
        return onKeyRight && onKeyRight(evt);
      default:
        return;
    }
  };

  return (
    <div className="softkey">
      {!noLeft && (
        <label className="left" onClick={(e) => onKeyLeft && onKeyLeft(e)}>
          {left}
        </label>
      )}
      {!noCenter && (
        <label
          className="center"
          onClick={(e) => onKeyCenter && onKeyCenter(e)}
        >
          {center}
        </label>
      )}
      {!noRight && (
        <label className="right" onClick={(e) => onKeyRight && onKeyRight(e)}>
          {right}
        </label>
      )}
    </div>
  );
}

export default Softkey;
