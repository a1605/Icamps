import React from "react";
import ListingHeader from "../../common/components/ListingHeader/ListingHeader";

const Email = () => {
  return (
    <>
      <div className="page-background ">
        <ListingHeader
          title="Email"
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
          have i been pwned?
        </p>
      </div>
    </>
  );
};

export default Email;
