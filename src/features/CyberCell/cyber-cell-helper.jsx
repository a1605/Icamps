import ActionButton from "../../common/components/actionButton/ActionButton";
import AssigneeTextField from "../../common/components/assigneeTextField/AssigneeTextField";
import StatusBadge from "../../common/components/statusBadge/StatusBadge";
import { GLOBAL_STATUS } from "../../common/global.constant";
import { accessToMenu, accessToMenuDeleteAndUpdate, accessToMenuUpdate } from "../../common/global.validation";
import { onlyDateTransform } from "../../common/helperFunction/dateTransform";
import { useAuth } from "../../common/hooks/useAuth";

export const transformTableData = ({ data, onEdit, onView, onDelete }) => {
  const {auth} = useAuth()
  if (!data) return [];
  let arr = [];
  data.map((item) => {
    let statusFunc, dialogText, dialogTitle, menuText;
    if (item.status === GLOBAL_STATUS.APPROVED) {
      statusFunc = onDelete;
      dialogText = "Are you sure you want to Delete?";
      dialogTitle = "Delete Confirmation";
      menuText = "Delete";
    }
    arr.push({
      ...item,
      assignee: <AssigneeTextField name={item.userAssigneeResponse} />,
      sourceTicketId:item?.sourceTicketId?.length > 0
      ? item?.sourceTicketId.split("/").pop()
      : item.sourceTicketId,
      updatedOn: onlyDateTransform(item.updatedOn),
      status: <StatusBadge status={item.status} />,
      action: (
        <ActionButton
          data={item}
          {...(item.status ? { onEdit: onEdit } : { onEdit: "Empty" })}
          onView={onView}
          {...(accessToMenuDeleteAndUpdate('CYBER_CELL', auth, item)
          ? { showMenu: true }
          : { showMenu: "no-edit" })}
          onStatusChange={statusFunc}
          dialogText={dialogText}
          dialogTitle={dialogTitle}
          menuText={menuText}
          permissionTitle="cyber cell"
        />
      ),
    });
  });
  return arr;
};

export const transCyberData = (data) => {
  if (!data) return [];
  let arr = [
    {
      id: "",
      label: "",
    },
  ];
  data.map((item) => {
    {
      if (arr.filter((val) => val.label === item.cyberCellId).length === 0)
        arr.push({
          id: item.regionalOffice,
          label: item.regionalOffice,
        });
    }
  });
  return arr;
};

export const transCityFilterData = (data) => {
  if (!data) return [];
  let arr = [
    {
      id: "",
      label: "",
    },
  ];
  data.forEach((item) => {
    arr.push({
      id: item.cityName,
      label: item.cityName,
    });
  });
  return arr;
};

export const transStateFilterData = (data) => {
  if (!data) return [];
  let arr = [
    {
      id: "",
      label: "",
    },
  ];
  data.forEach((item) => {
    arr.push({
      id: item.stateName,
      label: item.stateName,
    });
  });
  return arr;
};

export const isDataValidCyber = (cyberData, error, setError) => {
  let title = [];
  let message = [];
  if (cyberData.regionalOffice.trim().length === 0) {
    title.push("regionalOffice");
    message.push({
      title: "regionalOffice",
      message: "Regional Office is required",
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
