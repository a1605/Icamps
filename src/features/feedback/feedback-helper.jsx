import ActionButton from "../../common/components/actionButton/ActionButton";
import StatusBadge from "../../common/components/statusBadge/StatusBadge";
import {
  GLOBAL_STATUS,
  PERMISSION_MAPPING,
} from "../../common/global.constant";
import { issueFixDateTransform } from "../../common/helperFunction/dateTransform";

export const transformTableData = (data, onView) => {
  if (!data) return [];
  let arr = [];
  data.map((item) => {
    arr.push({
      ...item,
      feedbackReceivedDate: issueFixDateTransform(item.feedbackReceivedDate),
      action: (
        <ActionButton data={item} onOpen={onView} permissionTitle="roles" />
      ),
      status: <StatusBadge status={item.status} />,
    });
  });
  return arr;
};

export const isUpdateAccess = (auth) => auth.screens.feedback.includes(PERMISSION_MAPPING.UPDATE);
