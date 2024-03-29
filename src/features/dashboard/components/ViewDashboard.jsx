import React, { useMemo } from "react";
import "./ViewDashboard.scss";
import DashboardCard from "./DashboardCard";
import AssigneeCard from "./AssignedCard";
import DashboardTable from "./DashboardTable";
import {
  useFetchInformationAssignedCount,
  useFetchInformationCount,
  useFetchInventoryAssignedCount,
  useFetchInventoryInformationCount,
} from "../hooks/useFetchCountDashboard";
import { transInventoryData } from "../dashboard.helpers";
import DashboardCardSkeleton from "./DashboardCardSkeleton";
import { INFORMATION_TYPE_FILTER } from "../../../common/global.constant";
function ViewDashboard() {
  const infoInventoryCount = useFetchInventoryInformationCount();
  const inventoryAssignedCount = useFetchInventoryAssignedCount();
  const infoCount = useFetchInformationCount();
  const infoAssignedCount = useFetchInformationAssignedCount();

  const transformInfo = useMemo(
    () =>
      !infoCount.isLoading && !infoCount.isError
        ? transInventoryData({ data: infoCount?.data?.data })
        : [],
    [(infoCount.isLoading, infoCount.isError, infoCount?.data?.data)]
  );
  const transformInventory = useMemo(
    () =>
      !infoInventoryCount.isLoading && !infoInventoryCount.isError
        ? transInventoryData({ data: infoInventoryCount?.data?.data })
        : [],
    [
      infoInventoryCount.isLoading,
      infoInventoryCount.isError,
      infoInventoryCount?.data?.data,
    ]
  );

  const transformAssigned = useMemo(
    () =>
      !inventoryAssignedCount.isLoading && !inventoryAssignedCount.isError
        ? transInventoryData({ data: inventoryAssignedCount?.data?.data })
        : [],
    [
      inventoryAssignedCount.isLoading,
      inventoryAssignedCount.isError,
      inventoryAssignedCount?.data?.data,
    ]
  );

  const transformInfoAssigned = useMemo(
    () =>
      !infoAssignedCount.isLoading && !infoAssignedCount.isError
        ? { data: infoAssignedCount?.data?.data }
        : [],
    [
      infoAssignedCount.isLoading,
      infoAssignedCount.isError,
      infoAssignedCount?.data?.data,
    ]
  );
  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-assignee-container">
          <h4>INFORMATION</h4>
          <div className="Info-Container">
            {!infoCount.isLoading
              ? transformInfo.map((item) => (
                  <DashboardCard
                    key={Object.keys(item)[0]}
                    title={Object.keys(item)[0]}
                    inProgress={item[Object.keys(item)[0]].IN_PROGRESS}
                    inApproval={item[Object.keys(item)[0]].IN_APPROVAL
                      +item[Object.keys(item)[0]].REQ_UNPUBLISHED
                    }
                    inAdvice={
                      item[Object.keys(item)[0]].ADVICE_A +
                      item[Object.keys(item)[0]].ADVICE_C
                    }
                    approved={item[Object.keys(item)[0]].APPROVED}
                  />
                ))
              : INFORMATION_TYPE_FILTER.map((item, index) => {
                  if (item.label !== "") {
                    return (
                      <DashboardCardSkeleton title={item.label} key={index} />
                    );
                  }
                })}
          </div>
          <div style={{ margin: "10px 0px" }}>
            <h4>INVENTORY</h4>
            <DashboardTable
              tableType={"inventory"}
              cols={transformInventory}
              color={"white"}
              isLoading={infoInventoryCount.isLoading}
            />
          </div>
        </div>
        <div className="assignee-container">
          <h4>ASSIGNED TO ME</h4>
          <div className="dashboard-right-card-container">
            <AssigneeCard
              isLoading={infoAssignedCount.isLoading}
              title="Information"
              data={transformInfoAssigned.data}
            />
            <DashboardTable
              tableType={"assigned"}
              cols={transformAssigned}
              isLoading={inventoryAssignedCount.isLoading}
              color={"#D9EBFF"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewDashboard;
