import React from 'react'
import Header from '../../components/Header/Header'
import './styles.css'
const Otp = () => {
  return (
    <div className="mainOtpContainer">
        <Header HeaderText={"Enter OTP"}/>
     <div className="otpContainer">
        <div className="text">Please enter the OTP sent to your phone number</div>
        <div className="inputsContainer">
            <input/>
            <input/>
            <input/>
            <input/>
            <input/>
            <input/>
        </div>
     </div>

    </div>
  )
}

export default Otp