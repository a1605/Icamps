import React from "react";
import "./ReqUnPublishedButton.scss";

const ReqUnPublishedButton = ({ clickHandler }) => {
  return (
    <button className="reject-button" onClick={clickHandler}>
      Req UnPublished
    </button>
  );
};

export default ReqUnPublishedButton;
