import React from "react";
import "./InformationCreateOption.scss";
import { useNavigate } from "react-router-dom";
import {
  adviseIcon,
  alertIcon,
  crossIcon,
  newsIcon,
  problemsIcon,
} from "../../../../assets/images";

const InformationCreateOption = ({ modalStatus, setModalStatus }) => {
  const navigate = useNavigate();

  return (
    <div className="create-option-main-container">
      <div className="option-wrapper">
        <div className="option-header">
          <div className="header-text">
            <h3>Information Type</h3>
            <p>Select Information type to create</p>
          </div>
          <div className="container-close">
            <button onClick={() => setModalStatus(!modalStatus)}>
              <img src={crossIcon} alt="cross-icon" />
            </button>
          </div>
        </div>
        <div className="option-container">
          <div className="option-row">
            <div className="option-item">
              <button onClick={() => navigate("/information/create/news")}>
                <p className="item-icon">
                  <img src={newsIcon} alt="news-icon" />
                </p>
                <p className="item-text">News</p>
              </button>
            </div>
            <div className="option-item">
              <button onClick={() => navigate("/information/create/advisory")}>
                <p className="item-icon">
                  <img src={adviseIcon} alt="advice-icon" />
                </p>
                <p className="item-text">Advisory</p>
              </button>
            </div>
          </div>
          <div className="option-row">
            <div className="option-item">
              <button
                onClick={() => navigate("/information/create/vulnerability")}
              >
                <p className="item-icon">
                  <img src={problemsIcon} alt="vulnerability-icon" />
                </p>
                <p className="item-text">Vulnerability</p>
              </button>
            </div>
            <div className="option-item">
              <button onClick={() => navigate("/information/create/alert")}>
                <p className="item-icon">
                  <img src={alertIcon} alt="alert-icon" />
                </p>
                <p className="item-text">Alert</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationCreateOption;
