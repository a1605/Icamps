import { useMemo } from "react";
import Button from "../../common/components/Button/Button";
import ViewText from "../../common/components/ViewText/ViewText";
import useFetchSingleDevice from "./hooks";
import { transformSingleData } from "./device.helpers";
import { useNavigate, useParams } from "react-router-dom";
import "./ViewDevice.scss";
import CommentSection from "../../common/components/commentSection/commentSection";

const ViewDevice = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isError } = useFetchSingleDevice(id);
  const transformedData = useMemo(() => {
    if (isLoading || isError) return { first: [], second: [] };
    return transformSingleData(data?.data);
  }, [data, isError, isLoading]);

  const openInNewTab = (url) => {
    if (new URL(url).protocol === "https:") {
      const newWindow = window.open(url);
      if (newWindow) newWindow.opener = null;
    }
  };

  const onClickUrl = (url) => {
    return () => openInNewTab(url);
  };
  return (
    <div className="view-device-container">
      <div className="head-section">
        <div>
          <p>Device Details</p>
          <p>Approved</p>
          <div className="ticket-section">
            <p>Ticket ID: </p>
            <a
              onClick={onClickUrl(transformedData.sourceTicketId)}
              className="ticket-url"
            >
              {transformedData.sourceTicketId.split("/").pop()}
            </a>
          </div>
        </div>
        <div>
          <div style={{ marginRight: 200 }}>
            <CommentSection />
          </div>
          <Button
            text="Cancel"
            variant="outlined"
            clickHandler={() => navigate("/inventory/devices")}
          />
          <Button
            text="Edit"
            variant="solid"
            clickHandler={() =>
              navigate(`/inventory/devices/edit-device/${transformedData.id}`)
            }
          />
        </div>
      </div>
      <hr
        style={{ marginLeft: "-30px", marginRight: "-30px", color: "#f8f8f8" }}
      />
      <div className="information-container">
        {!isLoading && (
          <div className="information-flex-container">
            <div>
              {transformedData.first.map((item) => {
                return (
                  <ViewText
                    value={item.value}
                    heading={item.heading}
                    key={item.heading}
                  />
                );
              })}
            </div>
            <div>
              {transformedData.second.map((item) => {
                return (
                  <ViewText
                    value={item.value}
                    heading={item.heading}
                    key={item.heading}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewDevice;
