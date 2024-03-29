import React, { useState } from "react";
import { iCampsLogo } from "../../assets/images";
import { useAuth } from "../../common/hooks/useAuth";
import AssigneeTextField from "../../common/components/assigneeTextField/AssigneeTextField";
import { ArrowDropDown } from "@mui/icons-material";
import "./Header.scss";
import { Menu } from "@mui/material";
import { ListItemIcon, MenuItem } from "@mui/material";
import { BsPerson } from "react-icons/bs";
import { BiLogIn } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { auth, setAuth } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    if (anchorEl) setAnchorEl(null);
    else setAnchorEl(event.currentTarget);
  };
  const handleLogOut = () => {
    localStorage.clear();
    setAuth({
      isLogin: false,
      userDetails: {},
      screens: {},
      token: null,
      userid: "",
    });
  };

  const handleProfile = () => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    navigate(`/users/profile/view/${userData.userId}`);
  };

  return (
    <div className="app-header">
      <img src={iCampsLogo} alt="icamps-image" />
      <button onClick={handleClick}>
        <div className="profile">
          <div className="assignee-header-navbar">
            <AssigneeTextField name={auth.userDetails} show={false} />
          </div>
          <div className="user-details-header-navbar">
            <p>
              {`${auth.userDetails.firstName} ${auth.userDetails.lastName}`}
              <ArrowDropDown />
            </p>
            <p>{`${auth.userDetails.email.toLowerCase()}`}</p>
          </div>
          <div className="menueItem">
            <Menu
              keepMounted
              anchorEl={anchorEl}
              onClose={handleClose}
              open={Boolean(anchorEl)}
              className="profileMenu"
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  handleProfile();
                }}
              >
                <ListItemIcon>
                  <BsPerson />
                </ListItemIcon>
                Profile Setting
              </MenuItem>
              <hr className="borderLine"></hr>
              <MenuItem
                onClick={() => {
                  handleClose();
                  handleLogOut();
                }}
              >
                <ListItemIcon>
                  <BiLogIn />
                </ListItemIcon>
                Log Out
              </MenuItem>
            </Menu>
          </div>
        </div>
      </button>
    </div>
  );
};

export default Header;
