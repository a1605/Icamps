import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { RxEyeOpen } from "react-icons/rx";
import { BsThreeDotsVertical } from "react-icons/bs";

import {
  DialogTitle,
  Tooltip,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  Popover,
  IconButton,
} from "@mui/material";

// Commponent
import ButtonIcon from "../ButtonIcon/ButtonIcon";

// Constant
import { ICONMAPPER, PERMISSION_MAPPING } from "../../global.constant";

// Hooks
import { useAuth } from "../../hooks/useAuth";

// CSS
import "./ActionButton.scss";

const ActionButton = ({
  data,
  onOpen,
  showMenu = false,
  onEdit,
  onView,
  onStatusChange = () => {},
  dialogText = "Are you sure to Delete ?",
  dialogTitle = "Delete Confirmation",
  menuText = "Delete",
  onReject,
  onApproval,
  permissionTitle,
  onDelete,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openOverlay, setOpenOverlay] = useState(false);

  const handleCloseOverlay = () => setOpenOverlay(false);
  const { auth } = useAuth();

  const handleDelete = (event) => {
    setOpenOverlay(true);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const renderOverlay = () => (
    <Dialog
      open={openOverlay}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
    >
      <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialogText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <ButtonIcon
          className="MuiButton-contained"
          variant="contained"
          text="Confirm"
          onClick={() => {
            onStatusChange(data);
            handleCloseOverlay();
          }}
        />
        <ButtonIcon
          variant="outlined"
          text="Cancel"
          onClick={handleCloseOverlay}
        />
      </DialogActions>
    </Dialog>
  );

  return (
    <div className="action-button">
      {/* Show edit icon */}
      {onEdit &&
        auth.screens[permissionTitle]?.includes(PERMISSION_MAPPING.UPDATE) && (
          <Tooltip title="Edit">
            <span>
              <IconButton
                {...(typeof onEdit === "function"
                  ? { onClick: () => onEdit(data) }
                  : {})}
                disabled={typeof onEdit !== "function"}
              >
                <BiEdit
                  {...(typeof onEdit === "function"
                    ? {}
                    : { color: "#EFEFEF" })}
                />
              </IconButton>
            </span>
          </Tooltip>
        )}

      {/* Show display eye Icon */}
      {onView && (
        <Tooltip title="View">
          <IconButton onClick={() => onView(data)}>
            <RxEyeOpen />
          </IconButton>
        </Tooltip>
      )}

      {/* Show Menu icon */}
      {showMenu && (
        <Tooltip title="Menu">
          <span>
            <IconButton
              {...(typeof showMenu === "boolean"
                ? { onClick: (event) => setAnchorEl(event.currentTarget) }
                : {})}
              disabled={typeof showMenu !== "boolean"}
            >
              <BsThreeDotsVertical
                {...(typeof showMenu === "boolean" ? {} : { color: "#EFEFEF" })}
              />
            </IconButton>
          </span>
        </Tooltip>
      )}

      {/* Show reject icon */}
      {onReject && (
        <img src={ICONMAPPER.rejectIcon} onClick={() => onReject(data)} />
      )}

      {/* Feedback msg icon (Open or Close) */}
      {onOpen &&
        (data.status === "opened" ? (
          <img src={ICONMAPPER.openBox} onClick={() => onOpen(data)} />
        ) : (
          <img src={ICONMAPPER.closeBox} onClick={() => onOpen(data)} />
        ))}

      {/* Show approval icon */}
      {onApproval && (
        <img src={ICONMAPPER.approvalIcon} onClick={() => onApproval(data)} />
      )}

      {/* Show delete icon, explicity for miscllenious screen */}
      {onDelete &&
        auth.screens[permissionTitle]?.includes(PERMISSION_MAPPING.DELETE) && (
          <IconButton
            onClick={() => setOpenOverlay(true)}
            disabled={typeof onDelete !== "function"}
          >
            <img
              className="delete-icon"
              src={ICONMAPPER.deleteActionButtonIcon}
            />
          </IconButton>
        )}

      {/* Dialog Popup */}
      <Popover
        id={open ? "simple-popover" : undefined}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="popover-body" onClick={handleDelete}>
          <img src={ICONMAPPER[menuText]} alt={menuText} />
          <span className="popover-text"> {menuText} </span>
        </div>
      </Popover>
      {renderOverlay()}
    </div>
  );
};

export default ActionButton;
