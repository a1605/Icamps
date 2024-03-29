import React, { useCallback, useRef, useState } from "react";
import "./commentSection.scss";
import { msgIcon } from "../../../assets/icons";
import { crossIcon } from "../../../assets/images";
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { SendRounded } from "@mui/icons-material";
import { useAuth } from "../../hooks/useAuth";
import {
  commentDateTransform,
  dateTransform,
} from "../../helperFunction/dateTransform";
import CommentTimeline from "./Timeline";

const CommentSection = ({ canAdd = true, data, submitHandler }) => {
  const { auth } = useAuth();
  const [commentContainer, setCommentContainer] = useState(false);

  const inputRef = useRef();

  const createCommentsSection = useCallback(() => {
    if (!data.comments || data?.comments?.length === 0) return;
    const arrComment = data.comments.map(
      (item) =>
        item.user && {
          comment: item.commentDescription,
          userName: `${item.user?.firstName} ${item.user?.lastName}`,
          commentDate: commentDateTransform(item.updatedOn),
        }
    );
    return arrComment.map(
      (item, index) =>
        item && (
          <div className="comment-item" key={index}>
            <div className="name-sec">
              <h5>{item.userName}</h5>
            </div>
            <div className="date-sec">
              <p>{item.commentDate}</p>
            </div>
            <div className="comment">
              <p>{item.comment}</p>
            </div>
          </div>
        )
    );
  }, [data.comments]);

  const commentHandler = () => {
    if (inputRef.current.value !== "") {
      submitHandler({
        commentDescription: inputRef.current.value,
        email: auth.userDetails.email,
        updatedOn: dateTransform(new Date()),
      });
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  return (
    <div className="comment-section-wrapper">
      <div className="image-section">
        <button
          className="view-comments"
          onClick={() => setCommentContainer(!commentContainer)}
        >
          <img src={msgIcon} alt="Message Icon" width="30px" />
        </button>
      </div>
      <div
        className={`comments-section ${
          commentContainer ? "open-comment-section" : "close-comment-section"
        }`}
      >
        <div className="header-section">
          <h3>Comments</h3>

          <div className="container-close">
            <button onClick={() => setCommentContainer(!commentContainer)}>
              <img src={crossIcon} alt="cross-icon" />
            </button>
          </div>
        </div>

        <div className="timelineViewer">
          <CommentTimeline data={data} />
        </div>
        {canAdd && (
          <div className="add-comment">
            <FormControl
              sx={{ m: 1, width: "25ch" }}
              fullWidth={true}
              variant="outlined"
              onSubmit={(e) => {
                e.preventDefault();
                commentHandler();
              }}
            >
              <OutlinedInput
                id="outlined-adornment-comment"
                type={"text"}
                placeholder="Type your comment here"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle comment visibility"
                      onClick={commentHandler}
                      edge="end"
                      
                    >
                      <SendRounded color="inherit" />
                    </IconButton>
                  </InputAdornment>
                }
                onKeyDown={(e) => (e.key === "Enter" ? commentHandler() : null)}
                inputRef={inputRef}
              />
            </FormControl>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
