import ActionButton from "../../common/components/actionButton/ActionButton";
import StatusBadge from "../../common/components/statusBadge/StatusBadge";
import AssigneeTextField from "../../common/components/assigneeTextField/AssigneeTextField";
import {
  GLOBAL_STATUS,
  PERMISSION_MAPPING,
  SCREEN_TYPE,
} from "../../common/global.constant";
import { onlyDateTransform } from "../../common/helperFunction/dateTransform";
import { accessToChangeAssignee } from "../../common/global.validation";
import { useAuth } from "../../common/hooks/useAuth";

export const transformTableData = ({
  data,
  onView,
  onApproval,
  onReject,
  handleAssigneeChange,
}) => {
  if (!data) return [];
  const { auth } = useAuth();
  return data.map((item) => {
 

    if (
      item.status == GLOBAL_STATUS.ADVICE_A ||
      item.status == GLOBAL_STATUS.ADVICE_C
    )
      return {
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
              SCREEN_TYPE.ADVISOR
            )}
            permission={PERMISSION_MAPPING.ADVISOR}
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
        updatedOn: onlyDateTransform(item.updatedOn),
        action: (
          <ActionButton
            data={item}
            onView={onView}
            onReject={onReject}
            onApproval={onApproval}
          />
        ),
        status: <StatusBadge status={item.status} />,
      };
    else return [];
  });
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
      key: GLOBAL_STATUS.ADVICE_A,
    },
  ];
};
