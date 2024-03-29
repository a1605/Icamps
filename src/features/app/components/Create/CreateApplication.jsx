import React, { useState } from "react";
import CommonHeader from "../../../../common/components/CommonHeader/CommonHeader";
import ApplicationForm from "./ApplicationForm";
import { useNavigate, useParams } from "react-router-dom";
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
import { toast } from "react-hot-toast";
import {
  createSingleApp,
  updateSingleApplication,
} from "../../Services/appServices";
import { useFetchSingleApp } from "../../hooks/useFetchSingleApp";
import {
  APPROVAL_APP_QUERY_KEY,
  CHANGE_VALUE_APPROVAL,
  CHANGE_VALUE_REJECT,
  OVERLAY_APPROVAL_DATA,
  OVERLAY_REJECT_DATA,
  statusAssigneeHandle,
  INVENTORY_QUERY_KEY,
} from "../../app.constant";
import { useQueryClient } from "@tanstack/react-query";
import { isDataValidApp } from "../../application.helper";
import AssigneeBox from "../../../../common/components/assigneeBox/AssigneeBox";
import { uploadImage } from "../../../../services/imageUpload";
import {
  accessToApproval,
  accessToAssignBack,
  accessToEdit,
} from "../../../../common/global.validation";

function CreateApplication() {
  const { auth, error, setError, loading, setLoading } = useAuth();
  const { id, pageType, screenType } = useParams();
  const [overlayData, setOverlayData] = React.useState(OVERLAY_REJECT_DATA);
  const [openOverlay, setOpenOverlay] = React.useState(false);

  const [appData, setAppData] = useState({
    applicationName: "",
    version: "",
    versionCode: "",
    appUpdateDate: defaultDateDayjs(null),
    publisher: "",
    imageIconPath: "",
    minimumRequeiredOs: "",
    thirdPartyLibraries: [],
    permissionsRequired: [],
    appPublishers: [],
    uniqIdentifier: "",
    maxVersion: "",
    maxVersionCode: "",
    targetApi: "",
    appType: "",
    appSubTypes: [],
    sourceTicketId: "",
    requestedBy: null,
    requestedOn: null,
    approvedOn: null,
    approvedBy: null,
    assignee: `${auth.userDetails.email.toLowerCase()}`,
    updatedBy: `${auth.userDetails.email.toLowerCase()}`,
    updatedOn: dateTransform(new Date()),
    status: GLOBAL_STATUS.DRAFT,
  });
  // Assignee Box
  const [showAssigneeBox, setShowAssigneeBox] = useState(false);
  const [assigneeData, setAssigneeData] = useState({
    permissionData: {},
    submitHandler: () => {},
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const singleApplication = useFetchSingleApp(id);
  const handleFileUpload = async (data) => {
    try {
      const formData = new FormData();

      formData.append("file", data);
      const resp = await uploadImage(formData);
      return resp;
    } catch (error) {
      toast.error("Error while uploading image");
      return false;
    }
  };

  const handleCancel = () => {
    if (screenType !== undefined) {
      navigate(`/inventory/${screenType}/apps`);
      return;
    }
    navigate("/inventory/apps");
  };

  const onReject = (appData) => {
    setOverlayData({ ...OVERLAY_REJECT_DATA, appData: appData });
    setOpenOverlay(true);
  };

  const handleAppApproval = async () => {
    try {
      let commentdata = [];
      commentdata.push({
        commentDescription: "Approved",
        email: auth.userDetails.email,
        updatedOn: dateTransform(new Date()),
      });
      setLoading(true);
      await updateSingleApplication({
        applicationId: appData.applicationId,
        comments: commentdata,
        status: CHANGE_VALUE_APPROVAL[appData.status],
        approvedOn: dateTransform(new Date()),
        approvedBy: auth.userDetails.email,
        assignee: appData.updatedBy,
        requestedBy: null,
        requestedOn: null,
      });
      queryClient.invalidateQueries([APPROVAL_APP_QUERY_KEY.LISTING_KEY, 1]);
      setOpenOverlay(false);
      navigate("/inventory/approval/apps");
    } catch (err) {
      toast.error(JSON.parse(err.request.response).message);
    } finally {
      setLoading(false);
    }
  };

  const handleAppReject = async (data, checkBoxBool, comment) => {
    try {
      let commentdata = [];
      if (appData.imageIconPath && typeof appData.imageIconPath === "object") {
        const resp = await handleFileUpload(appData.imageIconPath);
        if (resp?.data) {
          body = {
            ...body,
            imagePath: "",
            imageIconPath: resp?.data,
          };
        } else return;
      }
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
        applicationId: appData.applicationId,
        comments: commentdata,
        status: CHANGE_VALUE_REJECT[appData.status],
        assignee: appData.updatedBy,
        requestedBy: null,
        requestedOn: null,
      };
      setLoading(true);
      await updateSingleApplication(bodyToSend);
      queryClient.invalidateQueries([APPROVAL_APP_QUERY_KEY.LISTING_KEY, 1]);
      setOpenOverlay(false);
      navigate("/inventory/approval/apps");
    } catch (err) {
      toast.error(JSON.parse(err.request.response).message);
    } finally {
      setLoading(false);
    }
  };

  const submitReqUnpublished = async (data) => {
    try {
      setLoading(true);
      await updateSingleApplication({
        applicationId: id,
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
      navigate("/inventory/apps");
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
        permissionTitle: [FEATURE_MAPPING.APPS.toLowerCase()],
        status: AssigneeStatus.ACTIVE,
      },
      submitHandler: submitReqUnpublished,
    });
    setShowAssigneeBox(true);
  };

  const submitAdviseC = async (data) => {
    try {
      setLoading(true);
      let body = {
        ...appData,
        applicationId: appData.applicationId,
        status: GLOBAL_STATUS.ADVICE_C,
        appUpdateDate: issueFixDateTransform(appData.appUpdateDate),
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
        appPublishers: appPublishers(),
        assignee: data.assignee,
      };
      if (appData.imageIconPath && typeof appData.imageIconPath === "object") {
        const resp = await handleFileUpload(appData.imageIconPath);
        if (resp?.data) {
          body = {
            ...body,
            imagePath: resp?.data,
            imageIconPath: resp?.data,
          };
        } else return;
      }
      if (!id) {
        await createSingleApp({
          ...body,
        });
        navigate("/inventory/apps");
      } else {
        await updateSingleApplication({
          ...body,
          appUpdateDate: serverFormatDateDayjs(appData.appUpdateDate),
        });
        navigate("/inventory/apps");
      }
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdviseC = () => {
    if (isDataValidApp(appData, error, setError, "advice")) return;

    setAssigneeData({
      permissionData: {
        permissionName: [PERMISSION_MAPPING.ADVISOR],
        permissionTitle: [FEATURE_MAPPING.APPS.toLowerCase()],
        status: AssigneeStatus.ACTIVE,
      },
      submitHandler: submitAdviseC,
    });
    setShowAssigneeBox(true);
  };
  const appPublishers = () => {
    return appData.appPublishers.toString().length > 0
      ? [appData.appPublishers].flat()
      : appData.appPublishers;
  };
  const submitAdviseA = async (data) => {
    try {
      setLoading(true);
      await updateSingleApplication({
        applicationId: appData.applicationId,
        appPublishers: appPublishers(),
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
      });
      if (appData.imageIconPath && typeof appData.imageIconPath === "object") {
        const resp = await handleFileUpload(appData.imageIconPath);
        if (resp?.data) {
          body = {
            ...body,
            imagePath: "",
            imageIconPath: resp?.data,
          };
        } else return;
      }
      navigate("/inventory/approval/apps");
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
        permissionTitle: [FEATURE_MAPPING.APPS.toLowerCase()],
        status: AssigneeStatus.ACTIVE,
      },
      submitHandler: submitAdviseA,
    });
    setShowAssigneeBox(true);
  };

  const onApproval = (appData) => {
    setOverlayData({ ...OVERLAY_APPROVAL_DATA, appData: appData });
    setOpenOverlay(true);
  };

  const handleSaveDraft = async () => {
    if (isDataValidApp(appData, error, setError, "draft")) return;

    let body = {
      ...appData,
      status: GLOBAL_STATUS.DRAFT,
      appUpdateDate: issueFixDateTransform(appData.appUpdateDate),
      assignee: appData.assignee,
      updatedOn: dateTransform(new Date()),
      updatedBy: auth.userDetails.email,
      appPublishers: appPublishers(),
      requestedBy: null,
      requestedOn: null,
      approvedOn: null,
      approvedBy: null,
      comments: null
    };

    if (appData.imageIconPath && typeof appData.imageIconPath === "object") {
      const resp = await handleFileUpload(appData.imageIconPath);
      if (resp?.data) {
        body = {
          ...body,
          imagePath: "",
          imageIconPath: resp?.data,
        };
      } else return;
    }

    
    try {
      setLoading(true);
      if (!(id && id !== ""))
        await createSingleApp({
          ...body,
        });
      else
        await updateSingleApplication({
          ...body,
          updatedOn: dateTransform(new Date()),
          appUpdateDate: serverFormatDateDayjs(appData.appUpdateDate),
        });
      navigate("/inventory/apps");

     

      
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignee = async () => {
    try {
      let commentdata = [];
      commentdata.push({
        commentDescription: "Assigning Back",
        email: auth.userDetails.email,
        updatedOn: dateTransform(new Date()),
      });
      setLoading(true);
      await updateSingleApplication({
        applicationId: appData.applicationId,
        assignee:
          appData?.status === GLOBAL_STATUS.ADVICE_C
            ? appData?.updatedBy
            : appData?.requestedBy,
        status: statusAssigneeHandle(appData?.status, appData?.approvedBy),
        comments: commentdata,
        requestedBy:
          appData.status === GLOBAL_STATUS.ADVICE_A ? appData?.updatedBy : null,
        requestedOn:
          appData.status === GLOBAL_STATUS.ADVICE_A ? appData?.updatedOn : null,
      });
      queryClient.invalidateQueries([APPROVAL_APP_QUERY_KEY.LISTING_KEY, 1]);
      setOpenOverlay(false);
      navigate(`/inventory/advisor/apps`);
    } catch (err) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };

  const submitData = async (data) => {
    try {
      setLoading(true);
      let body = {
        ...appData,
        applicationId: appData.applicationId,
        appUpdateDate: issueFixDateTransform(appData.appUpdateDate),
        status: GLOBAL_STATUS.SUBMITTED,
        updatedOn: dateTransform(new Date()),
        updatedBy: auth.userDetails.email,
        requestedOn: dateTransform(new Date()),
        requestedBy: auth.userDetails.email,
        appPublishers: appPublishers(),
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
      if (appData.imageIconPath && typeof appData.imageIconPath === "object") {
        const resp = await handleFileUpload(appData.imageIconPath);
        if (resp?.data) {
          body = {
            ...body,
            imagePath: "",
            imageIconPath: resp?.data,
          };
        } else return;
      }

      if (pageType === PAGE_TYPE.CREATE) {
        await createSingleApp({
          ...body,
        });
        toast.success("App is created successfully");
      } else if (pageType === PAGE_TYPE.EDIT) {
        await updateSingleApplication({
          ...body,
        });
        toast.success("App is updated successfully");
      }
      navigate("/inventory/apps");
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (isDataValidApp(appData, error, setError, "approval")) return;
    setAssigneeData({
      permissionData: {
        permissionName: [PERMISSION_MAPPING.APPROVER],
        permissionTitle: [FEATURE_MAPPING.APPS.toLowerCase()],
        status: AssigneeStatus.ACTIVE,
      },
      submitHandler: submitData,
    });
    setShowAssigneeBox(true);
  };

  const commentHandler = async (data) => {
    setLoading(true)
    try {
      await updateSingleApplication({
        applicationId: appData.applicationId,
        comments: [data],
        assignee: appData.assignee,
        updatedBy: appData.updatedBy,
        updatedOn: appData.updatedOn,
        requestedBy: appData.requestedBy,
        requestedOn: appData.requestedOn,
        approvedOn: appData.approvedOn,
        approvedBy: appData.approvedBy,
        status: appData.status,
      });
      await queryClient.invalidateQueries(
        INVENTORY_QUERY_KEY.EDIT_APP,
        appData.applicationId
      );
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="create-wrapper">
      <CommonHeader
        backArrow="/inventory/apps"
        label="New Apps"
        ticketInput={appData}
        handleTicketValue={setAppData}
        handleCancel={handleCancel}
        {...(screenType === SCREEN_TYPE.ADVISOR && {
          handleAssinee: accessToAssignBack("APPS", auth, appData)
            ? handleAssignee
            : undefined,
        })}
        {...(screenType === SCREEN_TYPE.APPROVAL &&
          pageType !== PAGE_TYPE.CREATE && {
            handleApproval: accessToApproval("APPS", auth, appData)
              ? onApproval
              : undefined,
          })}
        {...(screenType === SCREEN_TYPE.APPROVAL &&
          pageType !== PAGE_TYPE.CREATE && {
            handleReject: accessToApproval("APPS", auth, appData)
              ? onReject
              : undefined,
          })}
        handleApprovalDevice={handleAppApproval}
        handleRejectApprovalDevice={handleAppReject}
        openOverlay={openOverlay}
        closeOverlay={() => setOpenOverlay(false)}
        overlayData={overlayData}
        {...(pageType !== PAGE_TYPE.VIEW && {
          handleSaveDraft: handleSaveDraft,
        })}
        {...(pageType !== PAGE_TYPE.VIEW && { handleSubmit: handleSubmit })}
        {...((pageType === PAGE_TYPE.CREATE || pageType === PAGE_TYPE.EDIT) && {
          handleAdvise: handleAdviseC,
        })}
        {...(screenType === SCREEN_TYPE.APPROVAL && {
          handleAdvise: accessToApproval("APPS", auth, appData)
            ? handleAdviseA
            : undefined,
        })}
        {...(pageType === PAGE_TYPE.VIEW &&
          screenType === undefined &&
          accessToEdit("APPS", auth, appData) && {
            handleEdit: () => navigate(`/inventory/apps/edit/${id}`),
          })}
        status={true}
        {...(screenType === undefined &&
          pageType === PAGE_TYPE.VIEW &&
          appData.status === GLOBAL_STATUS.APPROVED && {
            handleReqUnPublished: auth.screens[
              FEATURE_MAPPING["APPS"]
            ].includes(PERMISSION_MAPPING.UPDATE)
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
      <ApplicationForm
        error={error}
        setError={setError}
        appData={appData}
        setAppData={setAppData}
        appInfo={singleApplication?.data?.data}
      />
    </div>
  );
}

export default CreateApplication;
