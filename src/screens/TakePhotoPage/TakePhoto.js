import React from 'react'
import "./styles.css"
import doyle from '../../assets/images/doyle.png';
import doyleblur from '../../assets/images/doyle-blur.png';
import Header from '../../components/Header/Header'
import SingleTextFooter from '../../components/SingleTextFooter/Footer'
import {useNavigate} from "react-router-dom"
const TakePhoto = () => {
    const navigate = useNavigate()


    const onKeyCenter = () =>{
      navigate('/confirmpic')
      }
   
  return (
 <div className="mainTakeContainerr">
    <div className="takeContainerr">
    <div className="blurContainerr">
        <img className="blurImagee" src={doyleblur} alt="" />
    </div>
<div className="clearContainerr">
    <img className='clearImagee' src={doyle} alt="" />
    <div className="imgTextt">Please position your face within the frame.</div>
</div>
</div>
<SingleTextFooter Text={"Take Photo"} onKeyCenter={onKeyCenter}/>
 </div>
  )
}

export default TakePhoto