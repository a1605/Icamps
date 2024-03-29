import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./CreateOSForm.scss";
import { useParams } from "react-router-dom";
import { PAGE_TYPE } from "../../../../common/global.constant";
import InputBox from "../../../../common/components/InputBox/InputBox";
import {
  defaultDateDayjs,
  issueFixDateTransform,
} from "../../../../common/helperFunction/dateTransform";

const CreateOSForm = ({ OSData, setOSData, error, setError }) => {
  const { pageType } = useParams();

  return (
    <>
      <div
        className={`create-device-block-container ${
          pageType === PAGE_TYPE.VIEW && "view-device"
        }`}
      >
        <div className="left-block">
          <div className="Os-Input">
            <label className="device-label">OS Name*</label>
            <InputBox
              title="osName"
              id="outlined-basic"
              variant="outlined"
              required={true}
              sx={{ width: "100%" }}
              size="small"
              placeholder="Enter OS Name"
              autoComplete="off"
              value={OSData.osName}
              onChange={(e) => {
                setError({
                  title: [],
                  message: [],
                });

                setOSData({
                  ...OSData,
                  osName: e.target.value,
                  ...(e.target.value.toUpperCase() === "ANDROID"
                    ? {
                        oemSecurityUpdateDate:
                          issueFixDateTransform("1900-01-01"),
                      }
                    : {}),
                });
              }}
              disabled={pageType === PAGE_TYPE.VIEW}
            />
          </div>
          <div className="device-Input">
            <label className="device-label">Lastest Security Update Date</label>
            <div className="date-picker">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  defaultValue={OSData.latestSecurityUpdate}
                  onChange={(e) =>
                    setOSData({
                      ...OSData,
                      latestSecurityUpdate: defaultDateDayjs(e),
                    })
                  }
                  format="DD/MM/YYYY"
                  value={OSData.latestSecurityUpdate}
                  disabled={pageType === PAGE_TYPE.VIEW}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="device-Input">
            <label className="device-label"> OS Release date</label>
            <div className="date-picker">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  defaultValue={OSData.latestReleaseDate}
                  onChange={(e) =>
                    setOSData({
                      ...OSData,
                      latestReleaseDate: defaultDateDayjs(e),
                    })
                  }
                  format="DD/MM/YYYY"
                  disabled={pageType === PAGE_TYPE.VIEW}
                  value={OSData.latestReleaseDate}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="Os-Input">
            <label className="device-label">Android API Version</label>
            <InputBox
              title="apiVersion"
              id="outlined-basic"
              variant="outlined"
              required={true}
              sx={{ width: "100%" }}
              size="small"
              placeholder="Enter Android API Version"
              autoComplete="off"
              value={OSData.apiVersion}
              onChange={(e) => {
                setError({
                  title: [],
                  message: [],
                });

                setOSData({
                  ...OSData,
                  apiVersion: e.target.value,
                });
              }}
              disabled={pageType === PAGE_TYPE.VIEW}
            />
          </div>
        </div>

        <div className="right-block">
          <div className="Os-Input">
            <label className="device-label">AOSP Codename</label>
            <InputBox
              title="codeName"
              id="outlined-basic"
              variant="outlined"
              required={true}
              sx={{ width: "100%" }}
              size="small"
              autoComplete="off"
              placeholder="Enter AOSP Codename"
              value={OSData.codeName}
              onChange={(e) => {
                setError({
                  title: [],
                  message: [],
                });

                setOSData({
                  ...OSData,
                  codeName: e.target.value,
                });
              }}
              disabled={pageType === PAGE_TYPE.VIEW}
            />
          </div>
          <div className="device-Input">
            <label className="device-label">OEM Security Update Date</label>
            <div className="date-picker">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  defaultValue={OSData.oemSecurityUpdateDate}
                  onChange={(e) =>
                    setOSData({
                      ...OSData,
                      oemSecurityUpdateDate: defaultDateDayjs(e),
                    })
                  }
                  format="DD/MM/YYYY"
                  value={OSData.oemSecurityUpdateDate}
                  disabled={
                    pageType === PAGE_TYPE.VIEW ||
                    OSData.osName.toUpperCase() === "ANDROID"
                  }
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="device-Input">
            <label className="device-label">EOL Date</label>
            <div className="date-picker">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  defaultValue={OSData.eolDate}
                  onChange={(e) =>
                    setOSData({
                      ...OSData,
                      eolDate: defaultDateDayjs(e),
                    })
                  }
                  format="DD/MM/YYYY"
                  disabled={pageType === PAGE_TYPE.VIEW}
                  value={OSData.eolDate}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="device-Input">
            <label className="device-label">
              Lastest Security Update Release Date
            </label>
            <div className="date-picker">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  defaultValue={OSData.lastSecUpdateReleasedId}
                  onChange={(e) =>
                    setOSData({
                      ...OSData,
                      lastSecUpdateReleasedId: defaultDateDayjs(e),
                    })
                  }
                  format="DD/MM/YYYY"
                  disabled={pageType === PAGE_TYPE.VIEW}
                  value={OSData.lastSecUpdateReleasedId}
                />
              </LocalizationProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateOSForm;
