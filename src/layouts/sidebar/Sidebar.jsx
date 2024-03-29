import React, { useState } from "react";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { NavLink } from "react-router-dom";
import "./Sidebar.scss";
import {
  dashboardIcon,
  issuesActionsIcon,
  informationIcon,
  inventoryIcon,
  rolesIcon,
  usersIcon,
  Miscellaneous,
  Advise,
  ticketsIcon,
  
  Feedback,
  Icamps,
} from "../../assets/icons";
import { GrFormUp, GrFormDown } from "react-icons/gr";
import { useAuth } from "../../common/hooks/useAuth";
import { Tooltip } from "@mui/material";

const Sidebar = () => {
  const { auth } = useAuth();
  const [openInventory, setOpenInventory] = useState(
    JSON.parse(localStorage.getItem("openInventory"))
  );

  const [openIcamps, setOpenIcamps] = useState(
    JSON.parse(localStorage.getItem("openIcamps"))
  );
  const [openApprovalRequest, setOpenApprovalRequest] = useState(
    JSON.parse(localStorage.getItem("openApprovalRequest"))
  );
  const [advisorRequest, setAdvisorRequest] = useState(
    JSON.parse(localStorage.getItem("advisorRequest"))
  );

  const [activeInventory, setactiveInventory] = useState(
    JSON.parse(localStorage.getItem("activeInventory"))
  );

  const [activeIcamps, setactiveIcamps] = useState(
    JSON.parse(localStorage.getItem("activeIcamps"))
  );
  const [activeApproval, setApproval] = useState(
    JSON.parse(localStorage.getItem("activeApproval"))
  );
  const [activeRequest, setRequest] = useState(
    JSON.parse(localStorage.getItem("activeRequest"))
  );

  const [collapse, setCollapse] = useState(true);

  const handleArrowClick = () => {
    return setCollapse(!collapse);
  };

  const handleClick = () => {
    if (collapse) {
      return setCollapse(false);
    }
  };

  const handleExpandMenu = (menuSection) => {
    if (collapse === false) {
      setCollapse(true);
      return;
    }
    setAdvisorRequest(false);
    setOpenApprovalRequest(false);
    setOpenInventory(false);
    setOpenIcamps(false);
    localStorage.setItem("openInventory", false);
    localStorage.setItem("openApprovalRequest", false);
    localStorage.setItem("advisorRequest", false);
    localStorage.setItem("openIcamps", false);
    switch (menuSection) {
      case "openInventory":
        setOpenInventory(!openInventory);
        localStorage.setItem("openInventory", !openInventory);
        break;
      case "openApprovalRequest":
        setOpenApprovalRequest(!openApprovalRequest);
        localStorage.setItem("openApprovalRequest", !openApprovalRequest);
        break;
      case "advisorRequest":
        setAdvisorRequest(!advisorRequest);
        localStorage.setItem("advisorRequest", !advisorRequest);
        break;
      case "openIcamps":
        setOpenIcamps(!openIcamps);
        localStorage.setItem("openIcamps", !openIcamps);
        break;
    }
  };
  const handleActiveMenu = (menuSection) => {
    setactiveInventory(false);
    setactiveIcamps(false);
    setApproval(false);
    setRequest(false);
    setAdvisorRequest(false);
    setOpenApprovalRequest(false);
    setOpenInventory(false);
    localStorage.setItem("activeInventory", false);
    localStorage.setItem("activeApproval", false);
    localStorage.setItem("activeRequest", false);
    switch (menuSection) {
      case "openInventory":
        setactiveInventory(true);
        setOpenInventory(true);
        localStorage.setItem("openInventory", true);
        localStorage.setItem("activeInventory", true);
        break;
      case "openApprovalRequest":
        setApproval(true);
        setOpenApprovalRequest(true);
        localStorage.setItem("openApprovalRequest", openApprovalRequest);
        localStorage.setItem("activeApproval", true);
        break;
      case "advisorRequest":
        setRequest(true);
        setAdvisorRequest(true);
        localStorage.setItem("advisorRequest", advisorRequest);
        localStorage.setItem("activeRequest", true);
        break;
      case "openIcamps":
        setactiveIcamps(true);
        setOpenIcamps(true);
        localStorage.setItem("openIcamps", true);
        localStorage.setItem("activeIcamps", true);
        break;
    }
  };

  return (
    <>
      <div className={`sidebar  ${!collapse ? "collapsible-sidebar" : ""}`}>
        <div className={`switchButton ${!collapse ? "isCollapsed" : ""}`}>
          {/* <h1>sada</h1> */}
          <Tooltip title={collapse ? "Minimize" : "Expand"}>
            <ExpandCircleDownIcon
              className={collapse ? "arrowNav" : "arrowNavOnhover"}
              onClick={handleArrowClick}
            />
          </Tooltip>
        </div>
        <div className="sidebar-container">
          <ul className="sidebar-items">
            <li className="no-list-style">
              <NavLink
                onClick={() => {
                  handleActiveMenu("");
                  handleExpandMenu("");
                }}
                to="/dashboard"
                className={({ isActive }) => (isActive ? "activeclass" : "")}
              >
                {collapse ? (
                  <img src={dashboardIcon} alt="nav-icon" />
                ) : (
                  <Tooltip title="Dashboard">
                    <img src={dashboardIcon} alt="nav-icon" />
                  </Tooltip>
                )}
                <p className={!collapse ? "collapsible" : ""}>Dashboard</p>
              </NavLink>
            </li>
            <p className={`menu-section ${!collapse ? "collapsible" : ""}`}>
              ADMIN SECTION
            </p>
            {/* {auth.screens.user?.includes("1000") && ( */}
              <li className="no-list-style">
                <NavLink
                  onClick={() => {
                    handleActiveMenu("");
                    handleExpandMenu("");
                  }}
                  to="/users"
                  className={({ isActive }) => (isActive ? "activeclass" : "")}
                >
                  {collapse ? (
                    <img src={usersIcon} alt="nav-icon" />
                  ) : (
                    <Tooltip title="User">
                      <img src={usersIcon} alt="nav-icon" />
                    </Tooltip>
                  )}
                  <p className={!collapse ? "collapsible" : ""}>Users</p>
                </NavLink>
              </li>
            {/* )} */}
            {/* {auth.screens.issue?.includes("1000") && ( */}
              <li className="no-list-style">
                <NavLink
                  onClick={() => {
                    handleActiveMenu("");
                    handleExpandMenu("");
                  }}
                  className={({ isActive }) => (isActive ? "activeclass" : "")}
                  to="/issues-action/issues"
                >
                  {collapse ? (
                    <img src={issuesActionsIcon} alt="nav-icon" />
                  ) : (
                    <Tooltip title="Issues & Action">
                      <img src={issuesActionsIcon} alt="nav-icon" />
                    </Tooltip>
                  )}
                  <p className={!collapse ? "collapsible" : ""}>
                    Issue & Action
                  </p>
                </NavLink>
              </li>
            {/* )} */}
            {/* {auth.screens.roles?.includes("1000") && ( */}
              <li className="no-list-style">
                <NavLink
                  onClick={() => {
                    handleActiveMenu("");
                    handleExpandMenu("");
                  }}
                  className={({ isActive }) => (isActive ? "activeclass" : "")}
                  to="/roles"
                >
                  {collapse ? (
                    <img src={rolesIcon} alt="nav-icon" />
                  ) : (
                    <Tooltip title="Roles">
                      <img src={rolesIcon} alt="nav-icon" />
                    </Tooltip>
                  )}
                  <p className={!collapse ? "collapsible" : ""}>Roles</p>
                </NavLink>
              </li>
            {/* )} */}
            {/* {auth?.screens?.miscellaneous?.includes("1000") && ( */}
              <li className="no-list-style">
                <NavLink
                  onClick={() => {
                    handleActiveMenu("");
                    handleExpandMenu("");
                  }}
                  className={({ isActive }) => (isActive ? "activeclass" : "")}
                  to="/miscellaneous/manufacturer"
                >
                  <img src={Miscellaneous} alt="nav-icon" />
                  <p className={!collapse ? "collapsible" : ""}>
                    Miscellaneous
                  </p>
                </NavLink>
              </li>
            {/* )} */}
            {/* {(auth?.screens["about icamps"]?.includes("1000") ||
              auth?.screens.FAQ?.includes("1000")) && ( */}
              <>
                {/* {(auth?.screens["about icamps"]?.includes("1000") ||
                  auth?.screens.FAQ?.includes("1000")) && ( */}
                  <li className="no-list-style">
                    <NavLink
                      onClick={() => {
                        handleExpandMenu("openIcamps");
                      }}
                      className={activeIcamps ? "activeclass" : ""}
                    >
                      {collapse ? (
                        <img src={Icamps} alt="nav-icon" />
                      ) : (
                        <Tooltip title="Icamps">
                          <img src={Icamps} alt="nav-icon" />
                        </Tooltip>
                      )}

                      <p className={!collapse ? "collapsible" : ""}>
                        ICAMPS&nbsp;&nbsp;
                      </p>
                      <div
                        className={`expand-list ${
                          !collapse ? "collapsible" : ""
                        }`}
                      >
                        {openIcamps ? <GrFormUp /> : <GrFormDown />}
                      </div>
                    </NavLink>
                  </li>
                {/* )} */}
                <ul
                  className={`accordion ${
                    openIcamps ? "visible" : "invisible"
                  } `}
                >
                  {/* {auth.screens["about icamps"]?.includes("1000") && ( */}
                    <li>
                      <NavLink
                        onClick={() => {
                          handleActiveMenu("openIcamps");
                        }}
                        className={({ isActive }) =>
                          isActive ? "activeclass" : ""
                        }
                        to="/about-us"
                      >
                        <p>About</p>
                      </NavLink>
                    </li>
                  {/* )} */}
                  {/* {auth?.screens.FAQ?.includes("1000") && ( */}
                    <li>
                      <NavLink
                        onClick={() => {
                          handleActiveMenu("openIcamps");
                        }}
                        className={({ isActive }) =>
                          isActive ? "activeclass" : ""
                        }
                        to="/faq"
                      >
                        <p>FAQ</p>
                      </NavLink>
                    </li>
                  {/* )} */}
                </ul>
              </>
            {/* )} */}
            {/* {auth?.screens?.feedback?.includes("1000") && ( */}
              <li className="no-list-style">
                <NavLink
                  to={"/inventory/feedback"}
                  onClick={() => {
                    handleActiveMenu("");
                    handleExpandMenu("");
                  }}
                  className={({ isActive }) => (isActive ? "activeclass" : "")}
                >
                  {collapse ? (
                    <img src={Feedback} alt="nav-icon" />
                  ) : (
                    <Tooltip title="Feedback">
                      <img src={Feedback} alt="nav-icon" />
                    </Tooltip>
                  )}
                  <p className={!collapse ? "collapsible" : ""}>Feedbacks</p>
                </NavLink>
              </li>
            {/* )} */}
          </ul>

          <ul className="sidebar-items">
            {/* {(auth.screens.devices?.includes("1000") ||
              auth.screens.apps?.includes("1000") ||
              auth.screens.os?.includes("1000") ||
              auth.screens["best practices"]?.includes("1000") ||
              auth.screens.email?.includes("1000") ||
              auth.screens.network?.includes("1000") ||
              auth.screens["blacklisted number"]?.includes("1000") ||
              auth.screens.sms?.includes("1000") ||
              auth.screens["cyber cell"]?.includes("1000") ||
              auth.screens.links?.includes("1000") ||
              auth.screens.news?.includes("1000") ||
              auth.screens.vulnerabilities?.includes("1000") ||
              auth.screens.alert?.includes("1000") ||
              auth.screens.advisory?.includes("1000")) && ( */}
              <>
                <p
                  className={`"menu-section" ${!collapse ? "collapsible" : ""}`}
                >
                  ANALYST SECTION
                </p>
                {/* {(auth.screens.news?.includes("1000") ||
                  auth.screens.vulnerabilities?.includes("1000") ||
                  auth.screens.alert?.includes("1000") ||
                  auth.screens.advisory?.includes("1000")) && ( */}
                  <li className="no-list-style">
                    <NavLink
                      onClick={() => {
                        handleActiveMenu("");
                        handleExpandMenu("");
                      }}
                      to={"/information"}
                      className={({ isActive }) =>
                        isActive ? "activeclass" : ""
                      }
                    >
                      {collapse ? (
                        <img src={informationIcon} alt="nav-icon" />
                      ) : (
                        <Tooltip title="Information">
                          <img src={informationIcon} alt="nav-icon" />
                        </Tooltip>
                      )}
                      <p className={!collapse ? "collapsible" : ""}>
                        Information
                      </p>
                    </NavLink>
                  </li>
                {/* )} */}
              </>
            {/* )} */}

            {/* {(auth.screens.devices?.includes("1000") ||
              auth.screens.apps?.includes("1000") ||
              auth.screens.os?.includes("1000") ||
              auth.screens["best practices"]?.includes("1000") ||
              auth.screens.email?.includes("1000") ||
              auth.screens.network?.includes("1000") ||
              auth.screens["blacklisted number"]?.includes("1000") ||
              auth.screens.sms?.includes("1000") ||
              auth.screens["cyber cell"]?.includes("1000") ||
              auth.screens.links?.includes("1000")) && ( */}
              <>
                <li className="no-list-style">
                  <NavLink
                    onClick={() => {
                      handleExpandMenu("openInventory");
                    }}
                    className={activeInventory ? "activeclass" : ""}
                  >
                    {collapse ? (
                      <img src={inventoryIcon} alt="nav-icon" />
                    ) : (
                      <Tooltip title="Inventory">
                        <img src={inventoryIcon} alt="nav-icon" />
                      </Tooltip>
                    )}
                    <p className={!collapse ? "collapsible" : ""}>
                      Inventory &nbsp;&nbsp;
                    </p>
                    <div
                      className={`expand-list ${
                        !collapse ? "collapsible" : ""
                      }`}
                    >
                      {openInventory ? <GrFormUp /> : <GrFormDown />}
                    </div>
                  </NavLink>
                </li>
                <ul
                  className={`accordion ${
                    openInventory ? "visible" : "invisible"
                  }`}
                >
                  {/* {auth.screens.devices?.includes("1000") && ( */}
                    <li className={!collapse ? "collapsible" : ""}>
                      <NavLink
                        onClick={() => handleActiveMenu("openInventory")}
                        to={"/inventory/devices"}
                        className={({ isActive }) =>
                          isActive ? "activeclass" : ""
                        }
                      >
                        <p className={!collapse ? "collapsible" : ""}>
                          Devices
                        </p>
                      </NavLink>
                    </li>
                  {/* )} */}
                  {/* {auth.screens.apps?.includes("1000") && ( */}
                    <li className={!collapse ? "collapsible" : ""}>
                      <NavLink
                        onClick={() => handleActiveMenu("openInventory")}
                        to={"/inventory/apps"}
                        className={({ isActive }) =>
                          isActive ? "activeclass" : ""
                        }
                      >
                        <p>App</p>
                      </NavLink>
                    </li>
                  {/* )} */}
                  {/* {auth.screens.os?.includes("1000") && ( */}
                    <li className={!collapse ? "collapsible" : ""}>
                      <NavLink
                        onClick={() => handleActiveMenu("openInventory")}
                        to={"/inventory/os"}
                        className={({ isActive }) =>
                          isActive ? "activeclass" : ""
                        }
                      >
                        <p className={!collapse ? "collapsible" : ""}>OS</p>
                      </NavLink>
                    </li>
                  {/* )} */}
                  {/* {auth.screens["blacklisted number"]?.includes("1000") && ( */}
                    <li className={!collapse ? "collapsible" : ""}>
                      <NavLink
                        onClick={() => handleActiveMenu("openInventory")}
                        to={"/inventory/blacklistedNumber"}
                        className={({ isActive }) =>
                          isActive ? "activeclass" : ""
                        }
                      >
                        <p className={!collapse ? "collapsible" : ""}>
                          Blacklisted Numbers
                        </p>
                      </NavLink>
                    </li>
                  {/* )} */}
                  {/* {auth.screens["cyber cell"]?.includes("1000") && ( */}
                    <li className={!collapse ? "collapsible" : ""}>
                      <NavLink
                        onClick={() => handleActiveMenu("openInventory")}
                        to={"/inventory/cyber-security"}
                        className={({ isActive }) =>
                          isActive ? "activeclass" : ""
                        }
                      >
                        <p className={!collapse ? "collapsible" : ""}>
                          Cyber Security
                        </p>
                      </NavLink>
                    </li>
                  {/* )} */}

                  {/* {auth.screens.network?.includes("1000") && ( */}
                    <li className={!collapse ? "collapsible" : ""}>
                      <NavLink
                        onClick={() => handleActiveMenu("openInventory")}
                        to="/inventory/network"
                        className={({ isActive }) =>
                          isActive ? "activeclass" : ""
                        }
                      >
                        <p className={!collapse ? "collapsible" : ""}>
                          Network
                        </p>
                      </NavLink>
                    </li>
                  {/* )} */}

                  {/* {auth.screens["best practices"]?.includes("1000") && ( */}
                    <li className={!collapse ? "collapsible" : ""}>
                      <NavLink
                        onClick={() => handleActiveMenu("openInventory")}
                        to={"/inventory/best-practice"}
                        className={({ isActive }) =>
                          isActive ? "activeclass" : ""
                        }
                      >
                        <p className={!collapse ? "collapsible" : ""}>
                          Best Practices
                        </p>
                      </NavLink>
                    </li>
                  {/* )} */}
                  {/* {auth.screens.fraud?.includes("1000") && ( */}
                    <li className={!collapse ? "collapsible" : ""}>
                      <NavLink
                        onClick={() => handleActiveMenu("openInventory")}
                        to={"/inventory/fraud"}
                        className={({ isActive }) =>
                          isActive ? "activeclass" : ""
                        }
                      >
                        <p>Fraud</p>
                      </NavLink>
                    </li>
                  {/* )} */}
                  {/* {auth.screens["phising link"]?.includes("1000") && ( */}
                    <li className={!collapse ? "collapsible" : ""}>
                      <NavLink
                        onClick={() => handleActiveMenu("openInventory")}
                        to={"/inventory/phising-link"}
                        className={({ isActive }) =>
                          isActive ? "activeclass" : ""
                        }
                      >
                        <p>Phising Link</p>
                      </NavLink>
                    </li>
                  {/* )} */}
                  {/* {auth.screens.sms?.includes("1000") && ( */}
                    <li className={!collapse ? "collapsible" : ""}>
                      <NavLink
                        onClick={() => handleActiveMenu("openInventory")}
                        to={"/inventory/sms"}
                        className={({ isActive }) =>
                          isActive ? "activeclass" : ""
                        }
                      >
                        <p>SMS</p>
                      </NavLink>
                    </li>
                  {/* )} */}
                  {/* {auth.screens.email?.includes("1000") && ( */}
                    <li className={!collapse ? "collapsible" : ""}>
                      <NavLink
                        onClick={() => handleActiveMenu("openInventory")}
                        to={"/inventory/email"}
                        className={({ isActive }) =>
                          isActive ? "activeclass" : ""
                        }
                      >
                        <p>Email</p>
                      </NavLink>
                    </li>
                  {/* )} */}
                </ul>
              </>
            {/* )} */}
          </ul>

          {/* {(auth.screens.devices?.includes("0100") ||
            auth.screens.apps?.includes("0100") ||
            auth.screens.os?.includes("0100") ||
            auth.screens["best practices"]?.includes("0100") ||
            auth.screens["blacklisted number"]?.includes("0100") ||
            auth.screens.news?.includes("0100") ||
            auth.screens.vulnerabilities?.includes("0100") ||
            auth.screens.alert?.includes("0100") ||
            auth.screens.advisory?.includes("0100")) && ( */}
            <ul className="sidebar-items">
              <p className={`"menu-section" ${!collapse ? "collapsible" : ""}`}>
                APPROVER SECTION
              </p>
              <li className="no-list-style">
                <NavLink
                  onClick={() => {
                    handleExpandMenu("openApprovalRequest");
                  }}
                  className={activeApproval ? "activeclass" : ""}
                >
                  {collapse ? (
                    <img src={ticketsIcon} alt="nav-icon" />
                  ) : (
                    <Tooltip title="Request for Approval">
                      <img src={ticketsIcon} alt="nav-icon" />
                    </Tooltip>
                  )}
                  <p className={!collapse ? "collapsible" : ""}>
                    Request for Approval
                  </p>
                  <div
                    className={`expand-list ${!collapse ? "collapsible" : ""}`}
                  >
                    {openApprovalRequest ? <GrFormUp /> : <GrFormDown />}
                  </div>
                </NavLink>
              </li>
              <ul
                className={`accordion ${
                  openApprovalRequest ? "visible" : "invisible"
                }`}
              >
                {/* {(auth.screens.news?.includes("0100") ||
                  auth.screens.alert?.includes("0100") ||
                  auth.screens.advisory?.includes("0100") ||
                  auth.screens.vulnerabilities?.includes("0100")) && ( */}
                  <li className={!collapse ? "collapsible" : ""}>
                    <NavLink
                      onClick={() => handleActiveMenu("openApprovalRequest")}
                      to={"/approval/information"}
                      className={({ isActive }) =>
                        isActive ? "activeclass" : ""
                      }
                    >
                      <p>Information</p>
                    </NavLink>
                  </li>
                {/* )} */}
                {/* {auth.screens.devices?.includes("0100") && ( */}
                  <li className={!collapse ? "collapsible" : ""}>
                    <NavLink
                      onClick={() => handleActiveMenu("openApprovalRequest")}
                      to={"inventory/approval/devices"}
                      className={({ isActive }) =>
                        isActive ? "activeclass" : ""
                      }
                    >
                      <p>Devices</p>
                    </NavLink>
                  </li>
                {/* )} */}
                {/* {auth.screens.apps?.includes("0100") && ( */}
                  <li className={!collapse ? "collapsible" : ""}>
                    <NavLink
                      onClick={() => handleActiveMenu("openApprovalRequest")}
                      to={"/inventory/approval/apps"}
                      className={({ isActive }) =>
                        isActive ? "activeclass" : ""
                      }
                    >
                      <p>App</p>
                    </NavLink>
                  </li>
                {/* )} */}
                {/* {auth.screens.os?.includes("0100") && ( */}
                  <li className={!collapse ? "collapsible" : ""}>
                    <NavLink
                      onClick={() => handleActiveMenu("openApprovalRequest")}
                      to={"/inventory/approval/os"}
                      className={({ isActive }) =>
                        isActive ? "activeclass" : ""
                      }
                    >
                      <p>OS</p>
                    </NavLink>
                  </li>
                {/* )} */}

                {/* {auth.screens["blacklisted number"]?.includes("0100") && ( */}
                  <li className={!collapse ? "collapsible" : ""}>
                    <NavLink
                      onClick={() => handleActiveMenu("openApprovalRequest")}
                      to={"/inventory/approval/blacklistedNumber"}
                      className={({ isActive }) =>
                        isActive ? "activeclass" : ""
                      }
                    >
                      <p>Blacklist Numbers</p>
                    </NavLink>
                  </li>
                {/* )} */}
              </ul>
            </ul>
          {/* )} */}

          {/* {(auth.screens.devices?.includes("0010") ||
            auth.screens.apps?.includes("0010") ||
            auth.screens.os?.includes("0010") ||
            auth.screens["best practices"]?.includes("0010") ||
            auth.screens["blacklisted number"]?.includes("0010") ||
            auth.screens.news?.includes("0010") ||
            auth.screens.vulnerabilities?.includes("0010") ||
            auth.screens.alert?.includes("0010") ||
            auth.screens.advisory?.includes("0010")) && ( */}
            <ul className="sidebar-items">
              <p className={`"menu-section" ${!collapse ? "collapsible" : ""}`}>
                ADVISOR SECTION
              </p>
              <li className="no-list-style">
                <NavLink
                  onClick={() => {
                    handleExpandMenu("advisorRequest");
                  }}
                  className={activeRequest ? "activeclass" : ""}
                >
                  {collapse ? (
                    <img src={Advise} alt="nav-icon" />
                  ) : (
                    <Tooltip title="Request for Advice">
                      <img src={Advise} alt="nav-icon" />
                    </Tooltip>
                  )}
                  <p className={!collapse ? "collapsible" : ""}>
                    Request for Advice &nbsp;&nbsp;
                  </p>
                  <div
                    className={`expand-list ${!collapse ? "collapsible" : ""}`}
                  >
                    {advisorRequest ? <GrFormUp /> : <GrFormDown />}
                  </div>
                </NavLink>
              </li>
              <ul
                className={`accordion ${
                  advisorRequest ? "visible" : "invisible"
                }`}
              >
                {/* {(auth.screens.news?.includes("0010") ||
                  auth.screens.alert?.includes("0010") ||
                  auth.screens.advisory?.includes("0010") ||
                  auth.screens.vulnerabilities?.includes("0010")) && ( */}
                  <li className={!collapse ? "collapsible" : ""}>
                    <NavLink
                      onClick={() => handleActiveMenu("advisorRequest")}
                      to={"/advisory/information"}
                      className={({ isActive }) =>
                        isActive ? "activeclass" : ""
                      }
                    >
                      <p>Information</p>
                    </NavLink>
                  </li>
                {/* )} */}
                {/* {auth.screens.devices?.includes("0010") && ( */}
                  <li className={!collapse ? "collapsible" : ""}>
                    <NavLink
                      onClick={() => handleActiveMenu("advisorRequest")}
                      to={"/inventory/advisor/devices"}
                      className={({ isActive }) =>
                        isActive ? "activeclass" : ""
                      }
                    >
                      <p>Devices</p>
                    </NavLink>
                  </li>
                {/* )} */}
                {/* {auth.screens.apps?.includes("0010") && ( */}
                  <li className={!collapse ? "collapsible" : ""}>
                    <NavLink
                      onClick={() => handleActiveMenu("advisorRequest")}
                      to={"/inventory/advisor/apps"}
                      className={({ isActive }) =>
                        isActive ? "activeclass" : ""
                      }
                    >
                      <p>App</p>
                    </NavLink>
                  </li>
                {/* )} */}
                {/* {auth.screens.os?.includes("0010") && ( */}
                  <li className={!collapse ? "collapsible" : ""}>
                    <NavLink
                      onClick={() => handleActiveMenu("advisorRequest")}
                      to={"/inventory/advisor/os"}
                      className={({ isActive }) =>
                        isActive ? "activeclass" : ""
                      }
                    >
                      <p>OS</p>
                    </NavLink>
                  </li>
                {/* )} */}

                {/* {auth.screens["blacklisted number"]?.includes("0010") && ( */}
                  <li className={!collapse ? "collapsible" : ""}>
                    <NavLink
                      onClick={() => handleActiveMenu("advisorRequest")}
                      to={"/inventory/advisor/blacklistedNumber"}
                      className={({ isActive }) =>
                        isActive ? "activeclass" : ""
                      }
                    >
                      <p>Blacklisted Numbers</p>
                    </NavLink>
                  </li>
                {/* )} */}
              </ul>
            </ul>
          {/* )} */}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
