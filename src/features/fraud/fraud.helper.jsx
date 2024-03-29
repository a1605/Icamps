import ActionButton from "../../common/components/actionButton/ActionButton";
import AssigneeTextField from "../../common/components/assigneeTextField/AssigneeTextField";
import StatusBadge from "../../common/components/statusBadge/StatusBadge";
import { GLOBAL_STATUS } from "../../common/global.constant";
import {  accessToUpdateAndCreate } from "../../common/global.validation";
import { onlyDateTransform } from "../../common/helperFunction/dateTransform";
import { useAuth } from "../../common/hooks/useAuth";

export const transformTableData = ({ data = [], onView, onEdit, onDelete }) => {
  const {auth} = useAuth()
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
      id: item.bestPracticeId,
      assignee: <AssigneeTextField name={item.assignee} />,
      sourceTicketId:item?.sourceTicketId?.length > 0
      ? item?.sourceTicketId.split("/").pop()
      : item.sourceTicketId,
      updatedOn: onlyDateTransform(item.updatedOn),
      action: (
        <ActionButton
          data={item}
          onView={onView}
          onEdit={onEdit}
          {...(accessToUpdateAndCreate('FRAUD', auth, item)
          ? { showMenu: true }
          : { showMenu: "no-edit" })}
          onStatusChange={statusFunc}
          dialogText={dialogText}
          dialogTitle={dialogTitle}
          menuText={menuText}
          //should do changes after getting permissions
          permissionTitle="fraud"
        />
      ),
      status: <StatusBadge status={item.status} />,
    });
  });
  return arr;
};

export const isDataValidFraud = (bestPractice, error, setError) => {
  let title = [];
  let message = [];
  if (bestPractice.title.trim().length === 0) {
    title.push("title");
    message.push({
      title: "title",
      message: "Title is required",
    });
  }
  if (bestPractice.introduction.trim().length === 0) {
    title.push("introduction");
    message.push({
      title: "introduction",
      message: "Description is required",
    });
  }

  if (bestPractice.fraudSteps.length === 0) {
    title.push("fraudSteps");
    message.push({
      title: "fraudSteps",
      message: "Please add steps by clicking add button",
    });
  }

  if (Object.keys(bestPractice.key).length === 0) {
    title.push("key");
    message.push({
      title: "key",
      message: "Scammers steps is required",
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
