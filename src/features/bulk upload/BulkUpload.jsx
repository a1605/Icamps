import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import * as XLSX from "xlsx";

// Component
import BulkUploadListingHeader from "./component/BulkUploadListingHeader";
import { useAuth } from "../../common/hooks/useAuth";

// Image
import { downloadIcon, uploadFileImg } from "../../assets/images";

// Services
import { uploadFile } from "../../services/imageUpload";

// Helper
import {
  apiURL,
  cancelHelper,
  checkColums,
  fileName,
  handleDownload,
  saveAsExcelFile,
} from "./bulkUpload.helper";

// CSS
import "./BulkUpload.scss";
import CircularLoader from "../../common/components/CircularLoader/CircularLoader";
import { toast } from "react-hot-toast";
import { dateTransform } from "../../common/helperFunction/dateTransform";
import {
  AssigneeStatus,
  BULK_UPLOAD_MAPPING,
  PERMISSION_MAPPING,
} from "../../common/global.constant";

const 
BulkUpload = () => {
  const { type } = useParams();

  const navigate = useNavigate();

  const { error, setError, auth } = useAuth();

  const url = useMemo(() => apiURL(type), [type]);

  const cancel = useMemo(() => cancelHelper(type), [type]);

  const columnCheck = useMemo(() => checkColums(type), [type]);

  const nameFile = useMemo(() => fileName(type), [type]);

  const [assigneeData, setAssigneeData] = useState({
    assignee: "",
    permissionData: {
      permissionName: [PERMISSION_MAPPING.APPROVER],
      permissionTitle: [BULK_UPLOAD_MAPPING[type]],
      status: AssigneeStatus.ACTIVE,
    },
  });
  const [file, setFile] = useState({
    file: null,
    status: "",
    sourceTicketId: "",
    count: null,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError({
      title: [],
      message: [],
    });
  }, []);

  const handlefile = async (singleFile) => {
    // Reading XLSX file
    const resp = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      let flag = true;
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        if (jsonData.length - 1 !== parseInt(file.count)) {
          setError({
            title: ["file-drop-error"],
            message: [
              {
                title: "file-drop-error",
                message: "Row count is not same as given.",
              },
            ],
          });

          flag = false;
        }
        const temp = columnCheck(jsonData[0]);
        if (temp) {
          setError({
            title: ["file-drop-error"],
            message: [
              {
                title: "file-drop-error",
                message: "Column name should be in sync with sample file.",
              },
            ],
          });

          flag = false;
        }
        resolve(flag);
      };
      reader.readAsArrayBuffer(singleFile);
    });
    return resp;
  };

  const handleCreateExcel = (jsonData) => {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    saveAsExcelFile(excelBuffer, "Upload_Error.xlsx");
  };

  /**
   * The `submitHandler` function is responsible for handling the submission of a form, validating the
   * form inputs, and uploading a file to a server.
   * @returns The function `submitHandler` does not have a return statement, so it does not explicitly
   * return anything.
   */
  const submitHandler = async () => {
    try {
      let title = [];
      let message = [];
      /* The code snippet is creating a new instance of the `FormData` object, which is used to
     construct a set of key/value pairs representing form fields and their values. */
      const formData = new FormData();

      if (file.status === "") {
        title.push("statusBulkDropDown");
        message.push({
          title: "statusBulkDropDown",
          message: "Please select status",
        });
      }
      if (file.sourceTicketId === "") {
        title.push("bulkSource");
        message.push({
          title: "bulkSource",
          message: "Please enter source ticket id",
        });
      }
      if (file.count <= 0) {
        title.push("bulkrowcount");
        message.push({
          title: "bulkrowcount",
          message: "Please enter row count",
        });
      }

      var regExp = new RegExp("^\\d+$");
      var isValid = regExp.test(file.count);

      if (!isValid) {
        title.push("bulkrowcount");
        message.push({
          title: "bulkrowcount",
          message: "In-valid Count",
        });
      }

      if (!file.file) {
        title.push("file-drop-error");
        message.push({
          title: "file-drop-error",
          message: "Please select a file",
        });
      }
      setError({
        title: title,
        message: message,
      });
      if (title.length > 0 || !(await handlefile(file.file))) return;
      setLoading(true);
      formData.append("file", file.file);
      formData.append("status", file.status);
      formData.append("sourceTicketId", file.sourceTicketId);
      formData.append("updatedBy", auth.userDetails.email);
      formData.append("updatedon", dateTransform(new Date()));

      if (file.status === "IN_APPROVAL") {
        formData.append("assignee", assigneeData.assignee);
        formData.append("requestedBy", auth.userDetails.email);
        formData.append("requestedOn", dateTransform(new Date()));
      } else {
        formData.append("assignee", auth.userDetails.email);
      }

      const resp = await uploadFile(url, formData);

      if (resp?.data) {
        const data = resp?.data;
        if (data.length === 0) {
          toast.success("File uploaded successfully");
          navigate(cancel);
        } else if (data.length > 0) {
          setFile({
            ...file,
            file:null
          })
          toast.error("Bulk upload Error");
          handleCreateExcel(data);
        } else if (data.errorMessage) {
          toast.error(data.errorMessage);
        }
      }
      setLoading(false);
    } catch (error) {
    
      toast.error(JSON.parse(error.request.response).message);
      setLoading(false);
    }
  };

  /**
   * The handleChange function checks if the dataFile is a valid .xlsx file and within the size limit,
   * and sets the file state accordingly.
   * @returns The function does not explicitly return anything.
   */
  const handleChange = (dataFile) => {
    setError({
      title: [],
      message: [],
    });
    if (
      dataFile.type !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setError({
        title: ["file-drop-error"],
        message: [
          { title: "file-drop-error", message: "File type should be .xlsx" },
        ],
      });
      return;
    }
    if (dataFile.size > 1048576) {
      setError({
        title: ["file-drop-error"],
        message: [
          {
            title: "file-drop-error",
            message: "File size cannot be greater than 2mb",
          },
        ],
      });
      return;
    }
    setFile({
      ...file,
      file: dataFile,
    });
  };

  const renderChilren = () => (
    <div
      className={`drag-zone ${
        error.title.includes("file-drop-error") ? "error-block" : ""
      }`}
    >
      <div className="image-sec">
        <img src={uploadFileImg} alt="file-upload" />
      </div>
      {file.file ? (
        <p>{file.file.name}</p>
      ) : (
        <p>
          Drage & drop here to upload or <strong>click to select</strong>
        </p>
      )}
    </div>
  );
  const handleHeaderName = () => {
    switch (type) {
      case "devices":
        return "Bulk Upload - Devices";
      case "os":
        return "Bulk Upload - OS";
      case "apps":
        return "Bulk Upload - APP";
      case "network":
        return "Bulk Upload - Network";
      case "blacklistedNumber":
        return "Bulk Upload - Blacklisted Numbers";
      case "cyber-security":
        return "Bulk Upload - Cyber Security";
    }
  };
  const handleStatus = (value, key) => {
    setError({
      title: [],
      message: [],
    });
    setFile({
      ...file,
      [key]: key === "status" ? value.id : value,
    });
  };

  return (
    <div>
      <BulkUploadListingHeader
        title={handleHeaderName()}
        bulkUploadTitle={"Cancel"}
        bulkNavigate={cancel}
        permissionTitle="devices"
        handleSubmit={submitHandler}
        disabled={file.file === null || loading || file.count <= 0}
        filterHandler={handleStatus}
        filterData={file}
        screenType={type}
        assigneeData={assigneeData}
        setAssigneeData={setAssigneeData}
      />
      {!loading ? (
        <div className="bulk-upload-section">
          <div className="sample-file-section">
            <p>
              Download sample file for bulk upload
              <button
                className="download-button"
                onClick={() => handleDownload(nameFile)}
              >
                {nameFile}
                <img src={downloadIcon} alt="download-icon" />
              </button>
            </p>
          </div>
          <div className="bulk-upload">
            <FileUploader
              handleChange={handleChange}
              name="file"
              children={renderChilren()}
            />
            {error.title.includes("file-drop-error") && (
              <p className="error-block">
                {
                  error.message.find((item) => item.title === "file-drop-error")
                    .message
                }
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="progress">
          <CircularLoader />
        </div>
      )}
    </div>
  );
};

export default BulkUpload;
