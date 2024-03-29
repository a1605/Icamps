import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PAGE_TYPE } from "../../../common/global.constant";
import { useAuth } from "../../../common/hooks/useAuth";
import { toast } from "react-hot-toast";
import { dateTransform } from "../../../common/helperFunction/dateTransform";
import { createSingleFaq, updateSingleFaq } from "../Services/faqServices";
import { isDataValidFAQ } from "../faq.helper";
import { useFetchFaqData } from "../hooks/useFetchFaqData";
import CircularLoader from "../../../common/components/CircularLoader/CircularLoader";
import { crossIcon } from "../../../assets/images";
import RichTextEditor from "../../Best Practices/Create/RichTextEditor";
import DropdownMultiSelect from "../../../common/components/MultipleSelect/DropdownMultiSelect";
import {
  FAQ_CATEGORY_DROPDOWN,
  INVENTORY_FAQ_QUERY_KEY,
} from "../faq.constant";
import InputBox from "../../../common/components/InputBox/InputBox";
import ErrorBox from "../../../common/components/Error/ErroBox";
import Button from "../../../common/components/Button/Button";
import "./CreateFaq.scss";
import { useQueryClient } from "@tanstack/react-query";
import TextArea from "../../../common/components/Textarea/TextArea";

function CreateFaq() {
  const { auth, setLoading, error, setError } = useAuth();
  const { id, pageType } = useParams();
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const [faq, setFaq] = useState({
    question: "",
    category: "",
    questionSequence: "",
  });
  const [answer, setAnswer] = useState();
  const [category, setCategory] = useState({ id: "", label: "" });
  const getFaq = useFetchFaqData(id);
  useEffect(() => {
    setCategory(FAQ_CATEGORY_DROPDOWN[0]);
    setFaq({
      question: "",
      category: category.id,
      questionSequence: "",
    });
    setAnswer();
    if (pageType === "create" || pageType === undefined) return;
    const data = getFaq?.data?.data;

    setError({
      title: [],
      message: [],
    });

    setCategory({
      id: data?.category,
      label: data?.category,
    });
    setAnswer(data?.answer);
    setFaq({
      question: data?.question,
      category: data?.category,
      questionSequence: data?.questionSequence,
    });
  }, [pageType, getFaq?.data?.data]);

  const changeHandler = (e) => {
    setError({
      title: [],
      message: [],
    });
    setFaq({
      ...faq,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (isDataValidFAQ(faq,answer, error, setError)) return;
    try {
      setLoading(true);
      const body = {
        ...faq,
        answer,
        updatedOn: dateTransform(new Date()),
        updatedBy: `${auth.userDetails.email.toLowerCase()}`,
      };
      if (pageType === PAGE_TYPE.CREATE) {
        await createSingleFaq({
          ...body,
        });
        toast.success("FAQ created");
      } else if (pageType === PAGE_TYPE.EDIT) {
        await updateSingleFaq({
          id: id,
          ...body,
        });
        toast.success("FAQ updated");
      }
      queryClient.invalidateQueries([INVENTORY_FAQ_QUERY_KEY.FAQ_LISTING]);
      navigate("/faq");
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div
        className={`faq-create-container-overlay ${
          [PAGE_TYPE.CREATE, PAGE_TYPE.EDIT, PAGE_TYPE.VIEW].includes(pageType)
            ? "faq-open-create"
            : ""
        }`}
      >
        <div className="create-container-section">
          <div className="header">
            <h3>Create FAQ</h3>
            <Link to="/faq" className="close-link">
              <img src={crossIcon} alt="close-icon" />
            </Link>
          </div>
          {!getFaq.isLoading ? (
            <div className="faq-container">
              <div className="faq-input-container">
                <h4>Category</h4>
                <DropdownMultiSelect
                  optionData={FAQ_CATEGORY_DROPDOWN}
                  placeholder="Select Category"
                  selectedValues={category}
                  setSelectedValues={(value) => {
                    setCategory(value);
                    setFaq({
                      ...faq,
                      category: value?.id,
                    });
                  }}
                  showChips={false}
                  width="100%"
                  multiple={false}
                  disableCloseOnSelect={false}
                  disabled={pageType === PAGE_TYPE.VIEW}
                />
              </div>
              <div className="faq-input-container">
                <h4>Question Sequence</h4>
                <InputBox
                  id="outlined-basic"
                  variant="outlined"
                  name="questionSequence"
                  title="questionSequence"
                  required={true}
                  size="small"
                  autoComplete="off"
                  value={faq.questionSequence}
                  onChange={changeHandler}
                  placeholder="Question Number"
                  disabled={pageType === PAGE_TYPE.VIEW}
                />
              </div>
              <div className="faq-input-container">
                <h4>Question</h4>
                <TextArea
                  id="outlined-basic"
                  cols="3"
                  variant="outlined"
                  name="question"
                  title="question"
                  required={true}
                  size="small"
                  autoComplete="off"
                  value={faq.question}
                  onChange={changeHandler}
                  placeholder="Enter Question"
                  sx={{ height: "6rem" }}
                  disabled={pageType === PAGE_TYPE.VIEW}
                />
              </div>
              <div
                className={`richTextEditorContainer ${
                  error.title.includes("answer")
                    ? "richTextEditorContainer-error"
                    : ""
                }`}
              >
                <div className="richContent">
                  <h4>Answer</h4>
                  <RichTextEditor
                    placeholder="Enter Answer Here"
                    value={answer}
                    changeHandler={(content) => {
                      setError({
                        title: [],
                        message: [],
                      });
                      setAnswer(content);
                    }}
                    readOnly={pageType === PAGE_TYPE.VIEW}
                  />
                </div>
                <div className="errorContainer">
                  <ErrorBox title="answer" />{" "}
                </div>
              </div>
            {(pageType === PAGE_TYPE.EDIT || pageType === PAGE_TYPE.CREATE) &&  <div className="action-button">
                <Button
                  text="Submit"
                  variant="solid"
                  clickHandler={handleSave}
                />
              </div>}
            </div>
          ) : (
            <CircularLoader />
          )}
        </div>
      </div>
    </>
  );
}

export default CreateFaq;
