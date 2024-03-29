import React from "react";
import { Page403img } from "../../assets/images";
import "../../App.scss";
import "./Page403.scss";
const Page403 = () => {
  return (
    <div className="error-page-wrapper">
      <div className="error-page-container">
        <img className="image-align" src={Page403img} alt="403-error" />
        <label className="error-type">Error 403</label>
        <label className="error-sub-heading">Do not have permission</label>
        <span className="error-description">
          We are sorry, you don’t have permission to access this page. Connect
          with Administrator.
        </span>
      </div>
    </div>
  );
};

export default Page403;
