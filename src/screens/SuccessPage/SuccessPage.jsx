import React from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import "./styles.css"
import successIcon from '../../assets/images/successIcon.png';
const SuccessPage = () => {
  return (
    <div className='mainSuccessContainer'>
      <Header HeaderText={"Success"}/>
      <div className="s">
      <div className="container">
      <img src={successIcon}/>
      <div className="text">
      <div className="mainText">Well done!</div>
      <div className="subText">Language selection saved</div>
      </div>
      </div>
      </div>
      
      <Footer FooterLeftText={"Back"} FooterRightText={"Next"}/>
    </div>
  )
}

export default SuccessPage