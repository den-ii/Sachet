import React, { useEffect } from "react";
import "./Footer.css"
// import useEffect from "react";
const Footer = ({ 
  FooterLeftText, 
  FooterCenterText, 
  FooterRightText, 
  onKeyLeft,
  onKeyCenter,
  onKeyRight }) => {

    // useEffect(() => {
    //   document.addEventListener("keydown", handleKeyDown);
  
    //   return () => document.removeEventListener("keydown", handleKeyDown);
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
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

    <div className="languageFooter">

      <label className='lang'>{FooterLeftText}</label>
      <label className='lang'>{FooterCenterText}</label>
      <label className='lang'>{FooterRightText}</label>
    </div>
  )
}

export default Footer
