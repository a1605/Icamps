import React from "react";
import { useNavigate } from "react-router";
import AddIcon from "@mui/icons-material/Add";

// Component
import ButtonIcon from "../../../common/components/ButtonIcon/ButtonIcon";
import IndicatorIcon from "../../../common/components/indicatorIcon/IndicatorIcon";

// Constant
import { PERMISSION_MAPPING } from "../../global.constant";

// CSS
import "./ListingHeader.scss";
import { useAuth } from "../../hooks/useAuth";

const ListingHeader = ({
  indicatorValues = [],
  title,
  iconButtonTitle,
  pathToNavigate,
  screenType,
  permissionTitle,
  bulkUploadTitle,
  bulkNavigate,
}) => {
  const navigate = useNavigate();
  const handleNavigate = () => navigate(pathToNavigate);

  const handleBulkNavigate = () => navigate(bulkNavigate);

  const { auth } = useAuth();
  return (
    <div className="content-header-container">
      <header className="listing-header-container">
        <div className="header-title-wrapper">
          <div className="header-title">{title}</div>
          <div className="indicator-wrapper">
            {indicatorValues.length > 0 &&
              indicatorValues.map((item, i) => (
                <IndicatorIcon
                  key={item.key}
                  title={item.status}
                  count={item.count}
                  className={item.key}
                />
              ))}
          </div>
        </div>
        <div className="button-section">
          {screenType !== "approval" &&
            screenType !== "advisor" &&
            bulkUploadTitle &&
            bulkUploadTitle !== "" &&
            auth.screens[permissionTitle]?.includes(
              PERMISSION_MAPPING.BULK_UPLOAD
            ) && (
              <ButtonIcon
                className="MuiButton-contained"
                text={bulkUploadTitle}
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleBulkNavigate}
              />
            )}
          {/* {screenType !== "approval" &&
            screenType !== "advisor" &&
            iconButtonTitle &&
            iconButtonTitle !== "" &&
            auth.screens[permissionTitle]?.includes(
              PERMISSION_MAPPING.CREATE
            ) && ( */}
              <ButtonIcon
                className="MuiButton-contained"
                text={iconButtonTitle}
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleNavigate}
              />
            {/* )} */}
        </div>
      </header>
    </div>
  );
};

export default ListingHeader;
