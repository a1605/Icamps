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
  return data.map((item) => ({
    ...item,
    id: item.informationId,
    sourceTicketId:item?.sourceTicketId?.length > 0
    ? item?.sourceTicketId.split("/").pop()
    : item.sourceTicketId,
    assignee: (
      <AssigneeTextField
        name={item.userAssigneeResponse}
        show={accessToChangeAssignee(
          item.type,
          auth,
          item,
          SCREEN_TYPE.APPROVAL
        )}
        permission={PERMISSION_MAPPING.APPROVER}
        type={item.type}
        handleAssigneeChange={handleAssigneeChange}
        id={item.informationId}
        approvedBy={item.approvedBy}
        approvedOn={item.approvedOn}
        requestedBy={item.requestedBy}
        requestedOn={item.requestedOn}
        status={item.status}
      />
    ),
    requestedOn: onlyDateTransform(item.updatedOn),
    action: (
      <ActionButton
        data={item}
        onView={onView}
        onReject={
          accessToApproval(item.type, auth, item) ? onReject : undefined
        }
        onApproval={
          accessToApproval(item.type, auth, item) ? onApproval : undefined
        }
      />
    ),
    status: <StatusBadge status={item.status} />,
  }));
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
