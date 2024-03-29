import React from "react";
import logo from "../../../assets/images/logo.png";
import "./NoLoginHeader.scss";

const NoLoginHeader = () => {
  return (
    <div className="no-login-header">
      <img src={logo} alt="icamps-logo" />
    </div>
  );
};

export default NoLoginHeader;
