import React from 'react'
import "./styles.css"
import Header from '../../components/Header/Header'
import SingleTextFooter from '../../components/Footer/Footer'
const Login = () => {
  const onKeyCenter = () => {
    alert("we are here")
  }
  return (
  <div className="mainLoginContainer">
    <Header HeaderText={"Log In To Sachet"}/>
    <div className="loginContainer">
        <div className="topContainer">
            <p className="texts">Phone Number</p>
            <input className='inputs' type="text" nav-selectable="true" />
        </div>
        <div className="bottomContainer">
        <p className="texts">Password</p>
            <input className='inputs' type="password" required nav-selectable="true" />
        </div>
    </div>
    <SingleTextFooter FooterCenterText={"Log In"} onKeyCenter={onKeyCenter}/>
  </div>
  )
}

export default Login