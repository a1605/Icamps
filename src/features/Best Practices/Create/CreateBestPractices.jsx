import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommonHeader from "../../../common/components/CommonHeader/CommonHeader";
import { GLOBAL_STATUS, PAGE_TYPE } from "../../../common/global.constant";
import "./CreateBestPractices.scss";
import { crossIcon } from "../../../assets/images";
import { TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  createSingleBestPractice,
  updateSingleBestPractice,
} from "../Services/best-practicesServices";
import InputBox from "../../../common/components/InputBox/InputBox";
import { toast } from "react-hot-toast";
import { useFetchBestPracticeData } from "../hooks/useFetchBestPracticeData";
import Button from "../../../common/components/Button/Button";
import RichTextEditor from "./RichTextEditor";
import { useAuth } from "../../../common/hooks/useAuth";
import { isDataValidBestPractices } from "../best-practise.helper";
import ErrorBox from "../../../common/components/Error/ErroBox";
import { dateTransform } from "../../../common/helperFunction/dateTransform";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const CreateBestPractices = () => {
  const navigate = useNavigate();
  const { id, pageType } = useParams();
  const { auth, error, setError, loading, setLoading } = useAuth();
  const getBestPracticeData = useFetchBestPracticeData(id);
  const [bestPractice, setBestPractice] = useState({
    title: "",
    introduction: "",
    key: {},
    sourceTicketId: "",
    steps: [],
    status: GLOBAL_STATUS.APPROVED,
    assignee: `${auth.userDetails.email.toLowerCase()}`,
  });
  const [step, setStep] = useState({});

  useEffect(() => {
    setError({
      title: [],
      message: [],
    });
    const bestPracticeRes = getBestPracticeData?.data?.data;
    if (!bestPracticeRes?.bestPracticeId || pageType === "create") return;

    setBestPractice((prev) => ({
      ...prev,
      ...bestPracticeRes,
      title: bestPracticeRes.title,
      introduction: bestPracticeRes.introduction,
      key: bestPracticeRes.key,
    }));

    setStep({});
  }, [getBestPracticeData?.data?.data, bestPractice?.bestPracticeId, id]);

  const handleCancel = () => {
    navigate("/inventory/best-practice");
  };

  const handleSave = async () => {
    try {
      if (isDataValidBestPractices(bestPractice, error, setError)) {
        return;
      }
      setLoading(true);
      const body = {
        ...bestPractice,
        sourceTicketId: bestPractice.sourceTicketId,
        updatedOn: dateTransform(new Date()),
        assignee: `${auth.userDetails.email.toLowerCase()}`,
        updatedBy: `${auth.userDetails.email.toLowerCase()}`,
        status: GLOBAL_STATUS.APPROVED,
        ...(pageType === PAGE_TYPE.CREATE
          ? {
              steps: bestPractice.steps.map((item, index) => ({
                sequence: index + 1,
                description: item,
              })),
            }
          : {
              steps: bestPractice.steps.map((item, index) => ({
                sequence: index + 1,
                description: item.description ? item.description : item,
                ...(item.stepId ? { stepId: item.stepId } : {}),
              })),
            }),
      };
      if (pageType === PAGE_TYPE.CREATE)
        await createSingleBestPractice({
          ...body,
        });
      else if (pageType === PAGE_TYPE.EDIT)
        await updateSingleBestPractice({
          bestPracticeId: id,
          ...body,
        });
      navigate("/inventory/best-practice");
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (index) => {
    let steps = bestPractice.steps;
    steps.splice(index, 1);
    setBestPractice({
      ...bestPractice,
      steps: steps,
    });
  };
  const handleAdd = () => {
    if (!step.length || step === "<p><br></p>")
      return toast.error("Empty step cannot be added");
    setError({
      title: [],
      message: [],
    });
    setBestPractice({
      ...bestPractice,
      steps: [...bestPractice.steps, step],
    });
    setStep({});
  };

  const changeHandler = (e) => {
    setError({
      title: [],
      message: [],
    });
    setBestPractice({
      ...bestPractice,
      [e.target.name]: e.target.value,
    });
  };

  const handleIndividualSteps = (content, index) => {
    let steps = bestPractice.steps;
    setError({
      title: [],
      message: [],
    });
    steps.splice(index, 1, content);
    setBestPractice({
      ...bestPractice,
      steps: steps,
    });
  };

  return (
    <div className="edit-block">
      <CommonHeader
        backArrow="/inventory/bes/-practice"
        label="Best Practices"
        ticketInput={bestPractice}
        handleTicketValue={setBestPractice}
        {...((pageType === PAGE_TYPE.CREATE || pageType === PAGE_TYPE.EDIT) && {
          handleSave: handleSave,
        })}
        {...(pageType === PAGE_TYPE.VIEW && {
          handleEdit: () => navigate("/inventory/best-practice/edit/" + id),
        })}
        handleCancel={handleCancel}
      />
      <div className="create-wrapper">
        <div className="best-Input">
          <label className="best-label">
            Title{pageType !== PAGE_TYPE.VIEW && "*"}
          </label>
          <InputBox
            id="outlined-basic"
            variant="outlined"
            name="title"
            title="title"
            required={true}
            size="small"
            autoComplete="off"
            value={bestPractice.title}
            onChange={changeHandler}
            placeholder="Enter title here"
            disabled={pageType === PAGE_TYPE.VIEW}
          />
        </div>
        <div className={`best-Input `}>
          <label className="best-label">
            Introduction{pageType !== PAGE_TYPE.VIEW && "*"}
          </label>
          <TextField
            id="outlined-multiline-static"
            placeholder="Enter Introduction here"
            required={true}
            variant="outlined"
            multiline
            sx={
              pageType === PAGE_TYPE.VIEW && {
                border: "none",
                "& fieldset": { border: "none" },
              }
            }
            rows={2}
            name="introduction"
            onChange={changeHandler}
            className={pageType === PAGE_TYPE.VIEW ? PAGE_TYPE.VIEW : ""}
            value={bestPractice.introduction}
            disabled={pageType === PAGE_TYPE.VIEW}
            error={error.title.includes("introduction")}
          />
          <ErrorBox title="introduction" />
        </div>
        <div
          className={`best-Input ${
            pageType === PAGE_TYPE.VIEW ? "view-key-issue-input" : ""
          }`}
        >
          <div
            className={`keyContainer ${
              pageType === PAGE_TYPE.VIEW ? PAGE_TYPE.VIEW : ""
            } ${error.title.includes("key") ? "keyContainer-error" : ""} `}
            onChange={changeHandler}
          >
            <label className="best-label">
              Key Issues it addresses{pageType !== PAGE_TYPE.VIEW && "*"}
            </label>
            <RichTextEditor
              placeholder="Enter Key Issues Here"
              name="key"
              changeHandler={(content) => {
                setError({
                  title: [],
                  message: [],
                });

                setBestPractice({
                  ...bestPractice,
                  key: content,
                });
              }}
              readOnly={pageType === PAGE_TYPE.VIEW}
              value={bestPractice.key}
            />
            <ErrorBox title="key" />
          </div>
        </div>

        <div className="best-Input">
          <label className="best-label">
            Steps of Best Practices{pageType !== PAGE_TYPE.VIEW && "*"}
          </label>
          <div
            className={`step-wrapper ${
              pageType === PAGE_TYPE.VIEW ? PAGE_TYPE.VIEW : ""
            }`}
          >
            {bestPractice.steps.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`single-step-wrapper ${
                    pageType === PAGE_TYPE.VIEW
                      ? "view-single-step-wrapper"
                      : ""
                  } `}
                >
                  {pageType === PAGE_TYPE.VIEW && (
                    <strong>Step {item.sequence}:</strong>
                  )}
                  <RichTextEditor
                    value={
                      item.description === undefined ? item : item.description
                    }
                    changeHandler={(content) =>
                      handleIndividualSteps(content, index)
                    }
                    readOnly={pageType === PAGE_TYPE.VIEW}
                  />

                  <div
                    className={`remove-icon ${
                      pageType === PAGE_TYPE.VIEW ? "viewSteps" : ""
                    }`}
                  >
                    <button
                      className="close-icon"
                      onClick={() => handleRemove(index)}
                    >
                      <div className="deleteContainer">
                        <DeleteOutlineIcon style={{ color: "white" }} />
                        {/* <span style={{ color: "white" }}> Delete</span> */}
                      </div>{" "}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className={`stepsContainer ${
              pageType === PAGE_TYPE.VIEW ? "viewSteps" : ""
            } ${error.title.includes("steps") ? "stepsContainer-error" : ""}`}
          >
            {" "}
            <div className="editor-error-container">
              <RichTextEditor
                placeholder="Enter Steps Here"
                value={step}
                changeHandler={(content) => {
                  setError({
                    title: [],
                    message: [],
                  });
                  setStep(content);
                }}
                readOnly={pageType === PAGE_TYPE.VIEW}
              />
              <div className="errorBox">
                <ErrorBox title="steps" />
              </div>
            </div>
            <div className="add-icon-container">
              <button className="add-icon" onClick={() => handleAdd()}>
                <div className="addContainer">
                  <AddIcon style={{ color: "white" }} />
                  <span style={{ color: "white" }}>Add Step</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBestPractices;
