import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer';
import Lock from '../../assets/images/Lock 2.png';
import "./styles.css"
const SetUpPassword = () => {
  return (
    <div className="mainSetUpContainer">
        <Header HeaderText={"Set Up Password"}/>
        <div className="setUpContainer">
          <div className="imgContainer">
            <img className="lockImg"src={Lock} alt="" />
            </div> 
          <div className="bottomContainer">
            <div className="topText">Please enter password</div>
            <input type="text" name="" id="" nav-selectable="true"/>
            <div className="bottomText">Password should be 4-8</div>
          </div>
        </div>
        <Footer FooterLeftText={"Cancel"} FooterRightText={"Create"}/>
    </div>
  )
}

export default SetUpPassword