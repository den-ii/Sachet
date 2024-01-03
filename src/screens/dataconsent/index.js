import Softkey from "../../components/softkey"
import "./styles.css"

function DataConsent({next}){
  return (
    <>
      <div className="DataConsent">
        <p>
        Data Submission Consent: I, the undersigned user, hereby give my
        explicit consent to submit the following personal data to [Your Company
        Name]:
        </p>
        <ul>
          <li>Full Name </li>
          <li> Email </li>
          <li> Address</li>
          <li>Phone Number (if provided) </li>
          <li> Any other data voluntarily submitted</li>
        </ul>
        <p>
        Data Usage for Identification: I understand that the data I provide will
        be used solely for the purpose of identification. This data will help
        [Your Company Name] to establish and verify my identity for the purpose
        of accessing and using its services. Data Protection and Privacy: I
        acknowledge that my data will be treated in accordance with the [Your
        Company Name] privacy policy. My data will not be shared with third
        parties for marketing purposes without my explicit consent. Right to
        Withdraw Consent: I understand that I have the right to withdraw my
        consent at any time by contacting [Your Company Contact Information].
        Withdrawal of consent will result in the deletion of my data.
        </p>
      </div>
      <Softkey right='Next' onKeyRight={next}/>
    </>  
  )
};

export default DataConsent
