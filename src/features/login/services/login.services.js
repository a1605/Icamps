import { http } from "../../../services/httpServices";

export const loginUser = (data) => {
  const response = http.post("/login", {
    emailId: data,
  });
  return response;
};

export const SSOLogin = async (data) =>
  await http.get("/user/login", {
    headers: {
      Authorization: `Bearer ${data}`,
    },
  });
