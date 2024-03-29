import React, { useState } from "react";
import NoLoginHeader from "../../common/components/headers/NoLoginHeader";
import LoginImage from "../../assets/images/login-image.png";
import "./Login.scss";
import { useAuth } from "../../common/hooks/useAuth";
import { toast } from "react-hot-toast";
import { SSOLogin } from "./services/login.services";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import CircularLoader from "../../common/components/CircularLoader/CircularLoader";
import { permissionTransform } from "./login.helper";
import { http } from "../../services/httpServices";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const clientId =
    "531687959146-c8kjmnt005l3stc3an9s4ns1c3und43u.apps.googleusercontent.com";

  const { auth, setAuth } = useAuth();

  const loginProcess = (data, token = "") => {
    const body = {
      ...auth,
      screens: permissionTransform(data.roles),
      userDetails: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobileNo: data.mobileNo,
      },
      userId: data.userId,
      isLogin: true,
      token: token,
    };
    http.defaults.headers = { Authorization: `Bearer ${token}` };
    localStorage.setItem("userInfo", JSON.stringify(body));
    setAuth(body);
  };

  const handleSSO = async (token) => {
    try {
      setLoading(true);
      if (!token) {
        toast.error("Please Login with Google");
        setLoading(false);
        return;
      }
      console.log("token",token);
      const resp = await SSOLogin(token);

      if (resp?.data) {
        loginProcess(resp?.data, token);
        setLoading(false);
      } else {
        toast.error("Login failed");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }
  };

  return (
    <>
      <NoLoginHeader />
      <div className="login-container">
        <div className="login-image">
          <img src={LoginImage} alt="login-image" />
        </div>
        <div className="form-wrapper">
          <h3>Welcome!</h3>
          <h4>Login your account</h4>
          <form>
            <div
              className="button-container"
              {...(loading && { style: { width: 200 } })}
            >
              {!loading ? (
                <div>
                  <GoogleOAuthProvider clientId={clientId}>
                    <GoogleLogin
                      width={150}
                      size="large"
                      className="ssobutton"
                      onSuccess={(credentialResponse) => {
                        handleSSO(credentialResponse?.credential);
                      }}
                      onError={() => {
                        toast.error("Login failed. Please try again later!!");
                      }}
                    />
                  </GoogleOAuthProvider>
                </div>
              ) : (
                <CircularLoader />
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
