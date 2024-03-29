import ActionButton from "../../../common/components/actionButton/ActionButton";
import AssigneeTextField from "../../../common/components/assigneeTextField/AssigneeTextField";
import StatusBadge from "../../../common/components/statusBadge/StatusBadge";
import {
  GLOBAL_STATUS,
  PERMISSION_MAPPING,
  SCREEN_TYPE,
} from "../../../common/global.constant";
import { accessToChangeAssignee } from "../../../common/global.validation";
import {
  dateTransform,
  onlyDateTransform,
} from "../../../common/helperFunction/dateTransform";
import { useAuth } from "../../../common/hooks/useAuth";

export const transformTableData = ({
  data = [],
  onView,
  handleAssigneeChange,
}) => {
  if (!data) return [];
  const { auth } = useAuth();
  let arr = [];
  data.map((item) => {
    arr.push({
      ...item,
      id: item.deviceId,
      sourceTicketId:
        item?.sourceTicketId?.length > 0
          ? item?.sourceTicketId.split("/").pop()
          : item.sourceTicketId,
      manufacturer: item?.manufacturer?.name,
      assignee: (
        <AssigneeTextField
          name={item.userAssigneeResponse}
          show={accessToChangeAssignee(
            "DEVICES",
            auth,
            item,
            SCREEN_TYPE.ADVISOR
          )}
          permission={PERMISSION_MAPPING.ADVISOR}
          type="DEVICES"
          handleAssigneeChange={handleAssigneeChange}
          id={item.deviceId}
        />
      ),
      updatedOn: dateTransform(item.updatedOn),
      requestedOn: onlyDateTransform(item.requestedOn),
      action: (
        <ActionButton data={item} onView={onView} permissionTitle="devices" />
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
