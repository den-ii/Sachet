import React from 'react'
import "./styles.css"
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import doyle from '../../assets/images/doyle.png';

const ConfirmPicture = () => {
  return (
   <div className="mainConfirmContainer">
    <Header HeaderText={"Confirm Picture"}/>
    <div className="confirmContainer">
        
            <img className='confirmImage' src={doyle} alt="" />
       
        <p className="informationText">Make sure your face is not blur or out of frame before continuing</p>
    </div>
    <Footer FooterLeftText={"Retake Photo"} FooterRightText={"Verify"}/>
   </div>
  )
}

export default ConfirmPicture