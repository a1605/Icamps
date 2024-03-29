import { GLOBAL_STATUS } from "../../../common/global.constant";
import { http } from "../../../services/httpServices";

export const getApprovalOsList = async (page, filter,col,order) => {
  const resp = await http.post(
    `/inventory/os/filter?page=${page - 1}&pageSize=15`,
    {
      status: [GLOBAL_STATUS.SUBMITTED, GLOBAL_STATUS.REQ_UNPUBLISHED],
      devices: [],
      pagination: true,
      ...filter,
    }, {
      headers: {
        order: order,
        col: col,
      },
    }
  );
  return resp;
};

export const updateSingleApprovalOs = async (data) => {
  const resp = await http.put("/inventory/os/" + data.osId, data);
  return resp;
};
