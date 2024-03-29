import React from "react";
import AddIcon from "@mui/icons-material/Add";
import ButtonIcon from "../../../common/components/ButtonIcon/ButtonIcon";
import IndicatorIcon from "../../../common/components/indicatorIcon/IndicatorIcon";
import "./NewsHeader.scss";
import { useAuth } from "../../../common/hooks/useAuth";
import { PERMISSION_MAPPING } from "../../../common/global.constant";

const NewsHeader = ({ indicatorValues, modalStatus, setModalStatus }) => {
  const { auth } = useAuth();
  return (
    <header className="news-header">
      <div className="news-title-wrapper">
        <div className="news-title">Information</div>
        <div className="indicator-wrapper">
          {indicatorValues.map((item, i) => (
            <IndicatorIcon
              key={i}
              title={item.status}
              count={item.count}
              className={item.key}
            />
          ))}
        </div>
      </div>
      {(auth.screens.news?.includes(PERMISSION_MAPPING.CREATE) ||
        auth.screens.vulnerability?.includes(PERMISSION_MAPPING.CREATE) ||
        auth.screens.alert?.includes(PERMISSION_MAPPING.CREATE) ||
        auth.screens.advisory?.includes(PERMISSION_MAPPING.CREATE)) && (
        <ButtonIcon
          className="MuiButton-contained"
          text="Create Information"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setModalStatus(!modalStatus)}
          color="white"
        />
      )}
    </header>
  );
};

export default NewsHeader;
