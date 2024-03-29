import React from "react";
import { Radio } from "@mui/material";

// Constant
import { SEVERITY_LEVEL } from "../../../../../common/global.constant";

const SeverityLevel = ({ createNews, handleChangeCheckbox }) => {
  const controlProps = (item) => ({
    checked: createNews.severityLevel === item,
    onChange: handleChangeCheckbox,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  return (
    <div>
      <div className="main-title-Label">
        <label>Security level</label>
      </div>
      <div className="multi-button-wrapper">
        <div
          className={`common-radio-button ${
            createNews.severity === SEVERITY_LEVEL.CRITICAL
              ? "radio-button-red"
              : ""
          }`}
        >
          <Radio
            {...controlProps(SEVERITY_LEVEL.CRITICAL)}
            size="small"
            sx={{
              paddingTop: "9px",
              color: "#FF5F69",
              "&.Mui-checked": {
                color: "#FF5F69",
              },
            }}
            checked={createNews.severity === SEVERITY_LEVEL.CRITICAL}
          />
          <span className="button-text">Critical</span>
        </div>
        <div
          className={`common-radio-button ${
            createNews.severity === SEVERITY_LEVEL.MAJOR
              ? "radio-button-orange"
              : ""
          }`}
        >
          <Radio
            {...controlProps(SEVERITY_LEVEL.MAJOR)}
            size="small"
            sx={{
              paddingTop: "9px",
              color: "#FF9D2C",
              "&.Mui-checked": {
                color: "#FF9D2C",
              },
            }}
            checked={createNews.severity === SEVERITY_LEVEL.MAJOR}
          />
          <span className="button-text">Major</span>
        </div>
        <div
          className={`common-radio-button ${
            createNews.severity === SEVERITY_LEVEL.MODERATE
              ? "radio-button-blue"
              : ""
          }`}
        >
          <Radio
            {...controlProps(SEVERITY_LEVEL.MODERATE)}
            size="small"
            sx={{
              paddingTop: "9px",
              color: "#3A6BEA",
              "&.Mui-checked": {
                color: "#3A6BEA",
              },
            }}
            checked={createNews.severity === SEVERITY_LEVEL.MODERATE}
          />
          <span className="button-text">Moderate</span>
        </div>
        <div
          className={`common-radio-button ${
            createNews.severity === SEVERITY_LEVEL.LOW
              ? "radio-button-green"
              : ""
          }`}
        >
          <Radio
            {...controlProps(SEVERITY_LEVEL.LOW)}
            size="small"
            sx={{
              paddingTop: "9px",
              color: "#2AD064",
              "&.Mui-checked": {
                color: "#2AD064",
              },
            }}
            checked={
              createNews.severity
                ? createNews.severity === SEVERITY_LEVEL.LOW
                : SEVERITY_LEVEL.LOW
            }
          />
          <span className="button-text">Low</span>
        </div>
      </div>
    </div>
  );
};

export default SeverityLevel;
