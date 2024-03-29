import { GLOBAL_STATUS } from "../../../common/global.constant";
import { http } from "../../../services/httpServices";

export const getApprovalDeviceList = async (page, filter,col,order) => {
  const resp = await http.post(
    `/inventory/device/filter?page=${page - 1}&pageSize=15`,
    {
      manufacturerName: [],
      status: [GLOBAL_STATUS.SUBMITTED, GLOBAL_STATUS.REQ_UNPUBLISHED],
      pagination: true,
      ...filter,
    },{
      headers: {
        order: order,
        col: col,
      },
    }
  );
  return resp;
};

export const updateSingleApprovalDevice = async (data) => {
  const resp = await http.put("/inventory/device/" + data.deviceId, data);
  return resp;
};
