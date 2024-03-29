import { GLOBAL_STATUS } from "../../../common/global.constant";
import { http } from "../../../services/httpServices";

export const getAdvisoryList = async (page, filter, col, order) => {
  const resp = await http.post(
    `/information/filter?page=${page - 1}&pageSize=15`,
    {
      status: [GLOBAL_STATUS.ADVICE_A, GLOBAL_STATUS.ADVICE_C],
      primaryInventory: [],
      type: [],
      assignee: [],
      pagination: true,
      ...filter,
    },
    {
      headers: {
        col: col,
        order: order,
      },
    }
  );
  return resp;
};
