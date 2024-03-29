import React from "react";
import "./DashboardCard.scss";
import { Skeleton } from "@mui/material";

function DashboardCardSkeleton({ title }) {
  return (
    <>
      <div className="card-container">
        <span className="title">{title}</span>
        <div className="inprogress-container">
          <p className="infoHeader">
            <span>In-Progress</span>
          </p>
          <p className="infoDigitss" >
          <Skeleton animation="wave" variant="text" />
          </p>
        </div>
        <div className="inapproval-container">
          <p className="infoHeader">
            <span>In-Approval</span>
          </p>
          <p className="infoDigitss">
          <Skeleton animation="wave" variant="text" />
          </p>
        </div>
        <div className="in-advice">
          <p className="infoHeader">
            <span>In-Advice</span>
          </p>
          <p className="infoDigitss">
          <Skeleton animation="wave" variant="text" />
          </p>
          
        </div>
        <div className="in-advice">
          <p className="infoHeader">
            <span>In-Advice</span>
          </p>
          <p className="infoDigitss">
          <Skeleton animation="wave" variant="text" />
          </p>
          
        </div>
      </div>
    </>
  );
}

export default DashboardCardSkeleton;
