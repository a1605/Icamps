import React, { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import Box from "@mui/material/Box";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import "./CreateEditBlocks.scss";
import { toast } from "react-hot-toast";

import InputBox from "../../../../common/components/InputBox/InputBox";
import ErrorBox from "../../../../common/components/Error/ErroBox";
import { useAuth } from "../../../../common/hooks/useAuth";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blue[50]),
  backgroundColor: blue[50],
  textTransform: "none",
  "&:hover": {
    backgroundColor: blue[200],
  },
}));

const CreateEditBlocks = ({ createNews, setcreateNews }) => {
  const fileRef = useRef();
  const iconFileRef = useRef();

  const { error, setError } = useAuth();

  const fileUploadHandle = (file, tag) => {
    const isValidImageType =
      file.type === "image/jpeg" || file.type === "image/png";

    if (!isValidImageType) {
      toast.error("File type can only be png or jpg");
      return;
    }

    const maxSize = tag === "head_image" ? 563200 : 153600;
    const requiredWidth = tag === "head_image" ? 512 : 64;
    const requiredHeight = tag === "head_image" ? 512 : 64;

    if (file.size > maxSize) {
      toast.error(`File size cannot be greater than ${maxSize / 1024} KB`);
      return;
    }

    // file exists
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        if (img.width > requiredWidth || img.height > requiredHeight) {
          toast.error(`File should be ${requiredWidth}x${requiredHeight}`);
        } else {
          const updatedNews =
            tag === "head_image"
              ? { ...createNews, imagePath: file }
              : { ...createNews, imageIconPath: file };

          setcreateNews(updatedNews);
        }
      };
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="input-area-container">
        <Box sx={{ width: "100%", boxShadow: "none", height: "100%" }}>
          <div className="main-title-Label">
            <label>Title*</label>
          </div>
          <div className="title-Input">
            <InputBox
              title="title"
              id="outlined-basic"
              variant="outlined"
              placeholder="Enter Title here"
              required={true}
              autoComplete="off"
              sx={{ overflow: "hidden" }}
              size="small"
              value={createNews.title}
              onChange={(e) => {
                setError({
                  title: [],
                  message: [],
                });
                setcreateNews({
                  ...createNews,
                  title: e.target.value,
                });
              }}
            />
          </div>
          <div className="upload-Button">
            <div className="image-upload-container">
              <ColorButton
                variant="outlined"
                component="label"
                size="medium"
                startIcon={<FileUploadOutlinedIcon />}
              >
                Upload head image
                <input
                  type="file"
                  multiple="multiple"
                  onChange={(e) => {
                    fileUploadHandle(e.target.files[0], "head_image");
                  }}
                  hidden
                  ref={fileRef}
                />
              </ColorButton>
              {createNews.imagePath ? (
                <div className="image-preview">
                  <button
                    className="cancel-icon-button"
                    onClick={() => {
                      setcreateNews({
                        ...createNews,
                        imagePath: null,
                      });
                      fileRef.current.value = null;
                    }}
                  >
                    <CancelOutlinedIcon className="cancel-icon" />
                  </button>
                  <img
                    className="image-wrapper"
                    src={
                      typeof createNews.imagePath === "string"
                        ? createNews.imagePath
                        : URL.createObjectURL(createNews.imagePath)
                    }
                  ></img>
                </div>
              ) : null}
            </div>
            <div className="image-upload-container">
              <ColorButton
                variant="outlined"
                component="label"
                size="medium"
                startIcon={<FileUploadOutlinedIcon />}
              >
                Upload Icon
                <input
                  type="file"
                  multiple="multiple"
                  onChange={(e) => {
                    fileUploadHandle(e.target.files[0], "icon");
                  }}
                  hidden
                  ref={iconFileRef}
                />
              </ColorButton>
              {createNews.imageIconPath ? (
                <div className="image-preview">
                  <button
                    className="cancel-icon-button"
                    onClick={() => {
                      setcreateNews({
                        ...createNews,
                        imageIconPath: null,
                      });
                      iconFileRef.current.value = null;
                    }}
                  >
                    <CancelOutlinedIcon className="cancel-icon" />
                  </button>
                  <img
                    className="image-wrapper"
                    src={
                      typeof createNews.imageIconPath === "string"
                        ? createNews.imageIconPath
                        : URL.createObjectURL(createNews.imageIconPath)
                    }
                  ></img>
                </div>
              ) : null}
            </div>
          </div>

          <div className="title-Label">
            <label>Description*</label>
          </div>
          <div className="description-Input">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 0 },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                title="infoDescription"
                id="outlined-multiline-static"
                placeholder="Enter Title here"
                required={true}
                variant="outlined"
                error={error.title.includes("infoDescription")}
                multiline
                rows={7}
                fullWidth
                value={createNews.description}
                onChange={(e) => {
                  setError({
                    title: [],
                    message: [],
                  });
                  setcreateNews({
                    ...createNews,
                    description: e.target.value,
                  });
                }}
              />
              <ErrorBox title={"infoDescription"} />
            </Box>
          </div>

          <div className="title-Label">
            <label>Source/Link URL</label>
          </div>
          <div className="title-Input">
            <InputBox
              title="infoUrl"
              id="outlined-basic"
              variant="outlined"
              placeholder="Enter Title here"
              required={true}
              autoComplete="off"
              size="small"
              sx={{ overflow: "hidden" }}
              value={createNews.sourceLink}
              error={error.title.includes("infoUrl")}
              onChange={(e) => {
                setError({
                  title: [],
                  message: [],
                });
                setcreateNews({
                  ...createNews,
                  sourceLink: e.target.value,
                });
              }}
            />
          </div>
        </Box>
      </div>
    </>
  );
};

export default CreateEditBlocks;
