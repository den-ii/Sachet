import React from 'react'
import "./styles.css"
import { agreement } from '../../laguages'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
const ConfirmAgreement = () => {
  return (
   <div className="mainAgreeContainer">
    <Header HeaderText={"Confirm Agreement"}/>
    <div className="text">
        <p>{agreement}</p>
    </div>
    <Footer FooterLeftText={"Back"} FooterRightText={"Ok"}/>
   </div>
  )
}

export default ConfirmAgreement