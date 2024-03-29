import React from "react";
import ListingHeader from "../../common/components/ListingHeader/ListingHeader";

const PhisingLink = () => {
  return (
    <>
      <div className="page-background ">
        <ListingHeader
          title="Phising Link"
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
          No of phising link using srishtha technologies.
        </p>
      </div>
    </>
  );
};

export default PhisingLink;
