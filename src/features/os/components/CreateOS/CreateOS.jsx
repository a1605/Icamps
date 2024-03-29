import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreateOSForm from "./CreateOSForm";
import CommonHeader from "../../../../common/components/CommonHeader/CommonHeader";
import { createSingleOS, updateSingleOS } from "../../services/OS.Services";
import { toast } from "react-hot-toast";
import { useFetchSingleOS } from "../../hooks/useFetchSingleOS";
import TopBarProgress from "react-topbar-progress-indicator";
import {
  dateTransform,
  defaultDateDayjs,
  issueFixDateTransform,
  serverFormatDateDayjs,
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
import useFetchApprovalOs from "../../../approvalOs/hooks/useFetchApprovalOs";
import {
  CHANGE_VALUE_APPROVAL,
  CHANGE_VALUE_REJECT,
  APPROVAL_OS_QUERY_KEY,
  OVERLAY_REJECT_DATA,
  OVERLAY_APPROVAL_DATA,
  ADVISOR_OS_QUERY_KEY,
} from "../../../approvalOs/approvalOs.constant";
import { useQueryClient } from "@tanstack/react-query";
import { updateSingleApprovalOs } from "../../../approvalOs/services/approvalOsServices";
import { statusAssigneeHandle } from "../../../../common/helperFunction/statusHelper";
import { OS_QUERY_KEY } from "../../os.constant";
import AssigneeBox from "../../../../common/components/assigneeBox/AssigneeBox";
import { isDataValidOs } from "../../os.helper";
import {
  accessToApproval,
  accessToAssignBack,
  accessToEdit,
} from "../../../../common/global.validation";
const CreateOS = () => {
  const { auth, error, setError, loading, setLoading } = useAuth();
  const queryClient = useQueryClient();

  const { id, screenType, pageType } = useParams();
  const [overlayData, setOverlayData] = React.useState(OVERLAY_REJECT_DATA);
  const [openOverlay, setOpenOverlay] = React.useState(false);
  const [OSData, setOSData] = useState({
    osName: "",
    codeName: "",
    oemSecurityUpdateDate: defaultDateDayjs(null),
    latestSecurityUpdate: defaultDateDayjs(null),
    apiVersion: "",
    latestReleaseDate: defaultDateDayjs(null),
    lastSecUpdateReleasedId: defaultDateDayjs(null),
    eolDate: defaultDateDayjs(null),
    status: GLOBAL_STATUS.DRAFT,
    sourceTicketId: "",
    updatedOn: dateTransform(new Date()),
    requestedBy: null,
    requestedOn: null,
    approvedOn: null,
    approvedBy: null,
    updatedBy: `${auth.userDetails.email.toLowerCase()}`,
    assignee: `${auth.userDetails.email.toLowerCase()}`,
  });
  // Assignee Box
  const [showAssigneeBox, setShowAssigneeBox] = useState(false);
  const [assigneeData, setAssigneeData] = useState({
    permissionData: {},
    submitHandler: () => {},
  });

  const navigate = useNavigate();

  const singleOs = useFetchSingleOS(id);

  const { dataOS } = useFetchApprovalOs(1, {});

  useEffect(() => {
    setError({
      title: [],
      message: [],
    });
    const data = singleOs?.data?.data;
    if (
      !OSData ||
      pageType === PAGE_TYPE.CREATE ||
      singleOs.isLoading ||
      singleOs.isError
    )
      return;

    setOSData({
      ...OSData,
      ...data,
      oemSecurityUpdateDate: defaultDateDayjs(data.oemSecurityUpdateDate),
      latestSecurityUpdate: defaultDateDayjs(data.latestSecurityUpdate),
      latestReleaseDate: defaultDateDayjs(data.latestReleaseDate),
      lastSecUpdateReleasedId: defaultDateDayjs(data.lastSecUpdateReleasedId),
      eolDate: defaultDateDayjs(data.eolDate),
    });
  }, [singleOs?.data?.data]);

  const onReject = () => {
    setLoading(true);
    setOverlayData({ ...OVERLAY_REJECT_DATA, dataOS: dataOS });
    setOpenOverlay(true);
    setLoading(false);
  };

  const onApproval = () => {
    setLoading(true);
    setOverlayData({ ...OVERLAY_APPROVAL_DATA, dataOS: dataOS });
    setOpenOverlay(true);
    setLoading(false);
  };

  const handleApprovalOs = async () => {
    let commentdata = [];
    commentdata.push({
      commentDescription: "Approved",
      email: auth.userDetails.email,
      updatedOn: dateTransform(new Date()),
    });
    try {
      setLoading(true);
      await updateSingleApprovalOs({
        comments: commentdata,
        osId: parseInt(id),
        status: CHANGE_VALUE_APPROVAL[OSData.status],
        approvedOn: dateTransform(new Date()),
        approvedBy: auth.userDetails.email,
        assignee: OSData.requestedBy,
        requestedBy: null,
        requestedOn: null,
      });
      queryClient.invalidateQueries([APPROVAL_OS_QUERY_KEY.LISTING_KEY, 1]);
      setOpenOverlay(false);
      navigate(`/inventory/${screenType}/os`);
    } catch (err) {
      toast.error(JSON.parse(err.request.response).message);
    } finally {
      setLoading(false);
    }
  };

  const handleRejectOs = async (data, checkBoxBool, comment) => {
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
        osId: parseInt(id),
        comments: commentdata,
        status: CHANGE_VALUE_REJECT[OSData.status],
        assignee: OSData.requestedBy,
        requestedBy: null,
        requestedOn: null,
      };
      setLoading(true);
      await updateSingleApprovalOs(bodyToSend);
      queryClient.invalidateQueries([APPROVAL_OS_QUERY_KEY.LISTING_KEY, 1]);
      setOpenOverlay(false);
      navigate(`/inventory/${screenType}/os`);
    } catch (err) {
      toast.error(JSON.parse(err.request.response).message);
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    if (screenType === SCREEN_TYPE.APPROVAL) {
      navigate(`/inventory/${screenType}/os`);
      return;
    }
    if (screenType === SCREEN_TYPE.ADVISOR) {
      navigate("/inventory/advisor/os");
      return;
    }
    navigate(`/inventory/os`);
  };

  const handleSaveDraft = async () => {
    if (isDataValidOs(OSData, error, setError, "draft")) return;

    try {
      setLoading(true);
      const body = {
        ...OSData,

        oemSecurityUpdateDate: serverFormatDateDayjs(
          OSData.oemSecurityUpdateDate
        ),
        latestSecurityUpdate: serverFormatDateDayjs(
          OSData.latestSecurityUpdate
        ),
        latestReleaseDate: serverFormatDateDayjs(OSData.latestReleaseDate),
        lastSecUpdateReleasedId: serverFormatDateDayjs(
          OSData.lastSecUpdateReleasedId
        ),
        eolDate: serverFormatDateDayjs(OSData.eolDate),
        status: GLOBAL_STATUS.DRAFT,
        assignee: auth.userDetails.email,
        updatedBy: auth.userDetails.email,
        updatedOn: dateTransform(new Date()),
        requestedBy: null,
        requestedOn: null,
        approvedOn: null,
        approvedBy: null,
        comments: null,
      };
      if (pageType === PAGE_TYPE.CREATE) {
        await createSingleOS({
          ...body,
        });
      } else if (pageType === PAGE_TYPE.EDIT) {
        await updateSingleOS({
          osId: id,
          ...body,
        });
      }
      navigate(`/${screenType}/os`);
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };

  const handleAssinee = async () => {
    try {
      let commentdata = [];
      commentdata.push({
        commentDescription: "Assigning Back",
        email: auth.userDetails.email,
        updatedOn: dateTransform(new Date()),
      });
      setLoading(true);
      await updateSingleApprovalOs({
        osId: parseInt(id),
        comments: commentdata,
        assignee:
          OSData?.status === GLOBAL_STATUS.ADVICE_C
            ? OSData?.updatedBy
            : OSData?.requestedBy,
        status: statusAssigneeHandle(OSData?.status, OSData?.approvedBy),
        requestedBy:
          OSData.status === GLOBAL_STATUS.ADVICE_A ? OSData.updatedBy : null,
        requestedOn:
          OSData.status === GLOBAL_STATUS.ADVICE_A ? OSData.updatedOn : null,
      });
      queryClient.invalidateQueries([ADVISOR_OS_QUERY_KEY.LISTING_KEY, 1]);
      setOpenOverlay(false);
      navigate("/inventory/advisor/os");
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
        ...OSData,
        status: GLOBAL_STATUS.ADVICE_C,
        oemSecurityUpdateDate: serverFormatDateDayjs(
          OSData.oemSecurityUpdateDate
        ),
        latestSecurityUpdate: serverFormatDateDayjs(
          OSData.latestSecurityUpdate
        ),
        latestReleaseDate: serverFormatDateDayjs(OSData.latestReleaseDate),
        lastSecUpdateReleasedId: serverFormatDateDayjs(
          OSData.lastSecUpdateReleasedId
        ),
        eolDate: serverFormatDateDayjs(OSData.eolDate),
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
        await createSingleOS({ ...body });
      } else {
        await updateSingleOS({
          osId: id,
          ...body,
        });
      }
      navigate(`/inventory/os`);
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdviseC = () => {
    if (isDataValidOs(OSData, error, setError, "advise")) return;

    setAssigneeData({
      permissionData: {
        permissionName: [PERMISSION_MAPPING.ADVISOR],
        permissionTitle: [FEATURE_MAPPING.OS.toLowerCase()],
        status: AssigneeStatus.ACTIVE,
      },
      submitHandler: submitAdviseC,
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
      await updateSingleOS({
        osId: id,
        ...body,
      });
      navigate(`/inventory/approval/os`);
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
        permissionTitle: [FEATURE_MAPPING.OS.toLowerCase()],
        status: AssigneeStatus.ACTIVE,
      },
      submitHandler: submitAdviseA,
    });
    setShowAssigneeBox(true);
  };

  const submitReqUnpublished = async (data) => {
    try {
      setLoading(true);
      await updateSingleOS({
        osId: id,
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
      navigate("/inventory/os");
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
        permissionTitle: [FEATURE_MAPPING.OS.toLowerCase()],
        status: AssigneeStatus.ACTIVE,
      },
      submitHandler: submitReqUnpublished,
    });
    setShowAssigneeBox(true);
  };
  const submitData = async (data) => {
    try {
      setLoading(true);
      const body = {
        ...OSData,
        status: GLOBAL_STATUS.SUBMITTED,
        oemSecurityUpdateDate: serverFormatDateDayjs(
          OSData.oemSecurityUpdateDate
        ),
        latestSecurityUpdate: serverFormatDateDayjs(
          OSData.latestSecurityUpdate
        ),
        latestReleaseDate: serverFormatDateDayjs(OSData.latestReleaseDate),
        lastSecUpdateReleasedId: serverFormatDateDayjs(
          OSData.lastSecUpdateReleasedId
        ),
        eolDate: serverFormatDateDayjs(OSData.eolDate),
        updatedOn: dateTransform(new Date()),
        requestedOn: dateTransform(new Date()),
        updatedBy: auth.userDetails.email,
        requestedBy: auth.userDetails.email,
        approvedOn: null,
        approvedBy: null,
        comments: [
          {
            commentDescription: data.commentDescription,
            email: data.email,
            updatedOn: dateTransform(new Date()),
          },
        ],
        assignee: data.assignee,
      };
      if (pageType === PAGE_TYPE.CREATE) {
        await createSingleOS({
          ...body,
        });
        toast.success(`${OSData.osName} created successfully`);
      } else if (pageType === PAGE_TYPE.EDIT) {
        await updateSingleOS({
          osId: id,
          ...body,
        });
        toast.success(`${OSData.osName} updated successfully`);
      }
      navigate(`/${screenType}/os`);
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (isDataValidOs(OSData, error, setError, "approval")) return;
    setAssigneeData({
      permissionData: {
        permissionName: [PERMISSION_MAPPING.APPROVER],
        permissionTitle: [FEATURE_MAPPING.OS.toLowerCase()],
        status: AssigneeStatus.ACTIVE,
      },
      submitHandler: submitData,
    });
    setShowAssigneeBox(true);
  };

  const commentHandler = async (data) => {
    setLoading(true);
    try {
      await updateSingleOS({
        osId: OSData.osId,
        comments: [data],
        updatedBy: OSData.updatedBy,
        updatedOn: OSData.updatedOn,
        requestedBy: OSData.requestedBy,
        requestedOn: OSData.requestedOn,
        approvedOn: OSData.approvedOn,
        approvedBy: OSData.approvedBy,
        assignee: OSData.assignee,
        status: OSData.status,
      });
      await queryClient.invalidateQueries(
        OS_QUERY_KEY.GET_SINGLE_OS,
        OSData.osId
      );
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-os-container">
      <CommonHeader
        backArrow="/inventory/os"
        label="New OS"
        ticketInput={OSData}
        handleTicketValue={setOSData}
        handleCancel={handleCancel}
        handleApproval={
          screenType === SCREEN_TYPE.APPROVAL &&
          accessToApproval("OS", auth, OSData)
            ? onApproval
            : undefined
        }
        handleReject={
          screenType === SCREEN_TYPE.APPROVAL &&
          accessToApproval("OS", auth, OSData)
            ? onReject
            : undefined
        }
        {...(screenType === SCREEN_TYPE.APPROVAL && {
          handleAdvise: accessToApproval("OS", auth, OSData)
            ? handleAdviseA
            : undefined,
        })}
        handleApprovalDevice={handleApprovalOs}
        handleRejectApprovalDevice={handleRejectOs}
        openOverlay={openOverlay}
        closeOverlay={() => setOpenOverlay(false)}
        overlayData={overlayData}
        handleSaveDraft={pageType !== PAGE_TYPE.VIEW && handleSaveDraft}
        handleSubmit={pageType !== PAGE_TYPE.VIEW && handleSubmit}
        {...((pageType === PAGE_TYPE.CREATE || pageType === PAGE_TYPE.EDIT) && {
          handleAdvise: handleAdviseC,
        })}
        handleAssinee={
          screenType === SCREEN_TYPE.ADVISOR &&
          accessToAssignBack("OS", auth, OSData)
            ? handleAssinee
            : undefined
        }
        status={true}
        {...(accessToEdit("OS", auth, OSData) && pageType === PAGE_TYPE.VIEW
          ? { handleEdit: () => navigate(`/inventory/os/edit/${id}`) }
          : {})}
        {...(screenType === SCREEN_TYPE.INVENTORY &&
          pageType === PAGE_TYPE.VIEW &&
          OSData.status === GLOBAL_STATUS.APPROVED && {
            handleReqUnPublished: auth.screens[FEATURE_MAPPING["OS"]].includes(
              PERMISSION_MAPPING.UPDATE
            )
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
      {id && id !== "" && singleOs.isLoading ? (
        <TopBarProgress />
      ) : (
        <div className="os-block-wrapper">
          <CreateOSForm
            OSData={OSData}
            setOSData={setOSData}
            error={error}
            setError={setError}
          />
        </div>
      )}
    </div>
  );
};

export default CreateOS;
