import ActionButton from "../../common/components/actionButton/ActionButton";
import AssigneeTextField from "../../common/components/assigneeTextField/AssigneeTextField";
import StatusBadge from "../../common/components/statusBadge/StatusBadge";
import { GLOBAL_STATUS } from "../../common/global.constant";
import {  accessToMenuDeleteAndUpdate } from "../../common/global.validation";
import { onlyDateTransform } from "../../common/helperFunction/dateTransform";
import { useAuth } from "../../common/hooks/useAuth";

export const transformTableData = ({ data = [], onView, onEdit, onDelete }) => {
  const { auth } = useAuth();
  if (!data) return [];
  let arr = [];
  data.forEach((item) => {
    let statusFunc, dialogText, dialogTitle, menuText;
    
    statusFunc = onDelete;
    dialogText = "Are you sure you want to Delete?";
    dialogTitle = "Delete Confirmation";
    menuText = "Delete";

    arr.push({
      ...item,
      id: item.bestPracticeId,
      assignee: <AssigneeTextField name={item.assignee} />,
      updatedOn: onlyDateTransform(item.updatedOn),
      action: (
        <ActionButton
          data={item}
          onView={onView}
          onEdit={onEdit}
          {...(accessToMenuDeleteAndUpdate('FAQ', auth, item)
            ? { showMenu: true }
            : { showMenu: "no-edit" })}
          onStatusChange={statusFunc}
          dialogText={dialogText}
          dialogTitle={dialogTitle}
          menuText={menuText}
          permissionTitle="FAQ"
        />
      ),
      status: <StatusBadge status={item.status} />,
    });
  });
  return arr;
};

export const isDataValidFAQ = (faq,answer, error, setError) => {
  let title = [];
  let message = [];
  if (faq.questionSequence.length === 0) {
    title.push("questionSequence");
    message.push({
      title: "questionSequence",
      message: "Question Sequence is required",
    });
  }
  if (isNaN(Number(faq.questionSequence))) {
    title.push("questionSequence");
    message.push({
      title: "questionSequence",
      message: "Numerical Value only",
    });
  }
  if (faq.question.trim().length === 0) {
    title.push("question");
    message.push({
      title: "question",
      message: "Question is required",
    });
  }
  if (answer?.trim().length === 0 || answer===undefined || answer==="<p><br></p>") {
    title.push("answer");
    message.push({
      title: "answer",
      message: "Answer is required",
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
