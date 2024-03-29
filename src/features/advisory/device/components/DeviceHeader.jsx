import React from "react";
import IndicatorIcon from "../../../../common/components/indicatorIcon/IndicatorIcon";
import "../../../device/components/DeviceHeader.scss";

const DeviceHeader = ({ indicatorValues }) => {
  return (
    <header className="device-header">
      <div className="device-title-wrapper">
        <div className="device-title">Devices</div>
        <div className="indicator-wrapper">
          {indicatorValues.map((item, i) => (
            <IndicatorIcon key={i} title={item.status} count={item.count} />
          ))}
        </div>
      </div>
    </header>
  );
};

export default DeviceHeader;
