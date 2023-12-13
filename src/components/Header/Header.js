import React from "react";
import "./Header.css";

const Header = ({ title }) => {
  return (
    <header className="header">
      <p className="title">{title}</p>
    </header>
  );
};

export default Header;
