import React, { useEffect } from 'react'
import "./SingleTextFooter.css"
import useState from "react";
const SingleTextFooter = ({
  Text,
  onKeyLeft,
  onKeyCenter,
  onKeyRight}) => {
  useEffect(()=>{
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [])
    const handleKeyDown = evt => {
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
    <>
        <div className="languageFooterr">
          
         <p className='lang'>{Text}</p>
       
        </div>
    </>
  )
}

export default SingleTextFooter
