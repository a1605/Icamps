import React from "react";
import ButtonIcon from "../../../common/components/ButtonIcon/ButtonIcon";
import IndicatorIcon from "../../../common/components/indicatorIcon/IndicatorIcon";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import "./DeviceHeader.scss";

const DeviceHeader = ({ indicatorValues }) => {
  const navigate = useNavigate();
  const handleNavigate = () => navigate("/inventory/devices/create-device");
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
      <ButtonIcon
        className="MuiButton-contained"
        text="Add"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleNavigate}
      />
    </header>
  );
};

export default DeviceHeader;
