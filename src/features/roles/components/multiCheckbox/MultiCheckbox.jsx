import React from "react";
import { blue } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import "./MultiCheckbox.scss";
import { useParams } from "react-router-dom";
import { PAGE_TYPE } from "../../../../common/global.constant";
import { PERMISSION_NAME } from "../../roles.constant";

const MultiCheckbox = ({
  title,
  handleSelectedPermissions,
  sectionHeading,
  sectionIdx,
  choices,
  selectedValues,
  givenPermission = [],
}) => {
  const { pageType } = useParams();

  let permissionMapping = {};

  givenPermission.map((item) => {
    permissionMapping[item.name] = item.permissionId;
  });

  // Checked Condition Checking

  const checked = (label) => {
    if (label === "all") {
      let arr = [];
      PERMISSION_NAME.map((item) => {
        if (permissionMapping[item]) {
          arr.push(permissionMapping[item]);
        }
      });
      return (
        arr.filter((item) => selectedValues.permissions.includes(item))
          .length === arr.length
      );
    } else {
      return selectedValues.permissions.includes(permissionMapping[label]);
    }
  };

  const indeterminateCheck = () => {
    let arr = [];
    PERMISSION_NAME.map((item) => {
      if (permissionMapping[item]) {
        arr.push(permissionMapping[item]);
      }
    });
    const validLength = arr.filter((item) =>
      selectedValues.permissions.includes(item)
    ).length;
    return validLength > 0 && validLength !== arr.length;
  };

  return (
    <div className="multi-checkbox-wrapper">
      {choices.map((option, idx) => {
        if (
          Object.keys(permissionMapping).includes(option.label) ||
          option.label === "all"
        )
          return (
            <div key={`${sectionHeading}-${idx}`} className="checkbox-wrapper">
              <Checkbox
                id={`${title}-${sectionHeading}-${sectionIdx}-${option.label}`}
                checked={checked(option.label)}
                {...(option.label === "all" && {
                  indeterminate: indeterminateCheck(),
                })}
                onChange={(e) =>
                  handleSelectedPermissions(e, permissionMapping)
                }
                name={sectionHeading}
                value={
                  option.label === "all"
                    ? "all"
                    : permissionMapping[option.label]
                }
                disabled={pageType === PAGE_TYPE.VIEW}
                sx={{
                  color: blue[900],
                  "&.Mui-checked": {
                    color: blue[900],
                  },
                }}
              />
              <label
                htmlFor={`${title}-${sectionHeading}-${sectionIdx}-${option.label}`}
              >
                {option.label}
              </label>
            </div>
          );
      })}
    </div>
  );
};

export default MultiCheckbox;
