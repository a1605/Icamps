import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { styled } from "@mui/material/styles";
import { Box, Paper, Grid, OutlinedInput, Chip, Stack } from "@mui/material";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

// Constant
import {
  AssigneeStatus,
  GLOBAL_STATUS,
  INFORMATION_TYPE_FILTER,
  PERMISSION_MAPPING,
  PRIMARY_INVENTORY,
  SEVERITY_LEVEL,
} from "../../../../common/global.constant";

// Services Import
import {
  createSingleNews,
  updateSingleNews,
} from "../../services/newsServices";
import { useFetchSingleNews } from "../../hooks/useFetchSingleNews";

// Component Import
import PrimaryInventoryRadioContainer from "./PrimaryInventoryRadioContainer/PrimaryInventoryRadioContainer";
import SeverityLevel from "./SeverityLevel/SeverityLevel";
import CreateEditBlocks from "./CreateEditBlocks";
import RelatedIssue from "./RelatedIssue";
import DevicesSpecification from "./DevicesSpecification";
import CommonHeader from "../../../../common/components/CommonHeader/CommonHeader";
import AssigneeBox from "../../../../common/components/assigneeBox/AssigneeBox";
import CircularLoader from "../../../../common/components/CircularLoader/CircularLoader";

// Hooks
import { useAuth } from "../../../../common/hooks/useAuth";

// Helper
import {
  dateTransform,
  issueFixDateTransform,
} from "../../../../common/helperFunction/dateTransform";

// CSS Import
import "./CreateEdit.scss";
import { uploadImage } from "../../../../services/imageUpload";
import { isDataValidInfo } from "../../news.helpers";
import NotificationType from "./NotificationType";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  borderRadius: "0px",
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CreateEdit = () => {
  // Getting Parameters from the URL

  const { id, pageType, infoType } = useParams();

  const { auth, error, setError, setLoading } = useAuth();

  const newsData = useFetchSingleNews(id);

  const navigate = useNavigate();

  const tagRef = useRef(null);

  const [createNews, setcreateNews] = useState({
    sourceTicketId: "",
    infoNotification: [],
    title: "",
    description: "",
    sourceLink: "",
    imagePath: "",
    imageIconPath: "",
    actionSuggestion: "",
    deviceId: [],
    osId: [],
    applicationId: [],
    actionId: [],
    network: [],
    issueId: [],
    tags: [],
    status: GLOBAL_STATUS.DRAFT,
    severity: SEVERITY_LEVEL.LOW,
    primaryInventory: PRIMARY_INVENTORY.DEVICES,
    type: infoType.toUpperCase(),
    issueFixDate: issueFixDateTransform(new Date()),
    updatedOn: dateTransform(new Date()),
    requestedBy: null,
    requestedOn: null,
    approvedOn: null,
    approvedBy: null,
    assignee: `${auth.userDetails.email.toLowerCase()}`,
    updatedBy: `${auth.userDetails.email.toLowerCase()}`,
  });
  const [loadingCircular, setLoadingCircular] = useState(pageType === "edit");

  // Assignee Box
  const [showAssigneeBox, setShowAssigneeBox] = useState(false);
  const [assigneeData, setAssigneeData] = useState({
    permissionData: {},
    submitHandler: () => {},
  });

  // Image Upload Functionality

  const handleFileUpload = async (data) => {
    try {
      const formData = new FormData();

      formData.append("file", data);
      const resp = await uploadImage(formData);
      return resp;
    } catch (error) {
      toast.error("Error while uploading image");
      return false;
    }
  };

  // If Edit or View screen is triggered
  useEffect(() => {
    setError({
      title: [],
      message: [],
    });
    if (
      newsData &&
      !newsData.isLoading &&
      !newsData.isError &&
      newsData.data?.data &&
      pageType === "edit"
    ) {
      const data = newsData?.data?.data;
      setcreateNews({
        ...createNews,
        ...data,
        issueId: data.issues.length > 0 ? [data.issues[0]?.issueId] : [],
        actionId: data.action.map((item) => item.actionId),
        type: infoType,
        deviceId: data.devices.map((item) => item.deviceId),
        osId: data.os.map((item) => item.osId),
        applicationId: data.applications.map((item) => item.applicationId),
      });
      setLoadingCircular(false);
    }
  }, [newsData?.data?.data]);

  // Draft Handler
  const handleSaveDraft = async () => {
    if (isDataValidInfo(createNews, error, setError, "draft")) return;
    try {
      setLoading(true);
      let body = {
        ...createNews,
        status: GLOBAL_STATUS.DRAFT,
        updatedBy: auth.userDetails.email,
        updatedOn: dateTransform(new Date()),
        requestedBy: null,
        requestedOn: null,
        approvedOn: null,
        approvedBy: null,
        type: createNews.type.toUpperCase(),
        comments: null
      };
      if (createNews.imagePath && typeof createNews.imagePath === "object") {
        const resp = await handleFileUpload(createNews.imagePath);
        if (resp?.data) {
          body = {
            ...body,
            imagePath: resp?.data,
          };
        } else return;
      }
      if (
        createNews.imageIconPath &&
        typeof createNews.imageIconPath === "object"
      ) {
        const resp = await handleFileUpload(createNews.imageIconPath);
        if (resp?.data) {
          body = {
            ...body,
            imageIconPath: resp?.data,
          };
        } else return;
      }

      if (pageType === "create") {
        await createSingleNews({ ...body });
        navigate("/information");
      } else {
        await updateSingleNews({
          ...body,
          updatedBy: auth.userDetails.email,
          updatedOn: dateTransform(new Date()),
        });
        navigate("/information");
      }
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };

  // Advise Handler
  const handleAdvice = () => {
    setAssigneeData({
      permissionData: {
        permissionName: [PERMISSION_MAPPING.ADVISOR],
        permissionTitle: [createNews.type.toLowerCase()],
        status: AssigneeStatus.ACTIVE,
      },
      submitHandler: adviseData,
    });
    setShowAssigneeBox(true);
  };

  const adviseData = async (data) => {
    try {
      setLoading(true);
      let body = {
        ...createNews,
        type: createNews.type.toUpperCase(),
        status: GLOBAL_STATUS.ADVICE_C,
        comments: [
          {
            commentDescription: data.commentDescription,
            email: data.email,
            updatedOn: data.updatedOn,
          },
        ],
        requestedBy: auth.userDetails.email,
        requestedOn: dateTransform(new Date()),
        approvedBy: data.approvedBy,
        approvedOn: data.approvedOn,
        assignee: data.assignee,
      };

      if (createNews.imagePath && typeof createNews.imagePath === "object") {
        const resp = await handleFileUpload(createNews.imagePath);
        if (resp?.data) {
          body = {
            ...body,
            imagePath: resp?.data,
          };
        } else return;
      }

      if (!(id && id !== "")) {
        await createSingleNews({
          ...body,
        });
        navigate("/information");
      } else {
        await updateSingleNews({
          ...body,
          updatedBy: auth.userDetails.email,
          updatedOn: dateTransform(new Date()),
        });
        navigate("/information");
      }
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };

  // Submit Handler
  const submitData = async (data) => {
    try {
      setLoading(true);
      let body = {
        ...createNews,
        type: createNews.type.toUpperCase(),
        status: GLOBAL_STATUS.SUBMITTED,
        comments: [
          {
            commentDescription: data.commentDescription,
            email: data.email,
            updatedOn: data.updatedOn,
          },
        ],
        requestedBy: auth.userDetails.email,
        requestedOn: dateTransform(new Date()),
        approvedBy: null,
        approvedOn: null,
        assignee: data.assignee,
      };

      if (createNews.imagePath && typeof createNews.imagePath === "object") {
        const resp = await handleFileUpload(createNews.imagePath);
        if (resp?.data) {
          body = {
            ...body,
            imagePath: resp?.data,
          };
        } else return;
      }

      if (
        createNews.imageIconPath &&
        typeof createNews.imageIconPath === "object"
      ) {
        const resp = await handleFileUpload(createNews.imageIconPath);
        if (resp?.data) {
          body = {
            ...body,
            imageIconPath: resp?.data,
          };
        } else return;
      }

      if (pageType === "create") {
        await createSingleNews({
          ...body,
        });
        toast.success("Information created successfully");
      } else {
        await updateSingleNews({
          ...body,
          updatedBy: auth.userDetails.email,
          updatedOn: dateTransform(new Date()),
        });
        toast.success("Information updated successfully");
      }
      navigate("/information");
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (isDataValidInfo(createNews, error, setError, "approval")) return;

    setAssigneeData({
      permissionData: {
        permissionName: [PERMISSION_MAPPING.APPROVER],
        permissionTitle: [createNews.type.toLowerCase()],
        status: AssigneeStatus.ACTIVE,
      },
      submitHandler: submitData,
    });
    setShowAssigneeBox(true);
  };

  const handleChangeCheckbox = (event) =>
    setcreateNews({
      ...createNews,
      severity: event.target.value,
    });

  // Handle Function for Tags tagging
  const handleValueTags = (e) => {
    setError({
      title: [],
      message: [],
    });
    if (e.key === "Enter" && tagRef.current.value.trim("") !== "") {
      setcreateNews({
        ...createNews,
        tags: [...createNews.tags, tagRef.current.value],
      });
      tagRef.current.value = null;
      tagRef.current.focus();
    }
  };

  if (pageType === "edit" && loadingCircular === true)
    return <CircularLoader />;
  else
    return (
      <>
        <div className="create-edit-container">
          <CommonHeader
            backArrow="/information"
            label="Create"
            ticketInput={createNews}
            handleTicketValue={setcreateNews}
            handleCancel={() => navigate("/information")}
            handleSaveDraft={handleSaveDraft}
            handleSubmit={handleSubmit}
            changeType={(value) => {
              setShowAssigneeBox(false);
              setcreateNews({ ...createNews, type: value });
            }}
            handleAdvise={handleAdvice}
            type={createNews.type}
            types={INFORMATION_TYPE_FILTER.map((item) => item.label)}
            status={true}
            setAssigneeBox={setShowAssigneeBox}
          />
          {showAssigneeBox && (
            <AssigneeBox
              setShowBox={setShowAssigneeBox}
              assigneeBoxData={assigneeData}
            />
          )}
          <div className="block-wrapper">
            <Box sx={{ flexGrow: 0 }}>
              <Grid container>
                <Grid item xs={12} lg={7}>
                  <div
                    style={{
                      height: "86vh",
                      overflowX: "hidden",
                      overflowY: "auto",
                    }}
                  >
                 
                      <Item className="create-notification">
                        <NotificationType
                          createNews={createNews}
                          setcreateNews={setcreateNews}
                          isDisabled={!auth.screens.news.includes(
                            PERMISSION_MAPPING.BROADCAST
                          )}
                        />
                      </Item>
               
                    <Item className="crete-block">
                      <CreateEditBlocks
                        createNews={createNews}
                        setcreateNews={setcreateNews}
                        // fileHandler={handleFileUpload}
                      />
                    </Item>
                    <Item className="primary-inventory">
                      <PrimaryInventoryRadioContainer
                        newsData={createNews}
                        setNewsData={setcreateNews}
                      />
                    </Item>
                    <Item className="related-block">
                      <RelatedIssue
                        createNews={createNews}
                        setCreateNews={setcreateNews}
                        flag={pageType}
                        error={error}
                        setError={setError}
                      />
                    </Item>
                    <Item className="tag-block">
                      <div className="main-title-Label">
                        <label>Tags</label>
                      </div>
                      <div className="tag-Input">
                        <OutlinedInput
                          sx={{ width: "50%", overflow: "hidden" }}
                          id="outlined-multiline-static"
                          placeholder="Tags"
                          autoComplete="off"
                          variant="outlined"
                          size="small"
                          onKeyDown={handleValueTags}
                          inputRef={tagRef}
                        />
                      </div>
                      <div
                        className="Chips-stack"
                        style={{ marginLeft: "15px", width: "60%" }}
                      >
                        {createNews.tags.length > 0 ? (
                          <Stack
                            className="outer-chips"
                            direction="row"
                            spacing={1}
                          >
                            {createNews.tags.map((item) => (
                              <Chip
                                className="chips-align"
                                size="small"
                                label={item}
                                key={item}
                                onDelete={(e) =>
                                  setcreateNews({
                                    ...createNews,
                                    tags: createNews.tags.filter(
                                      (option) => option !== item
                                    ),
                                  })
                                }
                              />
                            ))}
                          </Stack>
                        ) : null}
                      </div>
                    </Item>
                  </div>
                </Grid>

                <Grid item xs={12} lg={5}>
                  <div
                    style={{
                      marginTop: 2,
                      height: "86vh",
                      overflowX: "hidden",
                      overflowY: "auto",
                    }}
                  >
                    <Item
                      style={{
                        paddingBottom: "60px",
                        boxShadow: "none",
                      }}
                    >
                      <DevicesSpecification
                        createNews={createNews}
                        setCreateNews={setcreateNews}
                        flag={pageType}
                        data={newsData?.data?.data}
                      />
                    </Item>
                    <Item
                      style={{
                        marginTop: "7px",
                        paddingBottom: "90px",
                        boxShadow: "none",
                      }}
                    >
                      <SeverityLevel
                        createNews={createNews}
                        handleChangeCheckbox={handleChangeCheckbox}
                      />
                    </Item>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </div>
        </div>
      </>
    );
};

export default CreateEdit;
