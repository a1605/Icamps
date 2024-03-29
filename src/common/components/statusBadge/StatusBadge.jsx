import React, { useMemo } from "react";
import "./StatusBadge.scss";
import { GLOBAL_STATUS } from "../../global.constant";

const StatusBadge = ({ status, margin = "" }) => {
  const decStatus = useMemo(() => {
    switch (status) {
      case GLOBAL_STATUS.REJECTED:
        return "Rejected";
      case GLOBAL_STATUS.APPROVED:
        return "Approved";
      case GLOBAL_STATUS.SUBMITTED:
        return "In Approval";
      case GLOBAL_STATUS.DELETED:
        return "Deleted";
      case GLOBAL_STATUS.ADVICE_A:
        return "Advice(A)";
      case GLOBAL_STATUS.ADVICE_C:
        return "Advice(C)";
      case GLOBAL_STATUS.UNPUBLISHED:
        return "Unpublished";
      case GLOBAL_STATUS.REQ_UNPUBLISHED:
        return "Request Unpublish";
      case GLOBAL_STATUS.ACTIVE:
        return "Active";
      case GLOBAL_STATUS.INACTIVE:
        return "In active";
      default:
        return "In Progress";
    }
  }, [status]);

  return (
    <p
      className={`status-badge ${status}`}
      style={{ margin: margin}}
    >
      {decStatus}
    </p>
  );
};

export default StatusBadge;
