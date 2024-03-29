import React from "react";
import "./Dashboard.scss";
import ListingHeader from "../../common/components/ListingHeader/ListingHeader";
import ViewDashboard from "./components/ViewDashboard";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard-wrapper">
        <ListingHeader title="Dashboard" />
        <ViewDashboard />
      </div>
    </>
  );
};

export default Dashboard;
