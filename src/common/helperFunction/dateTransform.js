import dayjs from "dayjs";

export const dateTransform = (value) =>
  dayjs(value).format("YYYY-MM-DD HH:mm:ss");

export const onlyDateTransform = (value) => {
  return dayjs(value).format("YYYY/MM/DD") !== "Invalid Date"
    ? dayjs(value).format("YYYY/MM/DD")
    : "--";
};

export const commentDateTransform = (value) =>
  dayjs(value).format("DD MMMM, YYYY [at] hh:mmA");
  // dayjs(dayjs(value).add(5.5, "hour")).format("DD MMMM, YYYY [at] hh:mmA");

export const issueFixDateTransform = (value) => {
  return dayjs(value).format("YYYY-MM-DD") !== "Invalid Date"
    ? dayjs(value).format("YYYY-MM-DD")
    : null;
};

export const defaultDateDayjs = (value) => {
  if (!value || value === "null" || value === undefined) {
    return dayjs("01-01-1900");
  } else return dayjs(value);
};

export const serverFormatDateDayjs = (value) => {
  return dayjs(value).format("YYYY-MM-DD");
};