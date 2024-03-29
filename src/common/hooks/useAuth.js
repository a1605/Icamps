import { useContext } from "react";
import { userContext } from "../../context/UserContext";

export const useAuth = () => {
  return useContext(userContext);
};
