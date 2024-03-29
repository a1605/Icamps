import React from "react";
import "./UpsertUserProfile.scss";
import { Switch } from "@mui/material";
import StatusBadge from "../../../../common/components/statusBadge/StatusBadge";
import { useAuth } from "../../../../common/hooks/useAuth";
import InputBox from "../../../../common/components/InputBox/InputBox";
import { PAGE_TYPE } from "../../../../common/global.constant";
//toogle button style
import { alpha, styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: green[500],
    "&:hover": {
      backgroundColor: alpha(green[500], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: green[500],
  },
}));

export const UpsertUserProfile = ({
  type,
  setPayload,
  payload,
  screenType,
}) => {
  const { setError } = useAuth();

  const handleDataInput = (e) => {
    let newValue;
    setError({
      title: [],
      message: [],
    });

    if (e.target.name === "status") {
      newValue = {
        ...payload,
        [e?.target?.name]: e?.target?.checked,
      };
    } else {
      newValue = {
        ...payload,
        [e?.target?.name]: e?.target?.value,
      };
    }

    setPayload((prev) => ({ ...prev, ...newValue }));
  };
  return (
    <>
      <div className="user-profile-container">
        {screenType !== PAGE_TYPE.VIEW && type !== PAGE_TYPE.PROFILE ? (
          <div className="user-name">
            <div className="input-container">
              <div className="label-mandatory-container title-container">
                <label className="label-text" htmlFor="fname">
                  First name
                </label>
                {screenType === PAGE_TYPE.CREATE && <span>*</span>}
              </div>

              <InputBox
                type="text"
                name="firstName"
                id="fname"
                placeholder="Enter First Name*"
                className={`fname ${
                  screenType === PAGE_TYPE.VIEW || type === PAGE_TYPE.PROFILE
                    ? "remove-borders"
                    : ""
                }`}
                value={payload?.firstName}
                onChange={handleDataInput}
                title="user-firstname"
              />
            </div>
            <div className="input-container">
              <div className="title-container">
                <label className="label-text" htmlFor="lname">
                  Last name{" "}
                </label>
                {screenType === PAGE_TYPE.CREATE && <span>*</span>}
              </div>

              <InputBox
                type="text"
                name="lastName"
                placeholder="Enter Last Name*"
                id="lname"
                className={`lname ${
                  screenType === PAGE_TYPE.VIEW || type === PAGE_TYPE.PROFILE
                    ? "remove-borders"
                    : ""
                }`}
                value={payload?.lastName}
                onChange={handleDataInput}
                title="user-lastname"
              />
            </div>
          </div>
        ) : (
          <div className="userName">
            <div className="input-container">
              <div className="title-container">
                <label className="label-text" htmlFor="uname">
                  User name
                </label>
                {screenType === PAGE_TYPE.CREATE && <span>*</span>}
              </div>

              <InputBox
                type="text"
                name="userName"
                id="fname"
                className={`fname ${
                  screenType === PAGE_TYPE.VIEW || type === PAGE_TYPE.PROFILE
                    ? "remove-borders"
                    : ""
                }`}
                value={payload?.firstName + " " + payload?.lastName}
                onChange={handleDataInput}
                disabled={true}
              />
            </div>
          </div>
        )}
        <div className="vertical-line"></div>

        <div className="user-email input-container">
          <div className="label-mandatory-container title-container">
            <label className="label-text" htmlFor="email ">
              Email ID
            </label>
            {screenType === PAGE_TYPE.CREATE && <span>*</span>}
          </div>
          <InputBox
            type="text"
            name="email"
            placeholder="Enter Email*"
            className={`email ${
              screenType !== PAGE_TYPE.CREATE ? "remove-borders" : ""
            }`}
            id="email"
            value={payload?.email}
            onChange={handleDataInput}
            disabled={screenType !== PAGE_TYPE.CREATE}
            title="user-email"
          />
        </div>
        <div className="vertical-line"></div>

        <div className="user-mob input-container">
          <label className="label-text title-container" htmlFor="mob-no">
            Mobile number
          </label>
          <InputBox
            type="text"
            name="mobileNo"
            placeholder="Enter Mobile Number"
            className={`mob-no ${
              screenType === PAGE_TYPE.VIEW ? "remove-borders" : ""
            }`}
            id="mob-no"
            value={payload?.mobileNo}
            onChange={handleDataInput}
            disabled={screenType === PAGE_TYPE.VIEW}
            title="user-mobileNo"
          />
        </div>
        <div className="vertical-line"></div>

        {type !== PAGE_TYPE.PROFILE && (
          <div className="user-status input-container title-container">
            <label className="label-text" htmlFor="status">
              Status
            </label>
            {screenType !== PAGE_TYPE.VIEW ? (
              <GreenSwitch
                inputProps={{
                  name: "status",
                }}
                checked={payload?.status}
                id="status"
                onChange={handleDataInput}
                disabled={screenType === PAGE_TYPE.VIEW}
              />
            ) : (
              <StatusBadge status={payload?.status} />
            )}
          </div>
        )}
      </div>
    </>
  );
};
