import React, { useState } from "react";
import "./ChipsDetails.scss";
import { crossIcon } from "../../assets/images";

const ChipsDetails = ({
  plusExtra,
  data = [],
  tableColumns = [],
  tableHeading = "Related Devices Details",
}) => {
  const [showView, setShowView] = useState(false);
  return (
    <>
      {plusExtra > 0 && <span className="plus-extra-chips">+{plusExtra}</span>}{" "}
      <button className="view-details-chips" onClick={() => setShowView(true)}>
        View Details
      </button>
      <div className={`show-chips-details ${showView ? "show" : ""}`}>
        <div className="chips-details-main-container">
          <div className="header">
            <h3>{tableHeading}</h3>
            <div>
              <button onClick={() => setShowView(false)}>
                <img src={crossIcon} alt="cross-icon" />
              </button>
            </div>
          </div>
          <div className="table-wrapper-chips-details">
            <table>
              <thead>
                <tr>
                  {tableColumns.map((item, index) => (
                    <th key={item.header}>{item.header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data?.map((item, ind) => (
                  <tr key={`${ind}`}>
                    {tableColumns.map((col, index) => (
                      <td key={`${ind}-${index}`}>{item[col.key]}</td>
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

export default ChipsDetails;
