import React, { useMemo, useState } from "react";
import defaultContext from "./defaultContext";

export const userContext = React.createContext(defaultContext);

const AuthProvider = ({ children }) => {
  // const userinfo = {
  //       isLogin: true,
  //       userDetails: {
  //           firstName: 'Mr ',
  //           lastName: 'Tester2',
  //           email: 'tester2@icamps.in',
  //           mobileNo: null,
  //       },
  //       screens: {
  //           apps: ['view', '1000', 'approve/reject', '0100'],
  //           network: ['view', '1000'],
  //           'blacklisted number': ['view', '1000', 'approve/reject', '0100'],
  //           'best practices': ['view', '1000'],
  //           'phising link': ['view', '1000'],
  //           email: ['view', '1000'],
  //           sms: ['view', '1000'],
  //           'cyber cell': ['view', '1000'],
  //           issue: ['view', '1000'],
  //           user: ['view', '1000'],
  //           miscellaneous: ['view', '1000'],
  //           news: ['approve/reject', '0100', 'view', '1000'],
  //           roles: ['view', '1000'],
  //           advisory: ['approve/reject', '0100', 'view', '1000'],
  //           fraud: ['view', '1000'],
  //           vulnerability: ['approve/reject', '0100', 'view', '1000'],
  //           alert: ['approve/reject', '0100', 'view', '1000'],
  //           'about icamps': ['view', '1000'],
  //           devices: ['approve/reject', '0100', 'view', '1000'],
  //           os: ['view', '1000', 'approve/reject', '0100'],
  //       },
  //       token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImFkZjVlNzEwZWRmZWJlY2JlZmE5YTYxNDk1NjU0ZDAzYzBiOGVkZjgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1MzE2ODc5NTkxNDYtYzhram1udDAwNWwzc3RjM2FuOXM0bnMxYzN1bmQ0M3UuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1MzE2ODc5NTkxNDYtYzhram1udDAwNWwzc3RjM2FuOXM0bnMxYzN1bmQ0M3UuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDE4MDM2NDg0MDA0NzYyMTM3MTMiLCJoZCI6ImljYW1wcy5pbiIsImVtYWlsIjoidGVzdGVyMkBpY2FtcHMuaW4iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmJmIjoxNzExNjk5MTc4LCJuYW1lIjoiTXIgVGVzdGVyMiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJbnhMczlNT1oxU29maGFKYzVQYjlmUmxJSmNkTEExSll3clAwSVRLTTk9czk2LWMiLCJnaXZlbl9uYW1lIjoiTXIiLCJmYW1pbHlfbmFtZSI6IlRlc3RlcjIiLCJpYXQiOjE3MTE2OTk0NzgsImV4cCI6MTcxMTcwMzA3OCwianRpIjoiZDgyMWQzNzM0ZjVmMGUyNmE5MDkwOTE3Y2JjNGY3NGNiZWFkMzk0YiJ9.VmE7UeRUtA7Aw1Fzc37TQ8tNLWVP1DuaqwMOovrnpA5Sa2rKUK2h3NQy7Ljo8RIXI-xtdGQ3zB-eb9xIRvWnjIGmK4q_Wuu2xu_XrUUih6oOM77vZ74KBNQlTGx-279bXJk0PmafW9hwt1O5nMhhP-Vm-HdbbYyGWiKAzZfpxjmfMPh80eV1-xE_f4a8uDQF2-8D7gURgUI0OBasxAH-jWw4LSoT7x1Uf2Q7B4g7GRLfndk_0BgyvWxYSkUB4pyTyFnFw5IWsPpU9iVTuw01L9h2cStzXYvwLLUg4l2O6_Fny6o8UuPn-v3gvS_l5ejtr80Rs9vzk-3pT71EBtE0UA',
  //       userid: '',
  //       userId: 'e0764765-3acf-48f1-9e30-18f22782d818',
  //   };
  //   localStorage.setItem('userInfo', JSON.stringify(userinfo));
  const [userDetails, setUserDetails] = useState(
    localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : {
          isLogin: false,
          userDetails: {},
          screens: {},
          token: null,
          userid: "",
        }
  );
  const [error, setError] = useState({
    title: [],
    message: [],
  });

  const [loading, setLoading] = useState(false);

  const setAuth = (data) => {
    setUserDetails(data);
  };

  return (
    <userContext.Provider
      value={useMemo(() => ({
        auth: userDetails,
        setAuth: setAuth,
        error: error,
        setError: setError,
        loading,
        setLoading,
      }))}
    >
      {children}
    </userContext.Provider>
  );
};

export default AuthProvider;
