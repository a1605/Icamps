import { useState } from "react";
import { GLOBAL_STATUS, PAGE_TYPE } from "../../../common/global.constant";
import { dateTransform } from "../../../common/helperFunction/dateTransform";
import { useAuth } from "../../../common/hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import CommonHeader from "../../../common/components/CommonHeader/CommonHeader";
import CyberCellForm from "./CyberCellForm";
import {
  createSingleCyberCell,
  updateSingleCyberCell,
} from "../services/cyber-cell-service";
import { toast } from "react-hot-toast";
import { isDataValidCyber } from "../cyber-cell-helper";
function CreateCyberCell() {
  const { auth, error, setError, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const { id, pageType } = useParams();

  const [cyberCell, setCyberCell] = useState({
    regionalOffice: "",
    addressline1: "",
    addressline2: "",
    city: "",
    office: "",
    state: "",
    pincode: "",
    personName: "",
    designation: "",
    email: "",
    mobile: "",
    telephone: "",
    fax: "",
    status: GLOBAL_STATUS.APPROVED,
    updatedOn: dateTransform(new Date()),
    //assignee: `${auth.userDetails.email}`,
    updatedBy: `${auth.userDetails.email}`,
  });
  const handleCancel = () => {
    navigate(`/inventory/cyber-security`);
  };
  const handleSave = async () => {
    if (isDataValidCyber(cyberCell, error, setError)) return;

    try {
      setLoading(true);
      const body = {
        ...cyberCell,
      };

      if (pageType === "create")
        await createSingleCyberCell({
          ...body,
        });
      else if (pageType === "edit")
        await updateSingleCyberCell({
          cyberCellId: id,
          ...body,
          status: GLOBAL_STATUS.APPROVED,
        });
      navigate("/inventory/cyber-security");
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <CommonHeader
        backArrow="/inventory/cyber-security"
        label="Cyber Security"
        ticketInput={cyberCell}
        handleTicketValue={setCyberCell}
        handleCancel={handleCancel}
        {...((pageType === PAGE_TYPE.CREATE || pageType === PAGE_TYPE.EDIT) && {
          handleSave: handleSave,
        })}
        {...(pageType === PAGE_TYPE.VIEW && {
          handleEdit: () => navigate(`/inventory/cyber-security/edit/${id}`),
        })}
      />
      <CyberCellForm cyberCell={cyberCell} setCyberCell={setCyberCell} />
    </>
  );
}

export default CreateCyberCell;
