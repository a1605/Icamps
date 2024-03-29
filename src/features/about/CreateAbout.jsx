import { toast } from "react-hot-toast";
import CommonHeader from "../../common/components/CommonHeader/CommonHeader";
import {  updateSingleAbout } from "./service/about-service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../common/hooks/useAuth";
import "./CreateAbout.scss";
import { useRef } from "react";
import { uploadAboutFile, uploadImage } from "../../services/imageUpload";
import { useFetchSingleAbout } from "./hook/useFetchSingleAbout";
import CircularLoader from "../../common/components/CircularLoader/CircularLoader";
import CreateAboutForm from "./CreateAboutForm";
import {
  accessToUpdateAndCreate,
} from "../../common/global.validation";

function CreateAbout() {
  const { auth, setError, loading, setLoading } = useAuth();
  const { isError, isLoading, data } = useFetchSingleAbout(1);

  useEffect(() => {
    setError({
      title: [],
      message: [],
    });

    setAbout({
      ...data?.data,
    });
  }, [isError, isLoading, data?.data]);

  const [about, setAbout] = useState({
    title: "",
    description: "",
    headerImage: "",
    brandLogo: "",
    termsAndCondition: "",
    privacyStatement: "",
  });
  const navigate = useNavigate();

  const fileUploadHandle = (file, tag) => {
    if (file.type === "image/jpeg" || file.type === "image/png") {
      if (tag === "head_image")
        if (file.size <= 563200) {
          setAbout({
            ...about,
            headerImage: file,
          });
        } else {
          toast.error("File size should not be greater than 550kb ");
        }
      else if (tag === "brand_logo") {
        if (file.size <= 563200) {
          setAbout({
            ...about,
            brandLogo: file,
          });
        } else {
          toast.error("File size should not be greater than 550kb");
        }
      }
    } else {
      toast.error("File type should be png or jpg");
    }
  };

  const pdfFileUploadHandle = (file, tag) => {
    if (file.type === "application/pdf") {
      if (tag === "t&c") {
        if (file.name !== "Terms_Condition.pdf")
          return toast.error(
            "Required file name should be Terms_Condition.pdf"
          );
        if (file.size <= 563200) {
          setAbout({
            ...about,
            termsAndCondition: file,
          });
        } else {
          toast.error("File size should not be greater than 5550kb ");
        }
      } else if (tag === "privacy") {
        if (file.name !== "Privacy_Statement.pdf")
          return toast.error(
            "Required file name should be Privacy_Statement.pdf"
          );
        if (file.size <= 563200) {
          setAbout({
            ...about,
            privacyStatement: file,
          });
        } else {
          toast.error("File size should not be greater than 550kb");
        }
      }
    } else {
      toast.error("File type should be pdf");
    }
  };

  const handleFileUpload = async (data, type) => {
    try {
      const formData = new FormData();

      formData.append("file", data);
      let resp = "";
      if (type === "image") {
        resp = await uploadImage(formData);
      }
      if (type === "file") {
        resp = await uploadAboutFile(formData);
      }

      return resp;
    } catch (error) {
      toast.error("Error while uploading image");
      return false;
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      let body = {
        ...about,
      };
      if (about.headerImage && typeof about.headerImage === "object") {
        const resp = await handleFileUpload(about.headerImage, "image");
        if (resp?.data) {
          body = {
            ...body,
            headerImage: resp?.data,
          };
        } else return;
      }
      if (about.brandLogo && typeof about.brandLogo === "object") {
        const resp = await handleFileUpload(about.brandLogo, "image");
        if (resp?.data) {
          body = {
            ...body,
            brandLogo: resp?.data,
          };
        } else return;
      }
      if (
        about.termsAndCondition &&
        typeof about.termsAndCondition === "object"
      ) {
        const resp = await handleFileUpload(about.termsAndCondition, "file");
        if (resp?.data) {
          body = {
            ...body,
            termsAndCondition: resp?.data,
          };
        } else return;
      }
      if (
        about.privacyStatement &&
        typeof about.privacyStatement === "object"
      ) {
        const resp = await handleFileUpload(about.privacyStatement, "file");
        if (resp?.data) {
          body = {
            ...body,
            privacyStatement: resp?.data,
          };
        } else return;
      }
      await updateSingleAbout({
        id: 1,
        ...body,
      });
      toast.success("Information saved");
      navigate("/dashboard");
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <>
      <CommonHeader
        backArrow="/about-us"
        label="About Us"
        handleSave={accessToUpdateAndCreate("about icamps", auth) ? handleSave : null}
     
      />
      {loading ? (
        <CircularLoader />
      ) : (
        <CreateAboutForm
          about={about}
          setAbout={setAbout}
          fileUploadHandle={fileUploadHandle}
          pdfFileUploadHandle={pdfFileUploadHandle}
        />
      )}
    </>
  );
}

export default CreateAbout;
