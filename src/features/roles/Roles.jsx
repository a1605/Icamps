import React, { useMemo, useState, useEffect } from "react";
import Table from "../../common/components/table/Table";
import { RolesFilter } from "./components";
import {
  COLUMN_USER_ROLE_VIEW_HEADING,
  ROLES_COLUMNS,
  ROLES_QUERY_KEYS,
} from "./roles.constant";
import useFetchRoles from "./hooks";
import {
  transformTableData,
  transformFilterValues,
  RoleViewData,
} from "./roles.helpers";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { deleteSingleRole } from "./services/rolesServices";
import ListingHeader from "../../common/components/ListingHeader/ListingHeader";
import "../../App.scss";
import { useNavigate, useParams } from "react-router-dom";
import RoleView from "../../common/roleView/RoleView";
import useFetchRoleView from "./hooks/useFetchRoleView";
import { order } from "../../common/global.constant";
import useFetchRolesFilter from "./hooks/useFetchRolesFilter";

const Roles = () => {
  const [filterData, setFilterData] = React.useState({
    pagination: true,
  });
  const [roleName, setRoleName] = React.useState("");
  const [sortingStatus, setSortingStatus] = React.useState({ updatedOn: 0 });
  const [openDrawer, setOpenDrawer] = useState(false);

  const { screenType } = useParams();
  const navigate = useNavigate();

  const onEdit = (data) => {
    navigate(`/roles/edit/${data.roleId}`);
  };

  const onView = (data) => {
    navigate(`/roles/view/${data.roleId}`);
  };

  const queryClient = useQueryClient();

  const onDelete = async (data) => {
    try {
      if (data.associatedUsers > 0) {
        toast.error("Please delink associated users from the role.");
        return;
      }
      toast.success("Role deleted successfully.");
      await deleteSingleRole(data.roleId);
      queryClient.invalidateQueries([ROLES_QUERY_KEYS.GET_ALL_ROLES]);
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    }
  };

  const handleFilter = (value, key) => {
    if (value.length > 0)
      return setFilterData({
        ...filterData,
        [key]: value.map((item) => item.label),
      });

    const { [key]: keyData, ...data } = filterData;

    setFilterData(data);
  };

  const { isLoading, isError, data, ...roleError } = useFetchRoles(
    filterData,
    Object.keys(sortingStatus)[0],
    order(sortingStatus)
  );

  useEffect(() => {
    if (screenType !== "roles") {
      navigate("/error-404");
    }
    if (roleError?.error?.response?.status === 404) {
      navigate("/error-404");
    }
  }, [screenType, roleError]);

  const roleDataView = useFetchRoleView(roleName);

  const roleFilter = useFetchRolesFilter(
    { pagination: false },
    "roleName",
    "ASC"
  );

  const transFormData = useMemo(
    () =>
      !isLoading &&
      !isError &&
      transformTableData({
        data: data?.data?.responseDTOList,
        onEdit,
        onView,
        onDelete,
        openDrawer,
        setOpenDrawer,
        setRoleName,
      }),
    [(isLoading, isError, data?.data?.responseDTOList)]
  );

  const RoleData = useMemo(
    () => RoleViewData(roleDataView?.data?.data?.responseDTOList),
    [roleDataView?.data?.data?.responseDTOList]
  );

  const filterValues = useMemo(
    () =>
      !roleFilter?.isLoading && !roleFilter?.isError
        ? transformFilterValues(roleFilter?.data?.data?.responseDTOList)
        : [],
    [
      roleFilter?.isLoading,
      roleFilter?.isError,
      roleFilter?.data?.data?.responseDTOList,
    ]
  );

  return (
    <div className="page-background">
      <ListingHeader
        title="Roles"
        iconButtonTitle="Create New Role"
        pathToNavigate="/roles/create"
        permissionTitle="roles"
      />
      <RolesFilter
        filterValues={filterValues}
        filterData={filterData}
        filterHandler={handleFilter}
      />

      <div
      // style={{
      //   display: "flex",
      //   flexWrap: "wrap",
      //   alignItems: "baseline",
      // }}
      >
        <RoleView
          tableColumns={COLUMN_USER_ROLE_VIEW_HEADING}
          data={RoleData.columnRoleView}
          setOpenDrawer={setOpenDrawer}
          openDrawer={openDrawer}
          roleName={roleName}
        />
      </div>

      {!isError ? (
        <Table
          tableColumns={ROLES_COLUMNS}
          tableData={transFormData}
          isLoading={isLoading}
          sortingStatus={sortingStatus}
          setSortingStatus={setSortingStatus}
          rowCount={15}
          // handlePaginationValue={setPage}
          // currentPage={page}
          // paginationCount={data?.data?.pageSize}
        />
      ) : (
        <div>
          <p>Something Went Wrong</p>
        </div>
      )}
    </div>
  );
};

export default Roles;
