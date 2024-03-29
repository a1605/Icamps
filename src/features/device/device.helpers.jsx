import dayjs from "dayjs";
import ActionButton from "../../common/components/actionButton/ActionButton";
import StatusBadge from "../../common/components/statusBadge/StatusBadge";
import {
  GLOBAL_STATUS,
  PERMISSION_MAPPING,
} from "../../common/global.constant";
import { onlyDateTransform } from "../../common/helperFunction/dateTransform";
import AssigneeTextField from "../../common/components/assigneeTextField/AssigneeTextField";
import { DEVICE_TYPE } from "./devices.constant";
import {
  accessToChangeAssignee,
  accessToEdit,
  accessToMenu,
} from "../../common/global.validation";
import { useAuth } from "../../common/hooks/useAuth";

export const transformSingleData = (data) => {
  return {
    sourceTicketId: data.sourceTicketId,
    id: data.deviceId,
    first: [
      {
        value: data["manufacturer"]["name"],
        heading: "Manufacturer",
      },
      {
        value: data.modelNo,
        heading: "Model No",
      },
      {
        value: data.operatingSystem.version,
        heading: "OS version on release",
      },
      {
        value: data.operatingSystem.latestSecurityUpdate,
        heading: "Current security update",
      },
      {
        value: data.manufacturer.oemSkin,
        heading: "Name of OEM skin in use",
      },

      {
        value: data.manufacturer.oemSkinRelease,
        heading: "Current version of OEM",
      },
      {
        value: data.gpu.gupModelNo,
        heading: "GPU make model",
      },
    ],
    second: [
      {
        value: data.modelName,
        heading: "Model name",
      },
      {
        value: dayjs(data.operatingSystem.latestReleaseDate).format(
          `YYYY-MM-DD`
        ),
        heading: "Release date",
      },
      {
        value: dayjs(data.operatingSystem.eolDate).format(`YYYY-MM-DD`),
        heading: "Current maximum support version",
      },
      {
        value: dayjs(data.operatingSystem.latestReleaseDate).format(
          `YYYY-MM-DD`
        ),
        heading: "Official support EOL date",
      },
      {
        value: data.manufacturer.oemSkinRelease,
        heading: "EM skin version at release time",
      },
      {
        value: data.cpu.cpuModelNo,
        heading: "CPU make model",
      },
    ],
  };
};

export const transformTableData = ({
  data = [],
  onEdit,
  onView,
  onDelete,
  onCancelRequest,
  onUnPublish,
  handleAssigneeChange,
}) => {
  const { auth } = useAuth();
  if (!data) return [];
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
      id: item.deviceId,
      sourceTicketId:item?.sourceTicketId?.length > 0
          ? item?.sourceTicketId.split("/").pop()
          : item.sourceTicketId,
      manufacturer: item?.manufacturer?.name,
      assignee: (
        <AssigneeTextField
          name={item.userAssigneeResponse}
          show={accessToChangeAssignee("DEVICES", auth, item)}
          permission={PERMISSION_MAPPING.UPDATE}
          type="DEVICES"
          handleAssigneeChange={handleAssigneeChange}
          id={item.deviceId}
          status={item.status}
        />
      ),
      updatedOn: onlyDateTransform(item.updatedOn),
      action: (
        <ActionButton
          data={item}
          {...(accessToEdit('DEVICES', auth, item)
            ? { onEdit: onEdit }
            : { onEdit: "no-edit" })}
          onView={onView}
          {...(accessToMenu('DEVICES', auth, item)
            ? { showMenu: true }
            : { showMenu: "no-edit" })}
          onStatusChange={statusFunc}
          dialogText={dialogText}
          dialogTitle={dialogTitle}
          menuText={menuText}
          permissionTitle="devices"
        />
      ),
      status: <StatusBadge status={item.status} />,
    });
  });
  return arr;
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
    arr.push({
      id: item.manufacturerId,
      label: item.name,
    });
  });
  return arr;
};

export const transManuFilterData = (data) => {
  if (!data) return [];
  let arr = [
    {
      id: "",
      label: "",
    },
  ];
  data.forEach((item) => {
    if (arr.filter((value) => value.id === item.name).length === 0)
      arr.push({
        id: item.name,
        label: item.name,
      });
  });
  return arr;
};

export const transOSData = (data) => {
  if (!data) return [];
  let arr = [
    {
      id: "",
      label: "",
    },
  ];
  data.forEach((item) => {
    if (item?.osName?.toUpperCase() === DEVICE_TYPE.ANDROID) {
      arr.push({
        id: item.osId,
        label: item.codeName,
      });
    }
  });
  return arr;
};

export const transOEMOSData = (data) => {
  if (!data) return [];
  let arr = [
    {
      id: "",
      label: "",
    },
  ];
  data.forEach((item) => {
    if (
      !arr.find((val) => val.id === item.osId) &&
      item.osName.toUpperCase() !== DEVICE_TYPE.ANDROID &&
      item.codeName.trim() === ""
    ) {
      arr.push({
        id: item.osId,
        label: item.osName,
      });
    }
  });
  return arr;
};

export const transformGpuData = (data) => {
  if (!data) return [];
  let arr = [
    {
      id: "",
      label: "",
    },
  ];
  data.forEach((item) => {
    arr.push({
      id: item.gpuId,
      label: item.gupModelNo,
    });
  });
  return arr;
};

export const transformCpuData = (data) => {
  if (!data) return [];
  let arr = [
    {
      id: "",
      label: "",
    },
  ];
  data.forEach((item) => {
    arr.push({
      id: item.cpuId,
      label: item.cpuModelNo,
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

export const isDataValidDevice = (deviceData, error, setError, buttonType) => {
  let title = [];
  let message = [];
  if (deviceData.manufacturerId.length === 0) {
    title.push("manufacturer");
    message.push({
      title: "manufacturer",
      message: "Manufacturer Name is required",
    });
  }
  if (deviceData.modelNo.trim().length === 0) {
    title.push("modelNo");
    message.push({
      title: "modelNo",
      message: "Model Number is required",
    });
  } else if (deviceData.modelNo.trim().length > 500) {
    title.push("modelNo");
    message.push({
      title: "modelNo",
      message: "character more than 500 not allowed",
    });
  }
  if (deviceData.modelName.trim().length === 0) {
    title.push("modelName");
    message.push({
      title: "modelName",
      message: "Model Name is required",
    });
  } else if (deviceData.modelName.trim().length > 500) {
    title.push("modelName");
    message.push({
      title: "modelName",
      message: "character more than 500 not allowed",
    });
  }

  if (
    buttonType === "approval" &&
    deviceData.latestSecUpdateReleasedDt === null
  ) {
    title.push("latestSecUpdateReleasedDt");
    message.push({
      title: "latestSecUpdateReleasedDt",
      message: "LatestSecUpdateReleasedDt is required",
    });
  }

  if (buttonType === "approval" && deviceData.latestSecurityUpdate === null) {
    title.push("latestSecurityUpdate");
    message.push({
      title: "latestSecurityUpdate",
      message: "Latest Security Update is required",
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
