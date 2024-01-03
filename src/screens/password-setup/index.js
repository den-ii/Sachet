import { useEffect, useState } from "react"
import Header from "../../components/header"
import "./styles.css"
import Softkey from "../../components/softkey"

function passwordSetup({next}) {
  const [passwordState, setPasswordState] = useState("inputting")  /* inputting || approved || error*/
  const [length, setLength] = useState(0)
   
  useEffect(() => {
    document.getElementById("passwordInput")?.focus()
  }, [])

  function create(){
    setPasswordState("approved")
  }

  function handlePassword(e){
    setLength(e.target.value.length)
    if (e.target.value.length >= 8){
      e.currentTarget.blur()
    }
  }

  const inputting = passwordState === "inputting"? true: false
  const approved = passwordState === "approved"? true: false

  return (
    <>
      {inputting && <div className="password_setup">
        <Header title="Set Up Password" />
        <div className="password_img">
          <img src="./password.svg" />
        </div>
        <div>
          <div className="password_inputContainer">
            <label className="enter_password">Please enter password</label>
            <input type='text' id='passwordInput' nav-selectable='true' onChange={handlePassword}/>
            <div className="below_label"><p>Password should be 4-8</p><p>{length}/8</p></div>
          </div>
        </div>
        <Softkey left="Cancel" right="Create" onKeyRight={create}/>
      </div>}
      {approved && 
      <div className="password_approved">
        <Header title="Success" />
        <div>
          <img src='./verified.svg'/>
          <p className="heading">Well done!</p>
          <p className="leading">Your password has been set</p>
          
        </div>
        <Softkey center={"Continue to Sachet"} onKeyCenter={next}/>
        
      </div>}
    </>
  )
  
}
export default passwordSetup