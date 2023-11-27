import React from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import SingleTextFooter from '../../components/SingleTextFooter/Footer'
import "./styles.css"
import successIcon from '../../assets/images/successIcon.png';
const OtpSuccess = () => {
  return (
   <div className="mainOtpSuccessContainer">
    <Header HeaderText={"Success"}/>
    <div className="otpSuccessContainer">
        <div className="topSection">
            <img  className='otpSuccessImage' src={successIcon} alt="" />
            <div className="topText">Your account has been verified</div>
        </div>
        <div className="bottomSection">
            <div className="textInfo">Your new phone number:</div>
            <div className="phoneNumber">0905 987 4509</div>
        </div>
    </div>
    <SingleTextFooter Text={"Set Up Password"}/>
   </div>
  )
}

export default OtpSuccess