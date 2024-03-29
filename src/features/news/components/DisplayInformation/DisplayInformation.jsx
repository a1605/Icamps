import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Chip } from "@mui/material";
import { toast } from "react-hot-toast";

// Service Import
import { useFetchSingleNews } from "../../hooks/useFetchSingleNews";
import { updateSingleApproval } from "../../../approval/services/approvalServices";
import { updateSingleNews } from "../../services/newsServices";

// CSS Import
import "./DisplayInformation.scss";

// Component
import DisplayHeader from "../../../../common/components/DisplayHeader/DisplayHeader";
import DropdownMultiSelect from "../../../../common/components/MultipleSelect/DropdownMultiSelect";
import CircularLoader from "../../../../common/components/CircularLoader/CircularLoader";
import { ApprovalOverlay } from "../../../approval/components";
import AssigneeBox from "../../../../common/components/assigneeBox/AssigneeBox";

// Helper Function
import { transformDeviceList } from "../../device.helper";
import { transformOSDropdownData } from "../../../os/os.helper";
import { transformAppDropdownData } from "../../../app/application.helper";
import {
  AppDropDownTableData,
  deviceDropDownTableData,
  osDropDownTableData,
} from "../../news.helpers";
import { dateTransform } from "../../../../common/helperFunction/dateTransform";

// Constant
import {
  AssigneeStatus,
  FEATURE_MAPPING,
  GLOBAL_STATUS,
  PERMISSION_MAPPING,
} from "../../../../common/global.constant";
import {
  APPROVAL_QUERY_KEY,
  CHANGE_VALUE_APPROVAL,
  CHANGE_VALUE_REJECT,
  OVERLAY_APPROVAL_DATA,
  OVERLAY_REJECT_DATA,
} from "../../../approval/approval.constant";
import { useQueryClient } from "@tanstack/react-query";
import { INFORMATION_QUERY_KEYS } from "../../news.constant";
import { useAuth } from "../../../../common/hooks/useAuth";
import { statusAssigneeHandle } from "../../../../common/helperFunction/statusHelper";
import {
  accessToApproval,
  accessToAssignBack,
  accessToEdit,
} from "../../../../common/global.validation";
import dayjs from "dayjs";

const DisplayInformation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth, setLoading } = useAuth();
  const queryClient = useQueryClient();
  const informationData = useFetchSingleNews(id);
  // Approval & Reject Handle

  const [overlayData, setOverlayData] = useState({
    functionality: "reject",
    data: {},
  });
  const [openOverlay, setOpenOverlay] = useState(false);
  const [showAssigneeBox, setShowAssigneeBox] = useState(false);
  const [assigneeData, setAssigneeData] = useState({
    permissionData: {},
    submitHandler: () => {},
  });

  const onReject = () => {
    const data = informationData?.data?.data;
    setOverlayData({ ...OVERLAY_REJECT_DATA, data: data });
    setOpenOverlay(true);
  };

  const onApproval = () => {
    const data = informationData?.data?.data;
    setOverlayData({ ...OVERLAY_APPROVAL_DATA, data: data });
    setOpenOverlay(true);
  };

  const handleApproval = async (data) => {
    setLoading(true);
    let commentdata = [];
    commentdata.push({
      commentDescription: "Approved",
      email: auth.userDetails.email,
      updatedOn: dateTransform(new Date()),
    });
    try {
      await updateSingleApproval({
        ...data,
        status: CHANGE_VALUE_APPROVAL[data.status],
        approvedOn: dateTransform(new Date()),
        approvedBy: auth.userDetails.email,
        comments: commentdata,
        assignee: data.updatedBy,
        requestedBy: null,
        requestedOn: null,
        updatedBy: data.updatedBy,
        updatedOn: data.updatedOn,
      });
      navigate("/approval/information");
    } catch (err) {
      setLoading(false);
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (data, checkBoxBool, comment) => {
    setLoading(true);
    try {
      let commentdata = [];
      if (comment !== "") {
        commentdata.push({
          commentDescription: comment,
          email: auth.userDetails.email,
          updatedOn: dateTransform(new Date()),
        });
      } else if (Object.values(checkBoxBool).includes(true)) {
        let concatedComments = "";
        Object.keys(checkBoxBool).forEach((item) => {
          if (checkBoxBool[item]) {
            concatedComments =
              concatedComments === "" ? item : `${concatedComments}; ${item}`;
          }
        });
        commentdata.push({
          commentDescription: concatedComments,
          email: auth.userDetails.email,
          updatedOn: dateTransform(new Date()),
        });
      } else {
        toast.error("Please add rejection comment");
        return;
      }

      const bodyToSend = {
        ...data,
        comments: commentdata,
        status: CHANGE_VALUE_REJECT[data.status],
        assignee: data.updatedBy,
        requestedBy: null,
        requestedOn: null,
        updatedBy: data.updatedBy,
        updatedOn: data.updatedOn,
      };
      await updateSingleApproval(bodyToSend);
      queryClient.invalidateQueries([APPROVAL_QUERY_KEY.LISTING_KEY, 0]);
      setOpenOverlay(false);
      navigate("/approval/information");
    } catch {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const handleAdvice = () => {
    setAssigneeData({
      permissionData: {
        permissionName: [PERMISSION_MAPPING.ADVISOR],
        permissionTitle: [informationData?.data?.data?.type.toLowerCase()],
        status: AssigneeStatus.ACTIVE,
      },
      submitHandler: handleAdviceA,
    });
    setShowAssigneeBox(true);
  };
  const handleAdviceA = async (boxData) => {
    const data = informationData?.data?.data;

    try {
      setLoading(true);
      await updateSingleNews({
        informationId: id,
        status: GLOBAL_STATUS.ADVICE_A,
        requestedBy: auth.userDetails.email,
        requestedOn: dateTransform(new Date()),
        comments: [
          {
            commentDescription: boxData.commentDescription,
            email: boxData.email,
            updatedOn: boxData.updatedOn,
          },
        ],
        approvedBy: data.approvedBy,
        approvedOn: data.approvedOn,
        updatedBy: data.updatedBy,
        updatedOn: data.updatedOn,
        assignee: boxData.assignee,
      });
      navigate("/approval/information");
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };
  const submitReqUnpublished = async (boxData) => {
    const data = informationData?.data?.data;
    try {
      setLoading(true);
      await updateSingleNews({
        informationId: id,
        status: GLOBAL_STATUS.REQ_UNPUBLISHED,
        assignee: boxData.assignee,
        requestedBy: auth.userDetails.email,
        requestedOn: dateTransform(new Date()),
        updatedOn: dateTransform(new Date()),
        updatedBy: auth.userDetails.email,
        approvedBy: data.approvedBy,
        approvedOn: data.approvedOn,
        comments: [
          {
            commentDescription: boxData.commentDescription,
            email: boxData.email,
            updatedOn: boxData.updatedOn,
          },
        ],
      });
      navigate("/information");
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmitReqUnPublished = () => {
    setAssigneeData({
      permissionData: {
        permissionName: [PERMISSION_MAPPING.APPROVER],
        permissionTitle: [FEATURE_MAPPING.NEWS.toLowerCase()],
        status: AssigneeStatus.ACTIVE,
      },
      submitHandler: submitReqUnpublished,
    });
    setShowAssigneeBox(true);
  };

  // -------------------

  // Advisory

  const handleAssignBack = async () => {
    const data = informationData?.data?.data;
    let commentdata = [];
    commentdata.push({
      commentDescription: "Assigning Back",
      email: auth.userDetails.email,
      updatedOn: dateTransform(new Date()),
    });
    try {
      setLoading(true);
      await updateSingleNews({
        informationId: id,
        assignee:
          data.status === GLOBAL_STATUS.ADVICE_C
            ? data.updatedBy
            : data.requestedBy,
        requestedBy:
          data.status === GLOBAL_STATUS.ADVICE_A ? data.updatedBy : null,
        requestedOn:
          data.status === GLOBAL_STATUS.ADVICE_A ? data.updatedOn : null,
        approvedBy: data.approvedBy,
        approvedOn: data.approvedOn,
        comments: commentdata,
        updatedBy: data.updatedBy,
        updatedOn: data.updatedOn,
        status: statusAssigneeHandle(data.status, data.approvedBy),
      });
      navigate("/advisory/information");
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Comment Handler

  const commentHandler = async (data) => {
    const createNews = informationData?.data?.data;
    try {
      setLoading(true);
      await updateSingleNews({
        informationId: createNews.informationId,
        comments: [data],
        assignee: createNews.assignee,
        updatedBy: createNews.updatedBy,
        updatedOn: createNews.updatedOn,
        requestedBy: createNews.requestedBy,
        requestedOn: createNews.requestedOn,
        approvedOn: createNews.approvedOn,
        approvedBy: createNews.approvedBy,

        status: createNews.status,
      });
      await queryClient.invalidateQueries(
        INFORMATION_QUERY_KEYS.FETCH_SINGLE_INFORMATION,
        createNews.informationId
      );
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const transDeviceList = useMemo(
    () => transformDeviceList(informationData?.data?.data?.devices),
    [informationData?.data?.data?.devices]
  );

  const transOSList = useMemo(
    () => transformOSDropdownData(informationData?.data?.data?.os),
    [informationData?.data?.data?.os]
  );

  const transAppList = useMemo(
    () => transformAppDropdownData(informationData?.data?.data?.applications),
    [informationData?.data?.data?.applications]
  );

  const deviceData = useMemo(
    () =>
      deviceDropDownTableData(
        informationData?.data?.data?.devices,
        transDeviceList.map((item) => item.id)
      ),
    [informationData?.data?.data?.devices, transDeviceList]
  );

  const osData = useMemo(
    () =>
      osDropDownTableData(
        informationData?.data?.data?.os,
        transOSList.map((item) => item.id)
      ),
    [informationData?.data?.data?.os, transOSList]
  );
  const AppData = useMemo(
    () =>
      AppDropDownTableData(
        informationData?.data?.data?.applications,
        transAppList.map((item) => item.id)
      ),
    [informationData?.data?.data?.applications, transOSList]
  );

  if (!informationData.isLoading && !informationData.isError)
    return (
      <div>
        <DisplayHeader
          data={informationData?.data?.data}
          title={`${informationData?.data?.data?.type} Details`}
          {...(accessToEdit(
            informationData?.data?.data.type,
            auth,
            informationData?.data?.data
          )
            ? {
                onEdit: () =>
                  navigate(
                    `/information/edit/${informationData?.data?.data?.type.toLowerCase()}/${
                      informationData?.data?.data?.informationId
                    }`
                  ),
              }
            : {})}
          handleApproval={
            accessToApproval(
              informationData?.data?.data?.type,
              auth,
              informationData?.data?.data
            )
              ? onApproval
              : undefined
          }
          handleReject={
            accessToApproval(
              informationData?.data?.data?.type,
              auth,
              informationData?.data?.data
            )
              ? onReject
              : undefined
          }
          assignBackHandle={
            accessToAssignBack(
              informationData?.data?.data?.type,
              auth,
              informationData?.data?.data
            )
              ? handleAssignBack
              : undefined
          }
          handleAdviseA={
            accessToApproval(
              informationData?.data?.data?.type,
              auth,
              informationData?.data?.data
            )
              ? handleAdvice
              : undefined
          }
          {...(informationData?.data?.data?.status ===
            GLOBAL_STATUS.APPROVED && {
            handleReqUnPublished:
              auth.screens[FEATURE_MAPPING["NEWS"]].includes(
                PERMISSION_MAPPING.UPDATE
              ) &&
              !informationData?.data?.data?.infoNotification?.includes("PUSH")
                ? handleSubmitReqUnPublished
                : undefined,
          })}
          commentHandler={commentHandler}
        />
        {showAssigneeBox && (
          <AssigneeBox
            setShowBox={setShowAssigneeBox}
            assigneeBoxData={assigneeData}
          />
        )}
        <div className="information-details-section">
          <div className="section1">
            <div className="card-left-top">
              <div>
                <h3 className="card-first-title">Notification Type</h3>
                <p>{informationData?.data?.data?.infoNotification}</p>
              </div>

              <div>
                <h3 className="card-first-title">Title</h3>
                <p>{informationData?.data?.data?.title}</p>
              </div>
              <div>
                <h3>Description</h3>
                <p>{informationData?.data?.data?.description}</p>
              </div>

              <div className="image-sec">
                <div className="head_image">
                  <h3>Head Image</h3>
                  {informationData?.data?.data?.imagePath?.length > 0 && (
                    <img src={informationData?.data?.data?.imagePath} alt="" />
                  )}
                </div>
                <div className="icon_image">
                  <h3>Icon Image</h3>
                  {informationData?.data?.data?.imageIconPath?.length > 0 && (
                    <img
                      src={informationData?.data?.data?.imageIconPath}
                      alt=""
                    />
                  )}
                </div>
              </div>

              <div>
                <h3>Source/Link URL</h3>
                <p>{informationData?.data?.data?.sourceLink}</p>
              </div>

              <div>
                <h3>Primary Inventory</h3>
                <p>{informationData?.data?.data?.primaryInventory}</p>
              </div>
            </div>
            <div className="card-left-bottom">
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingRight: "20px",
                  }}
                >
                  <div style={{ width: "80%" }}>
                    <h3>Issue</h3>
                    <p style={{ wordWrap: "break-word", width: "50%" }}>
                      {informationData?.data?.data?.issues[0]?.name}
                    </p>
                  </div>
                  <div>
                    <h3>Issue Fix Date</h3>
                    <p style={{ marginLeft: "20%" }}>
                      {dayjs(informationData?.data?.data?.issueFixDate).format(
                        "DD-MM-YYYY"
                      )}
                    </p>
                  </div>
                </div>
                <h4>Action</h4>
                <ul>
                  {informationData?.data?.data?.action.map((item, index) => (
                    <li key={index}>
                      {item.name}{" "}
                      {informationData?.data?.data?.issues[0]
                        .recommendedAction == item.actionId
                        ? "(Recommended)"
                        : ""}{" "}
                    </li>
                  ))}
                </ul>
                <h4>Action Suggestion</h4>
                <p>{informationData?.data?.data?.actionSuggestion}</p>
              </div>
              <div>
                <h3>Tags</h3>
              </div>
              <div className="chip-section">
                {informationData?.data?.data?.tags?.map((item) => (
                  <Chip
                    className="chips-align"
                    size="small"
                    label={item}
                    key={item}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="section2">
            <div className="section2-card1">
              <h3 className="section2-first-card-title">
                Impacted Inventories
              </h3>
              <div>
                <h4>Related Devices</h4>
                <DropdownMultiSelect
                  showSelect={false}
                  selectedValues={transDeviceList}
                  chipsCount={2}
                  tableColumn={deviceData.columnHeading}
                  tableData={deviceData.columnData}
                  disableCloseOnSelect={true}
                />
              </div>
              <hr className="hr-line" />
              <div>
                <h4>Related OS</h4>
                <DropdownMultiSelect
                  showSelect={false}
                  selectedValues={transOSList}
                  chipsCount={2}
                  tableColumn={osData.columnHeading}
                  tableData={osData.columnData}
                  disableCloseOnSelect={true}
                />
              </div>
              <hr className="hr-line" />

              <div>
                <h4>Related APPS</h4>
                <DropdownMultiSelect
                  showSelect={false}
                  selectedValues={transAppList}
                  chipsCount={2}
                  tableColumn={AppData.columnHeading}
                  tableData={AppData.columnAppData}
                  disableCloseOnSelect={true}
                />
              </div>
            </div>

            <div className="section2-card2">
              <h3>Severity Level</h3>
              <button className="severity-level">
                {informationData?.data?.data?.severity.toLowerCase()}
              </button>
            </div>
          </div>
        </div>
        {openOverlay && (
          <ApprovalOverlay
            open={openOverlay}
            closeOverlay={() => setOpenOverlay(false)}
            handleApproval={handleApproval}
            handleReject={handleReject}
            overlayData={overlayData}
          />
        )}
      </div>
    );
  else return <CircularLoader />;
};

export default DisplayInformation;
