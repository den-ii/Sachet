import React from 'react'
import "./styles.css"
import doyle from '../../assets/images/doyle.png';
import doyleblur from '../../assets/images/doyle-blur.png';
import Header from '../../components/Header/Header'
import SingleTextFooter from '../../components/SingleTextFooter/Footer'

const TakePhoto = () => {
  return (
 <div className="mainTakeContainer">
    <div className="takeContainer">
    <div className="blurContainer">
        <img className="blurImage" src={doyleblur} alt="" />
    </div>
<div className="clearContainer">
    <img className='clearImage' src={doyle} alt="" />
    <div className="imgText">Please position your face within the frame.</div>
</div>
</div>
<SingleTextFooter Text={"Take Photo"}/>
 </div>
  )
}

export default TakePhoto