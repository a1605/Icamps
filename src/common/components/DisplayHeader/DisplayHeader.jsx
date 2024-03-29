import React from "react";

// Component Import
import StatusBadge from "../statusBadge/StatusBadge";
import AssigneeTextField from "../assigneeTextField/AssigneeTextField";
import CommentSection from "../commentSection/commentSection";
import Button from "../Button/Button";

// CSS
import "./DisplayHeader.scss";
import { useNavigate, useParams } from "react-router-dom";
import RejectInformationButton from "../../../features/approval/components/RejectInformationButton/RejectInformationButton";
import { messageIcon } from "../../../assets/images";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import ReqUnPublishedButton from "../../../features/approval/components/ReqUnPublished/ReqUnPublishedButton";

const DisplayHeader = ({
  title = "Title",
  data,
  onEdit,
  handleReject,
  handleAdviseA,
  handleApproval,
  assignBackHandle,
  commentHandler,
  handleReqUnPublished,
}) => {
  const { viewType } = useParams();
  const navigate = useNavigate();
  const onCancel = () => {
    if (viewType === "detail") {
      navigate("/information");
    } else if (viewType === "approval") {
      navigate("/approval/information");
    } else if (viewType === "advisory") {
      navigate("/advisory/information");
    }
  };

  const openInNewTab = (url) => {
    if (new URL(url).protocol === "https:") {
      const newWindow = window.open(url);
      if (newWindow) newWindow.opener = null;
    }
  };

  const onClickUrl = (url) => {
    return () => openInNewTab(url);
  };
  return (
    <div className="display-header">
      <div className="details-section">
        <div className="details-section1">
          <div className="header-title">
            <h3>{title.toLowerCase()}</h3>
          </div>
          <div className="header-status-badge">
            <StatusBadge status={data.status} />
          </div>
        </div>
        <div className="details-section2">
          <div className="header-ticket-id">
            <h5>Ticket Id:</h5>
            <a className="ticket-url" onClick={onClickUrl(data.sourceTicketId)}>
              {data.sourceTicketId.split("/").pop()}
            </a>
          </div>
          <div className="header-assignee-text">
            <AssigneeTextField name={data.userAssigneeResponse} show={false} />
          </div>
        </div>
      </div>
      <div className="action-section">
        <div className="header-comment-section">
          <CommentSection
            data={data}
            submitHandler={commentHandler}
            canAdd={viewType === "advisory" && assignBackHandle !== undefined}
          />
        </div>
        <div>
          <Button text="Cancel" variant="outlined" clickHandler={onCancel} />
        </div>
        {viewType === "detail" && onEdit && (
          <div>
            <Button text="Edit" variant="solid" clickHandler={onEdit} />
          </div>
        )}
        {handleReqUnPublished && (
          <ReqUnPublishedButton clickHandler={handleReqUnPublished} />
        )}
        {viewType === "approval" && handleAdviseA && (
          <div>
            <ButtonIcon
              // className="advise-button"
              variant="outlined"
              text="Take Advise"
              src={messageIcon}
              onClick={handleAdviseA}
            />
          </div>
        )}
        {viewType === "approval" && handleReject && (
          <div>
            <RejectInformationButton clickHandler={handleReject} />
          </div>
        )}
        {viewType === "approval" && handleApproval && (
          <div>
            <Button
              text="Approve"
              variant="solid"
              clickHandler={handleApproval}
            />
          </div>
        )}

        {viewType === "advisory" && assignBackHandle && (
          <div>
            <Button
              text="Assign Back"
              variant="solid"
              clickHandler={assignBackHandle}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayHeader;
