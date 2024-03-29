import React, { useEffect, useMemo, useState } from "react";
import "./DevicesSpecification.scss";
import DropdownMultiSelect from "../../../../common/components/MultipleSelect/DropdownMultiSelect";
import { useFetchDevices } from "../../../device/hooks/useFetchDevices";
import { transformDeviceList } from "../../device.helper";
import { useFetchOs } from "../../../os/hooks/useFetchOs";
import { transformOSDropdownData } from "../../../os/os.helper";
import {
  deviceDropDownTableData,
  osDropDownTableData,
  AppDropDownTableData,
} from "../../news.helpers";
import { useFetchAppWithStatus } from "../../../app/hooks/useFetchApps";
import { transformAppDropdownData } from "../../../app/application.helper";
import { GLOBAL_STATUS } from "../../../../common/global.constant";
import { onlyDateTransform } from "../../../../common/helperFunction/dateTransform";

const DevicesSpecification = ({ createNews, setCreateNews, flag, data }) => {
  const [dropDownLabel, setDropDownLabel] = useState({
    deviceId: [],
    osId: [],
    applicationId: [],
    network: [],
  });

  const deviceList = useFetchDevices(1, {
    status: [GLOBAL_STATUS.APPROVED, GLOBAL_STATUS.REQ_UNPUBLISHED],
    pagination: false,
  });

  const osList = useFetchOs(1, {
    status: [GLOBAL_STATUS.APPROVED, GLOBAL_STATUS.REQ_UNPUBLISHED],
    pagination: false,
  });

  const appList = useFetchAppWithStatus(1, { pagination: false }, [
    GLOBAL_STATUS.APPROVED,
    GLOBAL_STATUS.REQ_UNPUBLISHED,
  ]);

  const transDeviceList = useMemo(
    () =>
      !deviceList.isLoading && !deviceList.isError
        ? transformDeviceList(deviceList?.data?.data?.deviceResponseList)
        : [],
    [deviceList.isLoading, deviceList.isError, deviceList?.data?.data]
  );

  const transOSList =
    !osList.isLoading && !osList.isError
      ? transformOSDropdownData(osList?.data?.data?.osresponseDto)
      : [];

  const transAppList = useMemo(
    () =>
      !appList.isLoading && !appList.isError
        ? transformAppDropdownData(appList.data?.data?.applicationResponseList)
        : [],
    [appList.isLoading, appList.isError, appList.data?.data]
  );

  const deleteHandler = (value, title) => {
    setCreateNews({
      ...createNews,
      [title]: createNews[title].filter((item) => item !== value.id),
    });
    setDropDownLabel({
      ...dropDownLabel,
      [title]: dropDownLabel[title].filter((item) => item.id !== value.id),
    });
  };

  const changeHandler = (value, title) => {
    setCreateNews({
      ...createNews,
      [title]: value.map((item) => item.id),
    });
    setDropDownLabel({
      ...dropDownLabel,
      [title]: value,
    });
  };

  // Getting Table Data for View Details Screen In Dropdown

  const Devicedata = deviceDropDownTableData(
    deviceList?.data?.data?.deviceResponseList,
    createNews.deviceId
  );

  const osData = osDropDownTableData(
    osList?.data?.data?.osresponseDto,
    createNews.osId
  );

  const AppData =
    !appList.isLoading && !appList.isError
      ? AppDropDownTableData(
          appList?.data?.data?.applicationResponseList,
          createNews.applicationId
        )
      : [];

  useEffect(() => {
    if (flag === "edit") {
      let deviceArr = [];
      data.devices.map((item) => {
        if (item.manufacturer)
          deviceArr.push({
            id: item.deviceId,
            label: `${item.manufacturer?.name} | ${item.modelName} | ${
              item.modelNo
            } | ${onlyDateTransform(item.latestSecurityUpdate)}`,
          });
      });
      let osArr = [];
      data.os.map((item) =>
        osArr.push({
          id: item.osId,
          label: `${item.osName} | ${item.codeName}`,
        })
      );
      let appArr = [];
      data.applications?.map((item) =>
        appArr.push({
          id: item.applicationId,
          label: `${item.applicationName} | ${item.uniqIdentifier} | ${item.version} | ${item.versionCode}`,
        })
      );
      setCreateNews({
        ...createNews,
        deviceId: data.devices.map((item) => item.deviceId),
        osId: data.os.map((item) => item.osId),
        applicationId: data.applications.map((item) => item.applicationId),
      });
      setDropDownLabel({
        ...dropDownLabel,
        deviceId: deviceArr,
        osId: osArr,
        applicationId: appArr,
      });
    }
  }, [data, flag]);

  return (
    <>
      <div className="device-container">
        <div className="device-label">
          <label>Impacted Devices, OS, Apps & Network</label>
        </div>
        <div className="dropdown-Input">
          <div className="multi-dropdown">
            <label className="main-dropdown-labels">Related Devices</label>
            {!deviceList.isLoading && (
              <div className="multi-select">
                <DropdownMultiSelect
                  optionData={transDeviceList}
                  selectedValues={dropDownLabel.deviceId}
                  placeholder="Enter Related Devices"
                  setSelectedValues={(value) =>
                    changeHandler(value, "deviceId")
                  }
                  deleteHandler={(item) => deleteHandler(item, "deviceId")}
                  chipsCount={1}
                  tableColumn={Devicedata?.columnHeading}
                  tableData={Devicedata?.columnData}
                  tableHeading={"Related Devices"}
                  disableCloseOnSelect={true}
                  searchable={true}
                  extraLabel={{id: 'select-all', label: 'Select All'}}

                />
              </div>
            )}
          </div>
          <div className="multi-dropdown">
            <label className="dropdown-labels">Related OS</label>
            {!osList.isLoading ? (
              <div className="multi-select">
                <DropdownMultiSelect
                  optionData={transOSList}
                  selectedValues={dropDownLabel.osId}
                  placeholder="Enter Related OS"
                  setSelectedValues={(value) => changeHandler(value, "osId")}
                  deleteHandler={(item) => deleteHandler(item, "osId")}
                  chipsCount={1}
                  tableHeading={"Related OS Details"}
                  tableColumn={osData?.columnHeading}
                  tableData={osData?.columnData}
                  disableCloseOnSelect={true}
                  searchable={true}
                  extraLabel={{id: 'select-all', label: 'Select All'}}
                />
              </div>
            ) : null}
          </div>
          <div className="multi-dropdown">
            <label className="dropdown-labels">Related Apps</label>
            {!appList.isLoading ? (
              <div className="multi-select">
                <DropdownMultiSelect
                  optionData={transAppList}
                  selectedValues={dropDownLabel.applicationId}
                  placeholder="Enter Related Apps"
                  setSelectedValues={(value) =>
                    changeHandler(value, "applicationId")
                  }
                  deleteHandler={(item) => deleteHandler(item, "applicationId")}
                  chipsCount={1}
                  tableHeading="Related App Details"
                  tableColumn={AppData?.columnHeading}
                  tableData={AppData?.columnAppData}
                  disableCloseOnSelect={true}
                  searchable={true}
                  extraLabel={{id: 'select-all', label: 'Select All'}}

                />
              </div>
            ) : null}
          </div>
          <div className="multi-dropdown">
            <label className="dropdown-labels">Network</label>
            <div className="multi-select">
              <DropdownMultiSelect
                optionData={[]}
                placeholder="Enter Related Network"
                selectedValues={dropDownLabel.network}
                setSelectedValues={(value) => changeHandler(value, "network")}
                deleteHandler={(item) => deleteHandler(item, "network")}
                //chipsCount={1}
                disabled
                disableCloseOnSelect={true}
                searchable={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DevicesSpecification;
