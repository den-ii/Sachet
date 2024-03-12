import { useEffect } from "react";
import Softkey from "../../components/softkey";
import "./styles.css";

function DataConsent({ next, back }) {
  return (
    <>
      <div className="DataConsent">
        <p>
          <strong>Data Submission Consent:</strong>
          <br />
          I, the undersigned user, hereby give my explicit consent to submit the
          following personal data to Devos Communications Services Limited:{" "}
          <br />
          <ul>
            <li>Full Name </li>
            <li> Email </li>
            <li> Address</li>
            <li>Phone Number (if provided) </li>
            <li> Any other data voluntarily submitted</li>
          </ul>
        </p>
        <p>
          <strong>Data Usage for Identification:</strong>
          <br />
          I understand that the data I provide will be used solely for the
          purpose of identification. This data will help Devos Communications
          Services Limited to establish and verify my identity for the purpose
          of accessing and using its services. <br />
          <br />
        </p>
        <p>
          <strong>Data Protection and Privacy:</strong>
          <br />
          I acknowledge that my data will be treated in accordance with the
          Devos Communications Services Limited privacy policy. My data will not
          be shared with third parties for marketing purposes without my
          explicit consent. <br />
          <br />
        </p>
        <p>
          <strong>Right to Withdraw Consent:</strong>
          <br /> I understand that I have the right to withdraw my consent at
          any time by contacting <strong>08141305904</strong>.<br />
          Withdrawal of consent will result in the deletion of my data.
        </p>
      </div>
      <Softkey left="Back" onKeyLeft={back} right="Next" onKeyRight={next} />
    </>
  );
}

export default DataConsent;
