import { GLOBAL_STATUS } from "../../../../common/global.constant";
import { http } from "../../../../services/httpServices";

const getDevices = async ({ page = 1, filterData, col, order }) =>
  await http.post(
    `/inventory/device/filter?page=${page - 1}&pageSize=15`,
    {
      manufacturerName: [],
      status: [GLOBAL_STATUS.ADVICE_A, GLOBAL_STATUS.ADVICE_C],
      pagination: true,

      ...filterData,
    },
    {
      headers: {
        order: order,
        col: col,
      },
    }
  );

export const getGpuData = async () => await http.get("/gpu");

export const getCpuData = async () => await http.get("/cpu");

export { getDevices };
