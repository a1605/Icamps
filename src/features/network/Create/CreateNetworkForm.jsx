import { useParams } from "react-router-dom";
import { useAuth } from "../../../common/hooks/useAuth";
import { useFetchNetworkData } from "../hooks/useFetchNetworkData";
import InputBox from "../../../common/components/InputBox/InputBox";
import { useEffect } from "react";
import { PAGE_TYPE } from "../../../common/global.constant";
import "./CreateNetworkForm.scss";
function CreateNetworkForm({ network, setNetwork }) {
  const { error, setError } = useAuth();
  const { id, pageType } = useParams();
  const getNetworkData = useFetchNetworkData(id);

  useEffect(() => {
    setError({
      title: [],
      message: [],
    });
    const network = getNetworkData?.data?.data;
    if (!network || pageType === "create") return;
    setNetwork({
      ...network,
    });
  }, [getNetworkData?.data?.data]);

  const changeHandler = (e) => {
    setError({
      title: [],
      message: [],
    });
    setNetwork({
      ...network,
      [e.target.name]: e.target.value,
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
          <div className="device-Input">
            <label className="network-label">
              Manufacture{pageType !== PAGE_TYPE.VIEW ? "*" : ""}
            </label>
            <InputBox
              type="text"
              title="manufacturer"
              name="manufacturer"
              value={network.manufacturer}
              placeholder="Enter Manufacturer"
              onChange={changeHandler}
              disabled={pageType === PAGE_TYPE.VIEW}
              sx={{ width: "100%" }}
            />
          </div>

          <div className="device-Input">
            <label className="network-label">Model Name{pageType !== PAGE_TYPE.VIEW ? "*" : ""}</label>
            <InputBox
              type="text"
              title="model"
              name="model"
              value={network.model}
              placeholder="Enter Model Name"
              onChange={changeHandler}
              disabled={pageType === PAGE_TYPE.VIEW}
              sx={{ width: "100%" }}
            />
          </div>
          <div className="device-Input">
            <label className="network-label">Model Number</label>
            <InputBox
              type="text"
              name="modelNo"
              value={network.modelNo}
              placeholder="Enter Model No"
              onChange={changeHandler}
              disabled={pageType === PAGE_TYPE.VIEW}
              sx={{ width: "100%" }}
            />
          </div>
          <div className="device-Input">
            <label className="network-label">Hardware Version</label>
            <InputBox
              type="text"
              name="hardwareVersion"
              value={network.hardwareVersion}
              placeholder="Enter Hardware Version"
              onChange={changeHandler}
              disabled={pageType === PAGE_TYPE.VIEW}
              sx={{ width: "100%" }}
            />
          </div>
          <div className="device-Input">
            <label className="network-label">Default Password</label>
            <InputBox
              type="text"
              name="defaultPassword"
              value={network.defaultPassword}
              placeholder="Enter Default Password"
              onChange={changeHandler}
              disabled={pageType === PAGE_TYPE.VIEW}
              sx={{ width: "100%" }}
            />
          </div>
        </div>
        <div className="right-block">
          <div className="device-Input">
            <label className="network-label">Brand</label>
            <InputBox
              type="text"
              name="brand"
              value={network.brand}
              placeholder="Enter Brand"
              onChange={changeHandler}
              disabled={pageType === PAGE_TYPE.VIEW}
              sx={{ width: "100%" }}
            />
          </div>
          <div className="device-Input">
            <label className="network-label">OS</label>
            <InputBox
              type="text"
              name="os"
              value={network.os}
              placeholder="Enter OS"
              onChange={changeHandler}
              disabled={pageType === PAGE_TYPE.VIEW}
              sx={{ width: "100%" }}
            />
          </div>
          <div className="device-Input">
            <label className="network-label">Firmware Version</label>
            <InputBox
              type="text"
              name="firmwareVersion"
              value={network.firmwareVersion}
              placeholder="Enter Firmware Version"
              onChange={changeHandler}
              disabled={pageType === PAGE_TYPE.VIEW}
              sx={{ width: "100%" }}
            />
          </div>
          <div className="device-Input">
            <label className="network-label">Home Page</label>
            <InputBox
              type="text"
              name="homePage"
              value={network.homePage}
              placeholder="Enter Home Page"
              onChange={changeHandler}
              disabled={pageType === PAGE_TYPE.VIEW}
              sx={{ width: "100%" }}
            />
          </div>
          <div className="device-Input">
            <label className="network-label">Default User</label>
            <InputBox
              type="text"
              name="defaultUser"
              value={network.defaultUser}
              placeholder="Enter Default User"
              onChange={changeHandler}
              disabled={pageType === PAGE_TYPE.VIEW}
              sx={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateNetworkForm;
