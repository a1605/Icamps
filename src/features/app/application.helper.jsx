import ActionButton from "../../common/components/actionButton/ActionButton";
import StatusBadge from "../../common/components/statusBadge/StatusBadge";
import AssigneeTextField from "../../common/components/assigneeTextField/AssigneeTextField";
import {
  GLOBAL_STATUS,
  PERMISSION_MAPPING,
  SCREEN_TYPE,
} from "../../common/global.constant";
import dayjs from "dayjs";
import { onlyDateTransform } from "../../common/helperFunction/dateTransform";
import {
  accessToApproval,
  accessToChangeAssignee,
  accessToEdit,
  accessToMenu,
} from "../../common/global.validation";
import { useAuth } from "../../common/hooks/useAuth";
import { APPROVAL } from "../../common/components/Overlay/overlay.constant";

export const transformSingleData = (data) => {
  const transformPermissionData = (dataPermission) => (
    <p
      style={{
        maxHeight: 70,
        overflowY: "auto",
      }}
    >
      {dataPermission?.map((item, index) => (
        <p style={{ color: "black", margin: "0" }} key={index}>
          {item.permissionRequire}
        </p>
      ))}
    </p>
  );

  const transformlibraryData = (dataLibaray) => (
    <p
      style={{
        maxHeight: 70,
        overflowY: "auto",
      }}
    >
      {dataLibaray?.map((items, index) => (
        <p style={{ color: "black", margin: "0" }} key={index}>
          {items.thirdPartyLibrary}
        </p>
      ))}
    </p>
  );

  const transformPublisherData = (dataPublisher) => (
    <p
      style={{
        maxHeight: 70,
        overflowY: "auto",
      }}
    >
      {dataPublisher?.map((items, index) => (
        <p style={{ color: "black", margin: "0" }} key={index}>
          {items.publisher}
        </p>
      ))}
    </p>
  );

  return {
    sourceTicketId:
      data?.sourceTicketId?.length > 0
        ? data?.sourceTicketId.split("/").pop()
        : data.sourceTicketId,
    id: data.deviceId,
    first: [
      {
        value: data.applicationName,
        heading: "Application Name",
      },
      {
        value: data.versionCode,
        heading: "Version Code",
      },
      {
        value: transformlibraryData(data?.thirdPartyLibraries),
        heading: "Third Party Libraries",
      },
      {
        value: data?.publisher,
        heading: "App Publisher ID",
      },
      {
        value: data.minimumRequeiredOs,
        heading: "Minimun Required OS",
      },

      {
        value: data.targetApi,
        heading: "Target API",
      },
    ],
    second: [
      {
        value: data.version,
        heading: "Version",
      },
      {
        value: transformPermissionData(data?.permissionsRequired),
        heading: "Permission Required",
      },
      {
        value: transformPublisherData(data.appPublishers),
        heading: "APP Publisher",
      },
      {
        value: dayjs(data.appUpdateDate).format(`YYYY-MM-DD`),
        heading: "APP Ipdate Date",
      },
      {
        value: data.uniqIdentifier,
        heading: "Unique Ientifier",
      },
    ],
  };
};

export const transformAppNameData = (data) => {
  if (!data) return [];
  let arr = [
    {
      id: "",
      label: "",
    },
  ];
  data.forEach((item) => {
    if (arr.filter((val) => val.label === item.applicationName).length === 0)
      arr.push({
        id: item.applicationName,
        label: item.applicationName,
      });
  });
  return arr;
};

export const transformPermissionData = (data) => {
  let arr = [
    {
      id: "",
      label: "",
    },
  ];
  data.forEach((item) => {
    arr.push({
      id: item.permissionRequiredId,
      label: item.permissionRequire,
    });
  });
  return arr;
};

export const transformSubTypeData = (data) => {
  let arr = [
    {
      id: "",
      label: "",
    },
  ];

  data.forEach((item) => {
    arr.push({
      id: item.appSubTypeId,
      label: item.appSubType.replaceAll("_", " "),
    });
  });
  // appSubType sorted according to id (1,2,3)
  // sorting them according to label (a,b,c)
  // a -> current object , b -> next object to compare with
  arr.sort((a, b) => a.label.localeCompare(b.label));
  return arr;
};

export const transformPublisherData = (data) => {
  let arr = [
    {
      id: "",
      label: "",
    },
  ];
  data.forEach((item) => {
    arr.push({
      id: item.appPublisherId,
      label: item.publisher,
    });
  });
  return arr;
};

export const transformLibraryData = (data) => {
  let arr = [
    {
      id: "",
      label: "",
    },
  ];
  data.forEach((item) => {
    arr.push({
      id: item.thirdPartyLibrariesId,
      label: item.thirdPartyLibrary,
    });
  });
  return arr;
};
export const transformAppDropdownData = (data) => {
  if (!data) return [];
  let newArr = [];
  data?.forEach((item) => {
    newArr.push({
      id: item.applicationId,
      label: `${item.applicationName} | ${item.uniqIdentifier} | ${item.version} | ${item.versionCode}`,
    });
  });
  return newArr;
};
export const transformTableData = ({
  data = [],
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
      item.status == GLOBAL_STATUS.UNPUBLISHED ||
      item.status == GLOBAL_STATUS.DELETED
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
      dialogText = "Are you sure you want to request to unpublish?";
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
      id: item.applicationId,
      sourceTicketId:
        item?.sourceTicketId?.length > 0
          ? item?.sourceTicketId.split("/").pop()
          : item.sourceTicketId,
      assignee: (
        <AssigneeTextField
          name={item.userAssigneeResponse}
          show={
            !(
              screenType === SCREEN_TYPE.APPROVAL ||
              screenType === SCREEN_TYPE.ADVISOR
            )
              ? accessToChangeAssignee("APPS", auth, item)
              : accessToChangeAssignee("APPS", auth, item, screenType)
          }
          permission={handlePermission(screenType)}
          type="APPS"
          handleAssigneeChange={handleAssigneeChange}
          id={item.applicationId}
          status={item.status}
        />
      ),
      updatedOn: onlyDateTransform(item.updatedOn),
      requestedOn: onlyDateTransform(item.requestedOn),
      action: (
        <ActionButton
          data={item}
          {...(accessToEdit("APPS", auth, item) &&
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
          {...(accessToMenu("APPS", auth, item) &&
          screenType !== SCREEN_TYPE.APPROVAL &&
          screenType !== SCREEN_TYPE.ADVISOR
            ? { showMenu: true }
            : {
                showMenu:
                  screenType !== SCREEN_TYPE.APPROVAL &&
                  screenType !== SCREEN_TYPE.ADVISOR
                    ? "no-edit"
                    : false,
              })}
          onStatusChange={statusFunc}
          dialogText={dialogText}
          dialogTitle={dialogTitle}
          menuText={menuText}
          {...(screenType === SCREEN_TYPE.APPROVAL
            ? {
                onReject: accessToApproval("APPS", auth, item)
                  ? onReject
                  : undefined,
              }
            : null)}
          {...(screenType === SCREEN_TYPE.APPROVAL
            ? {
                onApproval: accessToApproval("APPS", auth, item)
                  ? onApproval
                  : undefined,
              }
            : null)}
          permissionTitle="apps"
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
export const transformIndicatorValueAdvisory = (data) => {
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

export const isDataValidApp = (appData, error, setError, buttonType) => {
  let title = [];
  let message = [];
  if (appData.applicationName.trim()?.length === 0) {
    title.push("applicationName");
    message.push({
      title: "applicationName",
      message: "App Name is required",
    });
  } else if (appData.applicationName?.trim()?.length > 500) {
    title.push("applicationName");
    message.push({
      title: "applicationName",
      message: "character more than 500 not allowed",
    });
  }
  if (
    buttonType === "approval" &&
    appData.uniqIdentifier?.trim()?.length === 0
  ) {
    title.push("uniqIdentifier");
    message.push({
      title: "uniqIdentifier",
      message: "Unique Identifier  is required",
    });
  }
  if (appData.version?.trim()?.length > 500) {
    title.push("version");
    message.push({
      title: "version",
      message: "character more than 500 not allowed",
    });
  } else if (appData.version?.trim()?.length === 0) {
    title.push("version");
    message.push({
      title: "version",
      message: "Version is required",
    });
  }
  if (appData.versionCode?.trim()?.length > 500) {
    title.push("versionCode");
    message.push({
      title: "versionCode",
      message: "character more than 500 not allowed",
    });
  }
  if (appData?.minimumRequeiredOs?.trim().length > 500) {
    title.push("minimumRequeiredOs");
    message.push({
      title: "minimumRequeiredOs",
      message: "character more than 500 not allowed",
    });
  }
  if (appData.appPublishers?.length === 0) {
    title.push("publisher");
    message.push({
      title: "publisher",
      message: "App Publisher is required",
    });
  }
  if (appData.versionCode?.trim()?.length === 0) {
    title.push("versionCode");
    message.push({
      title: "versionCode",
      message: "Version Code is required",
    });
  }

  if (appData.targetApi?.trim()?.length > 500) {
    title.push("targetApi");
    message.push({
      title: "targetApi",
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
