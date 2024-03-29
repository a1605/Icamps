import ActionButton from "../../common/components/actionButton/ActionButton";
import StatusBadge from "../../common/components/statusBadge/StatusBadge";
import {
  GLOBAL_STATUS,
  PERMISSION_MAPPING,
} from "../../common/global.constant";
import {
  onlyDateTransform,
  dateTransform,
} from "../../common/helperFunction/dateTransform";
import AssigneeTextField from "../../common/components/assigneeTextField/AssigneeTextField";
import {
  accessToChangeAssignee,
  accessToEdit,
  accessToMenu,
} from "../../common/global.validation";
import { useAuth } from "../../common/hooks/useAuth";

export const transformSingleData = (data, isError) => {
  if (isError || !data || data.length === 0)
    return { first: [], second: [], sourceTicketId: "" };

  return {
    sourceTicketId: data.sourceTicketId,
    status: data.status,
    first: [
      {
        value: data.osName,
        heading: "OS Name",
      },
      {
        value: data.version,
        heading: "Version Number",
      },
      {
        value: dateTransform(data.oemSecurityUpdateDate),
        heading: "OEM Security Update Date",
      },
      {
        value: data.apiVersion,
        heading: "Android API Version",
      },
      {
        value: dateTransform(data.latestReleaseDate),
        heading: "Release date",
      },
      {
        value: data.lastSecUpdateReleasedId,
        heading: "Last Sec Update Released Id",
      },
      {
        value: data.googlePlayServiceVersionName,
        heading: "Google Play Service Version Name",
      },
    ],
    second: [
      {
        value: data.codeName,
        heading: "Android OS codename",
      },
      {
        value: dateTransform(data.aopssecurityUpdateDate),
        heading: "OS (AOSP) Security Update Date",
      },
      {
        value: dateTransform(data.latestSecurityUpdate),
        heading: "Last Security Update Date",
      },
      {
        value: data.relesedBuild,
        heading: "Released Build",
      },
      {
        value: data.latestBuild,
        heading: "Latest Build",
      },
      {
        value: dateTransform(data.eolDate),
        heading: "EOL Date",
      },
      {
        value: data.googlePlayServiceVersionCode,
        heading: "Google Play service Version Code",
      },
    ],
  };
};

export const transformOSDropdownData = (data) => {
  if (!data) return [];
  let newArr = [];
  data?.forEach((item) => {
    newArr.push({
      id: item.osId,
      label: `${item.osName} | ${item.codeName}`,
    });
  });
  return newArr;
};
export const transformManuData = (data) => {
  if (!data) return [];
  let arr = [
    {
      id: "",
      label: "",
    },
  ];
  data.forEach((item) => {
    if (arr.filter((val) => val.id === item.osName).length === 0)
      arr.push({
        id: item.osName,
        label: item.osName,
      });
  });
  return arr;
};
export const transformManuAOSPData = (data) => {
  if (!data) return [];
  let arr = [
    {
      id: "",
      label: "",
    },
  ];
  data.forEach((item) => {
    if (arr.filter((val) => val.id === item.codeName.trim()).length === 0)
      arr.push({
        id: item.codeName,
        label: item.codeName,
      });
  });
  return arr;
};
export const transformTableData = ({
  data,
  onEdit,
  onView,
  onDelete,
  onCancelRequest,
  onUnPublish,
  handleAssigneeChange,
}) => {
  if (!data) return [];

  const { auth } = useAuth();
  let arr = [];
  data.forEach((item) => {
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
    } else if (item.status == GLOBAL_STATUS.APPROVED) {
      statusFunc = onUnPublish;
      dialogText = "Are you sure you want to Request Unpublish?";
      dialogTitle = "Request Unpublish Confirmation";
      menuText = "Request Unpublish";
    }

    arr.push({
      ...item,
      id: item.osId,
      sourceTicketId: item.sourceTicketId?.split("/").pop(),
      assignee: (
        <AssigneeTextField
          name={item.userAssigneeResponse}
          show={accessToChangeAssignee("OS", auth, item)}
          permission={PERMISSION_MAPPING.UPDATE}
          type="OS"
          handleAssigneeChange={handleAssigneeChange}
          id={item.osId}
          status={item.status}
        />
      ),
      updatedOn: onlyDateTransform(item.updatedOn),
      action: (
        <ActionButton
          data={item}
          {...(accessToEdit('OS', auth, item)
            ? { onEdit: onEdit }
            : { onEdit: "no-edit" })}
        onView={onView}
          {...(accessToMenu('OS', auth, item)
            ? { showMenu: true }
            : { showMenu: "no-edit" })}
          onStatusChange={statusFunc}
          dialogText={dialogText}
          dialogTitle={dialogTitle}
          menuText={menuText}
          permissionTitle="os"
        />
      ),
      status: <StatusBadge status={item.status} />,
    });
  });
  return arr;
};
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

export const isDataValidOs = (osData, error, setError, buttonType) => {
  let title = [];
  let message = [];
  if (!osData.osName || osData.osName.trim().length === 0) {
    title.push("osName");
    message.push({
      title: "osName",
      message: "OS Name is required",
    });
  } else if (osData.osName.trim().length > 500) {
    title.push("osName");
    message.push({
      title: "osName",
      message: "character more than 500 not allowed",
    });
  } else if (
    osData.osName?.toLowerCase() === "android" &&
    (!osData.codeName || osData.codeName.length === 0)
  ) {
    title.push("codeName");
    message.push({
      title: "codeName",
      message: "AOSP Codename is required.",
    });
  }

  if (osData.apiVersion?.trim().length > 500) {
    title.push("apiVersion");
    message.push({
      title: "apiVersion",
      message: "character more than 500 not allowed",
    });
  }
  if (osData.codeName?.trim().length > 500) {
    title.push("codeName");
    message.push({
      title: "codeName",
      message: "character more than 500 not allowed",
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
