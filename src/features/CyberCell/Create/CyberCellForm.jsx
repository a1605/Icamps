import { useEffect, useMemo, useState } from "react";
import { PAGE_TYPE } from "../../../common/global.constant";
import { useParams } from "react-router-dom";
import InputBox from "../../../common/components/InputBox/InputBox";
import { useFetchCyberCellData } from "../hooks/useFetchCyberCellData";
import {
  useFetchCybercellFilterCity,
  useFetchCybercellFilterState,
} from "../hooks/useFetchCybercellFilter";
import { transStateFilterData } from "../cyber-cell-helper";

import "./CyberCellForm.scss";
import DropdownMultiSelect from "../../../common/components/MultipleSelect/DropdownMultiSelect";
import { useAuth } from "../../../common/hooks/useAuth";

function CyberCellForm({ cyberCell, setCyberCell }) {
  const { error, setError } = useAuth();
  const { id, pageType } = useParams();
  const getCyberCellData = useFetchCyberCellData(id);
  const cyberCellFilterState = useFetchCybercellFilterState();

  const [state, setState] = useState({ id: "", label: "" });
  const transStateData = useMemo(
    () =>
      !cyberCellFilterState.isLoading && !cyberCellFilterState.isError
        ? transStateFilterData(
            cyberCellFilterState?.data?.data?.stateResponseDTOS
          )
        : [],
    [
      cyberCellFilterState.isError,
      cyberCellFilterState.isLoading,
      cyberCellFilterState?.data?.data,
    ]
  );

  useEffect(() => {
    const cyberCell = getCyberCellData?.data?.data;
    if (!cyberCell || pageType === "create") return;

    setCyberCell({
      ...cyberCell,
      regionalOffice: cyberCell.regionalOffice,
      city: cyberCell.city,
      office: cyberCell.office,
      state: cyberCell.state,
      personName: cyberCell.personName,
      designation: cyberCell.designation,
      email: cyberCell.email,
      mobile: cyberCell.mobile,
      telephone: cyberCell.telephone,
      fax: cyberCell.fax,
      address1: cyberCell.address1,
      address2: cyberCell.address2,
      pincode: cyberCell.pincode,
    });
    setState({
      id: cyberCell.state,
      label: cyberCell.state,
    });
  }, [getCyberCellData?.data?.data, transStateData]);

  const changeHandler = (e) => {
    setError({
      title: [],
      message: [],
    });

    setCyberCell({
      ...cyberCell,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className={`create-cyber-block-container ${
        pageType === PAGE_TYPE.VIEW && "view-cyber"
      }`}
    >
      <div className="left-block">
        <div className="cyber-security-Input">
          <label className="cyber-label">Regional office name</label>
          <div className="input-text-align">
            <InputBox
              type="text"
              name="regionalOffice"
              value={cyberCell.regionalOffice}
              placeholder="Enter Regional Office Name"
              onChange={changeHandler}
              title="regionalOffice"
              disabled={pageType === PAGE_TYPE.VIEW}
            />
          </div>
        </div>
        <div className="cyber-security-Input">
          <label className="cyber-label">Person name</label>
          <div className="input-text-align">
            <InputBox
              type="text"
              name="personName"
              value={cyberCell.personName}
              placeholder="Person Name"
              onChange={changeHandler}
              title="personName"
              disabled={pageType === PAGE_TYPE.VIEW}
            />
          </div>
        </div>
        <div className="cyber-security-Input">
          <label className="cyber-label">Address line 1</label>
          <div className="input-text-align">
            <InputBox
              type="text"
              name="addressline1"
              value={cyberCell?.addressline1}
              placeholder="Address line 1"
              onChange={changeHandler}
              disabled={pageType === PAGE_TYPE.VIEW}
              sx={{ width: "100%" }}
            />
          </div>
        </div>
        <div className="cyber-security-Input">
          <label className="cyber-label">Thana/Office</label>
          <div className="input-text-align">
            <InputBox
              type="text"
              name="office"
              value={cyberCell.office}
              placeholder="Office"
              onChange={changeHandler}
              title="office"
              sx={{ width: "100%" }}
              disabled={pageType === PAGE_TYPE.VIEW}
            />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ width: "50%" }}>
            <div className="cyber-security-Input">
              <label className="cyber-label">Mobile number</label>
              <div className="input-text-align">
                <InputBox
                  type="text"
                  name="mobile"
                  value={cyberCell.mobile}
                  placeholder="Mobile Number"
                  onChange={changeHandler}
                  title="mobileNumber"
                  disabled={pageType === PAGE_TYPE.VIEW}
                />
              </div>
            </div>
          </div>
          <div style={{ width: "50%" }}>
            <div className="cyber-security-Input">
              <label className="cyber-label">Telephone</label>
              <div className="input-text-align">
                <InputBox
                  type="text"
                  name="telephone"
                  value={cyberCell.telephone}
                  placeholder="Telephone"
                  onChange={changeHandler}
                  title="telephone"
                  disabled={pageType === PAGE_TYPE.VIEW}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="right-block">
        <div className="cyber-security-Input">
          <label className="cyber-label">Designation</label>
          <div className="input-text-align">
            <InputBox
              sx={{ width: "100%" }}
              type="text"
              name="designation"
              value={cyberCell.designation}
              placeholder="Designation"
              onChange={changeHandler}
              title="designation"
              disabled={pageType === PAGE_TYPE.VIEW}
            />
          </div>
        </div>

        <div className="cyber-security-Input">
          <label className="cyber-label">Address line 2</label>
          <div className="input-text-align">
            <InputBox
              type="text"
              name="addressline2"
              value={cyberCell?.addressline2}
              placeholder="Address line 2"
              onChange={changeHandler}
              disabled={pageType === PAGE_TYPE.VIEW}
            />
          </div>
        </div>
        <div className="pin-city-state">
          <div className="cyber-security-Input">
            <label className="cyber-label">State</label>
            <div className="state-drop">
              <DropdownMultiSelect
                optionData={transStateData}
                title="state"
                placeholder="Select State"
                selectedValues={state}
                setSelectedValues={(value) => {
                  setCyberCell({
                    ...cyberCell,
                    state: value?.label ? value?.label : "",
                  });
                  setState(value);
                }}
                showChips={false}
                width="90%"
                multiple={false}
                disableCloseOnSelect={false}
                disabled={pageType === PAGE_TYPE.VIEW}
              />
            </div>
          </div>
          <div className="cyber-security-Input">
            <label className="cyber-label">City</label>
            <InputBox
              type="text"
              name="city"
              value={cyberCell.city}
              placeholder="Select City"
              onChange={changeHandler}
              disabled={pageType === PAGE_TYPE.VIEW}
            />
          </div>
          <div className="cyber-security-Input">
            <label className="cyber-label">PIN code</label>
            <InputBox
              type="text"
              name="pincode"
              value={cyberCell.pincode}
              placeholder="Pin Code"
              onChange={changeHandler}
              disabled={pageType === PAGE_TYPE.VIEW}
            />
          </div>
        </div>
        <div className="fax-email">
          <div style={{ width: "47%" }}>
            <div className="cyber-security-Input">
              <label className="cyber-label">Fax</label>
              <div className="input-text-align">
                <InputBox
                  type="text"
                  name="fax"
                  value={cyberCell.fax}
                  placeholder="Fax"
                  onChange={changeHandler}
                  title="telephone"
                  disabled={pageType === PAGE_TYPE.VIEW}
                />
              </div>
            </div>
          </div>
          <div style={{ width: "48%" }}>
            <div className="cyber-security-Input">
              <label className="cyber-label">Email Address</label>
              <div className="input-text-align">
                <InputBox
                  type="text"
                  name="email"
                  value={cyberCell.email}
                  placeholder="Email Address"
                  onChange={changeHandler}
                  title="emailAddress"
                  disabled={pageType === PAGE_TYPE.VIEW}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CyberCellForm;
