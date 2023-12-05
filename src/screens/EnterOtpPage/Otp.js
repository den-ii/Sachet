import React from 'react'
import Header from '../../components/Header/Header'
import './styles.css'
import {useNavigate} from "react-router-dom"
const Otp = () => {
  const navigate = useNavigate()
  // handle key center
  const onKeyCenter = () =>{
  navigate('/otpsuccess')
  }
  return (
    <div className="mainOtpContainer">
        <Header HeaderText={"Enter OTP"}/>
     <div className="otpContainer">
        <div className="text">Please enter the OTP sent to your phone number</div>
        <div className="inputsContainer">
            <input className='inputOtp'/>
            <input className='inputOtp'/>
            <input className='inputOtp'/>
            <input className='inputOtp'/>
            <input className='inputOtp'/>
            <input className='inputOtp'/>
        </div>
     </div>

    </div>
  )
}

export default Otp