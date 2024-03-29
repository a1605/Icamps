import React from "react";
import "./DashboardCard.scss";

function DashboardCard({ title, inProgress, inApproval, inAdvice, approved }) {
  return (
    <>
      <div className="card-container">
        <span className="title">{title}</span>
        <div className="in-advice">
          <p className="infoHeader">
            <span>Approved / Published</span>
          </p>
          <p className="infoDigits">
            <strong>{approved}</strong>
          </p>
        </div>
        <div className="inprogress-container">
          <p className="infoHeader">
            <span>In-Progress</span>
          </p>
          <p className="infoDigits">
            <strong>{inProgress}</strong>
          </p>
        </div>
        <div className="inapproval-container">
          <p className="infoHeader">
            <span>In-Approval</span>
          </p>
          <p className="infoDigits">
            <strong>{inApproval}</strong>
          </p>
        </div>
        <div className="in-advice">
          <p className="infoHeader">
            <span>In-Advice</span>
          </p>
          <p className="infoDigits">
            <strong>{inAdvice}</strong>
          </p>
        </div>
       
      </div>
    </>
  );
}

export default DashboardCard;
