import Softkey from "../../components/softkey";
import "./styles.css";

function ConfirmAgreement({next, back}){
  
  return (
    <>
      <div className="confirm_agreement">
        By clicking "OK" and submitting my data, I confirm that I have read and understood the terms of
        this agreement and consent to the submission and use of my data as outlined above.
      </div>
      <Softkey right='Ok' onKeyRight={next} left='Back' onKeyLeft={back}/>
    </>
  );
};

export default ConfirmAgreement;
