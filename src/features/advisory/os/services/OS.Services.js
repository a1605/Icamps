import { GLOBAL_STATUS } from "../../../../common/global.constant";
import { http } from "../../../../services/httpServices";

const getOs = async ({ page = 1, filterData, col, order }) =>
  await http.post(
    `/inventory/os/filter?page=${page - 1}&pageSize=15`,
    {
      devices: [],
      status: [GLOBAL_STATUS.ADVICE_C, GLOBAL_STATUS.ADVICE_A],
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

const getOsFilter = async () => {
  const response = await http.get(`/inventory/os`);
  return response;
};

export { getOsFilter, getOs };
