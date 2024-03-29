import React, { useState, useEffect, useMemo, useRef } from "react";
import DropdownMultiSelect from "../../../../common/components/MultipleSelect/DropdownMultiSelect";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  defaultDateDayjs,
  serverFormatDateDayjs,
} from "../../../../common/helperFunction/dateTransform";
import { useParams } from "react-router-dom";
import { blue } from "@mui/material/colors";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import {
  transformAppNameData,
  transformPermissionData,
  transformLibraryData,
  transformPublisherData,
  transformSubTypeData,
} from "../../application.helper";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import "./ApplicationForm.scss";
import { useFetchPermission } from "../../hooks/useFetchPermission";
import { useFetchLibrary } from "../../hooks/useFetchLibrary";
import { useFetchPublisher } from "../../hooks/useFetchPublisher";
import { PAGE_TYPE } from "../../../../common/global.constant";
import { APP_TYPE_DATA } from "../../app.constant";
import { useFetchAllApps } from "../../hooks/useFetchAllApps";
import CreatableDropdown from "../../../../common/components/Creatable Dropdown/CreatableDropdown";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import InputBox from "../../../../common/components/InputBox/InputBox";
import ErrorBox from "../../../../common/components/Error/ErroBox";
import { transOSData } from "../../../device/device.helpers";
import { useFetchOs } from "../../../os/hooks/useFetchOs";
import { toast } from "react-hot-toast";
import { useFetchSubTypeData } from "../../hooks/useFetchSubType";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blue[50]),
  backgroundColor: blue[50],
  textTransform: "none",
  "&:hover": {
    backgroundColor: blue[200],
  },
}));

const ApplicationForm = ({ appData, setAppData, appInfo, error, setError }) => {
  const [applicationName, setApplicationName] = useState({ id: "", label: "" });
  const [aospLatest, setAospLatest] = useState({ id: "", label: "" });
  const [appType, setAppType] = useState({ id: "", label: "" });
  const [dropDownLabel, setDropDownLabel] = useState({
    thirdPartyLibraries: [],
    permissionsRequired: [],
    appPublishers: { id: "", label: "" },
    appSubTypes: [],
  });
  const { pageType } = useParams();
  const fileRef = useRef();
  const OSList = useFetchOs(1, {
    pagination: false,
  });
  const AppName = useFetchAllApps();

  const permissionRequiredId = useFetchPermission({
    page: 1,
    pagination: false,
  });

  const thirdPartyLibrariesId = useFetchLibrary({
    page: 1,
    pagination: false,
  });

  const subTypesId = useFetchSubTypeData({
    page: 1,
    pagination: false,
  });

  const appPublisherId = useFetchPublisher({
    page: 1,
    pagination: false,
  });

  const transformOsNames = useMemo(
    () =>
      !OSList.isLoading && !OSList.isError
        ? transOSData(OSList?.data?.data?.osresponseDto)
        : [],
    [OSList.isLoading, OSList.isError, OSList?.data?.data]
  );

  const transformAppName = useMemo(
    () =>
      !AppName.isLoading && !AppName.isError
        ? transformAppNameData(AppName?.data?.data)
        : [],
    [AppName.isLoading, AppName.isError, AppName?.data?.data]
  );

  const transformPublisher = useMemo(
    () =>
      !appPublisherId.isLoading && !appPublisherId.isError
        ? transformPublisherData(
            appPublisherId?.data?.data?.appPublisherDtoList
          )
        : [],
    [
      appPublisherId.isLoading,
      appPublisherId.isError,
      appPublisherId?.data?.data?.appPublisherDtoList,
    ]
  );

  const transformPermission = useMemo(
    () =>
      !permissionRequiredId.isLoading && !permissionRequiredId.isError
        ? transformPermissionData(
            permissionRequiredId?.data?.data?.permissionRequiredDtoList
          )
        : [],
    [
      permissionRequiredId.isLoading,
      permissionRequiredId.isError,
      permissionRequiredId?.data?.data?.permissionRequiredDtoList,
    ]
  );

  const transformLibarary = useMemo(
    () =>
      !thirdPartyLibrariesId.isLoading && !thirdPartyLibrariesId.isError
        ? transformLibraryData(
            thirdPartyLibrariesId?.data?.data?.thirdPartyLibrariesDtos
          )
        : [],
    [
      thirdPartyLibrariesId.isLoading,
      thirdPartyLibrariesId.isError,
      thirdPartyLibrariesId?.data?.data?.thirdPartyLibrariesDtos,
    ]
  );

  const transformSubType = useMemo(
    () =>
      !subTypesId.isLoading && !subTypesId.isError
        ? transformSubTypeData(subTypesId.data.data.appSubTypeResponseDTOS)
        : [],
    [subTypesId.isLoading, subTypesId.isError, subTypesId?.data?.data]
  );

  const deleteHandler = (value, title) => {
    setAppData({
      ...appData,
      [title]: appData[title].filter((item) => item !== value.id),
    });
    setDropDownLabel({
      ...dropDownLabel,
      [title]: dropDownLabel[title].filter((item) => item.id !== value.id),
    });
  };

  const changeHandler = (value, title) => {
    setAppData({
      ...appData,
      [title]: value.map((item) => item.id),
    });
    setDropDownLabel({
      ...dropDownLabel,
      [title]: value,
    });
  };
  useEffect(() => {
    setError({
      title: [],
      message: [],
    });

    if (!appInfo || pageType === PAGE_TYPE.CREATE) return;

    const libraryArr = appInfo?.thirdPartyLibraries?.map((item) => ({
      id: item.thirdPartyLibrariesId ? item.thirdPartyLibrariesId : "",
      label: item.thirdPartyLibrary ? item.thirdPartyLibrary : "",
    }));
    const permissionArr = appInfo?.permissionsRequired?.map((item) => ({
      id: item.permissionRequiredId ? item.permissionRequiredId : "",
      label: item.permissionRequire ? item.permissionRequire : "",
    }));
    const publisherArr = {
      id:
        appInfo?.appPublishers[0]?.appPublisherId !== undefined
          ? appInfo?.appPublishers[0]?.appPublisherId
          : "",
      label:
        appInfo?.appPublishers[0]?.publisher !== undefined
          ? appInfo?.appPublishers[0]?.publisher
          : "",
    };

    const appSubTypeArr = appInfo?.appSubTypes?.map((item) => ({
      id: item.appSubTypeId || "",
      label: item.appSubType ? item.appSubType.replaceAll("_", " ") : "",
    }));

    setAppData({
      ...appData,
      ...appInfo,
      thirdPartyLibraries: libraryArr.map((item) => (item.id ? item.id : "")),
      permissionsRequired: permissionArr.map((item) =>
        item.id ? item.id : ""
      ),
      appPublishers: publisherArr.id ? publisherArr.id : "",
      appSubTypes: appSubTypeArr?.id,
    });
    setApplicationName({
      id: appInfo.applicationName ? appInfo.applicationName : "",
      label: appInfo.applicationName ? appInfo.applicationName : "",
    });
    setAospLatest({
      id: appInfo.minimumRequeiredOs ? appInfo.minimumRequeiredOs : "",
      label: appInfo.minimumRequeiredOs ? appInfo.minimumRequeiredOs : "",
    });
    setAppType({
      id: appInfo.appType ? appInfo.appType : "",
      label: appInfo.appType ? appInfo.appType : "",
    });
    setDropDownLabel({
      ...dropDownLabel,
      thirdPartyLibraries: libraryArr,
      permissionsRequired: permissionArr,
      appPublishers: publisherArr,
      appSubTypes: appSubTypeArr,
    });
  }, [appInfo]);

  // Image Handling

  const fileUploadHandle = (file) => {
    if (file.type === "image/jpeg" || file.type === "image/png") {
      if (file.size <= 153600) {
        setAppData({
          ...appData,
          imageIconPath: file,
        });
      } else {
        toast.error("File size cannot be greater than 150kb ");
      }
    } else {
      toast.error("File type can be png or jpg");
    }
  };

  const handleSubTypeDisplay = () => {
    let arr = [];
    appInfo?.appSubTypes?.forEach((item) => {
      if (item.appSubType) {
        arr.push(item.appSubType.replaceAll("_", " "));
      }
    });
    return arr.map((value, index) => {
      return (
        <p key={index} className="text-style">
          {value}
        </p>
      );
    });
  };

  

  return (
    <>
      <div
        className={`create-app-block-container ${
          pageType === PAGE_TYPE.VIEW && "view-device"
        }`}
      >
        <div className="left-block">
          <div className="app-Input device-Input">
            <label className="device-label">
              App Name{pageType !== PAGE_TYPE.VIEW && <span>*</span>}
            </label>
            <div className="dropdown-align">
              <div className="dropdown-single-align">
                <CreatableDropdown
                  error={error}
                  title="applicationName"
                  placeholder="Enter Application Name"
                  disabled={pageType === PAGE_TYPE.VIEW}
                  optionData={transformAppName}
                  selectedValues={applicationName}
                  setSelectedValues={(value) => {
                    setError({
                      title: [],
                      message: [],
                    });
                    setApplicationName(value || "");
                    setAppData({
                      ...appData,
                      applicationName: value?.label || "",
                    });
                  }}
                />
                <ErrorBox title="applicationName" />
              </div>
            </div>
          </div>
          <div className="device-Input">
            <label className="device-label">
              App Publisher{pageType !== PAGE_TYPE.VIEW && <span>*</span>}
            </label>
            <div className="dropdown-align">
              {pageType === PAGE_TYPE.EDIT || pageType === PAGE_TYPE.CREATE ? (
                <DropdownMultiSelect
                  title="publisher"
                  optionData={transformPublisher}
                  placeholder="Select Publisher"
                  selectedValues={dropDownLabel.appPublishers}
                  setSelectedValues={(value) => {
                    setAppData({
                      ...appData,
                      appPublishers: [value.id],
                    });
                    setDropDownLabel({
                      ...dropDownLabel,
                      appPublishers: value,
                    });
                  }}
                  showChips={false}
                  width="90%"
                  multiple={false}
                  disabled={pageType === PAGE_TYPE.VIEW}
                  disableCloseOnSelect={false}
                />
              ) : (
                <div>
                  <p style={{ fontWeight: "bold", fontSize: "14px" }}>
                    {appInfo?.appPublishers[0]?.publisher}
                  </p>
                </div>
              )}
            </div>
            <ErrorBox title="publisher" />
          </div>
          <div className="device-Input">
            <label className="device-label">Max Version</label>
            <InputBox
              id="outlined-basic"
              variant="outlined"
              placeholder="Enter Max Version"
              sx={{ width: "90%" }}
              size="small"
              value={appData.maxVersion}
              autoComplete="off"
              onChange={(e) =>
                setAppData({
                  ...appData,
                  maxVersion: e.target.value,
                })
              }
              disabled={pageType === PAGE_TYPE.VIEW}
            />
          </div>
          <div className="app-Input device-Input">
            <label className="device-label">
              Version{pageType !== PAGE_TYPE.VIEW && <span>*</span>}
            </label>
            <InputBox
              title="version"
              id="outlined-basic"
              variant="outlined"
              placeholder="Enter Version"
              sx={{ width: "100%" }}
              size="small"
              value={appData.version}
              autoComplete="off"
              onChange={(e) => {
                setError({
                  title: [],
                  message: [],
                });
                setAppData({
                  ...appData,
                  version: e.target.value,
                });
              }}
              disabled={pageType === PAGE_TYPE.VIEW}
            />
          </div>
          <div className="device-Input">
            <label className="device-label">Permissions Required</label>
            <div className="dropdown-align">
              {pageType === PAGE_TYPE.EDIT || pageType === PAGE_TYPE.CREATE ? (
                <DropdownMultiSelect
                  optionData={transformPermission}
                  placeholder="Select Permissions Required"
                  selectedValues={dropDownLabel.permissionsRequired}
                  setSelectedValues={(value) =>
                    changeHandler(value, "permissionsRequired")
                  }
                  deleteHandler={(item) =>
                    deleteHandler(item, "permissionsRequired")
                  }
                  showChips={false}
                  multiple={true}
                  width={"90%"}
                  disableCloseOnSelect={true}
                  disabled={pageType === PAGE_TYPE.VIEW}
                />
              ) : (
                <div>
                  {appInfo?.permissionsRequired?.length > 0 ? (
                    appInfo?.permissionsRequired?.map((item, index) => (
                      <p className="text-style" key={index}>
                        {item.permissionRequire}
                      </p>
                    ))
                  ) : (
                    <p className="text-style"></p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="device-Input">
            <label className="device-label">App update date</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={defaultDateDayjs(appData.appUpdateDate)}
                defaultValue={defaultDateDayjs(appData.appUpdateDate)}
                onChange={(e) =>
                  setAppData({
                    ...appData,
                    appUpdateDate: serverFormatDateDayjs(e),
                  })
                }
                format="DD/MM/YYYY"
                sx={{ width: "90%" }}
                disabled={pageType === PAGE_TYPE.VIEW}
              />
            </LocalizationProvider>
          </div>
          <div className="app-Input device-Input">
            <label className="device-label">Target API</label>
            <InputBox
              title="targetApi"
              id="outlined-basic"
              variant="outlined"
              placeholder="Enter Target API"
              sx={{ width: "100%" }}
              size="small"
              value={appData.targetApi}
              autoComplete="off"
              onChange={(e) => {
                setError({
                  title: [],
                  message: [],
                });
                setAppData({
                  ...appData,
                  targetApi: e.target.value,
                });
              }}
              disabled={pageType === PAGE_TYPE.VIEW}
            />
          </div>
          {pageType !== PAGE_TYPE.VIEW ? (
            <div className="upload-Button">
              <span
                style={{
                  marginTop: "10px",
                  marginRight: "10px",
                  fontSize: "14px",
                }}
              >
                App Icon
              </span>
              <ColorButton
                variant="outlined"
                component="label"
                size="medium"
                startIcon={<FileUploadOutlinedIcon />}
              >
                Upload App Icon
                <input
                  type="file"
                  onChange={(e) => fileUploadHandle(e.target.files[0])}
                  hidden
                  ref={fileRef}
                />
              </ColorButton>
              {appData.imageIconPath ? (
                <div className="image-preview">
                  <button
                    className="cancel-icon-button"
                    onClick={() => {
                      setAppData({
                        ...appData,
                        imageIconPath: null,
                      });
                      fileRef.current.value = null;
                    }}
                  >
                    <CancelOutlinedIcon className="cancel-icon" />
                  </button>
                  <img
                    className="image-wrapper"
                    src={
                      typeof appData.imageIconPath === "string"
                        ? appData?.imageIconPath
                        : URL.createObjectURL(appData?.imageIconPath)
                    }
                  ></img>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="image-sec app-Input device-Input">
              <div className="head_image">
                <label className="device-label">Head Image</label>
                {appData?.imageIconPath?.length > 0 && (
                  <img src={appData?.imageIconPath} alt="" />
                )}
              </div>
            </div>
          )}
        </div>
        <div className="right-block">
          <div className="app-Input device-Input">
            <label className="device-label">
              Unique Identifier{pageType !== PAGE_TYPE.VIEW && <span>*</span>}
            </label>
            <InputBox
              title="uniqIdentifier"
              id="outlined-basic"
              variant="outlined"
              placeholder="Enter Unique Identifier"
              sx={{ width: "100%" }}
              size="small"
              value={appData.uniqIdentifier}
              autoComplete="off"
              onChange={(e) => {
                setError({
                  title: [],
                  message: [],
                });
                setAppData({
                  ...appData,
                  uniqIdentifier: e.target.value,
                });
              }}
              disabled={pageType === PAGE_TYPE.VIEW}
            />
          </div>
          <div className="app-Input device-Input">
            <label className="device-label">App Publisher ID</label>
            <InputBox
              id="outlined-basic"
              variant="outlined"
              placeholder="Enter App Publisher ID"
              sx={{ width: "100%" }}
              size="small"
              value={appData.publisher}
              autoComplete="off"
              onChange={(e) => {
                setError({
                  title: [],
                  message: [],
                });
                setAppData({
                  ...appData,
                  publisher: e.target.value,
                });
              }}
              disabled={pageType === PAGE_TYPE.VIEW}
            />
          </div>
          <div className="device-Input">
            <label className="device-label">Max Version Code</label>
            <InputBox
              id="outlined-basic"
              variant="outlined"
              placeholder="Enter Max Version Code"
              sx={{ width: "90%" }}
              size="small"
              value={appData.maxVersionCode}
              autoComplete="off"
              onChange={(e) => {
                setAppData({
                  ...appData,
                  maxVersionCode: e.target.value,
                });
              }}
              disabled={pageType === PAGE_TYPE.VIEW}
            />
          </div>
          <div className="app-Input device-Input">
            <label className="device-label">
              Version Code{pageType !== PAGE_TYPE.VIEW && <span>*</span>}
            </label>
            <InputBox
              title="versionCode"
              id="outlined-basic"
              variant="outlined"
              placeholder="Enter Version Code"
              sx={{ width: "100%" }}
              size="small"
              value={appData.versionCode}
              autoComplete="off"
              onChange={(e) => {
                setError({
                  title: [],
                  message: [],
                });
                setAppData({
                  ...appData,
                  versionCode: e.target.value,
                });
              }}
              disabled={pageType === PAGE_TYPE.VIEW}
            />
          </div>
          <div className="device-Input">
            <label className="device-label">Third party libraries</label>
            <div className="dropdown-align">
              {pageType === PAGE_TYPE.EDIT || pageType === PAGE_TYPE.CREATE ? (
                <DropdownMultiSelect
                  optionData={transformLibarary}
                  placeholder="Select Third Party Libraries"
                  selectedValues={dropDownLabel.thirdPartyLibraries}
                  setSelectedValues={(value) =>
                    changeHandler(value, "thirdPartyLibraries")
                  }
                  deleteHandler={(item) =>
                    deleteHandler(item, "thirdPartyLibraries")
                  }
                  showChips={false}
                  width="90%"
                  disableCloseOnSelect={true}
                  disabled={pageType === PAGE_TYPE.VIEW}
                />
              ) : (
                <div>
                  {appInfo?.thirdPartyLibraries.length > 0 ? (
                    appInfo?.thirdPartyLibraries?.map((item, index) => (
                      <p className="text-style" key={index}>
                        {item.thirdPartyLibrary}
                      </p>
                    ))
                  ) : (
                    <p className="text-style"></p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="app-Input device-Input">
            <label className="device-label">Minimum Required OS</label>
            <div className="dropdown-align">
              <DropdownMultiSelect
                title="minimumRequeiredOs"
                optionData={transformOsNames}
                placeholder="Select Minimum Required OS"
                selectedValues={aospLatest}
                setSelectedValues={(value) => {
                  setError({
                    title: [],
                    message: [],
                  });
                  setAppData({
                    ...appData,
                    minimumRequeiredOs: value?.label ? value.label : "",
                  });
                  setAospLatest(value);
                }}
                width="90%"
                showChips={false}
                multiple={false}
                disableCloseOnSelect={false}
                disabled={pageType === PAGE_TYPE.VIEW}
              />
              <ErrorBox title="minimumRequeiredOs" />
            </div>
          </div>
          <div className="flex-box">
            <div className="device-Input">
              <label className="device-label">App Type</label>
              <DropdownMultiSelect
                optionData={APP_TYPE_DATA}
                placeholder="Select App Type"
                selectedValues={appType}
                setSelectedValues={(value) => {
                  setAppData({
                    ...appData,
                    appType: value?.label ? value?.label : "",
                  });
                  setAppType(value);
                }}
                showChips={false}
                multiple={false}
                disableCloseOnSelect={false}
                disabled={pageType === PAGE_TYPE.VIEW}
              />
            </div>
            <div className="device-Input">
              <label className="device-label">App Sub Type</label>
              <div className="dropdown-align">
                {pageType === PAGE_TYPE.EDIT ||
                pageType === PAGE_TYPE.CREATE ? (
                  <DropdownMultiSelect
                    optionData={transformSubType}
                    placeholder="Select Sub Type"
                    selectedValues={dropDownLabel.appSubTypes}
                    setSelectedValues={(value) => {
                      changeHandler(value, "appSubTypes");
                    }}
                    deleteHandler={(item) => deleteHandler(item, "appSubTypes")}
                    showChips={false}
                    disableCloseOnSelect={true}
                    disabled={pageType === PAGE_TYPE.VIEW}
                    searchable={true}
                  />
                ) : (
                  <div style={{ marginTop: "23px" }}>
                    {handleSubTypeDisplay()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationForm;
