import React from 'react'
import Header from '../../components/Header/Header'
import SingleTextFooter from '../../components/SingleTextFooter/Footer'
import "./styles.css"
import successIcon from '../../assets/images/successIcon.png';
const PasswordSuccess = () => {
  return (
 <div className="mainPasswordSuccessContainer">
    <Header HeaderText={"Success"}/>
    <div className="passwordSuccessContainer">
        <img className='successImage' src={successIcon} alt="" />
        <div className="successText">
            <div className="mainSuccessText">Well done!</div>
            <div className="subSuccessText">Your password has been set</div>
        </div>
    </div>
    <SingleTextFooter Text={"Continue To Sachet"}/>
 </div>
  )
}

export default PasswordSuccess