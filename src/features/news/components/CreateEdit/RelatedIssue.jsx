import React, { useEffect, useState } from "react";
import {
  MenuItem,
  Select,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  TextField,
} from "@mui/material";

// Import SCSS
import "./RelatedIssue.scss";
import { useGetAllIssues } from "../../../../hooks/useGetAllIssues";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { issueFixDateTransform } from "../../../../common/helperFunction/dateTransform";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import ErrorBox from "../../../../common/components/Error/ErroBox";
import { PRIMARY_INVENTORY } from "../../../../common/global.constant";

const RelatedIssue = ({ createNews, setCreateNews, flag, error, setError }) => {
  const { pageType } = useParams();
  const [actionSuggetion, setActionSuggetion] = useState([]);
  const [recommended, setRecommended] = useState("");
  const issuesList = useGetAllIssues([createNews.primaryInventory]);
  const handleChange = (event) => {
    setError({
      title: [],
      message: [],
    });
    const issueId = event.target.value;
    const selectedIssue = issuesList.data.data.responseList.find(
      (item) => item.issueId === issueId
    );

    setRecommended(selectedIssue.recommendedAction);
    setCreateNews({
      ...createNews,
      issueId: [issueId],
      actionId:
        selectedIssue.recommendedAction &&
        selectedIssue.recommendedAction !== ""
          ? [parseInt(selectedIssue.recommendedAction)]
          : [],
    });

    setActionSuggetion(selectedIssue.action);
  };

  const handleCheckbox = (e) => {
    setError({
      title: [],
      message: [],
    });
    if (e.target.checked === true) {
      setCreateNews((prevData) => ({
        ...prevData,
        actionId: [...prevData.actionId, parseInt(e.target.value)],
      }));
    } else {
      setCreateNews((prevData) => ({
        ...prevData,
        actionId: prevData.actionId?.filter(
          (item) => item != parseInt(e.target.value)
        ),
      }));
    }
  };
  useEffect(() => {
    setActionSuggetion([]);
    setCreateNews({
      ...createNews,
      actionId: [],
      issueId: [],
    });
  }, [createNews.primaryInventory]);

  useEffect(() => {
    if (flag === "edit" && issuesList?.data?.data?.responseList) {
      const selectedIssue = issuesList?.data?.data?.responseList.find(
        (item) => item.issueId === createNews.issueId[0]
      );
      setRecommended(selectedIssue?.recommendedAction);
      if (selectedIssue) setActionSuggetion(selectedIssue.action);
    }
  }, [issuesList?.data?.data]);

  return (
    <div className="related-container">
      <div className="related-Label">
        <label>Related issue</label>
      </div>
      {!issuesList.isError && (
        <>
          <div className="related-Input">
            <div className="related-issue issue">
              <Select
                title="relatedIssue"
                value={createNews.issueId[0]}
                onChange={handleChange}
                displayEmpty
                placeholder="Select Issue"
                size="small"
                error={error.title.includes("relatedIssue")}
                sx={{
                  fontSize: "small",
                  minWidth: "60%",
                  font: "normal",
                  textAlign: "left",
                  textTransform: "capitalize",
                }}
              >
                <MenuItem selected>
                  <span>Select Issue</span>
                </MenuItem>

                {!issuesList.isError &&
                  !issuesList.isLoading &&
                  issuesList?.data?.data?.responseList?.length > 0 &&
                  issuesList?.data?.data?.responseList?.map((item) => {
                    return (
                      <MenuItem
                        className="menu-item"
                        value={item.issueId}
                        key={item.issueId}
                        sx={{ textTransform: "capitalize" }}
                      >
                        {item.name}
                      </MenuItem>
                    );
                  })}
              </Select>
              <ErrorBox title="relatedIssue" />
            </div>
            {/* <hr className="issue-line"></hr> */}
            <div className="related-issue date">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dayjs(createNews.issueFixDate)}
                  onChange={(e) =>
                    setCreateNews({
                      ...createNews,
                      issueFixDate: issueFixDateTransform(e),
                    })
                  }
                  format="DD/MM/YYYY"
                  disabled={
                    pageType === "view" ||
                    !(
                      createNews.primaryInventory ===
                        PRIMARY_INVENTORY.DEVICES ||
                      createNews.primaryInventory === PRIMARY_INVENTORY.OS
                    )
                  }
                />
              </LocalizationProvider>
            </div>
          </div>
          <span className="issue-line"></span>
          {actionSuggetion && actionSuggetion.length > 0 && (
            <>
              <div className="action-issues">
                <label>Action</label>
              </div>
              <div className="checkbox-wrapper">
                <FormGroup>
                  {actionSuggetion.map((item) => (
                    <FormControlLabel
                      key={item.actionId}
                      className="checkbox-allign"
                      control={
                        <Checkbox
                          size="small"
                          color="default"
                          value={item.actionId}
                          onChange={(e) => handleCheckbox(e)}
                          checked={createNews.actionId.includes(item.actionId)}
                        />
                      }
                      label={`${item.name} ${
                        recommended == item.actionId ? "(Recommended)" : ""
                      }`}
                      sx={{
                        textTransform: "capitalize",
                      }}
                    />
                  ))}
                  <div className="error">
                    <ErrorBox title="actionId" />
                  </div>
                </FormGroup>
              </div>
            </>
          )}
          <div className="action-issues">
            <label>Action suggestion</label>
          </div>
          <div className="related-Input-box">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 0 },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                title="actionSuggestion"
                sx={{ width: "50%" }}
                id="outlined-multiline-static"
                placeholder="Enter Title here"
                required={true}
                error={error.title.includes("actionSuggestion")}
                variant="outlined"
                multiline
                rows={1}
                value={createNews.actionSuggestion}
                onChange={(e) => {
                  setError({
                    title: [],
                    message: [],
                  });

                  setCreateNews({
                    ...createNews,
                    actionSuggestion: e.target.value,
                  });
                }}
              />
              <ErrorBox title={"actionSuggestion"} />
            </Box>
          </div>
        </>
      )}
    </div>
  );
};

export default RelatedIssue;
