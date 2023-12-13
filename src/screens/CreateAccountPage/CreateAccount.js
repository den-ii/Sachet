import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/header/Header";
import Nimc from "../../assets/images/Nimc.png";
import "./styles.css";
import { useNavigate } from "react-router-dom";
const CreateAccount = () => {
  const navigate = useNavigate();

  const onKeyCenter = () => {
    navigate("/verify");
  };
  return (
    <div className="createAccountContainer">
      <Header HeaderText={"Create Account"} />
      <div className="subContainer">
        <div className="imgContainer">
          <img src={Nimc} />
        </div>

        <div className="inputContainer">
          <div className="topText">Please input your NIN</div>
          <div className="subInputContainer">
            <input type="text" nav-selectable="true" />
            <div className="bottomText">Your NIN has 11 digits</div>
          </div>
        </div>
      </div>
      <Footer FooterRightText={"Next"} onKeyCenter={onKeyCenter} />
    </div>
  );
};

export default CreateAccount;
