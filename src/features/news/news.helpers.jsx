// Components
import AssigneeTextField from "../../common/components/assigneeTextField/AssigneeTextField";
import ActionButton from "../../common/components/actionButton/ActionButton";
import StatusBadge from "../../common/components/statusBadge/StatusBadge";

// Helper
import { onlyDateTransform } from "../../common/helperFunction/dateTransform";

// Constant
import {
  FEATURE_MAPPING,
  GLOBAL_STATUS,
  PERMISSION_MAPPING,
} from "../../common/global.constant";
import { useAuth } from "../../common/hooks/useAuth";
import {
  accessToChangeAssignee,
  accessToEdit,
  accessToMenu,
} from "../../common/global.validation";

export const transformTableData = ({
  data = [],
  onEdit,
  onView,
  onDelete,
  onCancelRequest,
  onUnPublish,
  handleAssigneeChange,
}) => {
  if (!data) return [];
  const { auth } = useAuth();
  return data.map((item) => {
    const cancelSet = new Set([
      GLOBAL_STATUS.SUBMITTED,
      GLOBAL_STATUS.ADVICE_C,
      GLOBAL_STATUS.REQ_UNPUBLISHED,
    ]);
    let statusFunc, dialogText, dialogTitle, menuText;
    if (
      item.status === GLOBAL_STATUS.DRAFT ||
      item.status === GLOBAL_STATUS.REJECTED
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
      dialogText = "Are you sure you want to request for unpblish?";
      dialogTitle = "Request for Unpublish Confirmation";
      menuText = "Request Unpublish";
    }
    return {
      ...item,
      id: item.informationId,
      sourceTicketId: item.sourceTicketId?.split("/").pop(),
      assignee: (
        <AssigneeTextField
          name={item.userAssigneeResponse}
          show={accessToChangeAssignee("NEWS", auth, item)}
          permission={PERMISSION_MAPPING.UPDATE}
          type={"NEWS"}
          handleAssigneeChange={handleAssigneeChange}
          id={item.informationId}
          approvedBy={item.approvedBy}
          approvedOn={item.approvedOn}
          requestedBy={item.requestedBy}
          requestedOn={item.requestedOn}
          status={item.status}
        />
      ),
      updatedOn: onlyDateTransform(item.updatedOn),
      action: (
        <ActionButton
          data={item}
          // Edit
          {...(accessToEdit('NEWS', auth, item)
            ? { onEdit: onEdit }
            : { onEdit: "no-edit" })}
          // View Action
          onView={onView}
          // Show Menu
          {...(accessToMenu('NEWS', auth, item)
            ? { showMenu: true }
            : { showMenu: "no-edit" })}
          // Status Change
          onStatusChange={statusFunc}
          dialogText={dialogText}
          dialogTitle={dialogTitle}
          menuText={menuText}
          permissionTitle="news"
        />
      ),
      status: <StatusBadge status={item.status} />,
    };
  });
};

export const statusDisplay = (item) => <StatusBadge status={item} />;

export const deviceDropDownTableData = (data, givenData) => {
  if (!data) return;
  const columnHeading = [
    {
      key: "manufacturer",
      header: "Manufacturer",
      sorting: false,
    },
    {
      key: "modelName",
      header: "Model Name",
      sorting: false,
    },
    {
      key: "modelNo",
      header: "Model No",
      sorting: false,
    },
    {
      key: "status",
      header: "Status",
      sorting: false,
    },
    {
      key: "releaseDate",
      header: "Release Date",
      sorting: false,
    },
    {
      key: "modelEOLDate",
      header: "Model EOL Date",
      sorting: false,
    },
    {
      key: "aospversionCodeReleased",
      header: "AOSP Version Code(Released)",
      sorting: false,
    },
    {
      key: "aospversionCodeLatest",
      header: "AOSP Version Code(Latest)",
      sorting: false,
    },
    {
      key: "oemosversionCodeReleased",
      header: "OEMOS version code (released)",
      sorting: false,
    },
    {
      key: "oemosversionCodeLatest",
      header: "OEMOS version code (Latest)",
      sorting: false,
    },
    {
      key: "latestSecurityUpdate",
      header: "Latest Security Update",
      sorting: false,
    },
    {
      key: "latestSecUpdateReleasedDt",
      header: "LatestSecUpdateReleasedDt",
      sorting: false,
    },
    {
      key: "cpuMakeModel",
      header: "CPU Make Model",
      sorting: false,
    },
    {
      key: "gpuMakeModel",
      header: "GPU Make Model",
      sorting: false,
    },
    {
      key: "nccsapproved",
      header: "NCCS Approved",
      sorting: false,
    },
    {
      key: "googleCertified",
      header: "Google Certified",
      sorting: false,
    },
  ];
  let arr = [];
  data.forEach((item) => {
    if (givenData.includes(item.deviceId)) {
      arr.push({
        id: item.deviceId,
        ...item,
        status: <StatusBadge status={item.status} />,
        manufacturer: item.manufacturer?.name,
        releaseDate: onlyDateTransform(item.releaseDate),
        modelEOLDate: onlyDateTransform(item.modelEOLDate),
        latestSecurityUpdate: onlyDateTransform(item.latestSecurityUpdate),
        latestSecUpdateReleasedDt: onlyDateTransform(
          item.latestSecUpdateReleasedDt
        ),
        aospversionCodeReleased: item.osByAOSPVersionCodeReleased?.codeName,
        aospversionCodeLatest: item.osByAOSPVersionCodeLatest?.codeName,
        oemosversionCodeReleased: item.osByOEMOSVersionCodeReleased?.osName,
        oemosversionCodeLatest: item.osByOEMOSVersionCodeLatest?.osName,
        cpuMakeModel: item.cpu?.cpuModelNo,
        gpuMakeModel: item.gpu?.gupModelNo,
        nccsapproved: item.nccsapproved ? "True" : "False",
        googleCertified: item.googleCertified ? "True" : "False",
      });
    }
  });
  return { columnHeading, columnData: arr };
};

export const osDropDownTableData = (data, givenData) => {
  if (!data) return;
  const columnHeading = [
    {
      key: "osName",
      header: "OS Name",
      sorting: false,
    },
    {
      key: "codeName",
      header: "AOSP Codename",
      sorting: false,
    },
    {
      key: "status",
      header: "Status",
      sorting: false,
    },
    {
      key: "latestSecurityUpdate",
      header: "Lastest Security Update Date",
      sorting: false,
    },
    {
      key: "oemSecurityUpdateDate",
      header: "OEM Security Update Date",
      sorting: false,
    },
    {
      key: "releaseData",
      header: "OS Release Date",
      sorting: false,
    },
    {
      key: "eolData",
      header: "EOL Date",
      sorting: false,
    },
    {
      key: "apiVersion",
      header: "Android API Version",
      sorting: false,
    },
    {
      key: "lastSecUpdateReleasedId",
      header: "Lastest Security Update Release Date",
      sorting: false,
    },
  ];

  let arr = [];

  data.forEach((item) => {
    if (givenData.includes(item.osId))
      arr.push({
        codeName: item.codeName,
        osName: item.osName,
        releaseData: onlyDateTransform(item.latestReleaseDate),
        eolData: onlyDateTransform(item.eolDate),
        latestSecurityUpdate: onlyDateTransform(item.latestSecurityUpdate),
        oemSecurityUpdateDate: onlyDateTransform(item.oemSecurityUpdateDate),
        lastSecUpdateReleasedId: onlyDateTransform(
          item.lastSecUpdateReleasedId
        ),
        apiVersion: item.apiVersion,
        status: <StatusBadge status={item.status} />,
      });
  });

  return { columnHeading, columnData: arr };
};

export const AppDropDownTableData = (data, givenData) => {
  if (!data) return {};

  const columnHeading = [
    {
      key: "applicationName",
      header: "App Name",
      sorting: false,
    },
    {
      key: "uniqIdentifier",
      header: "Unique Identifier",
      sorting: false,
    },
    {
      key: "status",
      header: "Status",
      sorting: false,
    },
    {
      key: "publisher",
      header: "App publisher ID",
      sorting: false,
    },
    {
      key: "appPublisher",
      header: "App Publisher",
      sorting: false,
    },
    {
      key: "maxCode",
      header: "Max Version Code",
      sorting: false,
    },
    {
      key: "maxVersion",
      header: "Max Version",
      sorting: false,
    },
    {
      key: "versionCode",
      header: "Version Code",
      sorting: false,
    },
    {
      key: "version",
      header: "Version",
      sorting: false,
    },
    {
      key: "thirdPartyLibrariesId",
      header: "Third party libraries",
      sorting: false,
    },
    {
      key: "permissionRequiredId",
      header: "Permissions Required",
      sorting: false,
    },

    {
      key: "minimumRequeiredOs",
      header: "Minimum Required OS",
      sorting: false,
    },
    {
      key: "appUpdateDate",
      header: "App update date",
      sorting: false,
    },
    {
      key: "subType",
      header: "App Sub Type",
      sorting: false,
    },
    {
      key: "appType",
      header: "App Type",
      sorting: false,
    },
    {
      key: "targetApi",
      header: "Target Api",
      sorting: false,
    },
  ];

  let arr = [];

  data.forEach((item) => {
    if (givenData?.includes(item.applicationId)) {
      arr.push({
        ...item,
        status: <StatusBadge status={item.status} />,
        appUpdateDate: onlyDateTransform(item.appUpdateDate),
        appPublisher: item.appPublishers?.map((val, index) => (
          <p key={index}>{val.publisher}</p>
        )),
        thirdPartyLibrariesId: item.thirdPartyLibraries?.map((val, index) => (
          <p key={index}>{val.thirdPartyLibrary}</p>
        )),

        permissionRequiredId: item.permissionsRequired?.map((val, index) => (
          <p key={index}>{val.permissionRequire}</p>
        )),
      });
    }
  });

  return { columnHeading, columnAppData: arr };
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

export const isDataValidInfo = (infoData, error, setError, buttonType) => {
  let title = [];
  let message = [];
  if (infoData.title.trim().length === 0) {
    title.push("title");
    message.push({
      title: "title",
      message: "Title is required",
    });
  } else if (infoData.title.trim().length > 1000) {
    title.push("title");
    message.push({
      title: "title",
      message: "character more than 1000 not allowed",
    });
  }
  if (infoData.description.trim().length > 5000) {
    title.push("infoDescription");
    message.push({
      title: "infoDescription",
      message: "character more than 5000 not allowed",
    });
  }
  if (buttonType === "approval" && infoData.issueId.length === 0) {
    title.push("relatedIssue");
    message.push({
      title: "relatedIssue",
      message: "Related Issue is required",
    });
  }
  if (buttonType === "approval" && infoData.actionId.length === 0) {
    title.push("actionId");
    message.push({
      title: "actionId",
      message: "Action is required",
    });
  }
  if (
    buttonType === "approval" &&
    infoData.actionSuggestion.trim().length > 1000
  ) {
    title.push("actionSuggestion");
    message.push({
      title: "actionSuggestion",
      message: "character more than 1000 not allowed",
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
