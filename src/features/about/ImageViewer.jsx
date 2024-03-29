import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { crossIcon } from "../../assets/images";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30rem",
  height: "24rem",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ImageViewer({ open, setOpen }) {
  const handleOpen = () =>
    setOpen({
      ...open,
      isOpen: true,
    });
  const handleClose = () => setOpen(false);
  const handleImageClose = (event) => {
    setOpen(false);
  };

  return (
    <div style={{ objectFit: "contain" }}>
      <Modal
        open={open.isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="img-container">
              <div className="cross-icon-container">
                <img
                  src={crossIcon}
                  alt="cross-icon"
                  style={{ marginLeft: "95%",cursor:"pointer" }}
                  onClick={() => handleImageClose()}
                />
              </div>

              <img
                src={open.imgSrc}
                style={{ width: "100%", objectFit: "scale-down" }}
                alt="header"
              />
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
