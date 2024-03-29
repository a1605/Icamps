import React from "react";
import "./NotificationType.scss";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  PAGE_TYPE,
  PERMISSION_MAPPING,
} from "../../../../common/global.constant";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../common/hooks/useAuth";

const NotificationType = ({ createNews, setcreateNews,isDisabled }) => {
  const { pageType } = useParams();
  const { auth } = useAuth();

  const handleChange = (event) => {
    setcreateNews({
      ...createNews,
      infoNotification: event.target.checked ? ["PUSH"] : [],
    });
  };
  return (
    <div>
      <div className="notification-block">
        <div className="main-title-Label">
          <h4>Notification Type</h4>
        </div>
        <div className="network-checkbox">
          
            <div className="notification">
              <FormGroup>
                <FormControlLabel
                  name="pushNotification"
                  control={<Checkbox value={1} onChange={handleChange} />}
                  label="Push Notification"
                  checked={createNews?.infoNotification?.length > 0}
                  onChange={handleChange}
                  disabled={isDisabled}
                />
              </FormGroup>
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default NotificationType;
