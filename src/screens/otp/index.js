import { useEffect, useState } from "react"
import Header from "../../components/header"
import Softkey from "../../components/softkey"
import "./styles.css"

function Otp ({next}) {
  // handle key center
  const [otpInputs, setOtpInputs] = useState(Array(6).fill(""))
  const [validationState, setValidationState] = useState("inputting") /* inputting || validated */
  const [validationSubState, setValidationSubState] = useState("loading") /*inputting || loading || validated || error*/

  useEffect(() => {
    document.getElementById("otp_box0")?.focus()
  }, [])

  function handleOtp(e, index) {
    const otpValue = Number(e.key)
    console.log(e.key)
    if (otpValue >= 0 && otpValue <= 9){
      const presentOtpInput = otpInputs.slice()
      if (presentOtpInput[index] === ""){
        presentOtpInput[index] = e.key
      }
      else if (index+1 <=5){
        presentOtpInput[index+1] = e.key

      }
      setOtpInputs(presentOtpInput)
      if (index < 5){
        index = index+1
      }
      else{
        setValidationState("validated")
      }
      document.getElementById(`otp_box${index}`)?.focus()    
    }
    else if (e.key === "Backspace" || e.key === "clear" ){
      const presentOtpInput = otpInputs.slice()
      presentOtpInput[index] = ""
      setOtpInputs(presentOtpInput)
      index = index > 0 ? index-1 : index
      document.getElementById(`otp_box${index}`)?.focus()    
    }
  }


  return (
    <>
      {/* Enter OTP */}
      { validationState === "inputting" &&
        (<div>
          <Header title="Enter OTP" />
          <div className="otpContainer">
            <p className="heading">Please enter the OTP sent to your phone number</p>
            <div className="otpInputContainer">
              {otpInputs.map((otpInput, index) =>  (
                <input id={`otp_box${index}`} key={index} className='otp_box' value={otpInputs[index]} type="number"  max={9} onKeyDown={(e) => handleOtp(e, index)}/> 
              
              ))}

            </div>

          </div>
        
        </div>)
      }
      {
        validationState === "validated" && (
          <div>
            <Header title="Success" />
            <div className="otpContainer">
              <div className="success_heading">
                <div className="img_container"><img src='/verified.svg'/></div>
                <p>Your account has been verified</p>
              </div>
              <div className="otpPhoneContainer">
                <p className="leading">Your New Phone Number:</p>
                <p className="number">0905 987 4509</p>
              </div>
            </div>
            <Softkey center="Set Up Password" onKeyCenter={next} />
          </div>
        )
      }
      
  
    </>
  )
}

export default Otp
