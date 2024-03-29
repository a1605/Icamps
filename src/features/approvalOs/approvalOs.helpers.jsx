import ActionButton from "../../common/components/actionButton/ActionButton";
import StatusBadge from "../../common/components/statusBadge/StatusBadge";
import AssigneeTextField from "../../common/components/assigneeTextField/AssigneeTextField";
import { onlyDateTransform } from "../../common/helperFunction/dateTransform";
import {
  GLOBAL_STATUS,
  PERMISSION_MAPPING,
  SCREEN_TYPE,
} from "../../common/global.constant";
import {
  accessToApproval,
  accessToChangeAssignee,
} from "../../common/global.validation";
import { useAuth } from "../../common/hooks/useAuth";

export const transformTableData = ({
  data = [],
  onView,
  onApproval,
  onReject,
  handleAssigneeChange,
}) => {
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
      manufacturer: item?.manufacturer?.name,
      assignee: (
        <AssigneeTextField
          name={item.userAssigneeResponse}
          show={accessToChangeAssignee("OS", auth, item, SCREEN_TYPE.APPROVAL)}
          permission={PERMISSION_MAPPING.APPROVER}
          type="OS"
          handleAssigneeChange={handleAssigneeChange}
          id={item.osId}
          status={item.status}
        />
      ),
      updatedOn: onlyDateTransform(item.updatedOn),
      requestedOn: onlyDateTransform(item.requestedOn),
      action: (
        <ActionButton
          data={item}
          onView={onView}
          onReject={accessToApproval("OS", auth, item) ? onReject : undefined}
          onApproval={
            accessToApproval("OS", auth, item) ? onApproval : undefined
          }
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
      status: "Request Unpublish",
      count:
        !data.reqUnpublished || data.reqUnpublished === "null"
          ? 0
          : data.reqUnpublished,
      key: GLOBAL_STATUS.REQ_UNPUBLISHED,
    },
  ];
};
