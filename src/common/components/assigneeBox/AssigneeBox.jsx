import React from "react";
import Button from "../Button/Button";
import { ArrowDropDownRounded } from "@mui/icons-material";
import { toast } from "react-hot-toast";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
} from "@mui/material";

// CSS
import "./AssigneeBox.scss";

// Component
import CircularLoader from "../CircularLoader/CircularLoader";

// Hooks
import { useFetchAssigneeList } from "../../../hooks/useFetchAssigneeList";
import { useAuth } from "../../hooks/useAuth";

// Helper
import { dateTransform } from "../../helperFunction/dateTransform";
const AssigneeBox = ({ setShowBox, assigneeBoxData = {} }) => {
  const { auth } = useAuth();

  const [assigneeData, setAssigneeData] = React.useState({
    assignee: "",
    commentDescription: "",
    email: auth.userDetails.email,
    updatedOn: dateTransform(new Date()),
  });
  const { data, isLoading, isError } = useFetchAssigneeList(
    assigneeBoxData.permissionData
  );

  const selectTitle = () => {
    if (
      assigneeBoxData?.permissionData?.permissionName[0] === "advice/comment"
    ) {
      return "Select Advisor";
    } else if (
      assigneeBoxData?.permissionData?.permissionName[0] === "approve/reject"
    ) {
      return "Select Approver";
    } else return "Select Assignee";
  };
  return (
    <div className="assignee-box-container">
      {isLoading ? (
        <>
          <Dialog
            open={setShowBox}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{
              sx: {
                position: "fixed",
                top: 150,
                left: "65%",
                right: 30,
                m: 0,
                width: "522px",
              },
            }}
          >
            <DialogContent>
              <CircularLoader />
              <div className="assignee-action-button">
                <Button
                  text="Cancel"
                  variant="outlined"
                  clickHandler={() => setShowBox(false)}
                />
              </div>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <Dialog
          open={setShowBox}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            sx: { pt: "10px", pl: "20px", pr: "20px", width: "522px" },
          }}
        >
          <DialogTitle className="assignee-dialog-title">
            {selectTitle()}
          </DialogTitle>
          <DialogContent>
            <div className="select-container">
              <select
                name="assignee"
                id="assignee"
                onChange={(e) =>
                  setAssigneeData({
                    ...assigneeData,
                    assignee: e.target.value,
                  })
                }
                {...((isError || data?.data.length === 0) && {
                  className: "error-select",
                })}
                disabled={isError || data?.data.length === 0}
                placeholder="Select Assignee"
                value={assigneeData.assignee}
              >
                <option value="">Select Assignee</option>
                {data?.data.length > 0 &&
                  data?.data.map((item) => (
                    <option value={item.email} key={item.email}>
                      {item.email}
                    </option>
                  ))}
              </select>
              <ArrowDropDownRounded className="select-dropdown-icon" />
            </div>
            {isError && (
              <div className="error-block">
                <p>Something went wrong! Contact admin.</p>
              </div>
            )}
            {data?.data.length === 0 && (
              <div className="error-block">
                <p>No User for the detail type! Contact admin.</p>
              </div>
            )}

            <div className="comment-container">
              <textarea
                className="text-area-description"
                name="comment"
                id="comment"
                cols="60"
                rows="8"
                placeholder="Enter your Comments"
                onChange={(e) => {
                  setAssigneeData({
                    ...assigneeData,
                    commentDescription: e.target.value,
                  });
                }}
                disabled={isError || data?.data.length === 0}
              ></textarea>
            </div>
          </DialogContent>
          <DialogActions>
            <div className="assignee-action-button">
              <Button
                text="Cancel"
                variant="outlined"
                clickHandler={() => setShowBox(false)}
              />
              <Button
                text="Submit"
                clickHandler={() => {
                  if (assigneeData.assignee === "") {
                    toast.error("Select appropriate assignee");
                    return;
                  }
                  if (assigneeData.commentDescription === "") {
                    toast.error("Please write proper description");
                    return;
                  }
                  assigneeBoxData.submitHandler(assigneeData);
                }}
              />
            </div>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default AssigneeBox;
