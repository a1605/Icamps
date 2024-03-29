import React from "react";
import ListingHeader from "../../common/components/ListingHeader/ListingHeader";

const SMS = () => {
  return (
    <>
      <div className="page-background ">
        <ListingHeader
          title="SMS"
        />
        <p
          style={{
            textAlign: "center",
            fontSize: 40,
            fontWeight: "bold",
            textTransform: "capitalize",
            color: "grey",
          }}
        >
          3rd party API based
        </p>
      </div>
    </>
  );
};

export default SMS;
