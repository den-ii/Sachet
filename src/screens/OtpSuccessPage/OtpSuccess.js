import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/header/Header";
import SingleTextFooter from "../../components/SingleTextFooter/Footer";
import "./styles.css";
import successIcon from "../../assets/images/successIcon.png";
import { useNavigate } from "react-router-dom";
const OtpSuccess = () => {
  const navigate = useNavigate();
  // handle key center
  const onKeyCenter = () => {
    navigate("/setuppassword");
  };
  return (
    <div className="mainOtpSuccessContainer">
      <Header HeaderText={"Success"} />
      <div className="otpSuccessContainer">
        <div className="topSection">
          <img className="otpSuccessImage" src={successIcon} alt="" />
          <div className="topText">Your account has been verified</div>
        </div>
        <div className="bottomSection">
          <div className="textInfo">Your new phone number:</div>
          <div className="phoneNumber">0905 987 4509</div>
        </div>
      </div>
      <SingleTextFooter Text={"Set Up Password"} />
    </div>
  );
};

export default OtpSuccess;
