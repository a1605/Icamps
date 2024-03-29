import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "../../../common/components/Button/Button";
import { OVERLAY_CHECKBOX_DATA, APPROVAL } from "../blacklist-number.constant";
import "./BlacklistOverlay.scss";

const BlacklistOverlay = ({
  open,
  closeOverlay,
  overlayData,
  handleApproval,
  handleReject,
}) => {
  const [checkboxBool, setCheckboxBool] = React.useState({
    duplicate: false,
    revisedDesc: false,
    revisedTitle: false,
  });
  const [comment, setComment] = React.useState("");

  const handleChangeCheckbox = (event) => {
    setCheckboxBool({
      ...checkboxBool,
      [event.target.name]: !checkboxBool[event.target.name],
    });
  };

  const rejectContent = () => (
    <div className="reject-content">
      <h5 className="label-title">Select Reasons</h5>
      <div className="checkbox-section">
        {OVERLAY_CHECKBOX_DATA.map((obj) => (
          <span key={obj.id}>
            <input
              type="checkbox"
              checked={checkboxBool[obj.id]}
              name={obj.id}
              onChange={handleChangeCheckbox}
            />{" "}
            <label className="label-checkbox">{obj.label}</label>
          </span>
        ))}
      </div>
      <br />
      <br />
      <h5 className="label-title">Comments</h5>
      <textarea
        name="txtComments"
        cols="55"
        rows="10"
        placeholder="Enter your comments here"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
    </div>
  );

  const displayData =
    overlayData.functionality == APPROVAL
      ? {
          title: "Are You Sure?",
          content: <p>Are you sure you want to approve?</p>,
          buttonText: "Confirm",
          submitFunc: () => handleApproval(overlayData.data),
        }
      : {
          title: "Reasons & Comments",
          content: rejectContent(),
          buttonText: "Submit",
          submitFunc: () =>
            handleReject(overlayData.data, checkboxBool, comment),
        };

  return (
    <>
      {open && (
        <div className="dialog-container">
          <div className="dialog-content">
            <h2>{displayData.title}</h2>
            <DialogContent>{displayData.content}</DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                text="Cancel"
                clickHandler={closeOverlay}
              />
              <Button
                text={displayData.buttonText}
                clickHandler={displayData.submitFunc}
              />
            </DialogActions>
          </div>
        </div>
      )}
    </>
  );
};

export default BlacklistOverlay;
