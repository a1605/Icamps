import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ArrowDropDownRounded } from "@mui/icons-material";
import { useFetchTableAssigneeList } from "../../../hooks/useFetchTableAssigneeList";
import { FEATURE_MAPPING, PERMISSION_MAPPING } from "../../global.constant";

export default function TableAssigneeBox({
  type,
  permission,
  handleAssigneeChange,
  id,
  approvedBy,
  approvedOn,
  requestedBy,
  requestedOn,
  status
}) {
  const [anchorEl, setAnchorEl] = useState();
  const [selectedValue, setSelectedValue] = useState("");
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const { data, isLoading, isError } = useFetchTableAssigneeList(
    {
      permissionName: [permission],
      permissionTitle: [FEATURE_MAPPING[type]],
    },
    open
  );
  return (
    <div className="table-assignee-box">
      <IconButton
        aria-label="more"
        id="long-button"
        aria-haspopup="true"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <ArrowDropDownRounded />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 300,
            width: "25ch",
          },
        }}
      >
        {!isLoading &&
          !isError &&
          data?.data?.map((option) => (
            <MenuItem
              key={option}
              selected={option === selectedValue}
              onClick={() => {
                setSelectedValue(option.email),
                  handleAssigneeChange(
                    option.email,
                    id,
                    status,
                    approvedBy,
                    approvedOn,
                    requestedBy,
                    requestedOn,
                  );
                handleClose();
              }}
            >
              {option.email}
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
}
