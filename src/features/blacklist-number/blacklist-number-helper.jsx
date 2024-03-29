import ActionButton from "../../common/components/actionButton/ActionButton";
import StatusBadge from "../../common/components/statusBadge/StatusBadge";
import {
  GLOBAL_STATUS,
  PERMISSION_MAPPING,
  SCREEN_TYPE,
} from "../../common/global.constant";
import AssigneeTextField from "../../common/components/assigneeTextField/AssigneeTextField";
import { onlyDateTransform } from "../../common/helperFunction/dateTransform";
import {
  accessToApproval,
  accessToChangeAssignee,
  accessToEdit,
  accessToMenu,
  accessToMenuUpdate,
} from "../../common/global.validation";
import { useAuth } from "../../common/hooks/useAuth";

export const transformTableData = ({
  data,
  onEdit,
  onView,
  onDelete,
  onCancelRequest,
  onUnPublish,
  screenType,
  onApproval,
  onReject,
  handleAssigneeChange,
}) => {
  if (!data) return [];
  const { auth } = useAuth();
  let arr = [];
  data.map((item) => {
    const cancelSet = new Set([
      GLOBAL_STATUS.SUBMITTED,
      GLOBAL_STATUS.ADVICE_C,
      GLOBAL_STATUS.REQ_UNPUBLISHED,
    ]);
    let statusFunc, dialogText, dialogTitle, menuText;
    if (
      item.status === GLOBAL_STATUS.DRAFT ||
      item.status === GLOBAL_STATUS.REJECTED ||
      item.status == GLOBAL_STATUS.UNPUBLISHED
    ) {
      statusFunc = onDelete;
      dialogText = "Are you sure you want to Delete?";
      dialogTitle = "Delete Confirmation";
      menuText = "Delete";
    } else if (cancelSet.has(item.status)) {
      statusFunc = onCancelRequest;
      dialogText = "Are you sure you want to cancel request?";
      dialogTitle = "Request Cancellation";
      menuText = "Cancel Request";
    } else if (item.status === GLOBAL_STATUS.APPROVED) {
      statusFunc = onUnPublish;
      dialogText = "Are you sure you want to Request Unpublish?";
      dialogTitle = "Request Unpublish Confirmation";
      menuText = "Request Unpublish";
    }
    const handlePermission = (screenType) => {
      if (screenType === SCREEN_TYPE.APPROVAL) {
        return PERMISSION_MAPPING.APPROVER;
      } else if (screenType === SCREEN_TYPE.ADVISOR) {
        return PERMISSION_MAPPING.ADVISOR;
      } else return PERMISSION_MAPPING.UPDATE;
    };
    arr.push({
      ...item,
      id: item.blackListedNumberId,
      sourceTicketId:
        item?.sourceTicketId?.length > 0
          ? item?.sourceTicketId.split("/").pop()
          : item.sourceTicketId,
      countryCode:
        item.countryDetails?.countryCode && item.countryDetails?.countryName
          ? `${item.countryDetails?.countryCode} ${item.countryDetails?.countryName}`
          : "",
      mobileNumber: <p style={{ textAlign: "left" }}>{item.mobileNumber}</p>,

      assignee: (
        <AssigneeTextField
          name={item.userAssigneeResponse}
          show={
            !(
              screenType === SCREEN_TYPE.APPROVAL ||
              screenType === SCREEN_TYPE.ADVISOR
            )
              ? accessToChangeAssignee("BLACKLISTED_NUMBER", auth, item)
              : accessToChangeAssignee(
                  "BLACKLISTED_NUMBER",
                  auth,
                  item,
                  screenType
                )
          }
          permission={handlePermission(screenType)}
          type="BLACKLISTED_NUMBER"
          handleAssigneeChange={handleAssigneeChange}
          id={item.blackListedNumberId}
          status={item.status}
        />
      ),
      updatedOn: onlyDateTransform(item.updatedOn),
      requestedOn: onlyDateTransform(item.requestedOn),
      action: (
        <ActionButton
          data={item}
          {...(accessToEdit("BLACKLISTED_NUMBER", auth, item) &&
          screenType !== SCREEN_TYPE.APPROVAL &&
          screenType !== SCREEN_TYPE.ADVISOR
            ? { onEdit: onEdit }
            : {
                onEdit:
                  screenType !== SCREEN_TYPE.APPROVAL &&
                  screenType !== SCREEN_TYPE.ADVISOR
                    ? "no-edit"
                    : false,
              })}
          onView={onView}
          {...(accessToMenu("BLACKLISTED_NUMBER", auth, item)
            ? screenType !== SCREEN_TYPE.APPROVAL &&
              screenType !== SCREEN_TYPE.ADVISOR
              ? { showMenu: true }
              : { showMenu: "no-edit" }
            : { showMenu: false })}
          onStatusChange={statusFunc}
          dialogText={dialogText}
          dialogTitle={dialogTitle}
          menuText={menuText}
          {...(screenType === SCREEN_TYPE.APPROVAL
            ? {
                onReject: accessToApproval("BLACKLISTED_NUMBER", auth, item)
                  ? onReject
                  : undefined,
              }
            : null)}
          {...(screenType === SCREEN_TYPE.APPROVAL
            ? {
                onApproval: accessToApproval("BLACKLISTED_NUMBER", auth, item)
                  ? onApproval
                  : undefined,
              }
            : null)}
          permissionTitle="blacklisted number"
        />
      ),
      status: <StatusBadge status={item.status} />,
    });
  });
  return arr;
};

export const transformManuSourceData = (data) => {
  if (!data) return [];
  let arr = [
    {
      id: "",
      label: "",
    },
  ];
  data.map((item) => {
    if (arr.filter((val) => val.id === item.source).length === 0)
      arr.push({
        id: item.source,
        label: item.source,
      });
  });
  return arr;
};

export const transformCountryNameData = (data) => {
  if (!data) return [];
  let arr = [
    {
      id: "",
      label: "",
    },
  ];
  data.map((item) => {
    if (arr.filter((val) => val.id === item.countryDetailId).length === 0)
      arr.push({
        id: item.countryDetailId,
        label: `${item.countryCode} ${item.countryName}`,
      });
  });
  return arr;
};

export const BlacklistDetails = [
  {
    id: "Advertisement",
    label: "Advertisement",
  },
  {
    id: "Transaction",
    label: "Transaction",
  },
];

export const transformIndicatorValue = (data) => {
  if (!data) return [];
  return [
    {
      status: "In Approval",
      count:
        !data.inApproval || data.inApproval === "null" ? 0 : data.inApproval,
      key: GLOBAL_STATUS.SUBMITTED,
    },
    {
      status: "Approved",
      count: !data.approved || data.approved === "null" ? 0 : data.approved,
      key: GLOBAL_STATUS.APPROVED,
    },
    {
      status: "Rejected",
      count: !data.rejected || data.rejected === "null" ? 0 : data.rejected,
      key: GLOBAL_STATUS.REJECTED,
    },
    {
      status: "In Progress",
      count: !data.draft || data.draft === "null" ? 0 : data.draft,
      key: GLOBAL_STATUS.DRAFT,
    },
  ];
};

export const transformIndicatorValueApproval = (data) => {
  if (!data) return [];
  return [
    {
      status: "In Approval",
      count:
        !data.inApproval || data.inApproval === "null" ? 0 : data.inApproval,
      key: GLOBAL_STATUS.ADVICE_C,
    },
    {
      status: "Request Unpublish",
      count:
        !data.reqUnpublished || data.reqUnpublished === "null"
          ? 0
          : data.reqUnpublished,
      key: GLOBAL_STATUS.ADVICE_A,
    },
  ];
};

export const transformIndicatorValueAdvicry = (data) => {
  if (!data) return [];

  return [
    {
      status: "Advice(C)",
      count: !data.adviceC || data.adviceC === "null" ? 0 : data.adviceC,
      key: GLOBAL_STATUS.ADVICE_C,
    },
    {
      status: "Advice(A)",
      count: !data.adviceA || data.adviceA === "null" ? 0 : data.adviceA,
      key: GLOBAL_STATUS.ADVICE_A,
    },
  ];
};

export const isDataValidBlackList = (blacklistData, setError) => {
  let title = [];
  let message = [];
  if (blacklistData.mobileFraudCategory.trim().length === 0) {
    title.push("fraudCategory");
    message.push({
      title: "fraudCategory",
      message: "Fraud Category is required",
    });
  }
  if (blacklistData.countryDetailId?.toString().trim().length === 0) {
    title.push("countryDetails");
    message.push({
      title: "countryDetails",
      message: "Country Details is required",
    });
  }
  if (blacklistData.scammerTitle.trim().length === 0) {
    title.push("scammerTitle");
    message.push({
      title: "scammerTitle",
      message: "Scammer Title is required",
    });
  }

  if (blacklistData.scammerTitle.trim().length > 50) {
    title.push("scammerTitle");
    message.push({
      title: "scammerTitle",
      message: "character more than 50 not allowed",
    });
  }

  if (blacklistData.mobileNumber.toString().length === 0) {
    title.push("mobileNumber");
    message.push({
      title: "mobileNumber",
      message: "Mobile Number is required",
    });
  } else if (blacklistData.mobileNumber.toString().length !== 10) {
    title.push("mobileNumber");
    message.push({
      title: "mobileNumber",
      message: "Invalid Mobile Number",
    });
  }

  if (title.length > 0) {
    setError({
      title: title,
      message: message,
    });
  } else {
    setError({
      title: [],
      message: [],
    });
  }
  return title.length > 0;
};
