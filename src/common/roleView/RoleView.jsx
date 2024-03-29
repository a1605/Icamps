import React, { useState } from "react";
import "./RoleView.scss";
import { crossIcon } from "../../assets/images";

const RoleView = ({
  data = [],
  tableColumns = [],
  heading = "Associated Users",
  setOpenDrawer,
  openDrawer,
  roleName,
}) => {
  return (
    <>
      <div className={`show-chips-details ${openDrawer ? "show" : ""}`}>
        <div className="chips-details-main-container">
          <div className="header">
            <h3>{heading}</h3>
            <div>
              <button onClick={() => setOpenDrawer(false)}>
                <img src={crossIcon} alt="cross-icon" />
              </button>
            </div>
          </div>
          <span className="role-name">
            Role Name : <span style={{ fontWeight: "bold" }}>{roleName}</span>
          </span>
          <div className="table-wrapper-chips-details">
            <table>
              <thead>
                <tr>
                  {tableColumns.map((item, index) => (
                    <th key={index}>{item.header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data?.map((item) => (
                  <tr key={`${item.id}`}>
                    {tableColumns.map((col, index) => (
                      <td key={`${item.id}-${index}`}>{item[col.key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoleView;
