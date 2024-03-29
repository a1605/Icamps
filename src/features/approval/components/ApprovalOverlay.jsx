import React from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "../../../common/components/Button/Button";
import { APPROVAL, OVERLAY_CHECKBOX_DATA } from "../approval.constant";
import "./ApprovalOverlay.scss";

const ApprovalOverlay = ({
  open,
  closeOverlay,
  overlayData,
  handleApproval,
  handleReject,
}) => {
  const [checkboxBool, setCheckboxBool] = React.useState({});
  const [comment, setComment] = React.useState("");

  const handleChangeCheckbox = (event) => {
    setCheckboxBool({
      ...checkboxBool,
      [event.target.name]: !checkboxBool[event.target.name],
    });
  };

  const approvalContent = () => <p>Are you sure you want to approve?</p>;

  const rejectContent = () => (
    <div className="reject-content">
      <h5 className="label-title">Select Reasons</h5>
      <div className="checkbox-section">
        {OVERLAY_CHECKBOX_DATA.map((obj) => (
          <span key={obj.id}>
            <label className="label-checkbox">
              <input
                type="checkbox"
                checked={checkboxBool[obj.id]}
                name={obj.id}
                onChange={handleChangeCheckbox}
                disabled={comment !== ""}
              />
              {obj.label}
            </label>
          </span>
        ))}
      </div>
      <br />
      <br />
      <h5 className="label-title">Comments</h5>
      <textarea
        name="txtComments"
        cols="70"
        rows="10"
        placeholder="Enter your comments here"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={Object.values(checkboxBool).includes(true)}
      ></textarea>
    </div>
  );

  const displayData =
    overlayData.functionality == APPROVAL
      ? {
          title: "Are You Sure?",
          content: approvalContent(),
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

export default ApprovalOverlay;
