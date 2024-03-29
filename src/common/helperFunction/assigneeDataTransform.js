import { useAuth } from "../hooks/useAuth";

export const transformAssigneeData = (data) => {
  const { auth } = useAuth();
  if (!data) return [];
  let arr = [{ id: auth.userDetails.email, label: "Assigned to me" }];
  data.forEach((item) => {
    if (auth.userDetails.email !== item.email) {
      arr.push({
        id: `${item.email}`,
        label: `${item.email}`,
      });
    }
  });
  return arr;
};
