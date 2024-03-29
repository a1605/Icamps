import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../common/hooks/useAuth";
import { useState } from "react";
import { createSingleNetwork, updateSingleNetwork } from "../network-service";
import CommonHeader from "../../../common/components/CommonHeader/CommonHeader";
import CreateNetworkForm from "./CreateNetworkForm";
import { GLOBAL_STATUS, PAGE_TYPE } from "../../../common/global.constant";
import { dateTransform } from "../../../common/helperFunction/dateTransform";
import { toast } from "react-hot-toast";
import { isDataValidNetwork } from "../network-helper";

function CreateNetwork() {
  const { auth, error, setError, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const { id, screenType, pageType } = useParams();

  const [network, setNetwork] = useState({
    manufacturer: "",
    brand: "",
    model: "",
    os: "",
    modelNo: "",
    hardwareVersion: "",
    firmwareVersion: "",
    homePage: "",
    defaultUser: "",
    defaultPassword: "",
    //assignee: `${auth.userDetails.email}`,
    updatedBy: `${auth.userDetails.email}`,
    updatedOn: new Date(),
    status: GLOBAL_STATUS.APPROVED,
  });
  const handleCancel = () => {
    navigate(`/inventory/network`);
  };
  const handleSave = async () => {
    if (isDataValidNetwork(network, setError)) return;
    try {
      setLoading(true);
      const body = {
        ...network,
        updatedBy: auth.userDetails.email,
        updatedOn: dateTransform(new Date()),
      };
      if (pageType === "create")
        await createSingleNetwork({
          ...body,
          status: GLOBAL_STATUS.APPROVED,
        });
      else if (pageType === "edit")
        await updateSingleNetwork({
          ...body,
          networkId: id,
          status: GLOBAL_STATUS.APPROVED,
        });
      navigate("/inventory/network");
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <CommonHeader
        backArrow="/inventory/network"
        label="Network"
        ticketInput={network}
        handleTicketValue={setNetwork}
        handleCancel={handleCancel}
        {...((pageType === PAGE_TYPE.CREATE || pageType === PAGE_TYPE.EDIT) && {
          handleSave: handleSave,
        })}
        {...(pageType === PAGE_TYPE.VIEW && {
          handleEdit: () => navigate(`/inventory/network/edit/${id}`),
        })}
      />
      <CreateNetworkForm network={network} setNetwork={setNetwork} />
    </>
  );
}

export default CreateNetwork;
