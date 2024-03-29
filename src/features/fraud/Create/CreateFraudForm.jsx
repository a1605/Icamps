import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../common/hooks/useAuth";
import { PAGE_TYPE } from "../../../common/global.constant";
import "./CreateFraud.scss";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";
import InputBox from "../../../common/components/InputBox/InputBox";
import ErrorBox from "../../../common/components/Error/ErroBox";
import RichTextEditor from "../../Best Practices/Create/RichTextEditor";

function CreateFraudForm({
  handleIndividualSteps,
  handleAdd,
  fraud,
  setFraud,
  step,
  setStep,
  handleRemove,
  isEditable,
}) {
  const { id, pageType } = useParams();

  const { auth, error, setError, loading, setLoading } = useAuth();

  const changeHandler = (e) => {
    isEditable(true);
    setError({
      title: [],
      message: [],
    });
    setFraud({
      ...fraud,
      [e.target.name]: e.target.value,
    });
  };

  return (
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
          value={fraud.title}
          onChange={changeHandler}
          placeholder="Enter title here"
          disabled={pageType === PAGE_TYPE.VIEW}
        />
      </div>

      <div className={`best-Input `}>
        <label className="best-label">
          Description{pageType !== PAGE_TYPE.VIEW && "*"}
        </label>
        <TextField
          id="outlined-multiline-static"
          placeholder="Enter Description here"
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
          value={fraud.introduction}
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
            Steps Done By Scammers{pageType !== PAGE_TYPE.VIEW && "*"}
          </label>
          <div className="richContainer">
            <RichTextEditor
              placeholder="Enter Key Issues Here"
              name="key"
              changeHandler={(content) => {
                setError({
                  title: [],
                  message: [],
                });

                setFraud({
                  ...fraud,
                  key: content,
                });
              }}
              readOnly={pageType === PAGE_TYPE.VIEW}
              value={fraud.key}
            />
          </div>

          <ErrorBox title="key" />
        </div>
      </div>

      <div className="best-Input">
        <label className="best-label">
          Steps to be taken to save yourself from being scammed
          {pageType !== PAGE_TYPE.VIEW && "*"}
        </label>
        <div
          className={`step-wrapper ${
            pageType === PAGE_TYPE.VIEW ? PAGE_TYPE.VIEW : ""
          }`}
        >
          {fraud.fraudSteps.map((item, index) => {
            return (
              <div
                key={index}
                className={`single-step-wrapper ${
                  pageType === PAGE_TYPE.VIEW ? "view-single-step-wrapper" : ""
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
                    </div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className={`stepsContainer ${
            pageType === PAGE_TYPE.VIEW ? "viewSteps" : ""
          } ${
            error.title.includes("fraudSteps") ? "stepsContainer-error" : ""
          }`}
        >
          {" "}
          <div className="editor-error-container">
            <RichTextEditor
              placeholder="Enter steps Here"
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
              <ErrorBox title="fraudSteps" />
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
  );
}

export default CreateFraudForm;
