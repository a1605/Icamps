import React, { useState } from "react";
import CommonHeader from "../../../../common/components/CommonHeader/CommonHeader";
import { useNavigate, useParams } from "react-router-dom";
import CreateForm from "./CreateForm";
import { toast } from "react-hot-toast";
import {
  createSingleDevice,
  updateSingleDevices,
} from "../../Services/Device.Services";
import {
  dateTransform,
  defaultDateDayjs,
  issueFixDateTransform,
} from "../../../../common/helperFunction/dateTransform";
import {
  AssigneeStatus,
  FEATURE_MAPPING,
  GLOBAL_STATUS,
  PAGE_TYPE,
  PERMISSION_MAPPING,
  SCREEN_TYPE,
} from "../../../../common/global.constant";
import { useAuth } from "../../../../common/hooks/useAuth";

import {
  ADVISOR_DEVICE_QUERY_KEY,
  CHANGE_VALUE_APPROVAL,
  CHANGE_VALUE_REJECT,
  OVERLAY_APPROVAL_DATA,
  OVERLAY_REJECT_DATA,
} from "../../../approval/approval.constant";
import { updateSingleApprovalDevice } from "../../../approvalDevice/services/approvalDeviceServices";
import { APPROVAL_DEVICE_QUERY_KEY } from "../../../approvalDevice/approvalDevice.constant";
import { useQueryClient } from "@tanstack/react-query";
import { statusAssigneeHandle } from "../../../../common/helperFunction/statusHelper";
import AssigneeBox from "../../../../common/components/assigneeBox/AssigneeBox";
import { DEVICE_QUERY_KEY } from "../../devices.constant";
import { isDataValidDevice } from "../../device.helpers";
import {
  accessToApproval,
  accessToAssignBack,
  accessToEdit,
} from "../../../../common/global.validation";

const CreateDevice = () => {
  const { screen, id, pageType } = useParams();

  const { auth, error, setError, loading, setLoading } = useAuth();

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const [deviceData, setdeviceData] = useState({
    modelNo: "",
    modelName: "",
    sourceTicketId: "",
    releaseDate: defaultDateDayjs(null),
    updatedOn: dateTransform(new Date()),
    cpuId: "",
    gpuId: "",
    manufacturerId: "",
    latestSecUpdateReleasedDt: defaultDateDayjs(null),
    googleCertified: false,
    nccsapproved: false,
    aospversionCodeReleased: "",
    aospversionCodeLatest: "",
    oemosversionCodeReleased: "",
    oemosversionCodeLatest: "",
    latestSecurityUpdate: defaultDateDayjs(null),
    requestedBy: null,
    requestedOn: null,
    approvedBy: null,
    approvedOn: null,
    modelEOLDate: defaultDateDayjs(null),
    status: GLOBAL_STATUS.DRAFT,
    assignee: `${auth.userDetails.email.toLowerCase()}`,
    updatedBy: `${auth.userDetails.email.toLowerCase()}`,
  });

  const [overlayData, setOverlayData] = useState(OVERLAY_REJECT_DATA);
  const [openOverlay, setOpenOverlay] = useState(false);
  // Assignee Box
  const [showAssigneeBox, setShowAssigneeBox] = useState(false);
  const [assigneeData, setAssigneeData] = useState({
    permissionData: {},
    submitHandler: () => {},
  });

  const onReject = (deviceData) => {
    setLoading(true);
    setOverlayData({ ...OVERLAY_REJECT_DATA, deviceData: deviceData });
    setOpenOverlay(true);
    setLoading(false);
  };

  const onApproval = (deviceData) => {
    setLoading(true);
    setOverlayData({ ...OVERLAY_APPROVAL_DATA, deviceData: deviceData });
    setOpenOverlay(true);
    setLoading(false);
  };

  const handleApprovalDevice = async () => {
    setLoading(true);

    try {
      let commentdata = [];
      commentdata.push({
        commentDescription: "Approved",
        email: auth.userDetails.email,
        updatedOn: dateTransform(new Date()),
      });
      await updateSingleApprovalDevice({
        deviceId: deviceData.id,
        status: CHANGE_VALUE_APPROVAL[deviceData.status],
        comments: commentdata,
        approvedOn: dateTransform(new Date()),
        approvedBy: auth.userDetails.email,
        assignee: deviceData.requestedBy,
        requestedBy: null,
        requestedOn: null,
      });

      queryClient.invalidateQueries([APPROVAL_DEVICE_QUERY_KEY.LISTING_KEY, 0]);
      setOpenOverlay(false);
      navigate(`/inventory/${screen}/devices`);
    } catch (err) {
      toast.error(JSON.parse(err.request.response).message);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (data, checkBoxBool, comment) => {
    setLoading(true);
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
      deviceId: deviceData.id,
      comments: commentdata,
      status: CHANGE_VALUE_REJECT[deviceData.status],
      assignee: deviceData.requestedBy,
      requestedBy: null,
      requestedOn: null,
    };
    try {
      setLoading(true);
      await updateSingleApprovalDevice(bodyToSend);
      queryClient.invalidateQueries([APPROVAL_DEVICE_QUERY_KEY.LISTING_KEY, 0]);
      setOpenOverlay(false);
      navigate(`/inventory/${screen}/devices`);
    } catch (err) {
      toast.error(JSON.parse(err.request.response).message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (screen !== SCREEN_TYPE.INVENTORY) {
      navigate(`/inventory/${screen}/devices`);
      return;
    }
    navigate(`/${screen}/devices`);
  };

  const handleAssinee = async () => {
    try {
      let commentdata = [];
      commentdata.push({
        commentDescription: "assigning back",
        email: auth.userDetails.email,
        updatedOn: dateTransform(new Date()),
      });
      setLoading(true);
      await updateSingleDevices({
        deviceId: deviceData.id,
        assignee:
          deviceData?.status === GLOBAL_STATUS.ADVICE_C
            ? deviceData?.updatedBy
            : deviceData?.requestedBy,

        comments: commentdata,
        status: statusAssigneeHandle(
          deviceData?.status,
          deviceData?.approvedBy
        ),
        requestedBy:
          deviceData.status === GLOBAL_STATUS.ADVICE_A
            ? deviceData.updatedBy
            : null,
        requestedOn:
          deviceData.status === GLOBAL_STATUS.ADVICE_A
            ? deviceData.updatedOn
            : null,
      });
      queryClient.invalidateQueries([ADVISOR_DEVICE_QUERY_KEY.LISTING_KEY, 0]);
      setOpenOverlay(false);
      navigate("/inventory/advisor/devices");
    } catch (err) {
      toast.error(JSON.parse(err.request.response).message);
    } finally {
      setLoading(false);
    }
  };

  const submitAdviseC = async (data) => {
    try {
      setLoading(true);
      const body = {
        ...deviceData,
        status: GLOBAL_STATUS.ADVICE_C,
        modelEOLDate: issueFixDateTransform(deviceData.modelEOLDate),
        releaseDate: issueFixDateTransform(deviceData.releaseDate),
        aospversionCodeReleased: deviceData.aospversionCodeReleased,
        aospversionCodeLatest: deviceData.aospversionCodeLatest,
        oemosversionCodeReleased: deviceData.oemosversionCodeReleased,
        latestSecurityUpdate: issueFixDateTransform(
          deviceData.latestSecurityUpdate
        ),
        oemosversionCodeLatest: deviceData.oemosversionCodeLatest,
        latestSecUpdateReleasedDt: issueFixDateTransform(
          deviceData.latestSecUpdateReleasedDt
        ),
        updatedOn: dateTransform(new Date()),
        updatedBy: auth.userDetails.email,
        requestedOn: dateTransform(new Date()),
        requestedBy: auth.userDetails.email,
        comments: [
          {
            commentDescription: data.commentDescription,
            email: data.email,
            updatedOn: data.updatedOn,
          },
        ],
        assignee: data.assignee,
      };
      if (!(id && id !== "")) {
        await createSingleDevice({
          ...body,
        });
      } else {
        await updateSingleDevices({
          ...body,
          id: deviceData.deviceId,
        });
      }
      navigate("/inventory/devices");
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdviseC = () => {
    if (isDataValidDevice(deviceData, error, setError, "advice")) return;

    setAssigneeData({
      permissionData: {
        permissionName: [PERMISSION_MAPPING.ADVISOR],
        permissionTitle: [FEATURE_MAPPING.DEVICES.toLowerCase()],
        status: AssigneeStatus.ACTIVE,
      },
      submitHandler: submitAdviseC,
    });
    setShowAssigneeBox(true);
  };

  const submitReqUnpublished = async (data) => {
    try {
      setLoading(true);
      await updateSingleDevices({
        deviceId: id,
        status: GLOBAL_STATUS.REQ_UNPUBLISHED,
        assignee: data.assignee,
        requestedBy: auth.userDetails.email,
        requestedOn: dateTransform(new Date()),
        updatedOn: dateTransform(new Date()),
        updatedBy: auth.userDetails.email,
        comments: [
          {
            commentDescription: data.commentDescription,
            email: data.email,
            updatedOn: data.updatedOn,
          },
        ],
      });
      navigate("/inventory/devices");
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
        permissionTitle: [FEATURE_MAPPING.DEVICES.toLowerCase()],
        status: AssigneeStatus.ACTIVE,
      },
      submitHandler: submitReqUnpublished,
    });
    setShowAssigneeBox(true);
  };
  const submitAdviseA = async (data) => {
    try {
      setLoading(true);
      const body = {
        status: GLOBAL_STATUS.ADVICE_A,
        requestedBy: auth.userDetails.email,
        requestedOn: dateTransform(new Date()),
        comments: [
          {
            commentDescription: data.commentDescription,
            email: data.email,
            updatedOn: data.updatedOn,
          },
        ],
        assignee: data.assignee,
      };

      await updateSingleDevices({
        ...body,
        deviceId: id,
      });
      navigate("/inventory/approval/devices");
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdviseA = () => {
    setAssigneeData({
      permissionData: {
        permissionName: [PERMISSION_MAPPING.ADVISOR],
        permissionTitle: [FEATURE_MAPPING.DEVICES.toLowerCase()],
        status: AssigneeStatus.ACTIVE,
      },
      submitHandler: submitAdviseA,
    });
    setShowAssigneeBox(true);
  };

  const handleSaveDraft = async () => {
    try {
      setLoading(true);
      if (isDataValidDevice(deviceData, error, setError, "draft")) return;
      const body = {
        ...deviceData,
        modelEOLDate: issueFixDateTransform(deviceData.modelEOLDate),
        latestSecUpdateReleasedDt: issueFixDateTransform(
          deviceData.latestSecUpdateReleasedDt
        ),
        releaseDate: issueFixDateTransform(deviceData.releaseDate),
        aospversionCodeReleased: deviceData.aospversionCodeReleased,
        aospversionCodeLatest: deviceData.aospversionCodeLatest,
        oemosversionCodeReleased: deviceData.oemosversionCodeReleased,
        latestSecurityUpdate: issueFixDateTransform(
          deviceData.latestSecurityUpdate
        ),
        oemosversionCodeLatest: deviceData.oemosversionCodeLatest,
        updatedBy: auth.userDetails.email,
        updatedOn: dateTransform(new Date()),
        requestedBy: null,
        requestedOn: null,
        approvedOn: null,
        approvedBy: null,
        status: "IN_PROGRESS",
        comments: null,
      };

      if (pageType === PAGE_TYPE.CREATE) {
        await createSingleDevice({
          ...body,
        });
        toast.success(`Device ${deviceData.modelNo} created Successfully`);
      } else if (pageType === PAGE_TYPE.EDIT) {
        await updateSingleDevices({
          id: deviceData.deviceId,
          ...body,
        });
        toast.success(`Device ${deviceData.modelNo} updated Successfully`);
      }
      navigate("/inventory/devices");
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };

  const submitData = async (data) => {
    try {
      setLoading(true);
      const body = {
        ...deviceData,
        status: GLOBAL_STATUS.SUBMITTED,
        modelEOLDate: issueFixDateTransform(deviceData.modelEOLDate),
        releaseDate: issueFixDateTransform(deviceData.releaseDate),
        latestSecUpdateReleasedDt: issueFixDateTransform(
          deviceData.latestSecUpdateReleasedDt
        ),
        updatedOn: dateTransform(new Date()),
        latestSecurityUpdate: issueFixDateTransform(
          deviceData.latestSecurityUpdate
        ),
        updatedBy: auth.userDetails.email,
        requestedOn: dateTransform(new Date()),
        requestedBy: auth.userDetails.email,
        approvedOn: null,
        approvedBy: null,
        comments: [
          {
            commentDescription: data.commentDescription,
            email: data.email,
            updatedOn: data.updatedOn,
          },
        ],
        assignee: data.assignee,
      };
      if (pageType === PAGE_TYPE.CREATE)
        await createSingleDevice({
          ...body,
        });
      else if (pageType === PAGE_TYPE.EDIT)
        await updateSingleDevices({
          ...body,
          id: id,
        });
      navigate("/inventory/devices");
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (isDataValidDevice(deviceData, error, setError, "approval")) return;

    setAssigneeData({
      permissionData: {
        permissionName: [PERMISSION_MAPPING.APPROVER],
        permissionTitle: [FEATURE_MAPPING.DEVICES.toLowerCase()],
        status: AssigneeStatus.ACTIVE,
      },
      submitHandler: submitData,
    });
    setShowAssigneeBox(true);
  };

  const commentHandler = async (data) => {
    setLoading(true);
    try {
      await updateSingleDevices({
        deviceId: deviceData.deviceId,
        comments: [data],
        updatedBy: deviceData.updatedBy,
        updatedOn: deviceData.updatedOn,
        requestedBy: deviceData.requestedBy,
        requestedOn: deviceData.requestedOn,
        approvedOn: deviceData.approvedOn,
        approvedBy: deviceData.approvedBy,
        assignee: deviceData.assignee,
        status: deviceData.status,
      });
      await queryClient.invalidateQueries(
        DEVICE_QUERY_KEY.GET_SINGLE_DEVICE_DATA,
        deviceData.deviceId
      );
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="device-container">
      <CommonHeader
        backArrow="/inventory/devices"
        label="New Device"
        ticketInput={deviceData}
        handleTicketValue={setdeviceData}
        handleCancel={handleCancel}
        handleApproval={
          screen === SCREEN_TYPE.APPROVAL &&
          accessToApproval("DEVICES", auth, deviceData)
            ? onApproval
            : undefined
        }
        handleReject={
          screen === SCREEN_TYPE.APPROVAL &&
          accessToApproval("DEVICES", auth, deviceData)
            ? onReject
            : undefined
        }
        {...(screen === SCREEN_TYPE.APPROVAL && {
          handleAdvise: accessToApproval("DEVICES", auth, deviceData)
            ? handleAdviseA
            : undefined,
        })}
        handleApprovalDevice={handleApprovalDevice}
        handleRejectApprovalDevice={handleReject}
        openOverlay={openOverlay}
        closeOverlay={() => setOpenOverlay(false)}
        overlayData={overlayData}
        handleSaveDraft={pageType !== PAGE_TYPE.VIEW && handleSaveDraft}
        handleSubmit={pageType !== PAGE_TYPE.VIEW && handleSubmit}
        {...((pageType === PAGE_TYPE.CREATE || pageType === PAGE_TYPE.EDIT) && {
          handleAdvise: handleAdviseC,
        })}
        handleAssinee={
          screen === SCREEN_TYPE.ADVISOR &&
          accessToAssignBack("DEVICES", auth, deviceData)
            ? handleAssinee
            : undefined
        }
        {...(accessToEdit("DEVICES", auth, deviceData) &&
        pageType === PAGE_TYPE.VIEW
          ? { handleEdit: () => navigate(`/inventory/devices/edit/${id}`) }
          : {})}
        status={true}
        commentHandler={commentHandler}
        {...(screen === SCREEN_TYPE.INVENTORY &&
          pageType === PAGE_TYPE.VIEW &&
          deviceData.status === GLOBAL_STATUS.APPROVED && {
            handleReqUnPublished: auth.screens[
              FEATURE_MAPPING["DEVICES"]
            ].includes(PERMISSION_MAPPING.UPDATE)
              ? handleSubmitReqUnPublished
              : undefined,
          })}
      />
      {showAssigneeBox && (
        <AssigneeBox
          setShowBox={setShowAssigneeBox}
          assigneeBoxData={assigneeData}
        />
      )}
      <div className="block-wrapper">
        <CreateForm deviceData={deviceData} setDeviceData={setdeviceData} />
      </div>
    </div>
  );
};

export default CreateDevice;
