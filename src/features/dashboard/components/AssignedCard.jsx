import React from "react";
import "./AssigneeCard.scss";
import { Skeleton } from "@mui/material";

function AssigneeCard({ isLoading, title, data }) {
  return (
    <>
      <div className="assignee-card-container">
        <h2 className="title">{title}</h2>
        <div className="digits-container">
          <div className="Inprogress-container">
            <p>
              <strong>In-Progress</strong>
            </p>
            <p className={!isLoading ? "infoDigits" : "infoSkeleton"}>
              {!isLoading ? (
                <strong>{data?.IN_PROGRESS}</strong>
              ) : (
                <Skeleton animation="wave" variant="text" />
              )}
            </p>
          </div>
          <div className="InApproval-container">
            <p>
              <strong>In-Approval</strong>
            </p>
            <p className={!isLoading ? "infoDigits" : "infoSkeleton"}>
              {!isLoading ? (
                <strong>{data?.IN_APPROVAL + data?.REQ_UNPUBLISHED}</strong>
              ) : (
                <Skeleton animation="wave" variant="text" />
              )}{" "}
            </p>
          </div>
          <div className="InAdvice-container">
            <p>
              <strong>In-Advice</strong>
            </p>
            <p className={!isLoading ? "infoDigits" : "infoSkeleton"}>
              {!isLoading ? (
                <strong>
                  {isNaN(data?.ADVICE_A + data?.ADVICE_C)
                    ? ""
                    : data?.ADVICE_A + data?.ADVICE_C}
                </strong>
              ) : (
                <Skeleton animation="wave" variant="text" />
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AssigneeCard;
