import { useState, useRef, useEffect } from "react";
import DotsLoader from "../../components/dots-loader";
import "./styles.css";
import Softkey from "../../components/softkey";

function CreateAccount({next}){
  const [nin, setNin] = useState('')
  const [stateTrack, setStateTrack] = useState('inputting')  /* inputting || loading || approved || error*/
  const [ninLength, setNinLength] = useState(0)
  const [disabled, setDisabled] = useState(false)

  const ninInput = useRef(null)

  useEffect(() => {
    if (ninInput.current){
      ninInput.current.focus()
    }
  }, [])

  function reEnter(){
    setStateTrack('inputting')
    ninInput.current.value = ''

  }

  function handleDelete() {
        const cursorPosition = textField.selectionStart;
        let deleteValue = document.getElementById('text-field').value
        let deleteValueOff = deleteValue.split('')
        deleteValueOff.splice(cursorPosition-1, 1)
        deleteValue = deleteValueOff.join('')
        // ninInput.current.value = deleteValue

    
  }

  function handleNinChange(event){
        const textField = document.getElementById('text-field');
        const cursorPosition = textField.selectionStart;
        let deleteValue = document.getElementById('text-field').value
        let deleteValueOff = deleteValue.split('')
        deleteValueOff.splice(cursorPosition-1, 1)
        deleteValue = deleteValueOff.join('')
        const inputCode = String(event.key).charCodeAt(0)
         if (inputCode >= 65 && inputCode <= 122){
            console.log('yes')
            ninInput.current.value = deleteValue
         }
        setNinLength(ninInput.current?.value.length)
        if (stateTrack === 'inputting') { 
          if (ninInput.current.value?.length >= 11){
                console.log('c', ninInput)
                setStateTrack('loading')
                console.log('verifying')
                setDisabled(true)

          }
        }

 }
 

  let inputting = stateTrack == 'inputting' ? true : false
  let loading = stateTrack == 'loading' ? true : false
  let approved = stateTrack == 'approved' ? true : false
  let error = stateTrack == 'error' ? true : false
  
  let inputtingClass = inputting? '' : 'none'
  let loadingClass = loading? '' : 'none'
  let approvedClass = approved ? '' : 'none'
  let errorClass = error? '' : 'none'
  
  let inputStyle =  error? 'err': loading || approved? 'green': ''



  return (
    <div>
      <div className="create_account">
        <div className='ninimg'><img src='/images/nin.svg'/></div>
        <label className='label'>Please input your NIN</label>
        <div className="nin_inputContainer">
          <input id='text-field' className={`input ${inputStyle}`} disabled={disabled} ref={ninInput} type='text' nav-selectable='true' onKeyUp={handleNinChange}/>
          <div className="loader">
            {loading && <DotsLoader/>}
            {error && <img src='/nin_error.svg'/>}
            {approved && <img src='/nin_approved.svg'/>}


          </div>
        </div>
      {/* inputting */}
      <div className={`below-label ${inputtingClass}`}><span className='nin'>Your NIN has 11 digits</span><span>{ninLength}/11</span></div>
      <div className={`below-label-loading ${loadingClass}`}>Verifying...</div>
      <div className={`below-label-approved ${approvedClass}`}>Your NIN has been verified</div>
      <div className={`below-label-err ${errorClass}`}>Your NIN is incorrect</div>
      </div>

      {/* footer */}
      <div>
      {approved &&
      <Softkey
      right={'Next'}
      onKeyRight={next}
      />}
      {error &&
      <Softkey
      center={'Re-Enter'}
      onKeyCenter={reEnter} 
      />}
      </div>
    </div>
  );
};

export default CreateAccount;
