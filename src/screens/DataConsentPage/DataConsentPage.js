import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import "./styles.css"
import {useNavigate} from "react-router-dom"
const DataConsentPage = () => {

  const navigate = useNavigate()
  // handle key center
  const onKeyCenter = () =>{
  navigate('/agree')
  }
  return (
    <div className="consentMainContainer">
      <Header HeaderText={"Data Consent Agreement"} />
      
      {/* Add a container for the scrollable text */}
      <div className="scrollableTextContainer">
        <p className='consent'>
          Data Submission Consent: I, the undersigned user, hereby give my explicit consent to submit the following personal data to [Your Company Name]:
          <br />
          Full Name
          <br />
          Email Address
          <br />
          Phone Number (if provided)
          <br />
          Any other data voluntarily submitted
        </p>

        <p className='consent'>
          Data Usage for Identification: I understand that the data I provide will be used solely for the purpose of identification. This data will help [Your Company Name] to establish and verify my identity for the purpose of accessing and using its services.
        </p>

        <p className='consent'>
          Data Protection and Privacy: I acknowledge that my data will be treated in accordance with the [Your Company Name] privacy policy. My data will not be shared with third parties for marketing purposes without my explicit consent.
        </p>

        <p className='consent'>
          Right to Withdraw Consent: I understand that I have the right to withdraw my consent at any time by contacting [Your Company Contact Information]. Withdrawal of consent will result in the deletion of my data.
        </p>
      </div>

      <Footer FooterRightText={"Next"} onKeyCenter={onKeyCenter} />
    </div>
  );
};

export default DataConsentPage;
