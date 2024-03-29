import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PAGE_TYPE } from "../../../../common/global.constant";
import { OutlinedInput } from "@mui/material";
import {
  transformCountryNameData,
  BlacklistDetails,
} from "../../blacklist-number-helper";
import DropdownMultiSelect from "../../../../common/components/MultipleSelect/DropdownMultiSelect";
import { useFetchCountryData } from "../../hooks/useFetchCountryData";
import { useFetchBlacklistData } from "../../hooks/useFetchBlacklistData";
import InputBox from "../../../../common/components/InputBox/InputBox";
import "./BlacklistForm.scss";
import { useAuth } from "../../../../common/hooks/useAuth";
import ErrorBox from "../../../../common/components/Error/ErroBox";

const BlacklistForm = ({ blacklistData, setBlacklistData }) => {
  const [countryName, setcountryName] = useState({ id: "", label: "" });
  const [fraudCatogary, setFraudCatogary] = useState({ id: "", label: "" });
  const { error, setError } = useAuth();
  const { pageType, id } = useParams();
  const CountryNameList = useFetchCountryData();
  const getBlacklistData = useFetchBlacklistData(id);

  const transManuData =
    !CountryNameList.isLoading && !CountryNameList.isError
      ? transformCountryNameData(CountryNameList?.data?.data)
      : [];

  useEffect(() => {
    setError({
      title: [],
      message: [],
    });
    const blacklistData = getBlacklistData?.data?.data;
    if (!blacklistData || pageType === "create") return;
    setBlacklistData({
      ...blacklistData,
      sourceTicketId: blacklistData.sourceTicketId,
      scammerTitle: blacklistData.scammerTitle,
      source: blacklistData.source,
      mobileNumber: blacklistData.mobileNumber,
      status: blacklistData.status,
    });
    setFraudCatogary({
      id: blacklistData.mobileFraudCategory,
      label: blacklistData.mobileFraudCategory,
    });
    setcountryName({
      id: blacklistData.countryDetails?.countryDetailId,
      label: `${blacklistData.countryDetails?.countryCode} ${blacklistData.countryDetails?.countryName}`,
    });
  }, [getBlacklistData?.data?.data]);

  return (
    <div
      className={`create-blacklist-block-container ${
        pageType === PAGE_TYPE.VIEW && "view-blacklist"
      }`}
    >
      <div className="left-block">
        <div className="blacklist-Input">
          <label className="blacklist-label">
            Fraud Category{pageType != PAGE_TYPE.VIEW && <span>*</span>}{" "}
          </label>

          <div className="dropdown-align">
            <DropdownMultiSelect
              optionData={BlacklistDetails}
              placeholder="Select Fraud Category"
              selectedValues={fraudCatogary}
              setSelectedValues={(value) => {
                setError({
                  title: [],
                  message: [],
                });
                setFraudCatogary(value);
                setBlacklistData({
                  ...blacklistData,
                  mobileFraudCategory: value?.label ? value?.label : "",
                });
              }}
              showChips={false}
              multiple={false}
              disableCloseOnSelect={false}
              disabled={pageType === PAGE_TYPE.VIEW}
              error={error}
              title="fraudCategory"
            />
            <ErrorBox title="fraudCategory" />
          </div>
        </div>
        <div className="blacklist-Input">
          <label className="blacklist-label">
            Scammer Title{pageType != PAGE_TYPE.VIEW && <span>*</span>}{" "}
          </label>

          <InputBox
            id="outlined-basic"
            variant="outlined"
            required={true}
            sx={{ width: "100%" }}
            size="small"
            placeholder="Enter Scammer Title"
            value={blacklistData.scammerTitle}
            onChange={(e) => {
              setError({
                title: [],
                message: [],
              });

              setBlacklistData({
                ...blacklistData,
                scammerTitle: e.target.value,
              });
            }}
            disabled={pageType === PAGE_TYPE.VIEW}
            title="scammerTitle"
          />
        </div>
        <div className="blacklist-Input">
          <label className="blacklist-label">
            Country Details{pageType != PAGE_TYPE.VIEW && <span>*</span>}
          </label>
          <div className="dropdown-align">
            <DropdownMultiSelect
              optionData={transManuData}
              placeholder="Select Country Details"
              selectedValues={countryName}
              setSelectedValues={(value) => {
                setcountryName(value);
                setError({
                  title: [],
                  message: [],
                });
                setBlacklistData({
                  ...blacklistData,
                  countryDetailId: value?.id ? value.id : "",
                });
              }}
              showChips={false}
              multiple={false}
              disableCloseOnSelect={false}
              error={error}
              disabled={pageType === PAGE_TYPE.VIEW}
              title="countryDetails"
            />
            <ErrorBox title="countryDetails" />
          </div>
        </div>
        <div className="blacklist-Input">
          <label className="blacklist-label">
            Mobile Number{pageType != PAGE_TYPE.VIEW && <span>*</span>}{" "}
          </label>
          <InputBox
            id="outlined-basic"
            variant="outlined"
            required={true}
            sx={{ width: "100%" }}
            size="small"
            placeholder="Enter Mobile Number"
            value={blacklistData.mobileNumber}
            onChange={(e) => {
              setError({
                title: [],
                message: [],
              });
              setBlacklistData({
                ...blacklistData,
                mobileNumber: e.target.value,
              });
            }}
            title="mobileNumber"
            disabled={pageType === PAGE_TYPE.VIEW}
          />
        </div>
        <div className="blacklist-Input">
          <label className="blacklist-label">Source</label>
          <OutlinedInput
            id="outlined-basic"
            variant="outlined"
            required={true}
            placeholder="Enter Source"
            sx={{ width: "100%" }}
            size="small"
            value={blacklistData.source}
            onChange={(e) => {
              setError({
                title: [],
                message: [],
              });

              setBlacklistData({
                ...blacklistData,
                source: e.target.value,
              });
            }}
            disabled={pageType === PAGE_TYPE.VIEW}
          />
        </div>
      </div>
    </div>
  );
};

export default BlacklistForm;
