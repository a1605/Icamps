import { GLOBAL_STATUS } from "../global.constant";

export const statusChangeOnCancel = (status) => {
  switch (status) {
    case GLOBAL_STATUS.SUBMITTED:
      return GLOBAL_STATUS.DRAFT;
    case GLOBAL_STATUS.REQ_UNPUBLISHED:
      return GLOBAL_STATUS.APPROVED;
    case GLOBAL_STATUS.ADVICE_C:
      return GLOBAL_STATUS.DRAFT;
    case GLOBAL_STATUS.ADVICE_A:
      return GLOBAL_STATUS.ADVICE_C;
  }
};

export const statusAssigneeHandle = (status, approvedBy) => {
  if (status === GLOBAL_STATUS.ADVICE_A) {
    return approvedBy !== null
      ? GLOBAL_STATUS.REQ_UNPUBLISHED
      : GLOBAL_STATUS.SUBMITTED;
  }
  if (status === GLOBAL_STATUS.ADVICE_C) return GLOBAL_STATUS.DRAFT;
};
