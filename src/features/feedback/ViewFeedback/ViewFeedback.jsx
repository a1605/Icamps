import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetSingleFeedback } from "../hooks/useGetSingleFeedback";
import {
  dateTransform,
  issueFixDateTransform,
} from "../../../common/helperFunction/dateTransform";
import { useEffect, useState } from "react";
import CircularLoader from "../../../common/components/CircularLoader/CircularLoader";
import { crossIcon } from "../../../assets/images";
import "./ViewFeedback.scss";
import Button from "../../../common/components/Button/Button";
import { toast } from "react-hot-toast";
import { updateSingleFeedback } from "../services/feedback-services";
import { useQueryClient } from "@tanstack/react-query";
import { INVENTORY_QUERY_KEY } from "../feedback.constant";
import { isUpdateAccess } from "../feedback-helper";
import { useAuth } from "../../../common/hooks/useAuth";

function ViewFeedback() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { auth } = useAuth();

  const { id, pageType } = useParams();
  const { data, isLoading, isError } = useGetSingleFeedback(id);
  const [feedback, setFeedback] = useState({
    feedbacks: "",
    topic: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    feedbackReceivedDate: "",
    updatedBy: "",
    updatedOn: "",
    status: "",
  });
  const handleMarkAsReview = async () => {
    try {
      await updateSingleFeedback({
        ...feedback,
        updatedBy: auth.userDetails.email,
        updatedOn: dateTransform(new Date()),
        status: "opened",
      });
      navigate("/inventory/feedback");
      queryClient.invalidateQueries([INVENTORY_QUERY_KEY.FEEDBACK_LISTING]);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }
  };
  useEffect(() => {
    setFeedback({
      ...feedback,

      ...data?.data,
    });
  }, [data?.data, pageType]);

  return (
    <div
      className={`create-container-overlay ${pageType ? "open-create" : ""}`}
    >
      <div className="create-container-section">
        <div className="header">
          <h2>Feedback</h2>
          <Link to="/inventory/feedback" className="close-link">
            <img src={crossIcon} alt="close-icon" />
          </Link>
        </div>
        {!isLoading && !isError ? (
          <div className="form-container">
            <div className="detailsContainer">
              <div className="keyMapper">
                <h4>Date</h4>
                <h5>{issueFixDateTransform(feedback.feedbackReceivedDate)}</h5>
              </div>
              <div className="keyMapper">
                <h4>Submitted By</h4>
                <h5>{feedback.contactName}</h5>
              </div>
              <div className="keyMapper">
                <h4>Email Id</h4>
                <h5>{feedback.contactEmail}</h5>
              </div>
              <div className="keyMapper">
                <h4>Mobile</h4>
                <h5>{feedback.contactPhone}</h5>
              </div>
            </div>
            <div className="dataContainer">
              <h4>Category</h4>
              <p>{feedback.topic}</p>
            </div>
            <div className="dataContainer">
              <h4>Feedback</h4>
              <p>{feedback.feedbacks}</p>
            </div>
            <div className="buttonContainer">
              <div className="button">
                <Button
                  variant="outlined"
                  text="Close"
                  clickHandler={() => navigate("/inventory/feedback")}
                />
              </div>
              {feedback.status !== "opened" && isUpdateAccess(auth) && (
                <div className="button">
                  <Button
                    clickHandler={handleMarkAsReview}
                    text="Mark As Review"
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <CircularLoader />
        )}
      </div>
    </div>
  );
}

export default ViewFeedback;
