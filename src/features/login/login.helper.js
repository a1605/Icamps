import { PERMISSION_MAPPING } from "../../common/global.constant";

export const permissionTransform = (data) => {
  let access = {};
  data.forEach((val) => {
    val.permissions?.forEach((item) => {
      access[item.title] = access[item.title]
        ? [...access[item.title], item.name]
        : [item.name];
      if (
        (item.name === PERMISSION_MAPPING.VIEW ||
          item.name === PERMISSION_MAPPING.CREATE ||
          item.name === PERMISSION_MAPPING.UPDATE ||
          item.name === PERMISSION_MAPPING.DELETE) &&
        !access[item.title]?.includes("1000")
      ) {
        access[item.title] = access[item.title]
          ? [...access[item.title], "1000"]
          : ["1000"];
      } else if (
        item.name === PERMISSION_MAPPING.APPROVER &&
        !access[item.title]?.includes("0100")
      ) {
        access[item.title] = access[item.title]
          ? [...access[item.title], "0100"]
          : ["0100"];
      } else if (
        item.name === PERMISSION_MAPPING.ADVISOR &&
        !access[item.title]?.includes("0010")
      ) {
        access[item.title] = access[item.title]
          ? [...access[item.title], "0010"]
          : ["0010"];
      } else if (
        item.name === PERMISSION_MAPPING.BROADCAST &&
        !access[item.title]?.includes("0001")
      ) {
        access[item.title] = access[item.title]
          ? [...access[item.title], "0001"]
          : ["0001"];
      }
    });
  });
  return access;
};
