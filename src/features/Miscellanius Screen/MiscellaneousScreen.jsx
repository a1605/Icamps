import React, { useState, useMemo, useEffect, useCallback } from "react";
import ListingHeader from "../../common/components/ListingHeader/ListingHeader";
import { useParams, useNavigate } from "react-router-dom";
import Table from "../../common/components/table/Table";
import {
  APP_PUBLISHER_KEY,
  APP_PUBLISHER_TABLE_COLUMNS,
  CPU_KEY,
  CPU_TABLE_COLUMNS,
  GPU_KEY,
  GPU_TABLE_COLUMNS,
  MANUFACTURER_TABLE_COLUMNS,
  MANUFACTURE_KEY,
  MISELLANEOUS_SCREEN_TYPE,
  PERMISSIONS_KEY,
  PERMISSION_TABLE_COLUMNS,
  THIRD_PARTY_KEY,
  THIRD_PARTY_TABLE_COLUMNS,
} from "./miscellaneous.constant";
import DialogBox from "../../common/components/DialogBox/DialogBox";
import "./MiscellaneousScreen.scss";
import { PAGE_TYPE, order } from "../../common/global.constant";
import { useFetchManufacturer } from "./hooks/useFetchManufacturer";
import {
  transformAppPublisherTableData,
  transformCPUTableData,
  transformGPUTableData,
  transformManufacturerTableData,
  transformPermissionsTableData,
  transformThirdPartyTableData,
} from "./miscellaneous.helper";
import { useQueryClient } from "@tanstack/react-query";
import {
  createAppPublisher,
  createCPU,
  createGPU,
  createManufacturer,
  createPermissions,
  createThirdParty,
  deleteSingleAppPublisher,
  deleteSingleCPU,
  deleteSingleGPU,
  deleteSingleManufacturer,
  deleteSinglePermissions,
  deleteSingleThirdParty,
  singleAppPublisher,
  singleCPU,
  singleGPU,
  singleManufacturer,
  singlePermissions,
  singleThirdParty,
} from "./services/miscellaneous.services";
import { toast } from "react-hot-toast";
import { useFetchPermissions } from "./hooks/useFetchPermissions";
import { useFetchThirdParty } from "./hooks/useFetchThirdParty";
import { useFetchAppPublisher } from "./hooks/useFetchAppPublisher";
import { useFetchCPU } from "./hooks/useFetchCPU";
import { useFetchGPU } from "./hooks/useFetchGPU";
import { useFetchSingleManufacturer } from "./hooks/useFetchSingleManufacture";
import { useFetchSinglePermissions } from "./hooks/useFetchSinglePermissions";
import { useFetchSingleThirdParty } from "./hooks/useFetchSingleThirdParty";
import { useFetchSinglePublisher } from "./hooks/useFetchSinglePublisher";
import { useFetchSingleCPU } from "./hooks/useFetchSingleCPU";
import { useFetchSingleGPU } from "./hooks/useFetchSingleGPU";
import { dateTransform } from "../../common/helperFunction/dateTransform";
import { useAuth } from "../../common/hooks/useAuth";
import MiscellaneousFilter from "./MiscellaneousFilter";

export default function MiscellaneousScreen() {
  const { screenType, pageType, id } = useParams();
  const [filterData, setFilterData] = useState({ searchKeyword: "" });

  const navigate = useNavigate();

  const { auth, setLoading } = useAuth();

  const queryClient = useQueryClient();
  const [sortingStatus, setSortingStatus] = useState({ updatedOn: 0 });
  const singleDataManufacture = useFetchSingleManufacturer(id, screenType);
  const singleDataPermissions = useFetchSinglePermissions(id, screenType);
  const singleDataThirdParty = useFetchSingleThirdParty(id, screenType);
  const singleDataPublisher = useFetchSinglePublisher(id, screenType);
  const singleDataCPU = useFetchSingleCPU(id, screenType);
  const singleDataGPU = useFetchSingleGPU(id, screenType);
  const [dialogValue, setDialogValue] = useState({
    name: "",
    permissionRequire: "",
    thirdPartyLibrary: "",
    publisher: "",
    cpuModelNo: "",
    gupModelNo: "",
    updatedBy: auth.userDetails.email,
    updatedOn: new Date(),
  });

  const [filterValues, setFilterValues] = useState({
    searchKeyword: "",
    states: [],
    cities: [],
  });

  const [page, setPage] = useState(1);
  const { data, isError, isLoading, ...manuError } = useFetchManufacturer(
    page,
    Object.keys(sortingStatus)[0],
    order(sortingStatus),
    filterData
  );
  const permissionsData = useFetchPermissions(
    page,
    Object.keys(sortingStatus)[0],
    order(sortingStatus),
    filterData
  );
  const dataThirdParty = useFetchThirdParty(
    page,
    Object.keys(sortingStatus)[0],
    order(sortingStatus),
    filterData
  );
  const dataAppPublisher = useFetchAppPublisher(
    page,
    Object.keys(sortingStatus)[0],
    order(sortingStatus),
    filterData
  );
  const dataCPU = useFetchCPU(
    page,
    Object.keys(sortingStatus)[0],
    order(sortingStatus),
    filterData
  );
  const dataGPU = useFetchGPU(
    page,
    Object.keys(sortingStatus)[0],
    order(sortingStatus),
    filterData
  );
  useEffect(() => {
    if (
      !(
        screenType === "manufacturer" ||
        screenType === "permission" ||
        screenType === "libraries" ||
        screenType === "publisher" ||
        screenType === "cpu" ||
        screenType === "gpu"
      )
    ) {
      navigate("/error-404");
    }
    if (manuError?.error?.response?.status === 404) {
      navigate("/error-404");
    }
    if (permissionsData?.error?.response?.status === 404) {
      navigate("/error-404");
    }
    if (dataThirdParty?.error?.response?.status === 404) {
      navigate("/error-404");
    }
    if (dataAppPublisher?.error?.response?.status === 404) {
      navigate("/error-404");
    }
    if (dataCPU?.error?.response?.status === 404) {
      navigate("/error-404");
    }
    if (dataGPU?.error?.response?.status === 404) {
      navigate("/error-404");
    }
  }, [
    manuError,
    permissionsData?.error,
    dataThirdParty?.error,
    dataAppPublisher?.error,
    dataCPU?.error,
    dataGPU?.error,
    screenType,
  ]);

  const onEditManufacturer = (data) => {
    queryClient.invalidateQueries([MANUFACTURE_KEY.LISTING_KEY, page]);
    navigate(`/miscellaneous/manufacturer/edit/${data.manufacturerId}`);
  };

  const onDeleteManufacturer = async (data) => {
    try {
      await deleteSingleManufacturer(data.manufacturerId);
      queryClient.invalidateQueries([MANUFACTURE_KEY.LISTING_KEY, page]);
      setPage(1);
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    }
  };
  const onEditPermissions = (data) => {
    queryClient.invalidateQueries([PERMISSIONS_KEY.LISTING_KEY, page]);
    navigate(`/miscellaneous/permission/edit/${data?.permissionRequiredId}`);
  };

  const onDeletePermissions = async (data) => {
    try {
      await deleteSinglePermissions(data.permissionRequiredId);
      setPage(1);
      queryClient.invalidateQueries([PERMISSIONS_KEY.LISTING_KEY, page]);
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    }
  };
  const onEditThirdParty = (data) => {
    queryClient.invalidateQueries([THIRD_PARTY_KEY.LISTING_KEY, page]);
    navigate(`/miscellaneous/libraries/edit/${data?.thirdPartyLibrariesId}`);
  };
  const onDeleteThirdParty = async (data) => {
    try {
      await deleteSingleThirdParty(data.thirdPartyLibrariesId);
      setPage(1);
      queryClient.invalidateQueries([THIRD_PARTY_KEY.LISTING_KEY, page]);
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    }
  };
  const onEditAppPublisher = (data) => {
    queryClient.invalidateQueries([APP_PUBLISHER_KEY.LISTING_KEY, page]);
    navigate(`/miscellaneous/publisher/edit/${data?.appPublisherId}`);
  };
  const onDeleteAppPublisher = async (data) => {
    try {
      await deleteSingleAppPublisher(data.appPublisherId);
      setPage(1);
      queryClient.invalidateQueries([APP_PUBLISHER_KEY.LISTING_KEY, page]);
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    }
  };
  const onEditCPU = (data) => {
    queryClient.invalidateQueries([CPU_KEY.LISTING_KEY, page]);
    navigate(`/miscellaneous/cpu/edit/${data?.cpuId}`);
  };
  const onDeleteCPU = async (data) => {
    try {
      await deleteSingleCPU(data.cpuId);
      setPage(1);
      queryClient.invalidateQueries([CPU_KEY.LISTING_KEY, page]);
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    }
  };
  const onEditGPU = (data) => {
    queryClient.invalidateQueries([GPU_KEY.LISTING_KEY, page]);
    navigate(`/miscellaneous/gpu/edit/${data?.gpuId}`);
  };
  const onDeleteGPU = async (data) => {
    try {
      await deleteSingleGPU(data.gpuId);
      setPage(1);
      queryClient.invalidateQueries([GPU_KEY.LISTING_KEY, page]);
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    }
  };
  const submitDataManufacturer = async () => {
    try {
      setLoading(true);
      if (pageType === PAGE_TYPE.CREATE) {
        const resp = await createManufacturer({
          ...dialogValue,
          updatedBy: auth.userDetails.email,
          updatedOn: dateTransform(dialogValue.updatedOn),
          name: dialogValue.name,
        });
        if (resp.status === 200) {
          toast.success("Created Successfully.");
        }
      } else if (pageType === PAGE_TYPE.EDIT) {
        const resp = await singleManufacturer({
          manufacturerId: id,
          updatedBy: auth.userDetails.email,
          updatedOn: dateTransform(dialogValue.updatedOn),
          name: dialogValue.name,
        });
        if (resp.status === 200) {
          toast.success("Updated Successfully.");
        }
      }
      queryClient.invalidateQueries([MANUFACTURE_KEY.LISTING_KEY, page]);
      navigate("/miscellaneous/manufacturer");
      setDialogValue({
        ...dialogValue,
        name: "",
      });
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };
  const submitDataPermissions = async () => {
    try {
      setLoading(true);
      if (pageType === PAGE_TYPE.CREATE) {
        const resp = await createPermissions({
          ...dialogValue,
          updatedBy: auth.userDetails.email,
          updatedOn: dateTransform(dialogValue.updatedOn),
          permissionRequire: dialogValue.permissionRequire,
        });
        if (resp.success === 200) {
          toast.success("Created Successfully.");
        }
      } else if (pageType === PAGE_TYPE.EDIT) {
        const resp = await singlePermissions({
          permissionRequiredId: id,
          updatedBy: auth.userDetails.email,
          updatedOn: dateTransform(dialogValue.updatedOn),
          permissionRequire: dialogValue.permissionRequire,
        });
        if (resp.status === 200) {
          toast.success("Updated Successfully.");
        }
      }
      queryClient.invalidateQueries([PERMISSIONS_KEY.LISTING_KEY, page]);
      navigate("/miscellaneous/permission");
      setDialogValue({
        ...dialogValue,
        permissionRequire: "",
      });
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };
  const submitDataThirdParty = async () => {
    try {
      setLoading(true);
      if (pageType === PAGE_TYPE.CREATE) {
        const resp = await createThirdParty({
          ...dialogValue,
          updatedBy: auth.userDetails.email,
          updatedOn: dateTransform(dialogValue.updatedOn),
          thirdPartyLibrary: dialogValue.thirdPartyLibrary,
        });
        if (resp.status === 200) {
          toast.success("Created Successfully.");
        }
      } else if (pageType === PAGE_TYPE.EDIT) {
        const resp = await singleThirdParty({
          id: id,
          updatedBy: auth.userDetails.email,
          updatedOn: dateTransform(dialogValue.updatedOn),
          thirdPartyLibrary: dialogValue.thirdPartyLibrary,
        });
        if (resp.status === 200) {
          toast.success("Updated Successfully");
        }
      }
      queryClient.invalidateQueries([THIRD_PARTY_KEY.LISTING_KEY, page]);
      navigate("/miscellaneous/libraries");
      setDialogValue({
        ...dialogValue,
        thirdPartyLibrary: "",
      });
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };
  const submitDataAppPublisher = async () => {
    try {
      setLoading(true);
      if (pageType === PAGE_TYPE.CREATE) {
        const resp = await createAppPublisher({
          ...dialogValue,
          updatedBy: auth.userDetails.email,
          updatedOn: dateTransform(dialogValue.updatedOn),
          publisher: dialogValue.publisher,
        });
        if (resp.status === 200) {
          toast.success("Created Successfully.");
        }
      } else if (pageType === PAGE_TYPE.EDIT) {
        const resp = await singleAppPublisher({
          id: id,
          updatedBy: auth.userDetails.email,
          updatedOn: dateTransform(dialogValue.updatedOn),
          publisher: dialogValue.publisher,
        });
        if (resp.status === 200) {
          toast.success("Updated Successfully.");
        }
      }
      queryClient.invalidateQueries([APP_PUBLISHER_KEY.LISTING_KEY, page]);
      navigate("/miscellaneous/publisher");
      setDialogValue({
        ...dialogValue,
        publisher: "",
      });
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };
  const submitDataCPU = async () => {
    try {
      setLoading(true);
      if (pageType === PAGE_TYPE.CREATE) {
        const resp = await createCPU({
          ...dialogValue,
          updatedBy: auth.userDetails.email,
          updatedOn: dateTransform(dialogValue.updatedOn),
          cpuModelNo: dialogValue.cpuModelNo,
        });
        if (resp.status === 200) {
          toast.success("Created Successfully.");
        }
      } else if (pageType === PAGE_TYPE.EDIT) {
        const resp = await singleCPU({
          id: id,
          updatedBy: auth.userDetails.email,
          updatedOn: dateTransform(dialogValue.updatedOn),
          cpuModelNo: dialogValue.cpuModelNo,
        });
        if (resp.status === 200) {
          toast.success("Updated Successfully.");
        }
      }
      queryClient.invalidateQueries([CPU_KEY.LISTING_KEY, page]);
      navigate("/miscellaneous/cpu");
      setDialogValue({
        ...dialogValue,
        cpuModelNo: "",
      });
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };
  const submitDataGPU = async () => {
    try {
      setLoading(true);
      if (pageType === PAGE_TYPE.CREATE) {
        const resp = await createGPU({
          ...dialogValue,
          updatedBy: auth.userDetails.email,
          updatedOn: dateTransform(dialogValue.updatedOn),
          gupModelNo: dialogValue.gupModelNo,
        });
        if (resp.status === 200) {
          toast.success("Created Successfully.");
        }
      } else if (pageType === PAGE_TYPE.EDIT) {
        const resp = await singleGPU({
          id: id,
          updatedBy: auth.userDetails.email,
          updatedOn: dateTransform(dialogValue.updatedOn),
          gupModelNo: dialogValue.gupModelNo,
        });
        if (resp.status === 200) {
          toast.success("Updated Successfully.");
        }
      }
      queryClient.invalidateQueries([GPU_KEY.LISTING_KEY, page]);
      navigate("/miscellaneous/gpu");
      setDialogValue({
        ...dialogValue,
        gupModelNo: "",
      });
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };
  const handleBoxValue = (screenType) => {
    switch (screenType) {
      case MISELLANEOUS_SCREEN_TYPE.MANUFACTURER:
        return dialogValue.name;
      case MISELLANEOUS_SCREEN_TYPE.PERMISSION:
        return dialogValue.permissionRequire;
      case MISELLANEOUS_SCREEN_TYPE.THIRD_PARTY_LIBRARY:
        return dialogValue.thirdPartyLibrary;
      case MISELLANEOUS_SCREEN_TYPE.APP_PUBLISHER:
        return dialogValue.publisher;
      case MISELLANEOUS_SCREEN_TYPE.CPU:
        return dialogValue.cpuModelNo;
      case MISELLANEOUS_SCREEN_TYPE.GPU:
        return dialogValue.gupModelNo;
      default:
        return null;
    }
  };
  const handleSubmitDialogBox = () => {
    switch (screenType) {
      case MISELLANEOUS_SCREEN_TYPE.MANUFACTURER:
        return submitDataManufacturer;
      case MISELLANEOUS_SCREEN_TYPE.PERMISSION:
        return submitDataPermissions;
      case MISELLANEOUS_SCREEN_TYPE.THIRD_PARTY_LIBRARY:
        return submitDataThirdParty;
      case MISELLANEOUS_SCREEN_TYPE.APP_PUBLISHER:
        return submitDataAppPublisher;
      case MISELLANEOUS_SCREEN_TYPE.CPU:
        return submitDataCPU;
      case MISELLANEOUS_SCREEN_TYPE.GPU:
        return submitDataGPU;
      default:
        return null;
    }
  };
  const handlePagination = () => {
    switch (screenType) {
      case MISELLANEOUS_SCREEN_TYPE.MANUFACTURER:
        return data?.data?.pageSize;
      case MISELLANEOUS_SCREEN_TYPE.PERMISSION:
        return permissionsData?.data?.data?.pageSize;
      case MISELLANEOUS_SCREEN_TYPE.THIRD_PARTY_LIBRARY:
        return dataThirdParty?.data?.data?.pageSize;
      case MISELLANEOUS_SCREEN_TYPE.APP_PUBLISHER:
        return dataAppPublisher?.data?.data?.pageSize;
      case MISELLANEOUS_SCREEN_TYPE.CPU:
        return dataCPU?.data?.data?.pageSize;
      case MISELLANEOUS_SCREEN_TYPE.GPU:
        return dataGPU?.data?.data?.pageSize;
      default:
        return null;
    }
  };
  const transCPUData = useMemo(
    () =>
      !dataCPU?.isLoading &&
      !dataCPU?.isError &&
      dataCPU?.data?.data?.cpuResponseDTOS &&
      transformCPUTableData(
        dataCPU?.data?.data?.cpuResponseDTOS,
        onEditCPU,
        onDeleteCPU
      ),
    [dataCPU?.isLoading, dataCPU?.isError, dataCPU?.data?.data?.cpuResponseDTOS]
  );
  const transGPUData = useMemo(
    () =>
      !dataGPU?.isLoading &&
      !dataGPU?.isError &&
      dataGPU?.data?.data?.gpuResponseDTOS &&
      transformGPUTableData(
        dataGPU?.data?.data?.gpuResponseDTOS,
        onEditGPU,
        onDeleteGPU
      ),
    [dataGPU?.isLoading, dataGPU?.isError, dataGPU?.data?.data?.gpuResponseDTOS]
  );
  const transPermissionData = useMemo(
    () =>
      !permissionsData?.isLoading &&
      !permissionsData?.isError &&
      permissionsData?.data?.data?.permissionRequiredDtoList &&
      transformPermissionsTableData(
        permissionsData?.data?.data?.permissionRequiredDtoList,
        onEditPermissions,
        onDeletePermissions
      ),
    [
      permissionsData?.isLoading,
      permissionsData?.isError,
      permissionsData?.data?.data?.permissionRequiredDtoList,
    ]
  );
  const transThirdPartyLibraryData = useMemo(
    () =>
      !dataThirdParty?.isLoading &&
      !dataThirdParty?.isError &&
      dataThirdParty?.data?.data?.thirdPartyLibrariesDtos &&
      transformThirdPartyTableData(
        dataThirdParty?.data?.data?.thirdPartyLibrariesDtos,
        onEditThirdParty,
        onDeleteThirdParty
      ),
    [
      dataThirdParty?.isLoading,
      dataThirdParty?.isError,
      dataThirdParty?.data?.data?.thirdPartyLibrariesDtos,
    ]
  );
  const transAppPublisherData = useMemo(
    () =>
      !dataAppPublisher?.isLoading &&
      !dataAppPublisher?.isError &&
      dataAppPublisher?.data?.data?.appPublisherDtoList &&
      transformAppPublisherTableData(
        dataAppPublisher?.data?.data?.appPublisherDtoList,
        onEditAppPublisher,
        onDeleteAppPublisher
      ),
    [
      dataAppPublisher?.isLoading,
      dataAppPublisher?.isError,
      dataAppPublisher?.data?.data?.appPublisherDtoList,
    ]
  );
  const transManufactureData = useMemo(
    () =>
      !isLoading &&
      !isError &&
      transformManufacturerTableData(
        data?.data?.manufacturerResponseDTOS,
        onEditManufacturer,
        onDeleteManufacturer
      ),
    [isLoading, isError, data?.data?.manufacturerResponseDTOS]
  );
  const handleClose = (screenType) => {
    switch (screenType) {
      case MISELLANEOUS_SCREEN_TYPE.MANUFACTURER:
        return "/miscellaneous/manufacturer";
      case MISELLANEOUS_SCREEN_TYPE.PERMISSION:
        return "/miscellaneous/permission";
      case MISELLANEOUS_SCREEN_TYPE.THIRD_PARTY_LIBRARY:
        return "/miscellaneous/libraries";
      case MISELLANEOUS_SCREEN_TYPE.APP_PUBLISHER:
        return "/miscellaneous/publisher";
      case MISELLANEOUS_SCREEN_TYPE.CPU:
        return "/miscellaneous/cpu";
      case MISELLANEOUS_SCREEN_TYPE.GPU:
        return "/miscellaneous/gpu";
      default:
        return "";
    }
  };

  const handleNavigate = (screenType) => {
    switch (screenType) {
      case MISELLANEOUS_SCREEN_TYPE.MANUFACTURER:
        return "/miscellaneous/manufacturer/create";
      case MISELLANEOUS_SCREEN_TYPE.PERMISSION:
        return "/miscellaneous/permission/create";
      case MISELLANEOUS_SCREEN_TYPE.THIRD_PARTY_LIBRARY:
        return "/miscellaneous/libraries/create";
      case MISELLANEOUS_SCREEN_TYPE.APP_PUBLISHER:
        return "/miscellaneous/publisher/create";
      case MISELLANEOUS_SCREEN_TYPE.CPU:
        return "/miscellaneous/cpu/create";
      case MISELLANEOUS_SCREEN_TYPE.GPU:
        return "/miscellaneous/gpu/create";
      default:
        return "";
    }
  };

  const getTableColumn = (screenType) => {
    switch (screenType) {
      case MISELLANEOUS_SCREEN_TYPE.MANUFACTURER:
        return MANUFACTURER_TABLE_COLUMNS;
      case MISELLANEOUS_SCREEN_TYPE.PERMISSION:
        return PERMISSION_TABLE_COLUMNS;
      case MISELLANEOUS_SCREEN_TYPE.THIRD_PARTY_LIBRARY:
        return THIRD_PARTY_TABLE_COLUMNS;
      case MISELLANEOUS_SCREEN_TYPE.APP_PUBLISHER:
        return APP_PUBLISHER_TABLE_COLUMNS;
      case MISELLANEOUS_SCREEN_TYPE.CPU:
        return CPU_TABLE_COLUMNS;
      case MISELLANEOUS_SCREEN_TYPE.GPU:
        return GPU_TABLE_COLUMNS;
      default:
        return [];
    }
  };

  const getTableData = (screenType) => {
    switch (screenType) {
      case MISELLANEOUS_SCREEN_TYPE.MANUFACTURER:
        return transManufactureData;
      case MISELLANEOUS_SCREEN_TYPE.PERMISSION:
        return transPermissionData;
      case MISELLANEOUS_SCREEN_TYPE.THIRD_PARTY_LIBRARY:
        return transThirdPartyLibraryData;
      case MISELLANEOUS_SCREEN_TYPE.APP_PUBLISHER:
        return transAppPublisherData;
      case MISELLANEOUS_SCREEN_TYPE.CPU:
        return transCPUData;
      case MISELLANEOUS_SCREEN_TYPE.GPU:
        return transGPUData;
      default:
        return [];
    }
  };
  useEffect(() => {
    if (pageType === PAGE_TYPE.EDIT) {
      switch (screenType) {
        case MISELLANEOUS_SCREEN_TYPE.MANUFACTURER:
          return setDialogValue({
            ...dialogValue,
            name: singleDataManufacture?.data?.data?.name,
          });
        case MISELLANEOUS_SCREEN_TYPE.PERMISSION:
          return setDialogValue({
            ...dialogValue,
            permissionRequire:
              singleDataPermissions?.data?.data?.permissionRequire,
          });
        case MISELLANEOUS_SCREEN_TYPE.THIRD_PARTY_LIBRARY:
          return setDialogValue({
            ...dialogValue,
            thirdPartyLibrary:
              singleDataThirdParty?.data?.data?.thirdPartyLibrary,
          });
        case MISELLANEOUS_SCREEN_TYPE.APP_PUBLISHER:
          return setDialogValue({
            ...dialogValue,
            publisher: singleDataPublisher?.data?.data?.publisher,
          });

        case MISELLANEOUS_SCREEN_TYPE.CPU:
          return setDialogValue({
            ...dialogValue,
            cpuModelNo: singleDataCPU?.data?.data?.cpuModelNo,
          });
        case MISELLANEOUS_SCREEN_TYPE.GPU:
          return setDialogValue({
            ...dialogValue,
            gupModelNo: singleDataGPU?.data?.data?.gupModelNo,
          });
        default:
          return [];
      }
    }
  }, [
    screenType,
    singleDataManufacture?.data?.data,
    singleDataPermissions?.data?.data,
    singleDataThirdParty?.data?.data,
    singleDataPublisher?.data?.data,
    singleDataCPU?.data?.data,
    singleDataGPU?.data?.data,
  ]);

  const handleFilter = (value, key) => {
    setPage(1);
    if (key === "searchKeyword") {
      setFilterData({
        ...filterData,
        searchKeyword: value,
      });
      return;
    }
    if (value.length > 0)
      return setFilterData({
        ...filterData,
        [key]: value.map((item) => item.id),
      });
    const { [key]: keyData, ...data } = filterData;
    setFilterData(data);
  };

  return (
    <>
      <div className="miscellaneous-cantainer">
        <ListingHeader
          title="Miscellaneous"
          iconButtonTitle={`Add ${getTableColumn(
            screenType
          )[0]?.header?.replace("Name", "")}`}
          pathToNavigate={handleNavigate(screenType)}
          permissionTitle="miscellaneous"
        />
        <div className="issue-action-tabs">
          <div className={`issue-tab ${screenType}`}>
            <div className={`tabs-button`}>
              <button
                className={screenType === "manufacturer" ? "active" : ""}
                onClick={() => {
                  setPage(1);
                  setFilterValues({
                    searchKeyword: ""
                  });
                  setFilterData({ searchKeyword: "" })
                  navigate("/miscellaneous/manufacturer");
                }}
              >
                Manufacturer
              </button>
            </div>
            <div className={`tabs-button`}>
              <button
                className={screenType === "permission" ? "active" : ""}
                onClick={() => {
                  setPage(1);
                  setFilterValues({
                    searchKeyword: ""
                  });
                  setFilterData({ searchKeyword: "" })
                  navigate("/miscellaneous/permission");
                }}
              >
                Permissions
              </button>
            </div>
            <div className={`tabs-button`}>
              <button
                className={screenType === "libraries" ? "active" : ""}
                onClick={() => {
                  setPage(1);
                  setFilterValues({
                    searchKeyword: ""
                  });
                  setFilterData({ searchKeyword: "" })
                  navigate("/miscellaneous/libraries");
                }}
              >
                Third Party Library
              </button>
            </div>
            <div className={`tabs-button`}>
              <button
                className={screenType === "publisher" ? "active" : ""}
                onClick={() => {
                  setPage(1);
                  setFilterValues({
                    searchKeyword: ""
                  });
                  setFilterData({ searchKeyword: "" })
                  navigate("/miscellaneous/publisher");
                }}
              >
                App Publisher
              </button>
            </div>
            <div className={`tabs-button`}>
              <button
                className={screenType === "cpu" ? "active" : ""}
                onClick={() => {
                  setPage(1);
                  setFilterValues({
                    searchKeyword: ""
                  });
                  setFilterData({ searchKeyword: "" })
                  navigate("/miscellaneous/cpu");
                }}
              >
                CPU
              </button>
            </div>
            <div className={`tabs-button`}>
              <button
                className={screenType === "gpu" ? "active" : ""}
                onClick={() => {
                  setPage(1);
                  setFilterValues({
                    searchKeyword: ""
                  });
                  setFilterData({ searchKeyword: "" })
                  navigate("/miscellaneous/gpu");
                }}
              >
                GPU
              </button>
            </div>
          </div>
          <hr className="tab-line"></hr>
          <MiscellaneousFilter
            filterValues={filterValues}
            setFilterValues={setFilterValues}
            filterHandler={handleFilter}
          />
        </div>
        <div className="listing-table">
          <Table
            tableColumns={getTableColumn(screenType)}
            paginationCount={handlePagination()}
            handlePaginationValue={setPage}
            currentPage={page}
            rowCount={10}
            sortingStatus={sortingStatus}
            setSortingStatus={setSortingStatus}
            tableData={getTableData(screenType)}
          />
        </div>
        <DialogBox
          open={pageType === PAGE_TYPE.CREATE || pageType === PAGE_TYPE.EDIT}
          handleClose={handleClose(screenType)}
          DialogBoxTitle={`New ${getTableColumn(screenType)[0]?.header.replace(
            "Name",
            ""
          )}`}
          InputFeildTitle={`${getTableColumn(screenType)[0]?.header}`}
          handleSubmitDialogBox={handleSubmitDialogBox()}
          placeholder={`Enter ${getTableColumn(screenType)[0]?.header.replace(
            "Name",
            ""
          )}`}
          setDialogBoxValue={setDialogValue}
          DialogBoxValue={handleBoxValue(screenType)}
          name={getTableColumn(screenType)[0]?.key}
        />
      </div>
    </>
  );
}
