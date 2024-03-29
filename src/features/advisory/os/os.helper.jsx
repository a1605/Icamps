import ActionButton from "../../../common/components/actionButton/ActionButton";
import StatusBadge from "../../../common/components/statusBadge/StatusBadge";
import {
  GLOBAL_STATUS,
  PERMISSION_MAPPING,
  SCREEN_TYPE,
} from "../../../common/global.constant";
import {
  onlyDateTransform,
  dateTransform,
} from "../../../common/helperFunction/dateTransform";
import AssigneeTextField from "../../../common/components/assigneeTextField/AssigneeTextField";
import { accessToChangeAssignee } from "../../../common/global.validation";
import { useAuth } from "../../../common/hooks/useAuth";
export const transformSingleData = (data, isError) => {
  if (isError || !data || data.length === 0)
    return { first: [], second: [], sourceTicketId: "" };

  return {
    sourceTicketId: data.sourceTicketId,
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
  data?.map((item) => {
    newArr.push({
      id: item.osId,
      label: `${item.osName} ${item.codeName} ${
        item.version
      } ${onlyDateTransform(item.aopssecurityUpdateDate)}`,
    });
  });
  return newArr;
};

export const transAndroidOSData = (data) => {
  let arr = [
    {
      id: "",
      label: "",
    },
  ];

  data.map((item) => {
    arr.push({
      id: item.osId,
      label: `${item.codeName} (${item.version})`,
    });
  });

  return arr;
};

export const transformManuData = (data) => {
  let arr = [
    {
      id: "",
      label: "",
    },
  ];
  data.map((item) => {
    arr.push({
      id: item.osName,
      label: item.osName,
    });
  });
  return arr;
};
export const transformTableData = ({ data, onView, handleAssigneeChange }) => {
  if (!data) return [];
  const { auth } = useAuth();
  let arr = [];
  data.map((item) => {
    arr.push({
      ...item,
      id: item.osId,
      sourceTicketId:item?.sourceTicketId?.length > 0
      ? item?.sourceTicketId.split("/").pop()
      : item.sourceTicketId,
      assignee: (
        <AssigneeTextField
          name={item.userAssigneeResponse}
          show={accessToChangeAssignee("OS", auth, item, SCREEN_TYPE.ADVISOR)}
          permission={PERMISSION_MAPPING.ADVISOR}
          type="OS"
          handleAssigneeChange={handleAssigneeChange}
          id={item.osId}
          status={item.status}
        />
      ),
      updatedOn: onlyDateTransform(item.updatedOn),
      requestedOn: onlyDateTransform(item.requestedOn),
      action: <ActionButton data={item} onView={onView} />,
      status: <StatusBadge status={item.status} />,
    });
  });

  return arr;
};
export const transformIndicatorValue = (data) => {
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
      key: GLOBAL_STATUS.ADVICE_C,
    },
  ];
};
