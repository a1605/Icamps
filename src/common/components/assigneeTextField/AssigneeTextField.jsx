import React, { useMemo } from "react";
import "./AssigneeTextField.scss";
import { Tooltip } from "@mui/material";
import TableAssigneeBox from "../TableAssignee/TableAssigneeBox";

const AssigneeTextField = ({
  name = "XX",
  show = true,
  permission,
  type,
  handleAssigneeChange,
  id,
  approvedBy,
  approvedOn,
  requestedBy,
  requestedOn,
  status
}) => {
  // Getting First letter of the first and last name

  const letters = useMemo(() => {
    if (!name?.email) return "";

    const firstName = name.firstName;
    const lastName = name.lastName;

    if (!lastName) return firstName[0];

    return `${firstName[0]}${lastName[0]}`;
  }, [name]);

  return (
    <div
      className={`assignee-text-field-container ${
        show ? "change-assignee" : ""
      }`}
    >
      <div className="assignee-outer-circle">
        <Tooltip
          {...(name?.email
            ? { title: `${name.firstName} ${name.lastName}` }
            : {})}
        >
          <p className="assignee-text">{letters}</p>
        </Tooltip>
      </div>
      {show && (
        <TableAssigneeBox
          type={type}
          permission={permission}
          handleAssigneeChange={handleAssigneeChange}
          id={id}
          approvedBy={approvedBy}
          approvedOn={approvedOn}
          requestedBy={requestedBy}
          requestedOn={requestedOn}
          status={status}
        />
      )}
    </div>
  );
};

export default AssigneeTextField;
