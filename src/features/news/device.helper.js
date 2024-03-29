import { onlyDateTransform } from "../../common/helperFunction/dateTransform";

export const transformDeviceList = (data) => {
  if (!data) return [];
  let newArr = [];
  data?.forEach((item) => {
    if (item.manufacturer)
      newArr.push({
        id: item.deviceId,
        label: `${item.manufacturer?.name} | ${item.modelName} | ${item.modelNo}`,
      });
  });
  return newArr;
};
