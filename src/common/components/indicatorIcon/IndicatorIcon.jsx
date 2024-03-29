import React from "react";
import "./IndicatorIcon.scss";
import CircleIcon from "@mui/icons-material/Circle";

const IndicatorIcon = ({ title, count, className }) => {
  return (
    <div className={`indicator-icon ${className}`}>
      <CircleIcon fontSize="inherit" className={className} />
      {title}-<strong>{count}</strong>
    </div>
  );
};

export default IndicatorIcon;
