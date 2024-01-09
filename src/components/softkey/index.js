
import React, { useEffect } from "react"
import "./styles.css"

function Softkey({ left, onKeyLeft, center, onKeyCenter, right, onKeyRight }) {
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)

    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleKeyDown = (evt) => {
    switch (evt.key) {
    case "SoftLeft":
      return onKeyLeft && onKeyLeft(evt)
    case "Enter":
      return onKeyCenter && onKeyCenter(evt)
    case "SoftRight":
      return onKeyRight && onKeyRight(evt)
    default:
      return
    }
  }

  return (
    <div className="softkey">
      <label className="left" onClick={(e) => onKeyLeft && onKeyLeft(e)}>{left}</label>
      <label className="center" onClick={(e) => onKeyCenter && onKeyCenter(e)}>{center}</label>
      <label className="right" onClick={(e) =>  onKeyRight && onKeyRight(e)}>{right}</label>
    </div>
  )
}

export default Softkey
