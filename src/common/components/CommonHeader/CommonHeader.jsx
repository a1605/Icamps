import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import { messageIcon } from "../../../assets/images";
import { TakeAdvise, SaveAsDraft } from "../../../assets/icons";

// Components
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import { statusDisplay } from "../../../features/news/news.helpers";
import AssigneeTextField from "../assigneeTextField/AssigneeTextField";
import Button from "../Button/Button";

// CSS
import "./CommonHeader.scss";
import { useParams } from "react-router-dom";
import { PAGE_TYPE } from "../../global.constant";
import RejectInformationButton from "../../../features/approval/components/RejectInformationButton/RejectInformationButton";
import ReqUnPublishedButton from "../../../features/approval/components/ReqUnPublished/ReqUnPublishedButton";
import Overlay from "../Overlay/Overlay";
import CommentSection from "../commentSection/commentSection";
import { useAuth } from "../../hooks/useAuth";

//BreakPoints
import useBreakpoints from "../../../hooks/useMobileBreakPoints";

const CommonHeader = ({
  label,
  ticketInput,
  handleTicketValue,
  handleCancel,
  handleReject,
  handleApproval,
  handleApprovalDevice,
  handleRejectApprovalDevice,
  closeOverlay,
  openOverlay,
  overlayData,
  handleSaveDraft,
  handleSubmit,
  handleAdvise,
  handleEdit,
  handleAssinee,
  status,
  types = [],
  setAssigneeBox,
  commentHandler,
  handleSave,
  handleReqUnPublished,
}) => {
  const [typeOptions, setTypeOptions] = useState(false);
  const [saveAsDraftOpen, setsaveAsDraftOpen] = useState(false);

  const { pageType, screen, screenType } = useParams();

  const { auth } = useAuth();

  const { isMd, isLg } = useBreakpoints();

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
    <div className="edit-header">
      <header>
        {isMd || isLg ? (
          <div className="edit-header-container">
            <div className="header-left">
             <div className="header-title">
                <span>{label}</span>
                {types.length > 0 && (
                  <button
                    className="selected-type"
                    onClick={() => setTypeOptions(!typeOptions)}
                  >
                    {ticketInput.type.toLowerCase()}
                  </button>
                )}
                {typeOptions && (
                  <div className="type-list">
                    <ul>
                      {types.map((item, index) =>
                        item !== "" ? (
                          <li key={index}>
                            <button
                              className={
                                ticketInput.type.toLowerCase() ==
                                item.toLowerCase()
                                  ? "selected-type-option"
                                  : ""
                              }
                              onClick={() => {
                                handleTicketValue({
                                  ...ticketInput,
                                  type: item,
                                });
                                setAssigneeBox(false);
                                setTypeOptions(false);
                              }}
                            >
                              {item.toLowerCase()}
                            </button>
                          </li>
                        ) : null
                      )}
                    </ul>
                  </div>
                )}
              </div>
              {status && (
                <div className="current-status">
                  {statusDisplay(ticketInput.status)}
                </div>
              )}
              {ticketInput &&<div className="ticket">
                <div className="ticket-Label">
                  <label className="ticket-label">Ticket ID</label>
                </div>

                {pageType !== PAGE_TYPE.VIEW ? (
                  <div className="ticket-Input">
                    <OutlinedInput
                      placeholder="Enter Ticket id here"
                      value={ticketInput.sourceTicketId}
                      onChange={(e) =>
                        handleTicketValue({
                          ...ticketInput,
                          sourceTicketId: e.target.value,
                        })
                      }
                      disabled={pageType === PAGE_TYPE.VIEW}
                    />
                  </div>
                ) : (
                  <p
                    onClick={onClickUrl(ticketInput.sourceTicketId)}
                    className="ticket-url"
                  >
                    {ticketInput?.sourceTicketId?.length > 0
                      ? ticketInput?.sourceTicketId.split("/").pop()
                      : ticketInput.sourceTicketId}
                  </p>
                )}
              </div>}
              { ticketInput && ticketInput.assignee && ticketInput.userAssigneeResponse ? (
                <div className="assignee-wrapper">
                  <AssigneeTextField
                    name={
                      pageType !== PAGE_TYPE.VIEW
                        ? auth.userDetails
                        : ticketInput.userAssigneeResponse
                    }
                    show={false}
                  />
                </div>
              ) : null}
            </div>
            <div className="header-action-button">
              {(pageType === PAGE_TYPE.VIEW || pageType === PAGE_TYPE.EDIT) &&
                commentHandler && (
                  <div className="header-comment-section">
                    <CommentSection
                      data={ticketInput}
                      submitHandler={commentHandler}
                      canAdd={
                        (screen === "advisor" || screenType === "advisor") &&
                        handleAssinee !== undefined
                      }
                    />
                  </div>
                )}

              {handleSave && (
                <Button
                  variant="solid"
                  clickHandler={handleSave}
                  text={"Save"}
                />
              )}
              {handleAdvise && (
                <ButtonIcon
                  variant="outlined"
                  src={TakeAdvise}
                  onClick={handleAdvise}
                />
              )}
              {handleSaveDraft && (
                <ButtonIcon
                  className="save-as-draft"
                  variant="outlined"
                  src={SaveAsDraft}
                  onClick={() => setsaveAsDraftOpen(!saveAsDraftOpen)}
                />
              )}
              {saveAsDraftOpen && (
                <div className="dropdown-button-save-as">
                  <span
                    onClick={() => {
                      setsaveAsDraftOpen(!saveAsDraftOpen);
                      handleSaveDraft();
                    }}
                  >
                    Save As Draft
                  </span>
                </div>
              )}
              {handleEdit &&
                auth.userDetails.email === ticketInput.updatedBy && (
                  <Button
                    variant="solid"
                    clickHandler={handleEdit}
                    text={"Edit"}
                  />
                )}
              {openOverlay && (
                <Overlay
                  open={openOverlay}
                  closeOverlay={closeOverlay}
                  handleApproval={handleApprovalDevice}
                  handleReject={handleRejectApprovalDevice}
                  overlayData={overlayData}
                />
              )}
              {handleCancel && (
                <Button
                  variant="outlined"
                  clickHandler={handleCancel}
                  text={"Cancel"}
                />
              )}

              {handleReqUnPublished && (
                <ReqUnPublishedButton clickHandler={handleReqUnPublished} />
              )}

              {handleSubmit && (
                <Button
                  variant="solid"
                  clickHandler={handleSubmit}
                  text={"Submit"}
                />
              )}

              {handleReject && (
                <RejectInformationButton clickHandler={handleReject} />
              )}

              {handleApproval && (
                <Button
                  text="Approve"
                  variant="solid"
                  clickHandler={handleApproval}
                />
              )}

              {handleAssinee && (
                <Button
                  text="Assign Back"
                  variant="solid"
                  clickHandler={handleAssinee}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="header-wrap header-wrap-resp">
            <div className="edit-title">
              <div className="header-label">
                <span>{label}</span>
                {types.length > 0 && (
                  <button
                    className="selected-type"
                    onClick={() => setTypeOptions(!typeOptions)}
                  >
                    {ticketInput.type.toLowerCase()}
                  </button>
                )}
                {typeOptions && (
                  <div className="type-list">
                    <ul>
                      {types.map((item, index) =>
                        item !== "" ? (
                          <li key={index}>
                            <button
                              className={
                                ticketInput.type.toLowerCase() ==
                                item.toLowerCase()
                                  ? "selected-type-option"
                                  : ""
                              }
                              onClick={() => {
                                handleTicketValue({
                                  ...ticketInput,
                                  type: item,
                                });
                                setAssigneeBox(false);
                                setTypeOptions(false);
                              }}
                            >
                              {item.toLowerCase()}
                            </button>
                          </li>
                        ) : null
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {status && (
                <div className="current-status">
                  {statusDisplay(ticketInput.status)}
                </div>
              )}

              {ticketInput && (
                <div className="ticket">
                  <div className="ticket-Label">
                    <label>Ticket ID</label>
                  </div>

                  {pageType !== PAGE_TYPE.VIEW ? (
                    <div className="ticket-Input">
                      <OutlinedInput
                        placeholder="Enter Ticket id here"
                        value={ticketInput.sourceTicketId}
                        onChange={(e) =>
                          handleTicketValue({
                            ...ticketInput,
                            sourceTicketId: e.target.value,
                          })
                        }
                        disabled={pageType === PAGE_TYPE.VIEW}
                      />
                    </div>
                  ) : (
                    <a
                      className="ticket-url"
                      onClick={onClickUrl(ticketInput.sourceTicketId)}
                    >
                      {ticketInput?.sourceTicketId?.length > 0
                        ? ticketInput?.sourceTicketId.split("/").pop()
                        : ticketInput.sourceTicketId}
                    </a>
                  )}
                </div>
              )}
             
            </div>

            <div className="submit-wrapper">
              <div className="submit-button">
                {(pageType === PAGE_TYPE.VIEW || pageType === PAGE_TYPE.EDIT) &&
                  commentHandler && (
                    <div className="header-comment-section">
                      <CommentSection
                        data={ticketInput}
                        submitHandler={commentHandler}
                        canAdd={
                          (screen === "advisor" || screenType === "advisor") &&
                          handleAssinee !== undefined
                        }
                      />
                    </div>
                  )}
                {handleCancel && (
                  <Button
                    variant="outlined"
                    clickHandler={handleCancel}
                    text={"Cancel"}
                  />
                )}

                {handleReqUnPublished && (
                  <ReqUnPublishedButton clickHandler={handleReqUnPublished} />
                )}
                {handleSave && (
                  <Button
                    variant="solid"
                    clickHandler={handleSave}
                    text={"Save"}
                  />
                )}
                {handleAdvise && (
                  <ButtonIcon
                    variant="outlined"
                    text="Take Advise"
                    src={messageIcon}
                    onClick={handleAdvise}
                  />
                )}
                {handleSaveDraft && (
                  <ButtonIcon
                    variant="outlined"
                    onClick={handleSaveDraft}
                    text={"Save as Draft"}
                  />
                )}
                {handleEdit && (
                  <Button
                    variant="solid"
                    clickHandler={handleEdit}
                    text={"Edit"}
                  />
                )}
                {openOverlay && (
                  <Overlay
                    open={openOverlay}
                    closeOverlay={closeOverlay}
                    handleApproval={handleApprovalDevice}
                    handleReject={handleRejectApprovalDevice}
                    overlayData={overlayData}
                  />
                )}
                {handleSubmit && (
                  <Button
                    variant="solid"
                    clickHandler={handleSubmit}
                    text={"Submit for approval"}
                  />
                )}

                {handleReject && (
                  <RejectInformationButton clickHandler={handleReject} />
                )}

                {handleApproval && (
                  <Button
                    text="Approve"
                    variant="solid"
                    clickHandler={handleApproval}
                  />
                )}

                {handleAssinee && (
                  <Button
                    text="Assign Back"
                    variant="solid"
                    clickHandler={handleAssinee}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default CommonHeader;
