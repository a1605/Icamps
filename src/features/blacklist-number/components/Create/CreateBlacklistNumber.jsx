import React, { useState } from "react";
import CommonHeader from "../../../../common/components/CommonHeader/CommonHeader";
import { useNavigate, useParams } from "react-router-dom";
import BlacklistForm from "./BlacklistForm";
import { useAuth } from "../../../../common/hooks/useAuth";
import {
  GLOBAL_STATUS,
  SCREEN_TYPE,
  PAGE_TYPE,
  PERMISSION_MAPPING,
  FEATURE_MAPPING,
  AssigneeStatus,
} from "../../../../common/global.constant";
import {
  createSingleBlacklist,
  updateSingleBlacklistNumber,
} from "../../services/blacklisting-number-services";
import "../../../../App.scss";
import { dateTransform } from "../../../../common/helperFunction/dateTransform";
import { toast } from "react-hot-toast";
import {
  APPROVAL_BLACKLIST_QUERY_KEY,
  CHANGE_VALUE_ADVISOR,
  CHANGE_VALUE_APPROVAL,
  CHANGE_VALUE_REJECT,
  INVENTORY_QUERY_KEY,
  OVERLAY_APPROVAL_DATA,
  OVERLAY_REJECT_DATA,
} from "../../blacklist-number.constant";
import { useQueryClient } from "@tanstack/react-query";
import { statusAssigneeHandle } from "../../../../common/helperFunction/statusHelper";
import AssigneeBox from "../../../../common/components/assigneeBox/AssigneeBox";
import { isDataValidBlackList } from "../../blacklist-number-helper";
import {
  accessToApproval,
  accessToAssignBack,
  accessToEdit,
} from "../../../../common/global.validation";

const CreateBlacklistNumber = () => {
  const { auth, error, setError, loading, setLoading } = useAuth();
  const queryClient = useQueryClient();

  const { id, screenType, pageType } = useParams();
  const [blacklistData, setBlacklistData] = useState({
    sourceTicketId: "",
    scammerTitle: "",
    mobileFraudCategory: "",
    source: "",
    mobileNumber: "",
    countryDetailId: "",
    status: GLOBAL_STATUS.DRAFT,
    updatedOn: dateTransform(new Date()),
    requestedBy: null,
    requestedOn: null,
    approvedOn: null,
    approvedBy: null,
    assignee: `${auth.userDetails.email.toLowerCase()}`,
    updatedBy: `${auth.userDetails.email.toLowerCase()}`,
  });

  // Assignee Box
  const [showAssigneeBox, setShowAssigneeBox] = useState(false);
  const [assigneeData, setAssigneeData] = useState({
    permissionData: {},
    submitHandler: () => {},
  });

  const navigate = useNavigate();

  const [overlayData, setOverlayData] = React.useState(OVERLAY_REJECT_DATA);
  const [openOverlay, setOpenOverlay] = React.useState(false);

  const onReject = (blacklistData) => {
    setOverlayData({ ...OVERLAY_REJECT_DATA, blacklistData: blacklistData });
    setOpenOverlay(true);
  };

  const onApproval = (blacklistData) => {
    setOverlayData({ ...OVERLAY_APPROVAL_DATA, blacklistData: blacklistData });
    setOpenOverlay(true);
  };

  const handleApprovalNumber = async () => {
    try {
      setLoading(true);
      let commentdata = [];
      commentdata.push({
        commentDescription: "Approved",
        email: auth.userDetails.email,
        updatedOn: dateTransform(new Date()),
      });
      await updateSingleBlacklistNumber({
        ...blacklistData,
        status: CHANGE_VALUE_APPROVAL[blacklistData.status],
        comments: commentdata,
        approvedOn: dateTransform(new Date()),
        approvedBy: auth.userDetails.email,
        assignee: blacklistData.updatedBy,
        requestedBy: null,
        requestedOn: null,
      });
      queryClient.invalidateQueries([
        APPROVAL_BLACKLIST_QUERY_KEY.LISTING_KEY,
        1,
      ]);
      setOpenOverlay(false);
      navigate(`/inventory/${screenType}/blacklistedNumber`);
    } catch (err) {
      toast.error(JSON.parse(err.request.response).message);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (data, checkBoxBool, comment) => {
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
      setLoading(true);
      const bodyToSend = {
        ...blacklistData,
        comments: commentdata,
        status: CHANGE_VALUE_REJECT[blacklistData.status],
        assignee: blacklistData.updatedBy,
        requestedBy: null,
        requestedOn: null,
      };
      await updateSingleBlacklistNumber(bodyToSend);
      queryClient.invalidateQueries([
        APPROVAL_BLACKLIST_QUERY_KEY.LISTING_KEY,
        1,
      ]);
      setOpenOverlay(false);
      navigate(`/inventory/${screenType}/blacklistedNumber`);
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
        ...blacklistData,
        status: GLOBAL_STATUS.SUBMITTED,
        updatedBy: blacklistData.updatedBy,
        updatedOn: dateTransform(new Date()),
        requestedOn: dateTransform(new Date()),
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
      if (pageType === "create") {
        await createSingleBlacklist({
          ...body,
        });
        toast.success("Mobile Number registered successfully");
      } else if (pageType === "edit") {
        await updateSingleBlacklistNumber({
          blackListedNumberId: id,
          ...body,
        });
        toast.success("Mobile Number updated successfully");
      }
      navigate("/inventory/blacklistedNumber");
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };
  const submitReqUnpublished = async (data) => {
    try {
      setLoading(true);
      await updateSingleBlacklistNumber({
        blackListedNumberId: id,
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
            updatedOn: dateTransform(new Date()),
          },
        ],
      });
      navigate("/inventory/blacklistedNumber");
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
        permissionTitle: [FEATURE_MAPPING.BLACKLISTED_NUMBER.toLowerCase()],
        status: AssigneeStatus.ACTIVE,
      },
      submitHandler: submitReqUnpublished,
    });
    setShowAssigneeBox(true);
  };
  const handleSubmit = async () => {
    if (isDataValidBlackList(blacklistData, setError)) return;
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

  const handleSaveDraft = async () => {
    if (isDataValidBlackList(blacklistData, setError)) return;

    try {
      setLoading(true);
      if (pageType === "create")
        await createSingleBlacklist({
          ...blacklistData,
          sourceTicketId: blacklistData.sourceTicketId,
          scammerTitle: blacklistData.scammerTitle,
          mobileFraudCategory: blacklistData.mobileFraudCategory,
          source: blacklistData.source,
          mobileNumber: blacklistData.mobileNumber,
          countryDetailId: blacklistData.countryDetailId,
          status: GLOBAL_STATUS.DRAFT,
          updatedBy: auth.userDetails.email,
          updatedOn: dateTransform(new Date()),
          requestedBy: null,
          requestedOn: null,
          approvedOn: null,
          approvedBy: null,
          comments: null
        });
      else if (pageType === "edit")
        await updateSingleBlacklistNumber({
          ...blacklistData,
          id: id,
          sourceTicketId: blacklistData.sourceTicketId,
          scammerTitle: blacklistData.scammerTitle,
          mobileFraudCategory: blacklistData.mobileFraudCategory,
          source: blacklistData.source,
          mobileNumber: blacklistData.mobileNumber,
          countryDetailId: blacklistData.countryDetails.countryDetailId,
          updatedBy: blacklistData.updatedBy,
          updatedOn: dateTransform(new Date()),
          status: GLOBAL_STATUS.DRAFT,
          comments: null
        });
      navigate("/inventory/blacklistedNumber");
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };

  const submitAdviseC = async (data) => {
    try {
      setLoading(true);
      const body = {
        ...blacklistData,
        status: GLOBAL_STATUS.ADVICE_C,
        updatedBy: blacklistData.updatedBy,
        updatedOn: dateTransform(new Date()),
        requestedOn: dateTransform(new Date()),
        requestedBy: auth.userDetails.email,
        comments: [
          {
            commentDescription: data.commentDescription,
            email: data.email,
            updatedOn: dateTransform(new Date()),
          },
        ],
        assignee: data.assignee,
      };
      if (!id) {
        await createSingleBlacklist({
          ...body,
        });
        navigate("/inventory/blacklistedNumber");
      } else {
        await updateSingleBlacklistNumber({
          id: blacklistData.blackListedNumberId,
          ...body,
        });
        navigate("/inventory/blacklistedNumber");
      }
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdviseC = () => {
    if (isDataValidBlackList(blacklistData, setError)) return;

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
      await updateSingleBlacklistNumber({
        blackListedNumberId: id,
        status: GLOBAL_STATUS.ADVICE_A,
        requestedBy: auth.userDetails.email,
        requestedOn: dateTransform(new Date()),
        comments: [
          {
            commentDescription: data.commentDescription,
            email: data.email,
            updatedOn: dateTransform(new Date()),
          },
        ],
        assignee: data.assignee,
      });
      navigate("/inventory/approval/blacklistedNumber");
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

  const handleCancel = () => {
    if (screenType !== undefined) {
      navigate(`/inventory/${screenType}/blacklistedNumber`);
      return;
    }
    navigate(`/inventory/blacklistedNumber`);
  };
  const handleAssinee = async () => {
    try {
      setLoading(true);
      let commentdata = [];
      commentdata.push({
        commentDescription: "Assigning Back",
        email: auth.userDetails.email,
        updatedOn: dateTransform(new Date()),
      });
      await updateSingleBlacklistNumber({
        blackListedNumberId: id,
        assignee:
          blacklistData?.status === GLOBAL_STATUS.ADVICE_C
            ? blacklistData?.updatedBy
            : blacklistData?.requestedBy,
        comments: commentdata,
        status: statusAssigneeHandle(
          blacklistData?.status,
          blacklistData?.approvedBy
        ),
        requestedBy:
          blacklistData.status === GLOBAL_STATUS.ADVICE_A
            ? blacklistData.updatedBy
            : null,
        requestedOn:
          blacklistData.status === GLOBAL_STATUS.ADVICE_A
            ? blacklistData.updatedOn
            : null,
      });
      queryClient.invalidateQueries([
        APPROVAL_BLACKLIST_QUERY_KEY.LISTING_KEY,
        1,
      ]);
      setOpenOverlay(false);
      navigate(`/inventory/advisor/blacklistedNumber`);
    } catch (err) {
      toast.error(JSON.parse(err.request.response).message);
    } finally {
      setLoading(false);
    }
  };

  const commentHandler = async (data) => {
    setLoading(true)
    try {
      await updateSingleBlacklistNumber({
        blackListedNumberId: blacklistData.blackListedNumberId,
        comments: [data],
        updatedBy: blacklistData.updatedBy,
        updatedOn: blacklistData.updatedOn,
        requestedBy: blacklistData.requestedBy,
        requestedOn: blacklistData.requestedOn,
        approvedOn: blacklistData.approvedOn,
        approvedBy: blacklistData.approvedBy,
        assignee: blacklistData.assignee,
        status: blacklistData.status,
      });
      await queryClient.invalidateQueries(
        INVENTORY_QUERY_KEY.BLACKLIST_SINGLE_VIEW,
        blacklistData.blackListedNumberId
      );
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <CommonHeader
        backArrow="/inventory/blacklistedNumber"
        label="New Blacklisted Number"
        ticketInput={blacklistData}
        handleTicketValue={setBlacklistData}
        handleCancel={handleCancel}
        {...(screenType === SCREEN_TYPE.ADVISOR && {
          handleAssinee: accessToAssignBack(
            "BLACKLISTED_NUMBER",
            auth,
            blacklistData
          )
            ? handleAssinee
            : undefined,
        })}
        {...(screenType === SCREEN_TYPE.APPROVAL &&
          pageType !== PAGE_TYPE.CREATE && {
            handleApproval: accessToApproval(
              "BLACKLISTED_NUMBER",
              auth,
              blacklistData
            )
              ? onApproval
              : undefined,
          })}
        {...(screenType === SCREEN_TYPE.APPROVAL &&
          pageType !== PAGE_TYPE.CREATE && {
            handleReject: accessToApproval(
              "BLACKLISTED_NUMBER",
              auth,
              blacklistData
            )
              ? onReject
              : undefined,
          })}
        {...(screenType === SCREEN_TYPE.APPROVAL && {
          handleAdvise: accessToApproval(
            "BLACKLISTED_NUMBER",
            auth,
            blacklistData
          )
            ? handleAdviseA
            : undefined,
        })}
        handleApprovalDevice={handleApprovalNumber}
        handleRejectApprovalDevice={handleReject}
        openOverlay={openOverlay}
        closeOverlay={() => setOpenOverlay(false)}
        overlayData={overlayData}
        handleSaveDraft={pageType !== PAGE_TYPE.VIEW && handleSaveDraft}
        handleSubmit={pageType !== PAGE_TYPE.VIEW && handleSubmit}
        {...((pageType === PAGE_TYPE.CREATE || pageType === PAGE_TYPE.EDIT) && {
          handleAdvise: handleAdviseC,
        })}
        {...(pageType === PAGE_TYPE.VIEW &&
         
          accessToEdit("BLACKLISTED_NUMBER", auth, blacklistData) && {
            handleEdit: () =>
              navigate(`/inventory/blacklistedNumber/edit/${id}`),
          })}
        {...(screenType === undefined &&
          pageType === PAGE_TYPE.VIEW &&
          blacklistData.status === GLOBAL_STATUS.APPROVED && {
            handleReqUnPublished: auth.screens[
              FEATURE_MAPPING["BLACKLISTED_NUMBER"]
            ].includes(PERMISSION_MAPPING.UPDATE)
              ? handleSubmitReqUnPublished
              : undefined,
          })}
        status={true}
        commentHandler={commentHandler}
      />
      {showAssigneeBox && (
        <AssigneeBox
          setShowBox={setShowAssigneeBox}
          assigneeBoxData={assigneeData}
        />
      )}
      <hr></hr>

      <BlacklistForm
        blacklistData={blacklistData}
        setBlacklistData={setBlacklistData}
      />
    </>
  );
};

export default CreateBlacklistNumber;
