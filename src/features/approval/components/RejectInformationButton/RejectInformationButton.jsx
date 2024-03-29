import React from "react";
import "./RejectInformationButton.scss";

const RejectInformationButton = ({ clickHandler }) => {
  return (
    <button className="reject-button" onClick={clickHandler}>
      Reject with Comment
    </button>
  );
};

export default RejectInformationButton;
