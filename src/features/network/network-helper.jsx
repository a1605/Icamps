import ActionButton from "../../common/components/actionButton/ActionButton";
import AssigneeTextField from "../../common/components/assigneeTextField/AssigneeTextField";
import StatusBadge from "../../common/components/statusBadge/StatusBadge";
import { GLOBAL_STATUS } from "../../common/global.constant";
import { accessToMenu, accessToMenuDeleteAndUpdate } from "../../common/global.validation";
import { onlyDateTransform } from "../../common/helperFunction/dateTransform";
import { useAuth } from "../../common/hooks/useAuth";

export const transformTableData = ({ data = [], onEdit, onView, onDelete }) => {
  const { auth} = useAuth()
  if (!data) return [];
  let arr = [];
  data.forEach((item) => {
    let statusFunc, dialogText, dialogTitle, menuText;
    if (item.status === GLOBAL_STATUS.APPROVED) {
      statusFunc = onDelete;
      dialogText = "Are you sure you want to Delete?";
      dialogTitle = "Delete Confirmation";
      menuText = "Delete";
    }

    arr.push({
      ...item,
      id: item.networkId,
      sourceTicketId:
        item.sourceTicketId?.length > 0
          ? item.sourceTicketId?.split("/").pop()
          : item.sourceTicketId,
      assignee: <AssigneeTextField name={item.userAssigneeResponse} />,
      updatedOn: onlyDateTransform(item.updatedOn),
      action: (
        <ActionButton
          data={item}
          {...(item.status ? { onEdit: onEdit } : { onEdit: "Empty" })}
          onView={onView}
          {...(accessToMenuDeleteAndUpdate('NEWTWORK', auth, item)
          ? { showMenu: true }
          : { showMenu: "no-edit" })}
          onStatusChange={statusFunc}
          dialogText={dialogText}
          dialogTitle={dialogTitle}
          menuText={menuText}
          permissionTitle="network"
        />
      ),
      status: <StatusBadge status={item.status} />,
    });
  });
  return arr;
};

export const transBrandFilterData = (data) => {
  if (!data) return [];
  let arr = [
    {
      id: "",
      label: "",
    },
  ];
  data.forEach((item) => {
    arr.push({
      id: item.brand,
      label: item.brand,
    });
  });
  return arr;
};

export const transModelFilterData = (data) => {
  if (!data) return [];
  let arr = [
    {
      id: "",
      label: "",
    },
  ];
  data.forEach((item) => {
    arr.push({
      id: item.model,
      label: item.model,
    });
  });
  return arr;
};

export const isDataValidNetwork = (networkData, setError) => {
  let title = [];
  let message = [];
  if (networkData.manufacturer?.trim().length === 0) {
    title.push("manufacturer");
    message.push({
      title: "manufacturer",
      message: "Manufacture is required",
    });
  }
  if (networkData.model?.trim().length === 0) {
    title.push("model");
    message.push({
      title: "model",
      message: "Model is required",
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
