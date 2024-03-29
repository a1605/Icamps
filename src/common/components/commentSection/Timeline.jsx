import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import { STATUS_COMMENT } from "../../global.constant";
import { commentDateTransform } from "../../helperFunction/dateTransform";
import "./Timeline.scss";
import StatusBadge from "../statusBadge/StatusBadge";

export default function CommentTimeline({ data }) {
  return (
    <>
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {data.comments?.map((comment, key) => {
          return (
            <TimelineItem
              key={key}
              sx={{
                paddingBottom: "16px",
              }}
            >
              <TimelineSeparator>
                <TimelineDot
                  sx={{
                    backgroundColor: "#6e6ce7",
                  }}
                />
                <TimelineConnector
                  sx={{
                    backgroundColor: "#6e6ce7",
                    width: "1px",
                  }}
                />
              </TimelineSeparator>
              <TimelineContent
                sx={{
                  padding: "0px 13px",
                }}
              >
                <div className="timeline-container">
                  <div className="head-timeline">
                    <strong style={{ fontSize: 20 }}>
                      {STATUS_COMMENT[comment.status]}
                    </strong>
                    <p>{commentDateTransform(comment.updatedOn)}</p>
                  </div>
                  <div className="comment-info-container">
                    <div>Initiator:</div>
                    <div>
                      <strong>{comment.user?.email}</strong>
                    </div>
                    <div>Current Assignee:</div>
                    <div>
                      <strong>{comment.assignee}</strong>
                    </div>
                    <div>Current Status:</div>
                    <div>
                      <StatusBadge margin={"0"} status={comment.status} />
                    </div>
                  </div>
                  <div>Comment:</div>
                  <div
                    style={{
                      color: "blue",
                      wordBreak: "break-all",
                    }}
                  >
                    {comment.commentDescription}
                    <p
                      style={{
                        border: "1px solid #dcdcdc",
                        margin: "15px 0px 0px 0px",
                      }}
                    ></p>
                  </div>
                </div>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </>
  );
}
