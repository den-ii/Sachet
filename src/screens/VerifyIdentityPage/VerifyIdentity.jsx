import React from 'react'
import Header from '../../components/Header/Header'
import SingleTextFooter from '../../components/SingleTextFooter/Footer'
import Media from '../../assets/images/Media.png';
import './styles.css'
const VerifyIdentity = () => {
  return (
   <div className="verifyMainContainer">
    <Header HeaderText={"Verify Identity"}/>
    <div className="verifyContainer">
        
            <div className="imgContainer">
            <img src={Media} alt="" />
            </div>
      <div className="texts">
        <div className="mainText">Verify identity your identity with a selfie photo</div>
        <div className="subText">Rest assured, your photo will be used solely for verification purposes</div>
       
        </div>  
    </div>
    <SingleTextFooter Text={"Take A Photo"}/>
   </div>
  )
}

export default VerifyIdentity