import React from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import Nimc from '../../assets/images/Nimc.png';
import "./styles.css"
const CreateAccount = () => {
  return (
    <div className="createAccountContainer">
        <Header HeaderText={"Create Account"}/>
        <div className="subContainer">
            <div className="imgContainer">
            <img src={Nimc}/>
            </div>
            
            <div className="inputContainer">
                <div className="topText">Please input your NIN</div>
                <div className="subInputContainer">
                <input type="text" nav-selectable="true"/>
                <div className="bottomText">Your NIN has 11 digits</div>
                </div>
            </div>
        </div>
        <Footer FooterRightText={"Next"}/>
    </div>
  )
}

export default CreateAccount