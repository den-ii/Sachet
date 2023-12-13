import React from "react";
import "./styles.css";
import { agreement } from "../../laguages";
import Header from "../../components/header/Header";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
const ConfirmAgreement = () => {
  const navigate = useNavigate();

  const onKeyCenter = () => {
    navigate("/create");
  };

  return (
    <div className="mainAgreeContainer">
      <Header HeaderText={"Confirm Agreement"} />
      <div className="text">
        <p>{agreement}</p>
      </div>
      <Footer
        FooterLeftText={"Back"}
        FooterRightText={"Ok"}
        onKeyCenter={onKeyCenter}
      />
    </div>
  );
};

export default ConfirmAgreement;
