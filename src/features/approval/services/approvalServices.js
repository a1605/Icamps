import { GLOBAL_STATUS } from "../../../common/global.constant";
import { http } from "../../../services/httpServices";

export const getApprovalList = async (page, filter, col, order) =>
  await http.post(
    `/information/filter?page=${page - 1}&pageSize=15`,
    {
      status: [GLOBAL_STATUS.SUBMITTED, GLOBAL_STATUS.REQ_UNPUBLISHED],
      primaryInventory: [],
      type: [],
      assignee: [],
      pagination: true,
      ...filter,
    },
    {
      headers: {
        order: order,
        col: col,
      },
    }
  );

export const updateSingleApproval = async (data) =>
  await http.put("/information/" + data.informationId, data);
