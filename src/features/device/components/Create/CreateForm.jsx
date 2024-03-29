import React, { useEffect, useMemo, useState } from "react";
import DropdownMultiSelect from "../../../../common/components/MultipleSelect/DropdownMultiSelect";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./CreateForm.scss";
import {
  transOSData,
  transformManuData,
  transformGpuData,
  transformCpuData,
  transOEMOSData,
} from "../../device.helpers";
import { useFetchManufacturer } from "../../../manufacturer/hooks/useFetchManufacturer";
import { useFetchOs } from "../../../os/hooks/useFetchOs";
import {
  defaultDateDayjs,
  serverFormatDateDayjs,
} from "../../../../common/helperFunction/dateTransform";
import { useFetchGpu } from "../../hooks/useFetchGPUs";
import { useFetchCpu } from "../../hooks/useFetchCPUs";
import { useParams } from "react-router-dom";
import useFetchSingleDevice from "../../hooks";
import { PAGE_TYPE } from "../../../../common/global.constant";
import CircularLoader from "../../../../common/components/CircularLoader/CircularLoader";
import { BOOLEAN_VALUE_DROPDOWN } from "../../devices.constant";
import ErrorBox from "../../../../common/components/Error/ErroBox";
import InputBox from "../../../../common/components/InputBox/InputBox";
import { useAuth } from "../../../../common/hooks/useAuth";

const CreateForm = ({ deviceData, setDeviceData }) => {
  const { pageType, id } = useParams();
  const { setError } = useAuth();
  const getDevice = useFetchSingleDevice(id);
  const ManufacturerList = useFetchManufacturer(1);
  const OSList = useFetchOs(1, {
    pagination: false,
  });
  const gpuList = useFetchGpu({ page: 1, pagination: false });
  const cpuList = useFetchCpu({ page: 1, pagination: false });

  const transformOsNames = useMemo(
    () =>
      !OSList.isLoading && !OSList.isError
        ? transOSData(OSList?.data?.data?.osresponseDto)
        : [],
    [OSList.isLoading, OSList.isError, OSList?.data?.data]
  );
  const transOEMOSValue = useMemo(
    () =>
      !OSList.isLoading && !OSList.isError
        ? transOEMOSData(OSList?.data?.data?.osresponseDto)
        : [],
    [OSList.isLoading, OSList.isError, OSList?.data?.data]
  );

  const transManuData = useMemo(
    () =>
      !ManufacturerList.isLoading && !ManufacturerList.isError
        ? transformManuData(
            ManufacturerList?.data?.data?.manufacturerResponseDTOS
          )
        : [],
    [
      ManufacturerList.isError,
      ManufacturerList.isLoading,
      ManufacturerList?.data?.data?.manufacturerResponseDTOS,
    ]
  );
  const transGpuData =
    !gpuList.isLoading && !gpuList.isError
      ? transformGpuData(gpuList?.data?.data?.gpuResponseDTOS)
      : [];

  const transCpuData = useMemo(
    () =>
      !cpuList.isLoading && !cpuList.isError
        ? transformCpuData(cpuList?.data?.data?.cpuResponseDTOS)
        : [],
    [cpuList.isLoading, cpuList.isError, cpuList?.data?.data?.cpuResponseDTOS]
  );

  const [manufacturer, setmanufacturer] = useState({ id: "", label: "" });
  const [aospReleased, setAospReleased] = useState({ id: "", label: "" });
  const [aospLatest, setAospLatest] = useState({ id: "", label: "" });
  const [oemosVersionReleased, setOEMOSVersionReleased] = useState({
    id: "",
    label: "",
  });
  const [oemosVersionLatest, setOEMOSVersionLatest] = useState({
    id: "",
    label: "",
  });
  const [cpuModel, setCpuModel] = useState({ id: "", label: "" });
  const [nccApprove, setNccApprove] = useState({ id: "", label: "" });
  const [gpuModel, setGpuModel] = useState({ id: "", label: "" });
  const [googleCertified, setGoogleCertified] = useState({ id: "", label: "" });
  useEffect(() => {
    setError({
      title: [],
      message: [],
    });
    const deviceDatas = getDevice?.data?.data;
    if (
      !deviceData ||
      pageType === "create" ||
      getDevice.isLoading ||
      getDevice.isError
    )
      return;

    setDeviceData({
      ...deviceData,
      ...deviceDatas,
      id: deviceDatas.deviceId,
      cpuId: deviceDatas.cpu?.cpuId,
      gpuId: deviceDatas.gpu?.gpuId,
      manufacturerId: deviceDatas?.manufacturer?.manufacturerId,
      googleCertified: deviceDatas?.googleCertified,
      nccsapproved: deviceDatas?.nccsapproved,
      releaseDate: deviceDatas?.releaseDate,
      aospversionCodeReleased: deviceDatas.osByAOSPVersionCodeReleased?.osId,
      aospversionCodeLatest: deviceDatas.osByAOSPVersionCodeLatest?.osId,
      oemosversionCodeReleased: deviceDatas.osByOEMOSVersionCodeReleased?.osId,
      oemosversionCodeLatest: deviceDatas.osByOEMOSVersionCodeLatest?.osId,
      latestSecUpdateReleasedDt: deviceDatas.latestSecUpdateReleasedDt,
      latestSecurityUpdate: deviceDatas.latestSecurityUpdate,
      modelEOLDate: deviceDatas.modelEOLDate,
    });
    setNccApprove({
      id: deviceDatas?.nccsapproved,
      label: deviceDatas?.nccsapproved === true ? "True" : "False",
    });
    setGoogleCertified({
      id: deviceDatas?.googleCertified,
      label: deviceDatas?.googleCertified === true ? "True" : "False",
    });
    setmanufacturer({
      id: deviceDatas.manufacturer?.manufacturerId,
      label: deviceDatas.manufacturer?.name,
    });

    setAospReleased({
      id: deviceDatas.osByAOSPVersionCodeReleased?.osId
        ? deviceDatas.osByAOSPVersionCodeReleased?.osId
        : "",
      label: deviceDatas.osByAOSPVersionCodeReleased?.codeName
        ? deviceDatas.osByAOSPVersionCodeReleased?.codeName
        : "",
    });

    setAospLatest({
      id: deviceDatas.osByAOSPVersionCodeLatest?.osId
        ? deviceDatas.osByAOSPVersionCodeLatest?.osId
        : "",
      label: deviceDatas.osByAOSPVersionCodeLatest?.codeName
        ? deviceDatas.osByAOSPVersionCodeLatest?.codeName
        : "",
    });

    setCpuModel({
      id: deviceDatas.cpu?.cpuId ? deviceDatas.cpu?.cpuId : "",
      label: deviceDatas.cpu?.cpuModelNo ? deviceDatas.cpu?.cpuModelNo : "",
    });
    setOEMOSVersionReleased({
      id: deviceDatas?.osByOEMOSVersionCodeReleased?.osId
        ? deviceDatas?.osByOEMOSVersionCodeReleased?.osId
        : "",
      label: deviceDatas?.osByOEMOSVersionCodeReleased?.osName
        ? deviceDatas?.osByOEMOSVersionCodeReleased?.osName
        : "",
    });
    setOEMOSVersionLatest({
      id: deviceDatas?.osByOEMOSVersionCodeLatest?.osId
        ? deviceDatas?.osByOEMOSVersionCodeLatest?.osId
        : "",
      label: deviceDatas?.osByOEMOSVersionCodeLatest?.osName
        ? deviceDatas?.osByOEMOSVersionCodeLatest?.osName
        : "",
    });
    setGpuModel({
      id: deviceDatas.gpu?.gpuId ? deviceDatas.gpu?.gpuId : "",
      label: deviceDatas.gpu?.gupModelNo ? deviceDatas.gpu?.gupModelNo : "",
    });
  }, [ManufacturerList?.data?.data, OSList?.data?.data, getDevice?.data?.data]);

  if (getDevice?.isLoading) return <CircularLoader />;
  return (
    <>
      <div
        className={`create-device-block-container ${
          pageType === PAGE_TYPE.VIEW && "view-device"
        }`}
      >
        <div className="left-block">
          <div className="device-Input">
            <label className="device-label">Manufacturer*</label>
            <div className="dropdown-align">
              <DropdownMultiSelect
                optionData={transManuData}
                title="manufacturer"
                placeholder="Select Manufacturer"
                selectedValues={manufacturer}
                setSelectedValues={(value) => {
                  setError({
                    title: [],
                    message: [],
                  });
                  setmanufacturer(value);
                  setDeviceData({
                    ...deviceData,
                    manufacturerId: value?.id ? parseInt(value.id) : "",
                  });
                }}
                showChips={false}
                width="90%"
                multiple={false}
                disableCloseOnSelect={false}
                disabled={pageType === PAGE_TYPE.VIEW}
              />
              <ErrorBox title="manufacturer" />
            </div>
          </div>
          <div className="device-Input">
            <label className="device-label">Model Number*</label>
            <InputBox
              title="modelNo"
              id="outlined-basic"
              placeholder="Enter Model Number"
              variant="outlined"
              required={true}
              sx={{ width: "100%" }}
              size="small"
              value={deviceData.modelNo}
              onChange={(e) => {
                setError({
                  title: [],
                  message: [],
                });
                setDeviceData({
                  ...deviceData,
                  modelNo: e.target.value,
                });
              }}
              disabled={pageType === PAGE_TYPE.VIEW}
            />
          </div>
          <div className="AOSP-Version-container">
            <div className="device-Input">
              <label className="device-label">
                AOSP Version Code(Released)
              </label>
              <div className="multi-drop">
                <div className="os">
                  <DropdownMultiSelect
                    optionData={transformOsNames}
                    placeholder="Select AOSP"
                    selectedValues={aospReleased}
                    setSelectedValues={(value) => {
                      setDeviceData({
                        ...deviceData,
                        aospversionCodeReleased: value?.id ? value.id : "",
                      });
                      setAospReleased(value);
                    }}
                    width="100%"
                    showChips={false}
                    multiple={false}
                    disableCloseOnSelect={false}
                    disabled={pageType === PAGE_TYPE.VIEW}
                  />
                </div>
              </div>
            </div>
            <div className="device-Input">
              <label className="device-label">AOSP Version Code(Latest)</label>
              <div className="multi-drop">
                <div className="os">
                  <DropdownMultiSelect
                    title="aospversionCodeLatest"
                    optionData={transformOsNames}
                    placeholder="Select AOSP"
                    selectedValues={aospLatest}
                    setSelectedValues={(value) => {
                      setError({
                        title: [],
                        message: [],
                      });
                      setDeviceData({
                        ...deviceData,
                        aospversionCodeLatest: value?.id ? value.id : "",
                      });
                      setAospLatest(value);
                    }}
                    width="100%"
                    showChips={false}
                    multiple={false}
                    disableCloseOnSelect={false}
                    disabled={pageType === PAGE_TYPE.VIEW}
                  />
                  <ErrorBox title="aospversionCodeLatest" />
                </div>
              </div>
            </div>
          </div>
          <div className="device-Input">
            <label className="device-label">Latest Security Update</label>
            <div className="date-picker">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={defaultDateDayjs(deviceData.latestSecurityUpdate)}
                  defaultValue={defaultDateDayjs(
                    deviceData.latestSecurityUpdate
                  )}
                  format="DD/MM/YYYY"
                  onChange={(e) => {
                    setError({
                      title: [],
                      message: [],
                    });
                    setDeviceData({
                      ...deviceData,
                      latestSecurityUpdate: serverFormatDateDayjs(e),
                    });
                  }}
                  disabled={pageType === PAGE_TYPE.VIEW}
                />
                <ErrorBox title="latestSecurityUpdate" />
              </LocalizationProvider>
            </div>
          </div>
          <div className="device-Input">
            <label className="device-label">CPU make model</label>
            <div className="dropdown-align">
              <DropdownMultiSelect
                optionData={transCpuData}
                placeholder="Select CPU Model"
                selectedValues={cpuModel}
                setSelectedValues={(value) => {
                  setCpuModel(value);
                  setDeviceData({
                    ...deviceData,
                    cpuId: value?.id ? value.id : "",
                  });
                }}
                showChips={false}
                width="90%"
                multiple={false}
                disableCloseOnSelect={false}
                disabled={pageType === PAGE_TYPE.VIEW}
              />
            </div>
          </div>
          <div className="AOSP-Version-container">
            <div className="device-Input">
              <label className="device-label">NCCS Approved</label>
              <div className="multi-drop">
                <div className="os">
                  <DropdownMultiSelect
                    optionData={BOOLEAN_VALUE_DROPDOWN}
                    placeholder="Select NCCS Approved"
                    selectedValues={nccApprove}
                    setSelectedValues={(value) => {
                      setNccApprove(value);
                      setDeviceData({
                        ...deviceData,
                        nccsapproved: value?.id === "true",
                      });
                    }}
                    showChips={false}
                    width="100%"
                    multiple={false}
                    disableCloseOnSelect={false}
                    disabled={pageType === PAGE_TYPE.VIEW}
                  />
                </div>
              </div>
            </div>
            <div className="device-Input">
              <label className="device-label">Google Certified</label>
              <div className="multi-drop">
                <div className="os">
                  <DropdownMultiSelect
                    optionData={BOOLEAN_VALUE_DROPDOWN}
                    placeholder="Select Google Certified"
                    selectedValues={googleCertified}
                    setSelectedValues={(value) => {
                      setGoogleCertified(value);
                      setDeviceData({
                        ...deviceData,
                        googleCertified: value?.id === "true",
                      });
                    }}
                    showChips={false}
                    width="100%"
                    multiple={false}
                    disableCloseOnSelect={false}
                    disabled={pageType === PAGE_TYPE.VIEW}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="right-block">
          <div className="device-Input">
            <label className="device-label">Model name*</label>
            <InputBox
              title="modelName"
              id="outlined-basic"
              placeholder="Enter Model Name"
              variant="outlined"
              required={true}
              sx={{ width: "100%" }}
              size="small"
              value={deviceData.modelName}
              onChange={(e) => {
                setError({
                  title: [],
                  message: [],
                });
                setDeviceData({
                  ...deviceData,
                  modelName: e.target.value,
                });
              }}
              disabled={pageType === PAGE_TYPE.VIEW}
            />
          </div>
          <div className="release-Date-container">
            <div className="device-Input">
              <label className="device-label">Release date</label>
              <div className="date-picker">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={defaultDateDayjs(deviceData.releaseDate)}
                    defaultValue={defaultDateDayjs(deviceData.releaseDate)}
                    format="DD/MM/YYYY"
                    onChange={(e) =>
                      setDeviceData({
                        ...deviceData,
                        releaseDate: serverFormatDateDayjs(e),
                      })
                    }
                    disabled={pageType === PAGE_TYPE.VIEW}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div className="device-Input">
              <label className="device-label">Model EOL Date</label>
              <div className="date-picker">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={defaultDateDayjs(deviceData.modelEOLDate)}
                    defaultValue={defaultDateDayjs(deviceData.modelEOLDate)}
                    format="DD/MM/YYYY"
                    onChange={(e) =>
                      setDeviceData({
                        ...deviceData,
                        modelEOLDate: serverFormatDateDayjs(e),
                      })
                    }
                    disabled={pageType === PAGE_TYPE.VIEW}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
          <div className="AOSP-Version-container">
            <div className="device-Input">
              <label className="device-label">
                OEMOS version code (released)
              </label>
              <div className="multi-drop">
                <div className="os">
                  <DropdownMultiSelect
                    optionData={transOEMOSValue}
                    placeholder="Select OEMOS"
                    selectedValues={oemosVersionReleased}
                    setSelectedValues={(value) => {
                      setDeviceData({
                        ...deviceData,
                        oemosversionCodeReleased: value?.id ? value.id : "",
                      });
                      setOEMOSVersionReleased(value);
                    }}
                    width="100%"
                    showChips={false}
                    multiple={false}
                    disableCloseOnSelect={false}
                    disabled={pageType === PAGE_TYPE.VIEW}
                  />
                </div>
              </div>
            </div>
            <div className="device-Input">
              <label className="device-label">
                OEMOS version code (Latest)
              </label>
              <div className="multi-drop">
                <div className="os">
                  <DropdownMultiSelect
                    optionData={transOEMOSValue}
                    placeholder="Select OEMOS"
                    selectedValues={oemosVersionLatest}
                    setSelectedValues={(value) => {
                      setDeviceData({
                        ...deviceData,
                        oemosversionCodeLatest: value?.id ? value.id : "",
                      });
                      setOEMOSVersionLatest(value);
                    }}
                    width="100%"
                    showChips={false}
                    multiple={false}
                    disableCloseOnSelect={false}
                    disabled={pageType === PAGE_TYPE.VIEW}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="device-Input">
            <label className="device-label">LatestSecUpdateReleasedDt</label>
            <div className="dropdown-align">
              <div className="date-picker">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={defaultDateDayjs(
                      deviceData.latestSecUpdateReleasedDt
                    )}
                    defaultValue={defaultDateDayjs(
                      deviceData.latestSecUpdateReleasedDt
                    )}
                    format="DD/MM/YYYY"
                    onChange={(e) => {
                      setError({
                        title: [],
                        message: [],
                      });
                      setDeviceData({
                        ...deviceData,
                        latestSecUpdateReleasedDt: serverFormatDateDayjs(e),
                      });
                    }}
                    disabled={pageType === PAGE_TYPE.VIEW}
                  />
                  <ErrorBox title="latestSecUpdateReleasedDt" />
                </LocalizationProvider>
              </div>
            </div>
          </div>
          <div className="device-Input">
            <label className="device-label">GPU Make & Model</label>

            <div className="dropdown-align">
              <DropdownMultiSelect
                optionData={transGpuData}
                placeholder="Select GPU Model"
                selectedValues={gpuModel}
                setSelectedValues={(value) => {
                  setGpuModel(value);
                  setDeviceData({
                    ...deviceData,
                    gpuId: value?.id ? value.id : "",
                  });
                }}
                showChips={false}
                width="100%"
                multiple={false}
                disableCloseOnSelect={false}
                disabled={pageType === PAGE_TYPE.VIEW}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateForm;
