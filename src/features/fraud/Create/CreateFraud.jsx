import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommonHeader from "../../../common/components/CommonHeader/CommonHeader";
import { GLOBAL_STATUS, PAGE_TYPE } from "../../../common/global.constant";
import "./CreateFraud.scss";
import {
  createSingleFraud,
  updateSingleFraud,
} from "../Services/fraudServices";
import { toast } from "react-hot-toast";
import { useFetchFraudData } from "../hooks/useFetchFraudData";
import { useAuth } from "../../../common/hooks/useAuth";
import { dateTransform } from "../../../common/helperFunction/dateTransform";
import { isDataValidFraud } from "../fraud.helper";
import CreateFraudForm from "./CreateFraudForm";

const CreateFraud = () => {
  const navigate = useNavigate();
  const { id, pageType } = useParams();
  const { auth, error, setError, loading, setLoading } = useAuth();

  const getFraudData = useFetchFraudData(id);

  const [fraud, setFraud] = useState({
    title: "",
    introduction: "",
    key: {},
    sourceTicketId: "",
    fraudSteps: [],
    status: GLOBAL_STATUS.APPROVED,
    assignee: `${auth.userDetails.email.toLowerCase()}`,
  });
  const [step, setStep] = useState({});
  const [editable, isEditable] = useState(false);

  useEffect(() => {
    setError({
      title: [],
      message: [],
    });
    if (!editable) {
      const fraudData = getFraudData?.data?.data;
      if (!fraudData?.fraudId || pageType === "create") return;

      setFraud((prev) => ({
        ...prev,
        ...fraudData,
        title: fraudData.title,
        introduction: fraudData.introduction,
        key: fraudData.key,
      }));
      setStep({});
    }
  }, [getFraudData?.data?.data, fraud?.fraudId, id]);

  const handleCancel = () => {
    navigate("/inventory/fraud");
  };

  const handleSave = async () => {
    try {
      if (isDataValidFraud(fraud, error, setError)) {
        return;
      }
      setLoading(true);
      const body = {
        ...fraud,
        sourceTicketId: fraud.sourceTicketId,
        updatedOn: dateTransform(new Date()),
        assignee: `${auth.userDetails.email.toLowerCase()}`,
        updatedBy: `${auth.userDetails.email.toLowerCase()}`,
        status: GLOBAL_STATUS.APPROVED,
        ...(pageType === PAGE_TYPE.CREATE
          ? {
              fraudSteps: fraud.fraudSteps.map((item, index) => ({
                sequence: index + 1,
                description: item,
              })),
            }
          : {
              fraudSteps: fraud.fraudSteps.map((item, index) => ({
                sequence: index + 1,
                description: item.description ? item.description : item,
                ...(item.stepId ? { stepId: item.stepId } : {}),
              })),
            }),
      };
      if (pageType === PAGE_TYPE.CREATE) {
        await createSingleFraud({
          ...body,
        });
        toast.success("Successfully Created");
      } else if (pageType === PAGE_TYPE.EDIT) {
        await updateSingleFraud({
          bestPracticeId: id,
          ...body,
        });
        toast.success("Successfully Updated");
      }
      navigate("/inventory/fraud");
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (index) => {
    let fraudSteps = fraud.fraudSteps;
    fraudSteps.splice(index, 1);
    setFraud({
      ...fraud,
      fraudSteps: fraudSteps,
    });
  };
  const handleAdd = () => {
    if (!step.length || step === "<p><br></p>")
      return toast.error("Empty step cannot be added");
    setError({
      title: [],
      message: [],
    });
    setFraud({
      ...fraud,
      fraudSteps: [...fraud.fraudSteps, step],
    });
    setStep({});
  };

  const handleIndividualSteps = (content, index) => {
    const { fraudSteps } = fraud;

    const updatedFraudSteps = [...fraudSteps];

    updatedFraudSteps[index] = content;

    // Update the fraud state with the new fraudSteps array
    setFraud({
      ...fraud,
      fraudSteps: updatedFraudSteps,
    });

    // Reset error state
    setError({
      title: [],
      message: [],
    });
  };

  return (
    <div className="fraud-edit-block">
      <CommonHeader
        backArrow="/inventory/fraud"
        label="Fraud"
        ticketInput={fraud}
        handleTicketValue={setFraud}
        {...((pageType === PAGE_TYPE.CREATE || pageType === PAGE_TYPE.EDIT) && {
          handleSave: handleSave,
        })}
        {...(pageType === PAGE_TYPE.VIEW && {
          handleEdit: () => navigate("/inventory/fraud/edit/" + id),
        })}
        handleCancel={handleCancel}
      />
      <CreateFraudForm
        handleIndividualSteps={handleIndividualSteps}
        handleAdd={handleAdd}
        fraud={fraud}
        setFraud={setFraud}
        step={step}
        setStep={setStep}
        handleRemove={handleRemove}
        isEditable={isEditable}
      />
    </div>
  );
};

export default CreateFraud;
