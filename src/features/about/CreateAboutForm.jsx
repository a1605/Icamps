import InputBox from "../../common/components/InputBox/InputBox";
import TextArea from "../../common/components/Textarea/TextArea";
import { styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import Button from "@mui/material/Button";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import "./CreateAbout.scss";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useRef, useState } from "react";
import ImageViewer from "./ImageViewer";
import { useAuth } from "../../common/hooks/useAuth";

import { accessToUpdateAndCreate } from "../../common/global.validation";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blue[50]),
  backgroundColor: blue[50],
  textTransform: "none",
  "&:hover": {
    backgroundColor: blue[200],
  },
}));

function CreateAboutForm({
  about,
  setAbout,
  fileUploadHandle,
  pdfFileUploadHandle,
}) {
  const { auth } = useAuth();

  const fileRef = useRef();
  const iconFileRef = useRef();
  const { setError } = useAuth();
  const [open, setOpen] = useState({
    imgSrc: "",
    isOpen: false,
  });

  const changeHandler = (e) => {
    setError({
      title: [],
      message: [],
    });

    setAbout((prevAbout) => ({
      ...prevAbout,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageClick = (imgSrc) => {
    if (typeof imgSrc === "string")
      setOpen({
        imgSrc: imgSrc,
        isOpen: true,
      });
  };

  return (
    <div className="about-container">
      <div className="about-input">
        <label className="about-label">Title</label>
        <InputBox
          type="text"
          name="title"
          value={about.title}
          placeholder="Enter Title"
          onChange={changeHandler}
          title="regionalOffice"
        />
      </div>
      <div className="about-input">
        <label className="about-label">Description</label>
        <TextArea
          name="description"
          id="description"
          cols="10"
          value={about.description}
          placeholder=" Description"
          onChange={changeHandler}
          draggable={false}
          title={"description"}
        />
      </div>
      <div className="about-input">
        <div className="file-input">
          <div className="upload-Button">
            <label className="about-label">Upload Header image</label>
            <div className="image-upload-container">
              {accessToUpdateAndCreate("about icamps", auth) && (
                <ColorButton
                  variant="outlined"
                  component="label"
                  size="medium"
                  startIcon={<FileUploadOutlinedIcon />}
                >
                  Upload Header image
                  <input
                    type="file"
                    multiple="multiple"
                    onChange={(e) =>
                      fileUploadHandle(e.target.files[0], "head_image")
                    }
                    hidden
                    ref={fileRef}
                  />
                </ColorButton>
              )}
              {about.headerImage ? (
                <div className="image-preview">
                  <img
                    onClick={() => handleImageClick(about.headerImage)}
                    className="image-wrapper"
                    src={
                      typeof about.headerImage === "string"
                        ? about.headerImage
                        : URL.createObjectURL(about.headerImage)
                    }
                  ></img>
                </div>
              ) : null}
            </div>
          </div>
          <div className="upload-Button">
            <label className="about-label">Upload Brand logo</label>
            <div className="image-upload-container">
              {accessToUpdateAndCreate("about icamps", auth) && (
                <ColorButton
                  variant="outlined"
                  component="label"
                  size="medium"
                  startIcon={<FileUploadOutlinedIcon />}
                >
                  Upload Brand logo
                  <input
                    type="file"
                    multiple="multiple"
                    onChange={(e) =>
                      fileUploadHandle(e.target.files[0], "brand_logo")
                    }
                    hidden
                    ref={iconFileRef}
                  />
                </ColorButton>
              )}
              {about.brandLogo ? (
                <div className="image-preview">
                  <img
                    className="image-wrapper"
                    onClick={() => handleImageClick(about.brandLogo)}
                    src={
                      typeof about.brandLogo === "string"
                        ? about.brandLogo
                        : URL.createObjectURL(about.brandLogo)
                    }
                  ></img>
                </div>
              ) : null}
            </div>
          </div>

          <div className="upload-Button">
            <label className="about-label">Upload Terms & Condition</label>
            <div className="image-upload-container">
              {accessToUpdateAndCreate("about icamps", auth) && (
                <ColorButton
                  variant="outlined"
                  component="label"
                  size="medium"
                  startIcon={<FileUploadOutlinedIcon />}
                >
                  Upload T&C
                  <input
                    type="file"
                    multiple="multiple"
                    onChange={(e) =>
                      pdfFileUploadHandle(e.target.files[0], "t&c")
                    }
                    hidden
                    ref={iconFileRef}
                  />
                </ColorButton>
              )}
              {about.termsAndCondition ? (
                <div
                  className={
                    typeof about.termsAndCondition === "string"
                      ? "image-preview"
                      : ""
                  }
                >
                  <div
                    className="pdfContainer"
                    onClick={() => {
                      if (typeof about.termsAndCondition === "string")
                        window.open(about.termsAndCondition, "_blank");
                    }}
                  >
                    <PictureAsPdfIcon
                      className="image-wrapper"
                      style={{ color: "red", fontSize: "3rem" }}
                    />
                    <p>Terms & Conditions</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="upload-Button">
            <label className="about-label">Upload Privacy Statement</label>
            <div className="image-upload-container">
              {accessToUpdateAndCreate("about icamps", auth) && (
                <ColorButton
                  variant="outlined"
                  component="label"
                  size="medium"
                  startIcon={<FileUploadOutlinedIcon />}
                >
                  Upload Privacy
                  <input
                    type="file"
                    multiple="multiple"
                    onChange={(e) =>
                      pdfFileUploadHandle(e.target.files[0], "privacy")
                    }
                    hidden
                    ref={iconFileRef}
                  />
                </ColorButton>
              )}
              {about.privacyStatement ? (
                <div className="image-preview">
                  <div
                    className="pdfContainer"
                    onClick={() => {
                      if (typeof about.privacyStatement === "string")
                        window.open(about.privacyStatement, "_blank");
                    }}
                  >
                    <PictureAsPdfIcon
                      className="image-wrapper"
                      style={{ color: "red", fontSize: "3rem" }}
                    />
                    <p>Privacy Statement</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {open.isOpen ? <ImageViewer open={open} setOpen={setOpen} /> : ""}
    </div>
  );
}
export default CreateAboutForm;
